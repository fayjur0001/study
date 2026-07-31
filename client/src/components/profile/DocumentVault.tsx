'use client'

import { useRef, useState } from 'react'
import toast from 'react-hot-toast'
import { CheckCircle2, FileText, Upload } from 'lucide-react'
import type { Document } from '@/lib/mockData'

interface DocumentVaultProps {
  documents: Document[]
}

const typeLabels: Record<Document['type'], string> = {
  passport: 'Passport',
  transcript: 'Academic Transcript',
  certificate: 'Certificate',
  test_score: 'Test Score Report',
  cv: 'CV / Resume',
  sop: 'Statement of Purpose',
  lor: 'Letter of Recommendation',
}

const typeOrder: Document['type'][] = [
  'passport',
  'transcript',
  'certificate',
  'test_score',
  'cv',
  'sop',
  'lor',
]

export default function DocumentVault({ documents }: DocumentVaultProps) {
  const [uploadedTypes, setUploadedTypes] = useState<Set<Document['type']>>(
    new Set(documents.filter((d) => d.verified).map((d) => d.type))
  )
  const fileInputRefs = useRef<Record<string, HTMLInputElement | null>>({})

  function handleUpload(type: Document['type']) {
    setUploadedTypes((prev) => new Set(prev).add(type))
    toast.success(`${typeLabels[type]} uploaded successfully`)
  }

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="text-2xl font-semibold tracking-tight text-slate-900">Document Vault</h2>
      <p className="mt-1 text-sm font-normal text-slate-500">
        Upload and manage the documents needed for your applications.
      </p>

      <div className="mt-5 space-y-3">
        {typeOrder.map((type) => {
          const doc = documents.find((d) => d.type === type)
          const isUploaded = uploadedTypes.has(type)

          return (
            <div
              key={type}
              className="flex items-center justify-between rounded-lg border border-slate-200 px-4 py-3"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600">
                  <FileText className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-900">{typeLabels[type]}</p>
                  {doc && (
                    <p className="text-xs font-normal text-slate-400">{doc.fileName}</p>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-3">
                {isUploaded && (
                  <span className="flex items-center gap-1 text-xs font-medium text-emerald-600">
                    <CheckCircle2 className="h-3.5 w-3.5" />
                    Verified
                  </span>
                )}
                <input
                  ref={(el) => {
                    fileInputRefs.current[type] = el
                  }}
                  type="file"
                  className="hidden"
                  onChange={() => handleUpload(type)}
                />
                <button
                  onClick={() => fileInputRefs.current[type]?.click()}
                  className="flex items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-1.5 text-sm font-medium text-slate-600 transition-all duration-200 hover:bg-slate-50 active:scale-[0.98]"
                >
                  <Upload className="h-3.5 w-3.5" />
                  {isUploaded ? 'Re-upload' : 'Upload'}
                </button>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}