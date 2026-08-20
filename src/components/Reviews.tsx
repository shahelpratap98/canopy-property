import { Star } from 'lucide-react';
import { GOOGLE_RATING, REVIEWS, hasReviews } from '../data/reviews';
import { SITE } from '../siteConfig';

/**
 * Google reviews, shown as plain attributed content.
 *
 * Deliberately carries NO Review or aggregateRating structured data. Google's
 * guidelines forbid aggregating reviews from other sites and make a business
 * ineligible for star snippets when it displays reviews about itself — so
 * marking these up would earn nothing and risk a manual action.
 *
 * Renders nothing until real reviews exist. Never seed it with invented ones.
 */
export default function Reviews() {
  if (!hasReviews()) return null;

  return (
    <section className="bg-paper-sunk px-6 py-20 md:px-10" aria-labelledby="reviews-heading">
      <div className="mx-auto max-w-6xl">
        <p className="mb-4 text-[11px] font-medium tracking-[0.16em] text-canopy-mid">
          WHAT OUR CUSTOMERS SAY
        </p>
        <h2
          id="reviews-heading"
          className="max-w-[20ch] font-display font-normal text-ink"
          style={{ fontSize: 'clamp(28px,3.6vw,44px)', lineHeight: 1.12, letterSpacing: '-0.02em' }}
        >
          Reviewed by Auckland property owners.
        </h2>

        {/* The headline rating, shown as plain text. Deliberately not
            aggregateRating schema — see the note in data/reviews.ts. */}
        <p className="mt-5 flex flex-wrap items-center gap-2 text-[15px] text-ink-soft">
          <span className="flex items-center gap-0.5" aria-hidden="true">
            {Array.from({ length: 5 }, (_, i) => (
              <Star key={i} size={17} strokeWidth={1.5} className="fill-canopy-mid text-canopy-mid" />
            ))}
          </span>
          <strong className="font-semibold text-ink">{GOOGLE_RATING.score}</strong>
          <span>from {GOOGLE_RATING.count} Google reviews</span>
        </p>

        <ul className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {REVIEWS.map((review) => (
            <li
              key={`${review.author}-${review.text.slice(0, 24)}`}
              className="flex flex-col rounded-2xl border border-line bg-white p-6"
            >
              <div className="flex items-center gap-0.5" aria-label={`${review.rating} out of 5 stars`}>
                {Array.from({ length: 5 }, (_, i) => (
                  <Star
                    key={i}
                    size={16}
                    strokeWidth={1.5}
                    aria-hidden="true"
                    className={
                      i < review.rating
                        ? 'fill-canopy-mid text-canopy-mid'
                        : 'fill-none text-ink-soft/30'
                    }
                  />
                ))}
              </div>
              <blockquote className="mt-4 flex-1 text-[15px] leading-relaxed text-ink-soft">
                {review.text}
              </blockquote>
              <footer className="mt-5 text-[13px] text-ink">
                <span className="font-semibold">{review.author}</span>
                {review.date && <span className="text-ink-soft"> · {review.date}</span>}
              </footer>
            </li>
          ))}
        </ul>

        <p className="mt-8 text-[13px] text-ink-soft">
          Reviews from{' '}
          <a
            href={SITE.googleReviewsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-canopy-mid underline underline-offset-2 hover:text-canopy-deep"
          >
            our Google listing
          </a>
          .
        </p>
      </div>
    </section>
  );
}
