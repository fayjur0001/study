// src/app/(dashboard)/student/profile/page.tsx
'use client'

import DashboardLayout from '@/components/layout/DashboardLayout'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import ProfileForm from '@/components/profile/ProfileForm'
import LanguageScoresForm from '@/components/profile/LanguageScoresForm'
import FinancialProfileForm from '@/components/profile/FinancialProfileForm'
import StudyPreferencesForm from '@/components/profile/StudyPreferencesForm'
import { mockStudentProfiles } from '@/lib/mockData'

const CURRENT_STUDENT_ID = 'user-002'

export default function StudentProfilePage() {
  const profile = mockStudentProfiles.find((p) => p.userId === CURRENT_STUDENT_ID)

  if (!profile) {
    return (
      <DashboardLayout role="student">
        <p className="text-sm text-slate-500 leading-relaxed">Profile not found.</p>
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout role="student">
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight text-slate-900">My Profile</h1>
          <p className="mt-1 text-sm text-slate-500 leading-relaxed">
            Keep your academic, language, and study preference details up to date.
          </p>
        </div>

        <Tabs defaultSelectedKey="personal" className="space-y-6">
          <TabsList>
            <TabsTrigger id="personal">Personal &amp; Academic</TabsTrigger>
            <TabsTrigger id="language">Language Scores</TabsTrigger>
            <TabsTrigger id="financial">Financial</TabsTrigger>
            <TabsTrigger id="preferences">Study Preferences</TabsTrigger>
          </TabsList>

          <TabsContent id="personal">
            <ProfileForm profile={profile} />
          </TabsContent>

          <TabsContent id="language">
            <LanguageScoresForm profile={profile} />
          </TabsContent>

          <TabsContent id="financial">
            <FinancialProfileForm profile={profile} />
          </TabsContent>

          <TabsContent id="preferences">
            <StudyPreferencesForm profile={profile} />
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}