import { Building2, Dumbbell, Library, Users, Wifi, ShieldCheck } from 'lucide-react'
import type { University } from '@/lib/mockData'

const ICONS = [Library, Dumbbell, Wifi, Users, Building2, ShieldCheck]

interface UniversityFacilitiesProps {
  university: University
}

export default function UniversityFacilities({ university }: UniversityFacilitiesProps) {
  if (university.facilities.length === 0) return null

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold tracking-tight text-slate-900">Campus Life</h2>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {university.facilities.map((facility, i) => {
          const Icon = ICONS[i % ICONS.length]
          return (
            <div
              key={facility}
              className="flex items-center gap-4 rounded-2xl border border-slate-100 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#0d3286]/5 text-[#0d3286]">
                <Icon className="h-6 w-6" />
              </div>
              <p className="font-semibold text-slate-900">{facility}</p>
            </div>
          )
        })}
      </div>
    </div>
  )
}