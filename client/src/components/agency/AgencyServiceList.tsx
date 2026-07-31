import { Globe2 } from 'lucide-react'
import type { AgencyService } from '@/lib/mockData'
import { formatMoney } from '@/lib/utils'

interface AgencyServiceListProps {
  services: AgencyService[]
}

export default function AgencyServiceList({ services }: AgencyServiceListProps) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="text-2xl font-semibold tracking-tight text-slate-900">Services</h2>

      <div className="mt-5 space-y-4">
        {services.map((service) => (
          <div
            key={service.id}
            className="rounded-lg border border-slate-200 p-4 transition-all duration-200 hover:shadow-md"
          >
            <div className="flex items-start justify-between gap-3">
              <h3 className="text-base font-semibold text-slate-900">{service.title}</h3>
              <span className="shrink-0 text-base font-semibold text-slate-900">
                {formatMoney(service.fee)}
              </span>
            </div>
            <p className="mt-1.5 text-sm font-normal leading-relaxed text-slate-500">
              {service.description}
            </p>
            <span className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-indigo-50 px-2.5 py-1 text-xs font-medium text-indigo-700">
              <Globe2 className="h-3.5 w-3.5" />
              {service.countryFocus}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}