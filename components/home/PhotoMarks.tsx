"use client";

import { useEffect, useRef } from "react";
import { getSlides, paintMarks, select, shown } from "./slides";

/**
 * Thin brass marks, one per photo in a frame: the current one fills over the
 * hold. Tapping a mark jumps to that photo; with a mark focused, the left and
 * right arrow keys step through them. Each is a 44px-tall button labelled
 * "Photo n of N"; the group is labelled with the chapter name.
 */
export default function PhotoMarks({ id, count, label }: { id: string; count: number; label: string }) {
  const box = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const s = getSlides(id, count);
    const btns = Array.from(box.current?.querySelectorAll<HTMLButtonElement>("button") ?? []);
    s.marks = btns;
    paintMarks(s);
    return () => {
      if (s.marks === btns) s.marks = [];
    };
  }, [id, count]);

  const onKey = (e: React.KeyboardEvent) => {
    if (e.key !== "ArrowLeft" && e.key !== "ArrowRight") return;
    e.preventDefault();
    const s = getSlides(id, count);
    const k = shown(s) + (e.key === "ArrowRight" ? 1 : -1);
    select(s, k);
    s.marks[((k % count) + count) % count]?.focus();
  };

  return (
    <div ref={box} className="ticks" role="group" aria-label={label} onKeyDown={onKey}>
      {Array.from({ length: count }, (_, i) => (
        <button
          key={i}
          type="button"
          aria-label={`Photo ${i + 1} of ${count}`}
          aria-current={i === 0 ? "true" : "false"}
          onClick={() => select(getSlides(id, count), i)}
        >
          <span />
        </button>
      ))}
    </div>
  );
}
