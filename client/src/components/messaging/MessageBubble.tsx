import type { Message } from '@/lib/mockData'
import { cn } from '@/lib/utils'

interface MessageBubbleProps {
  message: Message
  isSent: boolean
}

export default function MessageBubble({ message, isSent }: MessageBubbleProps) {
  const time = new Date(message.createdAt).toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  })

  return (
    <div className={cn('flex', isSent ? 'justify-end' : 'justify-start')}>
      <div
        className={cn(
          'max-w-[75%] rounded-2xl px-4 py-2.5 text-sm font-normal leading-relaxed',
          isSent
            ? 'rounded-br-md bg-indigo-600 text-white'
            : 'rounded-bl-md bg-slate-100 text-slate-900'
        )}
      >
        <p>{message.content}</p>
        <span
          className={cn(
            'mt-1 block text-[11px] font-normal',
            isSent ? 'text-indigo-100' : 'text-slate-400'
          )}
        >
          {time}
        </span>
      </div>
    </div>
  )
}