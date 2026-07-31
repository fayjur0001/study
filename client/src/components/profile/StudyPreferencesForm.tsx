'use client'

import { useState } from 'react'
import toast from 'react-hot-toast'
import { Loader2, X } from 'lucide-react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import type { StudentProfile } from '@/lib/mockData'

interface StudyPreferencesFormProps {
  profile: StudentProfile
}

export default function StudyPreferencesForm({ profile }: StudyPreferencesFormProps) {
  const [targetCountries, setTargetCountries] = useState<string[]>(profile.targetCountries)
  const [degreeLevel, setDegreeLevel] = useState(profile.targetDegreeLevel)
  const [preferredMajors, setPreferredMajors] = useState<string[]>(profile.preferredMajors)
  const [intakeSeason, setIntakeSeason] = useState(profile.intakeSeason)
  const [countryInput, setCountryInput] = useState('')
  const [majorInput, setMajorInput] = useState('')
  const [isSaving, setIsSaving] = useState(false)

  function addTag(list: string[], setList: (v: string[]) => void, value: string, clear: () => void) {
    const trimmed = value.trim()
    if (trimmed && !list.includes(trimmed)) {
      setList([...list, trimmed])
    }
    clear()
  }

  function removeTag(list: string[], setList: (v: string[]) => void, value: string) {
    setList(list.filter((item) => item !== value))
  }

  function handleSave() {
    setIsSaving(true)
    setTimeout(() => {
      setIsSaving(false)
      toast.success('Study preferences updated')
    }, 1000)
  }

  return (
    <div className="space-y-6">
      <div className="space-y-1.5">
        <label className="text-sm font-medium text-slate-900">Target Countries</label>
        <div className="flex gap-2">
          <Input
            value={countryInput}
            onChange={(e) => setCountryInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault()
                addTag(targetCountries, setTargetCountries, countryInput, () => setCountryInput(''))
              }
            }}
            placeholder="Type a country and press Enter"
          />
        </div>
        <div className="mt-2 flex flex-wrap gap-2">
          {targetCountries.map((country) => (
            <span
              key={country}
              className="flex items-center gap-1.5 rounded-full bg-indigo-50 px-2.5 py-1 text-xs font-medium text-indigo-700"
            >
              {country}
              <button onClick={() => removeTag(targetCountries, setTargetCountries, country)}>
                <X className="h-3 w-3" />
              </button>
            </span>
          ))}
        </div>
      </div>

      <div className="space-y-1.5">
        <label className="text-sm font-medium text-slate-900">Target Degree Level</label>
        <Select value={degreeLevel} onValueChange={(v) => setDegreeLevel(v as StudentProfile['targetDegreeLevel'])}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="UG">Undergraduate</SelectItem>
            <SelectItem value="PG">Postgraduate</SelectItem>
            <SelectItem value="PhD">PhD</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-1.5">
        <label className="text-sm font-medium text-slate-900">Preferred Majors</label>
        <div className="flex gap-2">
          <Input
            value={majorInput}
            onChange={(e) => setMajorInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault()
                addTag(preferredMajors, setPreferredMajors, majorInput, () => setMajorInput(''))
              }
            }}
            placeholder="Type a major and press Enter"
          />
        </div>
        <div className="mt-2 flex flex-wrap gap-2">
          {preferredMajors.map((major) => (
            <span
              key={major}
              className="flex items-center gap-1.5 rounded-full bg-indigo-50 px-2.5 py-1 text-xs font-medium text-indigo-700"
            >
              {major}
              <button onClick={() => removeTag(preferredMajors, setPreferredMajors, major)}>
                <X className="h-3 w-3" />
              </button>
            </span>
          ))}
        </div>
      </div>

      <div className="space-y-1.5">
        <label className="text-sm font-medium text-slate-900">Intake Season</label>
        <Input value={intakeSeason} onChange={(e) => setIntakeSeason(e.target.value)} placeholder="e.g. Fall 2027" />
      </div>

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