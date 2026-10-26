// Foto asli (bukan ilustrasi) dari Pexels — gratis untuk pemakaian komersial,
// atribusi tidak wajib (Pexels License), tapi tetap dicantumkan di `credit`
// sebagai referensi kalau suatu saat perlu diganti/diverifikasi ulang.
//
// Catatan: sandbox build ini memblokir akses network ke domain gambar
// eksternal (lihat catatan teknis di project doc), jadi URL-URL ini TIDAK
// bisa di-preview render di sandbox — tapi akan tampil normal di browser
// user/pengunjung yang sesungguhnya, karena pembatasan itu cuma berlaku
// untuk verifikasi di lingkungan ini, bukan untuk situs yang di-deploy.

export interface Photo {
  url: string
  alt: string
  credit: string
}

export const PHOTOS: Record<'jerrycan' | 'compare' | 'proses' | 'gorengan', Photo> = {
  jerrycan: {
    url: 'https://images.pexels.com/photos/37190228/pexels-photo-37190228.jpeg?auto=compress&cs=tinysrgb&w=1200',
    alt: 'Jerigen-jerigen minyak di pasar',
    credit: 'Foto oleh Bobby Dimas / Pexels',
  },
  compare: {
    url: 'https://images.pexels.com/photos/12284682/pexels-photo-12284682.jpeg?auto=compress&cs=tinysrgb&w=1200',
    alt: 'Botol-botol plastik berisi minyak goreng',
    credit: 'Foto oleh Towfiqu Barbhuiya / Pexels',
  },
  proses: {
    url: 'https://images.pexels.com/photos/39874186/pexels-photo-39874186.jpeg?auto=compress&cs=tinysrgb&w=1200',
    alt: 'Drum-drum industri untuk daur ulang',
    credit: 'Foto oleh enginakyurt / Pexels',
  },
  gorengan: {
    url: 'https://images.pexels.com/photos/34166724/pexels-photo-34166724.jpeg?auto=compress&cs=tinysrgb&w=1200',
    alt: 'Pedagang kaki lima menggoreng makanan di pasar',
    credit: 'Foto oleh J.D. Books / Pexels',
  },
}
