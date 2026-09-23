"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import type { Photo } from "@/content/site";
import { blurFor } from "@/content/blur";
import { prefersReducedMotion } from "@/lib/motion";
import { getSlides, paintMarks, select, subscribe, tick, zoomCurrent, zoomNext } from "./slides";
import { attachSwipe } from "./swipe";

/**
 * One frame, its photos stacked, in HTML. Two uses:
 * - Rooms (`auto`): the same behaviour as the WebGL chapter frames. 3s hold,
 *   1s clip-path wipe from the top, a slow push-in, marks, swipe, 6s pause after
 *   a manual change, running only while the frame is in view (threshold 0.35).
 * - A chapter's photo in the static fallback (`auto` false): no automatic
 *   changes; marks and swipe swap instantly.
 * Reduced motion: never automatic, always instant.
 * Only the first photo loads when the frame nears the viewport; the others
 * load once it's in view.
 */
export default function PhotoFrame({
  id,
  photos,
  auto,
  sizes,
  className = "",
}: {
  id: string;
  photos: readonly Photo[];
  auto: boolean;
  sizes: string;
  className?: string;
}) {
  const fig = useRef<HTMLDivElement>(null);
  const layers = useRef<(HTMLDivElement | null)[]>([]);
  const [loadRest, setLoadRest] = useState(false);
  // A manual choice can get ahead of lazy loading: then load the rest eagerly.
  const [eager, setEager] = useState(false);
  const loaded = useRef<boolean[]>(photos.map(() => false));
  const [, rerender] = useState(0);

  useEffect(() => {
    const el = fig.current;
    if (!el) return;
    const s = getSlides(id, photos.length);
    const animated = auto && !prefersReducedMotion();
    const mine = () => s.driver !== "webgl";
    if (mine()) {
      s.driver = "html";
      s.animated = animated;
      s.ready = (k) => loaded.current[k];
      s.want = () => {
        setLoadRest(true);
        setEager(true);
      };
    }

    // Paint the stack: current on top-but-one, incoming clipped from the top.
    const paint = () => {
      layers.current.forEach((l, i) => {
        if (!l) return;
        const incoming = i === s.next;
        const current = i === s.cur;
        l.style.zIndex = incoming ? "2" : current ? "1" : "0";
        l.style.visibility = incoming || current ? "visible" : "hidden";
        l.style.clipPath = incoming ? `inset(0 0 ${((1 - s.mix) * 100).toFixed(2)}% 0)` : "none";
        if (animated) l.style.transform = `scale(${(incoming ? zoomNext(s) : current ? zoomCurrent(s) : 1).toFixed(4)})`;
      });
      if (mine()) paintMarks(s, animated);
    };
    const unsub = subscribe(s, () => {
      paint();
      rerender((n) => n + 1);
    });

    // Run only while in view and the tab is visible.
    let inView = false;
    let raf = 0;
    let last = 0;
    const frame = (ts: number) => {
      const dt = last ? Math.min(0.1, (ts - last) / 1000) : 0;
      last = ts;
      if (mine()) tick(s, dt, animated && inView && !document.hidden);
      paint();
      raf = inView ? requestAnimationFrame(frame) : 0;
      if (!raf) last = 0;
    };
    const io = new IntersectionObserver(
      ([e]) => {
        const was = inView;
        inView = e.isIntersecting;
        if (inView) setLoadRest(true);
        if (inView && !was && !raf) raf = requestAnimationFrame(frame);
      },
      { threshold: auto ? 0.35 : 0 },
    );
    io.observe(el);
    paint();

    const detach = attachSwipe(el, () => (mine() ? { slides: s, width: el.getBoundingClientRect().width } : null));
    return () => {
      if (s.driver === "html") s.driver = null;
      io.disconnect();
      cancelAnimationFrame(raf);
      unsub();
      detach();
    };
  }, [id, photos.length, auto]);

  return (
    <div ref={fig} className={`photo-frame ${className}`}>
      {photos.map((p, i) => {
        const blur = blurFor(p.src);
        const show = i === 0 || loadRest;
        return (
          <div key={p.src} ref={(d) => void (layers.current[i] = d)} className="photo-frame-layer" style={i ? { visibility: "hidden" } : undefined}>
            {show && (
              <Image
                src={p.src}
                alt={p.alt}
                fill
                sizes={sizes}
                loading={eager ? "eager" : "lazy"}
                placeholder={blur ? "blur" : "empty"}
                blurDataURL={blur}
                className="object-cover"
                onLoad={() => {
                  loaded.current[i] = true;
                  const s = getSlides(id, photos.length);
                  if (s.pending === i && s.driver !== "webgl") select(s, i);
                }}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
