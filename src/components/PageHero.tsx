import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';

type Crumb = { label: string; href?: string };

/** Light-theme page header used by every page except the landing page. */
export default function PageHero({
  eyebrow,
  title,
  lede,
  crumbs,
  children,
}: {
  eyebrow?: string;
  title: string;
  lede?: string;
  crumbs?: Crumb[];
  children?: ReactNode;
}) {
  return (
    <section className="border-b border-line bg-paper-sunk px-6 pb-14 pt-28 md:pt-32">
      <div className="mx-auto max-w-6xl">
        {crumbs && crumbs.length > 0 && (
          <nav aria-label="Breadcrumb" className="mb-3">
            <ol className="flex flex-wrap items-center gap-x-2 text-[12px] text-ink-soft">
              {crumbs.map((crumb, i) => (
                <li key={crumb.label} className="flex items-center gap-2">
                  {crumb.href ? (
                    <Link
                      className="inline-flex min-h-[44px] items-center hover:text-canopy-deep hover:underline"
                      to={crumb.href}
                    >
                      {crumb.label}
                    </Link>
                  ) : (
                    <span className="text-ink">{crumb.label}</span>
                  )}
                  {i < crumbs.length - 1 && (
                    <span aria-hidden="true" className="text-ink-soft/50">
                      /
                    </span>
                  )}
                </li>
              ))}
            </ol>
          </nav>
        )}
        {eyebrow && (
          <p className="mb-4 text-[11px] font-medium tracking-[0.16em] text-canopy-mid">
            {eyebrow.toUpperCase()}
          </p>
        )}
        <h1
          className="max-w-[18ch] font-display font-normal text-ink"
          style={{ fontSize: 'clamp(32px,4.4vw,56px)', lineHeight: 1.1, letterSpacing: '-0.02em' }}
        >
          {title}
        </h1>
        {lede && <p className="mt-5 max-w-[62ch] text-[16px] leading-relaxed text-ink-soft">{lede}</p>}
        {children}
      </div>
    </section>
  );
}
