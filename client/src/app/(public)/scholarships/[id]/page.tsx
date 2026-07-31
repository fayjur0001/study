// src/app/(public)/scholarships/[id]/page.tsx
import { notFound } from 'next/navigation'
import { CheckCircle2, FileText } from 'lucide-react'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import ScholarshipDeadlineBadge from '@/components/scholarship/ScholarshipDeadlineBadge'
import { formatMoney, formatDate } from '@/lib/utils'
import { mockScholarships } from '@/lib/mockData'

export default function ScholarshipDetailPage({ params }: { params: { id: string } }) {
  const scholarship = mockScholarships.find((s) => s.id === params.id)
  if (!scholarship) notFound()

  return (
    <>
      <Navbar />

      <div className="bg-slate-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 space-y-6">
          {/* Header card */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 md:p-8 shadow-sm">
            <div className="flex items-start justify-between gap-3">
              <span
                className={
                  scholarship.coverageType === 'full'
                    ? 'inline-flex items-center rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-medium uppercase tracking-wide text-emerald-600'
                    : 'inline-flex items-center rounded-full bg-sky-50 px-2.5 py-1 text-xs font-medium uppercase tracking-wide text-sky-600'
                }
              >
                {scholarship.coverageType === 'full' ? 'Full Coverage' : 'Partial Coverage'}
              </span>
              <ScholarshipDeadlineBadge deadline={scholarship.deadline} />
            </div>

            <h1 className="mt-4 text-3xl font-semibold tracking-tight leading-tight text-slate-900">
              {scholarship.title}
            </h1>
            <p className="mt-2 text-sm font-normal text-slate-500">
              {scholarship.provider} · {scholarship.countryName}
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-6 border-t border-slate-200 pt-6">
              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                  Award Amount
                </p>
                <p className="mt-1 text-2xl font-semibold tracking-tight text-slate-900">
                  {formatMoney(scholarship.amount)}
                </p>
              </div>
              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                  Deadline
                </p>
                <p className="mt-1 text-lg font-semibold tracking-tight text-slate-900">
                  {formatDate(scholarship.deadline)}
                </p>
              </div>
            </div>

            <button className="mt-8 w-full rounded-lg bg-indigo-600 px-6 py-3 text-sm font-semibold text-white transition-all duration-200 ease-out hover:bg-indigo-700 active:scale-[0.98] sm:w-auto">
              Apply for this Scholarship
            </button>
          </div>

          {/* Eligibility */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 md:p-8 shadow-sm">
            <h2 className="text-lg font-semibold text-slate-900">Eligibility Criteria</h2>
            <p className="mt-3 text-sm font-normal leading-relaxed text-slate-500">
              {scholarship.eligibilityCriteria}
            </p>
          </div>

          {/* Required documents */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 md:p-8 shadow-sm">
            <h2 className="text-lg font-semibold text-slate-900">Required Documents</h2>
            <ul className="mt-4 space-y-3">
              {scholarship.requiredDocuments.map((doc) => (
                <li
                  key={doc}
                  className="flex items-center gap-3 rounded-lg border border-slate-200 px-4 py-3"
                >
                  <FileText className="h-4 w-4 shrink-0 text-indigo-600" />
                  <span className="text-sm font-normal text-slate-900">{doc}</span>
                  <CheckCircle2 className="ml-auto h-4 w-4 shrink-0 text-slate-200" />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <Footer />
    </>
  )
}