import { useEffect, useState, type ReactNode } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Shared floating action button.
 *
 * Both the Call and WhatsApp buttons use this so the hide-on-quote-form
 * behaviour cannot drift apart between them. That behaviour is not cosmetic:
 * a FAB at bottom-right overlaps the quote form's near-full-width submit button
 * by ~31px at 375px wide, and a hit-test at that point returned the FAB instead
 * of the submit button. The form carries its own call and WhatsApp links, so the
 * FABs step aside while it is on screen.
 *
 * `slot` stacks them: 'lower' sits at the bottom, 'upper' clears it.
 */
export default function Fab({
  href,
  ariaLabel,
  label,
  icon,
  slot,
  unconfiguredHint,
  devPreview,
}: {
  href: string | null;
  ariaLabel: string;
  label: string;
  icon: ReactNode;
  slot: 'lower' | 'upper';
  unconfiguredHint: string;
  devPreview: boolean;
}) {
  const unconfigured = !href;

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

  if (unconfigured && !devPreview) return null;

  // Lower sits on the safe-area edge; upper clears a 56px button plus a gap.
  const position =
    slot === 'lower'
      ? 'bottom-5 md:bottom-7'
      : 'bottom-[88px] md:bottom-24';

  return (
    <a
      {...(href ? { href, ...(href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {}) } : {})}
      onClick={unconfigured ? (e) => e.preventDefault() : undefined}
      title={unconfigured ? unconfiguredHint : undefined}
      data-fab-unconfigured={unconfigured || undefined}
      aria-label={unconfigured ? unconfiguredHint : ariaLabel}
      aria-hidden={formVisible}
      tabIndex={formVisible ? -1 : 0}
      className={`group fixed right-5 z-40 inline-flex h-14 min-w-[56px] items-center gap-2.5 rounded-full bg-canopy-deep px-4 text-white shadow-[0_10px_30px_-8px_rgba(18,60,34,0.65)] ring-1 ring-inset ring-white/15 transition-all duration-200 hover:bg-canopy-mid hover:shadow-[0_14px_34px_-8px_rgba(18,60,34,0.8)] active:scale-[0.96] motion-reduce:transition-none md:right-7 ${position} ${
        formVisible
          ? 'pointer-events-none translate-y-2 opacity-0'
          : 'pointer-events-auto translate-y-0 opacity-100'
      } ${unconfigured ? 'cursor-not-allowed ring-2 ring-amber-400/70' : ''}`}
      style={slot === 'lower' ? { paddingBottom: 'env(safe-area-inset-bottom, 0px)' } : undefined}
    >
      {icon}
      <span className="hidden pr-1 text-[14px] font-medium md:inline">{label}</span>
    </a>
  );
}
