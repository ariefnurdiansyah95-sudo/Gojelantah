// Konstanta bisnis GoJelantah — satu sumber kebenaran dipakai di semua
// halaman (navbar, footer, kontak, reservasi, floating WA button) biar
// gampang diubah di satu tempat kalau nomor/alamat/harga berubah.

export const SITE = {
  brand: 'GoJelantah',
  tagline: 'Jemput Jelantah, Secepat Klik',
  description:
    'Jasa jemput & beli minyak jelantah terpercaya se-Jabodetabek. Jemput gratis, bayar langsung di tempat, harga mulai Rp 7.000/liter (nego sesuai kondisi & volume).',

  // Nomor WA user: 081212084742 → format internasional (tanpa "0" di depan,
  // diganti kode negara 62) untuk link wa.me.
  whatsappLocal: '081212084742',
  whatsappIntl: '6281212084742',

  // Update harga (2026-10-28, permintaan user): harga TIDAK LAGI flat.
  // `pricePerLiter` sekarang jadi harga AWAL/DASAR buat estimasi kalkulator
  // & reservasi — harga final NEGO langsung di tempat, tergantung kondisi
  // & volume jelantah. Semua teks UI yang nyebut harga WAJIB pakai kata
  // "mulai"/"nego", JANGAN lagi pakai kata "flat"/"tanpa tawar-menawar".
  pricePerLiter: 7000,
  priceNote: 'Harga final bisa nego di tempat, tergantung kondisi & volume jelantah.',

  address:
    'Jl. I Gusti Ngurah Rai No.20C, RT.8/RW.6, Cipinang Muara, Kecamatan Jatinegara, Kota Jakarta Timur, Daerah Khusus Ibukota Jakarta 13420',

  serviceAreas: ['Jakarta', 'Bogor', 'Depok', 'Tangerang', 'Bekasi'],

  businessHours: [
    { day: 'Senin – Jumat', hours: '08.00 – 17.00' },
    { day: 'Sabtu', hours: '08.00 – 12.00' },
    { day: 'Minggu & libur nasional', hours: 'Tutup' },
  ],

  // Link ulasan resmi Google (short link "g.page/r/.../review") buat Google
  // Business Profile gudang GoJelantah — dikasih langsung oleh user
  // (2026-10-28). Ini format resmi yang disediakan Google sendiri buat
  // mengarahkan orang ke halaman tulis-ulasan ASLI; membuka link ini lalu
  // submit lewat akun Google mereka sendiri = ulasan beneran nyantol ke
  // Google Maps. TIDAK ADA cara (dan sengaja TIDAK dibuat) form ulasan
  // custom di web ini yang "mengirim" rating/komentar sendiri ke Google —
  // itu secara teknis gak mungkin dan melanggar kebijakan Google soal
  // manipulasi ulasan. CTA-nya juga sengaja dibuat OPSIONAL (bukan syarat
  // wajib sebelum reservasi terkirim), sesuai keputusan user sendiri,
  // karena mewajibkan ulasan demi bisa reservasi berisiko dianggap
  // "incentivized review" oleh Google dan bisa bikin listing kena flag.
  googleReviewUrl: 'https://g.page/r/Cb7I6L18dRBBEAI/review',
} as const

/**
 * Bikin link wa.me dengan pesan yang udah di-encode. Dipakai di CTA button,
 * floating WA, dan step terakhir wizard Reservasi.
 */
export function buildWhatsAppLink(message: string) {
  const encoded = encodeURIComponent(message)
  return `https://wa.me/${SITE.whatsappIntl}?text=${encoded}`
}

export function formatRupiah(value: number) {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0,
  }).format(value)
}
