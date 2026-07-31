// src/app/(dashboard)/admin/scholarships/page.tsx
'use client'

import { useState } from 'react'
import toast from 'react-hot-toast'
import { Plus, Trash2, Pencil, Star } from 'lucide-react'
import DashboardLayout from '@/components/layout/DashboardLayout'
import ConfirmDialog from '@/components/common/ConfirmDialog'
import { formatMoney, formatDate } from '@/lib/utils'
import { mockScholarships, type Scholarship } from '@/lib/mockData'

export default function AdminScholarshipsPage() {
  const [scholarships, setScholarships] = useState<Scholarship[]>(mockScholarships)
  const [featured, setFeatured] = useState<Set<string>>(new Set([mockScholarships[0]?.id].filter(Boolean) as string[]))
  const [deleteTarget, setDeleteTarget] = useState<Scholarship | null>(null)

  function toggleFeatured(id: string) {
    setFeatured((prev) => {
      const next = new Set(prev)
      if (next.has(id)) {
        next.delete(id)
      } else {
        next.add(id)
      }
      return next
    })
  }

  function handleConfirmDelete() {
    if (!deleteTarget) return
    setScholarships(scholarships.filter((s) => s.id !== deleteTarget.id))
    toast.success(`${deleteTarget.title} removed`)
    setDeleteTarget(null)
  }

  return (
    <DashboardLayout role="admin">
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight text-slate-900">Scholarships</h1>
            <p className="mt-1 text-sm text-slate-500 leading-relaxed">
              Manage scholarship listings and highlight featured opportunities.
            </p>
          </div>
          <button
            type="button"
            onClick={() => toast.success('Add scholarship (mock)')}
            className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:bg-indigo-700 active:scale-[0.98]"
          >
            <Plus className="h-4 w-4" />
            Add Scholarship
          </button>
        </div>

        <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-sm">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="p-4 text-left font-medium text-slate-400">Title</th>
                <th className="p-4 text-left font-medium text-slate-400">Provider</th>
                <th className="p-4 text-left font-medium text-slate-400">Amount</th>
                <th className="p-4 text-left font-medium text-slate-400">Deadline</th>
                <th className="p-4 text-left font-medium text-slate-400">Featured</th>
                <th className="p-4 text-left font-medium text-slate-400">Actions</th>
              </tr>
            </thead>
            <tbody>
              {scholarships.map((s) => (
                <tr key={s.id} className="border-b border-slate-100 last:border-0">
                  <td className="p-4 font-semibold text-slate-900">{s.title}</td>
                  <td className="p-4 text-slate-500">{s.provider}</td>
                  <td className="p-4 text-slate-500">{formatMoney(s.amount)}</td>
                  <td className="p-4 text-slate-500">{formatDate(s.deadline)}</td>
                  <td className="p-4">
                    <button type="button" onClick={() => toggleFeatured(s.id)}>
                      <Star
                        className={`h-4 w-4 ${
                          featured.has(s.id) ? 'fill-amber-500 text-amber-500' : 'text-slate-300'
                        }`}
                      />
                    </button>
                  </td>
                  <td className="p-4">
                    <div className="flex gap-3">
                      <button
                        type="button"
                        onClick={() => toast.success(`Edit ${s.title} (mock)`)}
                        className="inline-flex items-center gap-1 text-sm font-semibold text-indigo-600 hover:text-indigo-700"
                      >
                        <Pencil className="h-3.5 w-3.5" />
                        Edit
                      </button>
                      <button
                        type="button"
                        onClick={() => setDeleteTarget(s)}
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
          title="Delete this scholarship?"
          description="This will remove the scholarship from all listings. This action cannot be undone."
          confirmLabel="Delete"
          variant="danger"
        />
      </div>
    </DashboardLayout>
  )
}