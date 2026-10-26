'use client'

import { useState } from 'react'
import { MessageCircle, MapPin, Clock, Send, User, Mail, FileText } from 'lucide-react'
import Reveal from '@/components/Reveal'
import { SITE, buildWhatsAppLink } from '@/lib/site'

export default function KontakPage() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [subject, setSubject] = useState('')
  const [message, setMessage] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const waText = [
      `Halo GoJelantah, saya mau menghubungi lewat form kontak:`,
      ``,
      `Nama: ${name || '-'}`,
      `Email: ${email || '-'}`,
      `Perihal: ${subject || '-'}`,
      `Pesan: ${message || '-'}`,
    ].join('\n')
    window.open(buildWhatsAppLink(waText), '_blank', 'noopener,noreferrer')
  }

  return (
    <div className="px-6 sm:px-8 pt-24 sm:pt-32 pb-20 max-w-5xl mx-auto">
      <Reveal className="text-center mb-10">
        <span className="badge-accent inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold border mb-4">
          <MessageCircle className="w-3.5 h-3.5" /> Kontak
        </span>
        <h1 className="text-3xl sm:text-5xl font-bold text-gray-900 dark:text-white leading-tight">
          Ngobrol Dulu{' '}
          <span className="italic font-serif text-accent dark:text-accent-light">
            Sebelum Jemput
          </span>
        </h1>
        <p className="mt-5 text-gray-600 dark:text-gray-400 max-w-xl mx-auto leading-relaxed">
          Ada pertanyaan soal harga, area, atau mitra usaha? Hubungi kami lewat salah satu kanal di bawah.
        </p>
      </Reveal>

      <div className="grid lg:grid-cols-5 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <Reveal>
            <a
              href={buildWhatsAppLink('Halo GoJelantah, saya mau tanya-tanya dulu.')}
              target="_blank"
              rel="noopener noreferrer"
              className="glass-card p-6 flex items-start gap-4 hover:-translate-y-1 transition-all duration-300 block"
            >
              <div className="w-11 h-11 rounded-xl bg-emerald-500/10 flex items-center justify-center flex-shrink-0">
                <MessageCircle className="w-5 h-5 text-accent dark:text-accent-light" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-1">WhatsApp</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">{SITE.whatsappLocal}</p>
                <p className="text-xs text-accent dark:text-accent-light mt-1 font-medium">Respon tercepat →</p>
              </div>
            </a>
          </Reveal>

          <Reveal delay={60}>
            <div className="glass-card p-6 flex items-start gap-4">
              <div className="w-11 h-11 rounded-xl bg-gold/10 flex items-center justify-center flex-shrink-0">
                <MapPin className="w-5 h-5 text-gold dark:text-gold-light" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-1">Alamat</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{SITE.address}</p>
              </div>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <div className="glass-card p-6 flex items-start gap-4">
              <div className="w-11 h-11 rounded-xl bg-emerald-500/10 flex items-center justify-center flex-shrink-0">
                <Clock className="w-5 h-5 text-accent dark:text-accent-light" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Jam Operasional</h3>
                <ul className="space-y-1">
                  {SITE.businessHours.map((h) => (
                    <li key={h.day} className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
                      <span>{h.day}</span>
                      <span className="font-medium text-gray-900 dark:text-white">{h.hours}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>
        </div>

        <Reveal delay={100} className="lg:col-span-3">
          <form onSubmit={handleSubmit} className="glass-card p-7 sm:p-9 space-y-5">
            <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Kirim Pesan</h2>

            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Nama</label>
              <div className="relative">
                <User className="absolute left-3.5 top-3.5 w-4 h-4 text-gray-400" />
                <input
                  required
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Nama lengkap"
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-white/5 text-sm text-gray-900 dark:text-white placeholder:text-gray-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/50"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Email (opsional)</label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-3.5 w-4 h-4 text-gray-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="nama@email.com"
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-white/5 text-sm text-gray-900 dark:text-white placeholder:text-gray-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/50"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Perihal</label>
              <div className="relative">
                <FileText className="absolute left-3.5 top-3.5 w-4 h-4 text-gray-400" />
                <input
                  required
                  type="text"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="Mis. Tanya harga, mitra usaha, dll"
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-white/5 text-sm text-gray-900 dark:text-white placeholder:text-gray-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/50"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Pesan</label>
              <textarea
                required
                rows={4}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Tulis pesan Anda di sini..."
                className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-white/5 text-sm text-gray-900 dark:text-white placeholder:text-gray-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/50 resize-none"
              />
            </div>

            <button type="submit" className="btn-primary w-full inline-flex items-center justify-center gap-2">
              <Send className="w-4 h-4" /> Kirim Lewat WhatsApp
            </button>
            <p className="text-xs text-center text-gray-400 dark:text-gray-500">
              Pesan Anda akan terbuka otomatis di WhatsApp untuk dikirim ke tim kami.
            </p>
          </form>
        </Reveal>
      </div>
    </div>
  )
}
