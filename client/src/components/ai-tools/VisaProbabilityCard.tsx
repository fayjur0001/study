'use client'

import { useState } from 'react'
import { ShieldCheck } from 'lucide-react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import Loader from '@/components/ui/loader'
import { formatPercent } from '@/lib/utils'
import type { Country, StudentProfile } from '@/lib/mockData'

interface VisaProbabilityCardProps {
  countries: Country[]
  profile: StudentProfile
}

const MOCK_FACTORS = [
  'Strong academic performance (CGPA above program average)',
  'Sufficient documented financial capacity for tuition and living costs',
  'Clear study plan aligned with career goals',
]

export default function VisaProbabilityCard({ countries, profile }: VisaProbabilityCardProps) {
  const [countryId, setCountryId] = useState('')
  const [isPredicting, setIsPredicting] = useState(false)
  const [probability, setProbability] = useState<number | null>(null)

  function handlePredict() {
    const country = countries.find((c) => c.id === countryId)
    if (!country) return

    setIsPredicting(true)
    setTimeout(() => {
      const base = country.visaSuccessRate
      const adjustment = profile.eligibilityScore > 80 ? 5 : profile.eligibilityScore < 50 ? -8 : 0
      setProbability(Math.max(0, Math.min(100, base + adjustment)))
      setIsPredicting(false)
    }, 1500)
  }

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex items-center gap-2">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600">
          <ShieldCheck className="h-4 w-4" />
        </div>
        <h3 className="text-lg font-semibold tracking-tight text-slate-900">
          Visa Probability
        </h3>
      </div>
      <p className="mt-2 text-sm font-normal leading-relaxed text-slate-500">
        Get an estimated visa approval likelihood based on your profile and destination country.
      </p>

      <div className="mt-5 rounded-lg bg-slate-50 p-4 text-sm">
        <p className="font-medium text-slate-900">Your Profile Summary</p>
        <div className="mt-2 grid grid-cols-2 gap-2 text-slate-500">
          <span>CGPA: {profile.cgpa.toFixed(2)}</span>
          <span>Eligibility Score: {profile.eligibilityScore}</span>
          <span>IELTS: {profile.ielts ?? 'N/A'}</span>
          <span>Scholarship Need: {profile.scholarshipNeed}</span>
        </div>
      </div>

      <div className="mt-5 space-y-1.5">
        <label className="text-sm font-medium text-slate-900">Destination Country</label>
        <Select
          selectedKey={countryId}
          onSelectionChange={(key) => setCountryId(String(key))}
          placeholder="Select a country"
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {countries.map((country) => (
              <SelectItem key={country.id} id={country.id}>
                {country.flagEmoji} {country.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <button
        onClick={handlePredict}
        disabled={!countryId || isPredicting}
        className="mt-5 flex items-center justify-center gap-2 rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white transition-all duration-200 hover:bg-indigo-700 active:scale-[0.98] disabled:opacity-60"
      >
        {isPredicting ? 'Predicting...' : 'Predict'}
      </button>

      {isPredicting && (
        <div className="mt-6 flex flex-col items-center justify-center gap-3 py-8">
          <Loader size="md" />
          <p className="text-sm font-normal text-slate-500">Assessing your profile...</p>
        </div>
      )}

      {!isPredicting && probability !== null && (
        <div className="mt-6 rounded-lg border border-slate-200 p-4">
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-semibold tracking-tight text-emerald-600">
              {formatPercent(Math.round(probability))}
            </span>
            <span className="text-sm font-normal text-slate-500">estimated approval likelihood</span>
          </div>
          <ul className="mt-4 space-y-2">
            {MOCK_FACTORS.map((factor, i) => (
              <li key={i} className="flex gap-2 text-sm font-normal leading-relaxed text-slate-600">
                <span className="text-indigo-600">•</span>
                {factor}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}