const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

async function scan(dir, baseDir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      await scan(full, baseDir);
    } else if (/\.(png|jpg|jpeg|webp)$/i.test(entry.name)) {
      try {
        const meta = await sharp(full).metadata();
        const stat = fs.statSync(full);
        const rel = path.relative(baseDir, full);
        console.log(`${rel} | ${meta.width}x${meta.height} | ${(stat.size/1024).toFixed(1)}KB | ${meta.format}`);
      } catch (e) {
        console.log(`ERR: ${full} - ${e.message}`);
      }
    }
  }
}

const target = path.join(__dirname, "..", "public");
scan(target, target);
