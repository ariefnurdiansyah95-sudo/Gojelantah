'use client'

// Dipindahkan dari halaman /area-layanan (kini dihapus) ke sini — request
// user: menu "Area Layanan" di navbar dihapus, isinya digabung langsung ke
// beranda, ditaruh setelah kalkulator harga, biar pengunjung gak perlu
// pindah halaman buat ngecek apakah lokasinya kejangkau.

import { useState } from 'react'
import { MapPin, Leaf, Clock, ShieldCheck, Sparkles, Warehouse, Navigation, ExternalLink } from 'lucide-react'
import Reveal from '@/components/Reveal'
import { SITE } from '@/lib/site'

// Link Maps gudang pusat dibangun dari alamat SITE.address (sumber tunggal
// yang sama dipakai di footer/kontak) — bukan link share.google yang
// dikasih user, karena link share.google itu personal/redirect dan gak
// bisa dijadiin query embed/arah yang stabil. Pola `?q=...&output=embed`
// (tanpa API key) sama kayak peta per-kota di bawah; dua link aksi
// (`maps/search` & `maps/dir`) pakai format resmi Google "Maps URLs" biar
// selalu valid dibuka di app Maps manapun (web, Android, iOS).
const WAREHOUSE_QUERY = encodeURIComponent(SITE.address)
const WAREHOUSE_MAP_EMBED = `https://www.google.com/maps?q=${WAREHOUSE_QUERY}&output=embed`
const WAREHOUSE_MAP_OPEN = `https://www.google.com/maps/search/?api=1&query=${WAREHOUSE_QUERY}`
const WAREHOUSE_MAP_DIRECTIONS = `https://www.google.com/maps/dir/?api=1&destination=${WAREHOUSE_QUERY}`

const AREAS: Record<string, string[]> = {
  Jakarta: ['Jakarta Timur', 'Jakarta Selatan', 'Jakarta Barat', 'Jakarta Pusat', 'Jakarta Utara'],
  Bogor: ['Bogor Kota', 'Cibinong', 'Parung', 'Ciomas', 'Citeureup', 'Gunung Sindur'],
  Depok: ['Beji', 'Cimanggis', 'Sawangan', 'Cinere', 'Cilodong', 'Cipayung'],
  Tangerang: ['Tangerang Kota', 'Tangerang Selatan', 'Serpong', 'BSD', 'Ciledug', 'Cikokol'],
  Bekasi: ['Bekasi Kota', 'Bekasi Timur', 'Cikarang', 'Tambun', 'Jatiasih', 'Jatibening'],
}

const ADVANTAGES = [
  { icon: Leaf, title: 'Ramah Lingkungan', desc: 'Setiap liter yang dijemput diproses ulang, bukan dibuang ke saluran air.' },
  { icon: Clock, title: 'Fleksibel & Efisien', desc: 'Jadwal jemput disesuaikan dengan waktu luang Anda, bukan sebaliknya.' },
  { icon: Sparkles, title: 'Proses yang Inovatif', desc: 'Jelantah diolah jadi biodiesel dengan standar penyaringan yang konsisten.' },
  { icon: ShieldCheck, title: 'Terpercaya', desc: 'Timbangan transparan, pembayaran tunai langsung di lokasi, tanpa drama.' },
]

