'use client'

import { useEffect, useRef, useState, ReactNode } from 'react'

interface RevealProps {
  children: ReactNode
  delay?: number
  className?: string
  as?: 'div' | 'span'
}

// Wrapper animasi "muncul pas discroll" pakai IntersectionObserver.
// Class `.reveal` / `.reveal.visible` ada di app/globals.css.
export default function Reveal({ children, delay = 0, className = '', as = 'div' }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => setVisible(true), delay)
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.15 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [delay])

  const Tag = as as any
  return (
    <Tag ref={ref} className={`reveal ${visible ? 'visible' : ''} ${className}`}>
      {children}
    </Tag>
  )
}
