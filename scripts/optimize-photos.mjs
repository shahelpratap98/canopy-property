/**
 * Turns original project photos in photo-src/ into web-sized copies in
 * public/projects/.
 *
 *   npm run optimize:photos
 *
 * Photos straight off a phone are typically 4-8 MB each at 4000px wide. A
 * gallery of those would dwarf even the hero videos, so they are resized to
 * 1600px (plenty for a 2x retina card) and re-encoded.
 *
 * Uses the same project-local ffmpeg binary as the video pipeline, so there is
 * no extra dependency. EXIF orientation is applied and then stripped, along
 * with any GPS data the camera recorded — worth doing before publishing photos
 * taken at customers' homes.
 */
import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import ffmpeg from 'ffmpeg-static';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const srcDir = path.join(root, 'photo-src');
const outDir = path.join(root, 'public', 'projects');

const WIDTH = 1600;
const QUALITY = 4; // ffmpeg mjpeg scale, 2 (best) to 31 (worst)

if (!fs.existsSync(srcDir)) {
  console.log(`No photo-src/ directory yet. Create it and drop the original photos in.`);
  process.exit(0);
}
fs.mkdirSync(outDir, { recursive: true });

const files = fs
  .readdirSync(srcDir)
  .filter((f) => /\.(jpe?g|png|webp|heic)$/i.test(f));

if (!files.length) {
  console.log('photo-src/ is empty. Nothing to do.');
  process.exit(0);
}

const mb = (b) => (b / 1024 / 1024).toFixed(2);
let before = 0;
let after = 0;

for (const file of files) {
  const input = path.join(srcDir, file);
  const out = file.replace(/\.[^.]+$/, '').toLowerCase().replace(/[^a-z0-9]+/g, '-') + '.jpg';
  const output = path.join(outDir, out);

  try {
    execFileSync(
      ffmpeg,
      [
        '-y',
        '-loglevel', 'error',
        '-i', input,
        // Downscale only; never upscale a photo that is already small.
        '-vf', `scale='min(${WIDTH},iw)':-2:flags=lanczos`,
        '-q:v', String(QUALITY),
        // Drop EXIF, including any GPS coordinates from the customer's address.
        '-map_metadata', '-1',
        output,
      ],
      { stdio: 'inherit' }
    );
  } catch {
    console.error(`FAILED: ${file} (HEIC needs converting to JPEG first)`);
    continue;
  }

  const b = fs.statSync(input).size;
  const a = fs.statSync(output).size;
  before += b;
  after += a;
  console.log(`${file} -> projects/${out}   ${mb(b)} MB -> ${mb(a)} MB`);
}

if (before) {
  console.log(
    `\ntotal ${mb(before)} MB -> ${mb(after)} MB ` +
      `(${Math.round((1 - after / before) * 100)}% smaller)`
  );
  console.log('Now add entries to src/data/projects.ts, with real alt text for each image.');
}
