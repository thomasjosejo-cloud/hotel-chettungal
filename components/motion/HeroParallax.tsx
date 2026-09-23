"use client";

import { useEffect, useRef } from "react";
import { prefersReducedMotion } from "@/lib/motion";

/**
 * Scroll parallax for the hero it sits in: writes --k (0 -> 1 across the
 * hero's height) onto the hero's .hero-bg and .hero-copy-k layers, rAF-batched
 * from a passive scroll listener. CSS does the rest. Off for reduced motion.
 */
export default function HeroParallax() {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const hero = ref.current?.closest("section");
    if (!hero || prefersReducedMotion()) return;
    const layers = Array.from(hero.querySelectorAll<HTMLElement>(".hero-bg, .hero-copy-k"));
    if (!layers.length) return;

    // Measure on width changes only: the hero is 100svh, so the address bar
    // showing or hiding doesn't move it.
    let top = 0;
    let height = 1;
    let lastW = 0;
    const measure = () => {
      if (innerWidth === lastW) return;
      lastW = innerWidth;
      top = hero.getBoundingClientRect().top + scrollY;
      height = Math.max(1, hero.offsetHeight);
    };

    let raf = 0;
    let lastK = -1;
    const set = () => {
      raf = 0;
      const k = Math.min(1, Math.max(0, (scrollY - top) / height));
      if (k === lastK) return; // past the hero: nothing to write
      lastK = k;
      const v = k.toFixed(4);
      for (const l of layers) l.style.setProperty("--k", v);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(set);
    };
    const onResize = () => {
      measure();
      onScroll();
    };

    measure();
    set();
    addEventListener("scroll", onScroll, { passive: true });
    addEventListener("resize", onResize);
    return () => {
      cancelAnimationFrame(raf);
      removeEventListener("scroll", onScroll);
      removeEventListener("resize", onResize);
      for (const l of layers) l.style.removeProperty("--k");
    };
  }, []);

  return <span ref={ref} hidden />;
}
