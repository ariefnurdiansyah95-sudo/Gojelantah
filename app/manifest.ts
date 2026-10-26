import type { MetadataRoute } from 'next'

// Web app manifest minimal — bukan syarat wajib buat SEO, tapi melengkapi
// signal "situs ini dikelola serius" (ikon konsisten di berbagai
// permukaan: tab browser, share preview, "Add to Home Screen" di mobile)
// dan gratis/murah buat ditambahin sekalian icon.png yang udah dibikin.
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'GoJelantah — Jemput & Beli Minyak Jelantah',
    short_name: 'GoJelantah',
    description: 'Jemput gratis, bayar tunai di tempat, harga flat Rp 7.500/liter se-Jabodetabek.',
    start_url: '/',
    display: 'standalone',
    background_color: '#06150f',
    theme_color: '#06150f',
    icons: [
      {
        src: '/icon.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  }
}
