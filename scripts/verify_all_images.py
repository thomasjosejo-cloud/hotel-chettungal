import os
import re

code_dir = '.'
images_dir = 'public'
missing_images = []
found_refs = 0

for root, dirs, files in os.walk(code_dir):
    if any(p in root for p in ['node_modules', '.next', '.git', 'scripts']):
        continue
    for f in files:
        if f.endswith(('.tsx', '.ts', '.jsx', '.js', '.css', '.html')):
            path = os.path.join(root, f)
            with open(path, 'r', encoding='utf-8', errors='ignore') as file:
                content = file.read()
                matches = re.findall(r'[\'\"`](/(?:images|branding)/[^\'\"`\s]+)[\'\"`]', content)
                for m in matches:
                    found_refs += 1
                    target = os.path.join(images_dir, m.lstrip('/'))
                    if not os.path.exists(target):
                        missing_images.append((path, m))

print(f"Total image references scanned: {found_refs}")
if missing_images:
    print(f"FAILED: Found {len(set(missing_images))} missing images:")
    for p, m in sorted(list(set(missing_images))):
        print(f"  {p} -> {m}")
else:
    print("SUCCESS: ALL image references exist on disk!")
