"use client";

import { useEffect, useLayoutEffect, useMemo, useRef, useState, type RefObject } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { isPhone, textureUrl } from "@/lib/motion";
import {
  createEmberMaterial,
  createFrameMaterial,
  createSeatMaterial,
  createWaveMaterial,
  disableColorManagement,
} from "@/components/three/materials";
import { FrameDriver, lerpAt60 } from "@/components/three/parts";
import { CENTERS, FLOOR, chapterMix, seatsProgress, type JourneyState } from "./journey";
import { CHAPTER_SETS } from "./sets";
import { getSlides, paintMarks, tick, zoomCurrent, zoomNext } from "./slides";

disableColorManagement();

const NIGHT = 0x0b0907;
const CAMERA_Z = 16;

// One frame per chapter: [x, y, z, width], aspect 1.5. Desktop sits right of
// the copy; phones put it up top, full width (width applied as scale). The
// Board Room and CasaBay frames sit lower, closer to their shorter copy.
type Layout = [x: number, y: number, z: number, w: number];
const DESK: Layout[] = [[3.8, 0.6, 0, 10.2], [3.8, 0.8, 0, 10.2], [3.8, 0.5, 0, 9.6], [3.8, 0.7, 0, 10.2]];
const PHONE: Layout[] = [[0, 3.7, 0, 7.0], [0, 3.8, 0, 7.0], [0, 2.0, 0, 7.0], [0, 2.4, 0, 7.0]];

/** Per-frame values shared by every object in the scene (never React state). */
type Sim = {
  t: number;
  /** chapterMix of the scroll progress, this frame. */
  cm: number;
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

    sim.cm = chapterMix(p);
    const targetY = sim.cm * FLOOR;
    sim.camY += (targetY - sim.camY) * lerpAt60(0.09, dt);
    camera.position.set(sim.mx * 1.2, sim.camY - sim.my * 0.6, CAMERA_Z);
    camera.lookAt(sim.mx * 0.4, sim.camY, 0);

    if (++frames.current === 2) onReady();
  }, -1);

  return null;
}

/**
 * Textures for every chapter's photos. The first photo of each chapter loads
 * first (the scene itself mounts after load, when idle); the rest follow once
 * all the firsts are in. Each is uploaded to the GPU as it arrives, so a wipe
 * never stalls on a first-time upload. A swap only starts once its texture is in.
 */
function useChapterTextures(small: boolean) {
  const gl = useThree((s) => s.gl);
  const texs = useRef<(THREE.Texture | null)[][]>(CHAPTER_SETS.map((set) => set.map(() => null)));
  useEffect(() => {
    let alive = true;
    const loader = new THREE.TextureLoader();
    const all: THREE.Texture[] = [];
    const load = (f: number, k: number) =>
      new Promise<void>((done) =>
        loader.load(
          textureUrl(CHAPTER_SETS[f][k].src, small),
          (tex) => {
            tex.minFilter = THREE.LinearFilter;
            tex.generateMipmaps = false;
            all.push(tex);
            if (alive) {
              gl.initTexture(tex);
              texs.current[f][k] = tex;
            }
            done();
          },
          undefined,
          () => done(),
        ),
      );
    Promise.all(CHAPTER_SETS.map((_, f) => load(f, 0))).then(() => {
      if (alive) CHAPTER_SETS.forEach((set, f) => set.forEach((_, k) => k && load(f, k)));
    });
    return () => {
      alive = false;
      all.forEach((t) => t.dispose());
      texs.current = CHAPTER_SETS.map((set) => set.map(() => null));
    };
  }, [gl, small]);
  return texs;
}

