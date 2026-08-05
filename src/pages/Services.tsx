import { Link } from 'react-router-dom';
import PageHero from '../components/PageHero';
import { CATEGORIES } from '../data/services';

export default function Services() {
  return (
    <>
      <PageHero
        eyebrow="Our services"
        title="Everything a property needs, outside."
        lede="Residential and commercial across Auckland. Free quotes on any of it — one-off jobs or ongoing scheduled maintenance."
        crumbs={[{ label: 'Home', href: '/' }, { label: 'Services' }]}
      />

      <div className="bg-paper px-6 py-16">
        <div className="mx-auto max-w-6xl space-y-16">
          {CATEGORIES.map((category) => (
            <section key={category.slug} aria-labelledby={`cat-${category.slug}`}>
              <div className="flex flex-wrap items-baseline justify-between gap-3">
                <h2
                  id={`cat-${category.slug}`}
                  className="font-display text-[26px] font-normal tracking-tight text-ink"
                >
                  <Link className="hover:text-canopy-mid" to={`/services/${category.slug}`}>
                    {category.name}
                  </Link>
                </h2>
                <Link
                  className="inline-flex min-h-[44px] items-center text-[13px] font-medium text-canopy-mid hover:underline"
                  to={`/services/${category.slug}`}
                >
                  View category →
                </Link>
              </div>
              <p className="mt-2.5 max-w-[68ch] text-[15px] leading-relaxed text-ink-soft">
                {category.blurb}
              </p>
              <ul className="mt-6 grid gap-2.5 sm:grid-cols-2 lg:grid-cols-3">
                {category.services.map((service) => (
                  <li key={service.slug}>
                    <Link
                      to={`/services/${category.slug}/${service.slug}`}
                      className="flex min-h-[44px] items-center rounded-xl border border-line bg-white px-4 py-3 text-[14px] text-ink transition-colors hover:border-canopy-mid/40 hover:text-canopy-deep"
                    >
                      {service.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </div>
    </>
  );
}
