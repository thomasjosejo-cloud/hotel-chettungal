import os, re

code_dir = r"C:\Users\Thoma\.gemini\antigravity\scratch\hotel-chettungal"
img_pattern = re.compile(r"['\"](/(?:images|branding)/[^'\"]+)['\"]")

found = {}
for root, _, files in os.walk(code_dir):
    if any(x in root for x in ['node_modules', '.next', '.git', 'scripts']):
        continue
    for f in files:
        if f.endswith(('.tsx', '.ts', '.jsx', '.js', '.json', '.css')):
            p = os.path.join(root, f)
            with open(p, 'r', encoding='utf-8', errors='ignore') as fl:
                content = fl.read()
                matches = img_pattern.findall(content)
                if matches:
                    rel = os.path.relpath(p, code_dir)
                    for m in set(matches):
                        found.setdefault(m, []).append(rel)

print(f"Total distinct image references: {len(found)}")
for img, files in sorted(found.items()):
    print(f"\n{img}:")
    for fl in files:
        print(f"   -> {fl}")
