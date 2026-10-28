import { Container, Droplets, Leaf, Wallet, Truck } from 'lucide-react'
import { SITE, formatRupiah } from '@/lib/site'

// Visual pendamping hero — bukan foto stok (di sandbox ini domain foto
// eksternal kayak Unsplash/Google diblokir network-nya, jadi gak bisa
// dipastikan link-nya hidup pas di-deploy; daripada ambil risiko gambar
// patah, dibikin ilustrasi custom sendiri yang 100% ketebak hasilnya &
// senada sama palet brand). Komposisinya: blob besar bergradasi hijau→emas
// sebagai "wadah jelantah", dikelilingi droplet & daun yang melayang, plus
// 2 kartu info mengambang (pola umum di hero landing page modern) biar
// sisi kanan hero gak kosong lagi.
export default function HeroArt() {
  return (
    // Ukuran ilustrasi ini sengaja dibatasi JAUH lebih kecil di mobile
    // (`max-w-[240px]`) dibanding sebelumnya (`max-w-sm` = 384px, nyaris
    // selebar layar HP DAN setinggi itu juga karena `aspect-square` —
    // alhasil ilustrasi doang udah makan >50% tinggi layar pas pertama
    // dibuka di HP, headline/harga/CTA jadi kepotong ke bawah fold dan
    // malah numpuk sama tombol WhatsApp mengambang). Di `lg:` ke atas
    // (ilustrasi sejajar teks, bukan ditumpuk di atasnya) ukurannya balik
    // gak dibatasi seperti semula.
    <div className="relative w-full max-w-[240px] sm:max-w-xs lg:max-w-none mx-auto aspect-square">
      {/* Blob gradasi utama */}
      <div
        className="absolute inset-4 sm:inset-6 bg-gradient-to-br from-accent via-accent-light to-gold shadow-2xl shadow-emerald-900/20 dark:shadow-black/40 animate-float"
        style={{ borderRadius: '62% 38% 55% 45% / 55% 45% 62% 38%' }}
      />
      <div
        className="absolute inset-4 sm:inset-6 bg-white/10 backdrop-blur-sm"
        style={{ borderRadius: '62% 38% 55% 45% / 55% 45% 62% 38%' }}
      />

      {/* Ikon utama di tengah — jerigen jelantah */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative w-28 h-28 sm:w-36 sm:h-36 rounded-full bg-white/90 dark:bg-[#0b1f16]/90 backdrop-blur-xl shadow-xl flex items-center justify-center">
          <Container className="w-14 h-14 sm:w-16 sm:h-16 text-accent dark:text-accent-light" strokeWidth={1.5} />
        </div>
      </div>

      {/* Droplet & daun melayang */}
      <div className="absolute top-[12%] left-[16%] w-9 h-9 rounded-full bg-white/80 dark:bg-white/10 backdrop-blur-sm flex items-center justify-center shadow-md animate-bob">
        <Droplets className="w-4 h-4 text-accent dark:text-accent-light" />
      </div>
      <div className="absolute bottom-[16%] left-[10%] w-8 h-8 rounded-full bg-white/80 dark:bg-white/10 backdrop-blur-sm flex items-center justify-center shadow-md animate-float">
        <Leaf className="w-3.5 h-3.5 text-gold dark:text-gold-light" />
      </div>
      <div className="absolute bottom-[30%] right-[6%] w-8 h-8 rounded-full bg-white/80 dark:bg-white/10 backdrop-blur-sm flex items-center justify-center shadow-md animate-bob" style={{ animationDelay: '0.6s' }}>
        <Truck className="w-3.5 h-3.5 text-accent dark:text-accent-light" />
      </div>

      {/* Kartu info mengambang */}
      <div className="glass-card absolute -left-2 sm:left-0 bottom-[8%] px-4 py-3 flex items-center gap-2.5 shadow-lg">
        <div className="w-8 h-8 rounded-lg bg-accent/15 flex items-center justify-center flex-shrink-0">
          <Wallet className="w-4 h-4 text-accent dark:text-accent-light" />
        </div>
        <div>
          <p className="text-xs font-bold text-gray-900 dark:text-white whitespace-nowrap">Mulai {formatRupiah(SITE.pricePerLiter)}/Liter</p>
          <p className="text-[10px] text-gray-500 dark:text-gray-400">Nego di tempat</p>
        </div>
      </div>

      <div className="glass-card absolute -right-2 sm:right-0 top-[10%] px-4 py-3 flex items-center gap-2.5 shadow-lg">
        <div className="w-8 h-8 rounded-lg bg-gold/15 flex items-center justify-center flex-shrink-0">
          <Leaf className="w-4 h-4 text-gold dark:text-gold-light" />
        </div>
        <div>
          <p className="text-xs font-bold text-gray-900 dark:text-white whitespace-nowrap">Jemput Gratis</p>
          <p className="text-[10px] text-gray-500 dark:text-gray-400">Se-Jabodetabek</p>
        </div>
      </div>
    </div>
  )
}
