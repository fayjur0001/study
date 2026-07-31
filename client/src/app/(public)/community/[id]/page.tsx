// src/app/(public)/community/[id]/page.tsx
import { notFound } from 'next/navigation'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import ForumReplyBox from '@/components/community/ForumReplyBox'
import { formatDate } from '@/lib/utils'
import { mockForumPosts } from '@/lib/mockData'

// No dedicated reply model exists in mockData — a small static mock list
// stands in for this post's replies.
const mockReplies = [
  {
    id: 'reply-1',
    authorName: 'Rafiul Hasan',
    content:
      "I went through something similar last intake — happy to share what worked for my application if it helps.",
    createdAt: '2026-06-18',
  },
  {
    id: 'reply-2',
    authorName: 'Anika Tabassum',
    content:
      'Following this thread, would love to hear how the visa timeline played out for others in the same situation.',
    createdAt: '2026-06-19',
  },
]

export default function CommunityPostDetailPage({ params }: { params: { id: string } }) {
  const post = mockForumPosts.find((p) => p.id === params.id)
  if (!post) notFound()

  return (
    <>
      <Navbar />

      <div className="bg-slate-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 space-y-6">
          {/* Post */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 md:p-8 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full bg-indigo-100 text-xs font-semibold text-indigo-700">
                {post.authorAvatar ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={post.authorAvatar}
                    alt={post.authorName}
                    className="h-full w-full object-cover"
                  />
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

            <h1 className="mt-5 text-2xl font-semibold tracking-tight leading-tight text-slate-900">
              {post.title}
            </h1>
            <p className="mt-3 text-base font-normal leading-relaxed text-slate-600">
              {post.content}
            </p>
          </div>

          {/* Replies */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 md:p-8 shadow-sm">
            <h2 className="text-lg font-semibold text-slate-900">
              {post.replyCount} {post.replyCount === 1 ? 'Reply' : 'Replies'}
            </h2>
            <div className="mt-5 space-y-5">
              {mockReplies.map((reply) => (
                <div
                  key={reply.id}
                  className="border-b border-slate-200 pb-5 last:border-0 last:pb-0"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-slate-900">
                      {reply.authorName}
                    </span>
                    <span className="text-xs font-normal text-slate-400">
                      {formatDate(reply.createdAt)}
                    </span>
                  </div>
                  <p className="mt-2 text-sm font-normal leading-relaxed text-slate-600">
                    {reply.content}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Reply box */}
          <ForumReplyBox />
        </div>
      </div>

      <Footer />
    </>
  )
}