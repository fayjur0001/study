'use client'

import { useState } from 'react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Slider } from '@/components/ui/slider'
import { formatMoney } from '@/lib/utils'

export interface ScholarshipFilterValues {
  countryId: string
  coverageType: string
  amountRange: [number, number]
  sortByDeadline: 'asc' | 'desc'
}

interface ScholarshipFiltersProps {
  countryOptions: { id: string; name: string }[]
  onFilterChange: (filters: ScholarshipFilterValues) => void
}

const DEFAULT_FILTERS: ScholarshipFilterValues = {
  countryId: 'all',
  coverageType: 'all',
  amountRange: [0, 50000],
  sortByDeadline: 'asc',
}

export default function ScholarshipFilters({
  countryOptions,
  onFilterChange,
}: ScholarshipFiltersProps) {
  const [filters, setFilters] = useState<ScholarshipFilterValues>(DEFAULT_FILTERS)

  function update(partial: Partial<ScholarshipFilterValues>) {
    const next = { ...filters, ...partial }
    setFilters(next)
    onFilterChange(next)
  }

  return (
    <div className="space-y-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div>
        <h3 className="text-xs font-medium uppercase tracking-wide text-slate-400">Country</h3>
        <Select value={filters.countryId} onValueChange={(v) => update({ countryId: v })}>
          <SelectTrigger className="mt-3">
            <SelectValue placeholder="All countries" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All countries</SelectItem>
            {countryOptions.map((country) => (
              <SelectItem key={country.id} value={country.id}>
                {country.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <h3 className="text-xs font-medium uppercase tracking-wide text-slate-400">
          Coverage Type
        </h3>
        <Select
          value={filters.coverageType}
          onValueChange={(v) => update({ coverageType: v })}
        >
          <SelectTrigger className="mt-3">
            <SelectValue placeholder="All types" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All types</SelectItem>
            <SelectItem value="full">Full Coverage</SelectItem>
            <SelectItem value="partial">Partial Coverage</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <h3 className="text-xs font-medium uppercase tracking-wide text-slate-400">
          Amount Range
        </h3>
        <p className="mt-2 text-sm font-normal text-slate-500">
          {formatMoney(filters.amountRange[0])} – {formatMoney(filters.amountRange[1])}
        </p>
        <Slider
          className="mt-3"
          min={0}
          max={50000}
          step={1000}
          value={filters.amountRange}
          onValueChange={(v) => update({ amountRange: v as [number, number] })}
        />
      </div>

      <div>
        <h3 className="text-xs font-medium uppercase tracking-wide text-slate-400">
          Sort by Deadline
        </h3>
        <Select
          value={filters.sortByDeadline}
          onValueChange={(v) => update({ sortByDeadline: v as 'asc' | 'desc' })}
        >
          <SelectTrigger className="mt-3">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="asc">Soonest first</SelectItem>
            <SelectItem value="desc">Latest first</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}