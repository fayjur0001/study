'use client'

import { useState } from 'react'
import toast from 'react-hot-toast'
import { Loader2 } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { formatMoney } from '@/lib/utils'
import { cn } from '@/lib/utils'
import type { StudentProfile } from '@/lib/mockData'

interface FinancialProfileFormProps {
  profile: StudentProfile
}

const scholarshipOptions: { value: StudentProfile['scholarshipNeed']; label: string }[] = [
  { value: 'none', label: 'None' },
  { value: 'partial', label: 'Partial' },
  { value: 'full', label: 'Full' },
]

export default function FinancialProfileForm({ profile }: FinancialProfileFormProps) {
  const [tuitionBudget, setTuitionBudget] = useState(profile.annualTuitionBudget)
  const [livingBudget, setLivingBudget] = useState(profile.livingCostBudget)
  const [scholarshipNeed, setScholarshipNeed] = useState(profile.scholarshipNeed)
  const [isSaving, setIsSaving] = useState(false)

  function handleSave() {
    setIsSaving(true)
    setTimeout(() => {
      setIsSaving(false)
      toast.success('Financial profile updated')
    }, 1000)
  }

  return (
    <div className="space-y-6">
      <div className="space-y-1.5">
        <label className="text-sm font-medium text-slate-900">Annual Tuition Budget</label>
        <Input
          type="number"
          value={tuitionBudget}
          onChange={(e) => setTuitionBudget(Number(e.target.value))}
        />
        <p className="text-sm font-normal text-slate-500">
          Preview: {formatMoney(tuitionBudget)} ({formatMoney(tuitionBudget, 'BDT')})
        </p>
      </div>

      <div className="space-y-1.5">
        <label className="text-sm font-medium text-slate-900">Living Cost Budget</label>
        <Input
          type="number"
          value={livingBudget}
          onChange={(e) => setLivingBudget(Number(e.target.value))}
        />
        <p className="text-sm font-normal text-slate-500">
          Preview: {formatMoney(livingBudget)} ({formatMoney(livingBudget, 'BDT')})
        </p>
      </div>

      <div>
        <h3 className="text-sm font-medium text-slate-900">Scholarship Need</h3>
        <div className="mt-3 flex gap-3">
          {scholarshipOptions.map((option) => (
            <label
              key={option.value}
              className={cn(
                'flex-1 cursor-pointer rounded-lg border px-4 py-2.5 text-center text-sm font-medium transition-all duration-200',
                scholarshipNeed === option.value
                  ? 'border-indigo-600 bg-indigo-50 text-indigo-700'
                  : 'border-slate-200 text-slate-500 hover:bg-slate-50'
              )}
            >
              <input
                type="radio"
                name="scholarshipNeed"
                value={option.value}
                checked={scholarshipNeed === option.value}
                onChange={() => setScholarshipNeed(option.value)}
                className="hidden"
              />
              {option.label}
            </label>
          ))}
        </div>
      </div>

      <button
        onClick={handleSave}
        disabled={isSaving}
        className="flex items-center justify-center gap-2 rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white transition-all duration-200 hover:bg-indigo-700 active:scale-[0.98] disabled:opacity-60"
      >
        {isSaving && <Loader2 className="h-4 w-4 animate-spin" />}
        {isSaving ? 'Saving...' : 'Save Changes'}
      </button>
    </div>
  )
}