import { Timer } from "three/src/core/Timer.js";

/**
 * THREE.Clock is deprecated since r183 and warns when constructed, but
 * @react-three/fiber 9 still does `new THREE.Clock()` for `state.clock`.
 * lib/three-slim.ts exports this class as `Clock`, so R3F gets the same API
 * backed by THREE.Timer and nothing constructs the deprecated class.
 *
 * Implements what R3F and the scenes use: start, stop, getDelta,
 * getElapsedTime, and writable elapsedTime / oldTime (R3F resets
 * elapsedTime directly when the frameloop changes).
 */
export class TimerClock {
  autoStart: boolean;
  startTime = 0;
  oldTime = 0;
  elapsedTime = 0;
  running = false;
  private timer = new Timer();

  constructor(autoStart = true) {
    this.autoStart = autoStart;
  }

  start() {
    this.timer.reset();
    this.startTime = performance.now();
    this.oldTime = this.startTime;
    this.elapsedTime = 0;
    this.running = true;
  }

  stop() {
    this.getElapsedTime();
    this.running = false;
    this.autoStart = false;
  }

  getElapsedTime() {
    this.getDelta();
    return this.elapsedTime;
  }

  getDelta() {
    if (this.autoStart && !this.running) {
      this.start();
      return 0;
    }
    if (!this.running) return 0;
    this.timer.update();
    const delta = this.timer.getDelta();
    this.oldTime = performance.now();
    this.elapsedTime += delta;
    return delta;
  }
}
