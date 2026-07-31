'use client'

import { Building2, MessageSquare, Phone } from 'lucide-react'
import type { Agency } from '@/lib/mockData'
import VerifiedBadge from '@/components/agency/VerifiedBadge'
import AgencyRatingStars from '@/components/agency/AgencyRatingStars'

interface AgencyProfileHeaderProps {
  agency: Agency
}

export default function AgencyProfileHeader({ agency }: AgencyProfileHeaderProps) {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="relative h-40 w-full overflow-hidden bg-gradient-to-br from-indigo-600 to-indigo-800 md:h-56">
        {agency.coverImage && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={agency.coverImage} alt="" className="h-full w-full object-cover" />
        )}
      </div>

      <div className="flex flex-col gap-4 p-6 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex items-start gap-4">
          <div className="-mt-12 flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-2xl border-4 border-white bg-slate-50 shadow-sm">
            {agency.logo ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={agency.logo} alt={agency.name} className="h-full w-full object-cover" />
            ) : (
              <Building2 className="h-8 w-8 text-slate-300" />
            )}
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-semibold tracking-tight text-slate-900">
                {agency.name}
              </h1>
              <VerifiedBadge isVerified={agency.isVerified} />
            </div>
            <div className="mt-2">
              <AgencyRatingStars rating={agency.rating} reviewCount={agency.reviewCount} />
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 rounded-lg border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-600 transition-all duration-200 hover:bg-slate-50 active:scale-[0.98]">
            <Phone className="h-4 w-4" />
            Request Consultation
          </button>
          <button className="flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white transition-all duration-200 hover:bg-indigo-700 active:scale-[0.98]">
            <MessageSquare className="h-4 w-4" />
            Contact Agency
          </button>
        </div>
      </div>
    </div>
  )
}