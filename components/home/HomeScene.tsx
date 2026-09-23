"use client";

import { useEffect, useLayoutEffect, useMemo, useRef, useState, type RefObject } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { PHOTOS } from "@/content/site";
import { isPhone, textureUrl } from "@/lib/motion";
import {
  createEmberMaterial,
  createPlaneMaterial,
  createSeatMaterial,
  createWaveMaterial,
  disableColorManagement,
} from "@/components/three/materials";
import { FrameDriver, lerpAt60, useLazyTexture } from "@/components/three/parts";
import { CENTERS, FLOOR, chapterMix, seatsProgress, type JourneyState } from "./journey";

disableColorManagement();

const NIGHT = 0x0b0907;
const { casabay: cb, fishtown: ft, townhall: th, boardroom: br } = PHOTOS;

// The prototype's layout per chapter: [src, x, y, z, width]. Desktop places the
// photos right of the copy.
type Spec = [src: string, x: number, y: number, z: number, w: number];
const LAYOUT: Spec[][] = [
  [[ft[0].src, 3.4, 0.6, 0, 9.2], [ft[1].src, -2.6, -2.6, -4, 6.2], [ft[2].src, 8.6, -3.2, -6, 6]],
  [[th[0].src, 3.6, 0.9, 0, 9.4], [th[1].src, 9.2, -2.2, -5, 5.8], [th[4].src, -3.2, 3.4, -7, 6]],
  [[br[0].src, 3.6, 0.4, 0, 8.4], [br[1].src, -3.4, -3, -6, 5.4]],
  [[cb[1].src, 3.4, 0.8, 0, 9.4], [cb[3].src, -2.8, -2.8, -4, 6], [cb[4].src, 8.8, 3.4, -6, 6.2]],
];
// Phones: one large photo up top, others at different depths peeking in from the
// sides and behind, so rising through a chapter still shows parallax.
// [x, y, z, width] per plane, in the same order as LAYOUT (the prototype's PHONE table).
type PhoneSpec = [x: number, y: number, z: number, w: number];
const PHONE: PhoneSpec[][] = [
  [[0.4, 3.6, 0, 7.0], [-3.3, 0.7, -3.5, 4.2], [3.6, 6.8, -6, 4.4]],
  [[0.3, 3.8, 0, 7.2], [3.8, 0.5, -4.5, 4.2], [-3.6, 7.2, -6.5, 4.6]],
  [[0.2, 3.6, 0, 6.6], [-3.2, 0.9, -5, 4.0]],
  [[0.3, 3.8, 0, 7.2], [-3.4, 0.7, -3.5, 4.4], [3.5, 7.0, -6, 4.6]],
];

/** Per-frame values shared by every object in the scene (never React state). */
type Sim = {
  t: number;
  camY: number;
  bend: number;
  lastP: number;
  mx: number;
  my: number;
  hasMouse: boolean;
  tiltX: number;
  tiltY: number;
  mobile: boolean;
};

const clamp1 = (v: number) => Math.max(-1, Math.min(1, v));

function Rig({ journey, sim, onReady }: { journey: JourneyState; sim: Sim; onReady: () => void }) {
  // Narrow selectors only: this component must not re-render on scroll.
  const camera = useThree((s) => s.camera) as THREE.PerspectiveCamera;
  const width = useThree((s) => s.size.width);
  const gl = useThree((s) => s.gl);
  const scene = useThree((s) => s.scene);
  const frames = useRef(0);

  useEffect(() => {
    gl.setClearColor(NIGHT, 1);
    scene.fog = new THREE.Fog(NIGHT, 14, 34);
    return () => {
      scene.fog = null;
    };
  }, [gl, scene]);

  useEffect(() => {
    sim.mobile = width < 760;
    camera.fov = sim.mobile ? 58 : 42;
    camera.updateProjectionMatrix();
  }, [camera, width, sim]);

  // A real mouse drives the parallax (it never fires on phones). Until one moves,
  // touch screens get an ambient drift, nudged by device tilt where the browser
  // sends it (Android does without a prompt; iOS simply won't fire, by design).
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

  // Runs before the objects (priority -1) so they all read this frame's values.
  useFrame((state, dt) => {
    sim.t = state.clock.getElapsedTime();
    if (!sim.hasMouse) {
      const k = lerpAt60(0.04, dt);
      sim.mx += (Math.sin(sim.t * 0.35) * 0.22 + sim.tiltX - sim.mx) * k;
      sim.my += (Math.cos(sim.t * 0.27) * 0.15 + sim.tiltY - sim.my) * k;
    }
    const p = journey.p;
    const vel = (p - sim.lastP) / Math.max(dt, 1e-3); // = prototype's per-frame delta x 60
    sim.lastP = p;
    sim.bend += (Math.max(-1.2, Math.min(1.2, vel * 5)) - sim.bend) * lerpAt60(0.08, dt);

    const targetY = chapterMix(p) * FLOOR;
    sim.camY += (targetY - sim.camY) * lerpAt60(0.09, dt);
    camera.position.set(sim.mx * 1.2, sim.camY - sim.my * 0.6, 16);
    camera.lookAt(sim.mx * 0.4, sim.camY, 0);

    if (++frames.current === 2) onReady();
  }, -1);

  return null;
}

