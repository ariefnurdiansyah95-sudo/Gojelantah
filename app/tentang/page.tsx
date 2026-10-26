import type { Metadata } from 'next'
import { Target, Compass, Factory, Filter, FlaskConical, AlertTriangle, Leaf, HeartHandshake } from 'lucide-react'
import Reveal from '@/components/Reveal'
import { PHOTOS } from '@/lib/photos'

export const metadata: Metadata = {
  title: 'Tentang Kami',
  description:
    'GoJelantah mengelola minyak jelantah se-Jabodetabek secara berkelanjutan — dari penjemputan, penyaringan, hingga diproses menjadi biodiesel.',
}

const MISSION = [
  {
    icon: Filter,
    title: 'Mengumpulkan Secara Bertanggung Jawab',
    desc: 'Menjemput jelantah langsung dari rumah tangga, warung, resto, dan dapur katering se-Jabodetabek — gratis, tanpa ribet.',
  },
  {
    icon: FlaskConical,
    title: 'Mengolah Jadi Bernilai',
    desc: 'Jelantah yang terkumpul disaring ulang lalu diproses menjadi biodiesel — bahan bakar nabati yang lebih ramah lingkungan.',
  },
  {
    icon: HeartHandshake,
    title: 'Membayar Setara',
    desc: 'Setiap liter yang dijemput dibayar tunai dengan harga flat, karena kami percaya jelantah Anda layak dihargai.',
  },
]

const PROCESS = [
  'Dijemput dari rumah tangga, pedagang kaki lima, resto, hingga industri makanan skala besar.',
  'Disaring & dimurnikan untuk memisahkan ampas, air, dan kotoran dari minyak.',
  'Diekspor atau diproses lebih lanjut menjadi biodiesel — sebagian kecil juga dimanfaatkan untuk bahan baku sabun, pelumas, lilin, hingga kosmetik.',
]

