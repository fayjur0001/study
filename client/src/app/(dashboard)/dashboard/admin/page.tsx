// src/app/(dashboard)/dashboard/admin/page.tsx
'use client'

import Link from 'next/link'
import { Users, FileText, TrendingUp, BarChart3, ShieldCheck } from 'lucide-react'
import DashboardLayout from '@/components/layout/DashboardLayout'
import StatCard from '@/components/common/StatCard'
import CountryDistributionChart from '@/components/charts/CountryDistributionChart'
import MonthlyGrowthChart from '@/components/charts/MonthlyGrowthChart'
import { mockUsers, mockApplications, mockAgencies } from '@/lib/mockData'

export default function AdminDashboardPage() {
  const totalUsers = mockUsers.length
  const activeApplications = mockApplications.filter(
    (a) => a.stage !== 'accepted' && a.stage !== 'visa_approved'
  ).length
  const successCount = mockApplications.filter((a) => a.stage === 'visa_approved').length
  const agencySuccessRate =
    mockApplications.length > 0
      ? Math.round((successCount / mockApplications.length) * 100)
      : 0
  const monthlyGrowth = 9 // mock %
  const pendingAgencies = mockAgencies.filter((a) => !a.isApproved)

  // Derive country distribution data from mockApplications
  const countryCounts = mockApplications.reduce<Record<string, number>>((acc, app) => {
    acc[app.countryName] = (acc[app.countryName] ?? 0) + 1
    return acc
  }, {})
  const countryDistributionData = Object.entries(countryCounts).map(([countryName, count]) => ({
    countryName,
    count,
  }))

  // Derive monthly growth data (mock trend based on submittedAt month)
  const monthlyGrowthData = [
    { month: 'Feb', growth: 4 },
    { month: 'Mar', growth: 6 },
    { month: 'Apr', growth: 5 },
    { month: 'May', growth: 8 },
    { month: 'Jun', growth: 7 },
    { month: 'Jul', growth: monthlyGrowth },
  ]

  return (
    <DashboardLayout role="admin">
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight text-slate-900">Admin Overview</h1>
          <p className="mt-1 text-sm text-slate-500 leading-relaxed">
            Platform-wide health, growth, and pending actions.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            icon={<Users className="h-5 w-5" />}
            label="Total Users"
            value={totalUsers.toString()}
            trend="+6%"
          />
          <StatCard
            icon={<FileText className="h-5 w-5" />}
            label="Active Applications"
            value={activeApplications.toString()}
          />
          <StatCard
            icon={<TrendingUp className="h-5 w-5" />}
            label="Agency Success Rate"
            value={`${agencySuccessRate}%`}
            trend="+3%"
          />
          <StatCard
            icon={<BarChart3 className="h-5 w-5" />}
            label="Monthly Growth"
            value={`${monthlyGrowth}%`}
            trend="+2%"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <CountryDistributionChart data={countryDistributionData} />
          <MonthlyGrowthChart data={monthlyGrowthData} />
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-slate-900 flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-amber-500" />
              Pending Agency Approvals
            </h3>
            <Link href="/admin/agencies" className="text-sm font-semibold text-indigo-600 hover:text-indigo-700">
              Review all
            </Link>
          </div>

          {pendingAgencies.length > 0 ? (
            <ul className="divide-y divide-slate-200">
              {pendingAgencies.map((agency) => (
                <li key={agency.id} className="py-3 flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold text-slate-900">{agency.name}</p>
                    <p className="text-xs text-slate-400">{agency.countrySpecialties.join(', ')}</p>
                  </div>
                  <Link
                    href="/admin/agencies"
                    className="text-sm font-semibold text-indigo-600 hover:text-indigo-700"
                  >
                    Review
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-slate-500 leading-relaxed">No pending approvals right now.</p>
          )}
        </div>
      </div>
    </DashboardLayout>
  )
}