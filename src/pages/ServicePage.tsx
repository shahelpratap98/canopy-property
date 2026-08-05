import { Link, Navigate, useParams } from 'react-router-dom';
import { Check } from 'lucide-react';
import PageHero from '../components/PageHero';
import QuoteForm from '../components/QuoteForm';
import { findService } from '../data/services';
import { SITE } from '../siteConfig';

export default function ServicePage() {
  const { categorySlug, serviceSlug } = useParams();
  const match = findService(categorySlug ?? '', serviceSlug ?? '');
  if (!match) return <Navigate to="/services" replace />;
  const { category, service } = match;

  const siblings = category.services.filter((s) => s.slug !== service.slug);

  return (
    <>
      <PageHero
        eyebrow={category.name}
        title={`${service.name} in Auckland`}
        lede={service.intro}
        crumbs={[
          { label: 'Home', href: '/' },
          { label: 'Services', href: '/services' },
          { label: category.name, href: `/services/${category.slug}` },
          { label: service.name },
        ]}
      />

      <div className="bg-paper px-6 py-16">
        <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[1fr_400px]">
          <div>
            <h2 className="font-display text-[22px] font-normal tracking-tight text-ink">
              What we do
            </h2>
            <ul className="mt-5 space-y-3">
              {service.bullets.map((bullet) => (
                <li key={bullet} className="flex gap-3 text-[15px] leading-relaxed text-ink-soft">
                  <Check
                    size={17}
                    strokeWidth={1.75}
                    className="mt-0.5 shrink-0 text-canopy-mid"
                    aria-hidden="true"
                  />
                  {bullet}
                </li>
              ))}
            </ul>

            <div className="mt-10 rounded-2xl border border-line bg-paper-sunk p-6">
              <h2 className="text-[17px] font-semibold tracking-tight text-ink">
                {service.name} anywhere in {SITE.region}
              </h2>
              <p className="mt-2.5 text-[14px] leading-relaxed text-ink-soft">
                We cover residential and commercial properties across {SITE.region}. Quotes are free
                and there is no obligation — if the job is not right for us, we will say so.
              </p>
            </div>

            {siblings.length > 0 && (
              <section className="mt-12" aria-labelledby="related">
                <h2
                  id="related"
                  className="font-display text-[20px] font-normal tracking-tight text-ink"
                >
                  Related {category.name.toLowerCase()} services
                </h2>
                <ul className="mt-5 flex flex-wrap gap-2.5">
                  {siblings.map((sibling) => (
                    <li key={sibling.slug}>
                      <Link
                        to={`/services/${category.slug}/${sibling.slug}`}
                        className="inline-flex min-h-[44px] items-center rounded-full border border-line bg-white px-4 text-[13px] text-ink-soft transition-colors hover:border-canopy-mid/40 hover:text-canopy-deep"
                      >
                        {sibling.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </section>
            )}
          </div>

          <div className="lg:sticky lg:top-28 lg:self-start">
            <QuoteForm
              whatsappMessage={`Hi ${SITE.name}, I'd like a free quote for ${service.name.toLowerCase()} in Auckland.`}
            />
          </div>
        </div>
      </div>
    </>
  );
}
