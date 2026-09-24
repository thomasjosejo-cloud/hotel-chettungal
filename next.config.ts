import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    formats: ["image/webp"],
    // 60 is for the hero posters: they are full-bleed and sit under a heavy
    // scrim, where the difference is invisible and the bytes are not.
    qualities: [50, 60, 75],
  },
  turbopack: {
    // Tree-shaken three.js for the WebGL layer (see lib/three-slim.ts).
    resolveAlias: { three: "./lib/three-slim.ts" },
  },
};

export default nextConfig;
