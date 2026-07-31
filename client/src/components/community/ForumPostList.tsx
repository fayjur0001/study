import { MessagesSquare } from 'lucide-react'
import type { ForumPost } from '@/lib/mockData'
import ForumPostCard from '@/components/community/ForumPostCard'
import EmptyState from '@/components/common/EmptyState'

interface ForumPostListProps {
  posts: ForumPost[]
}

export default function ForumPostList({ posts }: ForumPostListProps) {
  if (posts.length === 0) {
    return (
      <EmptyState
        icon={<MessagesSquare className="h-6 w-6" />}
        title="No discussions yet"
        description="Be the first to start a conversation in this category."
      />
    )
  }

  return (
    <div className="space-y-4">
      {posts.map((post) => (
        <ForumPostCard key={post.id} post={post} />
      ))}
    </div>
  )
}