// src/app/(public)/universities/[id]/page.tsx
import { notFound } from 'next/navigation'
import { ArrowRight, CalendarClock, FileText, MessageCircle } from 'lucide-react'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import UniversityHeader from '@/components/university/UniversityHeader'
import UniversityStats from '@/components/university/UniversityStats'
import UniversityPrograms from '@/components/university/UniversityPrograms'
import UniversityFacilities from '@/components/university/UniversityFacilities'
import UniversityReviews from '@/components/university/UniversityReviews'
import { formatDate } from '@/lib/utils'
import { mockUniversities } from '@/lib/mockData'

export default function UniversityDetailPage({ params }: { params: { id: string } }) {
  const university = mockUniversities.find((u) => u.id === params.id)
  if (!university) notFound()

  return (
    <>
      <Navbar />

      <UniversityHeader university={university} />

      <main className="mx-auto flex max-w-7xl flex-col gap-gutter gap-8 px-4 py-12 sm:px-6 lg:flex-row lg:px-8">
        {/* Main content */}
        <div className="flex-1 space-y-10">
          <section className="rounded-[24px] border border-slate-100 bg-white p-8 shadow-sm">
            <h2 className="mb-4 text-2xl font-semibold tracking-tight text-slate-900">
              About {university.name}
            </h2>
            <p className="leading-relaxed text-slate-500">
              {university.name} is a leading institution in {university.city},{' '}
              {university.countryName}, recognized for its academic excellence and
              strong outcomes for international students.{' '}
              {university.entryRequirements}
            </p>
          </section>

          <section id="programs">
            <UniversityPrograms university={university} />
          </section>

          <section id="campus">
            <UniversityFacilities university={university} />
          </section>

          <section
            className="rounded-[24px] border-l-4 border-[#0d3286] bg-white p-8 shadow-sm"
            id="admission"
          >
            <h2 className="mb-8 flex items-center gap-3 text-2xl font-semibold tracking-tight text-[#0d3286]">
              <FileText className="h-7 w-7" /> Admission Requirements
            </h2>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
              <div>
                <h4 className="mb-4 font-bold text-slate-900">Academic Standards</h4>
                <ul className="space-y-3 text-sm text-slate-600">
                  <li>Minimum CGPA of {university.minCgpa.toFixed(2)}</li>
                  {university.minIelts && <li>IELTS {university.minIelts.toFixed(1)}+</li>}
                  <li>{university.entryRequirements}</li>
                </ul>
              </div>
              <div className="flex items-start gap-2 rounded-xl bg-[#0d3286]/5 p-4 text-sm text-[#0d3286]">
                <CalendarClock className="mt-0.5 h-4 w-4 shrink-0" />
                Application deadline: {formatDate(university.applicationDeadline)}
              </div>
            </div>
          </section>

          <UniversityStats university={university} />

          <UniversityReviews />
        </div>

        {/* Sticky sidebar */}
        <aside className="w-full space-y-6 lg:w-[360px]">
          <div className="sticky top-28 space-y-6">
            <div className="rounded-[24px] border border-[#0d3286]/10 bg-white p-8 shadow-sm">
              <h3 className="mb-2 text-xl font-semibold text-[#0d3286]">Ready to Apply?</h3>
              <p className="mb-6 text-sm text-slate-500">
                Our expert consultants will guide you through every step of the{' '}
                {university.name} application process.
              </p>
              <button className="mb-3 flex w-full items-center justify-center gap-2 rounded-2xl bg-[#0d3286] py-4 font-bold text-white shadow-lg shadow-[#0d3286]/20 transition-transform hover:scale-[1.02] active:scale-95">
                Start Application <ArrowRight className="h-4 w-4" />
              </button>
              <button className="flex w-full items-center justify-center gap-2 rounded-2xl bg-[#6f8fff]/10 py-4 font-bold text-[#0d3286] transition-all hover:bg-[#6f8fff]/20">
                <MessageCircle className="h-4 w-4" /> Schedule Consultation
              </button>
            </div>

            <div className="rounded-[24px] bg-[#151c28] p-8 text-white shadow-sm">
              <div className="mb-6 flex items-center justify-between">
                <h3 className="text-lg font-semibold">Quick Facts</h3>
              </div>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between border-b border-white/10 pb-3">
                  <span className="text-white/60">World Rank</span>
                  <span className="font-bold">
                    {university.worldRanking ? `#${university.worldRanking}` : 'Unranked'}
                  </span>
                </div>
                <div className="flex justify-between border-b border-white/10 pb-3">
                  <span className="text-white/60">Acceptance Rate</span>
                  <span className="font-bold">{university.acceptanceRate}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/60">Accommodation</span>
                  <span className="font-bold">
                    {university.hasAccommodation ? 'Available' : 'Not provided'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </aside>
      </main>

      <Footer />
    </>
  )
}