// src/app/(public)/auth/reset-password/page.tsx
import Link from 'next/link'
import ResetPasswordForm from '@/components/auth/ResetPasswordForm'

export default function ResetPasswordPage() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center px-4 py-16">
      <Link href="/" className="mb-8 text-2xl font-semibold tracking-tight text-indigo-600">
        StudyBridge
      </Link>

      <div className="w-full max-w-md bg-white border border-slate-200 rounded-2xl shadow-sm p-6 md:p-8 space-y-6">
        <div className="space-y-1 text-center">
          <h1 className="text-2xl font-semibold tracking-tight text-slate-900">Reset your password</h1>
          <p className="text-sm text-slate-500 leading-relaxed">
            Choose a new password for your account.
          </p>
        </div>

        <ResetPasswordForm />

        <p className="text-center text-sm text-slate-500 leading-relaxed">
          <Link href="/auth/login" className="font-semibold text-indigo-600 hover:text-indigo-700">
            Back to login
          </Link>
        </p>
      </div>
    </div>
  )
}