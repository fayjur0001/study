import { CheckCircle2 } from 'lucide-react'
import type { Country } from '@/lib/mockData'

interface CountryDocumentChecklistProps {
  country: Country
}

export default function CountryDocumentChecklist({ country }: CountryDocumentChecklistProps) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="text-2xl font-semibold tracking-tight text-slate-900">
        Required Documents
      </h2>
      <p className="mt-2 text-sm font-normal leading-relaxed text-slate-500">
        Documents typically required for a student visa application to {country.name}.
      </p>

      <ul className="mt-5 space-y-3">
        {country.documentChecklist.map((doc) => (
          <li
            key={doc}
            className="flex items-center gap-3 rounded-lg border border-slate-200 px-4 py-3"
          >
            <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-500" />
            <span className="text-sm font-normal text-slate-900">{doc}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}