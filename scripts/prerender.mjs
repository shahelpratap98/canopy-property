/**
 * Writes one real static HTML file per route, plus sitemap.xml and robots.txt.
 *
 * Service pages only earn search traffic if the HTML a crawler receives already
 * contains the content. A client-rendered SPA ships an empty <div id="root">,
 * so every one of the 38 service pages would look identical and empty.
 */
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dist = path.join(root, 'dist');

// pathToFileURL: Windows ESM refuses a bare "C:\..." specifier.
const { render, ROUTES, metaFor, schemasFor } = await import(
  pathToFileURL(path.join(root, '.ssr', 'entry-server.js')).href
);

const template = await fs.readFile(path.join(dist, 'index.html'), 'utf-8');

const escape = (s) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

const SITE_URL = 'https://canopypropertyservices.co.nz';

let written = 0;

for (const route of ROUTES) {
  const meta = metaFor(route.path);
  const appHtml = render(route.path);

  const head = [
    `<link rel="canonical" href="${SITE_URL}${route.path}" />`,
    `<meta property="og:title" content="${escape(meta.title)}" />`,
    `<meta property="og:description" content="${escape(meta.description)}" />`,
    `<meta property="og:type" content="website" />`,
    `<meta property="og:url" content="${SITE_URL}${route.path}" />`,
    // twitter:card promises a large image, so one must actually exist.
    `<meta property="og:image" content="${SITE_URL}/og-image.jpg" />`,
    `<meta property="og:image:width" content="1200" />`,
    `<meta property="og:image:height" content="630" />`,
    `<meta property="og:image:alt" content="${escape(
      'Aerial view of immaculately maintained apartment grounds in Auckland, with striped lawn and clipped hedges'
    )}" />`,
    `<meta property="og:site_name" content="Canopy Property Services" />`,
    `<meta property="og:locale" content="en_NZ" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:image" content="${SITE_URL}/og-image.jpg" />`,
    ...schemasFor(route.path).map(
      (schema) => `<script type="application/ld+json">${JSON.stringify(schema)}</script>`
    ),
  ].join('\n    ');

  const html = template
    .replace(
      /<title>[\s\S]*?<\/title>/,
      `<title>${escape(meta.title)}</title>`
    )
    .replace(
      /<meta\s+name="description"[\s\S]*?\/>/,
      `<meta name="description" content="${escape(meta.description)}" />`
    )
    .replace('<!--app-head-->', head)
    .replace('<!--app-html-->', appHtml);

  const outDir =
    route.path === '/' ? dist : path.join(dist, ...route.path.split('/').filter(Boolean));
  await fs.mkdir(outDir, { recursive: true });
  await fs.writeFile(path.join(outDir, 'index.html'), html);
  written++;
}

const lastmod = new Date().toISOString().slice(0, 10);
const urls = ROUTES.map(
  (r) =>
    `  <url><loc>${SITE_URL}${r.path}</loc><lastmod>${lastmod}</lastmod>` +
    `<priority>${r.priority.toFixed(1)}</priority></url>`
).join('\n');

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;

await fs.writeFile(path.join(dist, 'sitemap.xml'), sitemap);
await fs.writeFile(
  path.join(dist, 'robots.txt'),
  `User-agent: *\nAllow: /\n\nSitemap: ${SITE_URL}/sitemap.xml\n`
);

console.log(`prerendered ${written} pages + sitemap.xml + robots.txt`);
