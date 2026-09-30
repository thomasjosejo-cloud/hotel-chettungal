import type { MetadataRoute } from "next";
import { PAGE_UPDATED, SITE } from "@/content/site";

/**
 * Fixed per-page dates, not the build date: `new Date()` told search engines
 * all eight pages had changed on every deploy, which makes lastModified
 * worthless as a signal.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const page = (path: string, changeFrequency: "weekly" | "monthly", priority: number) => ({
    url: path === "/" ? SITE.url : `${SITE.url}${path}`,
    lastModified: PAGE_UPDATED[path],
    changeFrequency,
    priority,
  });

  return [
    page("/", "weekly", 1.0),
    page("/casabay", "weekly", 0.9),
    page("/fishtown", "weekly", 0.85),
    page("/town-hall", "monthly", 0.8),
    page("/board-room", "monthly", 0.75),
    page("/rooms", "weekly", 0.8),
    page("/about", "monthly", 0.7),
    page("/enquire", "monthly", 0.8),
  ];
}
