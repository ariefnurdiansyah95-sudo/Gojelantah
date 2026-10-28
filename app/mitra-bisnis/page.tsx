'use client'

import { useState } from 'react'
import {
  Store,
  Repeat,
  TrendingUp,
  Headset,
  FileText,
  MessageCircle,
  Send,
  User,
  Building2,
} from 'lucide-react'
import Reveal from '@/components/Reveal'
import { SITE, buildWhatsAppLink, formatRupiah } from '@/lib/site'

// Segmen usaha yang jadi target program Mitra Bisnis — dipilih dari jenis
// pelanggan yang udah kebukti lewat testimoni homepage (warteg & katering)
// plus perluasan wajar (restoran, hotel, gerai street food), bukan asumsi
// sembarangan.
const TARGET_SEGMENTS = [
  'Warung / Warteg',
  'Restoran',
  'Katering',
  'Hotel & Resto Besar',
  'Gerai Gorengan / Street Food',
  'UMKM Kuliner Lainnya',
]

const BENEFITS = [
  {
    icon: Repeat,
    title: 'Jadwal Jemput Rutin',
    desc: 'Sepakati sekali siklusnya — mingguan, 2 mingguan, atau bulanan — setelah itu jemput jalan otomatis sesuai jadwal, tanpa perlu isi form reservasi manual tiap kali.',
  },
  {
    icon: TrendingUp,
    title: 'Skema Volume Besar',
    desc: 'Harga mulai Rp 7.000/liter dan sifatnya nego — volume rutin yang besar biasanya punya peluang lebih baik untuk dapat harga yang lebih tinggi, didiskusikan langsung sesuai kebutuhan usaha Anda.',
  },
  {
    icon: Headset,
    title: 'Kontak Prioritas',
    desc: 'Satu kontak WhatsApp yang sama dipakai tiap kali, direspon lebih cepat — gak perlu jelasin dari nol tiap mau jadwalin ulang.',
  },
  {
    icon: FileText,
    title: 'Rekap Penyaluran',
    desc: 'Minta rekap total liter yang sudah disetor per periode (mingguan/bulanan) — bisa dipakai untuk catatan internal usaha atau laporan keberlanjutan Anda sendiri.',
  },
]

