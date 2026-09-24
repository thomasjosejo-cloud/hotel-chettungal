"use client";

import { useEffect, useMemo, useRef, useState, type RefObject } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { isPhone } from "@/lib/motion";
import { coverUv, createPlaneMaterial, createWaveMaterial, disableColorManagement } from "./materials";
import { FrameDriver, lerpAt60 } from "./parts";

disableColorManagement();

const CAMERA_Z = 10;
const FOV = 35;
const clamp1 = (v: number) => Math.max(-1, Math.min(1, v));

/**
 * A venue hero's photo as the home page's plane shader: covers the view like
 * the poster, bends slightly with scroll speed and dims into the night ground
 * as the hero scrolls away. A real mouse tilts it (desktop only). Until one
 * moves (touch screens), scroll drives it instead, with a slow zoom
 * (1 -> 1.08) and a vertical drift, plus the home page's ambient sine drift
 * nudged by device tilt.
 */
function Hero({
  poster,
  position,
  wave,
  root,
  phone,
  onReady,
  onFail,
}: {
  poster: HTMLImageElement;
  position: [number, number];
  wave: boolean;
  root: RefObject<HTMLElement | null>;
  phone: boolean;
  onReady: () => void;
  onFail: () => void;
}) {
  // Narrow selectors only: nothing here re-renders on scroll.
  const width = useThree((s) => s.size.width);
  const height = useThree((s) => s.size.height);
  const group = useRef<THREE.Group>(null);
  const { material, uniforms } = useMemo(() => createPlaneMaterial(0), []);
  const waveMat = useMemo(() => (wave ? createWaveMaterial() : null), [wave]);
  const gl = useThree((s) => s.gl);

  /*
   * The poster's pixels, copied once into a canvas of its own fixed size.
   *
   * Using the live <img> as the texture source looked free (no second
   * download) but it is a moving target: next/image can swap the srcset
   * candidate it is displaying, so three.js would allocate texture storage at
   * one size and later upload a differently sized image into it. WebGL rejects
   * that ("glTexSubImage2D: Offset overflows texture dimensions") and the hero
   * went black once this layer faded in over the poster. The canvas never
   * changes size, so the upload is always valid, and we still download once.
   */
  const tex = useMemo(() => {
    const w = poster.naturalWidth;
    const h = poster.naturalHeight;
    if (!w || !h) return null;
    const canvas = document.createElement("canvas");
    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext("2d");
    if (!ctx) return null;
    try {
      ctx.drawImage(poster, 0, 0, w, h);
    } catch {
      return null;
    }
    const t = new THREE.CanvasTexture(canvas);
    t.minFilter = THREE.LinearFilter;
    t.generateMipmaps = false;
    t.needsUpdate = true;
    return t;
  }, [poster]);
  useEffect(() => () => tex?.dispose(), [tex]);
  const imageAspect = tex ? tex.image.width / Math.max(1, tex.image.height) : 1.5;
  const sim = useRef({ mx: 0, my: 0, hasMouse: false, tiltX: 0, tiltY: 0, bend: 0, lastY: 0, frames: -1, top: 0, h: 1 }).current;

  // Overscan so tilt, zoom and drift never show an edge.
  const overscan = phone ? 1.05 : 1.08;
  const H = 2 * CAMERA_Z * Math.tan(THREE.MathUtils.degToRad(FOV / 2)) * overscan;
  const W = H * (width / height);

  useEffect(() => {
    uniforms.uReveal.value = 1.1;
    const { scale, offset } = coverUv(W / H, imageAspect, position[0], position[1]);
    uniforms.uCoverScale.value.copy(scale);
    uniforms.uCoverOffset.value.copy(offset);

    // Fail safe: upload the texture now and check the driver accepted it. The
    // layer only becomes visible after this passes and a frame has rendered,
    // so any failure leaves the poster showing instead of a black hero.
    if (!tex) {
      onFail();
      return;
    }
    const ctx = gl.getContext();
    for (let i = 0; i < 8 && ctx.getError() !== ctx.NO_ERROR; i++) {
      /* drain errors from earlier work so ours is the only one we see */
    }
    let ok = false;
    try {
      gl.initTexture(tex);
      ok = ctx.getError() === ctx.NO_ERROR;
    } catch {
      ok = false;
    }
    if (!ok) {
      uniforms.uReady.value = 0;
      onFail();
      return;
    }
    uniforms.uTex.value = tex;
    uniforms.uReady.value = 1;
    sim.frames = 0;
  }, [tex, uniforms, W, H, imageAspect, position, sim, gl, onFail]);
  useEffect(() => () => (material.dispose(), waveMat?.dispose()), [material, waveMat]);

  // Hero geometry, measured on width changes only (the hero is 100svh).
  useEffect(() => {
    const el = root.current;
    if (!el) return;
    let lastW = 0;
    const measure = () => {
      if (innerWidth === lastW) return;
      lastW = innerWidth;
      sim.top = el.getBoundingClientRect().top + scrollY;
      sim.h = Math.max(1, el.offsetHeight);
    };
    measure();
    addEventListener("resize", measure);
    return () => removeEventListener("resize", measure);
  }, [root, sim]);

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      sim.hasMouse = true;
      sim.mx = e.clientX / innerWidth - 0.5;
      sim.my = e.clientY / innerHeight - 0.5;
    };
    const onTilt = (e: DeviceOrientationEvent) => {
      if (e.gamma == null || e.beta == null) return;
      sim.tiltX = clamp1(e.gamma / 30) * 0.3;
      sim.tiltY = clamp1((e.beta - 50) / 30) * 0.2;
    };
    addEventListener("pointermove", onMove, { passive: true });
    addEventListener("deviceorientation", onTilt);
    return () => {
      removeEventListener("pointermove", onMove);
      removeEventListener("deviceorientation", onTilt);
    };
  }, [sim]);

  useFrame((state, dt) => {
    const t = state.clock.getElapsedTime();
    const out = Math.min(1, Math.max(0, (scrollY - sim.top) / sim.h));
    // Fade on scroll-out: dim into the night ground.
    uniforms.uLight.value = 1 - out * 0.85;

    const vel = (scrollY - sim.lastY) / Math.max(dt, 1e-3) / Math.max(sim.h, 1);
    sim.lastY = scrollY;
    sim.bend += (Math.max(-0.6, Math.min(0.6, vel * 0.5)) - sim.bend) * lerpAt60(0.08, dt);
    uniforms.uBend.value = sim.bend;

    if (!sim.hasMouse) {
      const k = lerpAt60(0.04, dt);
      sim.mx += (Math.sin(t * 0.35) * 0.22 + sim.tiltX - sim.mx) * k;
      sim.my += (Math.cos(t * 0.27) * 0.15 + sim.tiltY - sim.my) * k;
    }

    const g = group.current;
    if (g) {
      g.rotation.y += (sim.mx * 0.06 - g.rotation.y) * lerpAt60(0.05, dt);
      g.rotation.x += (sim.my * 0.04 - g.rotation.x) * lerpAt60(0.05, dt);
      // Touch screens: scroll drives a slow zoom and a vertical drift.
      const zoom = sim.hasMouse ? 1 : 1 + out * 0.08;
      g.scale.setScalar(zoom);
      g.position.y = sim.hasMouse ? 0 : -out * H * 0.03;
    }
    if (waveMat) {
      waveMat.uniforms.uTime.value = t;
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
  poster,
  position,
  wave = false,
  root,
  onReady,
  onFail,
}: {
  poster: HTMLImageElement;
  position: [number, number];
  wave?: boolean;
  root: RefObject<HTMLElement | null>;
  onReady: () => void;
  onFail: () => void;
}) {
  const [active, setActive] = useState(true);
  const [phone] = useState(isPhone);

  // Pause off screen and in hidden tabs.
  useEffect(() => {
    const el = root.current;
    if (!el) return;
    let onScreen = true;
    const update = () => setActive(onScreen && !document.hidden);
    const io = new IntersectionObserver(([e]) => {
      onScreen = e.isIntersecting;
      update();
    });
    io.observe(el);
    document.addEventListener("visibilitychange", update);
    return () => {
      io.disconnect();
      document.removeEventListener("visibilitychange", update);
    };
  }, [root]);

  return (
    <Canvas
      flat
      linear
      frameloop="demand"
      dpr={[1, 1.5]}
      gl={{ antialias: false, powerPreference: "high-performance" }}
      // Size from the container only; scrolling never re-measures or re-renders.
      resize={{ scroll: false, debounce: { scroll: 0, resize: 100 } }}
      camera={{ fov: FOV, near: 0.1, far: 50, position: [0, 0, CAMERA_Z] }}
      onCreated={({ gl }) => gl.setClearColor(0x0b0907, 1)}
      style={{ pointerEvents: "none" }}
    >
      <FrameDriver active={active} />
      <Hero poster={poster} position={position} wave={wave} root={root} phone={phone} onReady={onReady} onFail={onFail} />
    </Canvas>
  );
}
