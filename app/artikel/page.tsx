import type { Metadata } from 'next'
import Link from 'next/link'
import { BookOpen, Clock, ArrowRight } from 'lucide-react'
import Reveal from '@/components/Reveal'
import { ARTICLES } from '@/lib/articles'
import { PHOTOS } from '@/lib/photos'

export const metadata: Metadata = {
  title: 'Artikel',
  description: 'Edukasi seputar minyak jelantah: bahaya, cara penyimpanan, dan bagaimana jelantah diubah menjadi biodiesel.',
}

export default function ArtikelPage() {
  return (
    <div className="px-6 sm:px-8 pt-24 sm:pt-32 pb-20 max-w-5xl mx-auto">
      <Reveal className="text-center mb-10">
        <span className="badge-accent inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold border mb-4">
          <BookOpen className="w-3.5 h-3.5" /> Artikel
        </span>
        <h1 className="text-3xl sm:text-5xl font-bold text-gray-900 dark:text-white leading-tight">
          Kenali Jelantah{' '}
          <span className="italic font-serif text-accent dark:text-accent-light">
            Lebih Dekat
          </span>
        </h1>
        <p className="mt-5 text-gray-600 dark:text-gray-400 max-w-xl mx-auto leading-relaxed">
          Bacaan singkat soal bahaya, cara penyimpanan, dan ke mana larinya jelantah yang Anda setorkan.
        </p>
      </Reveal>

      <div className="grid sm:grid-cols-2 gap-5">
        {ARTICLES.map((article, i) => (
          <Reveal key={article.slug} delay={i * 70}>
            <Link
              href={`/artikel/${article.slug}`}
              className="glass-card overflow-hidden h-full flex flex-col hover:-translate-y-1 transition-all duration-300 group"
            >
              {article.cover && (
                <div className="relative h-36 sm:h-40 overflow-hidden flex-shrink-0">
                  <img
                    src={PHOTOS[article.cover].url}
                    alt={PHOTOS[article.cover].alt}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
              )}
              <div className="p-6 sm:p-7 flex flex-col flex-1">
              <span className="badge-accent inline-flex self-start px-2.5 py-0.5 rounded-full text-[11px] font-semibold border mb-4">
                {article.category}
              </span>
              <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-2 group-hover:text-accent dark:group-hover:text-accent-light transition-colors duration-200">
                {article.title}
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-5 flex-1">{article.excerpt}</p>
              <div className="flex items-center justify-between text-xs text-gray-400 dark:text-gray-500">
                <span className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5" /> {article.readMinutes} menit baca
                </span>
                <span className="flex items-center gap-1 font-semibold text-accent dark:text-accent-light group-hover:gap-2 transition-all duration-200">
                  Baca <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
              </div>
            </Link>
          </Reveal>
        ))}
      </div>
    </div>
  )
}
