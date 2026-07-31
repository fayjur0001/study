'use client'

import Modal from '@/components/ui/modal'
import { cn } from '@/lib/utils'

interface ConfirmDialogProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  title: string
  description: string
  confirmLabel?: string
  variant?: 'default' | 'danger'
}

export default function ConfirmDialog({
  isOpen,
  onClose,
  onConfirm,
  title,
  description,
  confirmLabel = 'Confirm',
  variant = 'default',
}: ConfirmDialogProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title}>
      <p className="text-sm font-normal leading-relaxed text-slate-500">{description}</p>

      <div className="mt-6 flex justify-end gap-3">
        <button
          onClick={onClose}
          className="inline-flex items-center justify-center rounded-lg border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-600 transition-all duration-200 hover:bg-slate-50 active:scale-[0.98]"
        >
          Cancel
        </button>
        <button
          onClick={() => {
            onConfirm()
            onClose()
          }}
          className={cn(
            'inline-flex items-center justify-center rounded-lg px-4 py-2.5 text-sm font-semibold text-white transition-all duration-200 active:scale-[0.98]',
            variant === 'danger'
              ? 'bg-rose-500 hover:bg-rose-600'
              : 'bg-indigo-600 hover:bg-indigo-700'
          )}
        >
          {confirmLabel}
        </button>
      </div>
    </Modal>
  )
}