import type { MetadataRoute } from 'next'

// Web app manifest — bikin situs ini bisa di-"Install"/"Add to Home Screen"
// sebagai PWA (icon di home screen, buka tanpa address bar ala app native,
// splash screen pas loading). Sejak Round 11 dilengkapi set icon yang
// proper (bukan cuma 1 ukuran) + shortcuts, bukan cuma versi minimal Round
// 10 yang sekadar nemenin SEO.
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'GoJelantah — Jemput & Beli Minyak Jelantah',
    short_name: 'GoJelantah',
    description: 'Jemput gratis, bayar tunai di tempat, harga mulai Rp 7.000/liter (nego) se-Jabodetabek.',
    start_url: '/',
    scope: '/',
    display: 'standalone',
    background_color: '#06150f',
    theme_color: '#06150f',
    lang: 'id',
    categories: ['business', 'shopping'],

    // Tiga varian icon:
    // - 192 & 512 "any": dipakai apa adanya (rounded-square, ada padding
    //   bawaan) buat launcher/app-list yang gak nge-crop icon-nya sendiri.
    // - 512 "maskable": full-bleed (gak ada rounded corner sendiri) +
    //   droplet digambar lebih kecil di tengah, AMAN kalau di-crop jadi
    //   bentuk apa pun (lingkaran/squircle/dll) oleh launcher Android yang
    //   nerapin tema adaptive-icon — lihat komentar di scripts/gen_logo.py.
    icons: [
      { src: '/icons/icon-192.png', sizes: '192x192', type: 'image/png', purpose: 'any' },
      { src: '/icons/icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'any' },
      { src: '/icons/icon-maskable-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
    ],

    // Shortcut pas icon di-long-press (Android) / di-right-click (desktop
    // PWA) — jalan pintas ke 2 aksi yang paling sering dicari user.
    shortcuts: [
      {
        name: 'Reservasi Jemput',
        short_name: 'Reservasi',
        description: 'Jadwalkan penjemputan minyak jelantah',
        url: '/reservasi',
      },
      {
        name: 'Hubungi WhatsApp',
        short_name: 'WhatsApp',
        description: 'Chat langsung ke tim GoJelantah',
        url: '/kontak',
      },
    ],
  }
}
