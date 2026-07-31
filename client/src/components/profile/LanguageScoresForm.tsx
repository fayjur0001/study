'use client'

import { useState } from 'react'
import toast from 'react-hot-toast'
import { Loader2 } from 'lucide-react'
import { Input } from '@/components/ui/input'
import type { StudentProfile } from '@/lib/mockData'

interface LanguageScoresFormProps {
  profile: StudentProfile
}

export default function LanguageScoresForm({ profile }: LanguageScoresFormProps) {
  const [ielts, setIelts] = useState(profile.ielts?.toString() ?? '')
  const [ieltsListening, setIeltsListening] = useState('')
  const [ieltsReading, setIeltsReading] = useState('')
  const [ieltsWriting, setIeltsWriting] = useState('')
  const [ieltsSpeaking, setIeltsSpeaking] = useState('')
  const [toefl, setToefl] = useState(profile.toefl?.toString() ?? '')
  const [pte, setPte] = useState(profile.pte?.toString() ?? '')
  const [duolingo, setDuolingo] = useState(profile.duolingo?.toString() ?? '')
  const [isSaving, setIsSaving] = useState(false)

  function handleSave() {
    setIsSaving(true)
    setTimeout(() => {
      setIsSaving(false)
      toast.success('Language scores updated')
    }, 1000)
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-sm font-semibold text-slate-900">IELTS</h3>
        <div className="mt-3 grid grid-cols-2 gap-4 sm:grid-cols-5">
          <div className="space-y-1.5">
            <label className="text-xs font-medium uppercase tracking-wide text-slate-400">
              Overall
            </label>
            <Input type="number" step="0.5" value={ielts} onChange={(e) => setIelts(e.target.value)} />
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-medium uppercase tracking-wide text-slate-400">
              Listening
            </label>
            <Input
              type="number"
              step="0.5"
              value={ieltsListening}
              onChange={(e) => setIeltsListening(e.target.value)}
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-medium uppercase tracking-wide text-slate-400">
              Reading
            </label>
            <Input
              type="number"
              step="0.5"
              value={ieltsReading}
              onChange={(e) => setIeltsReading(e.target.value)}
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-medium uppercase tracking-wide text-slate-400">
              Writing
            </label>
            <Input
              type="number"
              step="0.5"
              value={ieltsWriting}
              onChange={(e) => setIeltsWriting(e.target.value)}
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-medium uppercase tracking-wide text-slate-400">
              Speaking
            </label>
            <Input
              type="number"
              step="0.5"
              value={ieltsSpeaking}
              onChange={(e) => setIeltsSpeaking(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
        <div className="space-y-1.5">
          <label className="text-sm font-medium text-slate-900">TOEFL</label>
          <Input type="number" value={toefl} onChange={(e) => setToefl(e.target.value)} />
        </div>
        <div className="space-y-1.5">
          <label className="text-sm font-medium text-slate-900">PTE</label>
          <Input type="number" value={pte} onChange={(e) => setPte(e.target.value)} />
        </div>
        <div className="space-y-1.5">
          <label className="text-sm font-medium text-slate-900">Duolingo</label>
          <Input type="number" value={duolingo} onChange={(e) => setDuolingo(e.target.value)} />
        </div>
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