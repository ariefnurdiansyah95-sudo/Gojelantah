'use client'

import { MessageCircle } from 'lucide-react'
import { buildWhatsAppLink } from '@/lib/site'

// Floating CTA WA — selalu kelihatan di semua halaman, karena untuk bisnis
// jemput-jelantah ini konversi utamanya emang "chat WA", bukan form.
// Label "Chat WhatsApp" sengaja SELALU tampil (bukan nunggu hover lagi),
// biar fungsinya langsung jelas begitu dilihat, gak butuh interaksi dulu.
export default function WhatsAppFloat() {
  return (
    <a
      href={buildWhatsAppLink('Halo GoJelantah, saya mau jemput minyak jelantah.')}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat WhatsApp GoJelantah"
      // `bottom` dihitung lewat inline style (bukan class `bottom-5` biasa)
      // supaya nambahin `env(safe-area-inset-bottom)` — di HP yang punya
      // home-indicator/gesture-bar (iPhone X ke atas dll), tanpa ini
      // tombol mengambang bisa nempel kegencet di area gesture tsb.
      style={{ bottom: 'calc(1.25rem + env(safe-area-inset-bottom, 0px))' }}
      className="group fixed right-5 z-[90] flex items-center gap-2 pl-3.5 pr-4 py-3 rounded-full bg-emerald-500 text-white shadow-lg shadow-emerald-600/30 hover:bg-emerald-600 hover:scale-105 active:scale-95 transition-all duration-300"
    >
      <span className="relative flex h-5 w-5 flex-shrink-0 items-center justify-center">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-40" />
        <MessageCircle className="relative w-5 h-5" />
      </span>
      <span className="text-sm font-semibold whitespace-nowrap">
        Chat WhatsApp
      </span>
    </a>
  )
}
