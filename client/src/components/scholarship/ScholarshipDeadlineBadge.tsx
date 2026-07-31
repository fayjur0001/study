import { differenceInCalendarDays } from 'date-fns'
import { cn } from '@/lib/utils'

interface ScholarshipDeadlineBadgeProps {
  deadline: string
  className?: string
}

export default function ScholarshipDeadlineBadge({
  deadline,
  className,
}: ScholarshipDeadlineBadgeProps) {
  const today = new Date()
  const deadlineDate = new Date(deadline)
  const daysLeft = differenceInCalendarDays(deadlineDate, today)

  let colorClasses = 'bg-slate-100 text-slate-600'
  let label = `${daysLeft} days left`

  if (daysLeft < 0) {
    colorClasses = 'bg-slate-100 text-slate-400'
    label = 'Deadline passed'
  } else if (daysLeft < 30) {
    colorClasses = 'bg-rose-50 text-rose-500'
  } else if (daysLeft <= 90) {
    colorClasses = 'bg-amber-50 text-amber-600'
  }

  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium uppercase tracking-wide',
        colorClasses,
        className
      )}
    >
      {label}
    </span>
  )
}