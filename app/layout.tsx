import type { Metadata, Viewport } from 'next'
import './globals.css'
import Navbar from '@/components/Navbar'
import ScrollProgress from '@/components/ScrollProgress'
import WhatsAppFloat from '@/components/WhatsAppFloat'
import Footer from '@/components/Footer'
import PwaRegister from '@/components/PwaRegister'
import { Providers } from './providers'

// Catatan: font sengaja TIDAK di-load lewat next/font/google (butuh akses
// network ke fonts.googleapis.com saat build — tidak selalu tersedia di
// semua environment CI/sandbox). Dipakai font stack sistem bawaan Tailwind
// (`font-sans` / `font-serif`) yang serupa secara visual dan selalu
// tersedia offline, tanpa risiko build gagal karena fetch font.

// Domain produksi: https://www.gojelantah.com (domain sendiri, user beli
// & pasang 2026-10-28 — sebelumnya pakai subdomain gratis gojelantah.
// vercel.app sejak Round 10). Dipakai sebagai fallback kalau env var
// `NEXT_PUBLIC_WEBSITE_URL` belum di-set di Vercel. Kalau nanti domainnya
// ganti lagi, cukup set env var itu di Vercel project settings, SEMUA
// metadata/sitemap/robots/JSON-LD di bawah otomatis ikut pakai domain
// baru tanpa perlu edit kode lagi.
const WEBSITE_URL = (process.env.NEXT_PUBLIC_WEBSITE_URL || 'https://www.gojelantah.com').replace(/\/$/, '')

const OG_IMAGE_URL = `${WEBSITE_URL}/images/og-image.jpg`

export const metadata: Metadata = {
  metadataBase: new URL(WEBSITE_URL),

  title: {
    default: 'GoJelantah — Jemput & Beli Minyak Jelantah Se-Jabodetabek',
    template: '%s | GoJelantah',
  },

  description:
    'GoJelantah menjemput minyak jelantah langsung dari rumah/usaha Anda se-Jabodetabek. Jemput gratis, bayar tunai di tempat, harga mulai Rp 7.000/liter (nego). Reservasi lewat WhatsApp, secepat klik.',

  keywords: [
    'jual minyak jelantah',
    'jemput minyak jelantah',
    'harga minyak jelantah',
    'pengepul minyak jelantah',
    'minyak jelantah jakarta',
    'minyak jelantah bogor',
    'minyak jelantah depok',
    'minyak jelantah tangerang',
    'minyak jelantah bekasi',
    'minyak jelantah jadi biodiesel',
    'jasa jemput jelantah',
    'jual beli jelantah jabodetabek',
    'gojelantah',
  ],

  authors: [{ name: 'GoJelantah', url: WEBSITE_URL }],
  creator: 'GoJelantah',
  publisher: 'GoJelantah',

  openGraph: {
    type: 'website',
    locale: 'id_ID',
    url: WEBSITE_URL,
    siteName: 'GoJelantah',
    title: 'GoJelantah — Jemput & Beli Minyak Jelantah Se-Jabodetabek',
    description:
      'Jemput gratis, bayar tunai di tempat, harga mulai Rp 7.000/liter (nego). Reservasi lewat WhatsApp, secepat klik.',
    images: [
      {
        url: OG_IMAGE_URL,
        width: 1200,
        height: 630,
        alt: 'GoJelantah — Jemput Jelantah, Secepat Klik',
      },
    ],
  },

  twitter: {
    card: 'summary_large_image',
    title: 'GoJelantah — Jemput & Beli Minyak Jelantah Se-Jabodetabek',
    description:
      'Jemput gratis, bayar tunai di tempat, harga mulai Rp 7.000/liter (nego). Reservasi lewat WhatsApp, secepat klik.',
    images: [OG_IMAGE_URL],
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },

  alternates: {
    canonical: WEBSITE_URL,
  },

  category: 'business',

  // PWA — bikin Safari iOS kasih treatment "app" yang bener pas situs ini
  // di-"Add to Home Screen" (status bar nyatu sama warna tema, gak ada
  // address bar Safari nongol, title di bawah icon home-screen bukan URL).
  // `apple-icon.png` (180x180, full square opaque) diambil otomatis lewat
  // App Router file convention, gak perlu disebut manual di sini.
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'GoJelantah',
  },

  // Kode verifikasi Google Search Console (metode "HTML tag"), dikasih
  // user langsung dari dashboard Search Console-nya sendiri — bukan kode
  // palsu/karangan. Ini jadi <meta name="google-site-verification"
  // content="..." /> di <head>, dibaca Google pas user klik "Verify" di
  // Search Console setelah domain ini live.
  verification: {
    google: 'LPIFor90qCWewIaCyjMliPuAm4_LR4qTKkcV8GziJ7A',
  },
}

