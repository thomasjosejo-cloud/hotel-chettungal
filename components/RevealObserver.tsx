"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Marks the document as JS-enabled and reveals [data-reveal] elements and
 * [data-split] headings (word-by-word, see SplitText) as they scroll into
 * view. Only toggles [data-shown]; never touches server-rendered text.
 * Without JS everything simply stays visible.
 */
export default function RevealObserver() {
  const pathname = usePathname();

  useEffect(() => {
    document.documentElement.classList.add("js");
    const els = document.querySelectorAll<HTMLElement>(":is([data-reveal], [data-split]):not([data-shown])");
    if (!("IntersectionObserver" in window)) {
      els.forEach((el) => el.setAttribute("data-shown", ""));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.setAttribute("data-shown", "");
            io.unobserve(e.target);
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [pathname]);

  return null;
}
