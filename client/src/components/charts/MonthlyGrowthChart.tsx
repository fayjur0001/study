'use client'

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'
import { THEME } from '@/lib/theme'
import { formatPercent } from '@/lib/utils'

interface GrowthPoint {
  month: string
  growth: number
}

interface MonthlyGrowthChartProps {
  data: GrowthPoint[]
}

export default function MonthlyGrowthChart({ data }: MonthlyGrowthChartProps) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <h3 className="text-lg font-semibold tracking-tight text-slate-900">
        Monthly Growth
      </h3>
      <p className="mt-1 text-sm font-normal text-slate-500">
        User and application growth rate month over month
      </p>

      <div className="mt-6 h-72 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 5, right: 10, left: -10, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
            <XAxis
              dataKey="month"
              tick={{ fontSize: 12, fill: '#64748b' }}
              axisLine={{ stroke: '#e2e8f0' }}
              tickLine={false}
            />
            <YAxis
              tick={{ fontSize: 12, fill: '#64748b' }}
              axisLine={false}
              tickLine={false}
              tickFormatter={(value) => formatPercent(value)}
            />
            <Tooltip
              formatter={(value: number) => formatPercent(value)}
              contentStyle={{
                borderRadius: '0.5rem',
                border: '1px solid #e2e8f0',
                fontSize: '0.875rem',
              }}
            />
            <Bar dataKey="growth" fill={THEME.accent} radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}