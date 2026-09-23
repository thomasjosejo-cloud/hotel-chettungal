"use client";

import { useLayoutEffect, useState } from "react";

// Client-only flag: the very first page load never gets a curtain, so it can
// never cover the LCP element. Only in-app navigations do.
let hasMounted = false;

/** Brass curtain that lifts off a newly navigated page (400ms). */
export default function PageCurtain() {
  const [show, setShow] = useState(false);

  useLayoutEffect(() => {
    if (!hasMounted) {
      hasMounted = true;
      return;
    }
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    setShow(true);
  }, []);

  return show ? <div aria-hidden className="page-curtain" onAnimationEnd={() => setShow(false)} /> : null;
}
