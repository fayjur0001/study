'use client'

import { useState } from 'react'
import toast from 'react-hot-toast'
import { Textarea } from '@/components/ui/textarea'

interface ForumReplyBoxProps {
  onReply?: (content: string) => void
}

export default function ForumReplyBox({ onReply }: ForumReplyBoxProps) {
  const [content, setContent] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  function handleSubmit() {
    const trimmed = content.trim()
    if (!trimmed) {
      toast.error('Please write a reply before submitting')
      return
    }

    setIsSubmitting(true)
    setTimeout(() => {
      onReply?.(trimmed)
      setContent('')
      setIsSubmitting(false)
      toast.success('Reply posted')
    }, 800)
  }

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <h3 className="text-sm font-semibold text-slate-900">Add a Reply</h3>
      <Textarea
        rows={4}
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Share your thoughts..."
        className="mt-3"
      />
      <button
        onClick={handleSubmit}
        disabled={isSubmitting}
        className="mt-3 flex items-center justify-center gap-2 rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white transition-all duration-200 hover:bg-indigo-700 active:scale-[0.98] disabled:opacity-60"
      >
        {isSubmitting ? 'Posting...' : 'Post Reply'}
      </button>
    </div>
  )
}