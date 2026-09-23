import * as THREE from "three";

/*
 * Shaders ported from the approved prototype (docs/prototype-home.html).
 * The prototype runs three.js without colour management, so these scenes do
 * too (see disableColorManagement): hex colours and textures pass straight
 * through and match the page's CSS colours exactly.
 */

let cmDisabled = false;
export function disableColorManagement() {
  if (cmDisabled) return;
  THREE.ColorManagement.enabled = false;
  cmDisabled = true;
}

/* ------------------------------------------------------------------ */
/* Photo plane                                                          */
/* ------------------------------------------------------------------ */

const planeVert = /* glsl */ `
  uniform float uBend;
  varying vec2 vUv;
  void main() {
    vUv = uv;
    vec3 p = position;
    p.z += sin(uv.y * 3.14159) * uBend + sin(uv.x * 3.14159) * uBend * 0.4;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
  }
`;

// Prototype fragment, plus cover-fit (identity on the home page) so a hero
// plane can match its poster's object-fit / object-position exactly.
const planeFrag = /* glsl */ `
  uniform sampler2D uTex;
  uniform float uReveal;
  uniform float uLight;
  uniform float uReady;
  uniform float uEdge;
  uniform vec2 uCoverScale;
  uniform vec2 uCoverOffset;
  varying vec2 vUv;
  void main() {
    vec4 c = texture2D(uTex, vUv * uCoverScale + uCoverOffset);
    float m = 1.0 - smoothstep(uReveal - 0.08, uReveal, 1.0 - vUv.y);
    float edge = uEdge > 0.0 ? smoothstep(0.0, uEdge, vUv.x) * smoothstep(0.0, uEdge, 1.0 - vUv.x) : 1.0;
    gl_FragColor = vec4(c.rgb * uLight, m * uReady * edge);
  }
`;

export type PlaneUniforms = {
  uTex: { value: THREE.Texture | null };
  uReveal: { value: number };
  uLight: { value: number };
  uBend: { value: number };
  uReady: { value: number };
  uEdge: { value: number };
  uCoverScale: { value: THREE.Vector2 };
  uCoverOffset: { value: THREE.Vector2 };
};

export function createPlaneMaterial(edge = 0.015) {
  const uniforms: PlaneUniforms = {
    uTex: { value: null },
    uReveal: { value: 0 },
    uLight: { value: 1 },
    uBend: { value: 0 },
    uReady: { value: 0 },
    uEdge: { value: edge },
    uCoverScale: { value: new THREE.Vector2(1, 1) },
    uCoverOffset: { value: new THREE.Vector2(0, 0) },
  };
  const material = new THREE.ShaderMaterial({
    uniforms,
    vertexShader: planeVert,
    fragmentShader: planeFrag,
    transparent: true,
    depthWrite: false,
  });
  return { material, uniforms };
}

/* ------------------------------------------------------------------ */
/* Chapter frame: one plane per chapter, its photos taking turns          */
/* ------------------------------------------------------------------ */

// From prototype v5's planeFrag. uTex is the photo showing, uNext the one
// wiping in from the top (uMix 0 -> 1) with a thin warm light on the wipe
// edge; each photo pushes in slowly (uZa / uZb) while it holds. The chapter
// reveal, light-by-distance and soft side edges are unchanged.
const frameFrag = /* glsl */ `
  uniform sampler2D uTex;
  uniform sampler2D uNext;
  uniform float uMix;
  uniform float uZa;
  uniform float uZb;
  uniform float uReveal;
  uniform float uLight;
  uniform float uReady;
  varying vec2 vUv;
  void main() {
    vec3 ca = texture2D(uTex, (vUv - 0.5) / uZa + 0.5).rgb;
    vec3 cb = texture2D(uNext, (vUv - 0.5) / uZb + 0.5).rgb;
    float y = 1.0 - vUv.y;
    float front = uMix * 1.12;
    float w = 1.0 - smoothstep(front - 0.1, front, y);
    float line = exp(-pow((y - front + 0.05) * 30.0, 2.0)) * step(0.001, uMix) * step(uMix, 0.999);
    vec3 c = mix(ca, cb, w) + vec3(1.0, 0.72, 0.4) * line * 0.3;
    float m = 1.0 - smoothstep(uReveal - 0.08, uReveal, y);
    float edge = smoothstep(0.0, 0.015, vUv.x) * smoothstep(0.0, 0.015, 1.0 - vUv.x);
    gl_FragColor = vec4(c * uLight, m * uReady * edge);
  }
`;

export type FrameUniforms = {
  uTex: { value: THREE.Texture | null };
  uNext: { value: THREE.Texture | null };
  uMix: { value: number };
  uZa: { value: number };
  uZb: { value: number };
  uReveal: { value: number };
  uLight: { value: number };
  uBend: { value: number };
  uReady: { value: number };
};

export function createFrameMaterial() {
  const uniforms: FrameUniforms = {
    uTex: { value: null },
    uNext: { value: null },
    uMix: { value: 0 },
    uZa: { value: 1 },
    uZb: { value: 1 },
    uReveal: { value: 0 },
    uLight: { value: 1 },
    uBend: { value: 0 },
    uReady: { value: 0 },
  };
  const material = new THREE.ShaderMaterial({
    uniforms,
    vertexShader: planeVert,
    fragmentShader: frameFrag,
    transparent: true,
    depthWrite: false,
  });
  return { material, uniforms };
}

