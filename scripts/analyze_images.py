import os
from PIL import Image

base = r"C:\Users\Thoma\.gemini\antigravity\scratch\hotel-chettungal\public\images"

files = []
for root, dirs, fnames in os.walk(base):
    for f in fnames:
        if f.lower().endswith(('.png', '.jpg', '.jpeg', '.webp')):
            files.append(os.path.join(root, f))

print(f"Total image files found: {len(files)}")

# Group by folder
folders = {}
for f in files:
    rel = os.path.relpath(f, base)
    parent = os.path.dirname(rel) or "ROOT"
    folders.setdefault(parent, []).append((rel, f))

for parent, flist in sorted(folders.items()):
    print(f"\n--- FOLDER: {parent} ({len(flist)} files) ---")
    for rel, f in flist:
        size_kb = os.path.getsize(f) / 1024
        try:
            with Image.open(f) as img:
                w, h = img.size
                mode = img.mode
                print(f"  {os.path.basename(f)} | {w}x{h} | {mode} | {size_kb:.1f} KB")
        except Exception as e:
            print(f"  {os.path.basename(f)} | ERROR: {e}")
