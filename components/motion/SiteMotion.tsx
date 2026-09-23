"use client";

import { useEffect } from "react";
import { hasFinePointer, prefersReducedMotion } from "@/lib/motion";

const MAX_PULL = 8;

/**
 * Site-wide magnetic pull on [data-magnetic] buttons (pointer: fine only,
 * max 8px). Mounted once in the root layout.
 */
export default function SiteMotion() {
  // Magnetic buttons: one delegated listener, transform only.
  useEffect(() => {
    if (!hasFinePointer() || prefersReducedMotion()) return;
    let current: HTMLElement | null = null;

    const release = () => {
      if (current) current.style.transform = "";
      current = null;
    };
    const onMove = (e: PointerEvent) => {
      const el = (e.target as Element | null)?.closest<HTMLElement>("[data-magnetic]") ?? null;
      if (el !== current) release();
      if (!el) return;
      current = el;
      const r = el.getBoundingClientRect();
      const dx = (e.clientX - (r.left + r.width / 2)) / (r.width / 2);
      const dy = (e.clientY - (r.top + r.height / 2)) / (r.height / 2);
      el.style.transform = `translate(${(dx * MAX_PULL).toFixed(2)}px, ${(dy * MAX_PULL * 0.6).toFixed(2)}px)`;
    };

    document.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerleave", release);
    window.addEventListener("blur", release);
    return () => {
      release();
      document.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", release);
      window.removeEventListener("blur", release);
    };
  }, []);

  return null;
}
