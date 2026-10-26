import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, Clock, MessageCircle } from 'lucide-react'
import Reveal from '@/components/Reveal'
import { ARTICLES, getArticleBySlug } from '@/lib/articles'
import { buildWhatsAppLink } from '@/lib/site'
import { PHOTOS } from '@/lib/photos'

export function generateStaticParams() {
  return ARTICLES.map((a) => ({ slug: a.slug }))
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const article = getArticleBySlug(params.slug)
  if (!article) return {}
  return {
    title: article.title,
    description: article.excerpt,
  }
}

export default function ArtikelDetailPage({ params }: { params: { slug: string } }) {
  const article = getArticleBySlug(params.slug)
  if (!article) notFound()

  return (
    <div className="px-6 sm:px-8 pt-24 sm:pt-32 pb-20 max-w-2xl mx-auto">
      <Reveal>
        <Link
          href="/artikel"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-accent dark:hover:text-accent-light transition-colors duration-200 mb-8"
        >
          <ArrowLeft className="w-4 h-4" /> Kembali ke Artikel
        </Link>

        <span className="badge-accent inline-flex px-2.5 py-0.5 rounded-full text-[11px] font-semibold border mb-4">
          {article.category}
        </span>
        <h1 className="text-2xl sm:text-4xl font-bold text-gray-900 dark:text-white leading-tight mb-4">
          {article.title}
        </h1>
        <p className="flex items-center gap-1.5 text-sm text-gray-400 dark:text-gray-500 mb-8">
          <Clock className="w-3.5 h-3.5" /> {article.readMinutes} menit baca
        </p>

        {article.cover && (
          <div className="relative h-52 sm:h-64 rounded-2xl overflow-hidden border border-white/60 dark:border-white/10 mb-10">
            <img
              src={PHOTOS[article.cover].url}
              alt={PHOTOS[article.cover].alt}
              className="w-full h-full object-cover"
            />
          </div>
        )}
      </Reveal>

      <div className="space-y-5">
        {article.content.map((paragraph, i) => (
          <Reveal key={i} delay={i * 50}>
            <p className="text-[15px] sm:text-base text-gray-700 dark:text-gray-300 leading-relaxed">{paragraph}</p>
          </Reveal>
        ))}
      </div>

      <Reveal delay={200}>
        <div className="value-frame p-7 sm:p-9 mt-14 text-center">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-3">
            Punya Jelantah Menumpuk di Rumah?
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-6 max-w-sm mx-auto">
            Jangan dibuang — setorkan ke GoJelantah, dijemput gratis dan dibayar tunai di tempat.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link href="/reservasi" className="btn-primary inline-flex items-center gap-2 w-full sm:w-auto justify-center">
              Reservasi Sekarang
            </Link>
            <a
              href={buildWhatsAppLink('Halo GoJelantah, saya habis baca artikel kalian dan mau tanya lebih lanjut.')}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-accent inline-flex items-center gap-2 w-full sm:w-auto justify-center"
            >
              <MessageCircle className="w-4 h-4" /> Chat WhatsApp
            </a>
          </div>
        </div>
      </Reveal>
    </div>
  )
}
