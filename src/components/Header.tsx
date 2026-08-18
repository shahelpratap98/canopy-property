import { useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import Logo from './Logo';
import { NAV, SITE } from '../siteConfig';

/**
 * The header sits over the dark hero video on the landing page and over light
 * paper everywhere else, so it swaps its own palette rather than assuming one.
 */
/** Routes whose page renders a `data-hero-dark` band. Used only for the initial
 *  (server-rendered) value — after mount the real element is measured. Keep in
 *  sync with the pages that set that attribute. */
const DARK_HERO_ROUTES = new Set(['/', '/about']);

const HEADER_STRIP = 88; // px of header that must stay over the dark band

export default function Header() {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  // Transparent while a dark hero band still sits under the header, solid paper
  // once scrolled past it. Measured from the element rather than assuming a
  // full-viewport hero, since the About band is shorter than the home one.
  const [onDark, setOnDark] = useState(() => DARK_HERO_ROUTES.has(pathname));
  useEffect(() => {
    const hero = document.querySelector('[data-hero-dark]');
    if (!hero) {
      setOnDark(false);
      return;
    }
    const update = () => setOnDark(hero.getBoundingClientRect().bottom > HEADER_STRIP);
    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, [pathname]);

  useEffect(() => setOpen(false), [pathname]);

  const shell = onDark
    ? 'bg-transparent'
    // /95 not /92: Tailwind's opacity scale is multiples of 5, and an off-scale
    // value silently generates no rule at all — leaving the header transparent.
    : 'bg-paper/95 backdrop-blur-sm border-b border-line';


  const linkClass = ({ isActive }: { isActive: boolean }) => {
    // min-h-[44px]: 11px text alone gives a ~37px target, under the 44px minimum.
    const base =
      'inline-flex items-center min-h-[44px] text-[11px] font-medium tracking-[0.12em] px-4 rounded-full transition-colors duration-200';
    if (onDark) {
      return `${base} ${isActive ? 'text-white bg-white/10' : 'text-white/90 hover:text-white'}`;
    }
    return `${base} ${
      isActive ? 'text-canopy-deep bg-canopy-deep/10' : 'text-ink-soft hover:text-canopy-deep'
    }`;
  };

  // Solid white over the hero; deep green on the light pages, where a white
  // pill would disappear into the paper background.
  const pill = onDark
    ? 'bg-white text-canopy-deep font-semibold hover:shadow-[0_0_28px_4px_rgba(255,255,255,0.25)]'
    : 'bg-canopy-deep text-white hover:bg-canopy-mid';

  const navShell = onDark ? 'liquid-glass' : 'bg-canopy-deep/[0.06]';

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 flex items-center justify-between px-6 py-4 transition-colors duration-300 md:px-10 md:py-6 ${shell} ${
        onDark ? 'on-dark' : ''
      }`}
    >
      <NavLink
        to="/"
        className="inline-flex min-h-[44px] items-center"
        aria-label={`${SITE.name} home`}
      >
        <Logo dark={onDark} />
      </NavLink>

      <nav
        className={`hidden items-center gap-1 rounded-full px-2 py-1 md:flex ${navShell}`}
        aria-label="Primary"
      >
        {NAV.map((item) => (
          <NavLink key={item.href} to={item.href} end={item.href === '/'} className={linkClass}>
            {item.label.toUpperCase()}
          </NavLink>
        ))}
      </nav>

      <a
        href="#quote"
        className={`hidden min-h-[44px] items-center rounded-full px-5 text-[11px] font-medium tracking-[0.12em] transition-colors md:inline-flex ${pill}`}
      >
        GET A FREE QUOTE
      </a>

      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls="mobile-nav"
        aria-label={open ? 'Close menu' : 'Open menu'}
        className={`grid h-11 w-11 place-items-center rounded-full md:hidden ${
          onDark ? 'liquid-glass text-white' : 'bg-canopy-deep/[0.08] text-ink'
        }`}
      >
        {open ? <X size={18} strokeWidth={1.5} /> : <Menu size={18} strokeWidth={1.5} />}
      </button>

      {open && (
        <nav
          id="mobile-nav"
          aria-label="Primary"
          className={`absolute inset-x-6 top-[68px] flex flex-col rounded-2xl p-2 md:hidden ${
            onDark ? 'liquid-glass' : 'border border-line bg-paper shadow-lg'
          }`}
        >
          {NAV.map((item) => (
            <NavLink
              key={item.href}
              to={item.href}
              end={item.href === '/'}
              className={`rounded-xl px-4 py-3.5 text-[13px] font-medium tracking-[0.1em] ${
                onDark
                  ? 'text-white/90 hover:bg-white/10 hover:text-white'
                  : 'text-ink-soft hover:bg-canopy-deep/[0.06] hover:text-canopy-deep'
              }`}
            >
              {item.label.toUpperCase()}
            </NavLink>
          ))}
          <a
            href="#quote"
            className="mt-1 rounded-xl bg-canopy-deep px-4 py-3.5 text-center text-[13px] font-semibold text-white"
          >
            Get a free quote
          </a>
        </nav>
      )}
    </header>
  );
}
