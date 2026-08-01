'use client'

import { useState } from 'react'
import { Bookmark, GraduationCap, MapPin, Star } from 'lucide-react'
import type { University } from '@/lib/mockData'
import { cn, formatMoney, formatPercent } from '@/lib/utils'

interface UniversityHeaderProps {
  university: University
}

export default function UniversityHeader({ university }: UniversityHeaderProps) {
  const [isSaved, setIsSaved] = useState(false)
  const bannerImage = university.campusImages?.[0]

  const quickStats = [
    { label: 'World Rank', value: university.worldRanking ? `#${university.worldRanking}` : 'Unranked' },
    { label: 'Acceptance Rate', value: formatPercent(university.acceptanceRate) },
    { label: 'Avg. Tuition', value: formatMoney(university.tuitionMin) },
    { label: 'Rating', value: `${university.rating.toFixed(1)} / 5` },
  ]

  return (
    <section className="relative h-[520px] w-full overflow-hidden bg-[#0d3286]">
      <div className="absolute inset-0 z-0">
        {bannerImage ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={bannerImage} alt={university.name} className="h-full w-full object-cover opacity-70" />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-white/30">
            <GraduationCap className="h-16 w-16" />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0d3286] via-[#0d3286]/20 to-transparent" />
      </div>

      <div className="relative z-10 mx-auto flex h-full max-w-7xl flex-col justify-end px-4 pb-16 sm:px-6 lg:px-8">
        <div className="mb-4 inline-flex w-fit items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 backdrop-blur-md">
          <GraduationCap className="h-4 w-4 text-white" />
          <span className="text-xs font-medium uppercase tracking-wider text-white">
            Premium Partner Institution
          </span>
        </div>

        <div className="mb-2 flex flex-wrap items-start justify-between gap-4">
          <h1 className="text-3xl font-bold text-white md:text-5xl">{university.name}</h1>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsSaved((prev) => !prev)}
              className={cn(
                'flex h-11 w-11 items-center justify-center rounded-xl border transition-all active:scale-95',
                isSaved
                  ? 'border-white bg-white text-[#0d3286]'
                  : 'border-white/30 bg-white/10 text-white hover:bg-white/20'
              )}
              aria-label={isSaved ? 'Unsave university' : 'Save university'}
            >
              <Bookmark className={cn('h-4 w-4', isSaved && 'fill-[#0d3286]')} />
            </button>
            <button className="rounded-xl bg-white px-6 py-3 text-sm font-bold text-[#0d3286] shadow-lg transition-transform hover:scale-105 active:scale-95">
              Apply Now
            </button>
          </div>
        </div>

        <div className="mb-10 flex items-center gap-4 text-white/90">
          <span className="flex items-center gap-1">
            <MapPin className="h-4 w-4" /> {university.city}, {university.countryName}
          </span>
          <span className="h-1 w-1 rounded-full bg-white/50" />
          <span className="flex items-center gap-1">
            <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
            {university.rating.toFixed(1)} ({university.reviewCount} reviews)
          </span>
        </div>

        <div className="grid w-full max-w-4xl grid-cols-2 gap-4 md:grid-cols-4">
          {quickStats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-2xl border border-white/20 bg-white/10 p-5 text-white backdrop-blur-xl"
            >
              <p className="mb-1 text-xs uppercase tracking-wide text-white/70">{stat.label}</p>
              <p className="text-2xl font-bold">{stat.value}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}