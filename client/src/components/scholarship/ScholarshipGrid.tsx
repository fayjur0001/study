import { Award } from 'lucide-react'
import type { Scholarship } from '@/lib/mockData'
import ScholarshipCard from '@/components/scholarship/ScholarshipCard'
import EmptyState from '@/components/common/EmptyState'

interface ScholarshipGridProps {
  scholarships: Scholarship[]
}

export default function ScholarshipGrid({ scholarships }: ScholarshipGridProps) {
  if (scholarships.length === 0) {
    return (
      <EmptyState
        icon={<Award className="h-6 w-6" />}
        title="No scholarships found"
        description="Try adjusting your filters to discover more funding opportunities."
      />
    )
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {scholarships.map((scholarship) => (
        <ScholarshipCard key={scholarship.id} scholarship={scholarship} />
      ))}
    </div>
  )
}