import Link from 'next/link'
import { Droplets, MapPin, MessageCircle, Clock, AtSign } from 'lucide-react'
import { SITE, buildWhatsAppLink, formatRupiah } from '@/lib/site'

const FOOTER_LINKS = [
  { href: '/', label: 'Beranda' },
  { href: '/tentang', label: 'Tentang Kami' },
  { href: '/#area-layanan', label: 'Area Layanan' },
  { href: '/reservasi', label: 'Reservasi' },
  { href: '/mitra-bisnis', label: 'Mitra Bisnis' },
  { href: '/artikel', label: 'Artikel' },
  { href: '/kontak', label: 'Kontak' },
]

// Footer sengaja dibikin band hijau GELAP pekat (bukan putih lagi, di
// kedua tema) — biar jadi penutup halaman yang percaya diri & nyambung ke
// identitas warna GoJelantah, bukan "nabrak" ke putih pas sampai bawah.
export default function Footer() {
  return (
    <footer className="relative mt-20 overflow-hidden bg-[#061f15] text-white">
      <div className="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-emerald-500/20 blur-[120px]" aria-hidden="true" />
      <div className="absolute -bottom-24 -left-16 h-72 w-72 rounded-full bg-amber-500/10 blur-[120px]" aria-hidden="true" />

      {/* `pb-28` (bukan sama kayak `pt-14`) sengaja dilebihin khusus di
          mobile — tombol WhatsApp mengambang (fixed, selalu di pojok
          kanan-bawah LAYAR, bukan ikut alur halaman) kalau gak dikasih
          jarak aman bakal nutupin baris copyright paling bawah pas user
          scroll sampai mentok. Di `sm:` ke atas dibalikin pakai `py-14`
          simetris karena di layar lebih lebar tombolnya gak terlalu
          "mepet" ke teks footer. */}
      <div className="relative max-w-6xl mx-auto px-6 sm:px-8 pt-14 pb-28 sm:pb-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-3 group">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-accent-light to-gold flex items-center justify-center flex-shrink-0 transition-transform duration-300 group-hover:scale-105">
                <Droplets className="w-[18px] h-[18px] text-white" />
              </div>
              <span className="text-base font-semibold text-white">GoJelantah</span>
            </Link>
            <p className="text-sm text-white/60 leading-relaxed max-w-xs">
              {SITE.tagline} — jemput &amp; beli minyak jelantah se-Jabodetabek, bayar langsung di tempat.
            </p>
          </div>

          <div>
            <p className="text-xs font-bold uppercase tracking-wide text-white/40 mb-4">Navigasi</p>
            <ul className="space-y-2.5">
              {FOOTER_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/65 hover:text-accent-light transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-xs font-bold uppercase tracking-wide text-white/40 mb-4">Kontak</p>
            <ul className="space-y-3 text-sm text-white/65">
              <li className="flex items-start gap-2">
                <MessageCircle className="w-4 h-4 mt-0.5 flex-shrink-0 text-accent-light" />
                <a
                  href={buildWhatsAppLink('Halo GoJelantah, saya mau tanya soal jemput minyak jelantah.')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-accent-light transition-colors duration-200"
                >
                  {SITE.whatsappLocal}
                </a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0 text-accent-light" />
                <span>{SITE.address}</span>
              </li>
              <li className="flex items-start gap-2">
                <Clock className="w-4 h-4 mt-0.5 flex-shrink-0 text-accent-light" />
                <span>Senin–Jumat 08.00–17.00, Sabtu 08.00–12.00</span>
              </li>
            </ul>
          </div>

          <div>
            <p className="text-xs font-bold uppercase tracking-wide text-white/40 mb-4">Harga Jemput</p>
            <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-4">
              <p className="text-2xl font-bold text-white">Mulai {formatRupiah(SITE.pricePerLiter)}<span className="text-sm font-medium text-white/50">/liter</span></p>
              <p className="text-xs text-white/50 mt-1">Nego, tanpa syarat minimum liter.</p>
            </div>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 mt-4 text-xs text-white/50 hover:text-accent-light transition-colors duration-200"
            >
              <AtSign className="w-3.5 h-3.5" /> gojelantah
            </a>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-white/40">
          <p>© {new Date().getFullYear()} GoJelantah. Jemput Jelantah, Secepat Klik.</p>
          <p>Jakarta · Bogor · Depok · Tangerang · Bekasi</p>
        </div>
      </div>
    </footer>
  )
}
