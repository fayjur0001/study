'use client'

import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import { Loader2, MailCheck } from 'lucide-react'
import { cn } from '@/lib/utils'

const OTP_LENGTH = 6
const RESEND_COOLDOWN = 30

export default function VerifyEmailCard() {
  const router = useRouter()
  const [otp, setOtp] = useState<string[]>(Array(OTP_LENGTH).fill(''))
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [cooldown, setCooldown] = useState(RESEND_COOLDOWN)
  const inputRefs = useRef<(HTMLInputElement | null)[]>([])

  useEffect(() => {
    if (cooldown === 0) return
    const timer = setInterval(() => setCooldown((prev) => prev - 1), 1000)
    return () => clearInterval(timer)
  }, [cooldown])

  function handleChange(index: number, value: string) {
    if (!/^[0-9]?$/.test(value)) return
    const next = [...otp]
    next[index] = value
    setOtp(next)

    if (value && index < OTP_LENGTH - 1) {
      inputRefs.current[index + 1]?.focus()
    }
  }

  function handleKeyDown(index: number, e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus()
    }
  }

  function handleVerify() {
    const code = otp.join('')
    if (code.length !== OTP_LENGTH) {
      toast.error('Please enter the full 6-digit code')
      return
    }

    setIsSubmitting(true)
    setTimeout(() => {
      setIsSubmitting(false)
      toast.success('Email verified successfully!')
      router.push('/auth/login')
    }, 1200)
  }

  function handleResend() {
    setCooldown(RESEND_COOLDOWN)
    toast.success('Verification code resent')
  }

  return (
    <div className="flex flex-col items-center text-center">
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-indigo-50 text-indigo-600">
        <MailCheck className="h-6 w-6" />
      </div>

      <h3 className="mt-4 text-lg font-semibold tracking-tight text-slate-900">
        Verify your email
      </h3>
      <p className="mt-2 max-w-xs text-sm font-normal leading-relaxed text-slate-500">
        Enter the 6-digit code we sent to your email address.
      </p>

      <div className="mt-6 flex gap-2">
        {otp.map((digit, index) => (
          <input
            key={index}
            ref={(el) => {
              inputRefs.current[index] = el
            }}
            type="text"
            inputMode="numeric"
            maxLength={1}
            value={digit}
            onChange={(e) => handleChange(index, e.target.value)}
            onKeyDown={(e) => handleKeyDown(index, e)}
            className="h-12 w-12 rounded-lg border border-slate-200 text-center text-lg font-semibold text-slate-900 outline-none transition-all duration-200 focus:border-indigo-600 focus:ring-2 focus:ring-indigo-100"
          />
        ))}
      </div>

      <button
        onClick={handleVerify}
        disabled={isSubmitting}
        className="mt-6 flex w-full items-center justify-center gap-2 rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white transition-all duration-200 hover:bg-indigo-700 active:scale-[0.98] disabled:opacity-60"
      >
        {isSubmitting && <Loader2 className="h-4 w-4 animate-spin" />}
        {isSubmitting ? 'Verifying...' : 'Verify Email'}
      </button>

      <button
        onClick={handleResend}
        disabled={cooldown > 0}
        className={cn(
          'mt-4 text-sm font-medium',
          cooldown > 0 ? 'text-slate-400' : 'text-indigo-600 hover:text-indigo-700'
        )}
      >
        {cooldown > 0 ? `Resend code in ${cooldown}s` : 'Resend code'}
      </button>
    </div>
  )
}