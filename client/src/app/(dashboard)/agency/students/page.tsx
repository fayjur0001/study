// src/app/(dashboard)/agency/students/page.tsx
'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import { Search } from 'lucide-react'
import DashboardLayout from '@/components/layout/DashboardLayout'
import { Input } from '@/components/ui/input'
import { mockApplications } from '@/lib/mockData'

const CURRENT_AGENCY_ID = 'agency-001'

export default function AgencyStudentsPage() {
  const [query, setQuery] = useState('')

  const students = useMemo(() => {
    const agencyApplications = mockApplications.filter((a) => a.agencyId === CURRENT_AGENCY_ID)
    const studentMap = new Map<string, { id: string; name: string; applicationCount: number }>()

    agencyApplications.forEach((app) => {
      const existing = studentMap.get(app.studentId)
      studentMap.set(app.studentId, {
        id: app.studentId,
        name: app.studentName,
        applicationCount: (existing?.applicationCount ?? 0) + 1,
      })
    })

    return Array.from(studentMap.values())
  }, [])

  const filteredStudents = students.filter((s) =>
    s.name.toLowerCase().includes(query.toLowerCase())
  )

  return (
    <DashboardLayout role="agency">
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight text-slate-900">Students</h1>
          <p className="mt-1 text-sm text-slate-500 leading-relaxed">
            Students currently working with your agency.
          </p>
        </div>

        <div className="relative max-w-sm">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search students..."
            className="pl-9"
          />
        </div>

        <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-sm">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="p-4 text-left font-medium text-slate-400">Student</th>
                <th className="p-4 text-left font-medium text-slate-400">Applications</th>
                <th className="p-4 text-left font-medium text-slate-400">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredStudents.map((student) => (
                <tr key={student.id} className="border-b border-slate-100 last:border-0">
                  <td className="p-4 font-semibold text-slate-900">{student.name}</td>
                  <td className="p-4 text-slate-500">{student.applicationCount}</td>
                  <td className="p-4">
                    <Link
                      href={`/agency/students/${student.id}`}
                      className="text-sm font-semibold text-indigo-600 hover:text-indigo-700"
                    >
                      View Profile
                    </Link>
                  </td>
                </tr>
              ))}
              {filteredStudents.length === 0 && (
                <tr>
                  <td colSpan={3} className="p-6 text-center text-sm text-slate-400">
                    No students found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  )
}