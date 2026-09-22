const fs = require("fs");
const path = require("path");

const publicDir = path.join(__dirname, "..", "public");
const imagesDir = path.join(publicDir, "images");

// Files to delete explicitly (Quality, WhatsApp duplicates, stock placeholders)
const filesToDelete = [
  // Quality / stock jpgs
  "images/board-room/detail-av.jpg",
  "images/board-room/hero-boardroom.jpg",
  "images/casabay/drinks-01.jpg",
  "images/casabay/drinks-02.jpg",
  "images/casabay/drinks-03.jpg",
  "images/casabay/emerald-texture-bg.jpg",
  "images/casabay/hero-dusk.jpg",
  "images/fishtown/dish-01.jpg",
  "images/fishtown/dish-02.jpg",
  "images/fishtown/dish-03.jpg",
  "images/fishtown/hero-interior.jpg",
  "images/location/exterior.jpg",
  "images/rooms/executive-bar.jpg",
  "images/rooms/room-detail.jpg",
  "images/rooms/room-hero.jpg",
  "images/town-hall/hero-banquet.jpg",
  "images/town-hall/past-event-01.jpg",
  "images/town-hall/theatre-layout.jpg",

  // Quality / stock webps generated from those jpgs
  "images/board-room/detail-av.webp",
  "images/board-room/hero-boardroom.webp",
  "images/casabay/drinks-01.webp",
  "images/casabay/drinks-02.webp",
  "images/casabay/drinks-03.webp",
  "images/casabay/emerald-texture-bg.webp",
  "images/casabay/hero-dusk.webp",
  "images/fishtown/dish-01.webp",
  "images/fishtown/dish-02.webp",
  "images/fishtown/dish-03.webp",
  "images/fishtown/hero-interior.webp",
  "images/location/exterior.webp",
  "images/rooms/executive-bar.webp",
  "images/rooms/room-detail.webp",
  "images/rooms/room-hero.jpg",
  "images/town-hall/hero-banquet.webp",
  "images/town-hall/past-event-01.webp",
  "images/town-hall/theatre-layout.webp",

  // WhatsApp duplicates
  "images/WhatsApp Image 2026-09-18 at 5.58.36 PM.jpeg",
  "images/WhatsApp Image 2026-09-18 at 5.58.37 PM (1).jpeg",
  "images/WhatsApp Image 2026-09-18 at 5.58.37 PM.jpeg",
  "images/WhatsApp Image 2026-09-18 at 5.58.38 PM.jpeg",
  "images/WhatsApp Image 2026-09-18 at 5.58.39 PM.jpeg",
  "images/WhatsApp Image 2026-09-18 at 5.58.40 PM.jpeg",

  // Loose root raw pngs (now safely converted to webp in subfolders & branding)
  "images/CASA 1.png",
  "images/CASA 3.png",
  "images/CASA 4.png",
  "images/CONF 1.png",
  "images/CONF 2.png",
  "images/HALL 1.png",
  "images/HALL 2.png",
  "images/Restaurant 1.png",
  "images/Restaurant 2.png",
  "images/Restaurant 3.png",
  "images/Restaurant 4.png",
  "images/RECEPTION 1.png",
  "images/RECEPTION 2.png",
  "images/ROOM 1.png",
  "images/ROOM 1(2).png",
  "images/ROOM 2.png",
  "images/ROOM 2 (2).png",
  "images/Facade.png",
  "images/Lux03.png",
  "images/Lux05.png",
  "images/Lux08.png",
  "images/Chettungal Logo Light.png",
  "images/Chettungal Logo Dark.png",
  "images/Chettungal Logo.png",
  "images/Fish Town Logo.png",
  "images/CasaBay_logo_print_master_6000px_300dpi.png",
];

// In casabay, delete raw CASA 1.png to CASA 10.png (now converted to webp)
for (let i = 1; i <= 10; i++) {
  filesToDelete.push(`images/casabay/CASA ${i}.png`);
}

// Folders to remove (now converted into webp in organized folders)
const dirsToDelete = [
  "images/BANQUET HALL",
  "images/BOARD ROOM",
  "images/RECEPTION",
  "images/RESTAURANT",
  "images/rooms/ROOM 1",
  "images/rooms/ROOM 2",
];

console.log("=== EXECUTING CLEANUP ===");

let deletedFiles = 0;
for (const rel of filesToDelete) {
  const p = path.join(publicDir, rel);
  if (fs.existsSync(p)) {
    fs.unlinkSync(p);
    deletedFiles++;
    console.log(`Deleted file: ${rel}`);
  }
}

let deletedDirs = 0;
for (const rel of dirsToDelete) {
  const p = path.join(publicDir, rel);
  if (fs.existsSync(p)) {
    fs.rmSync(p, { recursive: true, force: true });
    deletedDirs++;
    console.log(`Deleted folder: ${rel}`);
  }
}

console.log(`Cleanup complete: ${deletedFiles} files and ${deletedDirs} folders deleted.`);
