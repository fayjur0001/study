'use client'

import { useState } from 'react'
import toast from 'react-hot-toast'
import { Loader2 } from 'lucide-react'
import { Input } from '@/components/ui/input'
import AcademicInfoForm, { type AcademicInfoValues } from '@/components/profile/AcademicInfoForm'
import type { StudentProfile } from '@/lib/mockData'

interface ProfileFormProps {
  profile: StudentProfile
}

export default function ProfileForm({ profile }: ProfileFormProps) {
  const [fullName, setFullName] = useState(profile.fullName)
  const [academic, setAcademic] = useState<AcademicInfoValues>({
    ssc: profile.ssc,
    hsc: profile.hsc,
    bachelorsDegree: profile.bachelorsDegree,
    cgpa: profile.cgpa,
    yearOfPassing: profile.yearOfPassing,
    major: profile.major,
  })
  const [isSaving, setIsSaving] = useState(false)

  function handleSave() {
    setIsSaving(true)
    setTimeout(() => {
      setIsSaving(false)
      toast.success('Profile updated successfully')
    }, 1000)
  }

  return (
    <div className="space-y-6">
      <div className="space-y-1.5">
        <label className="text-sm font-medium text-slate-900">Full Name</label>
        <Input value={fullName} onChange={(e) => setFullName(e.target.value)} />
      </div>

      <AcademicInfoForm values={academic} onChange={setAcademic} />

      <button
        onClick={handleSave}
        disabled={isSaving}
        className="flex items-center justify-center gap-2 rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white transition-all duration-200 hover:bg-indigo-700 active:scale-[0.98] disabled:opacity-60"
      >
        {isSaving && <Loader2 className="h-4 w-4 animate-spin" />}
        {isSaving ? 'Saving...' : 'Save Changes'}
      </button>
    </div>
  )
}