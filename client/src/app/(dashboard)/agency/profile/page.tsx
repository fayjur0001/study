// src/app/(dashboard)/agency/profile/page.tsx
'use client'

import { useState } from 'react'
import toast from 'react-hot-toast'
import { Loader2, X } from 'lucide-react'
import DashboardLayout from '@/components/layout/DashboardLayout'
import AgencyProfileHeader from '@/components/agency/AgencyProfileHeader'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { mockAgencies } from '@/lib/mockData'

const CURRENT_AGENCY_ID = 'agency-001'

export default function AgencyProfilePage() {
  const agency = mockAgencies.find((a) => a.id === CURRENT_AGENCY_ID)

  const [description, setDescription] = useState(agency?.description ?? '')
  const [specialties, setSpecialties] = useState<string[]>(agency?.countrySpecialties ?? [])
  const [specialtyInput, setSpecialtyInput] = useState('')
  const [isSaving, setIsSaving] = useState(false)

  if (!agency) {
    return (
      <DashboardLayout role="agency">
        <p className="text-sm text-slate-500 leading-relaxed">Agency profile not found.</p>
      </DashboardLayout>
    )
  }

  function addSpecialty() {
    const trimmed = specialtyInput.trim()
    if (trimmed && !specialties.includes(trimmed)) {
      setSpecialties([...specialties, trimmed])
      setSpecialtyInput('')
    }
  }

  function removeSpecialty(specialty: string) {
    setSpecialties(specialties.filter((s) => s !== specialty))
  }

  function handleSave() {
    setIsSaving(true)
    setTimeout(() => {
      setIsSaving(false)
      toast.success('Agency profile updated successfully')
    }, 1200)
  }

  return (
    <DashboardLayout role="agency">
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight text-slate-900">Agency Profile</h1>
          <p className="mt-1 text-sm text-slate-500 leading-relaxed">
            This is how your agency appears to students in the marketplace.
          </p>
        </div>

        <AgencyProfileHeader agency={{ ...agency, description }} />

        <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-6 space-y-5 max-w-2xl">
          <h2 className="text-lg font-semibold text-slate-900">Edit Details</h2>

          <div className="space-y-1">
            <label className="text-sm font-normal text-slate-500">Description</label>
            <Textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-normal text-slate-500">Country Specialties</label>
            <div className="flex flex-wrap gap-2">
              {specialties.map((s) => (
                <span
                  key={s}
                  className="inline-flex items-center gap-1 rounded-full bg-indigo-50 px-3 py-1 text-xs font-medium text-indigo-700"
                >
                  {s}
                  <button type="button" onClick={() => removeSpecialty(s)}>
                    <X className="h-3 w-3" />
                  </button>
                </span>
              ))}
            </div>
            <div className="flex gap-2">
              <Input
                value={specialtyInput}
                onChange={(e) => setSpecialtyInput(e.target.value)}
                placeholder="Add a country"
                onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addSpecialty())}
              />
              <button
                type="button"
                onClick={addSpecialty}
                className="rounded-lg border border-slate-200 px-4 text-sm font-semibold text-slate-900 transition-all duration-200 hover:bg-slate-50"
              >
                Add
              </button>
            </div>
          </div>

          <button
            type="button"
            onClick={handleSave}
            disabled={isSaving}
            className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:bg-indigo-700 active:scale-[0.98] disabled:opacity-60"
          >
            {isSaving && <Loader2 className="h-4 w-4 animate-spin" />}
            Save Changes
          </button>
        </div>
      </div>
    </DashboardLayout>
  )
}