/** UV scale/offset that reproduces CSS object-fit: cover + object-position. */
export function coverUv(planeAspect: number, imageAspect: number, posX = 0.5, posY = 0.5) {
  const scale = new THREE.Vector2(1, 1);
  if (planeAspect > imageAspect) scale.y = imageAspect / planeAspect;
  else scale.x = planeAspect / imageAspect;
  // CSS y runs top-down; UV y runs bottom-up.
  return { scale, offset: new THREE.Vector2((1 - scale.x) * posX, (1 - scale.y) * (1 - posY)) };
}

/* ------------------------------------------------------------------ */
/* Fish Town wave-wall glow: three warm undulating light bands          */
/* ------------------------------------------------------------------ */

export function createWaveMaterial() {
  return new THREE.ShaderMaterial({
    uniforms: { uTime: { value: 0 }, uAmt: { value: 0 } },
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    vertexShader: /* glsl */ `
      varying vec2 vUv;
      void main() { vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }
    `,
    fragmentShader: /* glsl */ `
      uniform float uTime;
      uniform float uAmt;
      varying vec2 vUv;
      void main() {
        float a = 0.0;
        for (int i = 0; i < 3; i++) {
          float fi = float(i);
          float y = 0.3 + fi * 0.2 + sin(vUv.x * (9.0 + fi * 3.0) + uTime * (0.5 + fi * 0.15)) * 0.035 + sin(vUv.x * 23.0 + fi) * 0.012;
          float d = abs(vUv.y - y);
          a += exp(-d * d * 2600.0) * 0.9 + exp(-d * d * 180.0) * 0.18;
        }
        float fade = smoothstep(0.0, 0.25, vUv.x) * smoothstep(1.0, 0.75, vUv.x);
        gl_FragColor = vec4(vec3(1.0, 0.72, 0.36) * a * fade * uAmt, 1.0);
      }
    `,
  });
}

/* ------------------------------------------------------------------ */
/* Town Hall: 120 seats that light up in order                          */
/* ------------------------------------------------------------------ */

export function createSeatMaterial() {
  return new THREE.ShaderMaterial({
    uniforms: { uLit: { value: 0 }, uPx: { value: 1 }, uTime: { value: 0 } },
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    vertexShader: /* glsl */ `
      attribute float aIdx;
      uniform float uLit;
      uniform float uPx;
      varying float vOn;
      varying float vIdx;
      void main() {
        vIdx = aIdx;
        vOn = smoothstep(aIdx, aIdx + 0.02, uLit);
        vec4 mv = modelViewMatrix * vec4(position, 1.0);
        gl_PointSize = (10.0 + vOn * 14.0) * uPx * (12.0 / -mv.z);
        gl_Position = projectionMatrix * mv;
      }
    `,
    fragmentShader: /* glsl */ `
      varying float vOn;
      varying float vIdx;
      uniform float uTime;
      void main() {
        float d = length(gl_PointCoord - 0.5);
        float core = smoothstep(0.5, 0.0, d);
        float tw = 0.85 + 0.15 * sin(uTime * 2.0 + vIdx * 40.0);
        vec3 col = mix(vec3(0.35, 0.3, 0.26), vec3(1.0, 0.8, 0.45), vOn);
        gl_FragColor = vec4(col * core * mix(0.35, 1.0, vOn) * tw, core * mix(0.25, 1.0, vOn));
      }
    `,
  });
}

/* ------------------------------------------------------------------ */
/* Embers: one particle column that follows the camera                  */
/* ------------------------------------------------------------------ */

export function createEmberMaterial() {
  return new THREE.ShaderMaterial({
    uniforms: { uTime: { value: 0 }, uBaseY: { value: 0 }, uAmt: { value: 0 }, uPx: { value: 1 } },
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    vertexShader: /* glsl */ `
      attribute float aSeed;
      uniform float uTime;
      uniform float uBaseY;
      uniform float uPx;
      varying float vA;
      void main() {
        vec3 p = position;
        float t = uTime * (0.25 + aSeed * 0.5);
        p.y = uBaseY + mod(p.y + t + 6.0, 12.0) - 6.0;
        p.x += sin(t * 1.3 + aSeed * 30.0) * 0.4;
        vA = smoothstep(-6.0, -3.0, p.y - uBaseY) * smoothstep(6.0, 2.0, p.y - uBaseY) * (0.5 + 0.5 * sin(uTime * 3.0 + aSeed * 50.0));
        vec4 mv = modelViewMatrix * vec4(p, 1.0);
        gl_PointSize = (4.0 + aSeed * 7.0) * uPx * (12.0 / -mv.z);
        gl_Position = projectionMatrix * mv;
      }
    `,
    fragmentShader: /* glsl */ `
      uniform float uAmt;
      varying float vA;
      void main() {
        float d = length(gl_PointCoord - 0.5);
        float g = smoothstep(0.5, 0.0, d);
        gl_FragColor = vec4(vec3(1.0, 0.62, 0.28) * g * vA * uAmt, 1.0);
      }
    `,
  });
}
