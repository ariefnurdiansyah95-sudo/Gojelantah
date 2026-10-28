// Ulasan ASLI dari Google Maps gudang GoJelantah — ditempel manual dari
// screenshot yang dikasih user langsung dari halaman Google Maps gudangnya
// (2026-10-28), BUKAN testimoni karangan/representatif seperti versi
// sebelumnya. Nama & isi ulasan dibiarkan sepersis mungkin dengan aslinya
// (cuma kapitalisasi nama yang dirapikan buat tampilan, isi ulasan TIDAK
// diedit/diparafrase). Satu ulasan (Candra Adi putra, 5 bintang) sengaja
// TIDAK dimasukkan karena di screenshot-nya gak ada teks ulasan sama
// sekali, cuma rating bintang doang — gak ada yang bisa ditampilkan
// sebagai kutipan.
//
// Kalau user nanti kirim ulasan baru yang mau ditambahin, tinggal nambah
// satu entri lagi di array ini — jangan pernah mengarang isi ulasan baru
// sendiri.
export type Review = {
  name: string
  initials: string
  rating: number
  quote: string
}

export const REVIEWS: Review[] = [
  {
    name: 'Arief Nurdiansyah',
    initials: 'AN',
    rating: 5,
    quote: 'Mantap',
  },
  {
    name: 'Andi Rahman',
    initials: 'AR',
    rating: 5,
    quote:
      'Awalnya bingung mau buang minyak bekas ke mana, ternyata ada pengepul ini. Jadi lebih bermanfaat, bisa jadi tambahan penghasilan juga.',
  },
  {
    name: 'Yana Fana',
    initials: 'YF',
    rating: 5,
    quote:
      'Saya senang karena minyak jelantah di rumah bisa dimanfaatkan, tidak terbuang sia-sia. Prosesnya gampang, tinggal hubungi lalu dijemput. Terima kasih',
  },
  {
    name: 'Laras Sati',
    initials: 'LS',
    rating: 5,
    quote:
      'Harga beli minyak jelantah di sini lebih bagus dibanding tempat lain. Orangnya juga jujur dan profesional. Sangat membantu!',
  },
  {
    name: 'Ratih Anggraini',
    initials: 'RA',
    rating: 5,
    quote:
      'Pelayanan bagus, respon cepat kalau dihubungi. Proses penjemputan juga tepat waktu. Puas banget!',
  },
]
