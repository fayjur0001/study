// src/app/(dashboard)/agency/messages/page.tsx
'use client'

import { useMemo, useState } from 'react'
import DashboardLayout from '@/components/layout/DashboardLayout'
import ChatList from '@/components/messaging/ChatList'
import ChatWindow from '@/components/messaging/ChatWindow'
import { mockMessages } from '@/lib/mockData'

const CURRENT_AGENCY_USER_ID = 'user-005'

export default function AgencyMessagesPage() {
  const conversationPartners = useMemo(() => {
    const partnerMap = new Map<string, { id: string; name: string; lastMessage: string; hasUnread: boolean }>()

    mockMessages.forEach((msg) => {
      const isCurrentUserSender = msg.senderId === CURRENT_AGENCY_USER_ID
      const partnerId = isCurrentUserSender ? msg.receiverId : msg.senderId
      if (partnerId === CURRENT_AGENCY_USER_ID) return

      const partnerName = isCurrentUserSender ? existingName(partnerMap, partnerId) : msg.senderName
      const hasUnread = !isCurrentUserSender && !msg.isRead

      partnerMap.set(partnerId, {
        id: partnerId,
        name: partnerName,
        lastMessage: msg.content,
        hasUnread: hasUnread || partnerMap.get(partnerId)?.hasUnread || false,
      })
    })

    function existingName(map: typeof partnerMap, id: string) {
      return map.get(id)?.name ?? id
    }

    return Array.from(partnerMap.values())
  }, [])

  const [activeId, setActiveId] = useState<string | undefined>(conversationPartners[0]?.id)

  const activeMessages = mockMessages.filter(
    (m) =>
      (m.senderId === CURRENT_AGENCY_USER_ID && m.receiverId === activeId) ||
      (m.senderId === activeId && m.receiverId === CURRENT_AGENCY_USER_ID)
  )

  const activePartner = conversationPartners.find((c) => c.id === activeId)

  return (
    <DashboardLayout role="agency">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight text-slate-900">Messages</h1>
          <p className="mt-1 text-sm text-slate-500 leading-relaxed">
            Communicate directly with the students you&apos;re assisting.
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
                currentUserId={CURRENT_AGENCY_USER_ID}
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