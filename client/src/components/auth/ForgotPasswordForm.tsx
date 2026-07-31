'use client'

import { useState } from 'react'
import toast from 'react-hot-toast'
import { Loader2, Mail } from 'lucide-react'
import { Input } from '@/components/ui/input'

export default function ForgotPasswordForm() {
  const [email, setEmail] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSent, setIsSent] = useState(false)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setIsSubmitting(true)

    setTimeout(() => {
      setIsSubmitting(false)
      setIsSent(true)
      toast.success('Reset link sent to your email')
    }, 1200)
  }

  if (isSent) {
    return (
      <div className="flex flex-col items-center text-center">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-indigo-50 text-indigo-600">
          <Mail className="h-6 w-6" />
        </div>
        <h3 className="mt-4 text-lg font-semibold tracking-tight text-slate-900">
          Check your inbox
        </h3>
        <p className="mt-2 text-sm font-normal leading-relaxed text-slate-500">
          We've sent a password reset link to <span className="font-medium">{email}</span>.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="space-y-1.5">
        <label htmlFor="email" className="text-sm font-medium text-slate-900">
          Email
        </label>
        <Input
          id="email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
        />
        <p className="text-sm font-normal leading-relaxed text-slate-500">
          Enter the email associated with your account and we'll send a reset link.
        </p>
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="flex w-full items-center justify-center gap-2 rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white transition-all duration-200 hover:bg-indigo-700 active:scale-[0.98] disabled:opacity-60"
      >
        {isSubmitting && <Loader2 className="h-4 w-4 animate-spin" />}
        {isSubmitting ? 'Sending...' : 'Send Reset Link'}
      </button>
    </form>
  )
}