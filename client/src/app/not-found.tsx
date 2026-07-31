// src/app/not-found.tsx
import Link from 'next/link'
import { SearchX } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-slate-50 px-4 py-16">
      <div className="w-full max-w-md space-y-6 text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-indigo-50">
          <SearchX className="h-8 w-8 text-indigo-600" />
        </div>

        <div className="space-y-1">
          <h1 className="text-3xl font-semibold tracking-tight text-slate-900">Page not found</h1>
          <p className="text-sm text-slate-500 leading-relaxed">
            The page you&apos;re looking for doesn&apos;t exist or may have been moved.
          </p>
        </div>

        <Link
          href="/"
          className="inline-flex items-center justify-center rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:bg-indigo-700 active:scale-[0.98]"
        >
          Back to Home
        </Link>
      </div>
    </div>
  )
}