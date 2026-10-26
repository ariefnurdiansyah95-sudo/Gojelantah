"""
Generate illustrated "photos" of jelantah (used cooking oil) jerry cans &
bottles — request user: "ada foto foto minyaknya juga". Foto asli dari
situs lain gak dipakai (selain masalah hak cipta, domain foto eksternal
juga diblokir network-nya di sandbox build ini — sama kayak kasus hero-bg
sebelumnya). Jadi dibikin ilustrasi sendiri (prosedural, PIL murni, bukan
AI image generation): jerigen & botol oli bergradasi, dengan highlight
kaca & shadow biar kerasa "fotografis", bukan ikon datar.
"""
from PIL import Image, ImageDraw, ImageFilter
import math

def rounded_rect(draw, box, radius, fill):
    draw.rounded_rectangle(box, radius=radius, fill=fill)


def vertical_gradient(size, top_color, bottom_color):
    w, h = size
    base = Image.new("RGB", (1, h), 0)
    px = base.load()
    for y in range(h):
        t = y / max(h - 1, 1)
        px[0, y] = tuple(int(top_color[i] * (1 - t) + bottom_color[i] * t) for i in range(3))
    return base.resize((w, h))


def make_jerrycan(out_path, bg=None, size=1400):
    W = H = size
    img = Image.new("RGBA", (W, H), (0, 0, 0, 0))

    # Soft shadow ellipse
    shadow = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    sd = ImageDraw.Draw(shadow)
    sd.ellipse([W * 0.18, H * 0.82, W * 0.82, H * 0.95], fill=(10, 30, 20, 140))
    shadow = shadow.filter(ImageFilter.GaussianBlur(28))
    img = Image.alpha_composite(img, shadow)

    body_left, body_right = W * 0.26, W * 0.78
    body_top, body_bottom = H * 0.28, H * 0.84

    # Body gradient (amber oil colour), rendered then masked to rounded shape
    grad = vertical_gradient((int(body_right - body_left), int(body_bottom - body_top)),
                              (247, 196, 83), (168, 108, 18)).convert("RGBA")
    mask = Image.new("L", grad.size, 0)
    md = ImageDraw.Draw(mask)
    md.rounded_rectangle([0, 0, grad.size[0], grad.size[1]], radius=int(grad.size[0] * 0.14), fill=255)
    body_layer = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    body_layer.paste(grad, (int(body_left), int(body_top)), mask)
    img = Image.alpha_composite(img, body_layer)

    draw = ImageDraw.Draw(img)

    # Shoulder taper to spout
    spout_w = (body_right - body_left) * 0.26
    spout_cx = body_left + (body_right - body_left) * 0.72
    draw.polygon(
        [
            (body_left + (body_right - body_left) * 0.18, body_top),
            (body_right - (body_right - body_left) * 0.1, body_top),
            (spout_cx + spout_w / 2, body_top - H * 0.07),
            (spout_cx - spout_w / 2, body_top - H * 0.07),
        ],
        fill=(221, 160, 60, 255),
    )
    # Spout neck + cap
    neck_box = [spout_cx - spout_w / 2, body_top - H * 0.12, spout_cx + spout_w / 2, body_top - H * 0.05]
    rounded_rect(draw, neck_box, radius=int(spout_w * 0.3), fill=(90, 130, 95, 255))
    cap_box = [spout_cx - spout_w * 0.62, body_top - H * 0.145, spout_cx + spout_w * 0.62, body_top - H * 0.085]
    rounded_rect(draw, cap_box, radius=int(spout_w * 0.3), fill=(42, 110, 70, 255))

    # Handle (ring), tucked behind the cap so it reads as attached to the
    # shoulder rather than floating separately
    handle_box = [body_left + (body_right - body_left) * 0.10, body_top - H * 0.155,
                  body_left + (body_right - body_left) * 0.46, body_top + H * 0.01]
    draw.ellipse(handle_box, outline=(168, 108, 18, 255), width=int(W * 0.026))

    # Brand label — plain rounded rect with accent stripe (no baked text,
    # keeps it generic/reusable and accessible text stays in HTML). Drawn
    # BEFORE the gloss layer so the glossy highlight sweeps over it too.
    label_box = [body_left + (body_right - body_left) * 0.16, body_top + (body_bottom - body_top) * 0.36,
                 body_right - (body_right - body_left) * 0.16, body_top + (body_bottom - body_top) * 0.64]
    rounded_rect(draw, label_box, radius=18, fill=(255, 251, 240, 235))
    stripe_h = (label_box[3] - label_box[1]) * 0.26
    draw.rounded_rectangle(
        [label_box[0], label_box[3] - stripe_h, label_box[2], label_box[3]],
        radius=10, fill=(5, 150, 105, 255),
    )

    # Glossy highlight streak on body
    gloss = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    gd = ImageDraw.Draw(gloss)
    gx = body_left + (body_right - body_left) * 0.22
    gd.polygon(
        [(gx, body_top + 10), (gx + (body_right - body_left) * 0.12, body_top + 10),
         (gx - (body_right - body_left) * 0.05, body_bottom - 10), (gx - (body_right - body_left) * 0.17, body_bottom - 10)],
        fill=(255, 255, 255, 70),
    )
    gloss = gloss.filter(ImageFilter.GaussianBlur(14))
    img = Image.alpha_composite(img, gloss)

    if bg is not None:
        base = Image.new("RGBA", (W, H), bg)
        img = Image.alpha_composite(base, img)
    img.save(out_path)
    print(out_path, img.size)


