import { Bell, Calendar, MessageSquare, Settings2 } from 'lucide-react'
import type { Notification } from '@/lib/mockData'
import { formatDate } from '@/lib/utils'
import { cn } from '@/lib/utils'

interface NotificationItemProps {
  notification: Notification
}

const iconMap: Record<Notification['type'], React.ElementType> = {
  application: Bell,
  deadline: Calendar,
  message: MessageSquare,
  system: Settings2,
}

export default function NotificationItem({ notification }: NotificationItemProps) {
  const Icon = iconMap[notification.type]

  return (
    <div
      className={cn(
        'flex gap-3 border-l-2 px-4 py-3 transition-colors duration-150',
        !notification.isRead ? 'border-indigo-600 bg-indigo-50/40' : 'border-transparent'
      )}
    >
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600">
        <Icon className="h-4 w-4" />
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex items-center justify-between gap-2">
          <p className="text-sm font-medium text-slate-900">{notification.title}</p>
          {!notification.isRead && <span className="h-2 w-2 shrink-0 rounded-full bg-indigo-600" />}
        </div>
        <p className="mt-0.5 text-sm font-normal leading-relaxed text-slate-500">
          {notification.message}
        </p>
        <p className="mt-1 text-xs font-normal text-slate-400">
          {formatDate(notification.createdAt)}
        </p>
      </div>
    </div>
  )
}