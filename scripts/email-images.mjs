/**
 * One-off: email-safe copies of five photos plus the crest, for an HTML email.
 *
 * Email clients can't be relied on to render WebP, so these are baseline JPEGs
 * (progressive, mozjpeg, metadata stripped) at fixed pixel sizes. Nothing here
 * touches the site's own images: it only reads from public/images and
 * public/branding, and only writes into public/email.
 *
 *   node scripts/email-images.mjs
 */
import { mkdir, stat } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const OUT_DIR = "public/email";
const QUALITY = 82;
/** Anything over this gets re-encoded at the lower quality. */
const MAX_BYTES = 150 * 1024;
const FALLBACK_QUALITY = 75;

/** [source, output, width, height] */
const PHOTOS = [
  ["public/images/rooms/room-hero.webp", "room-hero.jpg", 1104, 560],
  ["public/images/board-room/boardroom-hero.webp", "boardroom.jpg", 532, 360],
  ["public/images/town-hall/hall-lighting.webp", "town-hall.jpg", 532, 360],
  ["public/images/fishtown/restaurant-hero.webp", "fishtown.jpg", 532, 360],
  ["public/images/casabay/casa-cocktail-deck.webp", "casabay.jpg", 532, 360],
];

const CREST = ["public/branding/chettungal_crest_gold.png", "crest.png", 92, 92];

const kb = (bytes) => `${(bytes / 1024).toFixed(1)} KB`;

async function writePhoto([src, name, width, height]) {
  const out = path.join(OUT_DIR, name);
  const encode = (quality) =>
    sharp(src)
      // Smart crop: keep the most interesting part of the frame at these ratios.
      .resize({ width, height, fit: "cover", position: sharp.strategy.attention })
      .jpeg({ quality, mozjpeg: true, progressive: true })
      .toFile(out);

  let info = await encode(QUALITY);
  let quality = QUALITY;
  if (info.size > MAX_BYTES) {
    info = await encode(FALLBACK_QUALITY);
    quality = FALLBACK_QUALITY;
  }
  return { name, out, width: info.width, height: info.height, size: info.size, quality };
}

async function writeCrest([src, name, width, height]) {
  const out = path.join(OUT_DIR, name);
  // A crest must not be cropped, so it is fitted whole inside the square on a
  // transparent background rather than covered like the photos.
  const info = await sharp(src)
    .resize({ width, height, fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png({ compressionLevel: 9 })
    .toFile(out);
  return { name, out, width: info.width, height: info.height, size: info.size, quality: "-" };
}

await mkdir(OUT_DIR, { recursive: true });

const rows = [];
for (const photo of PHOTOS) rows.push(await writePhoto(photo));
rows.push(await writeCrest(CREST));

// sharp reports the size it wrote; confirm against the file on disk.
console.log(`${"file".padEnd(30)}${"dimensions".padEnd(14)}${"size".padEnd(11)}quality`);
console.log("-".repeat(64));
let over = 0;
for (const r of rows) {
  const onDisk = (await stat(r.out)).size;
  const flag = r.name.endsWith(".jpg") && onDisk > MAX_BYTES ? "  OVER 150 KB" : "";
  if (flag) over++;
  console.log(
    `${r.out.replace(`${OUT_DIR}/`, "").padEnd(30)}${`${r.width}x${r.height}`.padEnd(14)}${kb(onDisk).padEnd(11)}${r.quality}${flag}`,
  );
}
console.log("-".repeat(64));
console.log(over ? `${over} file(s) still over ${kb(MAX_BYTES)}` : `all JPEGs under ${kb(MAX_BYTES)}`);
