'use client'

// src/app/(public)/universities/page.tsx
import { useMemo, useState } from 'react'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import PageHeader from '@/components/common/PageHeader'
import UniversityFilters, {
  type UniversityFilterValues,
} from '@/components/university/UniversityFilters'
import UniversityGrid from '@/components/university/UniversityGrid'
import Pagination from '@/components/ui/pagination'
import { mockUniversities, mockCountries } from '@/lib/mockData'

const PAGE_SIZE = 9

// Programs don't carry an explicit degree-level field in the mock data,
// so we infer UG / PG / PhD from common suffixes in the program title.
function matchesDegreeLevel(programs: string[], level: string): boolean {
  if (level === 'all') return true
  const pgHints = ['msc', 'ma ', 'mba', 'masc', 'meng', 'master']
  const phdHints = ['phd', 'doctorate']
  return programs.some((program) => {
    const lower = program.toLowerCase()
    if (level === 'PhD') return phdHints.some((hint) => lower.includes(hint))
    if (level === 'PG') return pgHints.some((hint) => lower.includes(hint))
    // UG: anything that isn't clearly PG/PhD counts as undergraduate-eligible
    return (
      !pgHints.some((hint) => lower.includes(hint)) &&
      !phdHints.some((hint) => lower.includes(hint))
    )
  })
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

  const countryOptions = useMemo(
    () => mockCountries.map((country) => ({ id: country.id, name: country.name })),
    []
  )

  // PSWP duration lives on Country, not University — look it up per university.
  const pswpByCountryId = useMemo(() => {
    const map: Record<string, number> = {}
    mockCountries.forEach((country) => {
      map[country.id] = country.pswpDurationMonths
    })
    return map
  }, [])

  const filteredUniversities = useMemo(() => {
    return mockUniversities.filter((university) => {
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
  }, [filters, pswpByCountryId])

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

      <div className="bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <PageHeader
            title="Explore Universities"
            description={`${filteredUniversities.length} universities matching your criteria`}
          />

          <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-[280px_1fr]">
            <aside>
              <UniversityFilters
                countryOptions={countryOptions}
                onFilterChange={handleFilterChange}
              />
            </aside>

            <div>
              <UniversityGrid universities={paginatedUniversities} />

              {filteredUniversities.length > 0 && (
                <div className="mt-10">
                  <Pagination
                    currentPage={page}
                    totalPages={totalPages}
                    onPageChange={setPage}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  )
}