import { PHOTOS, type Photo } from "@/content/site";

/** A photo from a PHOTOS list by its file name, so the alt text comes with it. */
export function byFile(list: readonly Photo[], name: string): Photo {
  const p = list.find((x) => x.src.endsWith(`/${name}.webp`));
  if (!p) throw new Error(`No photo "${name}" in PHOTOS`);
  return p;
}

/**
 * One frame per chapter, holding that chapter's photos in turn. Chosen by the
 * owner; exactly these, in this order. The first of each is the static-fallback
 * image and the first texture loaded.
 */
export const CHAPTER_SETS: Photo[][] = [
  ["restaurant-hero", "restaurant-intimate", "restaurant-wave-wall"].map((f) => byFile(PHOTOS.fishtown, f)),
  ["hall-lighting", "hall-2", "hall-events"].map((f) => byFile(PHOTOS.townhall, f)),
  ["boardroom-hero", "boardroom-seating", "boardroom-angle"].map((f) => byFile(PHOTOS.boardroom, f)),
  ["casa-cocktail-deck", "casa-ambience-1", "casa-night-view"].map((f) => byFile(PHOTOS.casabay, f)),
];

/** The Rooms closing section's slideshow (HTML, not WebGL). */
export const ROOMS_SET: Photo[] = ["room-hero", "room-2-lounge", "lux-03"].map((f) => byFile(PHOTOS.rooms, f));

export const CHAPTER_NAMES = ["Fish Town", "Town Hall", "The Board Room", "CasaBay"];
