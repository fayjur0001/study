// src/app/(dashboard)/admin/analytics/page.tsx
'use client'

import { Users, FileText, TrendingUp, BarChart3, Percent } from 'lucide-react'
import DashboardLayout from '@/components/layout/DashboardLayout'
import StatCard from '@/components/common/StatCard'
import ApplicationTrendChart from '@/components/charts/ApplicationTrendChart'
import CountryDistributionChart from '@/components/charts/CountryDistributionChart'
import MonthlyGrowthChart from '@/components/charts/MonthlyGrowthChart'
import AgencySuccessChart from '@/components/charts/AgencySuccessChart'
import { mockUsers, mockApplications, mockAgencies } from '@/lib/mockData'

export default function AdminAnalyticsPage() {
  const totalUsers = mockUsers.length
  const activeApplications = mockApplications.filter(
    (a) => a.stage !== 'accepted' && a.stage !== 'visa_approved'
  ).length
  const successCount = mockApplications.filter((a) => a.stage === 'visa_approved').length
  const agencySuccessRate =
    mockApplications.length > 0 ? Math.round((successCount / mockApplications.length) * 100) : 0
  const conversionRate = 62 // mock %

  const countryCounts = mockApplications.reduce<Record<string, number>>((acc, app) => {
    acc[app.countryName] = (acc[app.countryName] ?? 0) + 1
    return acc
  }, {})
  const countryDistributionData = Object.entries(countryCounts).map(([countryName, count]) => ({
    countryName,
    count,
  }))

  const applicationTrendData = [
    { month: 'Feb', applications: 8 },
    { month: 'Mar', applications: 11 },
    { month: 'Apr', applications: 14 },
    { month: 'May', applications: 12 },
    { month: 'Jun', applications: 18 },
    { month: 'Jul', applications: mockApplications.length },
  ]

  const monthlyGrowthData = [
    { month: 'Feb', growth: 4 },
    { month: 'Mar', growth: 6 },
    { month: 'Apr', growth: 5 },
    { month: 'May', growth: 8 },
    { month: 'Jun', growth: 7 },
    { month: 'Jul', growth: 9 },
  ]

  const agencySuccessData = mockAgencies.map((agency) => ({
    agencyName: agency.name,
    successCount: mockApplications.filter(
      (a) => a.agencyId === agency.id && a.stage === 'visa_approved'
    ).length,
  }))

  return (
    <DashboardLayout role="admin">
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight text-slate-900">Analytics</h1>
          <p className="mt-1 text-sm text-slate-500 leading-relaxed">
            Platform-wide performance and growth indicators.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          <StatCard icon={<Users className="h-5 w-5" />} label="Total Users" value={totalUsers.toString()} trend="+6%" />
          <StatCard icon={<FileText className="h-5 w-5" />} label="Active Applications" value={activeApplications.toString()} />
          <StatCard icon={<TrendingUp className="h-5 w-5" />} label="Agency Success Rate" value={`${agencySuccessRate}%`} trend="+3%" />
          <StatCard icon={<BarChart3 className="h-5 w-5" />} label="Monthly Growth Rate" value="9%" trend="+2%" />
          <StatCard icon={<Percent className="h-5 w-5" />} label="Conversion Rate" value={`${conversionRate}%`} trend="+5%" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ApplicationTrendChart data={applicationTrendData} />
          <CountryDistributionChart data={countryDistributionData} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <MonthlyGrowthChart data={monthlyGrowthData} />
          <AgencySuccessChart data={agencySuccessData} />
        </div>
      </div>
    </DashboardLayout>
  )
}