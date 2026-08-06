import { Link } from 'react-router-dom';
import VideoBackground from '../components/VideoBackground';
import { SITE } from '../siteConfig';

const POINTS = [
  {
    title: 'Fully insured',
    body: 'Every job is covered, on residential and commercial sites alike.',
  },
  {
    title: 'Police checked',
    body: 'Our team is police checked — which matters on school grounds, rentals and occupied homes.',
  },
  {
    title: 'Free quotes',
    body: 'No charge and no obligation. If a job is not right for us, we will tell you.',
  },
  {
    title: 'Quality workmanship',
    body: 'The standard is the same on the tenth visit as it was on the first.',
  },
];

export default function About() {
  return (
    <>
      {/* Cinematic band. The rise-through-the-canopy clip lives here rather than
          on the landing page: it is literally the brand's namesake, so it earns
          its place on the story page. */}
      <section
        data-hero-dark
        className="on-dark relative isolate flex min-h-[68vh] items-end overflow-hidden px-6 pb-14 pt-32 md:px-10"
      >
        <VideoBackground src="/hero-canopy-rise.mp4" />

        <div className="relative z-10 mx-auto w-full max-w-6xl">
          <nav aria-label="Breadcrumb" className="mb-3">
            <ol className="flex flex-wrap items-center gap-x-2 text-[12px] text-white/60">
              <li className="flex items-center gap-2">
                <Link className="inline-flex min-h-[44px] items-center hover:text-white" to="/">
                  Home
                </Link>
                <span aria-hidden="true" className="text-white/40">
                  /
                </span>
              </li>
              <li className="text-white">About us</li>
            </ol>
          </nav>

          <p className="mb-4 text-[11px] font-medium tracking-[0.16em] text-canopy-light">
            ABOUT US
          </p>
          <h1
            className="max-w-[18ch] font-display font-normal text-white"
            style={{ fontSize: 'clamp(32px,4.6vw,58px)', lineHeight: 1.1, letterSpacing: '-0.02em' }}
          >
            An Auckland team that turns up.
          </h1>
          <p className="mt-5 max-w-[62ch] text-[16px] leading-relaxed text-white/70">
            {SITE.name} looks after grounds across {SITE.region} — homes, rentals, lifestyle blocks,
            body corporates and commercial sites. Residential and commercial, one-off or on contract.
          </p>
        </div>
      </section>

      <div className="bg-paper px-6 py-16">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-5 sm:grid-cols-2">
            {POINTS.map((point) => (
              <div key={point.title} className="rounded-2xl border border-line bg-white p-6">
                <h2 className="text-[18px] font-semibold tracking-tight text-ink">{point.title}</h2>
                <p className="mt-2 text-[14px] leading-relaxed text-ink-soft">{point.body}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 max-w-[68ch]">
            <h2 className="font-display text-[24px] font-normal tracking-tight text-ink">
              How we work
            </h2>
            <p className="mt-4 text-[15px] leading-relaxed text-ink-soft">
              Most of what we do is regular, scheduled work — the kind where the value is in it
              simply happening, on time, without anyone having to chase it. We agree the scope and
              the frequency up front so the invoicing is predictable, then we get on with it.
            </p>
            <p className="mt-4 text-[15px] leading-relaxed text-ink-soft">
              We also take one-off jobs: a section that has got away over a wet spring, a pre-sale
              tidy-up on a deadline, or a garden that needs rebuilding rather than maintaining.
            </p>
            <p className="mt-4 text-[15px] leading-relaxed text-ink-soft">
              Because we cover lawns, gardens, outdoor cleaning and landscaping under one roof, a
              property does not need three different contractors and three different schedules. The
              same team that mows the lawn can clear the gutters before winter, wash the paths when
              they turn slippery, and rebuild a tired bed in spring.
            </p>
          </div>

          <div className="mt-12 max-w-[68ch]">
            <h2 className="font-display text-[24px] font-normal tracking-tight text-ink">
              Who we work for
            </h2>
            <p className="mt-4 text-[15px] leading-relaxed text-ink-soft">
              Homeowners who would rather spend the weekend elsewhere. Landlords and property
              managers who need the grounds to pass an inspection without chasing anyone. Body
              corporates where shared grounds need one contractor holding one standard rather than a
              rotating cast. Schools, offices and retail frontages where the first thing anyone sees
              is the outside.
            </p>
            <p className="mt-4 text-[15px] leading-relaxed text-ink-soft">
              Being police checked matters more on some of those sites than others, but we hold the
              same standard everywhere: school grounds, tenanted rentals and occupied homes all get
              the same team and the same care.
            </p>
          </div>

          <div className="mt-12 max-w-[68ch]">
            <h2 className="font-display text-[24px] font-normal tracking-tight text-ink">
              Working with the Auckland seasons
            </h2>
            <p className="mt-4 text-[15px] leading-relaxed text-ink-soft">
              Auckland's warm, wet climate is the reason grounds here need a rhythm rather than an
              annual tidy. Growth runs away through spring and summer, so mowing and edging move to
              a tighter cycle. Autumn is for pruning, feeding and getting gutters clear before the
              rain. Winter is when moss and mould take hold on paths, decks and cladding, which is
              when soft washing earns its place.
            </p>
            <p className="mt-4 text-[15px] leading-relaxed text-ink-soft">
              We plan the year around that rather than treating every visit the same, which is what
              keeps a property looking maintained instead of merely cut.
            </p>
          </div>

          <div className="mt-12 max-w-[68ch]">
            <p className="text-[15px] leading-relaxed text-ink-soft">
              We are open {SITE.hours.toLowerCase()}, and quotes are always free.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
