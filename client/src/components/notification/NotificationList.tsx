import { BellOff } from 'lucide-react'
import type { Notification } from '@/lib/mockData'
import NotificationItem from '@/components/notification/NotificationItem'
import EmptyState from '@/components/common/EmptyState'

interface NotificationListProps {
  notifications: Notification[]
}

export default function NotificationList({ notifications }: NotificationListProps) {
  if (notifications.length === 0) {
    return (
      <EmptyState
        icon={<BellOff className="h-6 w-6" />}
        title="No notifications"
        description="You're all caught up! New notifications will appear here."
        className="rounded-none border-0 shadow-none py-10"
      />
    )
  }

  return <div className="divide-y divide-slate-100">{notifications.map((n) => (
    <NotificationItem key={n.id} notification={n} />
  ))}</div>
}