const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

const base = path.join(__dirname, "..", "public");

function getFiles(dir) {
  let res = [];
  for (const f of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, f.name);
    if (f.isDirectory()) res = res.concat(getFiles(full));
    else if (/\.(png|jpe?g|webp)$/i.test(f.name)) res.push(full);
  }
  return res;
}

const files = getFiles(base);
const hashMap = {};

for (const f of files) {
  const buf = fs.readFileSync(f);
  const hash = crypto.createHash("sha256").update(buf).digest("hex");
  if (!hashMap[hash]) hashMap[hash] = [];
  hashMap[hash].push(path.relative(base, f));
}

let dupCount = 0;
for (const [hash, flist] of Object.entries(hashMap)) {
  if (flist.length > 1) {
    dupCount++;
    console.log(`DUPLICATE GROUP ${dupCount}:`);
    flist.forEach(item => console.log("  " + item));
  }
}
console.log(`Total duplicate groups: ${dupCount}`);
