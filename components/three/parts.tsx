"use client";

import { useEffect, useRef, useState } from "react";
import { useThree } from "@react-three/fiber";
import * as THREE from "three";

const loader = new THREE.TextureLoader();

/** Keeps a frameloop="demand" canvas rendering only while `active`. */
export function FrameDriver({ active }: { active: boolean }) {
  const invalidate = useThree((s) => s.invalidate);
  useEffect(() => {
    if (!active) return;
    let id = 0;
    const loop = () => {
      invalidate();
      id = requestAnimationFrame(loop);
    };
    loop();
    return () => cancelAnimationFrame(id);
  }, [active, invalidate]);
  return null;
}

/** Converts a prototype per-frame lerp factor (tuned at 60fps) to any frame rate. */
export function lerpAt60(factor: number, dt: number) {
  return 1 - Math.pow(1 - factor, Math.min(dt, 0.1) * 60);
}
