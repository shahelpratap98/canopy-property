import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, ArrowRight } from 'lucide-react';
import QuoteForm from '../components/QuoteForm';
import Reviews from '../components/Reviews';
import VideoBackground from '../components/VideoBackground';
import { CATEGORIES } from '../data/services';
import { SITE } from '../siteConfig';

export default function Home() {
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const t = window.setTimeout(() => setShown(true), 40);
    return () => window.clearTimeout(t);
  }, []);

  const reveal = (delay: string) =>
    [
      'transition-all duration-1000 motion-reduce:transition-none',
      delay,
      shown ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0',
    ].join(' ');

  return (
    <>
      {/* Cinematic hero. data-hero-dark tells Header to go transparent/white
          while this band is on screen. */}
      <section
        data-hero-dark
        className="on-dark relative isolate flex min-h-dvh items-center overflow-hidden px-6 pb-16 pt-28 md:px-10"
      >
        <VideoBackground src="/hero-grounds.mp4" />

        <div className="relative z-10 mx-auto grid w-full max-w-6xl items-center gap-10 lg:grid-cols-[1.05fr_460px]">
          <div className={reveal('')}>
            <p className="mb-5 text-[11px] font-medium tracking-[0.16em] text-canopy-light">
              {SITE.tagline.toUpperCase()} · {SITE.region.toUpperCase()}
            </p>
            <h1
              className="font-display font-normal"
              style={{
                fontSize: 'clamp(40px,5.4vw,72px)',
                lineHeight: 1.1,
                letterSpacing: '-0.02em',
              }}
            >
              <span className="block text-white">Grounds that stay immaculate.</span>
              <span className="block" style={{ color: 'rgba(255,255,255,0.55)' }}>
                Year round, without the chasing.
              </span>
            </h1>
            <p className="mt-6 max-w-[620px] text-[15px] leading-relaxed">
              <span className="text-white">
                Lawns, gardens, outdoor cleaning and landscaping for Auckland homes, rentals and
                commercial sites.
              </span>
              <span className="text-white/55">
                {' '}
                One reliable team, on a schedule that suits the season.
              </span>
            </p>

            <ul className="mt-7 flex flex-wrap gap-x-5 gap-y-2">
              {SITE.trust.map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-2 text-[11px] font-medium tracking-[0.14em] text-white/70"
                >
                  <ShieldCheck size={13} strokeWidth={1.5} className="text-canopy-light" />
                  {item.toUpperCase()}
                </li>
              ))}
            </ul>
          </div>

          <div className={reveal('delay-300')}>
            <QuoteForm variant="glass" />
          </div>
        </div>
      </section>

      {/* Everything below the hero is the light paper theme. */}
      <section className="bg-paper px-6 py-20 md:px-10">
        <div className="mx-auto max-w-6xl">
          <p className="mb-4 text-[11px] font-medium tracking-[0.16em] text-canopy-mid">WHAT WE DO</p>
          <h2
            className="max-w-[20ch] font-display font-normal text-ink"
            style={{ fontSize: 'clamp(28px,3.6vw,44px)', lineHeight: 1.12, letterSpacing: '-0.02em' }}
          >
            Five service lines, one contractor.
          </h2>

          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {CATEGORIES.map((category) => (
              <Link
                key={category.slug}
                to={`/services/${category.slug}`}
                className="group flex flex-col rounded-2xl border border-line bg-white p-6 transition-all hover:-translate-y-0.5 hover:border-canopy-mid/40 hover:shadow-[0_18px_40px_-28px_rgba(18,60,34,0.45)]"
              >
                <h3 className="text-[19px] font-semibold tracking-tight text-ink">
                  {category.name}
                </h3>
                <p className="mt-2.5 flex-1 text-[14px] leading-relaxed text-ink-soft">
                  {category.blurb}
                </p>
                <span className="mt-5 inline-flex items-center gap-2 text-[13px] font-medium text-canopy-mid">
                  {category.services.length} services
                  <ArrowRight
                    size={14}
                    strokeWidth={1.5}
                    className="transition-transform group-hover:translate-x-1"
                  />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Reviews />
    </>
  );
}
