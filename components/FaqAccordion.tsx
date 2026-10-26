'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'

interface FaqItem {
  question: string
  answer: string
}

export default function FaqAccordion({ items }: { items: FaqItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <div className="space-y-3">
      {items.map((item, i) => {
        const open = openIndex === i
        return (
          <div
            key={item.question}
            className="glass-card overflow-hidden"
          >
            <button
              onClick={() => setOpenIndex(open ? null : i)}
              aria-expanded={open}
              className="w-full flex items-center justify-between gap-4 px-5 sm:px-6 py-4 sm:py-5 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/50"
            >
              <span className="text-sm sm:text-base font-semibold text-gray-900 dark:text-white">
                {item.question}
              </span>
              <ChevronDown
                className={`w-4 h-4 flex-shrink-0 text-accent dark:text-accent-light transition-transform duration-300 ${
                  open ? 'rotate-180' : ''
                }`}
              />
            </button>
            <div
              className={`grid transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                open ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
              }`}
              style={{ gridTemplateRows: open ? '1fr' : '0fr' }}
            >
              <div className="overflow-hidden">
                <p className="px-5 sm:px-6 pb-4 sm:pb-5 text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                  {item.answer}
                </p>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
