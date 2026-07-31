'use client'

import { useState } from 'react'
import { Sparkles } from 'lucide-react'
import Loader from '@/components/ui/loader'
import MatchScoreBadge from '@/components/university/MatchScoreBadge'
import { formatMoney, formatPercent } from '@/lib/utils'
import type { University } from '@/lib/mockData'

interface MockMatch {
  university: University
  overallMatch: number
  academicMatch: number
  budgetMatch: number
  languageMatch: number
  scholarshipChance: 'low' | 'medium' | 'high'
}

interface RecommendationEngineProps {
  universities: University[]
}

const scholarshipChanceColor: Record<MockMatch['scholarshipChance'], string> = {
  low: 'text-rose-500',
  medium: 'text-amber-600',
  high: 'text-emerald-600',
}

export default function RecommendationEngine({ universities }: RecommendationEngineProps) {
  const [isFinding, setIsFinding] = useState(false)
  const [matches, setMatches] = useState<MockMatch[] | null>(null)

  function handleFindMatches() {
    setIsFinding(true)
    setTimeout(() => {
      const sample = universities.slice(0, 3)
      const mockMatches: MockMatch[] = sample.map((university, index) => ({
        university,
        overallMatch: 94 - index * 6,
        academicMatch: 91 - index * 5,
        budgetMatch: 88 - index * 4,
        languageMatch: 96 - index * 3,
        scholarshipChance: index === 0 ? 'high' : index === 1 ? 'medium' : 'low',
      }))
      setMatches(mockMatches)
      setIsFinding(false)
    }, 1800)
  }

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex items-center gap-2">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600">
          <Sparkles className="h-4 w-4" />
        </div>
        <h3 className="text-lg font-semibold tracking-tight text-slate-900">
          Recommendation Engine
        </h3>
      </div>
      <p className="mt-2 text-sm font-normal leading-relaxed text-slate-500">
        Find universities that best match your academic profile, budget, and language scores.
      </p>

      <button
        onClick={handleFindMatches}
        disabled={isFinding}
        className="mt-5 flex items-center justify-center gap-2 rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white transition-all duration-200 hover:bg-indigo-700 active:scale-[0.98] disabled:opacity-60"
      >
        {isFinding ? 'Finding matches...' : 'Find My Matches'}
      </button>

      {isFinding && (
        <div className="mt-6 flex flex-col items-center justify-center gap-3 py-8">
          <Loader size="md" />
          <p className="text-sm font-normal text-slate-500">Matching your profile...</p>
        </div>
      )}

      {!isFinding && matches && (
        <div className="mt-6 space-y-4">
          {matches.map((match) => (
            <div
              key={match.university.id}
              className="rounded-lg border border-slate-200 p-4 transition-all duration-200 hover:shadow-md"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h4 className="text-base font-semibold text-slate-900">
                    {match.university.name}
                  </h4>
                  <p className="mt-0.5 text-sm font-normal text-slate-500">
                    {match.university.countryName} ·{' '}
                    {formatMoney(match.university.tuitionMin)} –{' '}
                    {formatMoney(match.university.tuitionMax)}
                  </p>
                </div>
                <MatchScoreBadge score={match.overallMatch} size="sm" />
              </div>

              <div className="mt-4 grid grid-cols-3 gap-3 text-center text-xs font-medium">
                <div className="rounded-lg bg-slate-50 p-2">
                  <p className="text-slate-400">Academic</p>
                  <p className="mt-1 text-sm text-slate-900">{formatPercent(match.academicMatch)}</p>
                </div>
                <div className="rounded-lg bg-slate-50 p-2">
                  <p className="text-slate-400">Budget</p>
                  <p className="mt-1 text-sm text-slate-900">{formatPercent(match.budgetMatch)}</p>
                </div>
                <div className="rounded-lg bg-slate-50 p-2">
                  <p className="text-slate-400">Language</p>
                  <p className="mt-1 text-sm text-slate-900">{formatPercent(match.languageMatch)}</p>
                </div>
              </div>

              <p className="mt-3 text-xs font-medium uppercase tracking-wide">
                Scholarship Chance:{' '}
                <span className={scholarshipChanceColor[match.scholarshipChance]}>
                  {match.scholarshipChance}
                </span>
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}