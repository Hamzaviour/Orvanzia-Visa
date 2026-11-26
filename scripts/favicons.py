from PIL import Image, ImageDraw
import sys
w = Image.open("brand/logo-white.png")
W, H = w.size
em = w.crop((0, int(H*0.18), int(W*0.322), H))
em = em.crop(em.getchannel("A").point(lambda v: 255 if v > 30 else 0).getbbox())
def icon(size, pad=0.12, radius=0.22):
    im = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    d = ImageDraw.Draw(im)
    d.rounded_rectangle((0, 0, size-1, size-1), radius=int(size*radius), fill=(12, 31, 92, 255))
    inner = int(size*(1-2*pad))
    e = em.copy(); e.thumbnail((inner, inner), Image.LANCZOS)
    im.alpha_composite(e, ((size-e.width)//2, (size-e.height)//2))
    return im
big = icon(1024); big.save("brand/icon-1024.png")
for s, name in [(16,"favicon-16x16.png"),(32,"favicon-32x32.png"),(180,"apple-touch-icon.png"),(192,"icon-192.png"),(512,"icon-512.png")]:
    icon(s, radius=0 if s==180 else 0.22).save(f"public/{name}") if s==180 else icon(s).save(f"public/{name}")
icon(256).save("src/app/favicon.ico", sizes=[(16,16),(32,32),(48,48),(64,64),(128,128),(256,256)])
icon(512).save("src/app/icon.png")
icon(180, radius=0).save("src/app/apple-icon.png")
# OG image
og = Image.new("RGBA", (1200, 630), (12, 31, 92, 255))
l = w.copy(); l.thumbnail((900, 420), Image.LANCZOS)
og.alpha_composite(l, ((1200-l.width)//2, (630-l.height)//2))
og.convert("RGB").save("src/app/opengraph-image.jpg", quality=90)
import shutil
for f in ["logo.png","logo-hd.png","logo-white.png"]:
    shutil.copy(f"brand/{f}", f"public/{f}")
print("ok", em.size)
