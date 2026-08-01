import { GraduationCap } from 'lucide-react'
import type { University } from '@/lib/mockData'
import UniversityCard from '@/components/university/UniversityCard'
import EmptyState from '@/components/common/EmptyState'

interface UniversityGridProps {
  universities: University[]
  matchScores?: Record<string, number>
}

export default function UniversityGrid({ universities, matchScores }: UniversityGridProps) {
  if (universities.length === 0) {
    return (
      <EmptyState
        icon={<GraduationCap className="h-6 w-6" />}
        title="No universities found"
        description="Try adjusting your filters or search terms to find more matches."
      />
    )
  }

  return (
    <div className="grid grid-cols-1 gap-8 pt-2 sm:grid-cols-2 lg:grid-cols-3">
      {universities.map((university) => (
        <UniversityCard
          key={university.id}
          university={university}
          matchScore={matchScores?.[university.id]}
        />
      ))}
    </div>
  )
}