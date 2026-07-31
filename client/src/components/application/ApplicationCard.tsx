import Link from 'next/link'
import type { Application } from '@/lib/mockData'
import { formatDate } from '@/lib/utils'
import ApplicationStageBadge from '@/components/application/ApplicationStageBadge'

interface ApplicationCardProps {
  application: Application
}

export default function ApplicationCard({ application }: ApplicationCardProps) {
  return (
    <Link
      href={`/student/applications/${application.id}`}
      className="group block rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="text-base font-semibold tracking-tight text-slate-900">
            {application.universityName}
          </h3>
          <p className="mt-1 text-sm font-normal text-slate-500">
            {application.program} · {application.countryName}
          </p>
        </div>
        <ApplicationStageBadge stage={application.stage} />
      </div>

      <div className="mt-4 flex items-center justify-between text-sm">
        <span className="text-slate-400">Updated {formatDate(application.updatedAt)}</span>
        <span className="font-medium text-indigo-600 group-hover:text-indigo-700">
          View Details →
        </span>
      </div>
    </Link>
  )
}