export default function TentangPage() {
  return (
    <div className="px-6 sm:px-8 pt-24 sm:pt-32 pb-16 max-w-5xl mx-auto">
      <Reveal className="text-center mb-12">
        <span className="badge-accent inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold border mb-4">
          <Leaf className="w-3.5 h-3.5" /> Tentang GoJelantah
        </span>
        <h1 className="text-3xl sm:text-5xl font-bold text-gray-900 dark:text-white leading-tight">
          Mengubah Minyak Bekas Jadi{' '}
          <span className="italic font-serif text-accent dark:text-accent-light">
            Sumber Daya Baru
          </span>
        </h1>
        <p className="mt-5 text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
          GoJelantah hadir untuk menjembatani dapur rumah tangga dan usaha kuliner se-Jabodetabek dengan
          pengelolaan minyak jelantah yang bersih, adil, dan berkelanjutan.
        </p>
      </Reveal>

      <div className="grid sm:grid-cols-2 gap-5 mb-14">
        <Reveal>
          <div className="glass-card p-7 h-full">
            <div className="w-11 h-11 rounded-xl bg-accent/10 dark:bg-accent/15 flex items-center justify-center mb-4">
              <Compass className="w-5 h-5 text-accent dark:text-accent-light" />
            </div>
            <h2 className="font-semibold text-lg text-gray-900 dark:text-white mb-2">Visi Kami</h2>
            <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
              Menjadi mitra terpercaya nomor satu dalam pengelolaan minyak jelantah yang berkelanjutan di
              Jabodetabek — membuat setiap tetes jelantah punya nilai dan tujuan baru.
            </p>
          </div>
        </Reveal>
        <Reveal delay={80}>
          <div className="glass-card p-7 h-full">
            <div className="w-11 h-11 rounded-xl bg-gold/10 dark:bg-gold/15 flex items-center justify-center mb-4">
              <Target className="w-5 h-5 text-gold dark:text-gold-light" />
            </div>
            <h2 className="font-semibold text-lg text-gray-900 dark:text-white mb-2">Misi Kami</h2>
            <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
              Menjemput, mengolah, dan menyalurkan minyak jelantah secara transparan — sambil memberi nilai
              ekonomi yang adil ke setiap rumah tangga dan pelaku usaha yang mempercayakan jelantahnya ke kami.
            </p>
          </div>
        </Reveal>
      </div>

      <Reveal className="text-center mb-10">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">Tiga Pilar Kerja Kami</h2>
      </Reveal>
      <div className="grid sm:grid-cols-3 gap-5 mb-14">
        {MISSION.map((m, i) => {
          const Icon = m.icon
          return (
            <Reveal key={m.title} delay={i * 80}>
              <div className="glass-card p-6 h-full text-center">
                <div className="w-11 h-11 rounded-xl bg-accent/10 dark:bg-accent/15 flex items-center justify-center mb-4 mx-auto">
                  <Icon className="w-5 h-5 text-accent dark:text-accent-light" />
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-1.5">{m.title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{m.desc}</p>
              </div>
            </Reveal>
          )
        })}
      </div>

      <Reveal>
        <div className="glass-card overflow-hidden mb-14 grid lg:grid-cols-[0.8fr_1.2fr]">
          <div className="relative h-56 lg:h-auto overflow-hidden">
            <img src={PHOTOS.proses.url} alt={PHOTOS.proses.alt} className="w-full h-full object-cover" />
          </div>
          <div className="p-8 sm:p-10">
            <div className="flex items-center gap-3 mb-6">
              <Factory className="w-6 h-6 text-accent dark:text-accent-light" />
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Dari Dapur Sampai Jadi Biodiesel</h2>
            </div>
            <ol className="space-y-4">
              {PROCESS.map((step, i) => (
                <li key={step} className="flex items-start gap-4">
                  <span className="flex-shrink-0 w-7 h-7 rounded-full bg-accent text-white text-xs font-bold flex items-center justify-center mt-0.5">
                    {i + 1}
                  </span>
                  <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300 leading-relaxed pt-0.5">{step}</p>
                </li>
              ))}
            </ol>
            <p className="mt-5 text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
              Permintaan jelantah sebagai bahan baku biodiesel terus naik seiring target campuran biodiesel
              nasional yang makin tinggi — jelantah jadi alternatif yang lebih murah dan ramah lingkungan
              dibanding minyak nabati segar. Inilah yang membuat GoJelantah berani membayar tunai untuk
              setiap liter yang Anda setorkan, karena di ujung rantai pasokan, jelantah ini benar-benar
              terpakai, bukan sekadar terkumpul.
            </p>
          </div>
        </div>
      </Reveal>

      <Reveal>
        <div className="glass-card overflow-hidden border-amber-300/50 dark:border-amber-500/20 grid lg:grid-cols-[1.2fr_0.8fr]">
          <div className="p-8 sm:p-10 order-2 lg:order-1">
            <div className="flex items-center gap-3 mb-4">
              <AlertTriangle className="w-6 h-6 text-amber-500" />
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
                Kenapa Jelantah Gak Boleh Dipakai Berulang?
              </h2>
            </div>
            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
              Minyak yang dipanaskan berulang kali mengalami oksidasi dan membentuk senyawa seperti akrilamida
              serta radikal bebas, yang jika terus dikonsumsi berisiko bagi kesehatan jantung dan pencernaan.
              Semakin sering dipakai, warnanya makin gelap dan kandungan senyawa berbahayanya makin tinggi —
              tanda paling gampang dikenali adalah warna cokelat kehitaman, bau tengik, dan tekstur yang
              lebih kental dari minyak baru.
            </p>
            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 leading-relaxed">
              Menyetor jelantah ke GoJelantah bukan cuma soal kebersihan dapur — ini langkah kecil yang
              melindungi kesehatan keluarga sekaligus lingkungan sekitar, sekaligus mengubah minyak yang
              tadinya jadi masalah menjadi pemasukan tambahan yang rutin.
            </p>
          </div>
          <div className="relative h-56 lg:h-auto order-1 lg:order-2 overflow-hidden">
            <img src={PHOTOS.gorengan.url} alt={PHOTOS.gorengan.alt} className="w-full h-full object-cover" />
          </div>
        </div>
      </Reveal>
    </div>
  )
}
