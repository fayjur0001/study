// src/app/(dashboard)/student/ai-tools/page.tsx
'use client'

import DashboardLayout from '@/components/layout/DashboardLayout'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import SOPGeneratorCard from '@/components/ai-tools/SOPGeneratorCard'
import CVReviewerCard from '@/components/ai-tools/CVReviewerCard'
import BudgetCalculatorCard from '@/components/ai-tools/BudgetCalculatorCard'
import VisaProbabilityCard from '@/components/ai-tools/VisaProbabilityCard'
import RecommendationEngine from '@/components/ai-tools/RecommendationEngine'
import { mockCountries, mockStudentProfiles, mockUniversities } from '@/lib/mockData'

const CURRENT_STUDENT_ID = 'user-002'

export default function StudentAiToolsPage() {
  const profile = mockStudentProfiles.find((p) => p.userId === CURRENT_STUDENT_ID)

  return (
    <DashboardLayout role="student">
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight text-slate-900">AI Tools</h1>
          <p className="mt-1 text-sm text-slate-500 leading-relaxed">
            Get instant, AI-powered help with your applications — from SOPs to visa predictions.
          </p>
        </div>

        <Tabs defaultSelectedKey="sop" className="space-y-6">
          <TabsList className="flex-wrap h-auto">
            <TabsTrigger id="sop">SOP Generator</TabsTrigger>
            <TabsTrigger id="cv">CV Reviewer</TabsTrigger>
            <TabsTrigger id="budget">Budget Calculator</TabsTrigger>
            <TabsTrigger id="visa">Visa Probability</TabsTrigger>
            <TabsTrigger id="matches">Find Matches</TabsTrigger>
          </TabsList>

          <TabsContent id="sop">
            <SOPGeneratorCard />
          </TabsContent>

          <TabsContent id="cv">
            <CVReviewerCard />
          </TabsContent>

          <TabsContent id="budget">
            <BudgetCalculatorCard countries={mockCountries} />
          </TabsContent>

          <TabsContent id="visa">
            {profile && <VisaProbabilityCard countries={mockCountries} profile={profile} />}
          </TabsContent>

          <TabsContent id="matches">
            <RecommendationEngine universities={mockUniversities} />
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}