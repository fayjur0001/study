import Link from 'next/link'
import { Globe2, School, Wallet } from 'lucide-react'
import type { Country } from '@/lib/mockData'
import { mockUniversities } from '@/lib/mockData'
import { formatMoney } from '@/lib/utils'

interface CountryCardProps {
  country: Country
}

export default function CountryCard({ country }: CountryCardProps) {
  const partnerCount = mockUniversities.filter((u) => u.countryId === country.id).length

  return (
    <Link
      href={`/countries/${country.id}`}
      className="group flex flex-col overflow-hidden rounded-[24px] bg-white shadow-sm transition-all duration-300 ease-out hover:-translate-y-2 hover:shadow-xl"
    >
      <div className="relative h-48 overflow-hidden">
        {country.image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={country.image}
            alt={country.name}
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-slate-100 text-slate-300">
            <Globe2 className="h-10 w-10" />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent" />
        <div className="absolute left-4 top-4 flex h-11 w-11 items-center justify-center rounded-xl bg-white/90 text-xl shadow-sm backdrop-blur-md">
          {country.flagEmoji}
        </div>
      </div>

      <div className="flex flex-grow flex-col p-6">
        <h3 className="mb-4 text-lg font-semibold text-slate-900">{country.name}</h3>

        <div className="mb-6 space-y-3">
          <div className="flex items-center justify-between rounded-xl border border-slate-100 bg-slate-50 p-3">
            <span className="flex items-center gap-2 text-xs font-medium text-slate-500">
              <School className="h-4 w-4 text-[#0d3286]" /> Partner Universities
            </span>
            <span className="text-sm font-bold text-[#0d3286]">{partnerCount}+</span>
          </div>
          <div className="flex items-center justify-between rounded-xl border border-slate-100 bg-slate-50 p-3">
            <span className="flex items-center gap-2 text-xs font-medium text-slate-500">
              <Wallet className="h-4 w-4 text-[#0d3286]" /> Avg. Living Cost
            </span>
            <span className="text-sm font-bold text-[#0d3286]">
              {formatMoney(Math.round(country.avgLivingCost / 12))}/mo
            </span>
          </div>
        </div>

        <span className="mt-auto w-full rounded-xl bg-[#0d3286]/5 py-3 text-center text-sm font-bold text-[#0d3286] transition-all group-hover:bg-[#0d3286] group-hover:text-white">
          Explore Institutions
        </span>
      </div>
    </Link>
  )
}