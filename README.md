# GoJelantah

Website jemput & beli minyak jelantah se-Jabodetabek — dibangun dengan
Next.js 14 (App Router) + TypeScript + Tailwind CSS, mewarisi sistem desain
(layout, animasi, pola komponen) dari proyek ViralForge, direkolorkan ke
palet hijau/emas dan diisi konten khusus untuk bisnis jelantah.

## Menjalankan secara lokal

```bash
npm install
npm run dev
```

Buka http://localhost:3000.

## Build produksi

```bash
npm run build
npm run start
```

## Struktur halaman

- `/` — Beranda
- `/tentang` — Tentang Kami
- `/area-layanan` — Area Layanan (Jabodetabek)
- `/reservasi` — Wizard reservasi jemput (3 langkah, kirim ke WhatsApp)
- `/kontak` — Kontak & form (kirim ke WhatsApp)
- `/artikel` — Artikel/edukasi
- `/artikel/[slug]` — Detail artikel

## Data bisnis

Semua konstanta bisnis (nomor WhatsApp, alamat, harga per liter, area
layanan) ada di satu tempat: `lib/site.ts`. Ubah di situ untuk memperbarui
di seluruh halaman sekaligus.
