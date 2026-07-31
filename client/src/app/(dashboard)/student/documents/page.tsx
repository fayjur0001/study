// src/app/(dashboard)/student/documents/page.tsx
'use client'

import DashboardLayout from '@/components/layout/DashboardLayout'
import DocumentVault from '@/components/profile/DocumentVault'
import { mockDocuments } from '@/lib/mockData'

const CURRENT_STUDENT_ID = 'user-002'

export default function StudentDocumentsPage() {
  const documents = mockDocuments.filter((d) => d.studentId === CURRENT_STUDENT_ID)

  return (
    <DashboardLayout role="student">
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight text-slate-900">Documents</h1>
          <p className="mt-1 text-sm text-slate-500 leading-relaxed">
            Upload and manage the documents required for your applications.
          </p>
        </div>

        <DocumentVault documents={documents} />
      </div>
    </DashboardLayout>
  )
}