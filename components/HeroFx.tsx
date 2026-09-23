"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { canRunWebGL, whenIdleAfterLoad } from "@/lib/motion";

const HeroScene = dynamic(() => import("@/components/three/HeroScene"), { ssr: false });

/**
 * WebGL layer for a PageHero. Sits between the poster (which stays the LCP
 * element) and the scrims, mounts after load when the device can take it,
 * and fades in over the poster once its texture is on screen.
 */
export default function HeroFx({ src, position, wave = false }: { src: string; position: [number, number]; wave?: boolean }) {
  const box = useRef<HTMLDivElement>(null);
  const hero = useRef<HTMLElement | null>(null);
  const [mount, setMount] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(
    () =>
      whenIdleAfterLoad(() => {
        hero.current = box.current?.closest("section") ?? null;
        if (canRunWebGL()) setMount(true);
      }),
    [],
  );

  return (
    <div ref={box} aria-hidden className="hero-fx absolute inset-0" data-ready={ready ? "" : undefined}>
      {mount && <HeroScene src={src} position={position} wave={wave} root={hero} onReady={() => setReady(true)} />}
    </div>
  );
}
