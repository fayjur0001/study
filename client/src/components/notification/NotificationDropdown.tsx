'use client'

import Link from 'next/link'
import type { Notification } from '@/lib/mockData'
import NotificationList from '@/components/notification/NotificationList'

interface NotificationDropdownProps {
  notifications: Notification[]
  onMarkAllRead: () => void
}

export default function NotificationDropdown({
  notifications,
  onMarkAllRead,
}: NotificationDropdownProps) {
  return (
    <div className="w-80 rounded-lg border border-slate-200 bg-white shadow-lg">
      <div className="flex items-center justify-between border-b border-slate-200 p-4">
        <h3 className="text-sm font-semibold text-slate-900">Notifications</h3>
        <button
          onClick={onMarkAllRead}
          className="text-xs font-medium text-indigo-600 hover:text-indigo-700"
        >
          Mark all as read
        </button>
      </div>

      <div className="max-h-80 overflow-y-auto">
        <NotificationList notifications={notifications} />
      </div>

      <div className="border-t border-slate-200 p-3 text-center">
        <Link
          href="/student/settings"
          className="text-sm font-medium text-indigo-600 hover:text-indigo-700"
        >
          View all
        </Link>
      </div>
    </div>
  )
}