"use client";

import { useEffect, useRef, useState } from "react";
import { useThree } from "@react-three/fiber";
import * as THREE from "three";

const loader = new THREE.TextureLoader();

/**
 * Loads a texture once `enabled` turns true and disposes it on unmount.
 * Textures are set up as in the prototype: linear filtering, no mipmaps.
 */
export function useLazyTexture(url: string, enabled = true, onLoad?: () => void) {
  const [texture, setTexture] = useState<THREE.Texture | null>(null);
  const onLoadRef = useRef(onLoad);
  onLoadRef.current = onLoad;

  useEffect(() => {
    if (!enabled) return;
    let alive = true;
    let loaded: THREE.Texture | null = null;
    loader.load(url, (tex) => {
      tex.minFilter = THREE.LinearFilter;
      tex.generateMipmaps = false;
      loaded = tex;
      if (!alive) return tex.dispose();
      setTexture(tex);
      onLoadRef.current?.();
    });
    return () => {
      alive = false;
      loaded?.dispose();
    };
  }, [url, enabled]);

  return texture;
}

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
