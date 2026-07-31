// src/app/(dashboard)/agency/services/page.tsx
'use client'

import { useState } from 'react'
import toast from 'react-hot-toast'
import { Plus, Trash2 } from 'lucide-react'
import DashboardLayout from '@/components/layout/DashboardLayout'
import AgencyServiceList from '@/components/agency/AgencyServiceList'
import ConfirmDialog from '@/components/common/ConfirmDialog'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { formatMoney } from '@/lib/utils'
import { mockAgencyServices, type AgencyService } from '@/lib/mockData'

const CURRENT_AGENCY_ID = 'agency-001'

export default function AgencyServicesPage() {
  const [services, setServices] = useState<AgencyService[]>(
    mockAgencyServices.filter((s) => s.agencyId === CURRENT_AGENCY_ID)
  )
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [fee, setFee] = useState('')
  const [countryFocus, setCountryFocus] = useState('')
  const [deleteTarget, setDeleteTarget] = useState<string | null>(null)

  function handleAddService() {
    if (!title.trim() || !fee) {
      toast.error('Please fill in the title and fee')
      return
    }
    const newService: AgencyService = {
      id: `service-${Date.now()}`,
      agencyId: CURRENT_AGENCY_ID,
      title,
      description,
      fee: Number(fee),
      countryFocus,
    }
    setServices([...services, newService])
    setTitle('')
    setDescription('')
    setFee('')
    setCountryFocus('')
    toast.success('Service added successfully')
  }

  function handleConfirmDelete() {
    setServices(services.filter((s) => s.id !== deleteTarget))
    setDeleteTarget(null)
    toast.success('Service removed')
  }

  return (
    <DashboardLayout role="agency">
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight text-slate-900">Services</h1>
          <p className="mt-1 text-sm text-slate-500 leading-relaxed">
            Manage the consulting services your agency offers.
          </p>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-6 space-y-4">
          <h2 className="text-lg font-semibold text-slate-900">Add a New Service</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Service title" />
            <Input
              value={fee}
              onChange={(e) => setFee(e.target.value)}
              placeholder="Fee (USD)"
              type="number"
            />
            <Input
              value={countryFocus}
              onChange={(e) => setCountryFocus(e.target.value)}
              placeholder="Country focus"
            />
          </div>
          <Textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Service description"
            rows={3}
          />
          <button
            type="button"
            onClick={handleAddService}
            className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:bg-indigo-700 active:scale-[0.98]"
          >
            <Plus className="h-4 w-4" />
            Add Service
          </button>
        </div>

        <div className="space-y-3">
          <AgencyServiceList services={services} />
          <div className="space-y-2">
            {services.map((s) => (
              <div key={s.id} className="flex justify-end">
                <button
                  type="button"
                  onClick={() => setDeleteTarget(s.id)}
                  className="inline-flex items-center gap-1 text-sm font-medium text-rose-500 hover:text-rose-600"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                  Delete &quot;{s.title}&quot;
                </button>
              </div>
            ))}
          </div>
        </div>

        <ConfirmDialog
          isOpen={deleteTarget !== null}
          onClose={() => setDeleteTarget(null)}
          onConfirm={handleConfirmDelete}
          title="Delete this service?"
          description="This will remove the service from your public agency profile. This action cannot be undone."
          confirmLabel="Delete"
          variant="danger"
        />
      </div>
    </DashboardLayout>
  )
}