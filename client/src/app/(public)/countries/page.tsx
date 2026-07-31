// src/app/(public)/countries/page.tsx
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import PageHeader from '@/components/common/PageHeader'
import CountryGrid from '@/components/country/CountryGrid'
import CountryComparisonTable from '@/components/country/CountryComparisonTable'
import { mockCountries } from '@/lib/mockData'

export default function CountriesPage() {
  return (
    <>
      <Navbar />

      <div className="bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <PageHeader
            title="Explore Study Destinations"
            description={`${mockCountries.length} countries with detailed visa, cost, and work-rights information`}
          />

          <div className="mt-10">
            <CountryGrid countries={mockCountries} />
          </div>

          <div className="mt-20">
            <div className="mb-8">
              <h2 className="text-2xl font-semibold tracking-tight text-slate-900">
                Compare Countries
              </h2>
              <p className="mt-2 text-sm font-normal leading-relaxed text-slate-500">
                See tuition, visa success rates, and work rights side by side.
              </p>
            </div>
            <CountryComparisonTable countries={mockCountries} />
          </div>
        </div>
      </div>

      <Footer />
    </>
  )
}