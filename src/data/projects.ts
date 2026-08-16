/**
 * Completed work, shown on /projects.
 *
 * EMPTY UNTIL REAL PHOTOS EXIST. Do not seed this with invented projects or
 * stock imagery — a fake portfolio is worse than no portfolio.
 *
 * To add one:
 *  1. Drop the original photos in `photo-src/` (any size, straight off a phone).
 *  2. Run `npm run optimize:photos` — writes web-sized copies to
 *     `public/projects/` and reports the saving.
 *  3. Add an entry below. Every image needs real alt text describing what is
 *     in the photo, not "project photo".
 *
 * Once at least one project exists, /projects automatically appears in the
 * nav, the footer and the sitemap.
 */

import { CATEGORIES } from './services';

export type ProjectImage = {
  /** Path under /projects/, e.g. '/projects/remuera-hedge-after.jpg' */
  src: string;
  /** Describes what is actually in the photo. Required. */
  alt: string;
  /** Optional caption shown under the image. */
  caption?: string;
};

export type Project = {
  slug: string;
  title: string;
  /** Auckland suburb, e.g. 'Remuera'. Shown as the location line. */
  suburb: string;
  /** Slug from CATEGORIES in services.ts, used to link back to the service. */
  categorySlug?: string;
  /** Two or three sentences on what the job involved. */
  summary: string;
  /** What was actually done. Keep them short. */
  work?: string[];
  images: ProjectImage[];
};

export const PROJECTS: Project[] = [];

export function hasProjects(): boolean {
  return PROJECTS.length > 0;
}

/** Attaches the parent category object where one is set. */
export function projectsWithCategory() {
  return PROJECTS.map((p) => ({
    ...p,
    category: CATEGORIES.find((c) => c.slug === p.categorySlug) ?? null,
  }));
}
