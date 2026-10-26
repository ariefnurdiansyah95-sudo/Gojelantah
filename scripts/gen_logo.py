"""
Generate logo mark / app-icon assets untuk GoJelantah — versi yang lebih
"jadi"/premium dibanding app/icon.png lama (yang dibuat buru-buru di Round
10 sekalian sama OG image). Dipakai buat PWA (manifest icons, apple-touch-
icon) + favicon/tab icon situs.

Kenapa digenerate sendiri (PIL, prosedural) bukan didesain di tool desain
beneran atau di-hotlink: sama alasannya kayak script gen_* lain di proyek
ini — environment build/sandbox ini gak selalu punya akses network ke
CDN/font eksternal, jadi pendekatan yang 100% reliable & bisa langsung
diverifikasi render-nya di sini.

Teknik: semua di-render di kanvas 4x lebih besar ("supersampling") lalu
di-downscale pakai filter LANCZOS — ini yang bikin tepian lingkaran/sudut
membulat jadi halus (anti-aliased), bukan bergerigi kayak kalau digambar
langsung di resolusi final. Trik yang sama dipakai gen_oil_images.py.

Output:
- app/icon.png                        512x512, rounded square — favicon/tab icon (Next.js App Router convention)
- app/apple-icon.png                  180x180, FULL SQUARE tanpa rounding/transparency — iOS nerapin mask bulat-sudutnya sendiri, jadi source-nya harus opaque penuh sampai tepi
- public/icons/icon-192.png           192x192, rounded square — manifest icon "any" (ukuran kecil, buat app drawer dll)
- public/icons/icon-512.png           512x512, rounded square — manifest icon "any" (ukuran besar, splash screen Android)
- public/icons/icon-maskable-512.png  512x512, full-bleed square, droplet diperkecil & digeser ke tengah supaya aman di-crop jadi bentuk apa pun (lingkaran/squircle/dll) oleh launcher Android — lihat "safe zone" di komentar gen_maskable()
"""
import numpy as np
from PIL import Image, ImageDraw, ImageFilter

SS = 4  # supersample factor — render 4x lebih besar, downscale pakai LANCZOS

# Palet sama kayak brand (--accent di globals.css), sedikit lebih jenuh/vivid
# dari versi di halaman web — ikon kecil butuh warna yang lebih "nendang"
# biar gak kelihatan pudar pas di-scale kecil (16-32px di tab browser).
TOP = (22, 190, 145)     # emerald cerah
BOTTOM = (4, 96, 78)     # teal gelap
WHITE = (255, 255, 255)


def diagonal_gradient(size, top, bottom):
    """Gradient diagonal (kiri-atas ke kanan-bawah) — lebih dinamis buat app
    icon dibanding gradient vertikal polos yang dipakai di background web."""
    w = h = size
    xs = np.linspace(0, 1, w)[None, :]
    ys = np.linspace(0, 1, h)[:, None]
    t = np.clip((xs * 0.5 + ys * 0.5), 0, 1)
    top_a = np.array(top, dtype=np.float32)
    bot_a = np.array(bottom, dtype=np.float32)
    grad = top_a[None, None, :] * (1 - t[:, :, None]) + bot_a[None, None, :] * t[:, :, None]
    return Image.fromarray(grad.astype(np.uint8), mode="RGB")


def rounded_mask(size, radius):
    m = Image.new("L", (size, size), 0)
    d = ImageDraw.Draw(m)
    d.rounded_rectangle([0, 0, size - 1, size - 1], radius=radius, fill=255)
    return m


def draw_droplet(canvas_rgba, cx, cy, r, fill=WHITE, shadow=True, highlight=True):
    """Satu droplet besar & tegas (lebih simpel dari versi lama yang punya 2
    droplet kecil — di ukuran favicon 16-32px, detail kecil cuma jadi noise,
    satu bentuk besar yang jelas jauh lebih legible)."""
    S = canvas_rgba.size[0]

    if shadow:
        # Shadow lembut di bawah droplet biar ada kedalaman (bukan flat polos)
        # Catatan penting: base layer-nya HARUS diisi warna yang SAMA kayak
        # shadow-nya sendiri (bukan (0,0,0,0) kosong) — GaussianBlur Pillow
        # di gambar RGBA itu nge-blur channel RGB & alpha SECARA TERPISAH
        # tanpa premultiply, jadi kalau base-nya warna beda (apalagi hitam
        # pekat) sementara alpha-nya 0, pas di-blur warnanya bisa "bocor"/
        # nge-bleed ke tepian shape yang alpha-nya masih tinggi — hasilnya
        # muncul halo/ring warna aneh yang gak diniatkan di tepi shape.
        shadow_layer = Image.new("RGBA", canvas_rgba.size, (0, 40, 28, 0))
        sd = ImageDraw.Draw(shadow_layer)
        sd.ellipse([cx - r * 1.05, cy - r * 0.75, cx + r * 1.05, cy + r * 1.25], fill=(0, 40, 28, 110))
        shadow_layer = shadow_layer.filter(ImageFilter.GaussianBlur(S * 0.03))
        canvas_rgba.alpha_composite(shadow_layer)

    draw = ImageDraw.Draw(canvas_rgba)
    draw.ellipse([cx - r, cy - r, cx + r, cy + r], fill=fill)
    tip_y = cy - r - r * 1.15
    draw.polygon(
        [(cx, tip_y), (cx - r * 0.92, cy - r * 0.18), (cx + r * 0.92, cy - r * 0.18)],
        fill=fill,
    )

    if highlight:
        # Sentuhan glossy — highlight oval tipis di kiri-atas droplet,
        # simulasi pantulan cahaya di permukaan air/minyak.
        # Base (255,255,255,0) — bukan (0,0,0,0) — biar blur gak nge-bleed
        # warna hitam ke tepi highlight (lihat catatan di shadow di atas).
        hl = Image.new("RGBA", canvas_rgba.size, (255, 255, 255, 0))
        hd = ImageDraw.Draw(hl)
        hd.ellipse(
            [cx - r * 0.5, cy - r * 0.55, cx + r * 0.05, cy - r * 0.05],
            fill=(255, 255, 255, 130),
        )
        hl = hl.filter(ImageFilter.GaussianBlur(S * 0.012))
        canvas_rgba.alpha_composite(hl)


