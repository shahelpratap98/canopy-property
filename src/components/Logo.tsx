import { SITE } from '../siteConfig';

/**
 * Brand logo, monochrome so it sits on both the dark hero header and the light
 * pages. Generated from brand-src/ by `npm run build:logo`.
 *
 * Intrinsic size is 900x317 (2.84:1). width/height are set so the browser
 * reserves the right box before the image loads — a logo in a fixed header is
 * exactly the kind of element that otherwise shifts the layout on load.
 *
 * alt is empty on purpose: the wrapping link already carries an aria-label, so
 * alt text here would make screen readers announce the company name twice.
 */
export default function Logo({
  dark = false,
  className = 'h-9 w-auto md:h-10',
}: {
  dark?: boolean;
  className?: string;
}) {
  return (
    <img
      src={dark ? '/logo-white.png' : '/logo.png'}
      alt=""
      width={900}
      height={317}
      className={className}
      // The logo is above the fold in a fixed header; never lazy-load it.
      loading="eager"
      decoding="async"
      data-brand={SITE.shortName}
    />
  );
}
