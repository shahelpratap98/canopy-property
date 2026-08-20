/**
 * Real Google reviews, transcribed by hand from the Google Business listing.
 *
 * NEVER invent a review, an author, a rating or a date. A fabricated
 * testimonial is a lie to customers and, for a trades business, obvious the
 * moment anyone cross-checks the Google listing.
 *
 * Text is verbatim, including the customer's own typos. Tidying a quote makes
 * it no longer a quote.
 *
 * DO NOT add Review or aggregateRating JSON-LD for these. Google's review
 * snippet guidelines are explicit: "Don't aggregate reviews or ratings from
 * other websites", and a business displaying reviews about itself on its own
 * site is ineligible for the star feature — that covers Google Business
 * widgets too. Marking these up earns no stars and risks a manual action.
 * They are displayed as plain content, attributed and linked to the source.
 */

export type Review = {
  author: string;
  /** 1-5, exactly as left on Google. */
  rating: number;
  /** The review text, verbatim. Do not tidy or shorten it. */
  text: string;
  /** As shown on Google, e.g. '2 months ago'. */
  date?: string;
};

/** Shown on the listing itself. Displayed as plain text, never as schema. */
export const GOOGLE_RATING = { score: '5.0', count: 9 };

export const REVIEWS: Review[] = [
  {
    author: 'Heena Munjal',
    rating: 5,
    date: 'a week ago',
    text: 'Highly recommend Vikram for lawn mowing! He did an awesome job … the lawn looks super neat and tidy. He was reliable, friendly, turned up on time, and made sure everything was cleaned up properly afterwards. Really happy with the service.',
  },
  {
    author: 'Tong Li',
    rating: 5,
    date: '3 weeks ago',
    text: 'Excellent service! Friendly staff, great communication and the quality of work was outstanding. The garden looks so much better. Highly recommend!',
  },
  {
    author: 'Sinead Mounsouphom',
    rating: 5,
    date: '4 months ago',
    text: "The gardeners did an awesome job on my grandparents' hedge. It's super straight and neatly trimmed, looks really clean all the way along. It also looks really healthy and full!!!! Definitely makes their place look way tidier.",
  },
  {
    author: 'DEEPSHIKHA CHAUHAN',
    rating: 5,
    date: 'a week ago',
    text: 'It was a great experience. Team was super amazing and helpful. Price was also great. They all did a brilliant job. Highly recommended. Thank you Team Canopy.',
  },
  {
    author: 'Theo Nicholson',
    rating: 5,
    date: '4 months ago',
    text: 'Great service. Prices were perfect. Staff were on-time and super friendly. would recommend to everyone.',
  },
  {
    author: 'Jiten Joshi',
    rating: 5,
    date: 'a week ago',
    text: 'Absolutely amazing work. If you are looking for reliable and best team for peroperty services. Canopy is the go to. 100% Recommend. Thank you.',
  },
  {
    author: 'mamta bhola',
    rating: 5,
    date: '4 months ago',
    text: 'Price is good and great guys and we did your work perfectly. Love your work',
  },
  {
    author: 'Neha Gairola',
    rating: 5,
    date: 'a week ago',
    text: 'Great Services.',
  },
];

export function hasReviews(): boolean {
  return REVIEWS.length > 0;
}
