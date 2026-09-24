/**
 * Client-side capability checks shared by every motion/WebGL layer.
 * All functions are safe to call only in the browser (inside effects).
 */

export function prefersReducedMotion(): boolean {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/** Touch-first, phone-sized screen. */
export function isPhone(): boolean {
  return window.matchMedia("(pointer: coarse)").matches && Math.min(screen.width, screen.height) < 768;
}

/** A real mouse or trackpad: the only case where pointer-driven effects run. */
export function hasFinePointer(): boolean {
  return window.matchMedia("(hover: hover) and (pointer: fine)").matches;
}

/**
 * Whether the WebGL layer should run at all. Only reduced motion or a missing
 * WebGL context get the static version; phones run it with fewer particles and
 * a pixel ratio capped at 1.5 instead.
 */
export function canRunWebGL(): boolean {
  if (prefersReducedMotion()) return false;
  try {
    const canvas = document.createElement("canvas");
    const gl = canvas.getContext("webgl2") ?? canvas.getContext("webgl");
    if (!gl) return false;
    gl.getExtension("WEBGL_lose_context")?.loseContext();
    return true;
  } catch {
    return false;
  }
}

/**
 * Runs `cb` once the page has loaded and the main thread is idle, so nothing
 * here competes with first paint or LCP. Returns a cancel function.
 */
export function whenIdleAfterLoad(cb: () => void): () => void {
  let idleId: number | undefined;
  let timeoutId: number | undefined;
  let cancelled = false;

  const schedule = () => {
    if (cancelled) return;
    // Safari has no requestIdleCallback.
    if (typeof window.requestIdleCallback === "function") {
      idleId = window.requestIdleCallback(() => !cancelled && cb(), { timeout: 2500 });
    } else {
      timeoutId = setTimeout(() => !cancelled && cb(), 400) as unknown as number;
    }
  };

  if (document.readyState === "complete") schedule();
  else window.addEventListener("load", schedule, { once: true });

  return () => {
    cancelled = true;
    window.removeEventListener("load", schedule);
    if (idleId !== undefined) window.cancelIdleCallback(idleId);
    if (timeoutId !== undefined) clearTimeout(timeoutId);
  };
}

/** WebP via the Next image optimizer, sized for use as a WebGL texture. */
export function textureUrl(src: string, phone: boolean, hero = false): string {
  const w = hero ? (phone ? 1080 : 1920) : phone ? 640 : 1080;
  return `/_next/image?url=${encodeURIComponent(src)}&w=${w}&q=75`;
}
