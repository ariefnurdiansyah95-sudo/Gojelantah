import type { Metadata } from 'next'

// Sama kayak `app/kontak/layout.tsx` & `app/reservasi/layout.tsx` — halaman
// ini Client Component ('use client', butuh useState buat form inquiry),
// jadi metadata khusus halaman ditaruh di layout.tsx segment ini (Server
// Component), bukan di page.tsx-nya langsung.
export const metadata: Metadata = {
  title: 'Mitra Bisnis & Pelanggan Rutin',
  description:
    'Program khusus untuk warteg, restoran, katering, dan usaha kuliner dengan volume jelantah besar — jadwal jemput rutin, kontak prioritas, dan rekap penyaluran.',
}

export default function MitraBisnisLayout({ children }: { children: React.ReactNode }) {
  return children
}
