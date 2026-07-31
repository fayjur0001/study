'use client'

import { useState } from 'react'
import { Star } from 'lucide-react'
import Modal from '@/components/ui/modal'

interface MockReview {
  id: string
  reviewerName: string
  rating: number
  comment: string
  date: string
}

const mockReviews: MockReview[] = [
  {
    id: 'rev-1',
    reviewerName: 'Sadia Islam',
    rating: 5,
    comment:
      'The campus facilities and faculty support exceeded my expectations. The application process guidance from the international office was excellent.',
    date: '2026-05-12',
  },
  {
    id: 'rev-2',
    reviewerName: 'Arif Chowdhury',
    rating: 4,
    comment:
      'Great academic environment and diverse student community. Housing could be more affordable for international students.',
    date: '2026-04-03',
  },
  {
    id: 'rev-3',
    reviewerName: 'Nusrat Jahan',
    rating: 4.5,
    comment: 'Strong career services and internship placement support. Highly recommend this university.',
    date: '2026-02-20',
  },
]

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={
            i < Math.round(rating)
              ? 'h-4 w-4 fill-amber-500 text-amber-500'
              : 'h-4 w-4 text-slate-200'
          }
        />
      ))}
    </div>
  )
}

export default function UniversityReviews() {
  const [isWriteReviewOpen, setIsWriteReviewOpen] = useState(false)

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold tracking-tight text-slate-900">
          Student Reviews
        </h2>
        <button
          onClick={() => setIsWriteReviewOpen(true)}
          className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-600 transition-all duration-200 hover:bg-slate-50 active:scale-[0.98]"
        >
          Write a Review
        </button>
      </div>

      <div className="mt-5 space-y-5">
        {mockReviews.map((review) => (
          <div key={review.id} className="border-b border-slate-200 pb-5 last:border-0 last:pb-0">
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-slate-900">{review.reviewerName}</span>
              <span className="text-xs font-normal text-slate-400">{review.date}</span>
            </div>
            <div className="mt-1.5">
              <StarRating rating={review.rating} />
            </div>
            <p className="mt-2 text-sm font-normal leading-relaxed text-slate-600">
              {review.comment}
            </p>
          </div>
        ))}
      </div>

      <Modal
        isOpen={isWriteReviewOpen}
        onClose={() => setIsWriteReviewOpen(false)}
        title="Write a Review"
      >
        <p className="text-sm font-normal leading-relaxed text-slate-500">
          Review submission is a placeholder in this mock build — no data is persisted yet.
        </p>
        <textarea
          rows={4}
          placeholder="Share your experience..."
          className="mt-4 w-full resize-none rounded-lg border border-slate-200 p-3 text-sm outline-none transition-all duration-200 focus:border-indigo-600 focus:ring-2 focus:ring-indigo-100"
        />
        <button
          onClick={() => setIsWriteReviewOpen(false)}
          className="mt-4 w-full rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white transition-all duration-200 hover:bg-indigo-700 active:scale-[0.98]"
        >
          Submit Review
        </button>
      </Modal>
    </div>
  )
}