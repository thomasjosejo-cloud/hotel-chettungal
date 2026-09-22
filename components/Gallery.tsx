"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import type { Photo } from "@/content/site";

// Repeating editorial rhythm on a 12-column grid (desktop); single column on mobile.
const LAYOUT = [
  { li: "md:col-span-7 md:row-span-2", box: "aspect-[4/3] md:aspect-auto" },
  { li: "md:col-span-5", box: "aspect-[4/3]" },
  { li: "md:col-span-5", box: "aspect-[4/3]" },
  { li: "md:col-span-4", box: "aspect-[4/5]" },
  { li: "md:col-span-4", box: "aspect-[4/5]" },
  { li: "md:col-span-4", box: "aspect-[4/5]" },
  { li: "md:col-span-5", box: "aspect-[4/3]" },
  { li: "md:col-span-7", box: "aspect-[4/3] md:aspect-auto" },
];

export default function Gallery({
  photos,
  tone = "dark",
}: {
  photos: readonly Photo[];
  tone?: "dark" | "light";
}) {
  const [index, setIndex] = useState<number | null>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const lastTrigger = useRef<HTMLElement | null>(null);

  const close = useCallback(() => {
    setIndex(null);
    lastTrigger.current?.focus();
  }, []);
  const step = useCallback(
    (d: number) => setIndex((i) => (i === null ? i : (i + d + photos.length) % photos.length)),
    [photos.length],
  );

  useEffect(() => {
    if (index === null) return;
    closeRef.current?.focus();
    document.documentElement.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.documentElement.style.overflow = "";
    };
  }, [index, close, step]);

  const caption = tone === "dark" ? "text-mist" : "text-muted";

  return (
    <>
      <ul className="grid grid-cols-1 gap-x-4 gap-y-8 md:grid-cols-12 md:gap-y-4">
        {photos.map((p, i) => (
          <li key={p.src} className={`flex flex-col ${LAYOUT[i % LAYOUT.length].li}`} data-reveal style={{ ["--reveal-delay" as string]: `${(i % 3) * 90}ms` }}>
            <button
              type="button"
              onClick={(e) => {
                lastTrigger.current = e.currentTarget;
                setIndex(i);
              }}
              className={`group relative w-full flex-1 cursor-zoom-in overflow-hidden bg-black/20 ${LAYOUT[i % LAYOUT.length].box}`}
              aria-label={`Open photo: ${p.caption}`}
            >
              <Image
                src={p.src}
                alt={p.alt}
                fill
                sizes="(min-width: 768px) 60vw, 100vw"
                className="img-zoom object-cover"
              />
            </button>
            <p className={`mt-3 text-sm ${caption}`}>{p.caption}</p>
          </li>
        ))}
      </ul>

      {index !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={photos[index].caption}
          className="fixed inset-0 z-[60] flex flex-col bg-ink/95 text-ivory"
          onClick={close}
        >
          <div className="container-x flex items-center justify-between py-5" onClick={(e) => e.stopPropagation()}>
            <p className="text-sm text-mist">
              {index + 1} / {photos.length} — {photos[index].caption}
            </p>
            <button
              ref={closeRef}
              type="button"
              onClick={close}
              className="flex h-11 items-center gap-2 text-[0.8125rem] uppercase tracking-[0.18em]"
            >
              Close <span aria-hidden className="text-xl leading-none">×</span>
            </button>
          </div>
          <div className="relative mx-auto w-full max-w-6xl flex-1 px-4 pb-6" onClick={(e) => e.stopPropagation()}>
            <Image src={photos[index].src} alt={photos[index].alt} fill sizes="100vw" className="object-contain" />
          </div>
          <div className="container-x flex justify-between pb-6" onClick={(e) => e.stopPropagation()}>
            <button type="button" onClick={() => step(-1)} className="h-11 px-2 text-[0.8125rem] uppercase tracking-[0.18em]">
              ← Previous
            </button>
            <button type="button" onClick={() => step(1)} className="h-11 px-2 text-[0.8125rem] uppercase tracking-[0.18em]">
              Next →
            </button>
          </div>
        </div>
      )}
    </>
  );
}
