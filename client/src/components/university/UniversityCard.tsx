import Link from 'next/link'
import { GraduationCap } from 'lucide-react'
import type { University } from '@/lib/mockData'
import { formatMoney, formatPercent } from '@/lib/utils'
import MatchScoreBadge from '@/components/university/MatchScoreBadge'

interface UniversityCardProps {
  university: University
  matchScore?: number
}

export default function UniversityCard({ university, matchScore }: UniversityCardProps) {
  const image = university.campusImages?.[0]

  return (
    <Link
      href={`/universities/${university.id}`}
      className="group block overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
        {image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={image}
            alt={university.name}
            className="h-full w-full object-cover transition-transform duration-200 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-slate-300">
            <GraduationCap className="h-10 w-10" />
          </div>
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 via-slate-900/10 to-transparent" />

        {matchScore !== undefined && (
          <div className="absolute right-3 top-3">
            <MatchScoreBadge score={matchScore} size="sm" />
          </div>
        )}

        {university.worldRanking && (
          <span className="absolute left-3 top-3 rounded-full bg-white/90 px-2.5 py-1 text-xs font-medium text-slate-700">
            #{university.worldRanking} World
          </span>
        )}

        <div className="absolute bottom-0 left-0 right-0 p-4">
          <h3 className="text-base font-semibold tracking-tight text-white line-clamp-1">
            {university.name}
          </h3>
        </div>
      </div>

      <div className="p-4">
        <p className="text-sm font-normal text-slate-500">
          {university.countryName} · {university.city}
        </p>

        <div className="mt-3 flex items-center justify-between text-sm">
          <span className="font-medium text-slate-900">
            {formatMoney(university.tuitionMin)} – {formatMoney(university.tuitionMax)}
          </span>
          <span className="text-slate-500">
            {formatPercent(university.acceptanceRate)} acceptance
          </span>
        </div>

        <span className="mt-4 inline-block text-sm font-medium text-indigo-600 group-hover:text-indigo-700">
          View Details →
        </span>
      </div>
    </Link>
  )
}