import type { MetadataRoute } from 'next'

// Sumber domain sama persis kayak di app/layout.tsx — kalau nanti ganti ke
// domain sendiri, cukup set env var NEXT_PUBLIC_WEBSITE_URL di Vercel,
// robots.txt & sitemap.xml ini otomatis ikut pakai domain baru.
const WEBSITE_URL = (process.env.NEXT_PUBLIC_WEBSITE_URL || 'https://gojelantah.vercel.app').replace(/\/$/, '')

// File ini otomatis di-serve Next.js App Router sebagai /robots.txt —
// gak perlu bikin file robots.txt manual di public/.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: `${WEBSITE_URL}/sitemap.xml`,
  }
}
