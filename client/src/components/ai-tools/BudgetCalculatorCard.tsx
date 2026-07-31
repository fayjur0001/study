'use client'

import { useState } from 'react'
import { Calculator } from 'lucide-react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import Loader from '@/components/ui/loader'
import { formatMoney } from '@/lib/utils'
import type { Country } from '@/lib/mockData'

interface BudgetCalculatorCardProps {
  countries: Country[]
}

export default function BudgetCalculatorCard({ countries }: BudgetCalculatorCardProps) {
  const [countryId, setCountryId] = useState('')
  const [years, setYears] = useState(2)
  const [isCalculating, setIsCalculating] = useState(false)
  const [result, setResult] = useState<{
    tuitionPerYear: number
    livingPerYear: number
    total: number
  } | null>(null)

  function handleCalculate() {
    const country = countries.find((c) => c.id === countryId)
    if (!country) return

    setIsCalculating(true)
    setTimeout(() => {
      const tuitionPerYear = country.avgTuition
      const livingPerYear = country.avgLivingCost
      setResult({
        tuitionPerYear,
        livingPerYear,
        total: (tuitionPerYear + livingPerYear) * years,
      })
      setIsCalculating(false)
    }, 1500)
  }

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex items-center gap-2">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600">
          <Calculator className="h-4 w-4" />
        </div>
        <h3 className="text-lg font-semibold tracking-tight text-slate-900">
          Budget Calculator
        </h3>
      </div>
      <p className="mt-2 text-sm font-normal leading-relaxed text-slate-500">
        Estimate your total cost of study based on your destination country and program length.
      </p>

      <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="space-y-1.5">
          <label className="text-sm font-medium text-slate-900">Country</label>
          <Select value={countryId} onValueChange={setCountryId}>
            <SelectTrigger>
              <SelectValue placeholder="Select a country" />
            </SelectTrigger>
            <SelectContent>
              {countries.map((country) => (
                <SelectItem key={country.id} value={country.id}>
                  {country.flagEmoji} {country.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-1.5">
          <label className="text-sm font-medium text-slate-900">Duration (years)</label>
          <Input
            type="number"
            min={1}
            max={6}
            value={years}
            onChange={(e) => setYears(Number(e.target.value))}
          />
        </div>
      </div>

      <button
        onClick={handleCalculate}
        disabled={!countryId || isCalculating}
        className="mt-5 flex items-center justify-center gap-2 rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white transition-all duration-200 hover:bg-indigo-700 active:scale-[0.98] disabled:opacity-60"
      >
        {isCalculating ? 'Calculating...' : 'Calculate'}
      </button>

      {isCalculating && (
        <div className="mt-6 flex flex-col items-center justify-center gap-3 py-8">
          <Loader size="md" />
          <p className="text-sm font-normal text-slate-500">Crunching the numbers...</p>
        </div>
      )}

      {!isCalculating && result && (
        <div className="mt-6 space-y-3 rounded-lg border border-slate-200 p-4">
          <div className="flex items-center justify-between text-sm">
            <span className="text-slate-500">Tuition per year</span>
            <span className="font-medium text-slate-900">{formatMoney(result.tuitionPerYear)}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-slate-500">Living cost per year</span>
            <span className="font-medium text-slate-900">{formatMoney(result.livingPerYear)}</span>
          </div>
          <div className="flex items-center justify-between border-t border-slate-200 pt-3 text-base">
            <span className="font-semibold text-slate-900">Total estimated cost</span>
            <span className="font-semibold text-indigo-600">{formatMoney(result.total)}</span>
          </div>
        </div>
      )}
    </div>
  )
}