/** One chapter's frame: its photos take turns (hold, wipe, push-in), swipeable. */
function Frame({
  floor,
  sim,
  journey,
  texs,
}: {
  floor: number;
  sim: Sim;
  journey: JourneyState;
  texs: RefObject<(THREE.Texture | null)[][]>;
}) {
  const mesh = useRef<THREE.Mesh>(null);
  const { material, uniforms } = useMemo(() => createFrameMaterial(), []);
  const [dx, dy, dz, dw] = DESK[floor];
  const [px, py, pz, pw] = PHONE[floor];
  const geometry = useMemo(() => new THREE.PlaneGeometry(dw, dw / 1.5, 24, 24), [dw]);
  const sizeW = useThree((s) => s.size.width);
  const sizeH = useThree((s) => s.size.height);
  const small = sizeW < 760;

  // The WebGL frame drives this chapter's photo state while it's mounted.
  useEffect(() => {
    const s = getSlides(`ch${floor}`, CHAPTER_SETS[floor].length);
    s.driver = "webgl";
    s.animated = true;
    s.ready = (k) => !!texs.current?.[floor]?.[k];
    return () => {
      if (s.driver === "webgl") s.driver = null;
      s.animated = false;
    };
  }, [floor, texs]);
  useEffect(() => () => (material.dispose(), geometry.dispose()), [material, geometry]);

  // Layout, and the frame's on-screen width for the swipe (all four share it).
  useLayoutEffect(() => {
    const m = mesh.current;
    if (!m) return;
    m.position.set(small ? px : dx, floor * FLOOR + (small ? py : dy), small ? pz : dz);
    m.scale.setScalar(small ? pw / dw : 1);
    if (floor === 0) {
      const fov = small ? 58 : 42;
      const visW = 2 * CAMERA_Z * Math.tan(THREE.MathUtils.degToRad(fov / 2)) * (sizeW / Math.max(1, sizeH));
      journey.framePx = ((small ? pw : dw) / visW) * sizeW;
    }
  }, [small, px, py, pz, pw, dx, dy, dz, dw, floor, sizeW, sizeH, journey]);

  useFrame((_, dt) => {
    const m = mesh.current;
    const t = texs.current?.[floor];
    if (!m || !t) return;
    const s = getSlides(`ch${floor}`, t.length);
    const d = Math.abs(sim.camY / FLOOR - floor);

    // Photos take turns only on the current chapter, in a visible tab; the
    // others freeze where they are.
    tick(s, Math.min(dt, 0.1), journey.onStage && Math.abs(sim.cm - floor) < 0.3 && !document.hidden);
    const cur = t[s.cur];
    uniforms.uTex.value = cur;
    uniforms.uNext.value = s.next >= 0 && t[s.next] ? t[s.next] : cur;
    uniforms.uMix.value = s.next >= 0 ? s.mix : 0;
    uniforms.uZa.value = zoomCurrent(s);
    uniforms.uZb.value = zoomNext(s);
    uniforms.uReady.value = cur ? 1 : 0;
    if (d < 1.2) paintMarks(s);

    const reveal = Math.max(0, Math.min(1, 1.25 - d * 1.4));
    uniforms.uReveal.value += (reveal * 1.1 - uniforms.uReveal.value) * lerpAt60(0.12, dt);
    uniforms.uLight.value = Math.max(0.25, 1 - d * 0.9);
    // Board Room (chapter 2) stays still: its bend is multiplied by 0.15.
    uniforms.uBend.value = sim.bend * (floor === 2 ? 0.15 : 1);
    // Idle drift around the layout's x.
    const bx = sim.mobile ? px : dx;
    m.position.x += (bx + Math.sin(sim.t * 0.25 + dz) * 0.08 - m.position.x) * lerpAt60(0.05, dt);
  });

  return <mesh ref={mesh} geometry={geometry} material={material} />;
}

function Frames({ sim, journey }: { sim: Sim; journey: JourneyState }) {
  const small = useThree((s) => s.size.width < 760);
  const texs = useChapterTextures(small);
  return (
    <>
      {CHAPTER_SETS.map((_, floor) => (
        <Frame key={floor} floor={floor} sim={sim} journey={journey} texs={texs} />
      ))}
    </>
  );
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

  // Phones: the 120 lights sit over the lower edge of the hall frame, above the copy.
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
    cm: chapterMix(journey.p),
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
      camera={{ fov: 42, near: 0.1, far: 100, position: [0, sim.camY, CAMERA_Z] }}
      style={{ pointerEvents: "none" }}
    >
      <FrameDriver active={active} />
      <Rig journey={journey} sim={sim} onReady={onReady} />
      <Wave sim={sim} />
      <Frames sim={sim} journey={journey} />
      <Seats sim={sim} journey={journey} />
      <Embers sim={sim} />
    </Canvas>
  );
}
