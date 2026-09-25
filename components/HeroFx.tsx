"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { canRunWebGL, wantsHeroPhotoPlane, whenIdleAfterLoad } from "@/lib/motion";

const HeroScene = dynamic(() => import("@/components/three/HeroScene"), { ssr: false });

/**
 * WebGL layer for a PageHero. Sits between the poster (which stays the LCP
 * element) and the scrims, mounts after load when the device can take it,
 * and fades in over the poster once its texture is on screen. The texture is
 * a one-off copy of the poster <img> (already downloaded and decoded), so the
 * photo is never fetched a second time. If the texture cannot be uploaded the
 * layer gives up and unmounts, leaving the poster visible: a hero must never
 * go black.
 */
export default function HeroFx({ position, wave = false }: { position: [number, number]; wave?: boolean }) {
  const box = useRef<HTMLDivElement>(null);
  const hero = useRef<HTMLElement | null>(null);
  const [poster, setPoster] = useState<HTMLImageElement | null>(null);
  const [photo, setPhoto] = useState(false);
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);

  useEffect(
    () =>
      whenIdleAfterLoad(() => {
        hero.current = box.current?.closest("section") ?? null;
        const img = box.current?.parentElement?.querySelector<HTMLImageElement>("img");
        if (!img || !canRunWebGL()) return;
        // No WebGL on phones at all. A wave-only pass was meant to keep the
        // Fish Town glow, but the canvas cleared opaque and blacked the
        // photograph out; a decorative glow is not worth that risk. The glow
        // wants rebuilding as a CSS/2D overlay before it comes back here.
        if (!wantsHeroPhotoPlane()) return;
        setPhoto(true);
        // Eager poster: normally complete by now; if not, wait for it.
        if (img.complete && img.naturalWidth) setPoster(img);
        else img.addEventListener("load", () => setPoster(img), { once: true });
      }),
    [wave],
  );

  return (
    <div ref={box} aria-hidden className="hero-fx absolute inset-0" data-ready={ready ? "" : undefined}>
      {poster && !failed && (
        <HeroScene
          poster={poster}
          photo={photo}
          position={position}
          wave={wave}
          root={hero}
          onReady={() => setReady(true)}
          onFail={() => {
            setReady(false);
            setFailed(true);
          }}
        />
      )}
    </div>
  );
}
