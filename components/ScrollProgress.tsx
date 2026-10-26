'use client'

// Bar tipis progress-scroll di paling atas viewport, tampil di semua
// halaman (dipasang di app/layout.tsx). Gradien hijau → emas.
import { useEffect, useState } from 'react'

export default function ScrollProgress() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const scrollEl = document.querySelector('main')
    if (!scrollEl) return

    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = scrollEl
      const max = scrollHeight - clientHeight
      const pct = max > 0 ? (scrollTop / max) * 100 : 0
      setProgress(Math.min(100, Math.max(0, pct)))
    }

    handleScroll()
    scrollEl.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('resize', handleScroll)
    return () => {
      scrollEl.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleScroll)
    }
  }, [])

  return (
    <div className="scroll-progress-track" aria-hidden="true">
      <div className="scroll-progress-bar" style={{ width: `${progress}%` }} />
    </div>
  )
}
