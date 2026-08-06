/**
 * Business facts and contact details.
 * PLACEHOLDERS are marked — do not invent values for these.
 */
export const SITE = {
  name: 'Canopy Property Services',
  shortName: 'Canopy',
  tagline: 'Landscaping & Gardening',
  region: 'Auckland',
  country: 'New Zealand',

  // TODO(owner): replace before launch.
  url: 'https://canopypropertyservices.co.nz',
  email: 'hello@canopypropertyservices.co.nz',
  phone: '021 269 8124',            // display form
  phoneHref: 'tel:+64212698124',    // E.164 for the tel: link and JSON-LD

  /**
   * WhatsApp number in FULL INTERNATIONAL FORM, digits only — no +, spaces,
   * brackets or leading 0. An NZ mobile 021 123 4567 becomes '64211234567'.
   * Leave blank and every WhatsApp entry point disappears rather than
   * rendering a broken link.
   */
  whatsapp: '64212698124', // +64 21 269 8124

  /** Visible opening hours. Kept in sync with the openingHoursSpecification
   *  in seo.ts — structured data must reflect what is on the page. */
  hours: 'Monday to Friday, 8am to 5pm',
  hoursSchema: { opens: '08:00', closes: '17:00', days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'] },

  /** 1200x630, generated from the hero master by scripts/. */
  ogImage: '/og-image.jpg',

  trust: [
    'Free quotes',
    'Residential & commercial',
    'Fully insured',
    'Police checked',
  ],
} as const;

const DEFAULT_WHATSAPP_MESSAGE =
  `Hi ${SITE.name}, I'd like a free quote for my property in Auckland.`;

/**
 * Builds a wa.me link, or returns null when no number is configured.
 * Callers must treat null as "hide the entry point entirely".
 */
export function whatsappUrl(message: string = DEFAULT_WHATSAPP_MESSAGE): string | null {
  const digits = SITE.whatsapp.replace(/\D/g, '');
  if (!digits) return null;
  return `https://wa.me/${digits}?text=${encodeURIComponent(message)}`;
}

export const NAV = [
  { label: 'Home', href: '/' },
  { label: 'Services', href: '/services' },
  { label: 'About us', href: '/about' },
  { label: 'Contact', href: '/contact' },
] as const;
