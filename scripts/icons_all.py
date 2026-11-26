# Full icon set from brand/icon-1024.png (rounded navy square with the emblem)
from PIL import Image, ImageDraw
import json
src = Image.open("brand/icon-1024.png").convert("RGBA")
def save(size, path, square=False):
    im = src
    if square:  # Apple / MS tiles look better without transparent rounded corners
        bg = Image.new("RGBA", src.size, (12, 31, 92, 255)); bg.alpha_composite(src); im = bg
    im.resize((size, size), Image.LANCZOS).save(path)
for s in [16, 32, 48, 64, 96, 128, 144, 152, 167, 180, 192, 256, 384, 512]:
    save(s, f"public/icons/icon-{s}.png", square=s in (144, 152, 167, 180))
save(180, "public/apple-touch-icon.png", square=True)
save(150, "public/icons/mstile-150.png", square=True)
# maskable: emblem inside the 80% safe zone on a full-bleed navy square
m = Image.new("RGBA", (512, 512), (12, 31, 92, 255))
inner = src.resize((360, 360), Image.LANCZOS); m.alpha_composite(inner, (76, 76)); m.save("public/icons/maskable-512.png")
m.resize((192, 192), Image.LANCZOS).save("public/icons/maskable-192.png")
src.resize((256, 256)).save("src/app/favicon.ico", sizes=[(16, 16), (32, 32), (48, 48), (64, 64), (128, 128), (256, 256)])
manifest = {
    "name": "Orvanzia Visa",
    "short_name": "Orvanzia",
    "description": "Visa assistance for travellers in the UK – 196 destinations.",
    "start_url": "/",
    "scope": "/",
    "display": "standalone",
    "theme_color": "#0c1f5c",
    "background_color": "#ffffff",
    "lang": "en-GB",
    "icons": [{"src": f"/icons/icon-{s}.png", "sizes": f"{s}x{s}", "type": "image/png", "purpose": "any"} for s in [48, 72 if False else 96, 128, 144, 152, 192, 256, 384, 512]]
    + [{"src": "/icons/maskable-192.png", "sizes": "192x192", "type": "image/png", "purpose": "maskable"},
       {"src": "/icons/maskable-512.png", "sizes": "512x512", "type": "image/png", "purpose": "maskable"}],
}
json.dump(manifest, open("public/site.webmanifest", "w"), indent=2)
open("public/browserconfig.xml", "w").write('<?xml version="1.0" encoding="utf-8"?>\n<browserconfig><msapplication><tile><square150x150logo src="/icons/mstile-150.png"/><TileColor>#0c1f5c</TileColor></tile></msapplication></browserconfig>\n')
print("ok")
