'use client'

import { useState } from 'react'
import { Slider } from '@/components/ui/slider'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Checkbox } from '@/components/ui/checkbox'
import { formatMoney, formatPercent } from '@/lib/utils'

export interface UniversityFilterValues {
  countries: string[]
  degreeLevel: string
  tuitionRange: [number, number]
  minAcceptanceRate: number
  minPswpMonths: number
  search: string
}

interface UniversityFiltersProps {
  countryOptions: { id: string; name: string }[]
  onFilterChange: (filters: UniversityFilterValues) => void
}

const DEFAULT_FILTERS: UniversityFilterValues = {
  countries: [],
  degreeLevel: 'all',
  tuitionRange: [0, 60000],
  minAcceptanceRate: 0,
  minPswpMonths: 0,
  search: '',
}

export default function UniversityFilters({
  countryOptions,
  onFilterChange,
}: UniversityFiltersProps) {
  const [filters, setFilters] = useState<UniversityFilterValues>(DEFAULT_FILTERS)

  function update(partial: Partial<UniversityFilterValues>) {
    const next = { ...filters, ...partial }
    setFilters(next)
    onFilterChange(next)
  }

  function toggleCountry(id: string) {
    const next = filters.countries.includes(id)
      ? filters.countries.filter((c) => c !== id)
      : [...filters.countries, id]
    update({ countries: next })
  }

  return (
    <div className="space-y-6 rounded-[24px] border border-slate-100 bg-white p-6 shadow-sm">
      <div>
        <input
          type="text"
          value={filters.search}
          onChange={(e) => update({ search: e.target.value })}
          placeholder="Search universities..."
          className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm outline-none transition-all duration-200 focus:border-[#0d3286] focus:ring-2 focus:ring-[#0d3286]/10"
        />
      </div>

      <div>
        <h3 className="text-xs font-bold uppercase tracking-wide text-slate-400">Country</h3>
        <div className="mt-3 space-y-2">
          {countryOptions.map((country) => (
            <label key={country.id} className="flex items-center gap-2 text-sm font-normal text-slate-600">
              <Checkbox
                isSelected={filters.countries.includes(country.id)}
                onChange={() => toggleCountry(country.id)}
              />
              {country.name}
            </label>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-xs font-bold uppercase tracking-wide text-slate-400">
          Degree Level
        </h3>
        <Select
          selectedKey={filters.degreeLevel}
          onSelectionChange={(key) => update({ degreeLevel: String(key) })}
          placeholder="All levels"
        >
          <SelectTrigger className="mt-3">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem id="all">All levels</SelectItem>
            <SelectItem id="UG">Undergraduate</SelectItem>
            <SelectItem id="PG">Postgraduate</SelectItem>
            <SelectItem id="PhD">PhD</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <h3 className="text-xs font-bold uppercase tracking-wide text-slate-400">
          Tuition Range
        </h3>
        <p className="mt-2 text-sm font-normal text-slate-500">
          {formatMoney(filters.tuitionRange[0])} – {formatMoney(filters.tuitionRange[1])}
        </p>
        <Slider
          className="mt-3"
          min={0}
          max={60000}
          step={1000}
          value={filters.tuitionRange}
          onValueChange={(v) => update({ tuitionRange: v as [number, number] })}
        />
      </div>

      <div>
        <h3 className="text-xs font-bold uppercase tracking-wide text-slate-400">
          Min. Acceptance Rate
        </h3>
        <p className="mt-2 text-sm font-normal text-slate-500">
          {formatPercent(filters.minAcceptanceRate)}
        </p>
        <Slider
          className="mt-3"
          min={0}
          max={100}
          step={5}
          value={[filters.minAcceptanceRate]}
          onValueChange={(v) => update({ minAcceptanceRate: v[0] })}
        />
      </div>

      <div>
        <h3 className="text-xs font-bold uppercase tracking-wide text-slate-400">
          Min. PSWP Duration (months)
        </h3>
        <p className="mt-2 text-sm font-normal text-slate-500">{filters.minPswpMonths} months</p>
        <Slider
          className="mt-3"
          min={0}
          max={36}
          step={3}
          value={[filters.minPswpMonths]}
          onValueChange={(v) => update({ minPswpMonths: v[0] })}
        />
      </div>
    </div>
  )
}