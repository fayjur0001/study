// src/app/(dashboard)/student/recommendations/page.tsx
'use client'

import RecommendationEngine from '@/components/ai-tools/RecommendationEngine'
import UniversityGrid from '@/components/university/UniversityGrid'
import DashboardLayout from '@/components/layout/DashboardLayout'
import { mockUniversities, mockMatchResults } from '@/lib/mockData'

const CURRENT_STUDENT_ID = 'user-002'

export default function StudentRecommendationsPage() {
  const studentMatches = mockMatchResults.filter((m) => m.studentId === CURRENT_STUDENT_ID)

  const matchScores: Record<string, number> = studentMatches.reduce(
    (acc, m) => ({ ...acc, [m.universityId]: m.overallMatch }),
    {}
  )

  const recommendedUniversities = mockUniversities
    .filter((u) => matchScores[u.id] !== undefined)
    .sort((a, b) => (matchScores[b.id] ?? 0) - (matchScores[a.id] ?? 0))

  return (
    <DashboardLayout role="student">
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight text-slate-900">Recommendations</h1>
          <p className="mt-1 text-sm text-slate-500 leading-relaxed">
            AI-powered matches based on your academic profile, budget, and preferences.
          </p>
        </div>

        <RecommendationEngine universities={mockUniversities} />

        <div className="space-y-4">
          <h2 className="text-2xl font-semibold tracking-tight text-slate-900">
            Your Top Matches
          </h2>
          <UniversityGrid universities={recommendedUniversities} matchScores={matchScores} />
        </div>
      </div>
    </DashboardLayout>
  )
}