export default function AreaLayananSection() {
  const cities = Object.keys(AREAS)
  const [activeCity, setActiveCity] = useState(cities[0])

  return (
    <section id="area-layanan" className="section-tint-gold px-6 sm:px-8 py-14 sm:py-20 scroll-mt-24">
      <div className="max-w-5xl mx-auto">
        <Reveal className="text-center mb-10">
          <span className="badge-accent inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold border mb-4">
            <MapPin className="w-3.5 h-3.5" /> Area Layanan
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">
            Kami Jemput{' '}
            <span className="italic font-serif text-accent dark:text-accent-light">Se-Jabodetabek</span>
          </h2>
          <p className="mt-3 text-gray-600 dark:text-gray-400 max-w-xl mx-auto">
            Pilih kota Anda untuk lihat cakupan wilayah penjemputan GoJelantah.
          </p>
        </Reveal>

        {/* Urutan: pilih kota + peta cakupan wilayah DULUAN (ini yang paling
            relevan buat pengunjung — "apa lokasi saya kejangkau?"), baru
            KARTU GUDANG PUSAT di bawahnya sebagai info pelengkap/titik
            serah-terima. Dibalik urutannya sesuai request user (sebelumnya
            kartu gudang ada di atas, kebalik). */}
        <Reveal>
          <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
            {cities.map((city) => (
              <button
                key={city}
                onClick={() => setActiveCity(city)}
                className={`px-4 py-2 rounded-full text-sm font-semibold border transition-all duration-200 ${
                  activeCity === city
                    ? 'bg-accent text-white border-accent shadow-md shadow-emerald-500/20'
                    : 'bg-white dark:bg-white/[0.03] text-gray-700 dark:text-gray-300 border-gray-200 dark:border-white/10 hover:border-accent/40'
                }`}
              >
                {city}
              </button>
            ))}
          </div>
        </Reveal>

        <Reveal delay={30}>
          <div className="glass-card p-7 sm:p-9 mb-10">
            <div className="flex items-center gap-2 mb-5">
              <MapPin className="w-5 h-5 text-accent dark:text-accent-light" />
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">Wilayah {activeCity}</h3>
            </div>
            <div className="flex flex-wrap gap-2.5">
              {AREAS[activeCity].map((area) => (
                <span
                  key={area}
                  className="badge-accent px-3.5 py-1.5 rounded-full text-sm font-medium border"
                >
                  {area}
                </span>
              ))}
            </div>

            {/* Peta interaktif — ikut update sesuai kota yang dipilih di atas,
                pakai Google Maps embed tanpa API key (mode `output=embed`). */}
            <div className="mt-7 rounded-2xl overflow-hidden border border-gray-200 dark:border-white/10 shadow-sm">
              <iframe
                key={activeCity}
                title={`Peta cakupan area ${activeCity}`}
                src={`https://www.google.com/maps?q=${encodeURIComponent(`${activeCity}, Jabodetabek, Indonesia`)}&output=embed`}
                width="100%"
                height="340"
                style={{ border: 0 }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-[340px] sm:h-[400px]"
              />
            </div>
            <p className="mt-3 text-xs text-gray-500 dark:text-gray-400">
              Peta di atas nunjukin area {activeCity} secara umum — titik penjemputan tetap disesuaikan
              dengan alamat lengkap yang Anda kirim saat reservasi.
            </p>

            <p className="mt-6 text-sm text-gray-500 dark:text-gray-400">
              Lokasi Anda di {activeCity} tidak ada di daftar? Tetap chat kami — area baru selalu kami
              pertimbangkan selama masih bisa dijangkau armada.
            </p>
          </div>
        </Reveal>

        {/* Gudang pusat — titik asal semua armada penjemputan GoJelantah.
            Framenya sengaja disamain `.glass-card` kayak kartu Wilayah di
            atas (sebelumnya pakai `.frame-card` yang lebih "nonjol"/beda
            gaya — user minta disamain biar konsisten, translucent kayak
            kartu-kartu lain di section ini). */}
        <Reveal delay={60}>
          <div className="glass-card p-7 sm:p-9 mb-10">
            <div className="flex items-center gap-2 mb-2">
              <Warehouse className="w-5 h-5 text-accent dark:text-accent-light" />
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">Gudang Pusat GoJelantah</h3>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed max-w-2xl">
              Semua jadwal & armada penjemputan dikoordinasikan dari sini. Alamat ini juga jadi titik
              serah terima kalau Anda lebih suka antar sendiri daripada dijemput.
            </p>
            <p className="mt-3 text-sm font-medium text-gray-800 dark:text-gray-200 flex items-start gap-2">
              <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0 text-accent dark:text-accent-light" />
              {SITE.address}
            </p>

            <div className="mt-5 rounded-2xl overflow-hidden border border-gray-200 dark:border-white/10 shadow-sm">
              <iframe
                title="Peta lokasi gudang pusat GoJelantah"
                src={WAREHOUSE_MAP_EMBED}
                width="100%"
                height="340"
                style={{ border: 0 }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-[340px] sm:h-[400px]"
              />
            </div>

            <div className="mt-5 flex flex-wrap gap-3">
              <a
                href={WAREHOUSE_MAP_DIRECTIONS}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-gradient-to-r from-accent to-accent-light text-white text-sm font-semibold hover:brightness-110 active:scale-[0.97] transition-all duration-200"
              >
                <Navigation className="w-4 h-4" /> Rute ke Sini
              </a>
              <a
                href={WAREHOUSE_MAP_OPEN}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full border border-gray-200 dark:border-white/15 text-gray-700 dark:text-gray-200 text-sm font-semibold hover:border-accent/40 hover:text-accent dark:hover:text-accent-light transition-all duration-200"
              >
                <ExternalLink className="w-4 h-4" /> Buka di Google Maps
              </a>
            </div>
          </div>
        </Reveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {ADVANTAGES.map((a, i) => {
            const Icon = a.icon
            return (
              <Reveal key={a.title} delay={i * 70}>
                <div className="glass-card p-6 h-full text-center">
                  <div className="w-10 h-10 rounded-lg bg-gold/10 dark:bg-gold/15 flex items-center justify-center mb-4 mx-auto">
                    <Icon className="w-5 h-5 text-gold dark:text-gold-light" />
                  </div>
                  <h3 className="font-semibold text-sm text-gray-900 dark:text-white mb-1.5">{a.title}</h3>
                  <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">{a.desc}</p>
                </div>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
