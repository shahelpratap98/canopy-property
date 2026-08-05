import { Mail, MapPin, Phone } from 'lucide-react';
import PageHero from '../components/PageHero';
import QuoteForm from '../components/QuoteForm';
import { WhatsAppInline } from '../components/WhatsAppButton';
import { SITE } from '../siteConfig';

export default function Contact() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Get a free quote."
        lede="Tell us what the property needs and we will come back to you. Residential and commercial, anywhere in Auckland."
        crumbs={[{ label: 'Home', href: '/' }, { label: 'Contact' }]}
      />

      <div className="bg-paper px-6 py-16">
        <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[1fr_460px]">
          <div>
            <h2 className="font-display text-[22px] font-normal tracking-tight text-ink">
              Get in touch
            </h2>
            <ul className="mt-6 space-y-4">
              {SITE.email && (
                <li className="flex items-center gap-3">
                  <Mail size={17} strokeWidth={1.5} className="text-canopy-mid" aria-hidden="true" />
                  <a className="inline-flex min-h-[44px] items-center text-[15px] text-ink hover:text-canopy-deep hover:underline" href={`mailto:${SITE.email}`}>
                    {SITE.email}
                  </a>
                </li>
              )}
              {SITE.phone && (
                <li className="flex items-center gap-3">
                  <Phone size={17} strokeWidth={1.5} className="text-canopy-mid" aria-hidden="true" />
                  <a className="inline-flex min-h-[44px] items-center text-[15px] text-ink hover:text-canopy-deep hover:underline" href={SITE.phoneHref}>
                    {SITE.phone}
                  </a>
                </li>
              )}
              <li className="flex items-center gap-3 text-canopy-mid">
                <WhatsAppInline className="text-ink hover:text-canopy-deep hover:underline" />
              </li>
              <li className="flex items-center gap-3">
                <MapPin size={17} strokeWidth={1.5} className="text-canopy-mid" aria-hidden="true" />
                <span className="text-[15px] text-ink">
                  {SITE.region}, {SITE.country}
                </span>
              </li>
            </ul>

            <p className="mt-8 max-w-[60ch] text-[14px] leading-relaxed text-ink-soft">
              We service residential and commercial properties across {SITE.region}. Quotes are free
              and carry no obligation.
            </p>
          </div>

          <QuoteForm />
        </div>
      </div>
    </>
  );
}
