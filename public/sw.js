// Service worker GoJelantah — syarat teknis biar situs ini beneran
// "installable" sebagai PWA (bukan cuma manifest doang) dan punya sedikit
// manfaat offline (bukan cuma blank screen putih kalau sinyal ilang pas
// lagi buka ulang halaman yang udah pernah dibuka).
//
// Strategi sengaja disederhanakan (bukan Workbox dkk) biar gampang
// dipahami & gak gampang nge-stale-in-kan konten:
// - Asset statis (ikon, gambar, manifest) -> cache-first (jarang berubah,
//   aman diambil dari cache biar cepet & hemat kuota).
// - Halaman (navigasi) -> network-first: SELALU coba network dulu biar
//   konten (harga, dll) selalu versi terbaru; cuma jatuh ke cache/offline
//   page kalau beneran gak ada koneksi.

const CACHE_NAME = 'gojelantah-v1'
const OFFLINE_URL = '/offline.html'

const PRECACHE_URLS = [
  OFFLINE_URL,
  '/icon.png',
  '/apple-icon.png',
  '/icons/icon-192.png',
  '/icons/icon-512.png',
]

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(PRECACHE_URLS)).then(() => self.skipWaiting())
  )
})

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  )
})

self.addEventListener('fetch', (event) => {
  const { request } = event
  if (request.method !== 'GET') return

  const url = new URL(request.url)
  if (url.origin !== self.location.origin) return // jangan ikut campur request pihak ke-3 (Google Maps iframe, dll)

  // Navigasi halaman (buka URL langsung / klik link) -> network-first.
  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request)
        .then((response) => {
          const copy = response.clone()
          caches.open(CACHE_NAME).then((cache) => cache.put(request, copy))
          return response
        })
        .catch(() => caches.match(request).then((cached) => cached || caches.match(OFFLINE_URL)))
    )
    return
  }

  // Asset statis Next.js (_next/static, gambar, ikon) -> cache-first.
  if (
    url.pathname.startsWith('/_next/static/') ||
    url.pathname.startsWith('/icons/') ||
    url.pathname.startsWith('/images/') ||
    url.pathname === '/icon.png' ||
    url.pathname === '/apple-icon.png'
  ) {
    event.respondWith(
      caches.match(request).then(
        (cached) =>
          cached ||
          fetch(request).then((response) => {
            const copy = response.clone()
            caches.open(CACHE_NAME).then((cache) => cache.put(request, copy))
            return response
          })
      )
    )
  }
})
