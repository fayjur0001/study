'use client'

import { useState } from 'react'
import { cn } from '@/lib/utils'

interface Conversation {
  id: string
  name: string
  avatar?: string
  lastMessage: string
  hasUnread: boolean
}

interface ChatListProps {
  conversations: Conversation[]
  onSelect: (id: string) => void
  activeId?: string
}

export default function ChatList({ conversations, onSelect, activeId }: ChatListProps) {
  const [selectedId, setSelectedId] = useState<string | undefined>(
    activeId ?? conversations[0]?.id
  )

  function handleSelect(id: string) {
    setSelectedId(id)
    onSelect(id)
  }

  return (
    <div className="flex h-full flex-col overflow-y-auto rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="border-b border-slate-200 p-4">
        <h3 className="text-base font-semibold tracking-tight text-slate-900">Messages</h3>
      </div>

      <div className="flex-1 divide-y divide-slate-100">
        {conversations.map((conversation) => (
          <button
            key={conversation.id}
            onClick={() => handleSelect(conversation.id)}
            className={cn(
              'flex w-full items-center gap-3 p-4 text-left transition-colors duration-150',
              selectedId === conversation.id ? 'bg-indigo-50' : 'hover:bg-slate-50'
            )}
          >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full bg-indigo-100 text-sm font-semibold text-indigo-700">
              {conversation.avatar ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={conversation.avatar} alt={conversation.name} className="h-full w-full object-cover" />
              ) : (
                conversation.name
                  .split(' ')
                  .map((n) => n[0])
                  .slice(0, 2)
                  .join('')
              )}
            </div>

            <div className="min-w-0 flex-1">
              <div className="flex items-center justify-between">
                <span
                  className={cn(
                    'text-sm truncate',
                    selectedId === conversation.id
                      ? 'font-semibold text-indigo-700'
                      : 'font-medium text-slate-900'
                  )}
                >
                  {conversation.name}
                </span>
                {conversation.hasUnread && (
                  <span className="h-2 w-2 shrink-0 rounded-full bg-indigo-600" />
                )}
              </div>
              <p className="truncate text-sm font-normal text-slate-500">
                {conversation.lastMessage}
              </p>
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}