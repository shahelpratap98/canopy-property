import { useId, useRef, useState } from 'react';
import { Check, Loader2 } from 'lucide-react';
import { CATEGORIES } from '../data/services';
import { SITE, whatsappUrl } from '../siteConfig';
import { WhatsAppInline } from './WhatsAppButton';

type Fields = { name: string; contact: string; suburb: string; service: string; notes: string };
type Errors = Partial<Record<keyof Fields, string>>;

/** 'glass' sits over the dark hero video; 'paper' sits on the light pages. */
type Variant = 'glass' | 'paper';

const EMPTY: Fields = { name: '', contact: '', suburb: '', service: '', notes: '' };

function validate(values: Fields): Errors {
  const errors: Errors = {};
  if (!values.name.trim()) errors.name = 'Please tell us your name.';
  if (!values.contact.trim()) {
    errors.contact = 'Add a phone number or email so we can send the quote.';
  } else {
    const looksLikeEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.contact.trim());
    const looksLikePhone = /^[\d\s()+-]{7,}$/.test(values.contact.trim());
    if (!looksLikeEmail && !looksLikePhone) {
      errors.contact = 'That does not look like a phone number or email address.';
    }
  }
  if (!values.suburb.trim()) errors.suburb = 'Which Auckland suburb is the property in?';
  if (!values.service) errors.service = 'Choose the service you need.';
  return errors;
}

