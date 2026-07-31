'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Menu } from 'lucide-react'
import { Button } from '@/components/ui/button'
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
    <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="text-xl font-semibold tracking-tight text-indigo-600">
          StudyBridge
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-normal text-slate-600 transition-colors duration-150 hover:text-indigo-600"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          {isLoggedIn ? (
            <Button asChild>
              <Link href="/dashboard/student">Go to Dashboard</Link>
            </Button>
          ) : (
            <>
              <Button variant="ghost" asChild>
                <Link href="/auth/login">Login</Link>
              </Button>
              <Button asChild>
                <Link href="/auth/register">Register</Link>
              </Button>
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
            <Button asChild className="w-full">
              <Link href="/dashboard/student">Go to Dashboard</Link>
            </Button>
          ) : (
            <div className="flex flex-col gap-2">
              <Button variant="outline" asChild className="w-full">
                <Link href="/auth/login">Login</Link>
              </Button>
              <Button asChild className="w-full">
                <Link href="/auth/register">Register</Link>
              </Button>
            </div>
          )
        }
      />
    </header>
  )
}