import { useEffect, useRef } from 'react';
import gsap from 'gsap';

const FADE = 0.9; // seconds; must match the CSS transition duration below
const RATE = 0.75; // slower than real time; see note below

/**
 * Hero video. Absolutely positioned inside the hero section (NOT fixed) — it is
 * scoped to the landing page and must not sit behind the light-themed content.
 *
 * Two stacked <video> elements crossfade rather than using the `loop` attribute.
 * The clip is a one-way aerial rise: its last frame sits a long way from its
 * first, so a plain loop visibly jumps every cycle (measured: mean channel
 * difference of 21/255 between first and last frame).
 *
 * On RATE: the source is 24fps, so slowing playback holds each frame longer
 * rather than generating new ones. 0.75 holds each source frame ~2.2 display
 * frames, which the shot's natural motion blur absorbs. Going much below this
 * starts to show stepping in the foreground foliage.
 */
export default function VideoBackground({ src = '/hero-grounds.mp4' }: { src?: string }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const aRef = useRef<HTMLVideoElement>(null);
  const bRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const vids = [aRef.current, bRef.current];
    if (!vids[0] || !vids[1]) return;

    let cur = 0;
    let armed = true;
    let raf = 0;

    // Set the rate here rather than relying solely on onLoadedMetadata: these
    // <video> tags are prerendered, so loadedmetadata can fire before React
    // hydrates and attaches the handler, leaving the rate stuck at 1.
    vids.forEach((v) => {
      if (v) v.playbackRate = RATE;
    });

    const start = () => {
      vids[cur]?.play().catch(() => {
        /* autoplay refused — the first frame remains as a still */
      });
    };
    start();

    // Smoothness: only fetch the second copy once the first is actually playing.
    // Decoding two 1440p streams at once during first paint is the main source
    // of hero jank on modest hardware.
    const onPlaying = () => {
      const b = vids[1]!;
      if (b.preload !== 'auto') {
        b.preload = 'auto';
        b.load();
        b.playbackRate = RATE;
      }
    };
    vids[0]!.addEventListener('playing', onPlaying, { once: true });

    const onFirstInteract = () => start();
    window.addEventListener('pointerdown', onFirstInteract, { once: true, passive: true });

    const handover = () => {
      armed = false;
      const next = vids[1 - cur]!;
      next.currentTime = 0;
      next.playbackRate = RATE;
      next.play().catch(() => {});
      next.style.opacity = '1';
      vids[cur]!.style.opacity = '0';
      const finished = cur;
      window.setTimeout(() => {
        vids[finished]!.pause();
        armed = true;
      }, FADE * 1000);
      cur = 1 - cur;
    };

    const tick = () => {
      const v = vids[cur]!;
      // Compare against playback-rate-adjusted remaining time, otherwise a
      // slowed clip hands over too early and clips the end of the rise.
      if (v.duration && armed && v.duration - v.currentTime <= FADE * RATE) handover();
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    // Safety net: rAF is throttled in background tabs, so the timed handover can
    // be missed and the clip would dead-end on its last frame. `ended` still
    // fires, so restart the cycle from there.
    const onEnded = (e: Event) => {
      if (e.target === vids[cur]) {
        armed = true;
        handover();
      }
    };
    vids.forEach((v) => v!.addEventListener('ended', onEnded));

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('pointerdown', onFirstInteract);
      vids[0]!.removeEventListener('playing', onPlaying);
      vids.forEach((v) => v!.removeEventListener('ended', onEnded));
    };
  }, []);

  // GSAP mouse parallax — skipped entirely when the user prefers reduced motion.
  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;
    let raf = 0;

    const onMove = (e: MouseEvent) => {
      const cx = window.innerWidth / 2;
      const cy = window.innerHeight / 2;
      targetX = ((e.clientX - cx) / cx) * 20;
      targetY = ((e.clientY - cy) / cy) * 20;
    };

    const render = () => {
      currentX += (targetX - currentX) * 0.06;
      currentY += (targetY - currentY) * 0.06;
      gsap.set(wrap, { x: currentX, y: currentY });
      raf = requestAnimationFrame(render);
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    raf = requestAnimationFrame(render);
    return () => {
      window.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  const onMeta = (e: React.SyntheticEvent<HTMLVideoElement>) => {
    e.currentTarget.playbackRate = RATE;
  };

  const videoClass =
    'absolute inset-0 h-full w-full object-cover transition-opacity duration-[900ms] ease-linear motion-reduce:transition-none';

  return (
    <div className="absolute inset-0 z-0 overflow-hidden bg-canopy-deep" aria-hidden="true">
      {/* translate-z-0 promotes the pair to their own compositor layer so the
          crossfade does not repaint the hero content above it. */}
      <div
        ref={wrapRef}
        className="absolute inset-0 origin-center scale-[1.08] [transform:translateZ(0)] [will-change:transform]"
      >
        <video
          ref={aRef}
          src={src}
          muted
          playsInline
          preload="auto"
          onLoadedMetadata={onMeta}
          className={videoClass}
          style={{ opacity: 1 }}
        />
        <video
          ref={bRef}
          src={src}
          muted
          playsInline
          preload="none"
          onLoadedMetadata={onMeta}
          className={videoClass}
          style={{ opacity: 0 }}
        />
      </div>
      <div className="hero-scrim absolute inset-0" />
    </div>
  );
}
