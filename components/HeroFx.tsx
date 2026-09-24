"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { canRunWebGL, whenIdleAfterLoad } from "@/lib/motion";

const HeroScene = dynamic(() => import("@/components/three/HeroScene"), { ssr: false });

/**
 * WebGL layer for a PageHero. Sits between the poster (which stays the LCP
 * element) and the scrims, mounts after load when the device can take it,
 * and fades in over the poster once its texture is on screen. The texture is
 * the poster <img> itself (already downloaded and decoded), so the photo is
 * never fetched a second time.
 */
export default function HeroFx({ position, wave = false }: { position: [number, number]; wave?: boolean }) {
  const box = useRef<HTMLDivElement>(null);
  const hero = useRef<HTMLElement | null>(null);
  const [poster, setPoster] = useState<HTMLImageElement | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(
    () =>
      whenIdleAfterLoad(() => {
        hero.current = box.current?.closest("section") ?? null;
        const img = box.current?.parentElement?.querySelector<HTMLImageElement>("img");
        if (!img || !canRunWebGL()) return;
        // Eager poster: normally complete by now; if not, wait for it.
        if (img.complete && img.naturalWidth) setPoster(img);
        else img.addEventListener("load", () => setPoster(img), { once: true });
      }),
    [],
  );

  return (
    <div ref={box} aria-hidden className="hero-fx absolute inset-0" data-ready={ready ? "" : undefined}>
      {poster && <HeroScene poster={poster} position={position} wave={wave} root={hero} onReady={() => setReady(true)} />}
    </div>
  );
}
