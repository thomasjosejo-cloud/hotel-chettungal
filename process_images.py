import os
from PIL import Image

BASE_DIR = r"C:\Users\Thoma\.gemini\antigravity\scratch\hotel-chettungal\public"
SRC_IMAGES = os.path.join(BASE_DIR, "images")
BRANDING_DIR = os.path.join(BASE_DIR, "branding")

MAPPINGS = {
    # Branding
    os.path.join(SRC_IMAGES, "CasaBay_logo_print_master_6000px_300dpi.png"): os.path.join(BRANDING_DIR, "casabay-logo.webp"),
    os.path.join(SRC_IMAGES, "Chettungal Logo Light.png"): os.path.join(BRANDING_DIR, "chettungal-logo-light.webp"),
    os.path.join(SRC_IMAGES, "Chettungal Logo Dark.png"): os.path.join(BRANDING_DIR, "chettungal-logo-dark.webp"),
    os.path.join(SRC_IMAGES, "Chettungal Logo.png"): os.path.join(BRANDING_DIR, "chettungal-logo.webp"),
    os.path.join(SRC_IMAGES, "Fish Town Logo.png"): os.path.join(BRANDING_DIR, "fishtown-logo.webp"),
    
    # CasaBay
    os.path.join(SRC_IMAGES, "CASA 1.png"): os.path.join(SRC_IMAGES, "casabay", "casa-hero.webp"),
    os.path.join(SRC_IMAGES, "CASA 3.png"): os.path.join(SRC_IMAGES, "casabay", "casa-ambience-1.webp"),
    os.path.join(SRC_IMAGES, "CASA 4.png"): os.path.join(SRC_IMAGES, "casabay", "casa-ambience-2.webp"),
    
    # Fish Town
    os.path.join(SRC_IMAGES, "Restaurant 1.png"): os.path.join(SRC_IMAGES, "fishtown", "restaurant-hero.webp"),
    os.path.join(SRC_IMAGES, "Restaurant 2.png"): os.path.join(SRC_IMAGES, "fishtown", "restaurant-2.webp"),
    os.path.join(SRC_IMAGES, "Restaurant 3.png"): os.path.join(SRC_IMAGES, "fishtown", "restaurant-3.webp"),
    os.path.join(SRC_IMAGES, "Restaurant 4.png"): os.path.join(SRC_IMAGES, "fishtown", "restaurant-4.webp"),
    
    # Town Hall
    os.path.join(SRC_IMAGES, "HALL 1.png"): os.path.join(SRC_IMAGES, "town-hall", "hall-hero.webp"),
    os.path.join(SRC_IMAGES, "HALL 2.png"): os.path.join(SRC_IMAGES, "town-hall", "hall-2.webp"),
    
    # Board Room
    os.path.join(SRC_IMAGES, "CONF 1.png"): os.path.join(SRC_IMAGES, "board-room", "boardroom-hero.webp"),
    os.path.join(SRC_IMAGES, "CONF 2.png"): os.path.join(SRC_IMAGES, "board-room", "boardroom-2.webp"),
    
    # Rooms
    os.path.join(SRC_IMAGES, "ROOM 1.png"): os.path.join(SRC_IMAGES, "rooms", "room-hero.webp"),
    os.path.join(SRC_IMAGES, "ROOM 1(2).png"): os.path.join(SRC_IMAGES, "rooms", "room-1-alt.webp"),
    os.path.join(SRC_IMAGES, "ROOM 2.png"): os.path.join(SRC_IMAGES, "rooms", "room-2.webp"),
    os.path.join(SRC_IMAGES, "ROOM 2 (2).png"): os.path.join(SRC_IMAGES, "rooms", "room-2-alt.webp"),
    os.path.join(SRC_IMAGES, "Lux03.png"): os.path.join(SRC_IMAGES, "rooms", "lux-03.webp"),
    os.path.join(SRC_IMAGES, "Lux05.png"): os.path.join(SRC_IMAGES, "rooms", "lux-05.webp"),
    os.path.join(SRC_IMAGES, "Lux08.png"): os.path.join(SRC_IMAGES, "rooms", "lux-08.webp"),
    
    # Location & Reception
    os.path.join(SRC_IMAGES, "Facade.png"): os.path.join(SRC_IMAGES, "location", "facade.webp"),
    os.path.join(SRC_IMAGES, "RECEPTION 1.png"): os.path.join(SRC_IMAGES, "location", "reception-1.webp"),
    os.path.join(SRC_IMAGES, "RECEPTION 2.png"): os.path.join(SRC_IMAGES, "location", "reception-2.webp"),
}

# Also convert the existing jpgs in subdirectories to webp for uniform speed
subdirs = ["casabay", "fishtown", "town-hall", "board-room", "rooms", "location"]
for sd in subdirs:
    d = os.path.join(SRC_IMAGES, sd)
    if os.path.exists(d):
        for f in os.listdir(d):
            if f.endswith(".jpg") or f.endswith(".jpeg"):
                src = os.path.join(d, f)
                dst = os.path.join(d, os.path.splitext(f)[0] + ".webp")
                if src not in MAPPINGS:
                    MAPPINGS[src] = dst

print(f"Total mappings to process: {len(MAPPINGS)}")

for src, dst in MAPPINGS.items():
    if not os.path.exists(src):
        print(f"Skipping missing: {src}")
        continue
    os.makedirs(os.path.dirname(dst), exist_ok=True)
    try:
        with Image.open(src) as im:
            # Check if RGBA
            if im.mode == "RGBA":
                # For high-res logos (e.g. 6000px), resize slightly for optimal web delivery while keeping crisp 2400px max width
                if im.size[0] > 2400:
                    ratio = 2400.0 / im.size[0]
                    new_size = (2400, int(im.size[1] * ratio))
                    im = im.resize(new_size, Image.Resampling.LANCZOS)
                im.save(dst, "WEBP", lossless=True, quality=95, method=6)
            else:
                # Photos
                im = im.convert("RGB")
                im.save(dst, "WEBP", quality=90, method=6)
            src_sz = os.path.getsize(src) / 1024
            dst_sz = os.path.getsize(dst) / 1024
            print(f"Converted {os.path.basename(src)} ({src_sz:.1f} KB) -> {os.path.basename(dst)} ({dst_sz:.1f} KB)")
    except Exception as e:
        print(f"Error converting {src}: {e}")

print("All WebP conversions completed successfully!")
