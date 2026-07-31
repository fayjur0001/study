'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import { Loader2 } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Checkbox } from '@/components/ui/checkbox'
import { cn } from '@/lib/utils'

type RegisterRole = 'student' | 'agency'

export default function RegisterForm() {
  const router = useRouter()
  const [role, setRole] = useState<RegisterRole>('student')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [agreedToTerms, setAgreedToTerms] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    if (password !== confirmPassword) {
      toast.error('Passwords do not match')
      return
    }
    if (!agreedToTerms) {
      toast.error('Please agree to the Terms of Service')
      return
    }

    setIsSubmitting(true)
    setTimeout(() => {
      setIsSubmitting(false)
      toast.success('Account created! Please verify your email.')
      router.push('/auth/verify-email')
    }, 1200)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid grid-cols-2 gap-2 rounded-lg bg-slate-50 p-1">
        {(['student', 'agency'] as RegisterRole[]).map((r) => (
          <button
            key={r}
            type="button"
            onClick={() => setRole(r)}
            className={cn(
              'rounded-lg py-2 text-sm font-medium transition-all duration-200 capitalize',
              role === r ? 'bg-white text-indigo-700 shadow-sm' : 'text-slate-500 hover:text-slate-700'
            )}
          >
            {r}
          </button>
        ))}
      </div>

      <div className="space-y-1.5">
        <label htmlFor="name" className="text-sm font-medium text-slate-900">
          {role === 'agency' ? 'Agency Name' : 'Full Name'}
        </label>
        <Input
          id="name"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder={role === 'agency' ? 'Global Education Consultants' : 'Tanvir Ahmed'}
        />
      </div>

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
      </div>

      <div className="space-y-1.5">
        <label htmlFor="password" className="text-sm font-medium text-slate-900">
          Password
        </label>
        <Input
          id="password"
          type="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="••••••••"
        />
      </div>

      <div className="space-y-1.5">
        <label htmlFor="confirmPassword" className="text-sm font-medium text-slate-900">
          Confirm Password
        </label>
        <Input
          id="confirmPassword"
          type="password"
          required
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="••••••••"
        />
      </div>

      <label className="flex items-start gap-2 text-sm font-normal text-slate-600">
        <Checkbox
          isSelected={agreedToTerms}
          onChange={setAgreedToTerms}
          className="mt-0.5"
        />
        I agree to the Terms of Service and Privacy Policy
      </label>

      <button
        type="submit"
        disabled={isSubmitting}
        className="flex w-full items-center justify-center gap-2 rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white transition-all duration-200 hover:bg-indigo-700 active:scale-[0.98] disabled:opacity-60"
      >
        {isSubmitting && <Loader2 className="h-4 w-4 animate-spin" />}
        {isSubmitting ? 'Creating account...' : `Register as ${role === 'agency' ? 'Agency' : 'Student'}`}
      </button>
    </form>
  )
}