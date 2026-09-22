import os
import base64
from io import BytesIO
from PIL import Image

base = r"C:\Users\Thoma\.gemini\antigravity\scratch\hotel-chettungal\public\images"
out_html = r"C:\Users\Thoma\.gemini\antigravity\scratch\hotel-chettungal\scripts\catalog.html"

all_files = []
for root, dirs, fnames in os.walk(base):
    for f in fnames:
        if f.lower().endswith(('.png', '.jpg', '.jpeg', '.webp')):
            all_files.append(os.path.join(root, f))

all_files.sort()

cards = []
for p in all_files:
    rel = os.path.relpath(p, base)
    size_kb = os.path.getsize(p) / 1024
    try:
        with Image.open(p) as img:
            w, h = img.size
            # Create a thumbnail
            thumb = img.copy()
            thumb.thumbnail((300, 200))
            buf = BytesIO()
            thumb.convert('RGB').save(buf, format='JPEG', quality=70)
            b64 = base64.b64encode(buf.getvalue()).decode('utf-8')
            
            cards.append(f"""
            <div style="border: 1px solid #333; background: #1a1a1a; color: #eee; padding: 10px; border-radius: 8px; width: 310px; font-family: monospace; font-size: 12px;">
              <img src="data:image/jpeg;base64,{b64}" style="width: 100%; height: 180px; object-fit: cover; border-radius: 4px;" />
              <div style="margin-top: 8px; font-weight: bold; word-break: break-all; color: #d4af37;">{rel}</div>
              <div style="color: #aaa;">{w}x{h} | {size_kb:.1f} KB</div>
            </div>
            """)
    except Exception as e:
        print(f"Error {p}: {e}")

html_content = f"""
<!DOCTYPE html>
<html>
<head>
  <title>Chettungal Image Catalog</title>
</head>
<body style="background: #0a0d12; color: #fff; padding: 20px;">
  <h1 style="color: #d4af37; font-family: sans-serif;">Hotel Chettungal Images Review ({len(all_files)} total)</h1>
  <div style="display: flex; flex-wrap: wrap; gap: 16px;">
    {''.join(cards)}
  </div>
</body>
</html>
"""

with open(out_html, "w", encoding="utf-8") as f:
    f.write(html_content)

print(f"Generated catalog with {len(cards)} items at {out_html}")
