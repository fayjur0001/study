import { BadgeCheck } from 'lucide-react'
import { cn } from '@/lib/utils'

interface VerifiedBadgeProps {
  isVerified: boolean
  className?: string
}

export default function VerifiedBadge({ isVerified, className }: VerifiedBadgeProps) {
  if (!isVerified) return null

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 rounded-full bg-sky-50 px-2.5 py-1 text-xs font-medium text-sky-600',
        className
      )}
    >
      <BadgeCheck className="h-3.5 w-3.5" />
      Verified
    </span>
  )
}