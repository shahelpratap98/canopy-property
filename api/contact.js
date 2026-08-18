import { Resend } from 'resend';

const escapeHtml = (value = '') =>
  String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

const looksLikeEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(v ?? '').trim());

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

  // Honeypot: a filled hidden field means a bot. Return 200 so it does not retry.
  if (website) return res.status(200).json({ ok: true });

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
      to: CONTACT_TO_EMAIL,
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
