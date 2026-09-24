"use client";

import { useEffect, useRef } from "react";
import { prefersReducedMotion, whenIdleAfterLoad } from "@/lib/motion";

type Ember = { x: number; y: number; r: number; vy: number; vx: number; p: number; life: number };

/**
 * Drifting embers on a 2D canvas (cheaper than WebGL for this), ported from
 * the prototype: about 130 on desktop, 60 on phones, pixel ratio capped at
 * 1.5, paused off-screen and in hidden tabs, off entirely for reduced motion.
 * One radial-gradient sprite is pre-rendered and stamped with drawImage, so no
 * gradient is built per particle per frame. Starts after load so it never
 * competes with the hero's first paint.
 */
export default function HeroEmbers({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    let stop = () => {};
    const cancel = whenIdleAfterLoad(() => {
      const c = ref.current;
      const ctx = c?.getContext("2d");
      if (!c || !ctx) return;
      let w = 0;
      let h = 0;
      let parts: Ember[] = [];
      let running = true;
      let raf = 0;

      // The ember, drawn once: 64px radial gradient, stamped per particle.
      const sprite = document.createElement("canvas");
      sprite.width = sprite.height = 64;
      const sctx = sprite.getContext("2d");
      if (sctx) {
        const g = sctx.createRadialGradient(32, 32, 0, 32, 32, 32);
        g.addColorStop(0, "rgba(255, 196, 120, 0.9)");
        g.addColorStop(0.35, "rgba(232, 140, 60, 0.35)");
        g.addColorStop(1, "rgba(232, 120, 40, 0)");
        sctx.fillStyle = g;
        sctx.fillRect(0, 0, 64, 64);
      }

      const spawn = (any: boolean): Ember => ({
        x: Math.random() * w,
        y: any ? Math.random() * h : h + 10,
        r: 0.6 + Math.random() * 1.8,
        vy: 0.25 + Math.random() * 0.7,
        vx: (Math.random() - 0.5) * 0.25,
        p: Math.random() * 6.28,
        life: 0.4 + Math.random() * 0.6,
      });
      const size = () => {
        const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
        w = c.clientWidth;
        h = c.clientHeight;
        c.width = w * dpr;
        c.height = h * dpr;
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        parts = Array.from({ length: w < 700 ? 60 : 130 }, () => spawn(true));
      };
      const tick = (t: number) => {
        if (!running) return;
        ctx.clearRect(0, 0, w, h);
        ctx.globalCompositeOperation = "lighter";
        for (const q of parts) {
          q.y -= q.vy;
          q.x += q.vx + Math.sin(t / 900 + q.p) * 0.25;
          if (q.y < -10) Object.assign(q, spawn(false));
          const fade = Math.min(1, q.y / (h * 0.9)) * q.life * (0.6 + 0.4 * Math.sin(t / 240 + q.p));
          const sz = q.r * 10;
          ctx.globalAlpha = Math.max(0, fade);
          ctx.drawImage(sprite, q.x - sz / 2, q.y - sz / 2, sz, sz);
        }
        ctx.globalAlpha = 1;
        raf = requestAnimationFrame(tick);
      };

      // Ignore height-only resizes (the phone address bar showing or hiding).
      let lastW = innerWidth;
      const onResize = () => {
        if (innerWidth === lastW) return;
        lastW = innerWidth;
        size();
      };

      // Pause off screen and in hidden tabs.
      let onScreen = true;
      const sync = () => {
        const was = running;
        running = onScreen && !document.hidden;
        if (running && !was) raf = requestAnimationFrame(tick);
        if (!running) cancelAnimationFrame(raf);
      };
      const io = new IntersectionObserver(([e]) => {
        onScreen = e.isIntersecting;
        sync();
      });

      size();
      addEventListener("resize", onResize);
      document.addEventListener("visibilitychange", sync);
      io.observe(c);
      raf = requestAnimationFrame(tick);
      stop = () => {
        running = false;
        cancelAnimationFrame(raf);
        io.disconnect();
        removeEventListener("resize", onResize);
        document.removeEventListener("visibilitychange", sync);
      };
    });
    return () => {
      cancel();
      stop();
    };
  }, []);

  return <canvas ref={ref} aria-hidden className={`pointer-events-none absolute inset-0 h-full w-full ${className}`} />;
}
