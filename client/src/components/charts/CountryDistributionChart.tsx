'use client'

import { PieChart, Pie, Cell, Legend, Tooltip, ResponsiveContainer } from 'recharts'
import { THEME } from '@/lib/theme'

interface DistributionSlice {
  countryName: string
  count: number
}

interface CountryDistributionChartProps {
  data: DistributionSlice[]
}

const COLORS = [
  THEME.primary,
  THEME.accent,
  '#34d399', // emerald-400
  '#38bdf8', // sky-400
  '#a78bfa', // violet-400
  '#fb7185', // rose-400
]

export default function CountryDistributionChart({ data }: CountryDistributionChartProps) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <h3 className="text-lg font-semibold tracking-tight text-slate-900">
        Applications by Country
      </h3>
      <p className="mt-1 text-sm font-normal text-slate-500">
        Distribution of target countries across applications
      </p>

      <div className="mt-6 h-72 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="count"
              nameKey="countryName"
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={90}
              paddingAngle={2}
            >
              {data.map((_, index) => (
                <Cell key={index} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                borderRadius: '0.5rem',
                border: '1px solid #e2e8f0',
                fontSize: '0.875rem',
              }}
            />
            <Legend
              iconType="circle"
              wrapperStyle={{ fontSize: '0.75rem', color: '#64748b' }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}