import Link from 'next/link'
import {
  Droplets,
  Truck,
  Wallet,
  Leaf,
  ShieldCheck,
  Clock,
  MapPin,
  ArrowRight,
  MessageCircle,
  Star,
  Recycle,
} from 'lucide-react'
import Reveal from '@/components/Reveal'
import FaqAccordion from '@/components/FaqAccordion'
import PriceCalculator from '@/components/PriceCalculator'
import HeroArt from '@/components/HeroArt'
import AreaLayananSection from '@/components/AreaLayananSection'
import { SITE, buildWhatsAppLink, formatRupiah } from '@/lib/site'
import { PHOTOS } from '@/lib/photos'

const BENEFITS = [
  {
    icon: Wallet,
    title: 'Harga Nego & Transparan',
    desc: `Mulai ${formatRupiah(SITE.pricePerLiter)} per liter, berapa pun jumlahnya — harga final bisa nego sesuai kondisi & volume, tanpa syarat minimum.`,
  },
  {
    icon: Truck,
    title: 'Jemput Gratis ke Lokasi',
    desc: 'Rumah, resto, warung, atau usaha katering — armada kami datang, Anda tinggal nunggu di tempat.',
  },
  {
    icon: Clock,
    title: 'Respon Cepat 1×24 Jam',
    desc: 'Chat masuk langsung ditindaklanjuti, jadwal jemput biasanya terkonfirmasi di hari yang sama.',
  },
  {
    icon: Leaf,
    title: 'Diproses Jadi Biodiesel',
    desc: 'Jelantah yang terkumpul diolah ulang jadi bahan bakar nabati — bukan dibuang ke saluran air.',
  },
  {
    icon: ShieldCheck,
    title: 'Timbangan Jujur',
    desc: 'Ditimbang di depan Anda, hasilnya langsung dihitung dan dibayar tunai saat itu juga.',
  },
  {
    icon: MapPin,
    title: 'Cakupan Se-Jabodetabek',
    desc: 'Jakarta, Bogor, Depok, Tangerang, dan Bekasi — satu armada, satu nomor WA.',
  },
]

const TESTIMONIALS = [
  {
    name: 'Bu Rahma',
    initials: 'BR',
    role: 'Pemilik Warteg, Cipinang',
    quote:
      'Dulu jelantah numpuk di belakang dapur, sekarang tiap minggu dijemput GoJelantah. Lumayan buat tambahan belanja, prosesnya juga cepet banget.',
  },
  {
    name: 'Pak Yanto',
    initials: 'PY',
    role: 'Katering Rumahan, Bekasi',
    quote:
      'Harganya oke, bisa nego juga pas dateng. Tinggal chat WA, jadwal langsung diatur, pas dateng ditimbang depan mata, bayar cash.',
  },
  {
    name: 'Mbak Dian',
    initials: 'MD',
    role: 'Ibu Rumah Tangga, Depok',
    quote:
      'Awalnya cuma mau buang jelantah biar gak nyumbat saluran air, eh malah dibeli. Sekarang jadi rutin nabung jelantah tiap bulan.',
  },
]

