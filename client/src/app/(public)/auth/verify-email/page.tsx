// src/app/(public)/auth/verify-email/page.tsx
import Link from 'next/link'
import VerifyEmailCard from '@/components/auth/VerifyEmailCard'

export default function VerifyEmailPage() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center px-4 py-16">
      <Link href="/" className="mb-8 text-2xl font-semibold tracking-tight text-indigo-600">
        StudyBridge
      </Link>

      <div className="w-full max-w-md bg-white border border-slate-200 rounded-2xl shadow-sm p-6 md:p-8 space-y-6">
        <div className="space-y-1 text-center">
          <h1 className="text-2xl font-semibold tracking-tight text-slate-900">Verify your email</h1>
          <p className="text-sm text-slate-500 leading-relaxed">
            We&apos;ve sent a 6-digit code to your email address.
          </p>
        </div>

        <VerifyEmailCard />

        <p className="text-center text-sm text-slate-500 leading-relaxed">
          Wrong email?{' '}
          <Link href="/auth/register" className="font-semibold text-indigo-600 hover:text-indigo-700">
            Go back
          </Link>
        </p>
      </div>
    </div>
  )
}