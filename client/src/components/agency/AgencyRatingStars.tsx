import { Star, StarHalf } from 'lucide-react'

interface AgencyRatingStarsProps {
  rating: number
  reviewCount: number
}

export default function AgencyRatingStars({ rating, reviewCount }: AgencyRatingStarsProps) {
  const fullStars = Math.floor(rating)
  const hasHalfStar = rating - fullStars >= 0.5

  return (
    <div className="flex items-center gap-1.5">
      <div className="flex items-center gap-0.5">
        {Array.from({ length: 5 }).map((_, i) => {
          if (i < fullStars) {
            return <Star key={i} className="h-4 w-4 fill-amber-500 text-amber-500" />
          }
          if (i === fullStars && hasHalfStar) {
            return <StarHalf key={i} className="h-4 w-4 fill-amber-500 text-amber-500" />
          }
          return <Star key={i} className="h-4 w-4 text-slate-200" />
        })}
      </div>
      <span className="text-sm font-medium text-slate-900">{rating.toFixed(1)}</span>
      <span className="text-sm font-normal text-slate-400">({reviewCount} reviews)</span>
    </div>
  )
}