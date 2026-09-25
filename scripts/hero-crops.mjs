/**
 * Portrait phone crops for the PageHero posters.
 *
 * A phone shows a hero photo through `object-fit: cover` in a tall viewport, so
 * a 3:2 landscape source has about two thirds of its width thrown away and the
 * remaining strip stretched across the screen. Serving the landscape file to
 * phones therefore wastes most of the bytes on pixels nobody sees and still
 * arrives soft.
 *
 * These crops keep the source's full height and take a 3:4 slice around each
 * hero's focal point: a little wider than a phone's own aspect, so the parallax
 * drift and the WebGL layer's slight overscan never reach an edge.
 *
 * Note on the ceiling: with cover in a portrait viewport the HEIGHT binds the
 * scale, so the upscale factor is (device height in px) / (source height). The
 * crop width cannot improve it. At 1024px tall sources that is 2.16x on a
 * 390x844 phone at DPR 2.625 and 2.47x at DPR 3. Going below ~2.2x everywhere
 * needs originals about 1150px tall.
 *
 * Usage: node scripts/hero-crops.mjs
 */
import sharp from "sharp";
import { mkdir, readdir, stat } from "node:fs/promises";
import path from "node:path";

/** Every PageHero poster, with the horizontal focal point from its `position`. */
const HEROES = [
  { file: "location/reception-entrance", focusX: 0.5 }, // /about
  { file: "board-room/boardroom-seating", focusX: 0.5 }, // /board-room  (50% 65%)
  { file: "casabay/casa-cocktail-deck", focusX: 0.5 }, // /casabay     (50% 45%)
  { file: "location/facade", focusX: 0.5 }, // /enquire
  { file: "fishtown/restaurant-hero", focusX: 0.5 }, // /fishtown
  { file: "rooms/lux-05", focusX: 0.5 }, // /rooms
  { file: "town-hall/hall-hero", focusX: 0.5 }, // /town-hall
];

const ASPECT = 0.75; // 3:4 — wider than any phone, so the edges never show
const OUT_DIR = "public/images/hero-phone";
const SRC_DIR = "public/images";

await mkdir(OUT_DIR, { recursive: true });

for (const { file, focusX } of HEROES) {
  const src = path.join(SRC_DIR, `${file}.webp`);
  const name = path.basename(file);
  const out = path.join(OUT_DIR, `${name}.webp`);

  const img = sharp(src);
  const { width: sw, height: sh } = await img.metadata();

  // Full height, a 3:4 slice of the width, centred on the focal point.
  const cw = Math.min(sw, Math.round(sh * ASPECT));
  const left = Math.max(0, Math.min(sw - cw, Math.round(focusX * sw - cw / 2)));

  await sharp(src)
    .extract({ left, top: 0, width: cw, height: sh })
    .webp({ quality: 75, effort: 6 })
    .toFile(out);

  const { size } = await stat(out);
  const before = (await stat(src)).size;
  console.log(
    `${name.padEnd(22)} ${sw}x${sh} -> ${cw}x${sh}  ` +
      `${(before / 1024).toFixed(0)}KB -> ${(size / 1024).toFixed(0)}KB`,
  );
}

console.log(`\n${(await readdir(OUT_DIR)).length} crop(s) in ${OUT_DIR}`);
