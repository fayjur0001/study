import Link from 'next/link'
import { MessageCircle } from 'lucide-react'
import type { ForumPost } from '@/lib/mockData'
import { formatDate } from '@/lib/utils'

interface ForumPostCardProps {
  post: ForumPost
}

export default function ForumPostCard({ post }: ForumPostCardProps) {
  return (
    <Link
      href={`/community/${post.id}`}
      className="group block rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
    >
      <div className="flex items-center gap-3">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-full bg-indigo-100 text-xs font-semibold text-indigo-700">
          {post.authorAvatar ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={post.authorAvatar} alt={post.authorName} className="h-full w-full object-cover" />
          ) : (
            post.authorName
              .split(' ')
              .map((n) => n[0])
              .slice(0, 2)
              .join('')
          )}
        </div>
        <div>
          <p className="text-sm font-medium text-slate-900">{post.authorName}</p>
          <p className="text-xs font-normal text-slate-400">{formatDate(post.createdAt)}</p>
        </div>
        <span className="ml-auto rounded-full bg-indigo-50 px-2.5 py-1 text-xs font-medium text-indigo-700">
          {post.category}
        </span>
      </div>

      <h3 className="mt-4 text-lg font-semibold tracking-tight text-slate-900">{post.title}</h3>
      <p className="mt-1.5 line-clamp-2 text-sm font-normal leading-relaxed text-slate-500">
        {post.content}
      </p>

      <div className="mt-4 flex items-center gap-1.5 text-sm font-normal text-slate-500">
        <MessageCircle className="h-4 w-4" />
        {post.replyCount} {post.replyCount === 1 ? 'reply' : 'replies'}
      </div>
    </Link>
  )
}