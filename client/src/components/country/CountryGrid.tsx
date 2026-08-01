import { Globe2 } from 'lucide-react'
import type { Country } from '@/lib/mockData'
import CountryCard from '@/components/country/CountryCard'
import EmptyState from '@/components/common/EmptyState'

interface CountryGridProps {
  countries: Country[]
}

export default function CountryGrid({ countries }: CountryGridProps) {
  if (countries.length === 0) {
    return (
      <EmptyState
        icon={<Globe2 className="h-6 w-6" />}
        title="No countries found"
        description="Try a different region filter to explore more destinations."
      />
    )
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {countries.map((country) => (
        <CountryCard key={country.id} country={country} />
      ))}
    </div>
  )
}