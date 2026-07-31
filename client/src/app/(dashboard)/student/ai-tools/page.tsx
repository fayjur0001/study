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

        <Tabs defaultValue="sop" className="space-y-6">
          <TabsList className="flex-wrap h-auto">
            <TabsTrigger value="sop">SOP Generator</TabsTrigger>
            <TabsTrigger value="cv">CV Reviewer</TabsTrigger>
            <TabsTrigger value="budget">Budget Calculator</TabsTrigger>
            <TabsTrigger value="visa">Visa Probability</TabsTrigger>
            <TabsTrigger value="matches">Find Matches</TabsTrigger>
          </TabsList>

          <TabsContent value="sop">
            <SOPGeneratorCard />
          </TabsContent>

          <TabsContent value="cv">
            <CVReviewerCard />
          </TabsContent>

          <TabsContent value="budget">
            <BudgetCalculatorCard countries={mockCountries} />
          </TabsContent>

          <TabsContent value="visa">
            {profile && <VisaProbabilityCard countries={mockCountries} profile={profile} />}
          </TabsContent>

          <TabsContent value="matches">
            <RecommendationEngine universities={mockUniversities} />
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}