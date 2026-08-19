import { Resend } from 'resend';

const escapeHtml = (value = '') =>
  String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

const looksLikeEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(v ?? '').trim());

/**
 * Rate limiting.
 *
 * Two windows: one per IP to stop a single source hammering the form, and one
 * global to protect the Resend quota. The free plan allows 100 emails a day, so
 * an unthrottled flood would not just fill the inbox, it would exhaust the
 * allowance and block genuine enquiries for the rest of the day.
 *
 * CAVEAT: this state is per warm function instance. Vercel scales out and
 * recycles instances, so the effective ceiling is higher than the numbers below
 * and resets on a cold start. It stops naive floods, not a determined
 * distributed attacker. If this ever proves insufficient, the upgrade is a
 * shared store (Upstash Redis via the Vercel marketplace) or Vercel's WAF —
 * both need no change to the rest of this handler.
 */
const LIMITS = {
  perIp: { max: 5, windowMs: 10 * 60 * 1000 },
  global: { max: 30, windowMs: 60 * 60 * 1000 },
};
const MAX_TRACKED_KEYS = 5000;
const hits = new Map();

function take(key, { max, windowMs }) {
  const now = Date.now();
  const recent = (hits.get(key) ?? []).filter((t) => now - t < windowMs);

  if (recent.length >= max) {
    hits.set(key, recent);
    return { ok: false, retryAfter: Math.ceil((windowMs - (now - recent[0])) / 1000) };
  }

  recent.push(now);
  hits.set(key, recent);

  // Bound memory: drop the oldest keys rather than growing without limit.
  if (hits.size > MAX_TRACKED_KEYS) {
    for (const k of hits.keys()) {
      hits.delete(k);
      if (hits.size <= MAX_TRACKED_KEYS * 0.9) break;
    }
  }
  return { ok: true };
}

const clientIp = (req) =>
  String(req.headers['x-forwarded-for'] ?? '').split(',')[0].trim() ||
  req.socket?.remoteAddress ||
  'unknown';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { RESEND_API_KEY, CONTACT_TO_EMAIL, CONTACT_FROM_EMAIL } = process.env;

  // Not configured yet: tell the client to fall back to mailto rather than
  // swallowing the enquiry. A lost quote request is worse than a clunky handoff.
  if (!RESEND_API_KEY || !CONTACT_TO_EMAIL || !CONTACT_FROM_EMAIL) {
    console.error('Quote form is missing Resend environment variables.');
    return res.status(503).json({
      error: 'The quote form is not connected yet.',
      fallback: true,
    });
  }

  const { name, contact, suburb, service, notes, website } = req.body ?? {};

  // Honeypot first: a filled hidden field means a bot. Return 200 so it does not
  // retry, and do it before rate limiting so bots never consume the budget.
  if (website) return res.status(200).json({ ok: true });

  // Before validation on purpose, so malformed floods are throttled too.
  const ipCheck = take(`ip:${clientIp(req)}`, LIMITS.perIp);
  if (!ipCheck.ok) {
    res.setHeader('Retry-After', String(ipCheck.retryAfter));
    return res.status(429).json({
      error: 'That is a few requests in a short time. Please wait a moment, or call us instead.',
    });
  }

  const globalCheck = take('global', LIMITS.global);
  if (!globalCheck.ok) {
    console.warn('Global quote-form rate limit reached.');
    res.setHeader('Retry-After', String(globalCheck.retryAfter));
    return res.status(429).json({
      error: 'We are getting a lot of requests right now. Please call us or try again shortly.',
    });
  }

  // CONTACT_TO_EMAIL may hold several addresses, comma separated, so quote
  // requests can reach more than one person without a code change.
  const recipients = CONTACT_TO_EMAIL.split(',')
    .map((address) => address.trim())
    .filter(Boolean);

  if (recipients.length === 0) {
    console.error('CONTACT_TO_EMAIL is set but contains no usable address.');
    return res.status(503).json({ error: 'The quote form is not connected yet.', fallback: true });
  }

  if (!name || !contact || !suburb || !service) {
    return res.status(400).json({ error: 'Please fill in every required field.' });
  }

  const rows = [
    ['Name', name],
    ['Phone or email', contact],
    ['Suburb', suburb],
    ['Service', service],
  ];

  try {
    const resend = new Resend(RESEND_API_KEY);

    const { error } = await resend.emails.send({
      from: CONTACT_FROM_EMAIL,
      to: recipients,
      // Only a real address can be replied to; the field also accepts a phone number.
      ...(looksLikeEmail(contact) ? { replyTo: String(contact).trim() } : {}),
      subject: `Quote request — ${service} (${suburb})`,
      html: `
        <h2 style="font-family:sans-serif">New quote request from the Canopy website</h2>
        <table style="font-family:sans-serif;border-collapse:collapse">
          ${rows
            .map(
              ([label, value]) =>
                `<tr><td style="padding:4px 16px 4px 0;color:#666">${label}</td><td style="padding:4px 0"><strong>${escapeHtml(value)}</strong></td></tr>`
            )
            .join('')}
        </table>
        <p style="font-family:sans-serif;color:#666;margin-top:24px">Anything else</p>
        <p style="font-family:sans-serif;white-space:pre-wrap">${escapeHtml(notes || '—')}</p>
      `,
    });

    if (error) {
      console.error('Resend rejected the message:', error);
      return res.status(502).json({ error: 'We could not send that just now. Please try again.' });
    }

    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error('Unexpected error sending quote request:', err);
    return res.status(500).json({ error: 'We could not send that just now. Please try again.' });
  }
}
