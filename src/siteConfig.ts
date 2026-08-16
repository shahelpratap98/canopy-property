/**
 * Business facts and contact details.
 * PLACEHOLDERS are marked — do not invent values for these.
 */

import { hasProjects } from './data/projects';

export type Contact = {
  /** Person's name, shown next to the number. */
  name: string;
  /** Short label, e.g. what to use this number for. */
  role: string;
  /** Display form, NZ national format. */
  phone: string;
  /** tel: link in E.164. Blank means the entry is hidden everywhere. */
  phoneHref: string;
};

export const SITE = {
  name: 'Canopy Property Services',
  shortName: 'Canopy',
  tagline: 'Landscaping & Gardening',
  region: 'Auckland',
  country: 'New Zealand',

  // TODO(owner): replace before launch.
  url: 'https://canopypropertyservices.co.nz',

  email: 'hello@canopypropertyservices.co.nz',

  /**
   * Both numbers take calls. An entry with a blank phone/phoneHref disappears
   * from the site entirely rather than rendering a dead tel: link.
   */
  contacts: [
    { name: 'Vikram', role: 'Calls and WhatsApp', phone: '022 645 1558', phoneHref: 'tel:+64226451558' },
    { name: 'Vishal', role: 'Calls', phone: '022 049 7635', phoneHref: 'tel:+64220497635' },
  ] as Contact[],

  /**
   * WhatsApp number in FULL INTERNATIONAL FORM, digits only — no +, spaces,
   * brackets or leading 0. This is Vikram's number (+64 22 645 1558).
   * Leave blank and every WhatsApp entry point disappears rather than
   * rendering a broken link.
   */
  whatsapp: '64226451558',

  /** Visible opening hours. Kept in sync with the openingHoursSpecification
   *  in seo.ts — structured data must reflect what is on the page. */
  hours: 'Open 7 days, 8am to 8pm',
  hoursSchema: {
    opens: '08:00',
    closes: '20:00',
    days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
  },

  /** 1200x630, generated from the hero master by scripts/. */
  ogImage: '/og-image.jpg',

  trust: [
    'Free quotes',
    'Open 7 days',
    'Fully insured',
    'Health & safety compliant',
    'Police checked',
  ],
} as const;

/** Contacts that are actually configured. Callers must render only these. */
export function activeContacts(): Contact[] {
  return SITE.contacts.filter((c) => c.phone && c.phoneHref);
}

/** Used where only one number fits: the Call now button and JSON-LD telephone. */
export function primaryContact(): Contact | null {
  return activeContacts()[0] ?? null;
}

/** Strips the tel: prefix for structured data, which wants bare E.164. */
export function e164(contact: Contact): string {
  return contact.phoneHref.replace(/^tel:/, '');
}

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

const NAV_ALL = [
  { label: 'Home', href: '/' },
  { label: 'Services', href: '/services' },
  { label: 'Our projects', href: '/projects' },
  { label: 'About us', href: '/about' },
  { label: 'Contact', href: '/contact' },
] as const;

/**
 * Nav items that should actually be shown.
 *
 * /projects is dropped until at least one project exists, so the site never
 * links to an empty gallery. Visible in `npm run dev` regardless, so the page
 * can be worked on before the photos arrive.
 */
export const NAV = NAV_ALL.filter(
  (item) => item.href !== '/projects' || hasProjects() || import.meta.env.DEV
);
