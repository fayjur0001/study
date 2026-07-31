// src/app/(public)/universities/[id]/page.tsx
import { notFound } from 'next/navigation'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import UniversityHeader from '@/components/university/UniversityHeader'
import UniversityStats from '@/components/university/UniversityStats'
import UniversityPrograms from '@/components/university/UniversityPrograms'
import UniversityReviews from '@/components/university/UniversityReviews'
import { mockUniversities } from '@/lib/mockData'

export default function UniversityDetailPage({ params }: { params: { id: string } }) {
  const university = mockUniversities.find((u) => u.id === params.id)
  if (!university) notFound()

  return (
    <>
      <Navbar />

      <div className="bg-slate-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 space-y-6">
          <UniversityHeader university={university} />
          <UniversityStats university={university} />
          <UniversityPrograms university={university} />
          <UniversityReviews />
        </div>
      </div>

      <Footer />
    </>
  )
}