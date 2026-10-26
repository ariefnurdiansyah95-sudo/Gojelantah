"""
Generate branding/SEO images for GoJelantah — dipakai buat Open Graph
social-share image dan favicon/app icon. Digenerate sendiri secara
prosedural (PIL, bukan AI image generation / bukan hotlink) dengan alasan
yang sama kayak scripts/gen_hero_bg.py: domain font/gambar eksternal
diblokir network-nya di sandbox build ini, jadi pendekatan paling aman
yang 100% reliable dan bisa langsung diverifikasi di sini.

Output:
- public/images/og-image.jpg  (1200x630, dipakai openGraph.images & twitter card)
- app/icon.png                (512x512, favicon/app-icon convention Next.js App Router)
"""
import numpy as np
from PIL import Image, ImageDraw, ImageFilter, ImageFont

FONT_DIR = "/usr/share/fonts/truetype/dejavu/"
SANS_BOLD = FONT_DIR + "DejaVuSans-Bold.ttf"
SANS = FONT_DIR + "DejaVuSans.ttf"
SERIF_ITALIC = FONT_DIR + "DejaVuSerif-Italic.ttf"

ACCENT = (5, 150, 105)        # emerald-600-ish, sama kayak --accent brand
ACCENT_LIGHT = (52, 211, 153)  # emerald-400-ish
GOLD = (217, 160, 59)
DARK = (11, 31, 22)           # teks gelap di atas background terang
WHITE = (255, 255, 255)


def vertical_gradient(w, h, top, bottom):
    ys = np.linspace(0, 1, h)[:, None]
    top_a = np.array(top, dtype=np.float32)
    bot_a = np.array(bottom, dtype=np.float32)
    grad = top_a[None, :] * (1 - ys) + bot_a[None, :] * ys
    base = np.tile(grad[:, None, :], (1, w, 1)).astype(np.uint8)
    return Image.fromarray(base, mode="RGB")


def rounded_mask(size, radius):
    m = Image.new("L", size, 0)
    d = ImageDraw.Draw(m)
    d.rounded_rectangle([0, 0, size[0] - 1, size[1] - 1], radius=radius, fill=255)
    return m


def gen_icon(out_path="app/icon.png"):
    S = 512
    img = vertical_gradient(S, S, (16, 150, 110), (5, 110, 90)).convert("RGBA")
    mask = rounded_mask((S, S), radius=int(S * 0.24))
    rounded = Image.new("RGBA", (S, S), (0, 0, 0, 0))
    rounded.paste(img, (0, 0), mask)

    draw = ImageDraw.Draw(rounded)
    # Droplet besar di tengah — dibentuk dari lingkaran + segitiga lancip di
    # atas (klasik bentuk "water drop" ikon), simplifikasi dari ikon
    # `Droplets` (lucide-react) yang dipakai di navbar situs.
    cx, cy = S * 0.5, S * 0.56
    r = S * 0.195
    draw.ellipse([cx - r, cy - r, cx + r, cy + r], fill=WHITE)
    tip_y = cy - r - S * 0.22
    draw.polygon(
        [(cx, tip_y), (cx - r * 0.92, cy - r * 0.18), (cx + r * 0.92, cy - r * 0.18)],
        fill=WHITE,
    )
    # Droplet kecil di kanan-atas, pelengkap (ikon `Droplets` aslinya 2 tetes)
    cx2, cy2 = S * 0.72, S * 0.32
    r2 = S * 0.075
    draw.ellipse([cx2 - r2, cy2 - r2, cx2 + r2, cy2 + r2], fill=WHITE)
    tip_y2 = cy2 - r2 - S * 0.085
    draw.polygon(
        [(cx2, tip_y2), (cx2 - r2 * 0.92, cy2 - r2 * 0.18), (cx2 + r2 * 0.92, cy2 - r2 * 0.18)],
        fill=WHITE,
    )

    rounded.save(out_path)
    print("saved", out_path)