function Plane({ spec, phone, floor, sim }: { spec: Spec; phone: PhoneSpec; floor: number; sim: Sim }) {
  const [src, x, y, z, width] = spec;
  const [px, py, pz, pw] = phone;
  const mesh = useRef<THREE.Mesh>(null);
  const { material, uniforms } = useMemo(() => createPlaneMaterial(), []);
  const geometry = useMemo(() => new THREE.PlaneGeometry(width, width / 1.5, 24, 24), [width]);
  const small = useThree((s) => s.size.width < 760);

  // Fetch one chapter ahead of the camera; a state change per chapter, not per frame.
  const [load, setLoad] = useState(() => floor <= Math.floor(sim.camY / FLOOR + 1.5));
  const tex = useLazyTexture(textureUrl(src, small), load);

  useEffect(() => {
    uniforms.uTex.value = tex;
    uniforms.uReady.value = tex ? 1 : 0;
  }, [tex, uniforms]);
  useEffect(() => () => (material.dispose(), geometry.dispose()), [material, geometry]);

  // Phone layout: explicit position per plane, width applied as a scale.
  useLayoutEffect(() => {
    const m = mesh.current;
    if (!m) return;
    m.position.set(small ? px : x, floor * FLOOR + (small ? py : y), small ? pz : z);
    m.scale.setScalar(small ? pw / width : 1);
  }, [small, px, py, pz, pw, x, y, z, width, floor]);

  useFrame((_, dt) => {
    const m = mesh.current;
    if (!m) return;
    if (!load && floor <= Math.floor(sim.camY / FLOOR + 1.5)) setLoad(true);
    const d = Math.abs(sim.camY / FLOOR - floor);
    const reveal = Math.max(0, Math.min(1, 1.25 - d * 1.4));
    uniforms.uReveal.value += (reveal * 1.1 - uniforms.uReveal.value) * lerpAt60(0.12, dt);
    uniforms.uLight.value = Math.max(0.25, 1 - d * 0.9);
    // Board Room (chapter 2) stays still: its bend is multiplied by 0.15.
    uniforms.uBend.value = sim.bend * (z === 0 ? 1 : 0.6) * (floor === 2 ? 0.15 : 1);
    // Idle drift around the layout's x (the phone x on phones).
    const bx = sim.mobile ? px : x;
    m.position.x += (bx + Math.sin(sim.t * 0.25 + z) * 0.08 - m.position.x) * lerpAt60(0.05, dt);
  });

  return <mesh ref={mesh} geometry={geometry} material={material} />;
}

function Wave({ sim }: { sim: Sim }) {
  const mesh = useRef<THREE.Mesh>(null);
  const material = useMemo(() => createWaveMaterial(), []);
  useEffect(() => () => material.dispose(), [material]);
  useFrame(() => {
    material.uniforms.uTime.value = sim.t;
    material.uniforms.uAmt.value = Math.max(0, 1 - Math.abs(sim.camY / FLOOR - 0) * 1.3);
    if (mesh.current) mesh.current.position.y = sim.mobile ? 3 : 0;
  });
  return (
    <mesh ref={mesh} material={material} position={[2, 0, -9]}>
      <planeGeometry args={[40, 14]} />
    </mesh>
  );
}

const SEATS = 120;
const COLS = 12;

