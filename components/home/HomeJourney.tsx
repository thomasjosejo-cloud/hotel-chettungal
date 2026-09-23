"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import dynamic from "next/dynamic";
import { canRunWebGL, prefersReducedMotion, whenIdleAfterLoad } from "@/lib/motion";
import { CENTERS, chapterMix, createJourneyState, seatsProgress } from "./journey";

// three.js + R3F: never on the server, and only requested once the page is idle.
const HomeScene = dynamic(() => import("./HomeScene"), { ssr: false });

const RAIL = ["Fish Town", "Town Hall", "Board Room", "CasaBay"];

/**
 * The journey section. Chapters are server-rendered HTML (children). This
 * controller owns the single scroll-progress ref: it cross-fades the copy,
 * drives the rail and the 120 counter, and hands the same ref to the WebGL
 * scene. Without motion or WebGL the CSS static layout stays in place.
 */
export default function HomeJourney({ children }: { children: ReactNode }) {
  const root = useRef<HTMLElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const snaps = useRef<(HTMLDivElement | null)[]>([]);
  const state = useRef(createJourneyState()).current;
  const [webgl, setWebgl] = useState(false);
  const [ready, setReady] = useState(false);
  const [staticMode, setStaticMode] = useState(false);

  // The journey's scroll span, from the stage's own height. The stage is 100svh,
  // which doesn't change when a phone's address bar shows or hides; innerHeight
  // does, and made the camera jump.
  const spanOf = () => {
    const el = root.current;
    const st = stage.current;
    return el && st ? Math.max(1, el.offsetHeight - st.offsetHeight) : 1;
  };

  const goTo = (i: number, smooth = true) => {
    const el = root.current;
    if (!el) return;
    // Lands exactly on the chapter's snap marker, so snapping never fights it.
    const top = el.getBoundingClientRect().top + scrollY + Math.round(CENTERS[i] * spanOf());
    scrollTo({ top, behavior: smooth && !prefersReducedMotion() ? "smooth" : "auto" });
  };

  useEffect(() => {
    const el = root.current;
    if (!el || prefersReducedMotion() || staticMode) return;
    const chapters = Array.from(el.querySelectorAll<HTMLElement>("[data-ch]"));
    const rail = Array.from(el.querySelectorAll<HTMLButtonElement>("[data-go]"));
    const counter = el.querySelector<HTMLElement>("[data-count]");
    let raf = 0;

    const update = () => {
      raf = 0;
      const r = el.getBoundingClientRect();
      const p = Math.min(1, Math.max(0, -r.top / spanOf()));
      state.p = p;
      state.mobile = innerWidth <= 760;
      const cm = chapterMix(p);

      // Copy cross-fades on the same timeline as the camera.
      chapters.forEach((c, i) => {
        const o = Math.max(0, Math.min(1, 1 - Math.abs(cm - i) * 2.2));
        const shift = ((cm - i) * -40).toFixed(1);
        c.style.opacity = o.toFixed(3);
        c.style.transform = state.mobile ? `translateY(${shift}px)` : `translateY(calc(-50% + ${shift}px))`;
        c.toggleAttribute("data-on", o > 0.6);
      });
      const cur = Math.round(cm);
      rail.forEach((b, i) => b.setAttribute("aria-current", String(i === cur)));
      if (counter) counter.textContent = String(Math.round(120 * Math.min(1, seatsProgress(p))));
    };
    const schedule = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };

    // Keyboard users: focusing into a faded chapter brings it on screen.
    const onFocus = (e: FocusEvent) => {
      const i = chapters.findIndex((c) => c.contains(e.target as Node));
      if (i >= 0 && !chapters[i].hasAttribute("data-on")) goTo(i, false);
    };

    // One snap point per chapter centre. CSS only turns snapping on for touch
    // phones with motion allowed (html.home-snap); proximity, never mandatory.
    let lastSpan = 0;
    const placeSnaps = () => {
      const span = spanOf();
      if (span === lastSpan) return;
      lastSpan = span;
      snaps.current.forEach((d, i) => d && (d.style.top = `${Math.round(CENTERS[i] * span)}px`));
    };
    const onResize = () => {
      placeSnaps();
      schedule();
    };
    const html = document.documentElement;
    html.classList.add("home-snap");

    placeSnaps();
    update();
    addEventListener("scroll", schedule, { passive: true });
    addEventListener("resize", onResize);
    el.addEventListener("focusin", onFocus);
    return () => {
      cancelAnimationFrame(raf);
      removeEventListener("scroll", schedule);
      removeEventListener("resize", onResize);
      html.classList.remove("home-snap");
      el.removeEventListener("focusin", onFocus);
      chapters.forEach((c) => {
        c.style.opacity = "";
        c.style.transform = "";
        c.removeAttribute("data-on");
      });
      if (counter) counter.textContent = "120";
    };
  }, [state, staticMode]);

  // Static mode (no WebGL) is also flagged on <html>, where the snap CSS looks for it.
  useEffect(() => {
    if (!staticMode) return;
    const html = document.documentElement;
    html.classList.add("static-mode");
    return () => html.classList.remove("static-mode");
  }, [staticMode]);

  // WebGL after load, when idle. No WebGL context: fall back to the static layout.
  useEffect(() => {
    if (prefersReducedMotion()) return;
    return whenIdleAfterLoad(() => (canRunWebGL() ? setWebgl(true) : setStaticMode(true)));
  }, []);

  return (
    <section
      ref={root}
      className="journey"
      id="journey"
      aria-label="The evening at Hotel New Town"
      data-static={staticMode ? "" : undefined}
    >
      {CENTERS.map((_, i) => (
        <div key={i} ref={(d) => void (snaps.current[i] = d)} className="snap" aria-hidden />
      ))}
      <div ref={stage} className="stage">
        <div className="gl" aria-hidden data-ready={ready ? "" : undefined}>
          {webgl && <HomeScene journey={state} root={root} onReady={() => setReady(true)} />}
        </div>
        {children}
        <nav className="rail" aria-label="Chapters">
          {RAIL.map((label, i) => (
            <button key={label} type="button" data-go={i} aria-current={i === 0} onClick={() => goTo(i)}>
              {label}
            </button>
          ))}
        </nav>
      </div>
    </section>
  );
}
