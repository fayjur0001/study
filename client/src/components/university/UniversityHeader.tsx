'use client'

import { useState } from 'react'
import { Bookmark, GraduationCap, Star } from 'lucide-react'
import type { University } from '@/lib/mockData'
import { cn } from '@/lib/utils'

interface UniversityHeaderProps {
  university: University
}

export default function UniversityHeader({ university }: UniversityHeaderProps) {
  const [isSaved, setIsSaved] = useState(false)
  const bannerImage = university.campusImages?.[0]

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="relative h-48 w-full overflow-hidden bg-slate-100 md:h-64">
        {bannerImage ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={bannerImage} alt={university.name} className="h-full w-full object-cover" />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-slate-300">
            <GraduationCap className="h-12 w-12" />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent" />
      </div>

      <div className="flex flex-col gap-4 p-6 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex items-start gap-4">
          <div className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            {university.logo ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={university.logo} alt={`${university.name} logo`} className="h-full w-full object-contain p-2" />
            ) : (
              <GraduationCap className="h-8 w-8 text-indigo-600" />
            )}
          </div>

          <div>
            <h1 className="text-2xl font-semibold tracking-tight text-slate-900">
              {university.name}
            </h1>
            <p className="mt-1 text-sm font-normal text-slate-500">
              {university.countryName} · {university.city}
            </p>
            <div className="mt-2 flex items-center gap-1.5">
              <Star className="h-4 w-4 fill-amber-500 text-amber-500" />
              <span className="text-sm font-medium text-slate-900">
                {university.rating.toFixed(1)}
              </span>
              <span className="text-sm font-normal text-slate-400">
                ({university.reviewCount} reviews)
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsSaved((prev) => !prev)}
            className={cn(
              'flex h-10 w-10 items-center justify-center rounded-lg border transition-all duration-200 active:scale-[0.98]',
              isSaved
                ? 'border-amber-500 bg-amber-50 text-amber-500'
                : 'border-slate-200 text-slate-500 hover:bg-slate-50'
            )}
            aria-label={isSaved ? 'Unsave university' : 'Save university'}
          >
            <Bookmark className={cn('h-4 w-4', isSaved && 'fill-amber-500')} />
          </button>

          <button className="rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white transition-all duration-200 hover:bg-indigo-700 active:scale-[0.98]">
            Apply Now
          </button>
        </div>
      </div>
    </div>
  )
}