function Seats({ sim, journey }: { sim: Sim; journey: JourneyState }) {
  const group = useRef<THREE.Group>(null);
  const height = useThree((s) => s.size.height);
  const small = useThree((s) => s.size.width < 760);
  const dpr = useThree((s) => s.viewport.dpr);
  const material = useMemo(() => createSeatMaterial(), []);
  const geometry = useMemo(() => {
    // Ten theatre rows of twelve with a centre aisle, relative to the floor.
    const pos = new Float32Array(SEATS * 3);
    const idx = new Float32Array(SEATS);
    for (let i = 0; i < SEATS; i++) {
      const row = Math.floor(i / COLS);
      const col = i % COLS;
      const aisle = col >= COLS / 2 ? 0.7 : 0;
      pos[i * 3] = -4.6 + col * 0.72 + aisle + 3.2;
      pos[i * 3 + 1] = -5.4 + row * 0.2;
      pos[i * 3 + 2] = 4.2 - row * 0.62;
      idx[i] = i / SEATS;
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    g.setAttribute("aIdx", new THREE.BufferAttribute(idx, 1));
    return g;
  }, []);
  useEffect(() => () => (material.dispose(), geometry.dispose()), [material, geometry]);

  // Phones: the 120 lights sit over the lower edge of the hall photo, above the copy.
  useLayoutEffect(() => {
    const g = group.current;
    if (!g) return;
    if (small) g.position.set(-2.2, FLOOR + 3.9, 0);
    else g.position.set(0, FLOOR, 0);
    g.scale.setScalar(small ? 0.62 : 1);
  }, [small]);

  useFrame(() => {
    const u = material.uniforms;
    u.uPx.value = dpr * (height / 900);
    u.uTime.value = sim.t;
    const visible = Math.max(0, 1 - Math.abs(sim.camY / FLOOR - 1) * 1.2);
    u.uLit.value = seatsProgress(journey.p) * 1.02 * (visible > 0.05 ? 1 : 0);
  });

  return (
    <group ref={group}>
      <points geometry={geometry} material={material} frustumCulled={false} />
    </group>
  );
}

function Embers({ sim }: { sim: Sim }) {
  const height = useThree((s) => s.size.height);
  const small = useThree((s) => s.size.width < 760);
  const dpr = useThree((s) => s.viewport.dpr);
  const count = small ? 160 : 420;
  const material = useMemo(() => createEmberMaterial(), []);
  const geometry = useMemo(() => {
    const eb = new Float32Array(count * 3);
    const es = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      eb[i * 3] = (Math.random() - 0.3) * 26;
      eb[i * 3 + 1] = Math.random() * 12 - 6;
      eb[i * 3 + 2] = Math.random() * 10 - 6;
      es[i] = Math.random();
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(eb, 3));
    g.setAttribute("aSeed", new THREE.BufferAttribute(es, 1));
    return g;
  }, [count]);
  useEffect(() => () => (material.dispose(), geometry.dispose()), [material, geometry]);

  useFrame(() => {
    const u = material.uniforms;
    u.uTime.value = sim.t;
    u.uBaseY.value = sim.camY;
    u.uPx.value = dpr * (height / 900);
    // Faint on the lower chapters, full on the roof.
    const roof = Math.max(0, 1 - Math.abs(sim.camY / FLOOR - (CENTERS.length - 1)) * 1.1);
    u.uAmt.value = 0.18 + roof * 0.95;
  });

  return <points geometry={geometry} material={material} frustumCulled={false} />;
}

export default function HomeScene({
  journey,
  root,
  onReady,
}: {
  journey: JourneyState;
  root: RefObject<HTMLElement | null>;
  onReady: () => void;
}) {
  const sim = useRef<Sim>({
    t: 0,
    camY: chapterMix(journey.p) * FLOOR,
    bend: 0,
    lastP: journey.p,
    mx: 0,
    my: 0,
    hasMouse: false,
    tiltX: 0,
    tiltY: 0,
    mobile: journey.mobile,
  }).current;
  const [phone] = useState(isPhone);
  const [active, setActive] = useState(true);

  // Render only while the journey is on screen and the tab is visible.
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
      // Phones: no MSAA (the reveal edges are already soft).
      gl={{ antialias: !phone, powerPreference: "high-performance" }}
      // Size from the container only. The stage is 100svh, so the address bar
      // showing or hiding never resizes it, and scrolling never re-measures.
      resize={{ scroll: false, debounce: { scroll: 0, resize: 100 } }}
      camera={{ fov: 42, near: 0.1, far: 100, position: [0, sim.camY, 16] }}
      style={{ pointerEvents: "none" }}
    >
      <FrameDriver active={active} />
      <Rig journey={journey} sim={sim} onReady={onReady} />
      <Wave sim={sim} />
      {LAYOUT.map((list, floor) =>
        list.map((spec, i) => <Plane key={spec[0]} spec={spec} phone={PHONE[floor][i]} floor={floor} sim={sim} />),
      )}
      <Seats sim={sim} journey={journey} />
      <Embers sim={sim} />
    </Canvas>
  );
}
