import type { Metadata } from 'next'

// `app/kontak/page.tsx` itu Client Component ('use client', butuh useState
// buat form), dan Next.js gak bisa export `metadata` dari Client Component
// — makanya metadata khusus halaman ini ditaruh di layout.tsx segment ini
// (Server Component), bukan di page.tsx-nya langsung. Sebelumnya halaman
// ini gak punya metadata sendiri sama sekali, jadi Google cuma baca
// title/description default dari root layout (sama kayak semua halaman
// lain) — kurang spesifik buat SEO.
export const metadata: Metadata = {
  title: 'Kontak',
  description:
    'Hubungi GoJelantah lewat WhatsApp untuk tanya harga, area penjemputan, atau kerja sama. Respon cepat, chat langsung dibalas tim kami.',
}

export default function KontakLayout({ children }: { children: React.ReactNode }) {
  return children
}
