'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { Sun, Moon, ChevronDown, ArrowRight, Droplets, MessageCircle } from 'lucide-react'
import { useTheme } from '@/context/ThemeContext'

const MENU_LINKS = [
  { href: '/', label: 'Beranda' },
  { href: '/tentang', label: 'Tentang' },
  { href: '/mitra-bisnis', label: 'Mitra Bisnis' },
  { href: '/artikel', label: 'Artikel' },
  { href: '/kontak', label: 'Kontak' },
]

export default function Navbar() {
  const pathname = usePathname()
  const { theme, toggleTheme } = useTheme()
  const isDark = theme === 'dark'

  const [menuOpen, setMenuOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  const isLinkActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname === href || pathname.startsWith(`${href}/`)

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  useEffect(() => {
    setMenuOpen(false)
  }, [pathname])

  const handleToggleTheme = () => {
    document.documentElement.classList.add('no-transition')
    toggleTheme()
    void document.documentElement.offsetHeight
    setTimeout(() => {
      document.documentElement.classList.remove('no-transition')
    }, 50)
  }

  return (
    // Navbar floating, rounded penuh, kaca blur — bentuk simpel satu
    // kapsul lengkung, TANPA notch/ear-cutout lagi di sudutnya (itu yang
    // bikin kesannya jadul). Latarnya translucent + backdrop-blur biar
    // tetep nyatu sama background hijau di belakangnya, bukan blok hitam
    // pekat yang berdiri sendiri.
    <header className="fixed top-3 sm:top-4 left-1/2 -translate-x-1/2 z-[100] w-[calc(100vw-1.5rem)] md:w-fit rounded-full border border-white/10 bg-[#06150f]/85 backdrop-blur-xl shadow-lg shadow-black/20">
      <div className="px-3 sm:px-4 h-12 sm:h-14 flex items-center justify-between gap-3">
        <Link href="/" className="flex items-center gap-2 group flex-shrink-0 pl-1">
          <div className="relative w-7 h-7 sm:w-8 sm:h-8 flex-shrink-0 rounded-full bg-gradient-to-br from-accent to-accent-light flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
            <Droplets className="w-4 h-4 sm:w-[18px] sm:h-[18px] text-white" />
          </div>
          <span className="text-sm sm:text-[15px] font-semibold tracking-tight whitespace-nowrap text-white">
            GoJelantah
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-5 lg:gap-6">
          {MENU_LINKS.map((link) => {
            const active = isLinkActive(link.href)
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`text-[14px] font-medium tracking-tight transition-opacity duration-200 rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:ring-offset-0 ${
                  active ? 'text-white opacity-100' : 'text-white opacity-60 hover:opacity-100'
                }`}
              >
                {link.label}
              </Link>
            )
          })}
        </nav>

        {/* Satu grup di sisi kanan (menu mobile + dot + toggle tema + CTA)
            — sebelumnya tombol "Menu" mobile ada di luar grup ini sebagai
            flex-child TERPISAH, jadi kena `justify-between` ikut nyebar ke
            TENGAH navbar (di antara logo & grup kanan), padahal nav desktop
            di sebelahnya lagi `hidden` di mobile jadi gak makan tempat —
            hasilnya tombol Menu kelihatan "ngambang" sendirian di tengah.
            Sekarang semuanya satu flex-child kanan, jadi di mobile cuma ada
            2 child (logo kiri, grup ini kanan) — Menu nempel rapi di
            pinggir bareng tombol-tombol lain. */}
        <div className="flex items-center gap-1.5 sm:gap-2 flex-shrink-0">
          <div className="relative md:hidden" ref={menuRef}>
            <button
              onClick={() => setMenuOpen((v) => !v)}
              aria-expanded={menuOpen}
              className={`flex items-center gap-1.5 pl-1.5 pr-2.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap text-white transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:ring-offset-0 ${
                menuOpen ? 'bg-white/15' : 'opacity-80 hover:opacity-100 hover:bg-white/10'
              }`}
            >
              Menu
              <ChevronDown className={`w-3 h-3 flex-shrink-0 transition-transform duration-300 ${menuOpen ? 'rotate-180' : ''}`} />
            </button>

            {menuOpen && (
              <div className="absolute top-full mt-2 right-0 w-56 rounded-2xl border border-white/10 bg-[#0a1d15]/95 backdrop-blur-xl shadow-xl shadow-black/40 p-2 origin-top-right animate-dropdown-in">
                {MENU_LINKS.map((link) => {
                  const active = isLinkActive(link.href)
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setMenuOpen(false)}
                      className={`flex items-center gap-3 px-2.5 py-2 rounded-xl transition-all duration-200 ${
                        active ? 'bg-white/10' : 'hover:bg-white/5'
                      }`}
                    >
                      <span className={`text-sm font-semibold ${active ? 'text-white' : 'text-white/80'}`}>
                        {link.label}
                      </span>
                      {active && <span className="ml-auto w-1.5 h-1.5 rounded-full bg-emerald-400 flex-shrink-0" />}
                    </Link>
                  )
                })}
              </div>
            )}
          </div>

          {/* Dot hijau pulsing — penanda "website sedang online", sengaja
              diadain lagi sesuai request (sebelumnya pernah dihapus). */}
          <span className="hidden sm:flex relative h-2 w-2 flex-shrink-0" aria-hidden="true" title="Website online">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
          </span>

          <button
            onClick={handleToggleTheme}
            className="p-1.5 sm:p-2 rounded-full text-white/60 hover:text-white hover:bg-white/10 transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:ring-offset-0"
            aria-label="Ganti tema"
          >
            {isDark ? <Sun className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> : <Moon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />}
          </button>

          <Link
            href="/reservasi"
            className="inline-flex items-center gap-1.5 pl-3 pr-2.5 sm:pl-3.5 sm:pr-3 py-1.5 sm:py-2 rounded-full bg-gradient-to-r from-accent to-accent-light text-white text-[11px] sm:text-[13px] font-semibold hover:brightness-110 active:scale-[0.97] transition-all duration-200 whitespace-nowrap focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:ring-offset-0"
          >
            <MessageCircle className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
            <span className="hidden sm:inline">Reservasi</span>
            <ArrowRight className="hidden sm:inline w-3 h-3" />
          </Link>
        </div>
      </div>
    </header>
  )
}
