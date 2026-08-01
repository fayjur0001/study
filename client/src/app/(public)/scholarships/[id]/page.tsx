// src/app/(public)/scholarships/[id]/page.tsx
import { notFound } from 'next/navigation'
import { CheckCircle2, FileText, Landmark, Wallet, Bookmark } from 'lucide-react'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import ScholarshipDeadlineBadge from '@/components/scholarship/ScholarshipDeadlineBadge'
import ScholarshipCard from '@/components/scholarship/ScholarshipCard'
import { formatMoney, formatDate, cn } from '@/lib/utils'
import { mockScholarships } from '@/lib/mockData'

export default function ScholarshipDetailPage({ params }: { params: { id: string } }) {
  const scholarship = mockScholarships.find((s) => s.id === params.id)
  if (!scholarship) notFound()

  const similar = mockScholarships
    .filter((s) => s.id !== scholarship.id)
    .slice(0, 3)

  return (
    <>
      <Navbar />

      <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <section className="mb-12 grid grid-cols-1 items-start gap-8 md:grid-cols-12">
          {/* Left: title */}
          <div className="md:col-span-8">
            <nav className="mb-6 flex items-center gap-2 text-xs font-medium text-slate-400">
              <span>Scholarships</span>
              <span>/</span>
              <span className="font-semibold text-[#0d3286]">{scholarship.title}</span>
            </nav>

            <div className="mb-8 flex items-start gap-4">
              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl border border-slate-100 bg-white shadow-sm">
                <Landmark className="h-7 w-7 text-[#0d3286]" />
              </div>
              <div>
                <div className="mb-2 flex flex-wrap items-center gap-3">
                  <span
                    className={cn(
                      'rounded-full px-3 py-1 text-xs font-medium uppercase tracking-wide',
                      scholarship.coverageType === 'full'
                        ? 'bg-[#dce1ff] text-[#0d3286]'
                        : 'bg-sky-50 text-sky-600'
                    )}
                  >
                    {scholarship.coverageType === 'full' ? 'Full Coverage' : 'Partial Coverage'}
                  </span>
                  <ScholarshipDeadlineBadge deadline={scholarship.deadline} />
                </div>
                <h1 className="text-3xl font-bold leading-tight text-[#0d3286] md:text-4xl">
                  {scholarship.title}
                </h1>
                <p className="mt-2 flex items-center gap-2 text-slate-500">
                  <Landmark className="h-4 w-4 text-[#0d3286]" />
                  Provided by {scholarship.provider}
                </p>
              </div>
            </div>
          </div>

          {/* Right: sticky CTA */}
          <div className="sticky top-28 md:col-span-4">
            <div className="rounded-[24px] border border-slate-100 bg-white p-8 shadow-sm">
              <p className="mb-1 text-xs font-medium uppercase tracking-widest text-slate-400">
                Award Value
              </p>
              <h2 className="mb-6 text-4xl font-bold text-[#0d3286]">
                {formatMoney(scholarship.amount)}
              </h2>

              <div className="mb-8 space-y-4">
                <div className="flex items-center justify-between border-b border-slate-100 py-3">
                  <span className="text-sm text-slate-500">Deadline</span>
                  <span className="text-sm font-semibold text-rose-500">
                    {formatDate(scholarship.deadline)}
                  </span>
                </div>
                <div className="flex items-center justify-between py-3">
                  <span className="text-sm text-slate-500">Country</span>
                  <span className="text-sm font-semibold text-slate-900">
                    {scholarship.countryName}
                  </span>
                </div>
              </div>

              <button className="mb-3 w-full rounded-xl bg-[#0d3286] py-4 text-base font-bold text-white shadow-lg shadow-[#0d3286]/20 transition-all hover:bg-[#0d3286]/90 active:scale-[0.98]">
                Apply Now
              </button>
              <button className="flex w-full items-center justify-center gap-2 rounded-xl bg-slate-50 py-4 text-base font-bold text-[#0d3286] transition-all hover:bg-slate-100">
                <Bookmark className="h-4 w-4" /> Save for Later
              </button>
            </div>
          </div>
        </section>

        {/* Details grid */}
        <section className="grid grid-cols-1 gap-8 md:grid-cols-12">
          <div className="space-y-8 md:col-span-8">
            <div className="rounded-[24px] border border-slate-100 bg-white p-8 shadow-sm">
              <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold text-slate-900">
                <CheckCircle2 className="h-5 w-5 text-[#0d3286]" /> Eligibility Criteria
              </h3>
              <p className="leading-relaxed text-slate-500">{scholarship.eligibilityCriteria}</p>
            </div>

            <div className="rounded-[24px] border border-slate-100 bg-white p-8 shadow-sm">
              <h3 className="mb-6 flex items-center gap-2 text-lg font-semibold text-slate-900">
                <FileText className="h-5 w-5 text-[#0d3286]" /> Required Documents
              </h3>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {scholarship.requiredDocuments.map((doc) => (
                  <div
                    key={doc}
                    className="flex items-start gap-3 rounded-xl bg-slate-50 p-4"
                  >
                    <FileText className="mt-0.5 h-4 w-4 shrink-0 text-[#0d3286]" />
                    <span className="text-sm font-medium text-slate-900">{doc}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="md:col-span-4">
            <div className="rounded-[24px] border border-slate-100 bg-white p-8 shadow-sm">
              <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold text-slate-900">
                <Wallet className="h-5 w-5 text-[#0d3286]" /> Coverage
              </h3>
              <p className="text-sm leading-relaxed text-slate-500">
                This award provides{' '}
                {scholarship.coverageType === 'full'
                  ? 'full coverage of tuition and living costs'
                  : 'a partial contribution toward tuition and living costs'}{' '}
                for the duration of the program, disbursed directly through{' '}
                {scholarship.provider}.
              </p>
            </div>
          </div>
        </section>

        {/* Similar scholarships */}
        {similar.length > 0 && (
          <section className="mt-20">
            <h2 className="mb-8 text-2xl font-semibold text-slate-900">
              Similar Scholarships for You
            </h2>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              {similar.map((s) => (
                <ScholarshipCard key={s.id} scholarship={s} />
              ))}
            </div>
          </section>
        )}
      </main>

      <Footer />
    </>
  )
}