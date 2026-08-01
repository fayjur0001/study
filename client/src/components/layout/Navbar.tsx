'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Menu } from 'lucide-react'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import MobileMenu from '@/components/layout/MobileMenu'

const navLinks = [
  { label: 'Universities', href: '/universities' },
  { label: 'Countries', href: '/countries' },
  { label: 'Scholarships', href: '/scholarships' },
  { label: 'Agencies', href: '/agencies' },
  { label: 'Community', href: '/community' },
]

interface NavbarProps {
  isLoggedIn?: boolean
}

export default function Navbar({ isLoggedIn = false }: NavbarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-30 border-b border-slate-200/60 bg-white/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="text-xl font-extrabold tracking-tight text-[#0d3286]"
        >
          StudyBridge
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-slate-600 transition-colors duration-150 hover:text-[#0d3286]"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          {isLoggedIn ? (
            <Link
              href="/dashboard/student"
              className={cn(
                buttonVariants({ variant: 'default' }),
                'rounded-lg bg-[#0d3286] px-4 py-1.5 font-bold text-white shadow-sm hover:bg-[#0d3286]/90'
              )}
            >
              Go to Dashboard
            </Link>
          ) : (
            <>
              <Link
                href="/auth/login"
                className="px-3 py-1.5 text-sm font-semibold text-slate-600 transition-colors hover:text-[#0d3286]"
              >
                Login
              </Link>
              <Link
                href="/auth/register"
                className={cn(
                  buttonVariants({ variant: 'default' }),
                  'rounded-lg bg-[#0d3286] px-4 py-1.5 font-bold text-white shadow-sm hover:bg-[#0d3286]/90'
                )}
              >
                Sign Up
              </Link>
            </>
          )}
        </div>

        <button
          onClick={() => setIsMobileMenuOpen(true)}
          className="rounded-lg p-2 text-slate-600 transition-colors duration-150 hover:bg-slate-50 md:hidden"
          aria-label="Open menu"
        >
          <Menu className="h-6 w-6" />
        </button>
      </div>

      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        title="StudyBridge"
        links={navLinks}
        footer={
          isLoggedIn ? (
            <Link
              href="/dashboard/student"
              className={cn(buttonVariants({ variant: 'default' }), 'w-full bg-[#0d3286] hover:bg-[#0d3286]/90')}
            >
              Go to Dashboard
            </Link>
          ) : (
            <div className="flex flex-col gap-2">
              <Link
                href="/auth/login"
                className={cn(buttonVariants({ variant: 'outline' }), 'w-full')}
              >
                Login
              </Link>
              <Link
                href="/auth/register"
                className={cn(buttonVariants({ variant: 'default' }), 'w-full bg-[#0d3286] hover:bg-[#0d3286]/90')}
              >
                Sign Up
              </Link>
            </div>
          )
        }
      />
    </header>
  )
}