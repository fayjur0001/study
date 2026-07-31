// src/app/loading.tsx
import Loader from '@/components/ui/loader'

export default function Loading() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50">
      <Loader size="lg" />
    </div>
  )
}