/**
 * `three` for this site, re-exported from source modules so the bundle only
 * carries what the scenes and @react-three/fiber actually use. next.config.ts
 * aliases the bare `three` specifier here (R3F does `extend(THREE)` on the
 * whole namespace, which otherwise defeats tree-shaking).
 *
 * If a scene starts using a new three.js class, export it here too. The types
 * still come from @types/three, so a missing export shows up at runtime as
 * `undefined`, not at build time: the Playwright console-error pass catches it.
 */

// Used by @react-three/fiber internally
export { WebGLRenderer } from "three/src/renderers/WebGLRenderer.js";
export { Scene } from "three/src/scenes/Scene.js";
export { Fog } from "three/src/scenes/Fog.js";
export { PerspectiveCamera } from "three/src/cameras/PerspectiveCamera.js";
export { OrthographicCamera } from "three/src/cameras/OrthographicCamera.js";
export { Raycaster } from "three/src/core/Raycaster.js";
export { Layers } from "three/src/core/Layers.js";
export { Object3D } from "three/src/core/Object3D.js";
// Timer-backed stand-in for the deprecated THREE.Clock that R3F constructs (see lib/timer-clock.ts).
export { TimerClock as Clock } from "./timer-clock";
export { Timer } from "three/src/core/Timer.js";
export { Vector2 } from "three/src/math/Vector2.js";
export { Vector3 } from "three/src/math/Vector3.js";
export { Color } from "three/src/math/Color.js";
export { ColorManagement } from "three/src/math/ColorManagement.js";
export * from "three/src/constants.js";

// Used by the scenes (JSX elements: mesh, planeGeometry, points, group, instancedMesh)
export { MathUtils } from "three/src/math/MathUtils.js";
export { Matrix4 } from "three/src/math/Matrix4.js";
export { Texture } from "three/src/textures/Texture.js";
export { TextureLoader } from "three/src/loaders/TextureLoader.js";
export { ShaderMaterial } from "three/src/materials/ShaderMaterial.js";
export { BufferGeometry } from "three/src/core/BufferGeometry.js";
export { BufferAttribute } from "three/src/core/BufferAttribute.js";
export { InstancedBufferAttribute } from "three/src/core/InstancedBufferAttribute.js";
export { PlaneGeometry } from "three/src/geometries/PlaneGeometry.js";
export { Mesh } from "three/src/objects/Mesh.js";
export { Points } from "three/src/objects/Points.js";
export { Group } from "three/src/objects/Group.js";
export { InstancedMesh } from "three/src/objects/InstancedMesh.js";
