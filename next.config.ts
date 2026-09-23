import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    formats: ["image/webp"],
  },
  turbopack: {
    // Tree-shaken three.js for the WebGL layer (see lib/three-slim.ts).
    resolveAlias: { three: "./lib/three-slim.ts" },
  },
};

export default nextConfig;
