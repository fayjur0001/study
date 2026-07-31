import { BookOpen } from 'lucide-react'
import type { University } from '@/lib/mockData'

interface UniversityProgramsProps {
  university: University
}

export default function UniversityPrograms({ university }: UniversityProgramsProps) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="text-2xl font-semibold tracking-tight text-slate-900">
        Programs Offered
      </h2>

      <ul className="mt-5 space-y-3">
        {university.programs.map((program) => (
          <li
            key={program}
            className="flex items-center justify-between rounded-lg border border-slate-200 px-4 py-3"
          >
            <div className="flex items-center gap-3">
              <BookOpen className="h-4 w-4 text-indigo-600" />
              <span className="text-sm font-normal text-slate-900">{program}</span>
            </div>
            <span className="rounded-full bg-indigo-50 px-2.5 py-1 text-xs font-medium uppercase tracking-wide text-indigo-700">
              {university.entryRequirements ? 'Degree' : 'Program'}
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}