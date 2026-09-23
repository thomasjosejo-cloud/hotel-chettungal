"use client";

import { useEffect, useRef } from "react";
import { prefersReducedMotion, whenIdleAfterLoad } from "@/lib/motion";

type Ember = { x: number; y: number; r: number; vy: number; vx: number; p: number; life: number };

/**
 * Drifting embers on a 2D canvas (cheaper than WebGL for this), ported from
 * the prototype: about 130 on desktop, 60 on phones, pixel ratio capped at
 * 1.5, paused off-screen, off entirely for reduced motion. Starts after load
 * so it never competes with the hero's first paint.
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
          const g = ctx.createRadialGradient(q.x, q.y, 0, q.x, q.y, q.r * 5);
          g.addColorStop(0, `rgba(255, 196, 120, ${0.9 * fade})`);
          g.addColorStop(0.35, `rgba(232, 140, 60, ${0.35 * fade})`);
          g.addColorStop(1, "rgba(232, 120, 40, 0)");
          ctx.fillStyle = g;
          ctx.beginPath();
          ctx.arc(q.x, q.y, q.r * 5, 0, 6.283);
          ctx.fill();
        }
        raf = requestAnimationFrame(tick);
      };

      size();
      addEventListener("resize", size);
      const io = new IntersectionObserver(([e]) => {
        const was = running;
        running = e.isIntersecting;
        if (running && !was) raf = requestAnimationFrame(tick);
      });
      io.observe(c);
      raf = requestAnimationFrame(tick);
      stop = () => {
        running = false;
        cancelAnimationFrame(raf);
        io.disconnect();
        removeEventListener("resize", size);
      };
    });
    return () => {
      cancel();
      stop();
    };
  }, []);

  return <canvas ref={ref} aria-hidden className={`pointer-events-none absolute inset-0 h-full w-full ${className}`} />;
}
