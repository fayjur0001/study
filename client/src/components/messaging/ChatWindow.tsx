'use client'

import { useEffect, useRef, useState } from 'react'
import type { Message } from '@/lib/mockData'
import MessageBubble from '@/components/messaging/MessageBubble'
import ChatInput from '@/components/messaging/ChatInput'

interface ChatWindowProps {
  currentUserId: string
  messages: Message[]
  otherPartyName: string
}

export default function ChatWindow({
  currentUserId,
  messages: initialMessages,
  otherPartyName,
}: ChatWindowProps) {
  const [messages, setMessages] = useState<Message[]>(initialMessages)
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' })
  }, [messages])

  function handleSend(content: string) {
    const receiver = messages.find((m) => m.senderId !== currentUserId)

    const newMessage: Message = {
      id: `local-${Date.now()}`,
      senderId: currentUserId,
      senderName: 'You',
      receiverId: receiver?.senderId ?? '',
      content,
      createdAt: new Date().toISOString(),
      isRead: false,
    }

    setMessages((prev) => [...prev, newMessage])
  }

  return (
    <div className="flex h-full flex-col rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="border-b border-slate-200 p-4">
        <h3 className="text-base font-semibold tracking-tight text-slate-900">
          {otherPartyName}
        </h3>
      </div>

      <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto p-4">
        {messages.map((message) => (
          <MessageBubble
            key={message.id}
            message={message}
            isSent={message.senderId === currentUserId}
          />
        ))}
      </div>

      <ChatInput onSend={handleSend} />
    </div>
  )
}