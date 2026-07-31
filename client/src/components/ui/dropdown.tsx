'use client'

import { useEffect, useRef, useState } from 'react'
import { cn } from '@/lib/utils'

interface DropdownItem {
  label: string
  onClick: () => void
  icon?: React.ReactNode
  danger?: boolean
}

interface DropdownProps {
  trigger: React.ReactNode
  items: DropdownItem[]
  align?: 'left' | 'right'
  className?: string
}

export default function Dropdown({ trigger, items, align = 'right', className }: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div ref={containerRef} className={cn('relative inline-block', className)}>
      <button onClick={() => setIsOpen((prev) => !prev)} className="outline-none">
        {trigger}
      </button>

      {isOpen && (
        <div
          className={cn(
            'absolute z-20 mt-2 min-w-[180px] rounded-lg border border-slate-200 bg-white py-1.5 shadow-lg transition-all duration-200',
            align === 'right' ? 'right-0' : 'left-0'
          )}
        >
          {items.map((item, idx) => (
            <button
              key={idx}
              onClick={() => {
                item.onClick()
                setIsOpen(false)
              }}
              className={cn(
                'flex w-full items-center gap-2 px-4 py-2 text-left text-sm transition-colors duration-150',
                item.danger
                  ? 'text-rose-500 hover:bg-rose-50'
                  : 'text-slate-600 hover:bg-slate-50'
              )}
            >
              {item.icon}
              {item.label}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}