'use client'

import { useState } from 'react'
import toast from 'react-hot-toast'
import { FileCheck2, Upload } from 'lucide-react'
import Loader from '@/components/ui/loader'

const MOCK_SUGGESTIONS = [
  'Quantify your achievements with specific metrics (e.g., "improved processing speed by 30%").',
  'Add a dedicated skills section highlighting relevant technical and language proficiencies.',
  'Keep formatting consistent — align dates and headings for a cleaner, more scannable layout.',
]

export default function CVReviewerCard() {
  const [fileName, setFileName] = useState<string | null>(null)
  const [isReviewing, setIsReviewing] = useState(false)
  const [result, setResult] = useState<{ score: number; suggestions: string[] } | null>(null)

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files?.[0]) {
      setFileName(e.target.files[0].name)
      setResult(null)
    }
  }

  function handleReview() {
    if (!fileName) {
      toast.error('Please upload your CV first')
      return
    }
    setIsReviewing(true)
    setTimeout(() => {
      setResult({ score: 78, suggestions: MOCK_SUGGESTIONS })
      setIsReviewing(false)
      toast.success('CV review complete')
    }, 1800)
  }

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex items-center gap-2">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600">
          <FileCheck2 className="h-4 w-4" />
        </div>
        <h3 className="text-lg font-semibold tracking-tight text-slate-900">CV Reviewer</h3>
      </div>
      <p className="mt-2 text-sm font-normal leading-relaxed text-slate-500">
        Upload your CV to get an instant score and improvement suggestions.
      </p>

      <label className="mt-5 flex cursor-pointer flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed border-slate-200 px-6 py-8 text-center transition-colors duration-150 hover:border-indigo-300 hover:bg-indigo-50/30">
        <Upload className="h-6 w-6 text-slate-400" />
        <span className="text-sm font-medium text-slate-600">
          {fileName ?? 'Click to upload your CV (PDF or DOCX)'}
        </span>
        <input type="file" className="hidden" onChange={handleFileChange} accept=".pdf,.doc,.docx" />
      </label>

      <button
        onClick={handleReview}
        disabled={isReviewing}
        className="mt-5 flex items-center justify-center gap-2 rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white transition-all duration-200 hover:bg-indigo-700 active:scale-[0.98] disabled:opacity-60"
      >
        {isReviewing ? 'Reviewing...' : 'Review My CV'}
      </button>

      {isReviewing && (
        <div className="mt-6 flex flex-col items-center justify-center gap-3 py-8">
          <Loader size="md" />
          <p className="text-sm font-normal text-slate-500">Analyzing your CV...</p>
        </div>
      )}

      {!isReviewing && result && (
        <div className="mt-6 rounded-lg border border-slate-200 p-4">
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-semibold tracking-tight text-slate-900">
              {result.score}
            </span>
            <span className="text-sm font-normal text-slate-500">/ 100</span>
          </div>
          <ul className="mt-4 space-y-2">
            {result.suggestions.map((suggestion, i) => (
              <li key={i} className="flex gap-2 text-sm font-normal leading-relaxed text-slate-600">
                <span className="text-indigo-600">•</span>
                {suggestion}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}