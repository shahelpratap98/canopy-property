import { Link } from 'react-router-dom';
import { CATEGORIES } from '../data/services';
import { WhatsAppInline } from './WhatsAppButton';
import { NAV, SITE } from '../siteConfig';

export default function Footer() {
  return (
    // Deep forest green anchors the light paper pages without going to black.
    <footer className="on-dark bg-canopy-deep text-white">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <p className="text-[17px] font-semibold tracking-tight text-white">
            Canopy<span className="text-canopy-light"> Property</span>
          </p>
          <p className="mt-3 max-w-[280px] text-[14px] leading-relaxed text-white/65">
            {SITE.tagline} across {SITE.region}. Residential and commercial. Fully insured, police
            checked, and committed to quality workmanship.
          </p>
          <div className="mt-3">
            <WhatsAppInline className="text-[14px] text-white/75 hover:text-white" />
          </div>
        </div>

        <div>
          <h2 className="mb-4 text-[11px] font-medium tracking-[0.15em] text-canopy-light">
            EXPLORE
          </h2>
          {/* Spacing comes from the 44px link height now, so no extra space-y. */}
          <ul>
            {NAV.map((item) => (
              <li key={item.href}>
                <Link
                  className="inline-flex min-h-[44px] items-center text-[14px] text-white/75 hover:text-white"
                  to={item.href}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="sm:col-span-2">
          <h2 className="mb-4 text-[11px] font-medium tracking-[0.15em] text-canopy-light">
            SERVICES
          </h2>
          <ul className="grid gap-x-6 sm:grid-cols-2">
            {CATEGORIES.map((category) => (
              <li key={category.slug}>
                <Link
                  className="inline-flex min-h-[44px] items-center text-[14px] text-white/75 hover:text-white"
                  to={`/services/${category.slug}`}
                >
                  {category.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-white/15 px-6 py-6">
        <div className="mx-auto flex max-w-6xl flex-wrap justify-between gap-3 text-[12.5px] text-white/55">
          <span>
            © {new Date().getFullYear()} {SITE.name}. All rights reserved.
          </span>
          <span>{SITE.region}, {SITE.country}</span>
        </div>
      </div>
    </footer>
  );
}
