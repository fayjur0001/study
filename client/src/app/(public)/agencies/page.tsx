// src/app/(public)/agencies/page.tsx
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import PageHeader from '@/components/common/PageHeader'
import AgencyGrid from '@/components/agency/AgencyGrid'
import { mockAgencies } from '@/lib/mockData'

export default function AgenciesPage() {
  return (
    <>
      <Navbar />

      <div className="bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <PageHeader
            title="Verified Study Abroad Agencies"
            description="Browse agencies approved by StudyBridge to guide your application, visa, and placement process."
          />

          <div className="mt-10">
            {/* AgencyGrid filters to isApproved === true internally — see its
                inline business-rule comment. Unapproved agencies never reach
                the public marketplace, even though they exist in mock data. */}
            <AgencyGrid agencies={mockAgencies} />
          </div>
        </div>
      </div>

      <Footer />
    </>
  )
}