// src/app/(dashboard)/agency/analytics/page.tsx
'use client'

import { FileText, TrendingUp, Users, DollarSign } from 'lucide-react'
import DashboardLayout from '@/components/layout/DashboardLayout'
import StatCard from '@/components/common/StatCard'
import ApplicationTrendChart from '@/components/charts/ApplicationTrendChart'
import AgencySuccessChart from '@/components/charts/AgencySuccessChart'
import CountryDistributionChart from '@/components/charts/CountryDistributionChart'
import { formatMoney } from '@/lib/utils'
import { mockApplications, mockAgencies } from '@/lib/mockData'

const CURRENT_AGENCY_ID = 'agency-001'

export default function AgencyAnalyticsPage() {
  const agency = mockAgencies.find((a) => a.id === CURRENT_AGENCY_ID)
  const agencyApplications = mockApplications.filter((a) => a.agencyId === CURRENT_AGENCY_ID)

  const uniqueStudents = new Set(agencyApplications.map((a) => a.studentId)).size
  const activeCount = agencyApplications.filter(
    (a) => a.stage !== 'accepted' && a.stage !== 'visa_approved'
  ).length
  const successCount = agencyApplications.filter((a) => a.stage === 'visa_approved').length
  const successRate =
    agencyApplications.length > 0 ? Math.round((successCount / agencyApplications.length) * 100) : 0

  const countryCounts = agencyApplications.reduce<Record<string, number>>((acc, app) => {
    acc[app.countryName] = (acc[app.countryName] ?? 0) + 1
    return acc
  }, {})
  const countryDistributionData = Object.entries(countryCounts).map(([countryName, count]) => ({
    countryName,
    count,
  }))

  const applicationTrendData = [
    { month: 'Feb', applications: 2 },
    { month: 'Mar', applications: 3 },
    { month: 'Apr', applications: 4 },
    { month: 'May', applications: 3 },
    { month: 'Jun', applications: 5 },
    { month: 'Jul', applications: agencyApplications.length },
  ]

  const agencySuccessData = [
    { agencyName: agency?.name ?? 'This Agency', successCount },
  ]

  return (
    <DashboardLayout role="agency">
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight text-slate-900">Analytics</h1>
          <p className="mt-1 text-sm text-slate-500 leading-relaxed">
            Performance insights scoped to your agency&apos;s students.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard icon={<Users className="h-5 w-5" />} label="Total Students" value={uniqueStudents.toString()} />
          <StatCard icon={<FileText className="h-5 w-5" />} label="Active Applications" value={activeCount.toString()} />
          <StatCard icon={<TrendingUp className="h-5 w-5" />} label="Success Rate" value={`${successRate}%`} trend="+4%" />
          <StatCard icon={<DollarSign className="h-5 w-5" />} label="Total Revenue" value={formatMoney(4200)} trend="+12%" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ApplicationTrendChart data={applicationTrendData} />
          <CountryDistributionChart data={countryDistributionData} />
        </div>

        <AgencySuccessChart data={agencySuccessData} />
      </div>
    </DashboardLayout>
  )
}