export const viewport: Viewport = {
  themeColor: '#06150f',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  // `cover`: biar konten boleh ngisi sampai ke balik notch/home-indicator
  // di HP kayak iPhone, SEKALIGUS ngaktifin `env(safe-area-inset-*)` biar
  // bisa dipakai nambahin padding aman di elemen yang nempel ke tepi layar
  // (tombol WA mengambang) — tanpa ini env() selalu balikin 0.
  viewportFit: 'cover',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="id" suppressHydrationWarning className="overflow-x-hidden">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'LocalBusiness',
              '@id': `${WEBSITE_URL}/#business`,
              name: 'GoJelantah',
              description:
                'Jasa jemput dan beli minyak jelantah se-Jabodetabek. Jemput gratis, bayar tunai di tempat, harga mulai Rp 7.000/liter (nego sesuai kondisi & volume).',
              url: WEBSITE_URL,
              image: OG_IMAGE_URL,
              logo: `${WEBSITE_URL}/icon.png`,
              telephone: '+6281212084742',
              priceRange: 'Mulai Rp 7.000/liter (nego)',
              address: {
                '@type': 'PostalAddress',
                streetAddress: 'Jl. I Gusti Ngurah Rai No.20C, RT.8/RW.6, Cipinang Muara',
                addressLocality: 'Jakarta Timur',
                addressRegion: 'DKI Jakarta',
                postalCode: '13420',
                addressCountry: 'ID',
              },
              // Area layanan — ikut di JSON-LD juga (bukan cuma di konten
              // visual) biar Google lebih yakin situs ini relevan buat
              // pencarian lokal se-5-kota, gak cuma Jakarta.
              areaServed: [
                { '@type': 'City', name: 'Jakarta' },
                { '@type': 'City', name: 'Bogor' },
                { '@type': 'City', name: 'Depok' },
                { '@type': 'City', name: 'Tangerang' },
                { '@type': 'City', name: 'Bekasi' },
              ],
              openingHoursSpecification: [
                {
                  '@type': 'OpeningHoursSpecification',
                  dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
                  opens: '08:00',
                  closes: '17:00',
                },
                {
                  '@type': 'OpeningHoursSpecification',
                  dayOfWeek: ['Saturday'],
                  opens: '08:00',
                  closes: '12:00',
                },
              ],
            }),
          }}
        />
      </head>
      <body className="font-sans antialiased overflow-x-hidden">
        <PwaRegister />
        <Providers>
          <div className="app-shell relative flex flex-col overflow-hidden">
            <ScrollProgress />
            <Navbar />

            <main className="main-scroll-bg relative flex-1 overflow-y-auto overflow-x-hidden min-w-0 transition-colors duration-500">
              {/* Ambient background — "fixed" (bukan absolute) biar warnanya
                  SELALU ada di layar ke mana pun halaman discroll, nutupin
                  seluruh viewport, nyambung sama gradient hijau di body
                  (app/globals.css). Blob di sini cuma nambah kedalaman/
                  variasi di atas base yang udah hijau, BUKAN satu-satunya
                  sumber warna lagi — jadi halaman gak bisa lagi kelihatan
                  "putih dengan kotak ijo", base-nya sendiri emang hijau.
                  Dot-grid pattern yang lama (kesannya generic/jadul)
                  sengaja dibuang total. */}
              <div className="fixed inset-0 -z-20 overflow-hidden pointer-events-none">
                <div className="absolute -top-32 -left-32 h-[560px] w-[560px] rounded-full bg-emerald-400/30 dark:bg-emerald-500/[0.12] blur-[140px]" />
                <div className="absolute -top-16 right-[-10%] h-[500px] w-[500px] rounded-full bg-amber-300/25 dark:bg-amber-500/[0.09] blur-[150px]" />
                <div className="absolute top-[42%] -left-20 h-[480px] w-[480px] rounded-full bg-amber-200/30 dark:bg-gold/[0.08] blur-[150px]" />
                <div className="absolute bottom-[-12%] right-[-8%] h-[600px] w-[600px] rounded-full bg-emerald-300/35 dark:bg-emerald-400/[0.11] blur-[160px]" />
                <div className="absolute bottom-0 left-[18%] h-[420px] w-[420px] rounded-full bg-emerald-200/30 dark:bg-emerald-500/[0.07] blur-[140px]" />
              </div>

              <div className="relative z-10 w-full">
                {children}
                <Footer />
              </div>
            </main>

            <WhatsAppFloat />
          </div>
        </Providers>
      </body>
    </html>
  )
}
