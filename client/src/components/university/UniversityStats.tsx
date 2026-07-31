import { Award, CalendarClock, DollarSign, GraduationCap, Languages, TrendingUp } from 'lucide-react'
import type { University } from '@/lib/mockData'
import { formatMoney, formatPercent, formatDate } from '@/lib/utils'

interface UniversityStatsProps {
  university: University
}

export default function UniversityStats({ university }: UniversityStatsProps) {
  const stats = [
    {
      icon: Award,
      label: 'World Ranking',
      value: university.worldRanking ? `#${university.worldRanking}` : 'Unranked',
    },
    {
      icon: TrendingUp,
      label: 'Acceptance Rate',
      value: formatPercent(university.acceptanceRate),
    },
    {
      icon: DollarSign,
      label: 'Tuition Range',
      value: `${formatMoney(university.tuitionMin)} – ${formatMoney(university.tuitionMax)}`,
    },
    {
      icon: GraduationCap,
      label: 'Min. CGPA',
      value: university.minCgpa.toFixed(2),
    },
    {
      icon: Languages,
      label: 'Min. IELTS',
      value: university.minIelts ? university.minIelts.toFixed(1) : 'Not required',
    },
    {
      icon: CalendarClock,
      label: 'Application Deadline',
      value: formatDate(university.applicationDeadline),
    },
  ]

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600">
            <stat.icon className="h-4 w-4" />
          </div>
          <p className="mt-4 text-xs font-medium uppercase tracking-wide text-slate-400">
            {stat.label}
          </p>
          <p className="mt-1 text-lg font-semibold tracking-tight text-slate-900">
            {stat.value}
          </p>
        </div>
      ))}
    </div>
  )
}