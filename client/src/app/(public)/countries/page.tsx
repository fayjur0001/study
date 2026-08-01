'use client'

// src/app/(public)/countries/page.tsx
import { useMemo, useState } from 'react'
import { Search } from 'lucide-react'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import CountryGrid from '@/components/country/CountryGrid'
import CountryComparisonTable from '@/components/country/CountryComparisonTable'
import { mockCountries } from '@/lib/mockData'

// The mock data doesn't carry a `region` field, so we map it here —
// only 6 countries exist today, so a static lookup is enough.
const REGION_BY_COUNTRY: Record<string, 'Europe' | 'Americas' | 'Asia Pacific'> = {
  'United Kingdom': 'Europe',
  Germany: 'Europe',
  'United States': 'Americas',
  Canada: 'Americas',
  Australia: 'Asia Pacific',
  Malaysia: 'Asia Pacific',
}

const REGIONS = ['All Regions', 'Europe', 'Americas', 'Asia Pacific'] as const

export default function CountriesPage() {
  const [activeRegion, setActiveRegion] = useState<(typeof REGIONS)[number]>('All Regions')
  const [search, setSearch] = useState('')

  const filteredCountries = useMemo(() => {
    return mockCountries.filter((country) => {
      if (
        activeRegion !== 'All Regions' &&
        REGION_BY_COUNTRY[country.name] !== activeRegion
      ) {
        return false
      }
      if (search && !country.name.toLowerCase().includes(search.trim().toLowerCase())) {
        return false
      }
      return true
    })
  }, [activeRegion, search])

  return (
    <>
      <Navbar />

      <main>
        {/* Hero */}
        <section className="bg-[#0d3286] py-20 md:py-28">
          <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
            <span className="mb-6 inline-block rounded-full bg-white/10 px-4 py-1.5 text-xs font-medium text-white backdrop-blur-sm">
              Global Academic Directory
            </span>
            <h1 className="mx-auto max-w-3xl text-3xl font-bold leading-tight text-white md:text-5xl">
              Choose Your Global Destination
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-white/80">
              Explore high-ranking universities, diverse cultures, and world-class
              educational standards across our partner countries.
            </p>
            <div className="mx-auto mt-10 max-w-md">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search by country or region..."
                  className="w-full rounded-xl border-none bg-white py-4 pl-12 pr-4 text-slate-900 shadow-lg outline-none focus:ring-2 focus:ring-white"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Grid */}
        <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="mb-12 flex flex-col items-end justify-between gap-6 md:flex-row">
            <div>
              <h2 className="text-2xl font-semibold tracking-tight text-[#0d3286] md:text-3xl">
                Featured Destinations
              </h2>
              <p className="mt-2 text-slate-500">
                Curated locations offering premium student experiences and visa
                support.
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              {REGIONS.map((region) => (
                <button
                  key={region}
                  onClick={() => setActiveRegion(region)}
                  className={`rounded-lg px-4 py-2 text-sm font-medium transition-all ${
                    activeRegion === region
                      ? 'bg-[#0d3286]/10 text-[#0d3286]'
                      : 'bg-slate-100 text-slate-500 hover:bg-[#0d3286]/5'
                  }`}
                >
                  {region}
                </button>
              ))}
            </div>
          </div>

          <CountryGrid countries={filteredCountries} />

          <div className="mt-20">
            <div className="mb-8">
              <h2 className="text-2xl font-semibold tracking-tight text-[#0d3286]">
                Compare Countries
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-slate-500">
                See tuition, visa success rates, and work rights side by side.
              </p>
            </div>
            <CountryComparisonTable countries={mockCountries} />
          </div>
        </section>

        {/* Newsletter / AI Matchmaker CTA */}
        <section className="mx-auto mb-24 max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-[32px] bg-[#2d4a9e] p-12 md:p-16">
            <div className="relative z-10 max-w-xl">
              <h2 className="text-2xl font-semibold tracking-tight text-white md:text-3xl">
                Not sure which country suits you?
              </h2>
              <p className="mb-8 mt-4 text-white/80">
                Our AI-powered Matching Engine analyzes your profile and academic goals
                to suggest the perfect study destination.
              </p>
              
                href="/auth/register"
                className="inline-flex items-center rounded-xl bg-white px-8 py-4 text-lg font-bold text-[#2d4a9e] transition-transform hover:scale-105"
              ></div>
                Try AI Matchmaker
              </a>
            </div>
            <div className="absolute -right-12 -top-12 h-64 w-64 rounded-full bg-[#0d3286]/40 blur-3xl" />
            <div className="absolute -bottom-12 -left-12 h-64 w-64 rounded-full bg-[#3156c4]/30 blur-3xl" />
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}