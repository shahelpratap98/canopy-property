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
          </div>
        </div>
      </div>
    </>
  );
}
