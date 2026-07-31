// src/app/(dashboard)/student/applications/[id]/page.tsx
'use client'

import { useParams } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import DashboardLayout from '@/components/layout/DashboardLayout'
import ApplicationTimeline from '@/components/application/ApplicationTimeline'
import ApplicationStageBadge from '@/components/application/ApplicationStageBadge'
import DocumentUploadRow from '@/components/application/DocumentUploadRow'
import { formatDate } from '@/lib/utils'
import { mockApplications } from '@/lib/mockData'

export default function StudentApplicationDetailPage() {
  const params = useParams<{ id: string }>()
  const application = mockApplications.find((a) => a.id === params.id)

  if (!application) {
    return (
      <DashboardLayout role="student">
        <div className="text-center py-16 space-y-3">
          <h1 className="text-2xl font-semibold tracking-tight text-slate-900">
            Application not found
          </h1>
          <p className="text-sm text-slate-500 leading-relaxed">
            This application may have been removed or the link is incorrect.
          </p>
          <Link
            href="/student/applications"
            className="inline-flex items-center gap-1 text-sm font-semibold text-indigo-600 hover:text-indigo-700"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to applications
          </Link>
        </div>
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout role="student">
      <div className="space-y-8">
        <div>
          <Link
            href="/student/applications"
            className="inline-flex items-center gap-1 text-sm font-medium text-slate-500 hover:text-slate-900 transition-all duration-200"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to applications
          </Link>

          <div className="mt-4 flex items-start justify-between gap-4">
            <div>
              <h1 className="text-3xl font-semibold tracking-tight text-slate-900">
                {application.universityName}
              </h1>
              <p className="mt-1 text-sm text-slate-500 leading-relaxed">
                {application.program} · {application.countryName}
              </p>
            </div>
            <ApplicationStageBadge stage={application.stage} />
          </div>

          <p className="mt-2 text-xs text-slate-400">
            Last updated {formatDate(application.updatedAt)}
            {application.submittedAt && ` · Submitted ${formatDate(application.submittedAt)}`}
          </p>
        </div>

        <ApplicationTimeline currentStage={application.stage} />

        <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-6 space-y-4">
          <h2 className="text-2xl font-semibold tracking-tight text-slate-900">Documents</h2>
          <div className="space-y-3">
            {application.documents.map((doc) => (
              <DocumentUploadRow
                key={doc.name}
                documentName={doc.name}
                isUploaded={doc.uploaded}
                documentUrl={doc.url}
              />
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}