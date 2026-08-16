import { Clock, Mail, MapPin, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';
import PageHero from '../components/PageHero';
import QuoteForm from '../components/QuoteForm';
import { WhatsAppInline } from '../components/WhatsAppButton';
import { SITE, activeContacts } from '../siteConfig';

const STEPS = [
  {
    title: 'You tell us the basics',
    body: 'The property, the suburb and roughly what needs doing. A photo helps if something is overgrown or you are not sure what to call it.',
  },
  {
    title: 'We take a look',
    body: 'For most jobs we can quote from a description and a couple of photos. For larger sections, landscaping or contract work we will arrange a site visit.',
  },
  {
    title: 'You get a fixed price',
    body: 'Written, itemised and with no obligation. If the job is not right for us we will say so and point you somewhere better.',
  },
];

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
                  <a className="text-[15px] text-ink hover:text-canopy-deep hover:underline" href={`mailto:${SITE.email}`}>
                    {SITE.email}
                  </a>
                </li>
              )}
              {activeContacts().map((contact) => (
                <li key={contact.phoneHref} className="flex items-center gap-3">
                  <Phone size={17} strokeWidth={1.5} className="text-canopy-mid" aria-hidden="true" />
                  <span className="text-[15px] text-ink">
                    <a className="font-medium hover:text-canopy-deep hover:underline" href={contact.phoneHref}>
                      {contact.phone}
                    </a>
                    {contact.name && (
                      <span className="text-ink-soft">
                        {' '}
                        — {contact.name}
                        {contact.role ? ` (${contact.role.toLowerCase()})` : ''}
                      </span>
                    )}
                  </span>
                </li>
              ))}
              <li className="flex items-center gap-3 text-canopy-mid">
                <WhatsAppInline className="text-ink hover:text-canopy-deep hover:underline" />
              </li>
              <li className="flex items-center gap-3">
                <Clock size={17} strokeWidth={1.5} className="text-canopy-mid" aria-hidden="true" />
                <span className="text-[15px] text-ink">{SITE.hours}</span>
              </li>
              <li className="flex items-center gap-3">
                <MapPin size={17} strokeWidth={1.5} className="text-canopy-mid" aria-hidden="true" />
                <span className="text-[15px] text-ink">
                  {SITE.region}, {SITE.country}
                </span>
              </li>
            </ul>

            <section className="mt-12" aria-labelledby="what-happens">
              <h2
                id="what-happens"
                className="font-display text-[22px] font-normal tracking-tight text-ink"
              >
                What happens after you get in touch
              </h2>
              <ol className="mt-6 space-y-5">
                {STEPS.map((step, i) => (
                  <li key={step.title} className="flex gap-4">
                    <span
                      aria-hidden="true"
                      className="mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-full bg-canopy-deep/10 text-[12px] font-semibold text-canopy-deep"
                    >
                      {i + 1}
                    </span>
                    <div>
                      <h3 className="text-[16px] font-semibold text-ink">{step.title}</h3>
                      <p className="mt-1 max-w-[58ch] text-[14px] leading-relaxed text-ink-soft">
                        {step.body}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
            </section>

            <section className="mt-12" aria-labelledby="where-we-work">
              <h2
                id="where-we-work"
                className="font-display text-[22px] font-normal tracking-tight text-ink"
              >
                Where we work
              </h2>
              <p className="mt-4 max-w-[62ch] text-[15px] leading-relaxed text-ink-soft">
                We cover residential and commercial properties across {SITE.region} — the central
                suburbs, the North Shore, West Auckland, the eastern suburbs and South Auckland. If
                you are on the outer edge of that, ask anyway; for regular contract work we travel
                further than we would for a one-off.
              </p>
              <p className="mt-4 max-w-[62ch] text-[15px] leading-relaxed text-ink-soft">
                Quotes are free and carry no obligation. We are {SITE.hours.toLowerCase()}, so you
                can reach either of us most of the day, seven days a week.
              </p>
              <p className="mt-4 max-w-[62ch] text-[15px] leading-relaxed text-ink-soft">
                We are fully insured, police checked and health and safety compliant, which matters
                on school grounds, tenanted rentals and occupied homes.{' '}
                <Link className="text-canopy-mid hover:text-canopy-deep hover:underline" to="/about#health-safety">
                  How we keep sites safe
                </Link>
                .
              </p>
            </section>
          </div>

          <div className="lg:sticky lg:top-28 lg:self-start">
            <QuoteForm />
          </div>
        </div>
      </div>
    </>
  );
}
