import Link from 'next/link'
import type { Scholarship } from '@/lib/mockData'
import { formatMoney } from '@/lib/utils'
import ScholarshipDeadlineBadge from '@/components/scholarship/ScholarshipDeadlineBadge'
import { cn } from '@/lib/utils'

interface ScholarshipCardProps {
  scholarship: Scholarship
}

export default function ScholarshipCard({ scholarship }: ScholarshipCardProps) {
  return (
    <Link
      href={`/scholarships/${scholarship.id}`}
      className="group block rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
    >
      <div className="flex items-start justify-between gap-3">
        <span
          className={cn(
            'inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium uppercase tracking-wide',
            scholarship.coverageType === 'full'
              ? 'bg-emerald-50 text-emerald-600'
              : 'bg-sky-50 text-sky-600'
          )}
        >
          {scholarship.coverageType === 'full' ? 'Full Coverage' : 'Partial Coverage'}
        </span>
        <ScholarshipDeadlineBadge deadline={scholarship.deadline} />
      </div>

      <h3 className="mt-4 text-lg font-semibold tracking-tight text-slate-900 line-clamp-2">
        {scholarship.title}
      </h3>
      <p className="mt-1 text-sm font-normal text-slate-500">
        {scholarship.provider} · {scholarship.countryName}
      </p>

      <div className="mt-4 flex items-center justify-between">
        <span className="text-lg font-semibold tracking-tight text-slate-900">
          {formatMoney(scholarship.amount)}
        </span>
        <span className="text-sm font-medium text-indigo-600 group-hover:text-indigo-700">
          View Details →
        </span>
      </div>
    </Link>
  )
}