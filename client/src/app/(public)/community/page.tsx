'use client'

// src/app/(public)/community/page.tsx
import { useMemo, useState } from 'react'
import { PlusCircle } from 'lucide-react'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import PageHeader from '@/components/common/PageHeader'
import ForumCategoryFilter from '@/components/community/ForumCategoryFilter'
import ForumPostList from '@/components/community/ForumPostList'
import { mockForumPosts } from '@/lib/mockData'

export default function CommunityPage() {
  const [activeCategory, setActiveCategory] = useState('All')

  const filteredPosts = useMemo(() => {
    if (activeCategory === 'All') return mockForumPosts
    return mockForumPosts.filter((post) => post.category === activeCategory)
  }, [activeCategory])

  return (
    <>
      <Navbar />

      <div className="bg-slate-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <PageHeader title="Community" description="Ask questions and share experiences with fellow students.">
            <button className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white transition-all duration-200 ease-out hover:bg-indigo-700 active:scale-[0.98]">
              <PlusCircle className="h-4 w-4" />
              New Post
            </button>
          </PageHeader>

          <div className="mt-8">
            <ForumCategoryFilter onChange={setActiveCategory} />
          </div>

          <div className="mt-8">
            <ForumPostList posts={filteredPosts} />
          </div>
        </div>
      </div>

      <Footer />
    </>
  )
}