const FAQ_ITEMS = [
  {
    question: 'Berapa harga beli minyak jelantah di GoJelantah?',
    answer: `Harga kami mulai dari Rp 7.000 per liter — harga final bisa nego langsung di tempat, tergantung kondisi dan volume jelantah Anda. Berlaku untuk semua jumlah, baik 2 liter dari rumah tangga maupun ratusan liter dari resto/usaha katering, dan tidak ada syarat minimum liter.`,
  },
  {
    question: 'Apakah penjemputan dikenakan biaya?',
    answer:
      'Tidak. Penjemputan ke lokasi Anda (rumah, resto, warung, dapur katering) di area Jabodetabek selalu gratis, tanpa biaya tersembunyi apapun.',
  },
  {
    question: 'Bagaimana cara menyimpan jelantah sebelum dijemput?',
    answer:
      'Saring dulu kotoran/ampasnya, lalu simpan di jerigen atau botol tertutup rapat di tempat sejuk, jauh dari sinar matahari langsung. Ini bikin minyak lebih mudah ditimbang dan diproses.',
  },
  {
    question: 'Daerah mana saja yang dilayani GoJelantah?',
    answer:
      'Saat ini kami melayani penjemputan di seluruh wilayah Jabodetabek: Jakarta, Bogor, Depok, Tangerang, dan Bekasi. Cek bagian Area Layanan di halaman ini untuk detail tiap kota.',
  },
  {
    question: 'Minyak jelantah yang dikumpulkan diapakan?',
    answer:
      'Jelantah yang terkumpul disaring ulang dan diproses menjadi biodiesel (bahan bakar nabati), sehingga tidak mencemari saluran air dan punya nilai guna baru — sekaligus alasan kami berani membelinya.',
  },
  {
    question: 'Bagaimana cara reservasi penjemputan?',
    answer:
      'Klik tombol "Reservasi Sekarang" di halaman ini, isi perkiraan jumlah liter dan lokasi Anda lewat wizard singkat kami, lalu pesan otomatis terkirim ke WhatsApp tim GoJelantah untuk dikonfirmasi.',
  },
  {
    question: 'Jelantah saya kondisinya sudah gelap & bau banget, masih diterima?',
    answer:
      'Masih. Baik jelantah yang masih relatif bagus maupun yang sudah pekat dan berbau, tetap kami terima — harganya bisa menyesuaikan (nego) tergantung kondisi minyaknya, karena proses penyaringan dan pengolahan lanjutan memang dirancang untuk menangani berbagai kondisi minyak bekas.',
  },
  {
    question: 'Bagaimana kalau usaha saya menghasilkan jelantah dalam jumlah besar tiap minggu?',
    answer:
      'Tidak masalah — kami melayani rumah tangga sampai usaha dengan volume ratusan liter per bulan, dan harganya bisa dinego sesuai skala: makin besar dan rutin volumenya, makin terbuka peluang dapat harga yang lebih baik. Jadwal jemput rutin (mingguan/bulanan) juga bisa diatur lewat WhatsApp — cek juga halaman Mitra Bisnis kami.',
  },
  {
    question: 'Apakah jelantah saya dicampur dengan jelantah pelanggan lain?',
    answer:
      'Proses penimbangan dilakukan di depan Anda saat penjemputan, jadi jumlah liter yang dibayarkan sudah sesuai dengan yang Anda setorkan. Setelah itu, jelantah dari berbagai sumber memang dikumpulkan bersama untuk diproses lebih lanjut jadi biodiesel — ini wajar dan tidak mempengaruhi pembayaran Anda, karena pembayaran sudah dilakukan tunai di tempat berdasarkan hasil timbangan.',
  },
  {
    question: 'Apa bedanya GoJelantah dengan pengepul jelantah lain?',
    answer:
      'Tiga hal utama: harga transparan mulai Rp 7.000/liter yang bisa dinego sesuai kondisi & volume (bukan asal pukul rata), tanpa syarat minimum liter; penjemputan gratis ke lokasi (bukan Anda yang harus antar); dan proses yang transparan — ditimbang di depan Anda, dibayar tunai saat itu juga, tanpa menunggu transfer atau proses administrasi tambahan.',
  },
]

