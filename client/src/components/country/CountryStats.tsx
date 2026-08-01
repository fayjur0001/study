import { Briefcase, Clock3, DollarSign, GraduationCap, TrendingUp, Wallet } from 'lucide-react'
import type { Country } from '@/lib/mockData'
import { formatMoney, formatPercent } from '@/lib/utils'

interface CountryStatsProps {
  country: Country
}

export default function CountryStats({ country }: CountryStatsProps) {
  const stats = [
    { icon: DollarSign, label: 'Avg. Tuition', value: `${formatMoney(country.avgTuition)}/yr` },
    { icon: Wallet, label: 'Avg. Living Cost', value: `${formatMoney(country.avgLivingCost)}/yr` },
    { icon: TrendingUp, label: 'Visa Success Rate', value: formatPercent(country.visaSuccessRate) },
    { icon: Clock3, label: 'Processing Time', value: `${country.processingTimeWeeks} weeks` },
    {
      icon: Briefcase,
      label: 'Part-Time Work',
      value: country.partTimeWorkAllowed ? 'Allowed' : 'Not Allowed',
    },
    { icon: GraduationCap, label: 'PSWP Duration', value: `${country.pswpDurationMonths} months` },
  ]

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#0d3286]/5 text-[#0d3286]">
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