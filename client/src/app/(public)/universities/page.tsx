'use client'

// src/app/(public)/universities/page.tsx
import { useMemo, useState } from 'react'
import { BadgeCheck, ChevronDown } from 'lucide-react'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import UniversityFilters, {
  type UniversityFilterValues,
} from '@/components/university/UniversityFilters'
import UniversityGrid from '@/components/university/UniversityGrid'
import Pagination from '@/components/ui/pagination'
import { mockUniversities, mockCountries } from '@/lib/mockData'

const PAGE_SIZE = 9

function matchesDegreeLevel(programs: string[], level: string): boolean {
  if (level === 'all') return true
  const pgHints = ['msc', 'ma ', 'mba', 'masc', 'meng', 'master']
  const phdHints = ['phd', 'doctorate']
  return programs.some((program) => {
    const lower = program.toLowerCase()
    if (level === 'PhD') return phdHints.some((hint) => lower.includes(hint))
    if (level === 'PG') return pgHints.some((hint) => lower.includes(hint))
    return (
      !pgHints.some((hint) => lower.includes(hint)) &&
      !phdHints.some((hint) => lower.includes(hint))
    )
  })
}

// Demo "fit score" derived from the university's own rating (out of 5) —
// stands in for MatchScore™ until a real logged-in student profile drives it.
function fitScore(rating: number) {
  return Math.min(99, Math.round(70 + rating * 6))
}

export default function UniversitiesPage() {
  const [filters, setFilters] = useState<UniversityFilterValues>({
    countries: [],
    degreeLevel: 'all',
    tuitionRange: [0, 60000],
    minAcceptanceRate: 0,
    minPswpMonths: 0,
    search: '',
  })
  const [page, setPage] = useState(1)
  const [sortByMatch, setSortByMatch] = useState(true)

  const countryOptions = useMemo(
    () => mockCountries.map((country) => ({ id: country.id, name: country.name })),
    []
  )

  const pswpByCountryId = useMemo(() => {
    const map: Record<string, number> = {}
    mockCountries.forEach((country) => {
      map[country.id] = country.pswpDurationMonths
    })
    return map
  }, [])

  const matchScores = useMemo(() => {
    const map: Record<string, number> = {}
    mockUniversities.forEach((u) => {
      map[u.id] = fitScore(u.rating)
    })
    return map
  }, [])

  const filteredUniversities = useMemo(() => {
    const list = mockUniversities.filter((university) => {
      const search = filters.search.trim().toLowerCase()
      if (
        search &&
        !university.name.toLowerCase().includes(search) &&
        !university.city.toLowerCase().includes(search) &&
        !university.countryName.toLowerCase().includes(search)
      ) {
        return false
      }
      if (filters.countries.length > 0 && !filters.countries.includes(university.countryId)) {
        return false
      }
      if (!matchesDegreeLevel(university.programs, filters.degreeLevel)) {
        return false
      }
      const [minTuition, maxTuition] = filters.tuitionRange
      if (university.tuitionMax < minTuition || university.tuitionMin > maxTuition) {
        return false
      }
      if (university.acceptanceRate < filters.minAcceptanceRate) {
        return false
      }
      const pswp = pswpByCountryId[university.countryId] ?? 0
      if (pswp < filters.minPswpMonths) {
        return false
      }
      return true
    })

    if (sortByMatch) {
      return [...list].sort((a, b) => matchScores[b.id] - matchScores[a.id])
    }
    return list
  }, [filters, pswpByCountryId, sortByMatch, matchScores])

  const totalPages = Math.max(1, Math.ceil(filteredUniversities.length / PAGE_SIZE))
  const paginatedUniversities = filteredUniversities.slice(
    (page - 1) * PAGE_SIZE,
    page * PAGE_SIZE
  )

  function handleFilterChange(next: UniversityFilterValues) {
    setFilters(next)
    setPage(1)
  }

  return (
    <>
      <Navbar />

      <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Hero */}
        <section className="mb-12">
          <div className="mb-8 flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div className="max-w-2xl">
              <span className="mb-3 block text-xs font-bold uppercase tracking-wider text-[#0d3286]">
                World-Class Education
              </span>
              <h1 className="text-3xl font-bold text-slate-900 md:text-5xl">
                Discover your perfect <span className="text-[#0d3286]">academic future.</span>
              </h1>
              <p className="mt-4 leading-relaxed text-slate-500">
                Explore {mockUniversities.length}+ globally accredited universities
                across {mockCountries.length} countries. Use our intelligent
                MatchScore™ to find institutions that align with your profile.
              </p>
            </div>
            <div className="flex items-center gap-2 text-sm font-medium text-slate-500">
              <BadgeCheck className="h-5 w-5 text-[#0d3286]" />
              <span>{mockUniversities.length} Accredited Universities</span>
            </div>
          </div>
        </section>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[300px_1fr]">
          <aside>
            <UniversityFilters countryOptions={countryOptions} onFilterChange={handleFilterChange} />
          </aside>

          <div>
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-xl font-semibold text-slate-900">
                Top Recommended Institutions
              </h2>
              <button
                onClick={() => setSortByMatch((prev) => !prev)}
                className="flex items-center gap-1 text-sm font-bold text-[#0d3286]"
              >
                Sort by: MatchScore <ChevronDown className="h-4 w-4" />
              </button>
            </div>

            <UniversityGrid universities={paginatedUniversities} matchScores={matchScores} />

            <p className="mt-8 text-center text-sm text-slate-400">
              Showing {paginatedUniversities.length} of {filteredUniversities.length} Universities
            </p>

            {filteredUniversities.length > 0 && (
              <div className="mt-6">
                <Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage} />
              </div>
            )}
          </div>
        </div>

        {/* CTA */}
        <section className="relative mt-24 overflow-hidden rounded-[32px] bg-[#0d3286] p-12 text-center md:p-20 md:text-left">
          <div className="relative z-10 flex flex-col items-center justify-between gap-10 md:flex-row">
            <div className="max-w-xl">
              <h2 className="text-2xl font-semibold text-white md:text-3xl">
                Can&apos;t find your match?
              </h2>
              <p className="mt-4 text-white/80">
                Our AI-powered admission advisors can help you navigate through
                thousands of programs and find the one that fits your dreams.
              </p>
            </div>
            <div className="flex flex-col gap-4 sm:flex-row">
              
                href="/contact"
                className="rounded-full bg-white px-8 py-4 text-center font-bold text-[#0d3286] transition-transform hover:scale-105"
              >
                Speak to an Advisor
              </a>
            </div>
          </div>
          <div className="absolute -right-24 -top-24 h-64 w-64 rounded-full bg-[#6f8fff]/20 blur-3xl" />
          <div className="absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-[#2d4a9e]/40 blur-3xl" />
        </section>
      </main>

      <Footer />
    </>
  )
}