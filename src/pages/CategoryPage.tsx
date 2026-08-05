import { Link, Navigate, useParams } from 'react-router-dom';
import PageHero from '../components/PageHero';
import QuoteForm from '../components/QuoteForm';
import { CATEGORIES } from '../data/services';

export default function CategoryPage() {
  const { categorySlug } = useParams();
  const category = CATEGORIES.find((c) => c.slug === categorySlug);
  if (!category) return <Navigate to="/services" replace />;

  return (
    <>
      <PageHero
        eyebrow={category.name}
        title={`${category.name} in Auckland`}
        lede={category.blurb}
        crumbs={[
          { label: 'Home', href: '/' },
          { label: 'Services', href: '/services' },
          { label: category.name },
        ]}
      />

      <div className="bg-paper px-6 py-16">
        <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[1fr_400px]">
          <div>
            <h2 className="font-display text-[22px] font-normal tracking-tight text-ink">
              What this covers
            </h2>
            <ul className="mt-6 grid gap-3 sm:grid-cols-2">
              {category.services.map((service) => (
                <li key={service.slug}>
                  <Link
                    to={`/services/${category.slug}/${service.slug}`}
                    className="group block rounded-xl border border-line bg-white p-4 transition-all hover:-translate-y-0.5 hover:border-canopy-mid/40 hover:shadow-[0_14px_30px_-22px_rgba(18,60,34,0.5)]"
                  >
                    <span className="block text-[15px] font-medium text-ink">{service.name}</span>
                    <span className="mt-1 block text-[13px] leading-relaxed text-ink-soft">
                      {service.metaDescription}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="lg:sticky lg:top-28 lg:self-start">
            <QuoteForm
              whatsappMessage={`Hi Canopy Property Services, I'd like a free quote for ${category.name.toLowerCase()} in Auckland.`}
            />
          </div>
        </div>
      </div>
    </>
  );
}
