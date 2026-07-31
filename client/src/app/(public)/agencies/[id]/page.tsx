// src/app/(public)/agencies/[id]/page.tsx
import { notFound } from 'next/navigation'
import { Star } from 'lucide-react'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import AgencyProfileHeader from '@/components/agency/AgencyProfileHeader'
import AgencyServiceList from '@/components/agency/AgencyServiceList'
import { mockAgencies, mockAgencyServices } from '@/lib/mockData'

// Mock reviews — no dedicated review model exists in mockData for agencies,
// so this section stays local to the page.
const mockReviews = [
  {
    id: 'agn-rev-1',
    reviewerName: 'Farhan Rahman',
    rating: 5,
    comment:
      'Guided me through every step of my Canada application, from SOP review to visa filing. Extremely responsive.',
    date: '2026-06-02',
  },
  {
    id: 'agn-rev-2',
    reviewerName: 'Mim Akter',
    rating: 4,
    comment:
      'Helpful and knowledgeable team, though response times slowed down during peak intake season.',
    date: '2026-05-14',
  },
]

export default function AgencyDetailPage({ params }: { params: { id: string } }) {
  const agency = mockAgencies.find((a) => a.id === params.id)

  // BUSINESS RULE: unapproved agencies are hidden from the public marketplace,
  // including direct URL access — not just the listing page.
  if (!agency || !agency.isApproved) notFound()

  const services = mockAgencyServices.filter((service) => service.agencyId === agency.id)

  return (
    <>
      <Navbar />

      <div className="bg-slate-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 space-y-6">
          <AgencyProfileHeader agency={agency} />

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-2xl font-semibold tracking-tight text-slate-900">About</h2>
            <p className="mt-3 text-sm font-normal leading-relaxed text-slate-500">
              {agency.description}
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {agency.countrySpecialties.map((specialty) => (
                <span
                  key={specialty}
                  className="rounded-full bg-indigo-50 px-2.5 py-1 text-xs font-medium text-indigo-700"
                >
                  {specialty}
                </span>
              ))}
            </div>
            <p className="mt-4 text-sm font-normal text-slate-500">
              Service fees: <span className="font-medium text-slate-900">{agency.serviceFeeRange}</span>
            </p>
          </div>

          <AgencyServiceList services={services} />

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-2xl font-semibold tracking-tight text-slate-900">
              Student Reviews
            </h2>
            <div className="mt-5 space-y-5">
              {mockReviews.map((review) => (
                <div
                  key={review.id}
                  className="border-b border-slate-200 pb-5 last:border-0 last:pb-0"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-slate-900">
                      {review.reviewerName}
                    </span>
                    <span className="text-xs font-normal text-slate-400">{review.date}</span>
                  </div>
                  <div className="mt-1.5 flex items-center gap-0.5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={
                          i < review.rating
                            ? 'h-4 w-4 fill-amber-500 text-amber-500'
                            : 'h-4 w-4 text-slate-200'
                        }
                      />
                    ))}
                  </div>
                  <p className="mt-2 text-sm font-normal leading-relaxed text-slate-600">
                    {review.comment}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  )
}