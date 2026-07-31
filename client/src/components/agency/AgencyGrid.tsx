import { Building2 } from 'lucide-react'
import type { Agency } from '@/lib/mockData'
import AgencyCard from '@/components/agency/AgencyCard'
import EmptyState from '@/components/common/EmptyState'

interface AgencyGridProps {
  agencies: Agency[]
}

export default function AgencyGrid({ agencies }: AgencyGridProps) {
  // BUSINESS RULE: Per SRS, agency profiles remain hidden from the public
  // marketplace until admin approval (isApproved === true). This filter
  // must be applied wherever agencies are surfaced to students/public users.
  const approvedAgencies = agencies.filter((agency) => agency.isApproved)

  if (approvedAgencies.length === 0) {
    return (
      <EmptyState
        icon={<Building2 className="h-6 w-6" />}
        title="No agencies found"
        description="Check back soon as more agencies join the marketplace."
      />
    )
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {approvedAgencies.map((agency) => (
        <AgencyCard key={agency.id} agency={agency} />
      ))}
    </div>
  )
}