export default function QuoteForm({
  variant = 'paper',
  whatsappMessage,
}: {
  variant?: Variant;
  /** Prefills the WhatsApp chat, e.g. naming the service on a service page. */
  whatsappMessage?: string;
}) {
  const uid = useId();
  const formRef = useRef<HTMLFormElement>(null);
  const [values, setValues] = useState<Fields>(EMPTY);
  const [errors, setErrors] = useState<Errors>({});
  const [touched, setTouched] = useState<Partial<Record<keyof Fields, boolean>>>({});
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent'>('idle');

  const dark = variant === 'glass';

  const set =
    (key: keyof Fields) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
      const next = { ...values, [key]: e.target.value };
      setValues(next);
      if (touched[key]) setErrors(validate(next));
    };

  // Validate on blur, not on every keystroke — errors while someone is still
  // typing read as the form arguing with them.
  const blur = (key: keyof Fields) => () => {
    setTouched((t) => ({ ...t, [key]: true }));
    setErrors(validate(values));
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const found = validate(values);
    setErrors(found);
    setTouched({ name: true, contact: true, suburb: true, service: true });

    const firstInvalid = (Object.keys(found) as (keyof Fields)[])[0];
    if (firstInvalid) {
      formRef.current
        ?.querySelector<HTMLElement>(`#${CSS.escape(`${uid}-${firstInvalid}`)}`)
        ?.focus();
      return;
    }

    setStatus('sending');

    // NOTE: there is no backend yet. This composes an email in the visitor's mail
    // client. Swap for a real endpoint (Formspree, Resend, a serverless function)
    // before launch — see README.
    const body = [
      `Name: ${values.name}`,
      `Contact: ${values.contact}`,
      `Suburb: ${values.suburb}`,
      `Service: ${values.service}`,
      '',
      values.notes || '(no extra detail supplied)',
    ].join('\n');

    window.location.href =
      `mailto:${SITE.email}?subject=${encodeURIComponent(`Quote request — ${values.service}`)}` +
      `&body=${encodeURIComponent(body)}`;

    window.setTimeout(() => setStatus('sent'), 600);
  };

  const shell = dark
    ? 'liquid-glass on-dark rounded-2xl p-5 sm:p-6'
    : 'rounded-2xl border border-line bg-white p-5 shadow-[0_18px_40px_-28px_rgba(18,60,34,0.35)] sm:p-6';

  const heading = dark ? 'text-white' : 'text-ink';
  const sub = dark ? 'text-white/55' : 'text-ink-soft';
  const label = `block text-[11px] font-medium tracking-[0.14em] mb-1.5 ${
    dark ? 'text-white/70' : 'text-ink-soft'
  }`;
  const star = dark ? 'text-canopy-light' : 'text-canopy-mid';

  // 16px, not 15px: iOS auto-zooms the page when a focused input is under 16px.
  const field = dark
    ? 'w-full rounded-xl bg-white/10 px-4 py-3 text-[16px] text-white placeholder-white/40 min-h-[44px] outline-none ring-1 ring-inset ring-white/15 focus:ring-2 focus:ring-canopy-light'
    : 'w-full rounded-xl bg-paper-sunk px-4 py-3 text-[16px] text-ink min-h-[44px] outline-none ring-1 ring-inset ring-line focus:ring-2 focus:ring-canopy-mid';

  const errorClass = `mt-1.5 text-[12px] ${dark ? 'text-red-300' : 'text-red-700'}`;
  const optionClass = dark ? 'bg-neutral-900' : 'bg-white';
  const submit = dark
    ? 'bg-white text-black hover:shadow-[0_0_32px_4px_rgba(255,255,255,0.2)]'
    : 'bg-canopy-deep text-white hover:shadow-[0_12px_28px_-10px_rgba(18,60,34,0.7)]';

  if (status === 'sent') {
    return (
      <div className={`${shell} text-center`} role="status" aria-live="polite">
        <div
          className={`mx-auto mb-3 grid h-11 w-11 place-items-center rounded-full ${
            dark ? 'bg-canopy-light/20' : 'bg-canopy-mid/10'
          }`}
        >
          <Check size={20} strokeWidth={1.5} className={dark ? 'text-canopy-light' : 'text-canopy-mid'} />
        </div>
        <p className={`text-[15px] font-medium ${heading}`}>Your quote request is ready to send.</p>
        <p className={`mt-1.5 text-[13px] leading-relaxed ${sub}`}>
          We have opened an email for you to send. If nothing appeared, email us directly at{' '}
          <a className="underline underline-offset-2" href={`mailto:${SITE.email}`}>
            {SITE.email}
          </a>
          .
        </p>
        <button
          type="button"
          onClick={() => {
            setValues(EMPTY);
            setTouched({});
            setErrors({});
            setStatus('idle');
          }}
          className={`mt-4 min-h-[44px] rounded-full px-6 text-[14px] font-medium transition-transform hover:scale-[1.03] active:scale-[0.97] ${submit}`}
        >
          Send another
        </button>
      </div>
    );
  }

  return (
    <form ref={formRef} id="quote" onSubmit={onSubmit} noValidate aria-labelledby={`${uid}-heading`} className={shell}>
      <h2 id={`${uid}-heading`} className={`text-[17px] font-semibold tracking-tight ${heading}`}>
        Get a free quote
      </h2>
      <p className={`mt-1 text-[13px] leading-relaxed ${sub}`}>
        Tell us the basics and we will come back to you. No obligation.
      </p>

      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        <div>
          <label className={label} htmlFor={`${uid}-name`}>
            YOUR NAME <span aria-hidden="true" className={star}>*</span>
          </label>
          <input
            id={`${uid}-name`}
            name="name"
            type="text"
            autoComplete="name"
            required
            value={values.name}
            onChange={set('name')}
            onBlur={blur('name')}
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? `${uid}-name-err` : undefined}
            className={field}
          />
          {errors.name && (
            <p id={`${uid}-name-err`} role="alert" className={errorClass}>
              {errors.name}
            </p>
          )}
        </div>

        <div>
          <label className={label} htmlFor={`${uid}-contact`}>
            PHONE OR EMAIL <span aria-hidden="true" className={star}>*</span>
          </label>
          <input
            id={`${uid}-contact`}
            name="contact"
            type="text"
            inputMode="email"
            autoComplete="email"
            required
            value={values.contact}
            onChange={set('contact')}
            onBlur={blur('contact')}
            aria-invalid={!!errors.contact}
            aria-describedby={errors.contact ? `${uid}-contact-err` : undefined}
            className={field}
          />
          {errors.contact && (
            <p id={`${uid}-contact-err`} role="alert" className={errorClass}>
              {errors.contact}
            </p>
          )}
        </div>

        <div>
          <label className={label} htmlFor={`${uid}-suburb`}>
            SUBURB <span aria-hidden="true" className={star}>*</span>
          </label>
          <input
            id={`${uid}-suburb`}
            name="suburb"
            type="text"
            autoComplete="address-level2"
            required
            value={values.suburb}
            onChange={set('suburb')}
            onBlur={blur('suburb')}
            aria-invalid={!!errors.suburb}
            aria-describedby={errors.suburb ? `${uid}-suburb-err` : undefined}
            className={field}
          />
          {errors.suburb && (
            <p id={`${uid}-suburb-err`} role="alert" className={errorClass}>
              {errors.suburb}
            </p>
          )}
        </div>

        <div>
          <label className={label} htmlFor={`${uid}-service`}>
            WHAT DO YOU NEED? <span aria-hidden="true" className={star}>*</span>
          </label>
          <select
            id={`${uid}-service`}
            name="service"
            required
            value={values.service}
            onChange={set('service')}
            onBlur={blur('service')}
            aria-invalid={!!errors.service}
            aria-describedby={errors.service ? `${uid}-service-err` : undefined}
            className={`${field} appearance-none`}
          >
            <option value="" className={optionClass}>
              Select a service…
            </option>
            {CATEGORIES.map((category) => (
              <optgroup key={category.slug} label={category.name} className={optionClass}>
                {category.services.map((service) => (
                  <option key={service.slug} value={service.name} className={optionClass}>
                    {service.name}
                  </option>
                ))}
              </optgroup>
            ))}
          </select>
          {errors.service && (
            <p id={`${uid}-service-err`} role="alert" className={errorClass}>
              {errors.service}
            </p>
          )}
        </div>
      </div>

      <div className="mt-4">
        <label className={label} htmlFor={`${uid}-notes`}>
          ANYTHING ELSE?{' '}
          <span className={`tracking-normal ${dark ? 'text-white/35' : 'text-ink-soft/60'}`}>
            (optional)
          </span>
        </label>
        <textarea
          id={`${uid}-notes`}
          name="notes"
          rows={2}
          value={values.notes}
          onChange={set('notes')}
          className={`${field} resize-y`}
        />
      </div>

      <button
        type="submit"
        disabled={status === 'sending'}
        className={`mt-5 flex min-h-[48px] w-full items-center justify-center gap-2 rounded-full px-8 py-3.5 text-[15px] font-medium transition-all hover:scale-[1.02] active:scale-[0.97] disabled:opacity-50 ${submit}`}
      >
        {status === 'sending' ? (
          <>
            <Loader2 size={16} strokeWidth={2} className="animate-spin" />
            Sending…
          </>
        ) : (
          'Request my free quote'
        )}
      </button>

      {(whatsappUrl() || import.meta.env.DEV) && (
        <div className={`mt-3 flex items-center justify-center gap-2 text-[13px] ${sub}`}>
          <span>Prefer to chat?</span>
          <WhatsAppInline
            message={whatsappMessage}
            className={`font-medium ${
              dark ? 'text-canopy-light hover:text-white' : 'text-canopy-mid hover:text-canopy-deep'
            }`}
          >
            WhatsApp us
          </WhatsAppInline>
        </div>
      )}
    </form>
  );
}
