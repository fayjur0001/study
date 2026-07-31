import Link from 'next/link'
import { Building2 } from 'lucide-react'
import type { Agency } from '@/lib/mockData'
import VerifiedBadge from '@/components/agency/VerifiedBadge'
import AgencyRatingStars from '@/components/agency/AgencyRatingStars'

interface AgencyCardProps {
  agency: Agency
}

export default function AgencyCard({ agency }: AgencyCardProps) {
  return (
    <Link
      href={`/agencies/${agency.id}`}
      className="group block rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
    >
      <div className="flex items-start gap-4">
        <div className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-slate-200 bg-slate-50">
          {agency.logo ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={agency.logo} alt={agency.name} className="h-full w-full object-cover" />
          ) : (
            <Building2 className="h-6 w-6 text-slate-300" />
          )}
        </div>

        <div className="flex-1">
          <div className="flex items-center gap-2">
            <h3 className="text-lg font-semibold tracking-tight text-slate-900">
              {agency.name}
            </h3>
            <VerifiedBadge isVerified={agency.isVerified} />
          </div>
          <div className="mt-1.5">
            <AgencyRatingStars rating={agency.rating} reviewCount={agency.reviewCount} />
          </div>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {agency.countrySpecialties.map((specialty) => (
          <span
            key={specialty}
            className="rounded-full bg-indigo-50 px-2.5 py-1 text-xs font-medium text-indigo-700"
          >
            {specialty}
          </span>
        ))}
      </div>

      <div className="mt-4 flex items-center justify-between">
        <span className="text-sm font-normal text-slate-500">
          {agency.successCount} successful placements
        </span>
        <span className="text-sm font-medium text-indigo-600 group-hover:text-indigo-700">
          View Profile →
        </span>
      </div>
    </Link>
  )
}