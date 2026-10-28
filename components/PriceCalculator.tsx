'use client'

import Link from 'next/link'
import { useMemo, useState } from 'react'
import { Calculator, MessageCircle, ArrowRight, Droplets } from 'lucide-react'
import { SITE, buildWhatsAppLink, formatRupiah } from '@/lib/site'

const PRESETS = [5, 10, 25, 50, 100]
const MIN_LITERS = 2
const MAX_LITERS = 200

// Kalkulator estimasi harga — didesain ulang total (sebelumnya pakai
// `.value-frame`, kotak krem/emas yang dibuat buat CTA akhir halaman, jadi
// nabrak banget sama background hijau di sekeliling + slider bawaan
// browser yang polos). Sekarang: kartu kaca hijau senada (`glass-card`),
// slider custom (`.calc-slider`, lihat globals.css), chip preset liter
// buat 1-klik, dan hasil estimasi ditonjolkan di panel terpisah — pola
// "kalkulator app finansial modern", bukan form HTML polos.
export default function PriceCalculator() {
  const [liters, setLiters] = useState(10)
  const estimate = useMemo(() => liters * SITE.pricePerLiter, [liters])
  const fillPct = useMemo(
    () => ((liters - MIN_LITERS) / (MAX_LITERS - MIN_LITERS)) * 100,
    [liters]
  )

  const waMessage = useMemo(
    () =>
      `Halo GoJelantah, saya mau reservasi jemput minyak jelantah sekitar ${liters} liter (estimasi awal ${formatRupiah(
        estimate
      )}, bisa nego).`,
    [liters, estimate]
  )

  return (
    <div className="frame-card p-7 sm:p-10">
      {/* Aksen garis gradient tipis di tepi atas — sentuhan brand di kartu
          yang sengaja dibuat bersih/putih, biar tetep kerasa "GoJelantah"
          tanpa bikin frame-nya ramai lagi. */}
      <div className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-accent via-accent-light to-gold" />
      <div className="absolute -top-24 -right-20 h-64 w-64 rounded-full bg-accent/10 dark:bg-accent/10 blur-[110px] pointer-events-none" />
      <div className="absolute -bottom-24 -left-16 h-56 w-56 rounded-full bg-gold/10 dark:bg-gold/[0.06] blur-[110px] pointer-events-none" />

      <div className="relative grid lg:grid-cols-[1.15fr_0.85fr] gap-8 lg:gap-10 items-center">
        {/* ===== KONTROL ===== */}
        <div>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-accent/10 dark:bg-accent/15 flex items-center justify-center flex-shrink-0">
              <Calculator className="w-5 h-5 text-accent dark:text-accent-light" />
            </div>
            <div>
              <p className="text-sm font-bold text-gray-900 dark:text-white">Perkiraan Jumlah Jelantah</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">Geser, ketik, atau pilih langsung di bawah</p>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mb-7">
            {PRESETS.map((v) => (
              <button
                key={v}
                type="button"
                onClick={() => setLiters(v)}
                className={`px-3.5 py-1.5 rounded-full text-sm font-semibold border transition-all duration-200 ${
                  liters === v
                    ? 'bg-accent text-white border-accent shadow-md shadow-emerald-500/20'
                    : 'bg-white/70 dark:bg-white/[0.04] text-gray-700 dark:text-gray-300 border-gray-200 dark:border-white/10 hover:border-accent/40'
                }`}
              >
                {v} L
              </button>
            ))}
          </div>

          <div className="flex items-center gap-4 mb-2.5">
            <input
              type="range"
              min={MIN_LITERS}
              max={MAX_LITERS}
              step={1}
              value={liters}
              onChange={(e) => setLiters(Number(e.target.value))}
              style={{ ['--fill' as string]: `${fillPct}%` }}
              className="calc-slider flex-1"
              aria-label="Perkiraan jumlah liter jelantah"
            />
            <div className="flex items-center gap-1 rounded-xl border border-gray-200 dark:border-white/10 bg-white/70 dark:bg-white/5 px-3 py-2 flex-shrink-0">
              <input
                type="number"
                min={1}
                value={liters}
                onChange={(e) => setLiters(Math.max(1, Number(e.target.value) || 0))}
                className="w-10 bg-transparent text-sm font-semibold text-gray-900 dark:text-white text-center focus:outline-none"
              />
              <span className="text-xs text-gray-500 dark:text-gray-400">L</span>
            </div>
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            {MIN_LITERS}–{MAX_LITERS} liter · harga mulai {formatRupiah(SITE.pricePerLiter)}/liter (nego), berapa pun jumlahnya.
          </p>
        </div>

        {/* ===== HASIL ===== */}
        <div className="relative rounded-2xl bg-gradient-to-br from-accent/15 via-accent/5 to-gold/10 dark:from-accent/15 dark:via-accent/5 dark:to-gold/5 border border-accent/20 dark:border-accent/15 p-6 sm:p-7 text-center">
          <div className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-white/70 dark:bg-white/10 mb-3">
            <Droplets className="w-4 h-4 text-accent dark:text-accent-light" />
          </div>
          <p className="text-xs font-bold uppercase tracking-wide text-accent dark:text-accent-light mb-2">
            Estimasi Awal
          </p>
          <p className="text-4xl sm:text-[2.6rem] font-bold text-gray-900 dark:text-white leading-tight tabular-nums">
            {formatRupiah(estimate)}
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 mb-1.5">
            {liters} liter × mulai {formatRupiah(SITE.pricePerLiter)}
          </p>
          <p className="text-[11px] text-gray-400 dark:text-gray-500 mb-6">
            Harga final bisa nego di tempat, tergantung kondisi & volume.
          </p>

          <div className="flex flex-col gap-2.5">
            <Link
              href={`/reservasi?liters=${liters}`}
              className="btn-primary w-full inline-flex items-center justify-center gap-2"
            >
              Reservasi {liters} Liter <ArrowRight className="w-4 h-4" />
            </Link>
            <a
              href={buildWhatsAppLink(waMessage)}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-accent w-full inline-flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-4 h-4" /> Chat WA Langsung
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
