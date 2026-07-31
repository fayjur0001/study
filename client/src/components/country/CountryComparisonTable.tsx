'use client'

import { useState } from 'react'
import { X } from 'lucide-react'
import type { Country } from '@/lib/mockData'
import { formatMoney, formatPercent } from '@/lib/utils'
import { Checkbox } from '@/components/ui/checkbox'
import EmptyState from '@/components/common/EmptyState'
import { Scale } from 'lucide-react'

interface CountryComparisonTableProps {
  countries: Country[]
}

const MAX_SELECTION = 3

const rows: {
  label: string
  render: (country: Country) => React.ReactNode
}[] = [
  { label: 'Avg. Tuition', render: (c) => `${formatMoney(c.avgTuition)}/yr` },
  { label: 'Living Cost', render: (c) => `${formatMoney(c.avgLivingCost)}/yr` },
  { label: 'Visa Success Rate', render: (c) => formatPercent(c.visaSuccessRate) },
  { label: 'Processing Time', render: (c) => `${c.processingTimeWeeks} weeks` },
  { label: 'Part-Time Work', render: (c) => (c.partTimeWorkAllowed ? 'Allowed' : 'Not Allowed') },
  { label: 'PSWP Duration', render: (c) => `${c.pswpDurationMonths} months` },
  { label: 'PR Opportunity', render: (c) => c.prOpportunity },
  { label: 'Climate', render: (c) => c.climate },
  { label: 'Language', render: (c) => c.language },
  { label: 'Currency', render: (c) => c.currency },
]

export default function CountryComparisonTable({ countries }: CountryComparisonTableProps) {
  const [selectedIds, setSelectedIds] = useState<string[]>(
    countries.slice(0, 2).map((c) => c.id)
  )

  function toggleCountry(id: string) {
    setSelectedIds((prev) => {
      if (prev.includes(id)) return prev.filter((c) => c !== id)
      if (prev.length >= MAX_SELECTION) return prev
      return [...prev, id]
    })
  }

  const selectedCountries = countries.filter((c) => selectedIds.includes(c.id))

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-slate-900">Select up to 3 countries</h3>
        <div className="mt-4 flex flex-wrap gap-3">
          {countries.map((country) => (
            <label
              key={country.id}
              className="flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-sm font-normal text-slate-600"
            >
              <Checkbox
                checked={selectedIds.includes(country.id)}
                onCheckedChange={() => toggleCountry(country.id)}
                disabled={
                  !selectedIds.includes(country.id) && selectedIds.length >= MAX_SELECTION
                }
              />
              {country.flagEmoji} {country.name}
            </label>
          ))}
        </div>
      </div>

      {selectedCountries.length === 0 ? (
        <EmptyState
          icon={<Scale className="h-6 w-6" />}
          title="No countries selected"
          description="Select at least one country above to see a side-by-side comparison."
        />
      ) : (
        <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-sm">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="p-4 text-left font-medium text-slate-400">Metric</th>
                {selectedCountries.map((country) => (
                  <th key={country.id} className="p-4 text-left">
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-semibold text-slate-900">
                        {country.flagEmoji} {country.name}
                      </span>
                      <button
                        onClick={() => toggleCountry(country.id)}
                        className="text-slate-400 hover:text-rose-500"
                        aria-label={`Remove ${country.name}`}
                      >
                        <X className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.label} className="border-b border-slate-200 last:border-0">
                  <td className="p-4 font-medium text-slate-500">{row.label}</td>
                  {selectedCountries.map((country) => (
                    <td key={country.id} className="p-4 capitalize text-slate-900">
                      {row.render(country)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}