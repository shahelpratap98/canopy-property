# Canopy Property Services

Marketing site for an Auckland landscaping and grounds-maintenance business.
React + TypeScript + Vite + Tailwind, with GSAP for the hero parallax.

## Commands

```bash
npm install
npm run dev      # local dev server
npm run build    # client build -> SSR build -> prerender 47 static pages
npm run preview  # serve dist/
```

**`npm run dev` alone will not show you the real SEO output.** Titles, meta
descriptions, canonicals and JSON-LD are injected by `scripts/prerender.mjs` at
build time. To check them, run `npm run build` and serve `dist/` **without** a
SPA fallback — a fallback masks the per-route files.

## Architecture

| File | Role |
|---|---|
| `src/data/services.ts` | **Single source of truth.** 5 categories, 38 services, per-page SEO copy. Add a service here and nav, category pages, service pages, sitemap and JSON-LD all pick it up. |
| `src/seo.ts` | `ROUTES` (titles/descriptions/priorities) and `schemasFor(path)` (JSON-LD). |
| `src/siteConfig.ts` | Business facts, contact details, nav. |
| `scripts/prerender.mjs` | Writes one real `index.html` per route + `sitemap.xml` + `robots.txt`. |

Every service has its own URL: `/services/<category>/<service>`. This is the
point of the prerender step — a client-rendered SPA ships an empty `<div id="root">`,
so all 38 service pages would look identical and empty to a crawler.

## Video pipeline

Full-size masters live in `video-src/` and **are tracked** (~30 MB), so they
survive a fresh clone — they cost credits to generate and cannot be reproduced
exactly. `public/*.mp4` are the compressed derivatives that actually ship.

```bash
npm run compress:video
```

Uses `ffmpeg-static` (a project-local ffmpeg binary in `node_modules`, no system
install). 1920 wide, CRF 25, capped at 4 Mbps, audio stripped, `+faststart`,
yuv420p.

| File | Master | Shipped |
|---|---|---|
| `hero-grounds.mp4` | 12.98 MB @ 2560×1440 | **2.57 MB** @ 1920×1080 (−80%) |
| `hero-canopy-rise.mp4` | 16.78 MB @ 2560×1440 | **2.51 MB** @ 1920×1080 (−85%) |

Duration is preserved exactly (5.17s), which matters — the crossfade handover in
`VideoBackground` is computed from `duration`.

Re-run this after replacing any master. Note `npm approve-scripts ffmpeg-static`
is needed once on a fresh install, since npm 11 blocks postinstall scripts and
that is how the binary is fetched.

## Theme

Two zones, deliberately:

| Zone | Background | Text |
|---|---|---|
| Landing hero (only place the video plays) | dark video + green gradient scrim | white |
| Every page body | `paper` `#FAFAF7` | `ink` `#14261B` |
| Footer | `canopy-deep` `#123C22` | white |

`Header` swaps its own palette — transparent with white text while it overlaps
the hero, then paper with ink text once scrolled past it (and on every non-home
page). `QuoteForm` takes a `variant`: `glass` on the hero, `paper` elsewhere.
Wrap any dark-background region in `.on-dark` so the focus ring switches to
`canopy-light`; `canopy-light` fails contrast on paper and is for dark only.

**Tailwind opacity modifiers must be multiples of 5.** `bg-paper/92` and
`bg-canopy-mid/12` compiled to *nothing at all* — no rule, no error, silently
transparent. Use `/95` and `/10`, or arbitrary `/[0.92]` syntax.

## WhatsApp

Set `whatsapp` in `src/siteConfig.ts` to the number in **full international form,
digits only** — no `+`, spaces, brackets or leading zero. An NZ mobile
`021 123 4567` becomes `'64211234567'`.

**That one value is the only thing left to do.** Everything else is wired.

| Where | What | Prefilled message |
|---|---|---|
| All pages | Floating button, bottom-right — pill with label on desktop, 56px circle on mobile | Generic |
| All pages | Footer, under the brand blurb | Generic |
| Contact page | Inline link in the contact list | Generic |
| Quote form | "Prefer to chat? WhatsApp us" under the submit button | **Names the service or category** on those pages |

**Production never ships a dead link.** With the number blank, a `npm run build`
emits zero WhatsApp markup across all 47 pages — verified.

**`npm run dev` shows them anyway**, so the buttons can be seen and positioned
before a number exists. In that state they render with an amber ring, the label
"WhatsApp (no number)", a `data-whatsapp-unconfigured` attribute, no `href`, and
a click handler that does nothing. The switch is `import.meta.env.DEV`, which is
false in every build — so this cannot leak into production.

