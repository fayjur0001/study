import { CheckCircle2 } from 'lucide-react'
import type { Application } from '@/lib/mockData'
import { cn } from '@/lib/utils'

type ApplicationStage = Application['stage']

interface ApplicationTimelineProps {
  currentStage: ApplicationStage
}

const stages: { key: ApplicationStage; label: string }[] = [
  { key: 'draft', label: 'Draft' },
  { key: 'submitted', label: 'Submitted' },
  { key: 'under_review', label: 'Under Review' },
  { key: 'documents_required', label: 'Documents Required' },
  { key: 'accepted', label: 'Accepted' },
  { key: 'tuition_paid_visa_applied', label: 'Visa Applied' },
  { key: 'visa_approved', label: 'Visa Approved' },
]

export default function ApplicationTimeline({ currentStage }: ApplicationTimelineProps) {
  const currentIndex = stages.findIndex((s) => s.key === currentStage)

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="text-2xl font-semibold tracking-tight text-slate-900">
        Application Progress
      </h2>

      {/* Desktop: horizontal stepper */}
      <div className="mt-6 hidden md:flex md:items-start">
        {stages.map((stage, index) => {
          const isCompleted = index < currentIndex
          const isCurrent = index === currentIndex

          return (
            <div key={stage.key} className="flex flex-1 flex-col items-center">
              <div className="flex w-full items-center">
                <div
                  className={cn(
                    'flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-semibold transition-all duration-200',
                    isCompleted && 'bg-emerald-500 text-white',
                    isCurrent && 'bg-indigo-600 text-white',
                    !isCompleted && !isCurrent && 'bg-slate-100 text-slate-400'
                  )}
                >
                  {isCompleted ? <CheckCircle2 className="h-4 w-4" /> : index + 1}
                </div>
                {index < stages.length - 1 && (
                  <div
                    className={cn(
                      'h-0.5 flex-1',
                      isCompleted ? 'bg-emerald-500' : 'bg-slate-200'
                    )}
                  />
                )}
              </div>
              <span
                className={cn(
                  'mt-2 max-w-[90px] text-center text-xs font-medium leading-tight',
                  isCurrent ? 'text-indigo-700' : 'text-slate-500'
                )}
              >
                {stage.label}
              </span>
            </div>
          )
        })}
      </div>

      {/* Mobile: vertical stepper */}
      <div className="mt-6 flex flex-col md:hidden">
        {stages.map((stage, index) => {
          const isCompleted = index < currentIndex
          const isCurrent = index === currentIndex

          return (
            <div key={stage.key} className="flex gap-3">
              <div className="flex flex-col items-center">
                <div
                  className={cn(
                    'flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-semibold transition-all duration-200',
                    isCompleted && 'bg-emerald-500 text-white',
                    isCurrent && 'bg-indigo-600 text-white',
                    !isCompleted && !isCurrent && 'bg-slate-100 text-slate-400'
                  )}
                >
                  {isCompleted ? <CheckCircle2 className="h-4 w-4" /> : index + 1}
                </div>
                {index < stages.length - 1 && (
                  <div
                    className={cn(
                      'w-0.5 flex-1',
                      isCompleted ? 'bg-emerald-500' : 'bg-slate-200'
                    )}
                  />
                )}
              </div>
              <span
                className={cn(
                  'pb-6 text-sm font-medium',
                  isCurrent ? 'text-indigo-700' : 'text-slate-500'
                )}
              >
                {stage.label}
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}