def make_comparison(out_path, size=(1600, 900)):
    W, H = size
    img = Image.new("RGBA", (W, H), (0, 0, 0, 0))

    def bottle(cx, fill_top, fill_bottom, cloudy=False):
        bw, bh = W * 0.22, H * 0.62
        left, top = cx - bw / 2, H * 0.22
        right, bottom = cx + bw / 2, top + bh

        shadow = Image.new("RGBA", (W, H), (0, 0, 0, 0))
        sd = ImageDraw.Draw(shadow)
        sd.ellipse([left - 10, bottom - 14, right + 10, bottom + 30], fill=(10, 30, 20, 120))
        shadow_blur = shadow.filter(ImageFilter.GaussianBlur(18))

        grad = vertical_gradient((int(bw), int(bh)), fill_top, fill_bottom).convert("RGBA")
        mask = Image.new("L", grad.size, 0)
        md = ImageDraw.Draw(mask)
        md.rounded_rectangle([0, 0, grad.size[0], grad.size[1]], radius=int(bw * 0.22), fill=255)
        if cloudy:
            # subtle murky speckle texture
            import random
            random.seed(3)
            speck = Image.new("L", grad.size, 0)
            spd = ImageDraw.Draw(speck)
            for _ in range(220):
                r = random.randint(2, 7)
                x = random.randint(0, grad.size[0])
                y = random.randint(0, grad.size[1])
                spd.ellipse([x - r, y - r, x + r, y + r], fill=random.randint(20, 70))
            speck = speck.filter(ImageFilter.GaussianBlur(3))
            dark = Image.new("RGBA", grad.size, (35, 22, 10, 255))
            grad = Image.composite(dark, grad, speck)

        neck_w = bw * 0.34
        neck = Image.new("RGBA", (W, H), (0, 0, 0, 0))
        nd = ImageDraw.Draw(neck)
        nd.rounded_rectangle([cx - neck_w / 2, top - H * 0.09, cx + neck_w / 2, top + 20],
                              radius=int(neck_w * 0.3), fill=(60, 60, 60, 255))
        nd.rounded_rectangle([cx - neck_w * 0.6, top - H * 0.115, cx + neck_w * 0.6, top - H * 0.07],
                              radius=int(neck_w * 0.3), fill=(35, 35, 35, 255))

        body_layer = Image.new("RGBA", (W, H), (0, 0, 0, 0))
        body_layer.paste(grad, (int(left), int(top)), mask)

        out = Image.alpha_composite(shadow_blur, body_layer)
        out = Image.alpha_composite(out, neck)

        gloss = Image.new("RGBA", (W, H), (0, 0, 0, 0))
        gd = ImageDraw.Draw(gloss)
        gx = left + bw * 0.2
        gd.polygon([(gx, top + 10), (gx + bw * 0.1, top + 10), (gx - bw * 0.02, bottom - 10), (gx - bw * 0.12, bottom - 10)],
                    fill=(255, 255, 255, 80))
        gloss = gloss.filter(ImageFilter.GaussianBlur(10))
        out = Image.alpha_composite(out, gloss)
        return out

    left_bottle = bottle(W * 0.32, (70, 48, 20), (30, 18, 8), cloudy=True)
    right_bottle = bottle(W * 0.68, (250, 205, 110), (210, 150, 50), cloudy=False)

    img = Image.alpha_composite(img, left_bottle)
    img = Image.alpha_composite(img, right_bottle)

    img.save(out_path)
    print(out_path, img.size)


make_jerrycan("public/images/jerrycan.png")
make_comparison("public/images/oil-compare.png")