Styled in the canopy greens, **not** WhatsApp's `#25D366` — a brand-green blob
fights the palette on every page. The glyph carries the recognition. It is an
inline SVG because lucide dropped brand icons.

The floating button **hides itself while the quote form is on screen.** This is
not cosmetic: the FAB spans x299–355 and the form's submit button spans x45–330
at 375px wide, so they overlap by 31px, and a hit-test at that point returned
the WhatsApp link instead of the submit button. The form has its own WhatsApp
link, so the FAB steps aside via an IntersectionObserver on `#quote`.

## Deliberate decisions

**Two videos, two places.** `VideoBackground` takes a `src` prop and is
`absolute inset-0` inside its own section — never `fixed` behind the whole app,
which would put it under the light pages.

| File | Page | Shot |
|---|---|---|
| `hero-grounds.mp4` | `/` landing hero | Elevated aerial gliding forward and descending over the courtyard |
| `hero-canopy-rise.mp4` | `/about` band | Rise from beneath the oak up through the canopy — the brand's namesake |

Any section wanting the transparent-header treatment must carry
`data-hero-dark`; `Header` measures that element's rect rather than assuming a
full-viewport hero, because the About band is shorter than the home one. Keep
`DARK_HERO_ROUTES` in `Header.tsx` in sync — it supplies the correct
server-rendered value before the DOM can be measured.

**The scrim was deepened for the grounds clip.** That footage is much brighter
than the original (pale concrete, sky, building), and the old scrim let it punch
through: worst-case contrast on the muted headline was 1.38:1 and on the lede
2.19:1. The current values put every hero line above AA at its *worst* pixel
(6.75 / 4.54 / 12.78). Re-check these if the hero video is ever swapped again —
scrim strength is tied to the specific clip behind it.

**Playback runs at 0.75×.** The source is 24fps, so slowing playback holds each
frame longer rather than generating new ones; 0.75 holds each source frame ~2.2
display frames, which the drone shot's motion blur absorbs. Below about 0.6×,
stepping starts to show in the foreground foliage. The crossfade threshold is
rate-adjusted (`duration - currentTime <= FADE * RATE`), otherwise a slowed clip
hands over early and clips the end of the rise.

**The second video copy is `preload="none"`** until the first is actually
playing. Decoding two 1440p streams during first paint is the main cause of hero
jank on modest hardware.

**The hero video does not use `loop`.** `src/components/VideoBackground.tsx`
crossfades two stacked `<video>` elements instead. The clip is a one-way aerial
rise: its last frame sits far from its first (measured mean channel difference
21/255), so a plain `loop` visibly jumps every cycle. A 0.9s handover hides it.

There is an `ended` listener as well as the rAF timer, because rAF is throttled
in background tabs — without it the clip dead-ends on its last frame when a user
switches away and back. This was observed, not theorised.

`playbackRate` is set imperatively in the effect, not only via
`onLoadedMetadata`. The `<video>` tags are prerendered, so `loadedmetadata` can
fire before React hydrates and attaches the handler.

**The hero scrim is a plain gradient, never `backdrop-filter`.** A full-viewport
blur recomputed every video frame caused real desktop jank on a previous build.

## Before launch — outstanding

1. ~~Compress both videos.~~ **Done** — see *Video pipeline* below.
2. **The quote form does not submit anywhere.** It composes a `mailto:` in the
   visitor's mail client. Wire a real endpoint (Formspree / Resend / serverless)
   in `src/components/QuoteForm.tsx` — search for the `NOTE:` comment.
3. **Fill in the placeholders in `src/siteConfig.ts`**: `url`, `email`, `phone`,
   `phoneHref`, `whatsapp`. Blank contact fields are deliberately omitted from
   JSON-LD — do not populate structured data with guesses. Until `whatsapp` is
   set, the WhatsApp button does not exist on the site.
4. **Confirm brand hex codes.** The greens in `tailwind.config.js` were sampled
   by eye from the logo image, not from a brand spec.

## Verified

- 47 pages prerendered; each with unique `<title>`, meta description, canonical,
  `h1`, breadcrumbs and LocalBusiness + Service + BreadcrumbList JSON-LD
- No horizontal scroll at 375px or desktop
- All interactive targets ≥44px
- Form inputs 16px (below that, iOS auto-zooms on focus)
- Light-theme contrast: body text 6.41:1, nav links 6.29:1, header CTA 12.39:1 — all pass AA
- Hero video present on `/` only; zero `<video>` elements on the other 46 pages
- Form: blocks empty submit, shows per-field errors, sets `aria-invalid`,
  links `aria-describedby`, moves focus to the first invalid field, validates
  on blur rather than per keystroke
- `prefers-reduced-motion` disables the GSAP parallax and the crossfade transition
