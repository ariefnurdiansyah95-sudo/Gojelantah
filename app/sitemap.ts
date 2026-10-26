import type { MetadataRoute } from 'next'
import { ARTICLES } from '@/lib/articles'

const WEBSITE_URL = (process.env.NEXT_PUBLIC_WEBSITE_URL || 'https://gojelantah.vercel.app').replace(/\/$/, '')

// File ini otomatis di-serve Next.js App Router sebagai /sitemap.xml.
// Dibikin terprogram (bukan XML statis) biar kalau nanti nambah artikel
// baru di lib/articles.ts, URL-nya otomatis ikut masuk sitemap tanpa
// perlu diedit manual.
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()

  const staticPages: MetadataRoute.Sitemap = [
    { url: `${WEBSITE_URL}/`, lastModified: now, changeFrequency: 'weekly', priority: 1 },
    { url: `${WEBSITE_URL}/tentang`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${WEBSITE_URL}/reservasi`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${WEBSITE_URL}/mitra-bisnis`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${WEBSITE_URL}/kontak`, lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${WEBSITE_URL}/artikel`, lastModified: now, changeFrequency: 'weekly', priority: 0.7 },
  ]

  const articlePages: MetadataRoute.Sitemap = ARTICLES.map((article) => ({
    url: `${WEBSITE_URL}/artikel/${article.slug}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.6,
  }))

  return [...staticPages, ...articlePages]
}
