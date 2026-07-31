'use client'

import { useState } from 'react'
import { cn } from '@/lib/utils'

const categories = [
  'All',
  'General Q&A',
  'Country Boards',
  'University Boards',
  'Visa & Immigration',
  'Scholarships',
]

interface ForumCategoryFilterProps {
  onChange: (category: string) => void
}

export default function ForumCategoryFilter({ onChange }: ForumCategoryFilterProps) {
  const [active, setActive] = useState('All')

  function handleSelect(category: string) {
    setActive(category)
    onChange(category)
  }

  return (
    <div className="flex flex-wrap gap-2">
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => handleSelect(category)}
          className={cn(
            'rounded-full px-4 py-2 text-sm font-medium transition-all duration-200',
            active === category
              ? 'bg-indigo-600 text-white'
              : 'border border-slate-200 text-slate-600 hover:bg-slate-50'
          )}
        >
          {category}
        </button>
      ))}
    </div>
  )
}