export default function MitraBisnisPage() {
  const [businessName, setBusinessName] = useState('')
  const [businessType, setBusinessType] = useState(TARGET_SEGMENTS[0])
  const [city, setCity] = useState<string>(SITE.serviceAreas[0])
  const [volume, setVolume] = useState('')
  const [waNumber, setWaNumber] = useState('')
  const [notes, setNotes] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const waText = [
      `Halo GoJelantah, saya tertarik program Mitra Bisnis / Pelanggan Rutin:`,
      ``,
      `Nama Usaha: ${businessName || '-'}`,
      `Jenis Usaha: ${businessType}`,
      `Kota: ${city}`,
      `Estimasi Volume Jelantah: ${volume || '-'}`,
      `No. WhatsApp Usaha: ${waNumber || '-'}`,
      `Catatan: ${notes || '-'}`,
      ``,
      `Mohon info lebih lanjut soal jadwal rutin & skemanya ya. Terima kasih!`,
    ].join('\n')
    window.open(buildWhatsAppLink(waText), '_blank', 'noopener,noreferrer')
  }

  return (
    <div className="px-6 sm:px-8 pt-24 sm:pt-32 pb-20 max-w-5xl mx-auto">
      <Reveal className="text-center mb-12">
        <span className="badge-accent inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold border mb-4">
          <Building2 className="w-3.5 h-3.5" /> Mitra Bisnis
        </span>
        <h1 className="text-3xl sm:text-5xl font-bold text-gray-900 dark:text-white leading-tight">
          Mitra Bisnis &amp;{' '}
          <span className="italic font-serif text-accent dark:text-accent-light">
            Pelanggan Rutin
          </span>
        </h1>
        <p className="mt-5 text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
          Buat warteg, restoran, katering, hotel, atau usaha kuliner lain yang hasil jelantahnya
          rutin & volumenya lumayan besar — gak perlu reservasi manual tiap minggu. Sekali
          disepakati jadwalnya, GoJelantah yang jemput ke lokasi Anda secara berkala.
        </p>
      </Reveal>

      {/* ===== SIAPA YANG COCOK ===== */}
      <Reveal className="mb-12">
        <div className="flex items-center gap-2 justify-center mb-4">
          <Store className="w-4 h-4 text-accent dark:text-accent-light" />
          <h2 className="text-sm font-bold uppercase tracking-wide text-gray-500 dark:text-gray-400">
            Cocok Untuk Usaha Seperti
          </h2>
        </div>
        <div className="flex flex-wrap gap-2.5 justify-center">
          {TARGET_SEGMENTS.map((seg) => (
            <span
              key={seg}
              className="px-4 py-2 rounded-full text-sm font-medium bg-white dark:bg-white/[0.03] text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-white/10"
            >
              {seg}
            </span>
          ))}
        </div>
      </Reveal>

      {/* ===== BENEFITS ===== */}
      <div className="grid sm:grid-cols-2 gap-5 mb-14">
        {BENEFITS.map((b, i) => (
          <Reveal key={b.title} delay={i * 60}>
            <div className="glass-card p-6 h-full flex items-start gap-4">
              <div className="w-11 h-11 rounded-xl bg-emerald-500/10 flex items-center justify-center flex-shrink-0">
                <b.icon className="w-5 h-5 text-accent dark:text-accent-light" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-1.5">{b.title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{b.desc}</p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>

      {/* ===== FORM INQUIRY ===== */}
      <Reveal>
        <div className="glass-card p-7 sm:p-9 max-w-3xl mx-auto">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-1">
            Daftar Jadi Mitra
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
            Isi form ini, nanti otomatis tersusun jadi pesan WhatsApp ke tim kami buat
            didiskusikan lebih lanjut.
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Nama Usaha
                </label>
                <div className="relative">
                  <Store className="absolute left-3.5 top-3.5 w-4 h-4 text-gray-400" />
                  <input
                    required
                    type="text"
                    value={businessName}
                    onChange={(e) => setBusinessName(e.target.value)}
                    placeholder="Mis. Warteg Berkah Jaya"
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-white/5 text-sm text-gray-900 dark:text-white placeholder:text-gray-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/50"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  No. WhatsApp Usaha
                </label>
                <div className="relative">
                  <User className="absolute left-3.5 top-3.5 w-4 h-4 text-gray-400" />
                  <input
                    required
                    type="tel"
                    value={waNumber}
                    onChange={(e) => setWaNumber(e.target.value)}
                    placeholder="08xxxxxxxxxx"
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-white/5 text-sm text-gray-900 dark:text-white placeholder:text-gray-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/50"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Jenis Usaha
              </label>
              <div className="flex flex-wrap gap-2">
                {TARGET_SEGMENTS.map((seg) => (
                  <button
                    key={seg}
                    type="button"
                    onClick={() => setBusinessType(seg)}
                    className={`px-3.5 py-1.5 rounded-full text-sm font-medium border transition-all duration-200 ${
                      businessType === seg
                        ? 'bg-accent text-white border-accent'
                        : 'bg-white dark:bg-white/[0.03] text-gray-700 dark:text-gray-300 border-gray-200 dark:border-white/10 hover:border-accent/40'
                    }`}
                  >
                    {seg}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Kota
                </label>
                <div className="flex flex-wrap gap-2">
                  {SITE.serviceAreas.map((c) => (
                    <button
                      key={c}
                      type="button"
                      onClick={() => setCity(c)}
                      className={`px-3.5 py-1.5 rounded-full text-sm font-medium border transition-all duration-200 ${
                        city === c
                          ? 'bg-accent text-white border-accent'
                          : 'bg-white dark:bg-white/[0.03] text-gray-700 dark:text-gray-300 border-gray-200 dark:border-white/10 hover:border-accent/40'
                      }`}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Estimasi Volume Jelantah
                </label>
                <input
                  type="text"
                  value={volume}
                  onChange={(e) => setVolume(e.target.value)}
                  placeholder="Mis. ~50 liter / minggu"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-white/5 text-sm text-gray-900 dark:text-white placeholder:text-gray-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/50"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Catatan Tambahan <span className="text-gray-400 font-normal">(opsional)</span>
              </label>
              <textarea
                rows={3}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Mis. jadwal yang diinginkan, kondisi lokasi, dll"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-white/5 text-sm text-gray-900 dark:text-white placeholder:text-gray-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/50 resize-none"
              />
            </div>

            <div className="value-frame px-4 py-3 text-xs text-gray-600 dark:text-gray-300">
              Harga dasar mulai <strong>{formatRupiah(SITE.pricePerLiter)}/liter</strong> (nego),
              tanpa syarat minimum — skema harga untuk volume rutin besar akan dibahas
              langsung lewat WhatsApp setelah form ini dikirim.
            </div>

            <button type="submit" className="btn-primary w-full inline-flex items-center justify-center gap-2">
              <Send className="w-4 h-4" /> Kirim via WhatsApp
            </button>
            <p className="text-xs text-center text-gray-400 dark:text-gray-500">
              Bukan mau daftar jadi mitra rutin? Reservasi sekali-jemput tetap bisa lewat{' '}
              <a href="/reservasi" className="underline hover:text-accent dark:hover:text-accent-light">
                halaman Reservasi
              </a>
              , atau tanya-tanya dulu lewat{' '}
              <a
                href={buildWhatsAppLink('Halo GoJelantah, saya mau tanya-tanya soal program Mitra Bisnis.')}
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-accent dark:hover:text-accent-light inline-flex items-center gap-1"
              >
                WhatsApp <MessageCircle className="w-3 h-3" />
              </a>
              .
            </p>
          </form>
        </div>
      </Reveal>
    </div>
  )
}
