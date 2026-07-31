// src/app/(dashboard)/student/saved/page.tsx
'use client'

import DashboardLayout from '@/components/layout/DashboardLayout'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import UniversityGrid from '@/components/university/UniversityGrid'
import ScholarshipGrid from '@/components/scholarship/ScholarshipGrid'
import { mockUniversities, mockScholarships } from '@/lib/mockData'

export default function StudentSavedPage() {
  // Mock saved subset — first 4 universities and first 3 scholarships
  const savedUniversities = mockUniversities.slice(0, 4)
  const savedScholarships = mockScholarships.slice(0, 3)

  return (
    <DashboardLayout role="student">
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight text-slate-900">Saved</h1>
          <p className="mt-1 text-sm text-slate-500 leading-relaxed">
            Universities and scholarships you&apos;ve bookmarked for later.
          </p>
        </div>

        <Tabs defaultSelectedKey="universities" className="space-y-6">
          <TabsList>
            <TabsTrigger id="universities">Saved Universities</TabsTrigger>
            <TabsTrigger id="scholarships">Saved Scholarships</TabsTrigger>
          </TabsList>

          <TabsContent id="universities">
            <UniversityGrid universities={savedUniversities} />
          </TabsContent>

          <TabsContent id="scholarships">
            <ScholarshipGrid scholarships={savedScholarships} />
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}