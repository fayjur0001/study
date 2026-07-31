// src/app/(dashboard)/agency/students/[id]/page.tsx
'use client'

import { useParams } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, MessageSquare } from 'lucide-react'
import DashboardLayout from '@/components/layout/DashboardLayout'
import ApplicationTable from '@/components/application/ApplicationTable'
import { mockApplications, mockStudentProfiles } from '@/lib/mockData'

const CURRENT_AGENCY_ID = 'agency-001'

export default function AgencyStudentDetailPage() {
  const params = useParams<{ id: string }>()
  const studentId = params.id

  const studentApplications = mockApplications.filter(
    (a) => a.studentId === studentId && a.agencyId === CURRENT_AGENCY_ID
  )
  const profile = mockStudentProfiles.find((p) => p.userId === studentId)
  const studentName = studentApplications[0]?.studentName

  if (!studentName) {
    return (
      <DashboardLayout role="agency">
        <div className="text-center py-16 space-y-3">
          <h1 className="text-2xl font-semibold tracking-tight text-slate-900">Student not found</h1>
          <p className="text-sm text-slate-500 leading-relaxed">
            This student may not be assigned to your agency.
          </p>
          <Link
            href="/agency/students"
            className="inline-flex items-center gap-1 text-sm font-semibold text-indigo-600 hover:text-indigo-700"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to students
          </Link>
        </div>
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout role="agency">
      <div className="space-y-8">
        <div>
          <Link
            href="/agency/students"
            className="inline-flex items-center gap-1 text-sm font-medium text-slate-500 hover:text-slate-900 transition-all duration-200"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to students
          </Link>

          <div className="mt-4 flex items-start justify-between gap-4">
            <div>
              <h1 className="text-3xl font-semibold tracking-tight text-slate-900">{studentName}</h1>
              {profile && (
                <p className="mt-1 text-sm text-slate-500 leading-relaxed">
                  {profile.major} · Target: {profile.targetDegreeLevel} · CGPA {profile.cgpa}
                </p>
              )}
            </div>
            <Link
              href="/agency/messages"
              className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:bg-indigo-700 active:scale-[0.98]"
            >
              <MessageSquare className="h-4 w-4" />
              Message Student
            </Link>
          </div>
        </div>

        {profile && (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-4">
              <p className="text-xs font-medium tracking-wide uppercase text-slate-400">IELTS</p>
              <p className="mt-1 text-lg font-semibold text-slate-900">{profile.ielts ?? '—'}</p>
            </div>
            <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-4">
              <p className="text-xs font-medium tracking-wide uppercase text-slate-400">Budget</p>
              <p className="mt-1 text-lg font-semibold text-slate-900">
                ${profile.annualTuitionBudget.toLocaleString()}
              </p>
            </div>
            <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-4">
              <p className="text-xs font-medium tracking-wide uppercase text-slate-400">
                Scholarship Need
              </p>
              <p className="mt-1 text-lg font-semibold text-slate-900 capitalize">
                {profile.scholarshipNeed}
              </p>
            </div>
            <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-4">
              <p className="text-xs font-medium tracking-wide uppercase text-slate-400">Intake</p>
              <p className="mt-1 text-lg font-semibold text-slate-900">{profile.intakeSeason}</p>
            </div>
          </div>
        )}

        <div>
          <h2 className="text-2xl font-semibold tracking-tight text-slate-900 mb-4">Applications</h2>
          <ApplicationTable applications={studentApplications} />
        </div>
      </div>
    </DashboardLayout>
  )
}