/**
 * The journey timeline, from the prototype. One scroll-progress ref is written
 * by the DOM controller (HomeJourney) and read by the WebGL scene in useFrame.
 */

// Where each chapter sits in the journey's scroll (0..1) and how long it holds.
export const CENTERS = [0.12, 0.38, 0.62, 0.88];
export const HALF = 0.1;
// Vertical distance between chapters in world units.
export const FLOOR = 15;

export type JourneyState = {
  /** 0..1 across the journey section's scroll. */
  p: number;
  /** Viewport is phone-sized (the prototype's 760px breakpoint). */
  mobile: boolean;
  /** On-screen width (px) of the chapter frame, for the swipe (set by the scene). */
  framePx: number;
  /** The journey's stage fills the screen (not still on the hero, not past it). */
  onStage: boolean;
};

export function createJourneyState(): JourneyState {
  return { p: 0, mobile: false, framePx: 0, onStage: false };
}

const ease = (x: number) => x * x * (3 - 2 * x);

/** Fractional chapter position 0..3 with a hold around each centre. */
export function chapterMix(p: number): number {
  if (p <= CENTERS[0]) return 0;
  for (let i = 0; i < CENTERS.length - 1; i++) {
    const a = CENTERS[i] + HALF * 0.6;
    const b = CENTERS[i + 1] - HALF * 0.6;
    if (p <= a) return i;
    if (p < b) return i + ease((p - a) / (b - a));
  }
  return CENTERS.length - 1;
}

/**
 * Town Hall's local progress: drives both the seats and the HTML counter.
 * Fills 0 -> 120 on the way in and lands on 120 before the chapter centre.
 */
export function seatsProgress(p: number): number {
  return Math.max(0, Math.min(1, (p - (CENTERS[1] - HALF * 1.6)) / (HALF * 1.5)));
}
