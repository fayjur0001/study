'use client'

import Link from 'next/link'
import { X } from 'lucide-react'
import { cn } from '@/lib/utils'

interface MobileMenuLink {
  label: string
  href: string
  icon?: React.ReactNode
}

interface MobileMenuProps {
  isOpen: boolean
  onClose: () => void
  links: MobileMenuLink[]
  activeHref?: string
  footer?: React.ReactNode
  title?: string
}

export default function MobileMenu({
  isOpen,
  onClose,
  links,
  activeHref,
  footer,
  title = 'Menu',
}: MobileMenuProps) {
  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        className={cn(
          'fixed inset-0 z-40 bg-slate-900/40 transition-opacity duration-200 md:hidden',
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        )}
        aria-hidden="true"
      />

      {/* Drawer */}
      <div
        className={cn(
          'fixed inset-y-0 left-0 z-50 w-72 max-w-[80vw] bg-white shadow-2xl transition-transform duration-200 ease-out md:hidden',
          isOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        <div className="flex items-center justify-between border-b border-slate-200 p-4">
          <span className="text-lg font-semibold tracking-tight text-slate-900">{title}</span>
          <button
            onClick={onClose}
            className="rounded-lg p-2 text-slate-500 transition-colors duration-150 hover:bg-slate-50"
            aria-label="Close menu"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <nav className="flex flex-col gap-1 p-4">
          {links.map((link) => {
            const isActive = activeHref === link.href
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={onClose}
                className={cn(
                  'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-normal transition-colors duration-150',
                  isActive
                    ? 'bg-indigo-50 text-indigo-700 border-l-2 border-indigo-600'
                    : 'text-slate-600 hover:bg-slate-50'
                )}
              >
                {link.icon}
                {link.label}
              </Link>
            )
          })}
        </nav>

        {footer && <div className="mt-auto border-t border-slate-200 p-4">{footer}</div>}
      </div>
    </>
  )
}