def gen_og_image(out_path="public/images/og-image.jpg"):
    W, H = 1200, 630
    img = vertical_gradient(W, H, (176, 226, 199), (134, 206, 166)).convert("RGB")

    # Ambient blur blobs — senada sama estetika hero (bg/globals.css),
    # biar OG image-nya "kerasa" sama kayak situsnya, bukan kartu generik.
    blobs = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    bd = ImageDraw.Draw(blobs)
    bd.ellipse([-120, -150, 480, 420], fill=(255, 255, 255, 70))
    bd.ellipse([760, -200, 1400, 380], fill=(217, 160, 59, 90))
    bd.ellipse([700, 300, 1300, 820], fill=(5, 150, 105, 60))
    blobs = blobs.filter(ImageFilter.GaussianBlur(70))
    img = Image.alpha_composite(img.convert("RGBA"), blobs).convert("RGB")

    draw = ImageDraw.Draw(img)

    # Logo mark (kotak rounded gradient + droplet) pojok kiri-atas, sama
    # konsepnya kayak navbar.
    logo_s = 72
    logo = Image.new("RGBA", (logo_s, logo_s), (0, 0, 0, 0))
    lg = vertical_gradient(logo_s, logo_s, (16, 150, 110), (5, 110, 90)).convert("RGBA")
    lmask = rounded_mask((logo_s, logo_s), radius=18)
    logo.paste(lg, (0, 0), lmask)
    ld = ImageDraw.Draw(logo)
    cx, cy, r = logo_s * 0.52, logo_s * 0.58, logo_s * 0.19
    ld.ellipse([cx - r, cy - r, cx + r, cy + r], fill=WHITE)
    tip_y = cy - r - logo_s * 0.24
    ld.polygon([(cx, tip_y), (cx - r * 0.9, cy - r * 0.15), (cx + r * 0.9, cy - r * 0.15)], fill=WHITE)
    img.paste(logo, (80, 70), logo)

    f_word = ImageFont.truetype(SANS_BOLD, 40)
    draw.text((168, 86), "GoJelantah", font=f_word, fill=DARK)

    # Headline utama — pola sama kayak H1 situs: sans bold + aksen serif
    # italic hijau, biar konsisten identitas visual.
    f_h1 = ImageFont.truetype(SANS_BOLD, 64)
    f_h1_italic = ImageFont.truetype(SERIF_ITALIC, 68)
    draw.text((80, 230), "Jemput Jelantah,", font=f_h1, fill=DARK)
    draw.text((80, 308), "Secepat Klik", font=f_h1_italic, fill=ACCENT)

    f_sub = ImageFont.truetype(SANS, 28)
    draw.text(
        (84, 400),
        "Jemput gratis • bayar tunai Rp 7.500/liter • se-Jabodetabek",
        font=f_sub,
        fill=(31, 61, 46),
    )

    # Chip-chip kecil ala stat row homepage.
    def chip(x, y, label, value):
        f_val = ImageFont.truetype(SANS_BOLD, 24)
        f_lab = ImageFont.truetype(SANS, 15)
        w_box, h_box = 190, 78
        card = Image.new("RGBA", (w_box, h_box), (0, 0, 0, 0))
        cd = ImageDraw.Draw(card)
        cd.rounded_rectangle([0, 0, w_box - 1, h_box - 1], radius=16, fill=(255, 255, 255, 215))
        cd.text((16, 14), value, font=f_val, fill=DARK)
        cd.text((16, 46), label, font=f_lab, fill=(90, 110, 100))
        img.paste(card, (x, y), card)

    chip(84, 470, "per liter, flat", "Rp 7.500")
    chip(290, 470, "jemput ke lokasi", "Gratis")
    chip(496, 470, "cakupan", "5 Kota")

    img.save(out_path, quality=92)
    print("saved", out_path)


if __name__ == "__main__":
    gen_icon()
    gen_og_image()
