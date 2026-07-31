'use client'

import { useState } from 'react'
import { Menu } from 'lucide-react'
import Sidebar from '@/components/layout/Sidebar'
import MobileMenu from '@/components/layout/MobileMenu'
import NotificationBell from '@/components/notification/NotificationBell'
import Dropdown from '@/components/ui/dropdown'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { LogOut, Settings, User as UserIcon } from 'lucide-react'
import { useRouter, usePathname } from 'next/navigation'

type Role = 'student' | 'agency' | 'admin'

interface DashboardLayoutProps {
  children: React.ReactNode
  role: Role
}

const mobileLinksByRole: Record<Role, { label: string; href: string }[]> = {
  student: [
    { label: 'Overview', href: '/dashboard/student' },
    { label: 'My Profile', href: '/student/profile' },
    { label: 'Documents', href: '/student/documents' },
    { label: 'Applications', href: '/student/applications' },
    { label: 'Recommendations', href: '/student/recommendations' },
    { label: 'Saved', href: '/student/saved' },
    { label: 'AI Tools', href: '/student/ai-tools' },
    { label: 'Messages', href: '/student/messages' },
    { label: 'Settings', href: '/student/settings' },
  ],
  agency: [
    { label: 'Overview', href: '/dashboard/agency' },
    { label: 'Agency Profile', href: '/agency/profile' },
    { label: 'Students', href: '/agency/students' },
    { label: 'Services', href: '/agency/services' },
    { label: 'Messages', href: '/agency/messages' },
    { label: 'Analytics', href: '/agency/analytics' },
    { label: 'Settings', href: '/agency/settings' },
  ],
  admin: [
    { label: 'Overview', href: '/dashboard/admin' },
    { label: 'Users', href: '/admin/users' },
    { label: 'Agencies', href: '/admin/agencies' },
    { label: 'Universities', href: '/admin/universities' },
    { label: 'Scholarships', href: '/admin/scholarships' },
    { label: 'Content', href: '/admin/content' },
    { label: 'Reports', href: '/admin/reports' },
    { label: 'Analytics', href: '/admin/analytics' },
    { label: 'Settings', href: '/admin/settings' },
  ],
}

const settingsHrefByRole: Record<Role, string> = {
  student: '/student/settings',
  agency: '/agency/settings',
  admin: '/admin/settings',
}

const profileHrefByRole: Record<Role, string> = {
  student: '/student/profile',
  agency: '/agency/profile',
  admin: '/admin/settings',
}

export default function DashboardLayout({ children, role }: DashboardLayoutProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const router = useRouter()
  const pathname = usePathname()

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar role={role} />

      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        title="StudyBridge"
        links={mobileLinksByRole[role]}
        activeHref={pathname}
      />

      <div className="flex flex-1 flex-col">
        <header className="flex h-16 items-center justify-between border-b border-slate-200 bg-white px-4 sm:px-6">
          <button
            onClick={() => setIsMobileMenuOpen(true)}
            className="rounded-lg p-2 text-slate-600 transition-colors duration-150 hover:bg-slate-50 md:hidden"
            aria-label="Open menu"
          >
            <Menu className="h-5 w-5" />
          </button>

          <div className="hidden md:block" />

          <div className="flex items-center gap-3">
            <NotificationBell />

            <Dropdown
              trigger={
                <Avatar className="h-9 w-9 cursor-pointer">
                  <AvatarImage src="" alt="User avatar" />
                  <AvatarFallback className="bg-indigo-100 text-sm font-semibold text-indigo-700">
                    {role === 'student' ? 'TA' : role === 'agency' ? 'GE' : 'RK'}
                  </AvatarFallback>
                </Avatar>
              }
              items={[
                {
                  label: 'My Profile',
                  icon: <UserIcon className="h-4 w-4" />,
                  onClick: () => router.push(profileHrefByRole[role]),
                },
                {
                  label: 'Settings',
                  icon: <Settings className="h-4 w-4" />,
                  onClick: () => router.push(settingsHrefByRole[role]),
                },
                {
                  label: 'Log Out',
                  icon: <LogOut className="h-4 w-4" />,
                  danger: true,
                  onClick: () => router.push('/auth/login'),
                },
              ]}
            />
          </div>
        </header>

        <main className="flex-1 bg-slate-50 p-4 sm:p-6 lg:p-8">{children}</main>
      </div>
    </div>
  )
}