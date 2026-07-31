// src/app/(dashboard)/dashboard/student/page.tsx
'use client'

import Link from 'next/link'
import { BookMarked, Search, GraduationCap, Sparkles, ArrowRight } from 'lucide-react'
import DashboardLayout from '@/components/layout/DashboardLayout'
import StatCard from '@/components/common/StatCard'
import ProfileCompletionRing from '@/components/profile/ProfileCompletionRing'
import ApplicationCard from '@/components/application/ApplicationCard'
import NotificationList from '@/components/notification/NotificationList'
import EmptyState from '@/components/common/EmptyState'
import {
  mockStudentProfiles,
  mockApplications,
  mockNotifications,
  mockScholarships,
} from '@/lib/mockData'

const CURRENT_STUDENT_ID = 'user-002'

export default function StudentDashboardPage() {
  const profile = mockStudentProfiles.find((p) => p.userId === CURRENT_STUDENT_ID)
  const applications = mockApplications.filter((a) => a.studentId === CURRENT_STUDENT_ID)
  const activeApplications = applications.filter((a) => a.stage !== 'accepted' && a.stage !== 'visa_approved')
  const notifications = mockNotifications.filter((n) => n.userId === CURRENT_STUDENT_ID).slice(0, 5)
  const savedUniversitiesCount = 4 // mock saved count
  const recentSearches = ['Computer Science in Canada', 'MBA scholarships UK', 'Germany tuition-free']
  const suggestedScholarships = mockScholarships.slice(0, 2)

  return (
    <DashboardLayout role="student">
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight text-slate-900">
            Welcome back{profile ? `, ${profile.fullName.split(' ')[0]}` : ''}
          </h1>
          <p className="mt-1 text-sm text-slate-500 leading-relaxed">
            Here&apos;s where your study abroad journey stands today.
          </p>
        </div>

        {/* Top stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-6 flex items-center gap-5">
            <ProfileCompletionRing percentage={profile?.profileCompletion ?? 0} size={72} />
            <div>
              <p className="text-xs font-medium tracking-wide uppercase text-slate-400">Profile</p>
              <p className="text-lg font-semibold text-slate-900">Completion</p>
              <Link href="/student/profile" className="text-sm font-semibold text-indigo-600 hover:text-indigo-700">
                Complete profile →
              </Link>
            </div>
          </div>

          <StatCard
            icon={<GraduationCap className="h-5 w-5" />}
            label="Eligibility Score"
            value={`${profile?.eligibilityScore ?? 0}%`}
          />
          <StatCard
            icon={<BookMarked className="h-5 w-5" />}
            label="Saved Universities"
            value={savedUniversitiesCount.toString()}
          />
          <StatCard
            icon={<Sparkles className="h-5 w-5" />}
            label="Active Applications"
            value={activeApplications.length.toString()}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Active applications */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-semibold tracking-tight text-slate-900">Active Applications</h2>
              <Link
                href="/student/applications"
                className="text-sm font-semibold text-indigo-600 hover:text-indigo-700"
              >
                View all
              </Link>
            </div>

            {activeApplications.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {activeApplications.slice(0, 4).map((app) => (
                  <ApplicationCard key={app.id} application={app} />
                ))}
              </div>
            ) : (
              <EmptyState
                icon={<GraduationCap className="h-6 w-6" />}
                title="No active applications yet"
                description="Start by browsing universities that match your profile."
                action={{ label: 'Browse universities', href: '/universities' }}
              />
            )}

            {/* Recent searches */}
            <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-6 space-y-3">
              <h3 className="text-lg font-semibold text-slate-900 flex items-center gap-2">
                <Search className="h-4 w-4 text-slate-400" />
                Recent Searches
              </h3>
              <ul className="space-y-2">
                {recentSearches.map((s) => (
                  <li key={s} className="text-sm text-slate-500 leading-relaxed">
                    {s}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right column */}
          <div className="space-y-6">
            <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-6 space-y-4">
              <h3 className="text-lg font-semibold text-slate-900">Notifications</h3>
              <NotificationList notifications={notifications} />
            </div>

            <div className="bg-gradient-to-br from-indigo-600 to-indigo-800 rounded-2xl shadow-sm p-6 text-white space-y-3">
              <p className="text-xs font-medium tracking-wide uppercase text-indigo-100">AI Suggestions</p>
              <h3 className="text-lg font-semibold">Scholarships picked for you</h3>
              <ul className="space-y-1.5">
                {suggestedScholarships.map((s) => (
                  <li key={s.id} className="text-sm text-indigo-50 leading-relaxed">
                    {s.title}
                  </li>
                ))}
              </ul>
              <Link
                href="/student/ai-tools"
                className="inline-flex items-center gap-1 text-sm font-semibold text-white hover:gap-2 transition-all duration-200"
              >
                Explore AI Tools <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}