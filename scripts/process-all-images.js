const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

const root = path.join(__dirname, "..");
const publicDir = path.join(root, "public");
const imagesDir = path.join(publicDir, "images");
const brandingDir = path.join(publicDir, "branding");

// Target directories
const targetDirs = [
  path.join(imagesDir, "casabay"),
  path.join(imagesDir, "fishtown"),
  path.join(imagesDir, "town-hall"),
  path.join(imagesDir, "board-room"),
  path.join(imagesDir, "rooms"),
  path.join(imagesDir, "location"),
  brandingDir,
];

for (const d of targetDirs) {
  if (!fs.existsSync(d)) {
    fs.mkdirSync(d, { recursive: true });
  }
}

// Map of conversions: [sourceRelativePath, targetRelativePath, maxWidth]
const conversions = [
  // --- CasaBay (10 Authentic Photos) ---
  ["images/casabay/CASA 1.png", "images/casabay/casa-hero.webp", 1920],
  ["images/casabay/CASA 2.png", "images/casabay/casa-bar.webp", 1920],
  ["images/casabay/CASA 3.png", "images/casabay/casa-cocktail-deck.webp", 1920],
  ["images/casabay/CASA 4.png", "images/casabay/casa-ambience-2.webp", 1920],
  ["images/casabay/CASA 5.png", "images/casabay/casa-night-view.webp", 1920],
  ["images/casabay/CASA 6.png", "images/casabay/casa-terrace.webp", 1920],
  ["images/casabay/CASA 7.png", "images/casabay/casa-ambience-1.webp", 1920],
  ["images/casabay/CASA 8.png", "images/casabay/casa-ambience-3.webp", 1920],
  ["images/casabay/CASA 9.png", "images/casabay/casa-sunset.webp", 1920],
  ["images/casabay/CASA 10.png", "images/casabay/casa-cabana.webp", 1920],

  // --- Fish Town (8 Authentic Photos) ---
  ["images/RESTAURANT/REST 1 RE.png", "images/fishtown/restaurant-hero.webp", 1920],
  ["images/RESTAURANT/REST 2 RE.png", "images/fishtown/restaurant-2.webp", 1920],
  ["images/RESTAURANT/REST 3 RE.png", "images/fishtown/restaurant-3.webp", 1920],
  ["images/RESTAURANT/REST 4 RE.png", "images/fishtown/restaurant-4.webp", 1920],
  ["images/RESTAURANT/REST 5 RE.png", "images/fishtown/restaurant-intimate.webp", 1920],
  ["images/RESTAURANT/REST 6 RE.png", "images/fishtown/restaurant-wide.webp", 1920],
  ["images/RESTAURANT/REST 7 RE.png", "images/fishtown/restaurant-buffet.webp", 1920],
  ["images/RESTAURANT/REST 8 RE.png", "images/fishtown/restaurant-wave-wall.webp", 1920],

  // --- Town Hall Banquet (6 Authentic Photos) ---
  ["images/BANQUET HALL/BANQ 1 RE.png", "images/town-hall/hall-hero.webp", 1920],
  ["images/BANQUET HALL/BANQ 2 RE.png", "images/town-hall/hall-stage.webp", 1920],
  ["images/BANQUET HALL/BANQ 3 RE.png", "images/town-hall/hall-2.webp", 1920],
  ["images/BANQUET HALL/BANQ 4 RE.png", "images/town-hall/hall-lighting.webp", 1920],
  ["images/BANQUET HALL/BANQ 5 RE.png", "images/town-hall/hall-wide.webp", 1920],
  ["images/BANQUET HALL/BANQ 6 RE.png", "images/town-hall/hall-events.webp", 1920],

  // --- The Board Room (5 Authentic Photos) ---
  ["images/BOARD ROOM/CONF 1 RE.png", "images/board-room/boardroom-hero.webp", 1920],
  ["images/BOARD ROOM/CONF 2 RE.png", "images/board-room/boardroom-2.webp", 1920],
  ["images/BOARD ROOM/CONF 3 RE.png", "images/board-room/boardroom-angle.webp", 1920],
  ["images/BOARD ROOM/CONF 4 RE.png", "images/board-room/boardroom-focus.webp", 1920],
  ["images/BOARD ROOM/CONF 5 RE.png", "images/board-room/boardroom-seating.webp", 1920],

  // --- Rooms (11 Authentic Photos) ---
  ["images/rooms/ROOM 1/RO1.png", "images/rooms/room-hero.webp", 1920],
  ["images/rooms/ROOM 1/RO2.png", "images/rooms/room-1-bed.webp", 1920],
  ["images/rooms/ROOM 1/RO4.png", "images/rooms/room-1-desk.webp", 1920],
  ["images/rooms/ROOM 1/RO5.png", "images/rooms/room-1-detail.webp", 1920],
  ["images/rooms/ROOM 2/RO1.png", "images/rooms/room-2.webp", 1920],
  ["images/rooms/ROOM 2/RO2.png", "images/rooms/room-2-bed.webp", 1920],
  ["images/rooms/ROOM 2/RO3.png", "images/rooms/room-2-lounge.webp", 1920],
  ["images/rooms/ROOM 2/RO4.png", "images/rooms/room-2-angle.webp", 1920],
  ["images/Lux03.png", "images/rooms/lux-03.webp", 1920],
  ["images/Lux05.png", "images/rooms/lux-05.webp", 1920],
  ["images/Lux08.png", "images/rooms/lux-08.webp", 1920],

  // --- Location, Reception & Lobby (7 Authentic Photos) ---
  ["images/Facade.png", "images/location/facade.webp", 1920],
  ["images/RECEPTION/RECEP 1.png", "images/location/reception-1.webp", 1920],
  ["images/RECEPTION/RECEP 2.png", "images/location/reception-2.webp", 1920],
  ["images/RECEPTION/RECEP 3.png", "images/location/reception-entrance.webp", 1920],
  ["images/RECEPTION/RECEP 4.png", "images/location/reception-counter.webp", 1920],
  ["images/RECEPTION/RECEP 5.png", "images/location/reception-interior.webp", 1920],
  ["images/RECEPTION/RECEP 6.png", "images/location/reception-perspective.webp", 1920],

  // --- Branding Logos (5 Vectors/Logos) ---
  ["images/Chettungal Logo Light.png", "branding/chettungal-logo-light.webp", 1536],
  ["images/Chettungal Logo Dark.png", "branding/chettungal-logo-dark.webp", 1536],
  ["images/Chettungal Logo.png", "branding/chettungal-logo.webp", 1536],
  ["images/Fish Town Logo.png", "branding/fishtown-logo.webp", 1536],
  ["images/CasaBay_logo_print_master_6000px_300dpi.png", "branding/casabay-logo.webp", 2400],
];

