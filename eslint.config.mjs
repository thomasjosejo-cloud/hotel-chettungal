import next from "eslint-config-next/core-web-vitals";

/**
 * Next's Core Web Vitals rule set (flat config, shipped by eslint-config-next).
 *
 * The react-hooks compiler rules assume React owns every value a hook touches.
 * The WebGL scenes do not work that way: react-three-fiber's model is to mutate
 * three.js objects (uniforms, materials, object3D transforms) in place inside
 * useFrame, sixty times a second, precisely so React never re-renders. Those
 * rules are switched off for that code and left on everywhere else.
 */
const config = [
  { ignores: [".next/**", "node_modules/**", "out/**", "docs/**", "public/**", "next-env.d.ts"] },
  ...next,
  {
    files: [
      "components/three/**/*.tsx",
      "components/home/HomeScene.tsx",
      "components/home/HomeJourney.tsx",
      "components/motion/PageCurtain.tsx",
    ],
    rules: {
      "react-hooks/immutability": "off",
      "react-hooks/refs": "off",
      "react-hooks/purity": "off",
      "react-hooks/set-state-in-effect": "off",
    },
  },
];

export default config;
