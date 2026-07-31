'use client'

import { useRef, useState } from 'react'
import { CheckCircle2, Upload } from 'lucide-react'
import toast from 'react-hot-toast'

interface DocumentUploadRowProps {
  documentName: string
  isUploaded: boolean
  documentUrl?: string
}

export default function DocumentUploadRow({
  documentName,
  isUploaded: initialUploaded,
  documentUrl,
}: DocumentUploadRowProps) {
  const [isUploaded, setIsUploaded] = useState(initialUploaded)
  const fileInputRef = useRef<HTMLInputElement>(null)

  function handleFileSelect(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files?.length) {
      setIsUploaded(true)
      toast.success(`${documentName} uploaded successfully`)
    }
  }

  return (
    <div className="flex items-center justify-between rounded-lg border border-slate-200 px-4 py-3">
      <div className="flex items-center gap-3">
        {isUploaded ? (
          <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-500" />
        ) : (
          <div className="h-4 w-4 shrink-0 rounded-full border-2 border-slate-200" />
        )}
        <span className="text-sm font-normal text-slate-900">{documentName}</span>
      </div>

      <div className="flex items-center gap-3">
        {isUploaded && documentUrl && (
          
            href={documentUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium text-indigo-600 hover:text-indigo-700"
          >
            View
          </a>
        )}

        <input
          ref={fileInputRef}
          type="file"
          className="hidden"
          onChange={handleFileSelect}
        />
        <button
          onClick={() => fileInputRef.current?.click()}
          className="flex items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-1.5 text-sm font-medium text-slate-600 transition-all duration-200 hover:bg-slate-50 active:scale-[0.98]"
        >
          <Upload className="h-3.5 w-3.5" />
          {isUploaded ? 'Re-upload' : 'Upload'}
        </button>
      </div>
    </div>
  )
}