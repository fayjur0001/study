import { cn } from '@/lib/utils'

interface StatCardProps {
  icon: React.ReactNode
  label: string
  value: string | number
  trend?: string
}

export default function StatCard({ icon, label, value, trend }: StatCardProps) {
  const isPositive = trend?.trim().startsWith('+')
  const isNegative = trend?.trim().startsWith('-')

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium uppercase tracking-wide text-slate-400">
          {label}
        </span>
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600">
          {icon}
        </div>
      </div>

      <div className="mt-4 flex items-baseline gap-2">
        <span className="text-3xl md:text-4xl font-semibold tracking-tight text-slate-900">
          {value}
        </span>
        {trend && (
          <span
            className={cn(
              'text-sm font-medium',
              isPositive && 'text-emerald-500',
              isNegative && 'text-rose-500',
              !isPositive && !isNegative && 'text-slate-500'
            )}
          >
            {trend}
          </span>
        )}
      </div>
    </div>
  )
}