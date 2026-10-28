'use client'

import { Suspense, useMemo, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { Droplets, MapPin, CalendarClock, CheckCircle2, MessageCircle, ArrowRight, ArrowLeft, User, Wallet, Star } from 'lucide-react'
import Reveal from '@/components/Reveal'
import { SITE, buildWhatsAppLink, formatRupiah } from '@/lib/site'

const STEP_LABELS = ['Jumlah & Lokasi', 'Jadwal', 'Konfirmasi']

const TIME_SLOTS = ['08.00 – 10.00', '10.00 – 12.00', '13.00 – 15.00', '15.00 – 17.00']

// Opsi metode pembayaran — sengaja TIDAK nampilin nomor rekening/e-wallet
// asli di web (keputusan user): buat Transfer/E-Wallet, detail nomor
// rekening/akun dikonfirmasi admin langsung via WhatsApp pas reservasi
// dijadwalkan, bukan dicantumin publik di sini.
const PAYMENT_METHODS = ['Tunai (Cash)', 'Transfer Bank', 'E-Wallet (GoPay/OVO/DANA, dll)']

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

  // Alamat dipecah jadi field-field terpisah (bukan 1 textarea bebas lagi)
  // biar user tinggal isi per-bagian, gak perlu mikirin format/urutan
  // penulisan alamat sendiri — lebih cepet diisi & lebih gampang dibaca
  // driver pas jemput.
  const [streetName, setStreetName] = useState('')
  const [houseNumber, setHouseNumber] = useState('')
  const [rt, setRt] = useState('')
  const [rw, setRw] = useState('')
  const [patokan, setPatokan] = useState('')

  const [name, setName] = useState('')
  const [date, setDate] = useState(todayISO())
  const [timeSlot, setTimeSlot] = useState(TIME_SLOTS[0])
  const [paymentMethod, setPaymentMethod] = useState(PAYMENT_METHODS[0])

  const estimate = useMemo(() => liters * SITE.pricePerLiter, [liters])

  // Rangkai semua field alamat jadi satu string rapi — ini yang dipakai di
  // ringkasan step 3 & pesan WhatsApp, user gak perlu susun sendiri.
  const address = useMemo(() => {
    const line1Parts = [streetName.trim()]
    if (houseNumber.trim()) line1Parts.push(`No. ${houseNumber.trim()}`)
    const line1 = line1Parts.filter(Boolean).join(' ')

    const rtRw = [rt.trim() ? `RT ${rt.trim()}` : '', rw.trim() ? `RW ${rw.trim()}` : '']
      .filter(Boolean)
      .join('/')

    const mainParts = [line1, rtRw, city].filter(Boolean)
    let full = mainParts.join(', ')
    if (patokan.trim()) full += ` (Patokan: ${patokan.trim()})`
    return full
  }, [streetName, houseNumber, rt, rw, patokan, city])

  const canGoStep2 = streetName.trim().length > 2 && houseNumber.trim().length > 0
  const canGoStep3 = date.length > 0 && timeSlot.length > 0

  const waMessage = useMemo(() => {
    return [
      `Halo GoJelantah, saya mau reservasi jemput minyak jelantah:`,
      ``,
      `Nama: ${name || '-'}`,
      `Perkiraan jumlah: ${liters} liter`,
      `Estimasi awal: ${formatRupiah(estimate)} (bisa nego di tempat)`,
      `Kota: ${city}`,
      `Alamat: ${address || '-'}`,
      `Tanggal: ${date}`,
      `Jam: ${timeSlot}`,
      `Metode Pembayaran: ${paymentMethod}`,
      ``,
      `Mohon dikonfirmasi jadwalnya ya, terima kasih!`,
    ].join('\n')
  }, [name, liters, estimate, city, address, date, timeSlot, paymentMethod])

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

            <div className="value-frame p-5 mb-2 flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400">Estimasi awal</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{formatRupiah(estimate)}</p>
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400 text-right max-w-[40%]">
                {liters} liter × mulai {formatRupiah(SITE.pricePerLiter)}
              </p>
            </div>
            <p className="text-[11px] text-gray-400 dark:text-gray-500 mb-7">
              Harga final bisa nego di tempat, tergantung kondisi & volume jelantah.
            </p>

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

            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-accent dark:text-accent-light" /> Alamat Penjemputan
            </label>
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-3 -mt-1">
              Isi per-bagian aja, nanti otomatis kami susun jadi alamat lengkap.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-[1fr_auto] gap-3 mb-3">
              <div>
                <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1.5">
                  Nama Jalan
                </label>
                <input
                  type="text"
                  value={streetName}
                  onChange={(e) => setStreetName(e.target.value)}
                  placeholder="Mis. Jl. Mawar Raya"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-white/5 text-sm text-gray-900 dark:text-white placeholder:text-gray-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/50"
                />
              </div>
              <div className="sm:w-28">
                <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1.5">
                  No. Rumah
                </label>
                <input
                  type="text"
                  value={houseNumber}
                  onChange={(e) => setHouseNumber(e.target.value)}
                  placeholder="12A"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-white/5 text-sm text-gray-900 dark:text-white placeholder:text-gray-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/50"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 mb-3">
              <div>
                <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1.5">
                  RT <span className="text-gray-400 font-normal">(opsional)</span>
                </label>
                <input
                  type="text"
                  inputMode="numeric"
                  value={rt}
                  onChange={(e) => setRt(e.target.value)}
                  placeholder="005"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-white/5 text-sm text-gray-900 dark:text-white placeholder:text-gray-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/50"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1.5">
                  RW <span className="text-gray-400 font-normal">(opsional)</span>
                </label>
                <input
                  type="text"
                  inputMode="numeric"
                  value={rw}
                  onChange={(e) => setRw(e.target.value)}
                  placeholder="003"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-white/5 text-sm text-gray-900 dark:text-white placeholder:text-gray-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/50"
                />
              </div>
            </div>

            <div className="mb-3">
              <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1.5">
                Patokan <span className="text-gray-400 font-normal">(opsional, biar driver gampang nyari)</span>
              </label>
              <input
                type="text"
                value={patokan}
                onChange={(e) => setPatokan(e.target.value)}
                placeholder="Mis. Sebelah minimarket, dekat masjid Al-Ikhlas"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-white/5 text-sm text-gray-900 dark:text-white placeholder:text-gray-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/50"
              />
            </div>

            {(streetName.trim() || houseNumber.trim()) && (
              <div className="value-frame px-4 py-3 mb-7 text-xs text-gray-600 dark:text-gray-300">
                <span className="font-semibold text-gray-500 dark:text-gray-400">Preview alamat: </span>
                {address}
              </div>
            )}
            {!(streetName.trim() || houseNumber.trim()) && <div className="mb-7" />}

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

            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 flex items-center gap-1.5">
              <Wallet className="w-3.5 h-3.5 text-accent dark:text-accent-light" /> Metode Pembayaran
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 mb-3">
              {PAYMENT_METHODS.map((method) => (
                <button
                  key={method}
                  onClick={() => setPaymentMethod(method)}
                  className={`px-3 py-2.5 rounded-xl text-sm font-medium border transition-all duration-200 text-center ${
                    paymentMethod === method
                      ? 'bg-accent text-white border-accent'
                      : 'bg-white dark:bg-white/[0.03] text-gray-700 dark:text-gray-300 border-gray-200 dark:border-white/10 hover:border-accent/40'
                  }`}
                >
                  {method}
                </button>
              ))}
            </div>
            {paymentMethod !== PAYMENT_METHODS[0] && (
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-8 -mt-1">
                Nomor rekening/e-wallet akan dikonfirmasi admin kami langsung lewat WhatsApp
                saat reservasi Anda dijadwalkan — bayar tunai tetap bisa dipilih kapan saja.
              </p>
            )}
            {paymentMethod === PAYMENT_METHODS[0] && <div className="mb-8" />}

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
                ['Estimasi Awal', `${formatRupiah(estimate)} (nego)`],
                ['Kota', city],
                ['Alamat', address || '-'],
                ['Tanggal', date],
                ['Jam', timeSlot],
                ['Metode Pembayaran', paymentMethod],
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

            {/* Ajakan ulasan Google — SENGAJA opsional, bukan syarat buat lanjut
                kirim reservasi (keputusan user, 2026-10-28). Link-nya buka
                halaman tulis-ulasan RESMI Google (format g.page/r/.../review)
                di tab baru — rating & komentarnya diisi pengunjung sendiri
                lewat akun Google mereka, bukan dikirim dari form di web ini. */}
            <div className="rounded-2xl border border-gold/25 dark:border-gold/15 bg-gold/5 dark:bg-gold/[0.04] px-4 py-3.5 mb-6 flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-gold/15 dark:bg-gold/15 flex items-center justify-center flex-shrink-0">
                <Star className="w-4 h-4 text-gold dark:text-gold-light" fill="currentColor" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold text-gray-800 dark:text-gray-200">
                  Suka sama layanan kami?
                </p>
                <p className="text-[11px] text-gray-500 dark:text-gray-400">
                  Bantu kami lewat rating &amp; ulasan asli di Google Maps (opsional).
                </p>
              </div>
              <a
                href={SITE.googleReviewUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-shrink-0 text-xs font-semibold text-gold dark:text-gold-light hover:underline whitespace-nowrap"
              >
                Tulis Ulasan →
              </a>
            </div>

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
