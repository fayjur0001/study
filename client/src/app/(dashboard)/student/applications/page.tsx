// src/app/(dashboard)/student/applications/page.tsx
'use client'

import { FileText } from 'lucide-react'
import DashboardLayout from '@/components/layout/DashboardLayout'
import ApplicationCard from '@/components/application/ApplicationCard'
import EmptyState from '@/components/common/EmptyState'
import { mockApplications } from '@/lib/mockData'

const CURRENT_STUDENT_ID = 'user-002'

export default function StudentApplicationsPage() {
  const applications = mockApplications.filter((a) => a.studentId === CURRENT_STUDENT_ID)

  return (
    <DashboardLayout role="student">
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight text-slate-900">My Applications</h1>
          <p className="mt-1 text-sm text-slate-500 leading-relaxed">
            Track the status of every university application you&apos;ve started.
          </p>
        </div>

        {applications.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {applications.map((app) => (
              <ApplicationCard key={app.id} application={app} />
            ))}
          </div>
        ) : (
          <EmptyState
            icon={<FileText className="h-6 w-6" />}
            title="No applications yet"
            description="Browse universities that match your profile and start your first application."
            action={{ label: 'Browse universities', href: '/universities' }}
          />
        )}
      </div>
    </DashboardLayout>
  )
}