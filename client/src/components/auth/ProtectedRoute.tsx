// src/components/auth/ProtectedRoute.tsx
'use client'

interface ProtectedRouteProps {
  children: React.ReactNode
  allowedRole: 'student' | 'agency' | 'admin'
}

export default function ProtectedRoute({ children, allowedRole }: ProtectedRouteProps) {
  // MOCK ONLY: in a real implementation, this would check the authenticated
  // user's session/role (e.g. via a context or middleware) and redirect to
  // /auth/login if unauthenticated, or show a 403 state if the user's role
  // does not match `allowedRole`. For this mock build we simply render children.
  return <>{children}</>
}