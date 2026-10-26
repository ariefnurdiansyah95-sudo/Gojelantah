'use client'

import { Suspense, useMemo, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { Droplets, MapPin, CalendarClock, CheckCircle2, MessageCircle, ArrowRight, ArrowLeft, User } from 'lucide-react'
import Reveal from '@/components/Reveal'
import { SITE, buildWhatsAppLink, formatRupiah } from '@/lib/site'

const STEP_LABELS = ['Jumlah & Lokasi', 'Jadwal', 'Konfirmasi']

const TIME_SLOTS = ['08.00 – 10.00', '10.00 – 12.00', '13.00 – 15.00', '15.00 – 17.00']

function todayISO() {
  const d = new Date()
  return d.toISOString().split('T')[0]
}

// Ambil nilai `?liters=` dari URL (dikirim dari kalkulator harga di
// homepage) buat prefill langsung, biar user gak perlu input ulang dari
// nol pas lanjut ke halaman reservasi ini. `useSearchParams` wajib dibungkus
// Suspense di App Router, makanya di-split jadi komponen terpisah.
function ReservasiForm() {
  const searchParams = useSearchParams()
  const literParam = Number(searchParams.get('liters'))
  const initialLiters = literParam > 0 ? Math.min(Math.max(Math.round(literParam), 1), 500) : 10

  const [step, setStep] = useState(1)

  const [liters, setLiters] = useState(initialLiters)
  const [city, setCity] = useState<string>(SITE.serviceAreas[0])
  const [address, setAddress] = useState('')
  const [name, setName] = useState('')
  const [date, setDate] = useState(todayISO())
  const [timeSlot, setTimeSlot] = useState(TIME_SLOTS[0])

  const estimate = useMemo(() => liters * SITE.pricePerLiter, [liters])

  const canGoStep2 = address.trim().length > 3
  const canGoStep3 = date.length > 0 && timeSlot.length > 0

  const waMessage = useMemo(() => {
    return [
      `Halo GoJelantah, saya mau reservasi jemput minyak jelantah:`,
      ``,
      `Nama: ${name || '-'}`,
      `Perkiraan jumlah: ${liters} liter`,
      `Estimasi dibayar: ${formatRupiah(estimate)}`,
      `Kota: ${city}`,
      `Alamat: ${address || '-'}`,
      `Tanggal: ${date}`,
      `Jam: ${timeSlot}`,
      ``,
      `Mohon dikonfirmasi jadwalnya ya, terima kasih!`,
    ].join('\n')
  }, [name, liters, estimate, city, address, date, timeSlot])

  return (
    <div className="px-6 sm:px-8 pt-24 sm:pt-32 pb-20 max-w-3xl mx-auto">
      <Reveal className="text-center mb-10">
        <span className="badge-accent inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold border mb-4">
          <Droplets className="w-3.5 h-3.5" /> Reservasi Jemput
        </span>
        <h1 className="text-3xl sm:text-5xl font-bold text-gray-900 dark:text-white leading-tight">
          Jadwalkan Penjemputan{' '}
          <span className="italic font-serif text-accent dark:text-accent-light">
            Jelantah Anda
          </span>
        </h1>
        <p className="mt-4 text-gray-600 dark:text-gray-400 max-w-xl mx-auto">
          Isi 3 langkah singkat ini, lalu kirim ke WhatsApp tim kami untuk dikonfirmasi.
        </p>
      </Reveal>

      {/* ===== STEPPER ===== */}
      <div className="flex items-center justify-center gap-2 sm:gap-4 mb-12">
        {STEP_LABELS.map((label, i) => {
          const n = i + 1
          const active = step === n
          const done = step > n
          return (
            <div key={label} className="flex items-center gap-2 sm:gap-4">
              <div className="flex flex-col items-center gap-1.5">
                <div
                  className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 ${
                    done
                      ? 'bg-accent text-white'
                      : active
                      ? 'bg-accent text-white shadow-lg shadow-emerald-500/30 scale-110'
                      : 'bg-gray-100 dark:bg-white/5 text-gray-400 dark:text-gray-500'
                  }`}
                >
                  {done ? <CheckCircle2 className="w-4 h-4" /> : n}
                </div>
                <span className={`text-[11px] font-medium hidden sm:block ${active ? 'text-gray-900 dark:text-white' : 'text-gray-400 dark:text-gray-500'}`}>
                  {label}
                </span>
              </div>
              {n < STEP_LABELS.length && (
                <div className={`w-8 sm:w-16 h-0.5 rounded-full transition-colors duration-300 ${step > n ? 'bg-accent' : 'bg-gray-200 dark:bg-white/10'}`} />
              )}
            </div>
          )
        })}
      </div>

      {/* ===== STEP 1 ===== */}
      {step === 1 && (
        <Reveal>
          <div className="glass-card p-7 sm:p-9">
            <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
              <Droplets className="w-5 h-5 text-accent dark:text-accent-light" /> Berapa Liter & Di Mana?
            </h2>

            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              Perkiraan jumlah jelantah (liter)
            </label>
            <div className="flex items-center gap-4 mb-2">
              <input
                type="range"
                min={2}
                max={200}
                step={1}
                value={liters}
                onChange={(e) => setLiters(Number(e.target.value))}
                className="flex-1 accent-emerald-600"
              />
              <input
                type="number"
                min={1}
                value={liters}
                onChange={(e) => setLiters(Math.max(1, Number(e.target.value) || 0))}
                className="w-20 px-2 py-1.5 rounded-lg border border-gray-200 dark:border-white/10 bg-white dark:bg-white/5 text-sm text-gray-900 dark:text-white text-center focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/50"
              />
            </div>

            <div className="value-frame p-5 mb-7 flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400">Estimasi Anda terima</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{formatRupiah(estimate)}</p>
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400 text-right max-w-[40%]">
                {liters} liter × {formatRupiah(SITE.pricePerLiter)}
              </p>
            </div>

            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Kota</label>
            <div className="flex flex-wrap gap-2 mb-6">
              {SITE.serviceAreas.map((c) => (
                <button
                  key={c}
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

            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              Alamat lengkap penjemputan
            </label>
            <div className="relative mb-7">
              <MapPin className="absolute left-3.5 top-3.5 w-4 h-4 text-gray-400" />
              <textarea
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Nama jalan, nomor rumah, RT/RW, kelurahan..."
                rows={3}
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-white/5 text-sm text-gray-900 dark:text-white placeholder:text-gray-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/50 resize-none"
              />
            </div>

            <button
              onClick={() => canGoStep2 && setStep(2)}
              disabled={!canGoStep2}
              className="btn-primary w-full inline-flex items-center justify-center gap-2"
            >
              Lanjut Pilih Jadwal <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </Reveal>
      )}

      {/* ===== STEP 2 ===== */}
      {step === 2 && (
        <Reveal>
          <div className="glass-card p-7 sm:p-9">
            <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
              <CalendarClock className="w-5 h-5 text-accent dark:text-accent-light" /> Pilih Jadwal Jemput
            </h2>

            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Nama Anda</label>
            <div className="relative mb-6">
              <User className="absolute left-3.5 top-3.5 w-4 h-4 text-gray-400" />
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Nama lengkap"
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-white/5 text-sm text-gray-900 dark:text-white placeholder:text-gray-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/50"
              />
            </div>

            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Tanggal</label>
            <input
              type="date"
              value={date}
              min={todayISO()}
              onChange={(e) => setDate(e.target.value)}
              className="w-full mb-6 px-4 py-3 rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-white/5 text-sm text-gray-900 dark:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/50"
            />

            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Jam Penjemputan</label>
            <div className="grid grid-cols-2 gap-2.5 mb-8">
              {TIME_SLOTS.map((slot) => (
                <button
                  key={slot}
                  onClick={() => setTimeSlot(slot)}
                  className={`px-3 py-2.5 rounded-xl text-sm font-medium border transition-all duration-200 ${
                    timeSlot === slot
                      ? 'bg-accent text-white border-accent'
                      : 'bg-white dark:bg-white/[0.03] text-gray-700 dark:text-gray-300 border-gray-200 dark:border-white/10 hover:border-accent/40'
                  }`}
                >
                  {slot}
                </button>
              ))}
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setStep(1)}
                className="btn-accent inline-flex items-center justify-center gap-2 flex-shrink-0"
              >
                <ArrowLeft className="w-4 h-4" /> Kembali
              </button>
              <button
                onClick={() => canGoStep3 && setStep(3)}
                disabled={!canGoStep3}
                className="btn-primary flex-1 inline-flex items-center justify-center gap-2"
              >
                Lanjut Konfirmasi <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </Reveal>
      )}

      {/* ===== STEP 3 ===== */}
      {step === 3 && (
        <Reveal>
          <div className="glass-card p-7 sm:p-9">
            <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-accent dark:text-accent-light" /> Konfirmasi Reservasi
            </h2>

            <div className="space-y-3 mb-7 text-sm">
              {[
                ['Nama', name || '-'],
                ['Jumlah Jelantah', `${liters} liter`],
                ['Estimasi Dibayar', formatRupiah(estimate)],
                ['Kota', city],
                ['Alamat', address || '-'],
                ['Tanggal', date],
                ['Jam', timeSlot],
              ].map(([label, value]) => (
                <div key={label} className="flex items-start justify-between gap-4 pb-3 border-b border-gray-100 dark:border-white/5 last:border-0 last:pb-0">
                  <span className="text-gray-500 dark:text-gray-400 flex-shrink-0">{label}</span>
                  <span className="text-gray-900 dark:text-white font-medium text-right">{value}</span>
                </div>
              ))}
            </div>

            <p className="text-xs text-gray-500 dark:text-gray-400 mb-6">
              Setelah klik tombol di bawah, pesan reservasi ini otomatis tersusun dan siap dikirim ke
              WhatsApp tim GoJelantah ({SITE.whatsappLocal}) untuk dikonfirmasi.
            </p>

            <div className="flex gap-3">
              <button
                onClick={() => setStep(2)}
                className="btn-accent inline-flex items-center justify-center gap-2 flex-shrink-0"
              >
                <ArrowLeft className="w-4 h-4" /> Kembali
              </button>
              <a
                href={buildWhatsAppLink(waMessage)}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary flex-1 inline-flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4" /> Kirim Reservasi via WhatsApp
              </a>
            </div>
          </div>
        </Reveal>
      )}
    </div>
  )
}

export default function ReservasiPage() {
  return (
    <Suspense fallback={null}>
      <ReservasiForm />
    </Suspense>
  )
}