async function run() {
  console.log(`Starting conversion of ${conversions.length} authentic Chettungal assets...`);
  
  for (const [srcRel, destRel, maxW] of conversions) {
    const srcPath = path.join(publicDir, srcRel);
    const destPath = path.join(publicDir, destRel);
    
    if (!fs.existsSync(srcPath)) {
      console.error(`MISSING SOURCE: ${srcPath}`);
      continue;
    }

    try {
      const img = sharp(srcPath);
      const meta = await img.metadata();
      
      let pipeline = sharp(srcPath);
      if (meta.width > maxW) {
        pipeline = pipeline.resize({ width: maxW, withoutEnlargement: true });
      }

      await pipeline
        .webp({ quality: 85, effort: 6 })
        .toFile(destPath);

      const inStat = fs.statSync(srcPath);
      const outStat = fs.statSync(destPath);
      console.log(`✓ ${destRel}: ${(inStat.size/1024).toFixed(0)}KB -> ${(outStat.size/1024).toFixed(0)}KB (${((1 - outStat.size/inStat.size)*100).toFixed(0)}% saved)`);
    } catch (err) {
      console.error(`ERROR converting ${srcRel} to ${destRel}: ${err.message}`);
    }
  }

  console.log("\nConversion completed successfully!");
}

run();
