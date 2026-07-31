// src/app/error.tsx
'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { AlertTriangle, RefreshCw } from 'lucide-react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-slate-50 px-4 py-16">
      <div className="w-full max-w-md space-y-6 rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-rose-50">
          <AlertTriangle className="h-6 w-6 text-rose-500" />
        </div>

        <div className="space-y-1">
          <h1 className="text-2xl font-semibold tracking-tight text-slate-900">
            Something went wrong
          </h1>
          <p className="text-sm text-slate-500 leading-relaxed">
            An unexpected error occurred while loading this page. You can try again or head back home.
          </p>
        </div>

        {error.message && (
          <div className="rounded-lg border border-slate-200 bg-slate-50 p-3 text-left">
            <p className="text-xs font-mono text-slate-500 break-words">{error.message}</p>
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            type="button"
            onClick={reset}
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:bg-indigo-700 active:scale-[0.98]"
          >
            <RefreshCw className="h-4 w-4" />
            Try Again
          </button>
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-lg border border-slate-200 px-5 py-2.5 text-sm font-semibold text-slate-900 transition-all duration-200 hover:bg-slate-50"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  )
}