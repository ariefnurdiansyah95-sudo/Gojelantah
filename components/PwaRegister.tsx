'use client'

import { useEffect } from 'react'

// Daftarin service worker (public/sw.js) abis halaman kelar load — sengaja
// nunggu event 'load' (bukan langsung di useEffect mount) biar registrasi
// service worker gak ikut rebutan bandwidth/CPU sama resource halaman yang
// lagi di-load pertama kali (praktik standar PWA, direkomendasiin Google).
// Komponen ini gak render apa-apa (return null), cuma efek sampingnya aja.
export default function PwaRegister() {
  useEffect(() => {
    if (typeof window === 'undefined' || !('serviceWorker' in navigator)) return

    const register = () => {
      navigator.serviceWorker.register('/sw.js').catch(() => {
        // Gagal daftar (mis. browser lama / dev server tanpa HTTPS) bukan
        // error fatal — situs tetap jalan normal, cuma gak dapet manfaat
        // offline/installable-nya aja. Sengaja di-diemin (silent fail).
      })
    }

    if (document.readyState === 'complete') {
      register()
    } else {
      window.addEventListener('load', register)
      return () => window.removeEventListener('load', register)
    }
  }, [])

  return null
}
