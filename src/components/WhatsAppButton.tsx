import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { SITE, whatsappUrl } from '../siteConfig';

const NOT_SET_HINT =
  'WhatsApp number not set — add it to SITE.whatsapp in src/siteConfig.ts';

/**
 * In `npm run dev` the entry points still render when no number is configured,
 * so the button can be seen and positioned before the number exists. They are
 * inert (no href) and marked with data-whatsapp-unconfigured.
 *
 * `import.meta.env.DEV` is false during `npm run build`, so production and the
 * prerendered HTML contain nothing at all rather than a dead link.
 */
const DEV_PREVIEW = import.meta.env.DEV;

function WhatsAppGlyph({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

/**
 * Floating WhatsApp button.
 *
 * Deliberately uses the site's canopy greens rather than WhatsApp's #25D366 —
 * a brand-green blob fights the palette on every page. The glyph carries the
 * recognition.
 */
export default function WhatsAppFab() {
  const href = whatsappUrl();
  const unconfigured = !href;

  // The FAB sits bottom-right and the quote form's submit button is near
  // full-width, so on mobile the two overlap by ~31px whenever the button
  // scrolls through the FAB's band — taps there would open WhatsApp instead of
  // submitting. The form carries its own WhatsApp link, so hide the FAB while
  // the form is on screen rather than letting them fight.
  const { pathname } = useLocation();
  const [formVisible, setFormVisible] = useState(false);
  useEffect(() => {
    const form = document.getElementById('quote');
    if (!form) {
      setFormVisible(false);
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => setFormVisible(entry.isIntersecting),
      { rootMargin: '0px 0px -80px 0px' }
    );
    io.observe(form);
    return () => io.disconnect();
  }, [pathname]);

  if (unconfigured && !DEV_PREVIEW) return null;

  return (
    <a
      {...(href ? { href, target: '_blank', rel: 'noopener noreferrer' } : {})}
      onClick={unconfigured ? (e) => e.preventDefault() : undefined}
      title={unconfigured ? NOT_SET_HINT : undefined}
      data-whatsapp-unconfigured={unconfigured || undefined}
      aria-label={
        unconfigured ? NOT_SET_HINT : `Message ${SITE.name} on WhatsApp`
      }
      aria-hidden={formVisible}
      tabIndex={formVisible ? -1 : 0}
      className={`group fixed bottom-5 right-5 z-40 inline-flex h-14 min-w-[56px] items-center gap-2.5 rounded-full bg-canopy-deep px-4 text-white shadow-[0_10px_30px_-8px_rgba(18,60,34,0.65)] ring-1 ring-inset ring-white/15 transition-all duration-200 hover:bg-canopy-mid hover:shadow-[0_14px_34px_-8px_rgba(18,60,34,0.8)] active:scale-[0.96] motion-reduce:transition-none md:bottom-7 md:right-7 ${
        formVisible
          ? 'pointer-events-none translate-y-2 opacity-0'
          : 'pointer-events-auto translate-y-0 opacity-100'
      } ${unconfigured ? 'cursor-not-allowed ring-2 ring-amber-400/70' : ''}`}
      style={{ paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}
    >
      <WhatsAppGlyph className="h-6 w-6 shrink-0" />
      <span className="hidden pr-1 text-[14px] font-medium md:inline">
        {unconfigured ? 'WhatsApp (no number)' : 'WhatsApp us'}
      </span>
    </a>
  );
}

/** Inline link version for the contact list, footer and quote form. */
export function WhatsAppInline({
  message,
  className = '',
  children,
}: {
  message?: string;
  className?: string;
  children?: React.ReactNode;
}) {
  const href = whatsappUrl(message);
  const unconfigured = !href;
  if (unconfigured && !DEV_PREVIEW) return null;

  return (
    <a
      {...(href ? { href, target: '_blank', rel: 'noopener noreferrer' } : {})}
      onClick={unconfigured ? (e) => e.preventDefault() : undefined}
      title={unconfigured ? NOT_SET_HINT : undefined}
      data-whatsapp-unconfigured={unconfigured || undefined}
      className={`inline-flex min-h-[44px] items-center gap-2 text-[15px] transition-colors ${
        unconfigured ? 'cursor-not-allowed opacity-70' : ''
      } ${className}`}
    >
      <WhatsAppGlyph className="h-[17px] w-[17px] shrink-0" />
      {children ?? 'Message us on WhatsApp'}
    </a>
  );
}
