/**
 * Derives the site logo assets from the brand masters in brand-src/.
 *
 *   npm run build:logo
 *
 * The supplied logos are JPEG-family files on a solid white background, which
 * cannot sit on the dark hero header or the deep green footer without showing a
 * white box. This script:
 *   - crops away the large empty margin around the artwork,
 *   - derives an alpha channel from luminance so the background becomes truly
 *     transparent (with a threshold, otherwise the master's slightly-off-white
 *     background leaves a faint rectangular halo around the mark),
 *   - flattens the two greens to a single colour, giving a monochrome mark that
 *     reads cleanly at 44px and inverts for dark backgrounds.
 *
 * Colour comes from the site tokens: ink #14261B on light, white on dark.
 */
import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import ffmpeg from 'ffmpeg-static';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const src = path.join(root, 'brand-src', 'logo-horizontal.master.jfif');
const outDir = path.join(root, 'public');

// Content bounds of the 2000x2000 master, measured rather than guessed.
const CROP = 'crop=1740:612:104:748';
const WIDTH = 900;
// Luminance >= 238 is background; ramp to fully opaque by ~150.
const ALPHA = 'clip((238-(r(X,Y)+g(X,Y)+b(X,Y))/3)*2.9,0,255)';

const variants = [
  { file: 'logo.png', r: 20, g: 38, b: 27 },   // ink #14261B, for light backgrounds
  { file: 'logo-white.png', r: 255, g: 255, b: 255 }, // knockout, for dark backgrounds
];

if (!fs.existsSync(src)) {
  console.error(`missing master: ${src}`);
  process.exit(1);
}

for (const v of variants) {
  const out = path.join(outDir, v.file);
  execFileSync(ffmpeg, [
    '-y', '-loglevel', 'error', '-i', src,
    '-vf', `${CROP},scale=${WIDTH}:-2,format=rgba,geq=r='${v.r}':g='${v.g}':b='${v.b}':a='${ALPHA}'`,
    '-frames:v', '1', out,
  ], { stdio: 'inherit' });
  const { width, height } = { width: WIDTH, height: Math.round((612 / 1740) * WIDTH) };
  console.log(`${v.file}  ${width}x${height}  ${(fs.statSync(out).size / 1024).toFixed(0)} KB`);
}
