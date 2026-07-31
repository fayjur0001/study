import { cn } from '@/lib/utils'

interface ErrorStateProps {
  icon: React.ReactNode
  message: string
  onRetry?: () => void
  className?: string
}

export default function ErrorState({ icon, message, onRetry, className }: ErrorStateProps) {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center rounded-2xl border border-slate-200 bg-white px-6 py-16 text-center',
        className
      )}
    >
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-rose-50 text-rose-500">
        {icon}
      </div>

      <p className="mt-5 max-w-sm text-sm font-normal leading-relaxed text-slate-500">
        {message}
      </p>

      {onRetry && (
        <button
          onClick={onRetry}
          className="mt-6 inline-flex items-center justify-center rounded-lg border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-600 transition-all duration-200 hover:bg-slate-50 active:scale-[0.98]"
        >
          Try Again
        </button>
      )}
    </div>
  )
}