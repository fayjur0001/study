import Link from 'next/link'
import { Clock } from 'lucide-react'
import type { Scholarship } from '@/lib/mockData'
import { mockCountries } from '@/lib/mockData'
import { formatMoney } from '@/lib/utils'
import ScholarshipDeadlineBadge from '@/components/scholarship/ScholarshipDeadlineBadge'
import { cn } from '@/lib/utils'

interface ScholarshipCardProps {
  scholarship: Scholarship
}

export default function ScholarshipCard({ scholarship }: ScholarshipCardProps) {
  const countryImage = mockCountries.find((c) => c.id === scholarship.countryId)?.image

  return (
    <Link
      href={`/scholarships/${scholarship.id}`}
      className="group flex flex-col overflow-hidden rounded-[24px] bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
    >
      <div className="relative h-40">
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        {countryImage && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={countryImage} alt={scholarship.countryName} className="h-full w-full object-cover" />
        )}
        <span
          className={cn(
            'absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-bold backdrop-blur',
            scholarship.coverageType === 'full' ? 'text-[#0d3286]' : 'text-[#3156c4]'
          )}
        >
          {scholarship.coverageType === 'full' ? 'Full Ride' : 'Partial'}
        </span>
      </div>

      <div className="flex flex-grow flex-col p-6">
        <h4 className="mb-2 text-lg font-semibold text-slate-900 line-clamp-2">
          {scholarship.title}
        </h4>
        <p className="mb-4 text-sm text-slate-500 line-clamp-2">
          {scholarship.provider} · {scholarship.countryName}
        </p>
        <div className="mt-auto flex items-center justify-between">
          <span className="text-xl font-bold text-[#0d3286]">
            {formatMoney(scholarship.amount)}
          </span>
          <ScholarshipDeadlineBadge deadline={scholarship.deadline} />
        </div>
      </div>
    </Link>
  )
}