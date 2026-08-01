import { BookOpen } from 'lucide-react'
import type { University } from '@/lib/mockData'

interface UniversityProgramsProps {
  university: University
}

export default function UniversityPrograms({ university }: UniversityProgramsProps) {
  return (
    <div className="rounded-[24px] border border-slate-100 bg-white p-8 shadow-sm">
      <h2 className="text-2xl font-semibold tracking-tight text-slate-900">Programs Offered</h2>

      <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
        {university.programs.map((program, i) => (
          <div
            key={program}
            className={
              i === 0
                ? 'rounded-2xl bg-[#0d3286] p-6 text-white md:col-span-2'
                : 'rounded-2xl bg-slate-50 p-6'
            }
          >
            <div className="mb-3 flex items-center gap-2">
              <BookOpen className={i === 0 ? 'h-4 w-4 text-white' : 'h-4 w-4 text-[#0d3286]'} />
              {i === 0 && (
                <span className="rounded-full bg-white/20 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide">
                  Most Popular
                </span>
              )}
            </div>
            <p className={i === 0 ? 'text-lg font-semibold' : 'text-base font-semibold text-slate-900'}>
              {program}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}