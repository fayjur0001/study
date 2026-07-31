'use client'

import type { Application } from '@/lib/mockData'
import { formatDate } from '@/lib/utils'
import ApplicationStageBadge from '@/components/application/ApplicationStageBadge'

interface ApplicationTableProps {
  applications: Application[]
  renderActions?: (application: Application) => React.ReactNode
}

export default function ApplicationTable({ applications, renderActions }: ApplicationTableProps) {
  return (
    <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-sm">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-slate-200">
            <th className="p-4 text-left font-medium text-slate-400">Student</th>
            <th className="p-4 text-left font-medium text-slate-400">University</th>
            <th className="p-4 text-left font-medium text-slate-400">Stage</th>
            <th className="p-4 text-left font-medium text-slate-400">Updated</th>
            {renderActions && (
              <th className="p-4 text-left font-medium text-slate-400">Actions</th>
            )}
          </tr>
        </thead>
        <tbody>
          {applications.map((application) => (
            <tr key={application.id} className="border-b border-slate-200 last:border-0">
              <td className="p-4 font-medium text-slate-900">{application.studentName}</td>
              <td className="p-4 text-slate-600">
                {application.universityName}
                <span className="block text-xs font-normal text-slate-400">
                  {application.program}
                </span>
              </td>
              <td className="p-4">
                <ApplicationStageBadge stage={application.stage} />
              </td>
              <td className="p-4 text-slate-500">{formatDate(application.updatedAt)}</td>
              {renderActions && <td className="p-4">{renderActions(application)}</td>}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}