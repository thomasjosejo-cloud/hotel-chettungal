"use client";

import { useEffect, useMemo, useRef, useState, type RefObject } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { hasFinePointer, isPhone, textureUrl } from "@/lib/motion";
import { coverUv, createPlaneMaterial, createWaveMaterial, disableColorManagement } from "./materials";
import { FrameDriver, lerpAt60, useLazyTexture } from "./parts";

disableColorManagement();

const CAMERA_Z = 10;
const FOV = 35;

/**
 * A venue hero's photo as the home page's plane shader: covers the view like
 * the poster, tilts toward the mouse on desktop, bends slightly with scroll
 * speed, and dims into the night ground as the hero scrolls away.
 */
function Hero({
  src,
  position,
  wave,
  root,
  onReady,
}: {
  src: string;
  position: [number, number];
  wave: boolean;
  root: RefObject<HTMLElement | null>;
  onReady: () => void;
}) {
  const size = useThree((s) => s.size);
  const group = useRef<THREE.Group>(null);
  const [phone] = useState(isPhone);
  const { material, uniforms } = useMemo(() => createPlaneMaterial(0), []);
  const waveMat = useMemo(() => (wave ? createWaveMaterial() : null), [wave]);
  const tex = useLazyTexture(textureUrl(src, phone, true));
  const sim = useRef({ mx: 0, my: 0, bend: 0, lastY: 0, frames: -1 }).current;

  // Overscan so the tilt never shows an edge.
  const fine = hasFinePointer();
  const overscan = fine ? 1.08 : 1.02;
  const H = 2 * CAMERA_Z * Math.tan(THREE.MathUtils.degToRad(FOV / 2)) * overscan;
  const W = H * (size.width / size.height);

  useEffect(() => {
    uniforms.uTex.value = tex;
    uniforms.uReady.value = tex ? 1 : 0;
    uniforms.uReveal.value = 1.1;
    const { scale, offset } = coverUv(W / H, 1.5, position[0], position[1]);
    uniforms.uCoverScale.value.copy(scale);
    uniforms.uCoverOffset.value.copy(offset);
    if (tex) sim.frames = 0;
  }, [tex, uniforms, W, H, position, sim]);
  useEffect(() => () => (material.dispose(), waveMat?.dispose()), [material, waveMat]);

  useEffect(() => {
    if (!fine) return;
    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      sim.mx = e.clientX / innerWidth - 0.5;
      sim.my = e.clientY / innerHeight - 0.5;
    };
    addEventListener("pointermove", onMove, { passive: true });
    return () => removeEventListener("pointermove", onMove);
  }, [fine, sim]);

  useFrame((state, dt) => {
    const el = root.current;
    const r = el?.getBoundingClientRect();
    const out = r ? Math.min(1, Math.max(0, -r.top / Math.max(r.height, 1))) : 0;
    // Fade on scroll-out: dim into the night ground.
    uniforms.uLight.value = 1 - out * 0.85;

    const vel = (scrollY - sim.lastY) / Math.max(dt, 1e-3) / Math.max(innerHeight, 1);
    sim.lastY = scrollY;
    sim.bend += (Math.max(-0.6, Math.min(0.6, vel * 0.5)) - sim.bend) * lerpAt60(0.08, dt);
    uniforms.uBend.value = sim.bend;

    const g = group.current;
    if (g) {
      g.rotation.y += (sim.mx * 0.06 - g.rotation.y) * lerpAt60(0.05, dt);
      g.rotation.x += (sim.my * 0.04 - g.rotation.x) * lerpAt60(0.05, dt);
    }
    if (waveMat) {
      waveMat.uniforms.uTime.value = state.clock.getElapsedTime();
      waveMat.uniforms.uAmt.value = 0.55 * (1 - out);
    }
    if (sim.frames >= 0 && ++sim.frames === 2) onReady();
  });

  return (
    <>
      <group ref={group}>
        <mesh material={material}>
          <planeGeometry args={[W, H, 24, 24]} />
        </mesh>
      </group>
      {waveMat && (
        // The wave-wall glow: additive warm bands across the lower dining room.
        <mesh material={waveMat} position={[0, -H * 0.12, 0.5]}>
          <planeGeometry args={[W * 1.2, H * 0.9]} />
        </mesh>
      )}
    </>
  );
}

export default function HeroScene({
  src,
  position,
  wave = false,
  root,
  onReady,
}: {
  src: string;
  position: [number, number];
  wave?: boolean;
  root: RefObject<HTMLElement | null>;
  onReady: () => void;
}) {
  const [active, setActive] = useState(true);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setActive(e.isIntersecting && document.visibilityState === "visible"));
    io.observe(el);
    return () => io.disconnect();
  }, [root]);

  return (
    <Canvas
      flat
      linear
      frameloop="demand"
      dpr={[1, 1.5]}
      gl={{ antialias: false, powerPreference: "high-performance" }}
      camera={{ fov: FOV, near: 0.1, far: 50, position: [0, 0, CAMERA_Z] }}
      onCreated={({ gl }) => gl.setClearColor(0x0b0907, 1)}
      style={{ pointerEvents: "none" }}
    >
      <FrameDriver active={active} />
      <Hero src={src} position={position} wave={wave} root={root} onReady={onReady} />
    </Canvas>
  );
}
