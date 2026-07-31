// src/app/(public)/auth/login/page.tsx
import Link from 'next/link'
import LoginForm from '@/components/auth/LoginForm'
import GoogleLoginButton from '@/components/auth/GoogleLoginButton'

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center px-4 py-16">
      <Link href="/" className="mb-8 text-2xl font-semibold tracking-tight text-indigo-600">
        StudyBridge
      </Link>

      <div className="w-full max-w-md bg-white border border-slate-200 rounded-2xl shadow-sm p-6 md:p-8 space-y-6">
        <div className="space-y-1 text-center">
          <h1 className="text-2xl font-semibold tracking-tight text-slate-900">Welcome back</h1>
          <p className="text-sm text-slate-500 leading-relaxed">
            Log in to continue your study abroad journey.
          </p>
        </div>

        <LoginForm />

        <div className="flex items-center gap-3">
          <div className="h-px flex-1 bg-slate-200" />
          <span className="text-xs font-medium tracking-wide uppercase text-slate-400">or</span>
          <div className="h-px flex-1 bg-slate-200" />
        </div>

        <GoogleLoginButton />

        <p className="text-center text-sm text-slate-500 leading-relaxed">
          Don&apos;t have an account?{' '}
          <Link href="/auth/register" className="font-semibold text-indigo-600 hover:text-indigo-700">
            Register
          </Link>
        </p>
      </div>
    </div>
  )
}