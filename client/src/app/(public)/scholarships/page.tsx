'use client'

// src/app/(public)/scholarships/page.tsx
import { useMemo, useState } from 'react'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import PageHeader from '@/components/common/PageHeader'
import ScholarshipFilters, {
  type ScholarshipFilterValues,
} from '@/components/scholarship/ScholarshipFilters'
import ScholarshipGrid from '@/components/scholarship/ScholarshipGrid'
import Pagination from '@/components/ui/pagination'
import { mockScholarships, mockCountries } from '@/lib/mockData'

const PAGE_SIZE = 9

export default function ScholarshipsPage() {
  const [filters, setFilters] = useState<ScholarshipFilterValues>({
    countryId: 'all',
    coverageType: 'all',
    amountRange: [0, 50000],
    sortByDeadline: 'asc',
  })
  const [page, setPage] = useState(1)

  const countryOptions = useMemo(
    () => mockCountries.map((country) => ({ id: country.id, name: country.name })),
    []
  )

  const filteredScholarships = useMemo(() => {
    const filtered = mockScholarships.filter((scholarship) => {
      if (filters.countryId !== 'all' && scholarship.countryId !== filters.countryId) {
        return false
      }
      if (filters.coverageType !== 'all' && scholarship.coverageType !== filters.coverageType) {
        return false
      }
      const [minAmount, maxAmount] = filters.amountRange
      if (scholarship.amount < minAmount || scholarship.amount > maxAmount) {
        return false
      }
      return true
    })

    return [...filtered].sort((a, b) => {
      const diff = new Date(a.deadline).getTime() - new Date(b.deadline).getTime()
      return filters.sortByDeadline === 'asc' ? diff : -diff
    })
  }, [filters])

  const totalPages = Math.max(1, Math.ceil(filteredScholarships.length / PAGE_SIZE))
  const paginatedScholarships = filteredScholarships.slice(
    (page - 1) * PAGE_SIZE,
    page * PAGE_SIZE
  )

  function handleFilterChange(next: ScholarshipFilterValues) {
    setFilters(next)
    setPage(1)
  }

  return (
    <>
      <Navbar />

      <div className="bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <PageHeader
            title="Find Scholarships"
            description={`${filteredScholarships.length} funding opportunities across our partner countries`}
          />

          <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-[280px_1fr]">
            <aside>
              <ScholarshipFilters
                countryOptions={countryOptions}
                onFilterChange={handleFilterChange}
              />
            </aside>

            <div>
              <ScholarshipGrid scholarships={paginatedScholarships} />

              {filteredScholarships.length > 0 && (
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