// src/app/(dashboard)/admin/universities/page.tsx
'use client'

import { useState } from 'react'
import toast from 'react-hot-toast'
import { Plus, Trash2, Pencil } from 'lucide-react'
import DashboardLayout from '@/components/layout/DashboardLayout'
import ConfirmDialog from '@/components/common/ConfirmDialog'
import { formatMoney, formatPercent } from '@/lib/utils'
import { mockUniversities, type University } from '@/lib/mockData'

export default function AdminUniversitiesPage() {
  const [universities, setUniversities] = useState<University[]>(mockUniversities)
  const [deleteTarget, setDeleteTarget] = useState<University | null>(null)

  function handleConfirmDelete() {
    if (!deleteTarget) return
    setUniversities(universities.filter((u) => u.id !== deleteTarget.id))
    toast.success(`${deleteTarget.name} removed`)
    setDeleteTarget(null)
  }

  return (
    <DashboardLayout role="admin">
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight text-slate-900">Universities</h1>
            <p className="mt-1 text-sm text-slate-500 leading-relaxed">
              Manage the university listings shown to students.
            </p>
          </div>
          <button
            type="button"
            onClick={() => toast.success('Add university (mock)')}
            className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:bg-indigo-700 active:scale-[0.98]"
          >
            <Plus className="h-4 w-4" />
            Add University
          </button>
        </div>

        <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-sm">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="p-4 text-left font-medium text-slate-400">Name</th>
                <th className="p-4 text-left font-medium text-slate-400">Country</th>
                <th className="p-4 text-left font-medium text-slate-400">Tuition Range</th>
                <th className="p-4 text-left font-medium text-slate-400">Acceptance</th>
                <th className="p-4 text-left font-medium text-slate-400">Actions</th>
              </tr>
            </thead>
            <tbody>
              {universities.map((uni) => (
                <tr key={uni.id} className="border-b border-slate-100 last:border-0">
                  <td className="p-4 font-semibold text-slate-900">{uni.name}</td>
                  <td className="p-4 text-slate-500">{uni.countryName}</td>
                  <td className="p-4 text-slate-500">
                    {formatMoney(uni.tuitionMin)} – {formatMoney(uni.tuitionMax)}
                  </td>
                  <td className="p-4 text-slate-500">{formatPercent(uni.acceptanceRate)}</td>
                  <td className="p-4">
                    <div className="flex gap-3">
                      <button
                        type="button"
                        onClick={() => toast.success(`Edit ${uni.name} (mock)`)}
                        className="inline-flex items-center gap-1 text-sm font-semibold text-indigo-600 hover:text-indigo-700"
                      >
                        <Pencil className="h-3.5 w-3.5" />
                        Edit
                      </button>
                      <button
                        type="button"
                        onClick={() => setDeleteTarget(uni)}
                        className="inline-flex items-center gap-1 text-sm font-semibold text-rose-500 hover:text-rose-600"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <ConfirmDialog
          isOpen={deleteTarget !== null}
          onClose={() => setDeleteTarget(null)}
          onConfirm={handleConfirmDelete}
          title="Delete this university?"
          description="This will remove the university from all listings and search results. This action cannot be undone."
          confirmLabel="Delete"
          variant="danger"
        />
      </div>
    </DashboardLayout>
  )
}