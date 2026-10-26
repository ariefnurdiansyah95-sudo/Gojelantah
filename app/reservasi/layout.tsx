import type { Metadata } from 'next'

// Sama alasannya kayak app/kontak/layout.tsx: app/reservasi/page.tsx
// adalah Client Component ('use client', pakai useState + useSearchParams
// buat wizard 3 langkah), jadi metadata khusus halaman ini harus ditaruh
// di layout.tsx segment ini.
export const metadata: Metadata = {
  title: 'Reservasi Jemput',
  description:
    'Jadwalkan penjemputan minyak jelantah Anda dalam 3 langkah singkat — isi jumlah liter & lokasi, pilih jadwal, lalu kirim ke WhatsApp tim GoJelantah untuk dikonfirmasi.',
}

export default function ReservasiLayout({ children }: { children: React.ReactNode }) {
  return children
}
