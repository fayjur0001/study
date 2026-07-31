// src/app/(dashboard)/admin/agencies/page.tsx
'use client'

import { useState } from 'react'
import toast from 'react-hot-toast'
import { Check, X } from 'lucide-react'
import DashboardLayout from '@/components/layout/DashboardLayout'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import VerifiedBadge from '@/components/agency/VerifiedBadge'
import AgencyRatingStars from '@/components/agency/AgencyRatingStars'
import { mockAgencies, type Agency } from '@/lib/mockData'

export default function AdminAgenciesPage() {
  const [agencies, setAgencies] = useState<Agency[]>(mockAgencies)

  const pending = agencies.filter((a) => !a.isApproved)
  const approved = agencies.filter((a) => a.isApproved)

  function handleApprove(id: string) {
    setAgencies(agencies.map((a) => (a.id === id ? { ...a, isApproved: true } : a)))
    toast.success('Agency approved')
  }

  function handleReject(id: string) {
    setAgencies(agencies.filter((a) => a.id !== id))
    toast.success('Agency application rejected')
  }

  return (
    <DashboardLayout role="admin">
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight text-slate-900">Agencies</h1>
          <p className="mt-1 text-sm text-slate-500 leading-relaxed">
            Review pending agency applications and manage approved partners.
          </p>
        </div>

        <Tabs defaultValue="pending" className="space-y-6">
          <TabsList>
            <TabsTrigger value="pending">Pending Approval ({pending.length})</TabsTrigger>
            <TabsTrigger value="approved">Approved ({approved.length})</TabsTrigger>
          </TabsList>

          <TabsContent value="pending">
            {pending.length > 0 ? (
              <div className="space-y-3">
                {pending.map((agency) => (
                  <div
                    key={agency.id}
                    className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
                  >
                    <div>
                      <p className="text-base font-semibold text-slate-900">{agency.name}</p>
                      <p className="text-sm text-slate-500 leading-relaxed">
                        {agency.countrySpecialties.join(', ')}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => handleApprove(agency.id)}
                        className="inline-flex items-center gap-1 rounded-lg bg-indigo-600 px-3 py-1.5 text-sm font-semibold text-white transition-all duration-200 hover:bg-indigo-700 active:scale-[0.98]"
                      >
                        <Check className="h-3.5 w-3.5" />
                        Approve
                      </button>
                      <button
                        type="button"
                        onClick={() => handleReject(agency.id)}
                        className="inline-flex items-center gap-1 rounded-lg border border-slate-200 px-3 py-1.5 text-sm font-semibold text-rose-500 transition-all duration-200 hover:bg-rose-50"
                      >
                        <X className="h-3.5 w-3.5" />
                        Reject
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-slate-500 leading-relaxed">No pending agency applications.</p>
            )}
          </TabsContent>

          <TabsContent value="approved">
            <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-sm">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-200">
                    <th className="p-4 text-left font-medium text-slate-400">Agency</th>
                    <th className="p-4 text-left font-medium text-slate-400">Specialties</th>
                    <th className="p-4 text-left font-medium text-slate-400">Rating</th>
                    <th className="p-4 text-left font-medium text-slate-400">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {approved.map((agency) => (
                    <tr key={agency.id} className="border-b border-slate-100 last:border-0">
                      <td className="p-4 font-semibold text-slate-900">{agency.name}</td>
                      <td className="p-4 text-slate-500">{agency.countrySpecialties.join(', ')}</td>
                      <td className="p-4">
                        <AgencyRatingStars rating={agency.rating} reviewCount={agency.reviewCount} />
                      </td>
                      <td className="p-4">
                        <VerifiedBadge isVerified={agency.isVerified} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}