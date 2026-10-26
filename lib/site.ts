// Konstanta bisnis GoJelantah — satu sumber kebenaran dipakai di semua
// halaman (navbar, footer, kontak, reservasi, floating WA button) biar
// gampang diubah di satu tempat kalau nomor/alamat/harga berubah.

export const SITE = {
  brand: 'GoJelantah',
  tagline: 'Jemput Jelantah, Secepat Klik',
  description:
    'Jasa jemput & beli minyak jelantah terpercaya se-Jabodetabek. Jemput gratis, bayar langsung di tempat, harga flat Rp 7.500/liter.',

  // Nomor WA user: 081212084742 → format internasional (tanpa "0" di depan,
  // diganti kode negara 62) untuk link wa.me.
  whatsappLocal: '081212084742',
  whatsappIntl: '6281212084742',

  pricePerLiter: 7500,

  address:
    'Jl. I Gusti Ngurah Rai No.20C, RT.8/RW.6, Cipinang Muara, Kecamatan Jatinegara, Kota Jakarta Timur, Daerah Khusus Ibukota Jakarta 13420',

  serviceAreas: ['Jakarta', 'Bogor', 'Depok', 'Tangerang', 'Bekasi'],

  businessHours: [
    { day: 'Senin – Jumat', hours: '08.00 – 17.00' },
    { day: 'Sabtu', hours: '08.00 – 12.00' },
    { day: 'Minggu & libur nasional', hours: 'Tutup' },
  ],
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
