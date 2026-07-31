// src/app/(public)/countries/[id]/page.tsx
import { notFound } from 'next/navigation'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import CountryStats from '@/components/country/CountryStats'
import CountryDocumentChecklist from '@/components/country/CountryDocumentChecklist'
import UniversityGrid from '@/components/university/UniversityGrid'
import { mockCountries, mockUniversities } from '@/lib/mockData'

export default function CountryDetailPage({ params }: { params: { id: string } }) {
  const country = mockCountries.find((c) => c.id === params.id)
  if (!country) notFound()

  const universitiesInCountry = mockUniversities.filter(
    (university) => university.countryId === country.id
  )

  return (
    <>
      <Navbar />

      <div className="bg-slate-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 space-y-10">
          {/* Header */}
          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="relative h-48 w-full overflow-hidden bg-slate-100 md:h-64">
              {country.image ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={country.image}
                  alt={country.name}
                  className="h-full w-full object-cover"
                />
              ) : null}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent" />
            </div>
            <div className="p-6">
              <h1 className="flex items-center gap-3 text-3xl font-semibold tracking-tight leading-tight text-slate-900">
                <span>{country.flagEmoji}</span>
                {country.name}
              </h1>
              <p className="mt-3 text-base font-normal leading-relaxed text-slate-500">
                {country.overview}
              </p>
            </div>
          </div>

          {/* Stats */}
          <CountryStats country={country} />

          {/* Document checklist */}
          <CountryDocumentChecklist country={country} />

          {/* Universities in this country */}
          <div>
            <div className="mb-6">
              <h2 className="text-2xl font-semibold tracking-tight text-slate-900">
                Universities in {country.name}
              </h2>
              <p className="mt-2 text-sm font-normal leading-relaxed text-slate-500">
                {universitiesInCountry.length} universities listed on StudyBridge
              </p>
            </div>
            <UniversityGrid universities={universitiesInCountry} />
          </div>
        </div>
      </div>

      <Footer />
    </>
  )
}