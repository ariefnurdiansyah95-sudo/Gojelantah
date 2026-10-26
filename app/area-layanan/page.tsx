'use client'

import { useState } from 'react'
import Link from 'next/link'
import { MapPin, Leaf, Clock, ShieldCheck, Sparkles, MessageCircle, ArrowRight } from 'lucide-react'
import Reveal from '@/components/Reveal'
import { buildWhatsAppLink } from '@/lib/site'

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

export default function AreaLayananPage() {
  const cities = Object.keys(AREAS)
  const [activeCity, setActiveCity] = useState(cities[0])

  return (
    <div className="px-6 sm:px-8 pt-24 sm:pt-32 pb-16 max-w-5xl mx-auto">
      <Reveal className="text-center mb-10">
        <span className="badge-accent inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold border mb-4">
          <MapPin className="w-3.5 h-3.5" /> Area Layanan
        </span>
        <h1 className="text-3xl sm:text-5xl font-bold text-gray-900 dark:text-white leading-tight">
          Kami Jemput Jelantah{' '}
          <span className="italic font-serif text-accent dark:text-accent-light">
            Se-Jabodetabek
          </span>
        </h1>
        <p className="mt-5 text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
          Pilih kota Anda untuk lihat cakupan wilayah penjemputan GoJelantah.
        </p>
      </Reveal>

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

      <Reveal delay={60}>
        <div className="glass-card p-7 sm:p-9 mb-14">
          <div className="flex items-center gap-2 mb-5">
            <MapPin className="w-5 h-5 text-accent dark:text-accent-light" />
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Wilayah {activeCity}</h2>
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

      <Reveal className="text-center mb-10">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">Keunggulan Layanan Kami</h2>
      </Reveal>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-14">
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

      <Reveal>
        <div className="value-frame p-10 sm:p-12 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Lokasi Anda Ada di Jabodetabek?
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-lg mx-auto mb-7">
            Kalau begitu, GoJelantah bisa jemput jelantah Anda. Reservasi sekarang, jadwalkan sesuai waktu luang Anda.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link href="/reservasi" className="btn-primary inline-flex items-center gap-2 w-full sm:w-auto justify-center">
              <MessageCircle className="w-4 h-4" /> Reservasi Sekarang <ArrowRight className="w-4 h-4" />
            </Link>
            <a
              href={buildWhatsAppLink('Halo GoJelantah, saya mau tanya apakah lokasi saya masuk area layanan.')}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-accent inline-flex items-center gap-2 w-full sm:w-auto justify-center"
            >
              Tanya Dulu Lewat WA
            </a>
          </div>
        </div>
      </Reveal>
    </div>
  )
}
