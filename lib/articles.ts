export interface Article {
  slug: string
  title: string
  excerpt: string
  category: string
  readMinutes: number
  content: string[]
  cover?: 'jerrycan' | 'compare'
}

export const ARTICLES: Article[] = [
  {
    slug: 'apa-itu-minyak-jelantah',
    title: 'Apa Itu Minyak Jelantah dan Kenapa Berbahaya Dipakai Berulang?',
    excerpt:
      'Minyak jelantah bukan cuma minyak "kotor" — ada proses kimia di baliknya yang bikin dia berbahaya kalau terus dipakai menggoreng.',
    category: 'Edukasi',
    readMinutes: 4,
    cover: 'compare',
    content: [
      'Minyak jelantah adalah minyak goreng yang sudah dipakai, biasanya lebih dari satu kali, sehingga mengalami perubahan warna, bau, dan komposisi kimia. Perubahan ini terjadi lewat dua proses utama: oksidasi dan polimerisasi, yang dipicu oleh panas tinggi berulang.',
      'Saat minyak dipanaskan terus-menerus, molekul lemaknya terurai dan membentuk senyawa baru seperti akrilamida dan radikal bebas. Senyawa-senyawa ini yang jadi alasan utama kenapa minyak jelantah tidak disarankan untuk dikonsumsi lagi — konsumsi jangka panjang dikaitkan dengan peningkatan risiko gangguan jantung dan pencernaan.',
      'Tanda-tanda minyak sudah tidak layak pakai antara lain: warna menjadi gelap kecoklatan, muncul busa berlebihan saat dipanaskan, bau tengik, dan teksturnya jadi lebih kental dari minyak baru.',
      'Daripada dibuang ke saluran air (yang justru mencemari lingkungan) atau tetap dipakai, cara paling aman dan menguntungkan adalah menyetorkannya ke pengumpul terpercaya seperti GoJelantah — jelantah diproses ulang jadi biodiesel, dan Anda tetap dibayar tunai per liternya.',
    ],
  },
  {
    slug: 'bahaya-buang-jelantah-sembarangan',
    title: 'Bahaya Membuang Minyak Jelantah ke Saluran Air',
    excerpt:
      'Satu liter jelantah yang dibuang sembarangan bisa berdampak jauh lebih besar dari yang dibayangkan kebanyakan orang.',
    category: 'Lingkungan',
    readMinutes: 3,
    cover: 'jerrycan',
    content: [
      'Banyak rumah tangga membuang sisa minyak goreng langsung ke saluran pembuangan (sink atau selokan) tanpa sadar dampaknya. Minyak yang mengeras di pipa menyebabkan penyumbatan, yang pada skala lingkungan bisa memicu banjir lokal akibat drainase yang tidak lancar.',
      'Di perairan terbuka, lapisan minyak menghalangi oksigen masuk ke dalam air, mengganggu kehidupan biota air dan mempercepat pencemaran. Diperkirakan satu liter minyak jelantah yang dibuang sembarangan dapat mencemari ratusan ribu hingga jutaan liter air bersih tergantung kondisi perairan penerimanya.',
      'Alih-alih dibuang, jelantah sebaiknya disaring dan disimpan di wadah tertutup, lalu disetorkan ke jasa penjemputan seperti GoJelantah. Selain mencegah pencemaran, langkah ini juga mengubah "sampah dapur" menjadi tambahan pemasukan rutin.',
    ],
  },
  {
    slug: 'cara-menyimpan-jelantah-sebelum-dijemput',
    title: '5 Langkah Menyimpan Jelantah Agar Nilainya Tetap Maksimal',
    excerpt:
      'Penyimpanan yang benar bikin proses penjemputan dan penimbangan jadi lebih cepat dan hasilnya lebih maksimal.',
    category: 'Tips',
    readMinutes: 3,
    cover: 'jerrycan',
    content: [
      '1. Saring dulu sisa ampas gorengan menggunakan saringan halus sebelum dipindahkan ke wadah penyimpanan — ini membuat volume yang ditimbang lebih akurat.',
      '2. Gunakan jerigen atau botol bekas yang bersih dan kering. Hindari wadah yang masih ada sisa air, karena air bisa mempercepat pembusukan minyak.',
      '3. Tutup wadah rapat-rapat untuk mencegah bau menyebar dan mengurangi risiko tumpah saat dipindahkan.',
      '4. Simpan di tempat sejuk, jauh dari sinar matahari langsung — suhu panas mempercepat oksidasi lanjutan pada minyak yang sudah dipakai.',
      '5. Kumpulkan dulu sampai jumlahnya cukup banyak (atau sesuai kebutuhan Anda), lalu reservasi penjemputan lewat GoJelantah. Tidak ada minimum liter, jadi kapan pun siap, tim kami siap jemput.',
    ],
  },
  {
    slug: 'jelantah-jadi-biodiesel',
    title: 'Dari Dapur ke Tangki: Bagaimana Jelantah Diubah Jadi Biodiesel',
    excerpt:
      'Proses transesterifikasi mengubah minyak bekas jadi bahan bakar nabati yang bisa menggantikan sebagian solar fosil.',
    category: 'Edukasi',
    readMinutes: 4,
    cover: 'jerrycan',
    content: [
      'Setelah dikumpulkan, minyak jelantah melewati tahap penyaringan untuk memisahkan air, ampas, dan kotoran lain. Minyak yang sudah bersih kemudian diproses lewat reaksi kimia bernama transesterifikasi, di mana minyak direaksikan dengan alkohol (biasanya metanol) dan katalis untuk menghasilkan biodiesel serta produk sampingan berupa gliserin.',
      'Biodiesel hasil olahan jelantah punya karakteristik pembakaran yang lebih bersih dibanding solar konvensional, dan karena bahan bakunya adalah minyak bekas, proses ini juga membantu mengurangi limbah yang seharusnya dibuang.',
      'Selain jadi biodiesel, sebagian kecil jelantah olahan juga dimanfaatkan sebagai bahan baku sabun, pelumas, dan lilin — menunjukkan bahwa "minyak bekas" sebenarnya punya banyak jalur daur ulang bernilai ekonomi.',
      'Inilah alasan GoJelantah berani membeli jelantah Anda dengan harga flat: karena di ujung rantai pasokan, minyak ini benar-benar diubah jadi sesuatu yang bernilai, bukan sekadar dikumpulkan tanpa tujuan.',
    ],
  },
  {
    slug: 'kenapa-jelantah-dicari-industri-biodiesel',
    title: 'Kenapa Minyak Jelantah Makin Dicari Industri Biodiesel?',
    excerpt:
      'Permintaan jelantah sebagai bahan baku energi terbarukan terus naik — ini yang bikin "minyak bekas" sekarang punya nilai jual nyata.',
    category: 'Edukasi',
    readMinutes: 4,
    cover: 'jerrycan',
    content: [
      'Dulu jelantah dianggap limbah dapur yang paling gampang dibuang begitu saja. Sekarang, posisinya berbalik — jelantah jadi salah satu bahan baku yang dicari industri energi terbarukan, khususnya untuk produksi biodiesel.',
      'Alasannya sederhana: biodiesel butuh bahan baku berbasis minyak nabati, dan jelantah adalah sumber yang jauh lebih murah serta lebih ramah lingkungan dibanding memakai minyak sawit segar yang masih harus ditanam dan dipanen baru. Memakai jelantah berarti mengolah ulang sesuatu yang sudah ada, bukan menambah lahan tanam baru.',
      'Tren ini juga didorong oleh target bauran energi terbarukan di banyak negara, termasuk Indonesia, yang terus mendorong campuran biodiesel pada solar (seperti program B35/B40). Semakin tinggi target campurannya, semakin besar juga kebutuhan bahan baku jelantah dalam jumlah besar dan konsisten.',
      'Buat rumah tangga dan usaha kuliner, ini artinya satu hal konkret: jelantah yang selama ini dianggap sampah, sekarang punya pembeli yang jelas dan harga yang bisa terus terjaga — bukan cuma tren sesaat. GoJelantah hadir untuk jadi penghubung yang transparan antara dapur Anda dan rantai pasokan ini.',
    ],
  },
  {
    slug: 'ciri-jelantah-masih-layak-dan-sudah-rusak',
    title: 'Begini Cara Mengenali Minyak Jelantah yang Masih Bagus vs yang Sudah Rusak Parah',
    excerpt:
      'Gak semua jelantah sama — tingkat kerusakannya mempengaruhi seberapa aman dan seberapa gampang diproses ulang.',
    category: 'Tips',
    readMinutes: 3,
    cover: 'compare',
    content: [
      'Meski sama-sama disebut "jelantah", kondisi minyak bekas sebenarnya bisa sangat bervariasi tergantung berapa kali dipakai, jenis makanan yang digoreng, dan suhu menggorengnya. Mengenali kondisinya penting, baik buat keamanan dapur Anda sendiri maupun buat proses daur ulang selanjutnya.',
      'Warna adalah indikator paling gampang dilihat: minyak yang baru dipakai 1-2 kali biasanya masih kuning keemasan, sementara yang sudah dipakai berkali-kali berubah jadi cokelat gelap hingga kehitaman. Semakin gelap warnanya, semakin tinggi tingkat oksidasinya.',
      'Indikator lain yang bisa diperhatikan: busa berlebihan saat dipanaskan, bau tengik yang menyengat, tekstur yang jadi lebih kental dan lengket, serta munculnya endapan/ampas yang mengendap di dasar wadah. Kombinasi dari tanda-tanda ini menunjukkan minyak sudah tidak layak dipakai sama sekali untuk memasak.',
      'Kabar baiknya, baik jelantah yang "masih mendingan" maupun yang sudah rusak parah, keduanya tetap punya nilai jual ke GoJelantah — karena proses penyaringan dan pengolahan lanjutan di tahap industri memang dirancang untuk menangani variasi kondisi ini. Jadi Anda tidak perlu khawatir jelantah "terlalu jelek" untuk disetorkan.',
    ],
  },
  {
    slug: 'jelantah-untuk-umkm-kuliner',
    title: 'Jelantah Menumpuk di Usaha Kuliner? Begini Cara Mengubahnya Jadi Pemasukan Tambahan',
    excerpt:
      'Buat warung, resto, dan katering, jelantah bukan cuma masalah kebersihan dapur — ini peluang pemasukan rutin yang sering terlewat.',
    category: 'Tips',
    readMinutes: 3,
    cover: 'jerrycan',
    content: [
      'Usaha kuliner — mulai dari warung tegal, gerai gorengan, restoran, sampai dapur katering — biasanya menghasilkan jelantah dalam jumlah jauh lebih besar dibanding rumah tangga biasa. Kalau tidak dikelola, jelantah dalam jumlah besar ini sering berakhir jadi masalah: bikin saluran air mampet, bau menyengat di area dapur, dan risiko teguran kalau dibuang sembarangan.',
      'Padahal, volume besar ini justru jadi keuntungan kalau dikelola dengan benar. Semakin banyak dan semakin rutin jelantah yang disetorkan, semakin besar juga pemasukan tambahan yang didapat — tanpa perlu effort tambahan selain menyimpannya dengan benar sebelum dijemput.',
      'GoJelantah melayani penjemputan untuk semua skala, dari rumah tangga sampai usaha dengan volume ratusan liter per bulan, dengan harga flat yang sama — tidak ada negosiasi berbeda untuk pelanggan besar maupun kecil. Jadwal jemput juga bisa diatur rutin (misalnya mingguan atau bulanan) menyesuaikan kecepatan jelantah menumpuk di dapur Anda.',
      'Buat pelaku usaha kuliner, ini bukan cuma soal kebersihan operasional — tapi juga nilai tambah yang bisa disebut ke pelanggan: usaha Anda mengelola limbah dapur secara bertanggung jawab, bukan membuangnya sembarangan ke lingkungan sekitar.',
    ],
  },
]

export function getArticleBySlug(slug: string) {
  return ARTICLES.find((a) => a.slug === slug)
}
