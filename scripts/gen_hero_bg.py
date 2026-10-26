"""
Generate a soft, blurred "garden bokeh" background photo for the GoJelantah
hero section — referensi dari desain lama user (ViralForge): foto blur
hijau/bunga putih di belakang kartu mengambang. Karena domain foto stok
eksternal diblokir network-nya di sandbox ini (risiko link patah pas
deploy), background-nya digenerate sendiri secara prosedural (bukan AI
image generation, murni math + PIL) supaya 100% reliable & bisa langsung
diverifikasi di sini, dengan palet yang senada brand (hijau emerald + emas
amber) alih-alih warna acak.
"""
import numpy as np
from PIL import Image, ImageDraw, ImageFilter
import random

random.seed(7)
np.random.seed(7)

W, H = 2200, 1300


def make_bg(dark: bool, out_path: str):
    # 1) Base vertical gradient
    top = np.array([13, 48, 34] if dark else [52, 142, 98], dtype=np.float32)
    mid = np.array([22, 70, 48] if dark else [96, 188, 140], dtype=np.float32)
    bottom = np.array([9, 28, 20] if dark else [205, 236, 217], dtype=np.float32)

    ys = np.linspace(0, 1, H)
    # two-stop gradient via piecewise lerp (top->mid->bottom)
    grad = np.zeros((H, 3), dtype=np.float32)
    half = ys < 0.55
    t1 = np.clip(ys[half] / 0.55, 0, 1)[:, None]
    grad[half] = top[None, :] * (1 - t1) + mid[None, :] * t1
    t2 = np.clip((ys[~half] - 0.55) / 0.45, 0, 1)[:, None]
    grad[~half] = mid[None, :] * (1 - t2) + bottom[None, :] * t2

    base = np.tile(grad[:, None, :], (1, W, 1)).astype(np.uint8)
    img = Image.fromarray(base, mode="RGB")

    # 2) Bokeh layer — soft blurred circles simulating out-of-focus
    #    flowers/foliage, drawn on a separate RGBA layer then blurred.
    bokeh = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    draw = ImageDraw.Draw(bokeh)

    if dark:
        palette = [
            (16, 80, 54, 140), (12, 60, 42, 120), (34, 120, 80, 110),
            (180, 150, 70, 60), (10, 40, 30, 150),
        ]
    else:
        palette = [
            (255, 255, 255, 150), (255, 255, 255, 110),
            (236, 250, 240, 170), (210, 240, 220, 130),
            (255, 221, 150, 90), (120, 200, 150, 90),
            (40, 120, 80, 70),
        ]

    # Bigger soft "foliage" blobs first (darker greens), concentrated lower
    for _ in range(14):
        r = random.randint(120, 260)
        x = random.randint(-r // 2, W + r // 2)
        y = random.randint(int(H * 0.35), H + r // 2)
        color = random.choice(palette[-3:] if not dark else palette[:3])
        draw.ellipse([x - r, y - r, x + r, y + r], fill=color)

    # Flower-like bright bokeh circles, concentrated upper 60%
    for _ in range(46):
        r = random.randint(14, 70)
        x = random.randint(0, W)
        y = random.randint(0, int(H * 0.72))
        color = random.choice(palette)
        draw.ellipse([x - r, y - r, x + r, y + r], fill=color)

    bokeh = bokeh.filter(ImageFilter.GaussianBlur(radius=34))
    img = img.convert("RGBA")
    img = Image.alpha_composite(img, bokeh)

    # 3) Extra soft blur overall for a dreamy out-of-focus photo feel
    img = img.filter(ImageFilter.GaussianBlur(radius=6))

    # 4) Gentle vignette
    vignette = Image.new("L", (W, H), 0)
    vdraw = ImageDraw.Draw(vignette)
    vdraw.ellipse([-W * 0.25, -H * 0.3, W * 1.25, H * 1.25], fill=255)
    vignette = vignette.filter(ImageFilter.GaussianBlur(radius=220))
    vignette_rgba = Image.new("RGBA", (W, H), (0, 0, 0, 90 if dark else 40))
    img = Image.composite(img, Image.alpha_composite(img, vignette_rgba), vignette)

    img = img.convert("RGB")
    img.save(out_path, "JPEG", quality=84, optimize=True)
    print(out_path, img.size)


make_bg(False, "public/images/hero-bg.jpg")
make_bg(True, "public/images/hero-bg-dark.jpg")