def ambient_glow(canvas_rgba):
    """Glow lembut di kiri-atas kanvas — kesan "cahaya datang dari satu arah",
    bikin background gradient flat terasa lebih premium/dalam, bukan datar."""
    S = canvas_rgba.size[0]
    # Base (255,255,255,0), bukan (0,0,0,0) — alasan sama kayak draw_droplet()
    # di atas: hindari color-bleed hitam dari blur RGBA non-premultiplied.
    glow = Image.new("RGBA", canvas_rgba.size, (255, 255, 255, 0))
    gd = ImageDraw.Draw(glow)
    gd.ellipse([-S * 0.25, -S * 0.3, S * 0.65, S * 0.55], fill=(255, 255, 255, 40))
    glow = glow.filter(ImageFilter.GaussianBlur(S * 0.09))
    canvas_rgba.alpha_composite(glow)


def gen_rounded_icon(out_path, final_size, radius_pct=0.23, droplet_r_pct=0.185, cy_pct=0.56):
    S = final_size * SS
    bg = diagonal_gradient(S, TOP, BOTTOM).convert("RGBA")
    ambient_glow(bg)

    mask = rounded_mask(S, int(S * radius_pct))
    canvas = Image.new("RGBA", (S, S), (0, 0, 0, 0))
    canvas.paste(bg, (0, 0), mask)

    cx, cy, r = S * 0.5, S * cy_pct, S * droplet_r_pct
    draw_droplet(canvas, cx, cy, r)

    final = canvas.resize((final_size, final_size), Image.LANCZOS)
    final.save(out_path)
    print("saved", out_path, final.size)


def gen_apple_icon(out_path="app/apple-icon.png", final_size=180):
    """Apple-touch-icon: HARUS full square opaque tanpa rounding/alpha — iOS
    nerapin corner-mask + sedikit "shine" overlay-nya sendiri secara otomatis.
    Kalau kita kirim versi yang udah dibulatin sendiri, hasilnya malah dobel-
    mask / ada celah transparan di sudut yang kelihatan aneh di home screen."""
    S = final_size * SS
    bg = diagonal_gradient(S, TOP, BOTTOM).convert("RGBA")
    ambient_glow(bg)

    cx, cy, r = S * 0.5, S * 0.56, S * 0.185
    draw_droplet(bg, cx, cy, r)

    final = bg.convert("RGB").resize((final_size, final_size), Image.LANCZOS)
    final.save(out_path, quality=95)
    print("saved", out_path, final.size)


def gen_maskable(out_path="public/icons/icon-maskable-512.png", final_size=512):
    """Maskable icon buat Android adaptive-icon: launcher boleh nge-crop
    gambar ini jadi lingkaran/squircle/tetesan air/dll sesuai tema HP user.
    Spec resminya: konten penting harus muat di "safe zone" — lingkaran di
    tengah dengan diameter 80% dari sisi kanvas. Jadi full-bleed (background
    ngisi 100% kotak, TANPA rounded corner sendiri — biarin OS yang masking)
    dan droplet-nya digambar lebih kecil + persis di tengah, aman di dalam
    radius itu biar gak ada bagian penting yang ke-crop."""
    S = final_size * SS
    bg = diagonal_gradient(S, TOP, BOTTOM).convert("RGBA")
    ambient_glow(bg)

    cx, cy, r = S * 0.5, S * 0.5, S * 0.145  # lebih kecil & di-tengah persis = aman di safe zone 80%
    draw_droplet(bg, cx, cy, r)

    final = bg.convert("RGB").resize((final_size, final_size), Image.LANCZOS)
    final.save(out_path)
    print("saved", out_path, final.size)


if __name__ == "__main__":
    gen_rounded_icon("app/icon.png", 512)
    gen_rounded_icon("public/icons/icon-512.png", 512)
    gen_rounded_icon("public/icons/icon-192.png", 192)
    gen_apple_icon("app/apple-icon.png", 180)
    gen_maskable("public/icons/icon-maskable-512.png", 512)
