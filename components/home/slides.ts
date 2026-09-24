/**
 * "Which photo is showing" for one frame (a journey chapter or the Rooms
 * section). One state machine, shared by everything that shows or changes it:
 * the WebGL frames, the static-fallback frames, the Rooms slideshow, the photo
 * marks and the swipe handlers. Plain mutable state, never React state; the
 * driver (a useFrame or rAF loop) calls tick() and paintMarks() every frame.
 */

/** Seconds each photo holds before the next wipes in. */
export const HOLD = 3.0;
/** Seconds the wipe takes. */
export const SWAP = 1.0;
/** Seconds automatic changes pause after any manual change. */
export const PAUSE = 6.0;
/** Drag fraction past which a released swipe completes. */
export const COMMIT = 0.35;

type Phase = "idle" | "swap" | "back" | "drag";

export type Slides = {
  count: number;
  cur: number;
  /** Photo wiping in, or -1. */
  next: number;
  /** 0..1 wipe position (eased). */
  mix: number;
  /** Raw 0..1 wipe progress. */
  mixT: number;
  phase: Phase;
  /** Seconds the current photo has held. */
  age: number;
  /** Clock time (s) before which automatic changes stay paused. */
  pausedUntil: number;
  /** True when a driver animates changes (wipe); false = instant swaps. */
  animated: boolean;
  /**
   * Who drives this frame. The WebGL chapter frame claims it when it mounts;
   * the HTML frame (static fallback, Rooms) only drives it otherwise.
   */
  driver: "webgl" | "html" | null;
  /** Whether photo k can be shown yet (texture/image loaded). */
  ready: (k: number) => boolean;
  /** A manually chosen photo still loading; shown as soon as it's ready, or -1. */
  pending: number;
  /** Asks the driver to load photo k now (a manual choice got ahead of loading). */
  want: (k: number) => void;
  /** Mark buttons registered by PhotoMarks; painted by the driver. */
  marks: HTMLButtonElement[];
  listeners: Set<() => void>;
};

const registry = new Map<string, Slides>();

/** One shared store per frame id ("ch0".."ch3", "rooms"), created on first use. */
export function getSlides(id: string, count: number): Slides {
  let s = registry.get(id);
  if (!s) {
    s = {
      count,
      cur: 0,
      next: -1,
      mix: 0,
      mixT: 0,
      phase: "idle",
      age: 0,
      pausedUntil: 0,
      animated: false,
      driver: null,
      ready: () => true,
      pending: -1,
      want: () => {},
      marks: [],
      listeners: new Set(),
    };
    registry.set(id, s);
  }
  return s;
}

export const now = () => performance.now() / 1000;
const ease = (x: number) => x * x * (3 - 2 * x);

function notify(s: Slides) {
  s.listeners.forEach((f) => f());
  paintMarks(s);
}

export function subscribe(s: Slides, f: () => void) {
  s.listeners.add(f);
  return () => void s.listeners.delete(f);
}

/** The photo a viewer would call "showing" (the incoming one once past halfway). */
export function shown(s: Slides) {
  return s.next >= 0 && s.mix > 0.5 ? s.next : s.cur;
}

/** Manual change (mark, arrow key): wipe if animated, else instant. Pauses auto for PAUSE s. */
export function select(s: Slides, k: number) {
  k = ((k % s.count) + s.count) % s.count;
  if (s.phase !== "idle" || k === s.cur) return;
  if (!s.ready(k)) {
    // Not loaded yet: load it and show it the moment it arrives.
    s.pending = k;
    s.want(k);
    return;
  }
  s.pending = -1;
  s.pausedUntil = now() + PAUSE;
  if (s.animated) {
    s.next = k;
    s.phase = "swap";
    s.mixT = 0;
    s.mix = 0;
  } else {
    s.cur = k;
    s.age = 0;
  }
  notify(s);
}

/** Start a drag toward photo k. Returns false if it can't start (busy, not loaded). */
export function dragStart(s: Slides, k: number) {
  k = ((k % s.count) + s.count) % s.count;
  if (s.phase !== "idle" || k === s.cur || !s.ready(k)) return false;
  s.next = k;
  s.phase = "drag";
  s.mixT = 0;
  s.mix = 0;
  notify(s);
  return true;
}

/** While dragging: the wipe follows the finger (m = 0..1). Instant frames don't follow. */
export function dragMove(s: Slides, m: number) {
  if (s.phase !== "drag" || !s.animated) return;
  s.mixT = Math.max(0, Math.min(1, m));
  s.mix = s.mixT;
}

/** Release: finish the change or snap back. Any drag counts as a manual change. */
export function dragEnd(s: Slides, commit: boolean) {
  if (s.phase !== "drag") return;
  s.pausedUntil = now() + PAUSE;
  if (!s.animated) {
    if (commit) {
      s.cur = s.next;
      s.age = 0;
    }
    s.next = -1;
    s.mix = s.mixT = 0;
    s.phase = "idle";
  } else {
    s.phase = commit ? "swap" : "back";
  }
  notify(s);
}

/**
 * Advance one frame. `auto`: this frame may change photos by itself right now
 * (current chapter / in view, visible tab, motion allowed).
 */
export function tick(s: Slides, dt: number, auto: boolean) {
  if (s.phase === "idle" && s.pending >= 0 && s.ready(s.pending)) {
    select(s, s.pending);
    return;
  }
  if (s.phase === "swap") {
    s.mixT = Math.min(1, s.mixT + dt / SWAP);
    s.mix = ease(s.mixT);
    if (s.mixT >= 1) {
      s.cur = s.next;
      s.next = -1;
      s.mix = s.mixT = 0;
      s.phase = "idle";
      s.age = 0;
      notify(s);
    }
  } else if (s.phase === "back") {
    s.mixT = Math.max(0, s.mixT - dt / (SWAP * 0.5));
    s.mix = s.mixT;
    if (s.mixT <= 0) {
      s.next = -1;
      s.phase = "idle";
      notify(s);
    }
  } else if (s.phase === "idle" && auto && now() >= s.pausedUntil) {
    s.age += dt;
    if (s.age >= HOLD) {
      const k = (s.cur + 1) % s.count;
      if (s.ready(k)) {
        s.next = k;
        s.phase = "swap";
        s.mixT = 0;
        s.mix = 0;
      }
    }
  }
}

/** Slow push-in (1 -> 1.05) over a photo's life: its wipe plus its hold. */
export function zoomCurrent(s: Slides) {
  return 1 + 0.05 * Math.min(1, (SWAP + s.age) / (HOLD + SWAP));
}
export function zoomNext(s: Slides) {
  return 1 + 0.05 * Math.min(1, (s.mixT * SWAP) / (HOLD + SWAP));
}

/** Current mark highlighted; it fills over the hold when changes are automatic. */
export function paintMarks(s: Slides, autoRunning = s.animated) {
  const on = shown(s);
  const fill = !autoRunning ? 1 : s.phase === "idle" ? Math.min(1, s.age / HOLD) : 0;
  s.marks.forEach((b, i) => {
    const isOn = i === on;
    b.setAttribute("aria-current", isOn ? "true" : "false");
    b.style.setProperty("--f", isOn ? fill.toFixed(3) : "0");
  });
}
