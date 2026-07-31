// src/app/(dashboard)/student/messages/page.tsx
'use client'

import { useMemo, useState } from 'react'
import DashboardLayout from '@/components/layout/DashboardLayout'
import ChatList from '@/components/messaging/ChatList'
import ChatWindow from '@/components/messaging/ChatWindow'
import { mockMessages } from '@/lib/mockData'

const CURRENT_STUDENT_ID = 'user-002'

export default function StudentMessagesPage() {
  const conversationPartners = useMemo(() => {
    const partnerMap = new Map<string, { id: string; name: string; lastMessage: string; hasUnread: boolean }>()

    mockMessages.forEach((msg) => {
      const isCurrentUserSender = msg.senderId === CURRENT_STUDENT_ID
      const partnerId = isCurrentUserSender ? msg.receiverId : msg.senderId
      const partnerName = isCurrentUserSender ? msg.receiverId : msg.senderName

      if (partnerId === CURRENT_STUDENT_ID) return

      const existing = partnerMap.get(partnerId)
      const hasUnread = !isCurrentUserSender && !msg.isRead

      if (!existing || new Date(msg.createdAt) > new Date(existing.lastMessage ? msg.createdAt : 0)) {
        partnerMap.set(partnerId, {
          id: partnerId,
          name: isCurrentUserSender ? existing?.name ?? partnerName : msg.senderName,
          lastMessage: msg.content,
          hasUnread: hasUnread || existing?.hasUnread || false,
        })
      }
    })

    return Array.from(partnerMap.values())
  }, [])

  const [activeId, setActiveId] = useState<string | undefined>(conversationPartners[0]?.id)

  const activeMessages = mockMessages.filter(
    (m) =>
      (m.senderId === CURRENT_STUDENT_ID && m.receiverId === activeId) ||
      (m.senderId === activeId && m.receiverId === CURRENT_STUDENT_ID)
  )

  const activePartner = conversationPartners.find((c) => c.id === activeId)

  return (
    <DashboardLayout role="student">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight text-slate-900">Messages</h1>
          <p className="mt-1 text-sm text-slate-500 leading-relaxed">
            Chat directly with your consulting agency.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-[600px]">
          <div className="md:col-span-1 bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
            <ChatList
              conversations={conversationPartners}
              onSelect={setActiveId}
              activeId={activeId}
            />
          </div>
          <div className="md:col-span-2 bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
            {activePartner ? (
              <ChatWindow
                currentUserId={CURRENT_STUDENT_ID}
                messages={activeMessages}
                otherPartyName={activePartner.name}
              />
            ) : (
              <div className="h-full flex items-center justify-center text-sm text-slate-400">
                No conversations yet.
              </div>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}