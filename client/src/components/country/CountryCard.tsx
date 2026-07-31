import Link from 'next/link'
import { Globe2 } from 'lucide-react'
import type { Country } from '@/lib/mockData'
import { formatMoney, formatPercent } from '@/lib/utils'

interface CountryCardProps {
  country: Country
}

export default function CountryCard({ country }: CountryCardProps) {
  return (
    <Link
      href={`/countries/${country.id}`}
      className="group block overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
        {country.image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={country.image}
            alt={country.name}
            className="h-full w-full object-cover transition-transform duration-200 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-slate-300">
            <Globe2 className="h-10 w-10" />
          </div>
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 via-slate-900/10 to-transparent" />

        <span className="absolute right-3 top-3 rounded-full bg-white/90 px-2.5 py-1 text-xs font-medium text-slate-700">
          {formatPercent(country.visaSuccessRate)} visa success
        </span>

        <div className="absolute bottom-0 left-0 right-0 p-4">
          <h3 className="flex items-center gap-2 text-base font-semibold tracking-tight text-white">
            <span>{country.flagEmoji}</span>
            {country.name}
          </h3>
        </div>
      </div>

      <div className="p-4">
        <div className="flex items-center justify-between text-sm">
          <span className="text-slate-500">Avg. Tuition</span>
          <span className="font-medium text-slate-900">{formatMoney(country.avgTuition)}/yr</span>
        </div>

        <span className="mt-4 inline-block text-sm font-medium text-indigo-600 group-hover:text-indigo-700">
          Explore →
        </span>
      </div>
    </Link>
  )
}