import { CheckCircle2 } from 'lucide-react'
import type { Application } from '@/lib/mockData'
import { cn } from '@/lib/utils'

type ApplicationStage = Application['stage']

interface ApplicationStageBadgeProps {
  stage: ApplicationStage
  className?: string
}

const stageConfig: Record<ApplicationStage, { label: string; classes: string }> = {
  draft: {
    label: 'Draft',
    classes: 'bg-slate-100 text-slate-600',
  },
  submitted: {
    label: 'Submitted',
    classes: 'bg-sky-50 text-sky-600',
  },
  under_review: {
    label: 'Under Review',
    classes: 'bg-amber-50 text-amber-600',
  },
  documents_required: {
    label: 'Documents Required',
    classes: 'bg-rose-50 text-rose-500',
  },
  accepted: {
    label: 'Accepted',
    classes: 'bg-emerald-50 text-emerald-600',
  },
  tuition_paid_visa_applied: {
    label: 'Visa Applied',
    classes: 'bg-indigo-50 text-indigo-700',
  },
  visa_approved: {
    label: 'Visa Approved',
    classes: 'bg-emerald-50 text-emerald-600',
  },
}

export default function ApplicationStageBadge({ stage, className }: ApplicationStageBadgeProps) {
  const config = stageConfig[stage]

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium uppercase tracking-wide',
        config.classes,
        className
      )}
    >
      {stage === 'visa_approved' && <CheckCircle2 className="h-3.5 w-3.5" />}
      {config.label}
    </span>
  )
}