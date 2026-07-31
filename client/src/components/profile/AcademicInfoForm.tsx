'use client'

import { Input } from '@/components/ui/input'
import type { StudentProfile } from '@/lib/mockData'

export interface AcademicInfoValues {
  ssc: string
  hsc: string
  bachelorsDegree?: string
  cgpa: number
  yearOfPassing: number
  major: string
}

interface AcademicInfoFormProps {
  values: AcademicInfoValues
  onChange: (values: AcademicInfoValues) => void
}

export default function AcademicInfoForm({ values, onChange }: AcademicInfoFormProps) {
  function update<K extends keyof AcademicInfoValues>(key: K, value: AcademicInfoValues[K]) {
    onChange({ ...values, [key]: value })
  }

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div className="space-y-1.5">
          <label className="text-sm font-medium text-slate-900">SSC</label>
          <Input
            value={values.ssc}
            onChange={(e) => update('ssc', e.target.value)}
            placeholder="e.g. GPA 5.00"
          />
        </div>
        <div className="space-y-1.5">
          <label className="text-sm font-medium text-slate-900">HSC</label>
          <Input
            value={values.hsc}
            onChange={(e) => update('hsc', e.target.value)}
            placeholder="e.g. GPA 5.00"
          />
        </div>
      </div>

      <div className="space-y-1.5">
        <label className="text-sm font-medium text-slate-900">Bachelor's Degree (optional)</label>
        <Input
          value={values.bachelorsDegree ?? ''}
          onChange={(e) => update('bachelorsDegree', e.target.value)}
          placeholder="e.g. BSc in Computer Science"
        />
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
        <div className="space-y-1.5">
          <label className="text-sm font-medium text-slate-900">CGPA</label>
          <Input
            type="number"
            step="0.01"
            value={values.cgpa}
            onChange={(e) => update('cgpa', Number(e.target.value))}
          />
        </div>
        <div className="space-y-1.5">
          <label className="text-sm font-medium text-slate-900">Year of Passing</label>
          <Input
            type="number"
            value={values.yearOfPassing}
            onChange={(e) => update('yearOfPassing', Number(e.target.value))}
          />
        </div>
        <div className="space-y-1.5">
          <label className="text-sm font-medium text-slate-900">Major</label>
          <Input
            value={values.major}
            onChange={(e) => update('major', e.target.value)}
            placeholder="e.g. Computer Science"
          />
        </div>
      </div>
    </div>
  )
}