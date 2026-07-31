// src/app/(dashboard)/dashboard/agency/page.tsx
'use client'

import Link from 'next/link'
import { Users, FileText, TrendingUp, DollarSign } from 'lucide-react'
import DashboardLayout from '@/components/layout/DashboardLayout'
import StatCard from '@/components/common/StatCard'
import ApplicationTrendChart from '@/components/charts/ApplicationTrendChart'
import { formatMoney, formatDate } from '@/lib/utils'
import { mockApplications } from '@/lib/mockData'

const CURRENT_AGENCY_ID = 'agency-001'

export default function AgencyDashboardPage() {
  const agencyApplications = mockApplications.filter((a) => a.agencyId === CURRENT_AGENCY_ID)
  const activeCount = agencyApplications.filter(
    (a) => a.stage !== 'accepted' && a.stage !== 'visa_approved'
  ).length
  const successCount = agencyApplications.filter((a) => a.stage === 'visa_approved').length
  const successRate =
    agencyApplications.length > 0
      ? Math.round((successCount / agencyApplications.length) * 100)
      : 0
  const monthlyRevenue = 4200 // mock

  const uniqueStudents = Array.from(
    new Map(agencyApplications.map((a) => [a.studentId, a])).values()
  )

  const trendData = (() => {
    const counts = new Map<string, number>()
    agencyApplications.forEach((app) => {
      const dateStr = app.submittedAt ?? app.updatedAt
      const month = new Date(dateStr).toLocaleString('en-US', { month: 'short' })
      counts.set(month, (counts.get(month) ?? 0) + 1)
    })
    return Array.from(counts.entries()).map(([month, applications]) => ({
      month,
      applications,
    }))
  })()

  return (
    <DashboardLayout role="agency">
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight text-slate-900">Agency Overview</h1>
          <p className="mt-1 text-sm text-slate-500 leading-relaxed">
            Track your students, applications, and performance at a glance.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            icon={<Users className="h-5 w-5" />}
            label="Total Students"
            value={uniqueStudents.length.toString()}
            trend="+8%"
          />
          <StatCard
            icon={<FileText className="h-5 w-5" />}
            label="Active Applications"
            value={activeCount.toString()}
          />
          <StatCard
            icon={<TrendingUp className="h-5 w-5" />}
            label="Success Rate"
            value={`${successRate}%`}
            trend="+4%"
          />
          <StatCard
            icon={<DollarSign className="h-5 w-5" />}
            label="Revenue This Month"
            value={formatMoney(monthlyRevenue)}
            trend="+12%"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-white border border-slate-200 rounded-2xl shadow-sm p-6">
            <h2 className="text-2xl font-semibold tracking-tight text-slate-900 mb-4">
              Application Trend
            </h2>
            <ApplicationTrendChart data={trendData} />
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-slate-900">Recent Activity</h3>
              <Link href="/agency/students" className="text-sm font-semibold text-indigo-600 hover:text-indigo-700">
                View all
              </Link>
            </div>
            <ul className="space-y-4">
              {agencyApplications.slice(0, 5).map((app) => (
                <li key={app.id} className="flex items-start gap-3">
                  <div className="h-2 w-2 mt-2 rounded-full bg-indigo-600 flex-shrink-0" />
                  <div>
                    <p className="text-sm text-slate-900 leading-relaxed">
                      <span className="font-semibold">{app.studentName}</span> — {app.universityName}
                    </p>
                    <p className="text-xs text-slate-400">{formatDate(app.updatedAt)}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}