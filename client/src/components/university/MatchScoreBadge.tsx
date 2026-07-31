// src/components/university/MatchScoreBadge.tsx
import { cn } from '@/lib/utils'

interface MatchScoreBadgeProps {
  score: number
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

const sizeMap = {
  sm: 'h-9 w-9 text-xs',
  md: 'h-12 w-12 text-sm',
  lg: 'h-16 w-16 text-base',
}

export default function MatchScoreBadge({ score, size = 'md', className }: MatchScoreBadgeProps) {
  return (
    <div
      className={cn(
        'flex items-center justify-center rounded-full bg-amber-500 font-semibold tracking-tight text-white shadow-sm',
        sizeMap[size],
        className
      )}
      title={`${score}% match`}
    >
      {score}%
    </div>
  )
}