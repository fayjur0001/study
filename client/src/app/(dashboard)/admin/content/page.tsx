// src/app/(dashboard)/admin/content/page.tsx
'use client'

import { useState } from 'react'
import toast from 'react-hot-toast'
import { Pencil, Trash2 } from 'lucide-react'
import DashboardLayout from '@/components/layout/DashboardLayout'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { mockForumPosts } from '@/lib/mockData'

const mockBlogPosts = [
  { id: 'blog-1', title: '5 Tips for a Winning SOP', status: 'Published' },
  { id: 'blog-2', title: 'Understanding PSWP by Country', status: 'Published' },
  { id: 'blog-3', title: 'How to Choose the Right Agency', status: 'Draft' },
]

const mockFaqs = [
  { id: 'faq-1', question: 'How do I apply for a scholarship?', status: 'Published' },
  { id: 'faq-2', question: 'What documents do I need for a UK visa?', status: 'Published' },
]

export default function AdminContentPage() {
  const [blogPosts, setBlogPosts] = useState(mockBlogPosts)
  const [faqs, setFaqs] = useState(mockFaqs)
  const [forumPosts, setForumPosts] = useState(mockForumPosts)

  return (
    <DashboardLayout role="admin">
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight text-slate-900">Content</h1>
          <p className="mt-1 text-sm text-slate-500 leading-relaxed">
            Manage blog posts, FAQs, and moderate community discussions.
          </p>
        </div>

        <Tabs defaultValue="blog" className="space-y-6">
          <TabsList>
            <TabsTrigger value="blog">Blog Posts</TabsTrigger>
            <TabsTrigger value="faqs">FAQs</TabsTrigger>
            <TabsTrigger value="forum">Forum Moderation</TabsTrigger>
          </TabsList>

          <TabsContent value="blog">
            <div className="divide-y divide-slate-200 rounded-2xl border border-slate-200 bg-white shadow-sm">
              {blogPosts.map((post) => (
                <div key={post.id} className="flex items-center justify-between p-5">
                  <div>
                    <p className="text-sm font-semibold text-slate-900">{post.title}</p>
                    <span
                      className={`mt-1 inline-block rounded-full px-2 py-0.5 text-xs font-medium ${
                        post.status === 'Published'
                          ? 'bg-emerald-50 text-emerald-600'
                          : 'bg-slate-100 text-slate-500'
                      }`}
                    >
                      {post.status}
                    </span>
                  </div>
                  <div className="flex gap-3">
                    <button
                      type="button"
                      onClick={() => toast.success(`Edit "${post.title}" (mock)`)}
                      className="inline-flex items-center gap-1 text-sm font-semibold text-indigo-600 hover:text-indigo-700"
                    >
                      <Pencil className="h-3.5 w-3.5" />
                      Edit
                    </button>
                    <button
                      type="button"
                      onClick={() => setBlogPosts(blogPosts.filter((p) => p.id !== post.id))}
                      className="inline-flex items-center gap-1 text-sm font-semibold text-rose-500 hover:text-rose-600"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="faqs">
            <div className="divide-y divide-slate-200 rounded-2xl border border-slate-200 bg-white shadow-sm">
              {faqs.map((faq) => (
                <div key={faq.id} className="flex items-center justify-between p-5">
                  <p className="text-sm font-semibold text-slate-900">{faq.question}</p>
                  <div className="flex gap-3">
                    <button
                      type="button"
                      onClick={() => toast.success(`Edit FAQ (mock)`)}
                      className="inline-flex items-center gap-1 text-sm font-semibold text-indigo-600 hover:text-indigo-700"
                    >
                      <Pencil className="h-3.5 w-3.5" />
                      Edit
                    </button>
                    <button
                      type="button"
                      onClick={() => setFaqs(faqs.filter((f) => f.id !== faq.id))}
                      className="inline-flex items-center gap-1 text-sm font-semibold text-rose-500 hover:text-rose-600"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="forum">
            <div className="divide-y divide-slate-200 rounded-2xl border border-slate-200 bg-white shadow-sm">
              {forumPosts.map((post) => (
                <div key={post.id} className="flex items-center justify-between p-5">
                  <div>
                    <p className="text-sm font-semibold text-slate-900">{post.title}</p>
                    <p className="text-xs text-slate-400">
                      {post.authorName} · {post.category}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setForumPosts(forumPosts.filter((p) => p.id !== post.id))}
                    className="inline-flex items-center gap-1 text-sm font-semibold text-rose-500 hover:text-rose-600"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                    Remove
                  </button>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}