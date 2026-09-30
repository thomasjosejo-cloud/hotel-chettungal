"use client";

import { useEffect } from "react";
import { sendGAEvent } from "@next/third-parties/google";

/**
 * One document-level listener for every contact link on the site.
 *
 * There are around thirty-nine WhatsApp, phone and email links across thirteen
 * files; delegating from the document means none of them has to know about
 * analytics. Fires GA4 events for the site's only conversions. sendGAEvent is
 * a no-op when GA is not loaded, which is every preview and every local run.
 */
export default function TrackClicks() {
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const a = (e.target as Element | null)?.closest?.("a[href]") as HTMLAnchorElement | null;
      if (!a) return;
      const href = a.getAttribute("href") ?? "";
      const event = href.includes("wa.me/")
        ? "whatsapp_click"
        : href.startsWith("tel:")
          ? "call_click"
          : href.startsWith("mailto:")
            ? "email_click"
            : null;
      if (!event) return;
      sendGAEvent("event", event, {
        link_text: (a.textContent ?? "").trim().slice(0, 100),
        page_path: window.location.pathname,
      });
    };
    document.addEventListener("click", onClick, { capture: true });
    return () => document.removeEventListener("click", onClick, { capture: true });
  }, []);
  return null;
}
