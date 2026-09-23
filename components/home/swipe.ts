import { COMMIT, dragEnd, dragMove, dragStart, type Slides } from "./slides";

/**
 * Sideways drag (touch or mouse) on a frame changes its photo. The gesture is
 * only taken once it's clearly sideways (|dx| > 12px and |dx| > 1.5|dy|);
 * until then nothing happens, so vertical scrolling (and the chapter snap)
 * stay native. Pair with `touch-action: pan-y pinch-zoom` on the element.
 * Drag left = next photo, right = previous. The wipe follows the finger over
 * ~40% of the frame's width; release past 35% or a quick flick commits.
 *
 * `target()` returns the frame's store and on-screen width for this gesture,
 * or null to ignore it (e.g. not on the current chapter). Returns a cleanup.
 */
export function attachSwipe(
  el: HTMLElement,
  target: (e: PointerEvent) => { slides: Slides; width: number } | null,
) {
  type G = { id: number; x: number; y: number; t: number; lastX: number; lastT: number; taken: boolean; dir: number; slides: Slides | null; width: number };
  let g: G | null = null;
  // A mouse drag ends with a click on whatever is under the pointer; swallow
  // only that one. A touch drag produces no click, so the window must be short:
  // a stale flag would swallow the next real tap (e.g. a WhatsApp button).
  let suppressUntil = 0;

  const onDown = (e: PointerEvent) => {
    if (e.button !== 0 || g) return;
    // No drag from the copy, links or buttons: they must keep working.
    if ((e.target as Element).closest("a, button, .chapter, .rail, .ticks")) return;
    const tgt = target(e);
    if (!tgt) return;
    g = { id: e.pointerId, x: e.clientX, y: e.clientY, t: e.timeStamp, lastX: e.clientX, lastT: e.timeStamp, taken: false, dir: 0, slides: tgt.slides, width: tgt.width };
  };

  const onMove = (e: PointerEvent) => {
    if (!g || e.pointerId !== g.id) return;
    const dx = e.clientX - g.x;
    const dy = e.clientY - g.y;
    if (!g.taken) {
      if (Math.abs(dx) > 12 && Math.abs(dx) > 1.5 * Math.abs(dy)) {
        const s = g.slides!;
        g.dir = dx < 0 ? 1 : -1;
        if (!dragStart(s, s.cur + g.dir)) {
          g = null;
          return;
        }
        g.taken = true;
        el.setPointerCapture?.(e.pointerId);
        document.documentElement.classList.add("frame-dragging");
      } else if (Math.abs(dy) > 12) {
        g = null; // vertical: leave it to the browser
        return;
      } else return;
    }
    e.preventDefault();
    g.lastX = e.clientX;
    g.lastT = e.timeStamp;
    dragMove(g.slides!, (-g.dir * dx) / Math.max(1, 0.4 * g.width));
  };

  const finish = (e: PointerEvent, cancelled: boolean) => {
    if (!g || e.pointerId !== g.id) return;
    if (g.taken) {
      const s = g.slides!;
      const dx = e.clientX - g.x;
      const pulled = Math.max(0, (-g.dir * dx) / Math.max(1, 0.4 * g.width));
      // Flick: fast enough (px/ms) in the drag's direction over the last move.
      const v = (e.clientX - g.lastX) / Math.max(1, e.timeStamp - g.lastT) || dx / Math.max(1, e.timeStamp - g.t);
      const flick = -g.dir * v > 0.5;
      dragEnd(s, !cancelled && (pulled > COMMIT || flick));
      suppressUntil = performance.now() + 300;
      document.documentElement.classList.remove("frame-dragging");
    }
    g = null;
  };
  const onUp = (e: PointerEvent) => finish(e, false);
  const onCancel = (e: PointerEvent) => finish(e, true);
  const onClick = (e: MouseEvent) => {
    if (performance.now() < suppressUntil) {
      suppressUntil = 0;
      e.preventDefault();
      e.stopPropagation();
    }
  };

  el.addEventListener("pointerdown", onDown);
  el.addEventListener("pointermove", onMove);
  el.addEventListener("pointerup", onUp);
  el.addEventListener("pointercancel", onCancel);
  el.addEventListener("click", onClick, true);
  return () => {
    el.removeEventListener("pointerdown", onDown);
    el.removeEventListener("pointermove", onMove);
    el.removeEventListener("pointerup", onUp);
    el.removeEventListener("pointercancel", onCancel);
    el.removeEventListener("click", onClick, true);
    document.documentElement.classList.remove("frame-dragging");
  };
}