export default function HomePage() {
  return (
    <>
      {/* ================= HERO ================= */}
      <section className="relative overflow-hidden px-6 sm:px-8 pt-24 sm:pt-32 pb-12 sm:pb-16">
        {/* Foto latar belakang — request user: contoh desain lama (ViralForge)
            punya foto blur di belakang kartu mengambang, bukan cuma gradient
            polos. Fotonya digenerate sendiri (scripts/gen_hero_bg.py, bokeh
            hijau senada brand) karena domain foto stok diblokir network-nya
            di sandbox build ini — daripada hotlink yang berisiko patah pas
            deploy. Cuma dipasang di strip atas hero (bukan seluruh halaman),
            terus di-fade ke gradient hijau halaman (`.main-scroll-bg`) biar
            fix "background putih pas scroll" dari Round 3 gak keganggu. */}
        <div className="absolute inset-x-0 top-0 h-[480px] sm:h-[620px] -z-30 overflow-hidden">
          <img
            src="/images/hero-bg.jpg"
            alt=""
            aria-hidden="true"
            className="w-full h-full object-cover dark:hidden"
          />
          <img
            src="/images/hero-bg-dark.jpg"
            alt=""
            aria-hidden="true"
            className="w-full h-full object-cover hidden dark:block"
          />
        </div>
        <div className="absolute inset-x-0 top-0 h-[480px] sm:h-[620px] -z-20 bg-gradient-to-b from-white/0 via-white/40 to-[#cdecd9] dark:from-black/5 dark:via-black/25 dark:to-[#07140f]" />

        {/* Mesh warna tipis di atas foto — nambah aksen titik warna brand,
            kayak cahaya matahari nembus dedaunan. */}
        <div className="absolute inset-0 -z-10 animate-mesh bg-[radial-gradient(circle_at_15%_15%,rgba(5,150,105,0.20),transparent_50%),radial-gradient(circle_at_85%_10%,rgba(245,158,11,0.16),transparent_50%),radial-gradient(circle_at_50%_95%,rgba(52,211,153,0.18),transparent_55%),radial-gradient(circle_at_90%_80%,rgba(245,158,11,0.12),transparent_50%)]" />

        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-[1.05fr_0.95fr] gap-12 lg:gap-14 items-center">
            <div className="text-center lg:text-left">
              <Reveal>
                <span className="badge-accent inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold border mb-6">
                  <Droplets className="w-3.5 h-3.5" /> Jemput Minyak Jelantah Se-Jabodetabek
                </span>
              </Reveal>

              <Reveal delay={80}>
                <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-gray-900 dark:text-white leading-[1.1]">
                  Jemput Jelantah,{' '}
                  <span className="italic font-serif text-accent dark:text-accent-light">
                    Secepat Klik
                  </span>
                </h1>
              </Reveal>

              <Reveal delay={160}>
                <p className="mt-6 text-base sm:text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                  Minyak jelantah di dapur Anda bukan sampah — itu uang yang belum dicairkan. GoJelantah datang
                  jemput gratis, timbang di tempat, bayar tunai mulai {formatRupiah(SITE.pricePerLiter)}/liter (nego).
                </p>
              </Reveal>

              <Reveal delay={240}>
                <div className="mt-9 flex flex-col sm:flex-row items-center lg:items-start justify-center lg:justify-start gap-3">
                  <Link href="/reservasi" className="btn-primary inline-flex items-center gap-2 w-full sm:w-auto justify-center">
                    <MessageCircle className="w-4 h-4" /> Reservasi Sekarang
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                  <Link href="#area-layanan" className="btn-accent inline-flex items-center gap-2 w-full sm:w-auto justify-center">
                    Cek Area Layanan
                  </Link>
                </div>
              </Reveal>
            </div>

            {/* Visual pendamping hero — ilustrasi custom (lihat
                components/HeroArt.tsx), biar sisi kanan hero gak kosong. */}
            <Reveal delay={200} className="order-first lg:order-last">
              <HeroArt />
            </Reveal>
          </div>

          <Reveal delay={320}>
            <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl mx-auto lg:max-w-none">
              {[
                { value: `Mulai ${formatRupiah(SITE.pricePerLiter)}`, label: 'per liter, nego' },
                { value: 'Gratis', label: 'jemput ke lokasi' },
                { value: '1×24 Jam', label: 'respon reservasi' },
                { value: '5 Kota', label: 'cakupan Jabodetabek' },
              ].map((stat) => (
                <div key={stat.label} className="glass-card px-3 py-5 text-center">
                  <p className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
                  <p className="text-[11px] sm:text-xs text-gray-500 dark:text-gray-400 mt-1">{stat.label}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ================= KALKULATOR HARGA ================= */}
      {/* Request user: fitur estimasi harga langsung di halaman depan,
          jangan cuma di /reservasi — biar pengunjung langsung bisa
          ngira-ngira berapa duit yang bisa mereka dapat tanpa pindah
          halaman dulu. Header section-nya sengaja disamain polanya (badge
          + h2 + subteks) kayak section lain di bawah, biar ritme halaman
          konsisten — sebelumnya kartu kalkulator nongol tanpa header,
          kesannya "nyempil"/gak rapi. */}
      <section className="px-6 sm:px-8 py-14 sm:py-20">
        <div className="max-w-3xl mx-auto">
          <Reveal className="text-center mb-10">
            <span className="badge-accent inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold border mb-4">
              <Droplets className="w-3.5 h-3.5" /> Coba Sekarang
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">
              Jelantah Anda Senilai{' '}
              <span className="italic font-serif text-accent dark:text-accent-light">Berapa?</span>
            </h2>
            <p className="mt-3 text-gray-600 dark:text-gray-400 max-w-xl mx-auto">
              Geser slidernya, lihat langsung estimasinya — gak perlu nunggu dihubungi dulu.
            </p>
          </Reveal>
          <Reveal delay={80}>
            <PriceCalculator />
          </Reveal>
        </div>
      </section>

      {/* ================= AREA LAYANAN ================= */}
      {/* Request user: menu/halaman "Area Layanan" terpisah dihapus, isinya
          dipindah langsung ke beranda, ditaruh setelah kalkulator harga.
          Section "Cara Kerja — 4 Langkah" dan "Dibuang Sembarangan vs
          GoJelantah" yang tadinya ada di sini juga dihapus sesuai
          permintaan user. Komponennya dipisah ke AreaLayananSection.tsx
          karena butuh state (`useState` city picker) — page.tsx ini
          sengaja tetap Server Component. */}
      <AreaLayananSection />

      {/* ================= EDUKASI: KENALI JELANTAH ================= */}
      {/* Request user: konten di homepage masih "sepi" dibanding situs
          sejenis — ditambah blok edukasi yang lebih dalam (bahaya, kenapa
          berharga) lengkap dengan ilustrasi jerigen & perbandingan
          minyak, biar halaman depan gak cuma jualan tapi juga ngasih
          informasi yang berguna buat pengunjung. */}
      <section className="section-tint-emerald px-6 sm:px-8 py-14 sm:py-20">
        <div className="max-w-6xl mx-auto">
          <Reveal className="text-center mb-10">
            <span className="badge-accent inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold border mb-4">
              <Leaf className="w-3.5 h-3.5" /> Edukasi
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">
              Kenali Jelantah{' '}
              <span className="italic font-serif text-accent dark:text-accent-light">
                Lebih Dalam
              </span>
            </h2>
            <p className="mt-3 text-gray-600 dark:text-gray-400 max-w-xl mx-auto">
              Bukan cuma soal jual-beli — ini kenapa jelantah penting buat dikelola dengan benar.
            </p>
          </Reveal>

          <div className="grid lg:grid-cols-2 gap-6 lg:gap-8 mb-6">
            <Reveal>
              <div className="glass-card h-full overflow-hidden flex flex-col">
                <div className="relative h-48 sm:h-56 flex-shrink-0 overflow-hidden">
                  <img src={PHOTOS.compare.url} alt={PHOTOS.compare.alt} className="w-full h-full object-cover" />
                </div>
                <div className="p-6 sm:p-8">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3">
                    Kenapa Jelantah Berbahaya Kalau Dipakai Terus?
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-3">
                    Setiap kali dipanaskan ulang, minyak goreng mengalami oksidasi dan polimerisasi — molekul
                    lemaknya terurai dan membentuk senyawa baru seperti akrilamida dan radikal bebas. Semakin
                    sering dipakai, semakin gelap warnanya dan semakin tinggi kandungan senyawa berbahaya ini.
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                    Selain risiko kesehatan kalau dikonsumsi lagi, jelantah yang dibuang sembarangan ke saluran
                    air juga mencemari lingkungan — lapisan minyak menghalangi oksigen masuk ke air dan memicu
                    penyumbatan pipa/drainase. Menyetorkannya ke GoJelantah memutus dua risiko ini sekaligus.
                  </p>
                </div>
              </div>
            </Reveal>

            <Reveal delay={80}>
              <div className="glass-card h-full overflow-hidden flex flex-col">
                <div className="relative h-48 sm:h-56 flex-shrink-0 overflow-hidden">
                  <img src={PHOTOS.jerrycan.url} alt={PHOTOS.jerrycan.alt} className="w-full h-full object-cover" />
                </div>
                <div className="p-6 sm:p-8">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3">
                    Kenapa Jelantah Sekarang Justru Dicari?
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-3">
                    Permintaan jelantah sebagai bahan baku biodiesel terus naik — lebih murah dan lebih ramah
                    lingkungan dibanding memakai minyak nabati segar. Semakin tinggi target campuran biodiesel
                    nasional, semakin besar juga kebutuhan bahan baku jelantah dalam jumlah konsisten.
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                    Inilah yang bikin "minyak bekas" di dapur Anda sekarang punya pembeli yang jelas dan harga
                    yang bisa dijaga — bukan sekadar sampah yang harus dibuang, tapi sumber daya dengan rantai
                    nilai yang nyata, dari dapur Anda sampai jadi bahan bakar nabati.
                  </p>
                </div>
              </div>
            </Reveal>
          </div>

          <Reveal delay={160} className="text-center">
            <Link href="/artikel" className="inline-flex items-center gap-2 text-sm font-semibold text-accent dark:text-accent-light hover:gap-3 transition-all duration-200">
              Baca artikel edukasi lainnya <ArrowRight className="w-4 h-4" />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ================= BENEFITS ================= */}
      <section className="section-tint-gold px-6 sm:px-8 py-14 sm:py-20">
        <div className="max-w-6xl mx-auto">
          <Reveal className="text-center mb-10">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">
              Kenapa Pilih{' '}
              <span className="italic font-serif text-accent dark:text-accent-light">
                GoJelantah
              </span>
            </h2>
          </Reveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {BENEFITS.map((b, i) => {
              const Icon = b.icon
              return (
                <Reveal key={b.title} delay={i * 60}>
                  <div className="glass-card p-6 h-full hover:-translate-y-1 transition-all duration-300">
                    <div className="w-10 h-10 rounded-lg bg-gold/10 dark:bg-gold/15 flex items-center justify-center mb-4">
                      <Icon className="w-5 h-5 text-gold dark:text-gold-light" />
                    </div>
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-1.5">{b.title}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{b.desc}</p>
                  </div>
                </Reveal>
              )
            })}
          </div>
        </div>
      </section>

      {/* ================= TESTIMONIALS ================= */}
      <section className="section-tint-emerald px-6 sm:px-8 py-14 sm:py-20 overflow-hidden">
        <div className="max-w-6xl mx-auto">
          <Reveal className="text-center mb-10">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">Kata Mereka</h2>
            <p className="mt-3 text-gray-600 dark:text-gray-400">Pelanggan rumahan & usaha yang udah langganan jemput jelantah.</p>
          </Reveal>

          <div className="grid sm:grid-cols-3 gap-5">
            {TESTIMONIALS.map((t, i) => (
              <Reveal key={t.name} delay={i * 80}>
                <div className="glass-card p-6 h-full">
                  <div className="flex items-center gap-1 mb-3">
                    {Array.from({ length: 5 }).map((_, idx) => (
                      <Star key={idx} className="w-3.5 h-3.5 fill-gold text-gold" />
                    ))}
                  </div>
                  <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed mb-5">&ldquo;{t.quote}&rdquo;</p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-accent to-gold flex items-center justify-center flex-shrink-0 shadow-sm">
                      <span className="text-xs font-bold text-white">{t.initials}</span>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-900 dark:text-white">{t.name}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">{t.role}</p>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ================= FAQ ================= */}
      <section className="px-6 sm:px-8 py-14 sm:py-20">
        <div className="max-w-2xl mx-auto">
          <Reveal className="text-center mb-10">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">Pertanyaan Umum</h2>
          </Reveal>
          <Reveal delay={80}>
            <FaqAccordion items={FAQ_ITEMS} />
          </Reveal>
        </div>
      </section>

      {/* ================= FINAL CTA ================= */}
      <section className="px-6 sm:px-8 py-14 sm:py-20">
        <Reveal>
          <div className="max-w-4xl mx-auto value-frame p-10 sm:p-14 text-center">
            <Recycle className="w-10 h-10 text-accent dark:text-accent-light mx-auto mb-5 animate-bob" />
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Jelantah Menumpuk di Dapur?
            </h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-xl mx-auto mb-8">
              Sekali klik, tim GoJelantah jemput ke lokasi Anda — cepat, gratis, dan langsung dibayar tunai.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link href="/reservasi" className="btn-primary inline-flex items-center gap-2 w-full sm:w-auto justify-center">
                <MessageCircle className="w-4 h-4" /> Reservasi Sekarang
              </Link>
              <a
                href={buildWhatsAppLink('Halo GoJelantah, saya mau tanya soal jemput minyak jelantah.')}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-gold inline-flex items-center gap-2 w-full sm:w-auto justify-center"
              >
                Chat WhatsApp Langsung
              </a>
            </div>
            <Link
              href="/mitra-bisnis"
              className="inline-block mt-6 text-sm font-medium text-accent dark:text-accent-light hover:underline"
            >
              Punya usaha dengan volume besar (warteg, restoran, katering)? Cek Program Mitra Bisnis →
            </Link>
          </div>
        </Reveal>
      </section>
    </>
  )
}
