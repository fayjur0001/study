// src/app/(dashboard)/admin/settings/page.tsx
'use client'

import { useState } from 'react'
import toast from 'react-hot-toast'
import { Loader2, ShieldCheck } from 'lucide-react'
import DashboardLayout from '@/components/layout/DashboardLayout'
import { Input } from '@/components/ui/input'

const mockAuditLog = [
  { id: 'log-1', action: 'Approved agency: Global Education Consultants', actor: 'Rezwan Karim', time: '2 hours ago' },
  { id: 'log-2', action: 'Banned user: spam_account_42', actor: 'Rezwan Karim', time: '1 day ago' },
  { id: 'log-3', action: 'Updated platform support email', actor: 'Rezwan Karim', time: '3 days ago' },
]

export default function AdminSettingsPage() {
  const [siteName, setSiteName] = useState('StudyBridge')
  const [supportEmail, setSupportEmail] = useState('support@studybridge.com')
  const [maintenanceMode, setMaintenanceMode] = useState(false)
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(true)
  const [isSaving, setIsSaving] = useState(false)

  function handleSave() {
    setIsSaving(true)
    setTimeout(() => {
      setIsSaving(false)
      toast.success('Platform settings saved')
    }, 1200)
  }

  return (
    <DashboardLayout role="admin">
      <div className="space-y-8 max-w-2xl">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight text-slate-900">Settings</h1>
          <p className="mt-1 text-sm text-slate-500 leading-relaxed">
            Platform-wide configuration and security controls.
          </p>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-6 space-y-5">
          <h2 className="text-lg font-semibold text-slate-900">Platform</h2>
          <div className="space-y-1">
            <label className="text-sm font-normal text-slate-500">Site name</label>
            <Input value={siteName} onChange={(e) => setSiteName(e.target.value)} />
          </div>
          <div className="space-y-1">
            <label className="text-sm font-normal text-slate-500">Support email</label>
            <Input
              value={supportEmail}
              onChange={(e) => setSupportEmail(e.target.value)}
              type="email"
            />
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm font-normal text-slate-900">Maintenance mode</span>
            <button
              type="button"
              onClick={() => setMaintenanceMode(!maintenanceMode)}
              className={`relative h-6 w-11 rounded-full transition-all duration-200 ${
                maintenanceMode ? 'bg-indigo-600' : 'bg-slate-200'
              }`}
            >
              <span
                className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow-sm transition-all duration-200 ${
                  maintenanceMode ? 'left-5' : 'left-0.5'
                }`}
              />
            </button>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-6 space-y-4">
          <h2 className="text-lg font-semibold text-slate-900 flex items-center gap-2">
            <ShieldCheck className="h-4 w-4 text-amber-500" />
            Security
          </h2>
          <div className="flex items-center justify-between">
            <span className="text-sm font-normal text-slate-900">Require 2FA for admin accounts</span>
            <button
              type="button"
              onClick={() => setTwoFactorEnabled(!twoFactorEnabled)}
              className={`relative h-6 w-11 rounded-full transition-all duration-200 ${
                twoFactorEnabled ? 'bg-indigo-600' : 'bg-slate-200'
              }`}
            >
              <span
                className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow-sm transition-all duration-200 ${
                  twoFactorEnabled ? 'left-5' : 'left-0.5'
                }`}
              />
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

        <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-6 space-y-4">
          <h2 className="text-lg font-semibold text-slate-900">Audit Log</h2>
          <ul className="space-y-3">
            {mockAuditLog.map((log) => (
              <li key={log.id} className="flex items-start gap-3">
                <div className="h-2 w-2 mt-2 rounded-full bg-slate-300 flex-shrink-0" />
                <div>
                  <p className="text-sm text-slate-900 leading-relaxed">{log.action}</p>
                  <p className="text-xs text-slate-400">
                    {log.actor} · {log.time}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </DashboardLayout>
  )
}