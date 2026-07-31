'use client'

import { useState } from 'react'
import toast from 'react-hot-toast'
import { Copy, RefreshCw, Sparkles } from 'lucide-react'
import { Textarea } from '@/components/ui/textarea'
import { Input } from '@/components/ui/input'
import Loader from '@/components/ui/loader'

const MOCK_SOP = `From an early age, my curiosity about how technology shapes global problem-solving led me to pursue Computer Science. Through academic projects and internships, I developed a strong foundation in software engineering while discovering my passion for applying data-driven solutions to real-world challenges. Pursuing a Master's degree abroad represents the next step in my journey — one that will expose me to cutting-edge research, diverse perspectives, and a rigorous academic environment that will sharpen both my technical expertise and my ability to lead impactful projects. I am particularly drawn to programs that emphasize practical, industry-aligned learning, as I believe the intersection of theory and application is where meaningful innovation happens. Beyond academics, I am eager to immerse myself in a multicultural community, building a global network that will support my long-term goal of contributing to technology-driven development back home.`

export default function SOPGeneratorCard() {
  const [targetProgram, setTargetProgram] = useState('')
  const [achievements, setAchievements] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedSOP, setGeneratedSOP] = useState('')

  function handleGenerate() {
    setIsGenerating(true)
    setTimeout(() => {
      setGeneratedSOP(MOCK_SOP)
      setIsGenerating(false)
      toast.success('SOP draft generated')
    }, 1800)
  }

  function handleCopy() {
    navigator.clipboard.writeText(generatedSOP)
    toast.success('Copied to clipboard')
  }

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex items-center gap-2">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600">
          <Sparkles className="h-4 w-4" />
        </div>
        <h3 className="text-lg font-semibold tracking-tight text-slate-900">SOP Generator</h3>
      </div>
      <p className="mt-2 text-sm font-normal leading-relaxed text-slate-500">
        Generate a personalized Statement of Purpose draft based on your target program and key achievements.
      </p>

      <div className="mt-5 space-y-4">
        <div className="space-y-1.5">
          <label className="text-sm font-medium text-slate-900">Target Program</label>
          <Input
            value={targetProgram}
            onChange={(e) => setTargetProgram(e.target.value)}
            placeholder="e.g. MSc Computer Science, University of Toronto"
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-sm font-medium text-slate-900">Key Achievements</label>
          <Textarea
            rows={4}
            value={achievements}
            onChange={(e) => setAchievements(e.target.value)}
            placeholder="List your academic and professional achievements..."
          />
        </div>

        <button
          onClick={handleGenerate}
          disabled={isGenerating}
          className="flex items-center justify-center gap-2 rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white transition-all duration-200 hover:bg-indigo-700 active:scale-[0.98] disabled:opacity-60"
        >
          {isGenerating ? 'Generating...' : 'Generate SOP'}
        </button>
      </div>

      {isGenerating && (
        <div className="mt-6 flex flex-col items-center justify-center gap-3 py-8">
          <Loader size="md" />
          <p className="text-sm font-normal text-slate-500">Drafting your statement...</p>
        </div>
      )}

      {!isGenerating && generatedSOP && (
        <div className="mt-6">
          <Textarea readOnly rows={8} value={generatedSOP} className="resize-none bg-slate-50" />
          <div className="mt-3 flex gap-3">
            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-600 transition-all duration-200 hover:bg-slate-50 active:scale-[0.98]"
            >
              <Copy className="h-3.5 w-3.5" />
              Copy
            </button>
            <button
              onClick={handleGenerate}
              className="flex items-center gap-1.5 rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-600 transition-all duration-200 hover:bg-slate-50 active:scale-[0.98]"
            >
              <RefreshCw className="h-3.5 w-3.5" />
              Regenerate
            </button>
          </div>
        </div>
      )}
    </div>
  )
}