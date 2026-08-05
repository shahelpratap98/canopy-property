import { CATEGORIES } from './data/services';
import { SITE } from './siteConfig';

export type RouteMeta = {
  path: string;
  title: string;
  description: string;
  /** Sitemap priority, 0–1. */
  priority: number;
};

const suffix = ` | ${SITE.name}`;

export const ROUTES: RouteMeta[] = [
  {
    path: '/',
    title: `${SITE.name} — Landscaping & Gardening, Auckland`,
    description:
      'Canopy Property Services keeps Auckland residential and commercial grounds immaculate — lawns, gardens, outdoor cleaning, landscaping and scheduled maintenance. Free quotes.',
    priority: 1.0,
  },
  {
    path: '/services',
    title: `Our Services — Auckland Property & Grounds Maintenance${suffix}`,
    description:
      'Lawn and garden maintenance, property maintenance, outdoor cleaning, landscaping and commercial grounds contracts across Auckland. Free quotes.',
    priority: 0.9,
  },
  {
    path: '/about',
    title: `About Us — Auckland Property Maintenance${suffix}`,
    description:
      'Canopy Property Services is an Auckland landscaping and grounds maintenance team. Fully insured, police checked, and committed to quality workmanship.',
    priority: 0.6,
  },
  {
    path: '/contact',
    title: `Contact — Free Quotes Across Auckland${suffix}`,
    description:
      'Get in touch with Canopy Property Services for a free, no-obligation quote on residential or commercial grounds maintenance anywhere in Auckland.',
    priority: 0.7,
  },
  ...CATEGORIES.map((category) => ({
    path: `/services/${category.slug}`,
    title: `${category.name} Auckland${suffix}`,
    description: category.metaDescription,
    priority: 0.8,
  })),
  ...CATEGORIES.flatMap((category) =>
    category.services.map((service) => ({
      path: `/services/${category.slug}/${service.slug}`,
      title: `${service.seoTitle}${suffix}`,
      description: service.metaDescription,
      priority: 0.7,
    }))
  ),
];

export function metaFor(path: string): RouteMeta {
  return ROUTES.find((r) => r.path === path) ?? ROUTES[0];
}

/** LocalBusiness + per-service schema. Contact fields are omitted when blank —
 *  never populate structured data with guessed values. */
export function schemasFor(path: string): object[] {
  const business: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: SITE.name,
    description: ROUTES[0].description,
    url: SITE.url,
    areaServed: { '@type': 'City', name: 'Auckland', addressCountry: 'NZ' },
    address: { '@type': 'PostalAddress', addressLocality: 'Auckland', addressCountry: 'NZ' },
  };
  if (SITE.email) business.email = SITE.email;
  if (SITE.phone) business.telephone = SITE.phone;

  const schemas: object[] = [business];

  const match = path.match(/^\/services\/([^/]+)\/([^/]+)$/);
  if (match) {
    const category = CATEGORIES.find((c) => c.slug === match[1]);
    const service = category?.services.find((s) => s.slug === match[2]);
    if (category && service) {
      schemas.push({
        '@context': 'https://schema.org',
        '@type': 'Service',
        name: service.name,
        serviceType: category.name,
        description: service.metaDescription,
        areaServed: { '@type': 'City', name: 'Auckland', addressCountry: 'NZ' },
        provider: { '@type': 'LocalBusiness', name: SITE.name, url: SITE.url },
      });
      schemas.push({
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: SITE.url },
          { '@type': 'ListItem', position: 2, name: 'Services', item: `${SITE.url}/services` },
          {
            '@type': 'ListItem',
            position: 3,
            name: category.name,
            item: `${SITE.url}/services/${category.slug}`,
          },
          { '@type': 'ListItem', position: 4, name: service.name },
        ],
      });
    }
  }
  return schemas;
}
