// src/app/(dashboard)/admin/users/page.tsx
'use client'

import { useState } from 'react'
import toast from 'react-hot-toast'
import { Search, Ban, CheckCircle2 } from 'lucide-react'
import DashboardLayout from '@/components/layout/DashboardLayout'
import { Input } from '@/components/ui/input'
import ConfirmDialog from '@/components/common/ConfirmDialog'
import VerifiedBadge from '@/components/agency/VerifiedBadge'
import { mockUsers, type User } from '@/lib/mockData'

const roleFilters: { value: 'all' | User['role']; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'student', label: 'Students' },
  { value: 'agency', label: 'Agencies' },
  { value: 'admin', label: 'Admins' },
]

const roleBadgeColor: Record<User['role'], string> = {
  student: 'bg-indigo-50 text-indigo-700',
  agency: 'bg-amber-50 text-amber-700',
  admin: 'bg-slate-100 text-slate-700',
}

export default function AdminUsersPage() {
  const [users, setUsers] = useState<User[]>(mockUsers)
  const [query, setQuery] = useState('')
  const [roleFilter, setRoleFilter] = useState<'all' | User['role']>('all')
  const [banTarget, setBanTarget] = useState<User | null>(null)

  const filteredUsers = users.filter((u) => {
    const matchesQuery = u.name.toLowerCase().includes(query.toLowerCase()) ||
      u.email.toLowerCase().includes(query.toLowerCase())
    const matchesRole = roleFilter === 'all' || u.role === roleFilter
    return matchesQuery && matchesRole
  })

  function handleToggleBan() {
    if (!banTarget) return
    setUsers(users.map((u) => (u.id === banTarget.id ? { ...u, isBanned: !u.isBanned } : u)))
    toast.success(banTarget.isBanned ? `${banTarget.name} unbanned` : `${banTarget.name} banned`)
    setBanTarget(null)
  }

  return (
    <DashboardLayout role="admin">
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight text-slate-900">Users</h1>
          <p className="mt-1 text-sm text-slate-500 leading-relaxed">
            Manage all student, agency, and admin accounts on the platform.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between">
          <div className="flex gap-2">
            {roleFilters.map((f) => (
              <button
                key={f.value}
                type="button"
                onClick={() => setRoleFilter(f.value)}
                className={`rounded-lg px-3 py-1.5 text-sm font-semibold transition-all duration-200 ${
                  roleFilter === f.value
                    ? 'bg-indigo-600 text-white'
                    : 'border border-slate-200 text-slate-500 hover:bg-slate-50'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
          <div className="relative sm:max-w-xs">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search users..."
              className="pl-9"
            />
          </div>
        </div>

        <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-sm">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="p-4 text-left font-medium text-slate-400">Name</th>
                <th className="p-4 text-left font-medium text-slate-400">Email</th>
                <th className="p-4 text-left font-medium text-slate-400">Role</th>
                <th className="p-4 text-left font-medium text-slate-400">Status</th>
                <th className="p-4 text-left font-medium text-slate-400">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr key={user.id} className="border-b border-slate-100 last:border-0">
                  <td className="p-4 font-semibold text-slate-900 flex items-center gap-2">
                    {user.name}
                    <VerifiedBadge isVerified={user.isVerified} />
                  </td>
                  <td className="p-4 text-slate-500">{user.email}</td>
                  <td className="p-4">
                    <span className={`rounded-full px-2.5 py-1 text-xs font-medium capitalize ${roleBadgeColor[user.role]}`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="p-4">
                    <span
                      className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                        user.isBanned ? 'bg-rose-50 text-rose-600' : 'bg-emerald-50 text-emerald-600'
                      }`}
                    >
                      {user.isBanned ? 'Banned' : 'Active'}
                    </span>
                  </td>
                  <td className="p-4">
                    <button
                      type="button"
                      onClick={() => setBanTarget(user)}
                      className={`inline-flex items-center gap-1 text-sm font-semibold ${
                        user.isBanned ? 'text-emerald-600 hover:text-emerald-700' : 'text-rose-500 hover:text-rose-600'
                      }`}
                    >
                      {user.isBanned ? <CheckCircle2 className="h-3.5 w-3.5" /> : <Ban className="h-3.5 w-3.5" />}
                      {user.isBanned ? 'Unban' : 'Ban'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <ConfirmDialog
          isOpen={banTarget !== null}
          onClose={() => setBanTarget(null)}
          onConfirm={handleToggleBan}
          title={banTarget?.isBanned ? 'Unban this user?' : 'Ban this user?'}
          description={
            banTarget?.isBanned
              ? 'This will restore their access to the platform.'
              : 'This will immediately revoke their access to the platform.'
          }
          confirmLabel={banTarget?.isBanned ? 'Unban' : 'Ban'}
          variant={banTarget?.isBanned ? 'default' : 'danger'}
        />
      </div>
    </DashboardLayout>
  )
}