import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    formats: ["image/webp"],
    qualities: [75],
  },
  turbopack: {
    // Tree-shaken three.js for the WebGL layer (see lib/three-slim.ts).
    resolveAlias: { three: "./lib/three-slim.ts" },
  },
  async redirects() {
    // Production only: previews must stay reachable on their own vercel.app URLs.
    if (process.env.VERCEL_ENV !== "production") return [];
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "(?<host>.*)\\.vercel\\.app" }],
        destination: "https://hotelchettungal.com/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
