'use client'

import { Dialog, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { cn } from '@/lib/utils'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  title?: string
  children: React.ReactNode
  className?: string
}

export default function Modal({ isOpen, onClose, title, children, className }: ModalProps) {
  return (
    <Dialog
      isOpen={isOpen}
      onOpenChange={(open) => !open && onClose()}
      className={cn(
        'rounded-2xl border border-slate-200 shadow-2xl p-6',
        className
      )}
    >
      {title && (
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold tracking-tight text-slate-900">
            {title}
          </DialogTitle>
        </DialogHeader>
      )}
      <div className="mt-2">{children}</div>
    </Dialog>
  )
}