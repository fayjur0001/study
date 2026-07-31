'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard,
  User,
  FileText,
  ClipboardList,
  Sparkles,
  Bookmark,
  Wand2,
  MessageSquare,
  Settings,
  Users,
  Building2,
  GraduationCap,
  Award,
  BarChart3,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react'
import { cn } from '@/lib/utils'

type Role = 'student' | 'agency' | 'admin'

interface NavItem {
  label: string
  href: string
  icon: React.ReactNode
}

const navByRole: Record<Role, NavItem[]> = {
  student: [
    { label: 'Overview', href: '/dashboard/student', icon: <LayoutDashboard className="h-4 w-4" /> },
    { label: 'My Profile', href: '/student/profile', icon: <User className="h-4 w-4" /> },
    { label: 'Documents', href: '/student/documents', icon: <FileText className="h-4 w-4" /> },
    { label: 'Applications', href: '/student/applications', icon: <ClipboardList className="h-4 w-4" /> },
    { label: 'Recommendations', href: '/student/recommendations', icon: <Sparkles className="h-4 w-4" /> },
    { label: 'Saved', href: '/student/saved', icon: <Bookmark className="h-4 w-4" /> },
    { label: 'AI Tools', href: '/student/ai-tools', icon: <Wand2 className="h-4 w-4" /> },
    { label: 'Messages', href: '/student/messages', icon: <MessageSquare className="h-4 w-4" /> },
    { label: 'Settings', href: '/student/settings', icon: <Settings className="h-4 w-4" /> },
  ],
  agency: [
    { label: 'Overview', href: '/dashboard/agency', icon: <LayoutDashboard className="h-4 w-4" /> },
    { label: 'Agency Profile', href: '/agency/profile', icon: <Building2 className="h-4 w-4" /> },
    { label: 'Students', href: '/agency/students', icon: <Users className="h-4 w-4" /> },
    { label: 'Services', href: '/agency/services', icon: <ClipboardList className="h-4 w-4" /> },
    { label: 'Messages', href: '/agency/messages', icon: <MessageSquare className="h-4 w-4" /> },
    { label: 'Analytics', href: '/agency/analytics', icon: <BarChart3 className="h-4 w-4" /> },
    { label: 'Settings', href: '/agency/settings', icon: <Settings className="h-4 w-4" /> },
  ],
  admin: [
    { label: 'Overview', href: '/dashboard/admin', icon: <LayoutDashboard className="h-4 w-4" /> },
    { label: 'Users', href: '/admin/users', icon: <Users className="h-4 w-4" /> },
    { label: 'Agencies', href: '/admin/agencies', icon: <Building2 className="h-4 w-4" /> },
    { label: 'Universities', href: '/admin/universities', icon: <GraduationCap className="h-4 w-4" /> },
    { label: 'Scholarships', href: '/admin/scholarships', icon: <Award className="h-4 w-4" /> },
    { label: 'Content', href: '/admin/content', icon: <FileText className="h-4 w-4" /> },
    { label: 'Reports', href: '/admin/reports', icon: <ClipboardList className="h-4 w-4" /> },
    { label: 'Analytics', href: '/admin/analytics', icon: <BarChart3 className="h-4 w-4" /> },
    { label: 'Settings', href: '/admin/settings', icon: <Settings className="h-4 w-4" /> },
  ],
}

interface SidebarProps {
  role: Role
}

export default function Sidebar({ role }: SidebarProps) {
  const pathname = usePathname()
  const [isCollapsed, setIsCollapsed] = useState(false)
  const items = navByRole[role]

  return (
    <aside
      className={cn(
        'hidden shrink-0 flex-col border-r border-slate-200 bg-white transition-all duration-200 md:flex',
        isCollapsed ? 'w-20' : 'w-64'
      )}
    >
      <div className="flex h-16 items-center justify-between border-b border-slate-200 px-4">
        {!isCollapsed && (
          <span className="text-lg font-semibold tracking-tight text-indigo-600">
            StudyBridge
          </span>
        )}
        <button
          onClick={() => setIsCollapsed((prev) => !prev)}
          className="ml-auto rounded-lg p-1.5 text-slate-400 transition-colors duration-150 hover:bg-slate-50 hover:text-slate-600"
          aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {isCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </button>
      </div>

      <nav className="flex flex-1 flex-col gap-1 p-3">
        {items.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-normal transition-colors duration-150',
                isActive
                  ? 'bg-indigo-50 text-indigo-700 border-l-2 border-indigo-600'
                  : 'text-slate-600 border-l-2 border-transparent hover:bg-slate-50'
              )}
              title={isCollapsed ? item.label : undefined}
            >
              {item.icon}
              {!isCollapsed && item.label}
            </Link>
          )
        })}
      </nav>
    </aside>
  )
}