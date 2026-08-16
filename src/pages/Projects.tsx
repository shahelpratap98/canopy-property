import { Link } from 'react-router-dom';
import { ImageIcon, MapPin } from 'lucide-react';
import PageHero from '../components/PageHero';
import QuoteForm from '../components/QuoteForm';
import { hasProjects, projectsWithCategory } from '../data/projects';
import { SITE } from '../siteConfig';

export default function Projects() {
  const projects = projectsWithCategory();

  return (
    <>
      <PageHero
        eyebrow="Our projects"
        title="Work we have finished around Auckland."
        lede={`A look at recent jobs across ${SITE.region} — gardens rebuilt, grounds brought back under control, and properties kept looking their best.`}
        crumbs={[{ label: 'Home', href: '/' }, { label: 'Our projects' }]}
      />

      <div className="bg-paper px-6 py-16">
        <div className="mx-auto max-w-6xl">
          {!hasProjects() ? (
            // Dev-only: in a production build this page is not linked or listed
            // at all until PROJECTS has entries, so visitors never see this.
            <div className="rounded-2xl border border-dashed border-canopy-mid/40 bg-white p-10 text-center">
              <div className="mx-auto mb-4 grid h-12 w-12 place-items-center rounded-full bg-canopy-mid/10">
                <ImageIcon size={22} strokeWidth={1.5} className="text-canopy-mid" aria-hidden="true" />
              </div>
              <h2 className="text-[18px] font-semibold text-ink">No projects added yet</h2>
              <p className="mx-auto mt-2 max-w-[52ch] text-[14px] leading-relaxed text-ink-soft">
                Drop the original photos into <code className="rounded bg-paper-sunk px-1.5 py-0.5">photo-src/</code>,
                run <code className="rounded bg-paper-sunk px-1.5 py-0.5">npm run optimize:photos</code>, then add an
                entry to <code className="rounded bg-paper-sunk px-1.5 py-0.5">src/data/projects.ts</code>. This page
                stays hidden from the nav, footer and sitemap until at least one project exists.
              </p>
            </div>
          ) : (
            <div className="grid gap-8 md:grid-cols-2">
              {projects.map((project) => {
                const [lead, ...rest] = project.images;
                return (
                  <article
                    key={project.slug}
                    className="overflow-hidden rounded-2xl border border-line bg-white"
                  >
                    {lead && (
                      <img
                        src={lead.src}
                        alt={lead.alt}
                        width={1600}
                        height={1067}
                        loading="lazy"
                        decoding="async"
                        className="aspect-[3/2] w-full object-cover"
                      />
                    )}
                    <div className="p-6">
                      <h2 className="text-[20px] font-semibold tracking-tight text-ink">
                        {project.title}
                      </h2>
                      <p className="mt-1.5 flex items-center gap-1.5 text-[13px] text-ink-soft">
                        <MapPin size={14} strokeWidth={1.5} className="text-canopy-mid" aria-hidden="true" />
                        {project.suburb}, {SITE.region}
                      </p>
                      <p className="mt-3 text-[15px] leading-relaxed text-ink-soft">{project.summary}</p>

                      {project.work && project.work.length > 0 && (
                        <ul className="mt-4 flex flex-wrap gap-2">
                          {project.work.map((item) => (
                            <li
                              key={item}
                              className="rounded-full border border-line bg-paper-sunk px-3 py-1 text-[12.5px] text-ink-soft"
                            >
                              {item}
                            </li>
                          ))}
                        </ul>
                      )}

                      {rest.length > 0 && (
                        <div className="mt-5 grid grid-cols-3 gap-2">
                          {rest.map((image) => (
                            <img
                              key={image.src}
                              src={image.src}
                              alt={image.alt}
                              width={1600}
                              height={1067}
                              loading="lazy"
                              decoding="async"
                              className="aspect-[3/2] w-full rounded-lg object-cover"
                            />
                          ))}
                        </div>
                      )}

                      {project.category && (
                        <Link
                          to={`/services/${project.category.slug}`}
                          className="mt-5 inline-flex min-h-[44px] items-center text-[13px] font-medium text-canopy-mid hover:underline"
                        >
                          More {project.category.name.toLowerCase()} →
                        </Link>
                      )}
                    </div>
                  </article>
                );
              })}
            </div>
          )}

          <div className="mt-16 grid gap-10 lg:grid-cols-[1fr_460px]">
            <div>
              <h2 className="font-display text-[24px] font-normal tracking-tight text-ink">
                Want something similar done?
              </h2>
              <p className="mt-4 max-w-[62ch] text-[15px] leading-relaxed text-ink-soft">
                Most of what we do is regular scheduled maintenance, but we take on one-off
                transformations too: overgrown sections brought back, gardens rebuilt from scratch,
                and pre-sale tidy-ups on a deadline. Tell us what the property needs and we will
                give you a free, no-obligation quote.
              </p>
              <p className="mt-4 max-w-[62ch] text-[15px] leading-relaxed text-ink-soft">
                We are {SITE.hours.toLowerCase()}, fully insured, police checked and health and
                safety compliant.
              </p>
            </div>
            <QuoteForm />
          </div>
        </div>
      </div>
    </>
  );
}
