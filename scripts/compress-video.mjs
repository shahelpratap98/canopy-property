/**
 * Re-encodes the full-size hero masters in video-src/ into web-weight files in
 * public/.
 *
 * The masters come out of Higgsfield at 2560x1440 and 22-28 Mbps — around 30 MB
 * for the pair, and the hero crossfade loads each file twice. That is far too
 * heavy for an autoplaying background. Run this after replacing a master.
 *
 *   npm run compress:video
 *
 * Notes on the settings:
 *  - 1920 wide is plenty: the video is a backdrop behind a scrim, never studied.
 *  - CRF rather than a fixed bitrate, so quality is held constant and calm
 *    footage gets the file size benefit. maxrate/bufsize cap the worst bursts.
 *  - `-an` strips audio outright — these are muted backgrounds.
 *  - `+faststart` moves the moov atom to the front so playback can begin
 *    before the whole file has arrived.
 *  - yuv420p for universal browser/decoder support.
 */
import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import ffmpeg from 'ffmpeg-static';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const srcDir = path.join(root, 'video-src');
const outDir = path.join(root, 'public');

const JOBS = [
  { master: 'hero-grounds.master.mp4', out: 'hero-grounds.mp4' },
  { master: 'hero-canopy-rise.master.mp4', out: 'hero-canopy-rise.mp4' },
];

const WIDTH = 1920;
const CRF = 25;
const MAXRATE = '4M';
const BUFSIZE = '8M';

const mb = (bytes) => (bytes / 1024 / 1024).toFixed(2);

for (const job of JOBS) {
  const input = path.join(srcDir, job.master);
  const output = path.join(outDir, job.out);
  if (!fs.existsSync(input)) {
    console.error(`missing master: ${job.master} — skipped`);
    continue;
  }

  execFileSync(
    ffmpeg,
    [
      '-y',
      '-loglevel', 'error',
      '-i', input,
      '-vf', `scale=${WIDTH}:-2:flags=lanczos`,
      '-c:v', 'libx264',
      '-profile:v', 'high',
      '-preset', 'slow',
      '-crf', String(CRF),
      '-maxrate', MAXRATE,
      '-bufsize', BUFSIZE,
      '-pix_fmt', 'yuv420p',
      '-an',
      '-movflags', '+faststart',
      output,
    ],
    { stdio: 'inherit' }
  );

  const before = fs.statSync(input).size;
  const after = fs.statSync(output).size;
  console.log(
    `${job.out}: ${mb(before)} MB -> ${mb(after)} MB ` +
      `(${Math.round((1 - after / before) * 100)}% smaller)`
  );
}
