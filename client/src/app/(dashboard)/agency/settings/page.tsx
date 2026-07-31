// src/app/(dashboard)/agency/settings/page.tsx
'use client'

import { useState } from 'react'
import toast from 'react-hot-toast'
import { Loader2 } from 'lucide-react'
import DashboardLayout from '@/components/layout/DashboardLayout'
import { Input } from '@/components/ui/input'

export default function AgencySettingsPage() {
  const [email, setEmail] = useState('contact@globaleduconsult.com')
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [newStudentNotifs, setNewStudentNotifs] = useState(true)
  const [messageNotifs, setMessageNotifs] = useState(true)
  const [isSaving, setIsSaving] = useState(false)

  function handleSave() {
    setIsSaving(true)
    setTimeout(() => {
      setIsSaving(false)
      toast.success('Settings saved successfully')
    }, 1200)
  }

  return (
    <DashboardLayout role="agency">
      <div className="space-y-8 max-w-2xl">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight text-slate-900">Settings</h1>
          <p className="mt-1 text-sm text-slate-500 leading-relaxed">
            Manage your account details and notification preferences.
          </p>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-6 space-y-5">
          <h2 className="text-lg font-semibold text-slate-900">Account</h2>
          <div className="space-y-1">
            <label className="text-sm font-normal text-slate-500">Email address</label>
            <Input value={email} onChange={(e) => setEmail(e.target.value)} type="email" />
          </div>
          <div className="space-y-1">
            <label className="text-sm font-normal text-slate-500">Current password</label>
            <Input
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              type="password"
            />
          </div>
          <div className="space-y-1">
            <label className="text-sm font-normal text-slate-500">New password</label>
            <Input value={newPassword} onChange={(e) => setNewPassword(e.target.value)} type="password" />
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-6 space-y-4">
          <h2 className="text-lg font-semibold text-slate-900">Notification Preferences</h2>
          {[
            { label: 'New student assigned', state: newStudentNotifs, setState: setNewStudentNotifs },
            { label: 'New messages', state: messageNotifs, setState: setMessageNotifs },
          ].map((pref) => (
            <div key={pref.label} className="flex items-center justify-between">
              <span className="text-sm font-normal text-slate-900">{pref.label}</span>
              <button
                type="button"
                onClick={() => pref.setState(!pref.state)}
                className={`relative h-6 w-11 rounded-full transition-all duration-200 ${
                  pref.state ? 'bg-indigo-600' : 'bg-slate-200'
                }`}
              >
                <span
                  className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow-sm transition-all duration-200 ${
                    pref.state ? 'left-5' : 'left-0.5'
                  }`}
                />
              </button>
            </div>
          ))}
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
    </DashboardLayout>
  )
}