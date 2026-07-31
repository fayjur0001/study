// src/app/(public)/page.tsx
import Link from 'next/link'
import { GraduationCap, Globe2, Users, TrendingUp, Search, FileCheck, Send } from 'lucide-react'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import SearchBar from '@/components/university/SearchBar'
import UniversityGrid from '@/components/university/UniversityGrid'
import ScholarshipGrid from '@/components/scholarship/ScholarshipGrid'
import StatCard from '@/components/common/StatCard'
import {
  mockUniversities,
  mockScholarships,
  mockCountries,
} from '@/lib/mockData'

export default function HomePage() {
  const featuredUniversities = mockUniversities.slice(0, 3)
  const featuredScholarships = mockScholarships.slice(0, 3)

  const stats = [
    {
      icon: GraduationCap,
      label: 'Universities Listed',
      value: `${mockUniversities.length}+`,
    },
    {
      icon: Globe2,
      label: 'Countries Covered',
      value: `${mockCountries.length}`,
    },
    {
      icon: Users,
      label: 'Students Helped',
      value: '12,400+',
    },
    {
      icon: TrendingUp,
      label: 'Visa Success Rate',
      value: '94%',
    },
  ]

  const steps = [
    {
      icon: Search,
      title: 'Discover your match',
      description:
        'Tell us your academic profile and goals — our AI recommends universities and scholarships suited to you.',
    },
    {
      icon: FileCheck,
      title: 'Prepare with confidence',
      description:
        'Generate SOPs, get CV feedback, and track every required document in one organized vault.',
    },
    {
      icon: Send,
      title: 'Apply and get accepted',
      description:
        'Submit applications, track each stage in real time, and get support from verified agencies.',
    },
  ]

  return (
    <>
      <Navbar />

      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-indigo-600 to-indigo-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
          <div className="max-w-3xl">
            <p className="text-xs font-medium tracking-wide uppercase text-indigo-200 mb-4">
              AI-Powered Study Abroad Platform
            </p>
            <h1 className="text-4xl md:text-5xl font-semibold tracking-tight leading-[1.1] text-white">
              Your path to studying abroad, mapped out clearly.
            </h1>
            <p className="mt-6 text-base leading-relaxed text-indigo-100 max-w-xl">
              StudyBridge matches you with the right universities, scholarships, and
              agencies — then helps you get accepted with AI-powered tools built for
              every stage of your application.
            </p>
            <div className="mt-8 max-w-xl">
              <SearchBar
                placeholder="Search universities, countries, or programs..."
              />
            </div>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/auth/register"
                className="inline-flex items-center rounded-lg bg-white px-5 py-2.5 text-sm font-semibold text-indigo-700 transition-all duration-200 ease-out hover:bg-indigo-50 active:scale-[0.98]"
              >
                Get Started Free
              </Link>
              <Link
                href="/universities"
                className="inline-flex items-center rounded-lg border border-indigo-300/50 px-5 py-2.5 text-sm font-semibold text-white transition-all duration-200 ease-out hover:bg-white/10 active:scale-[0.98]"
              >
                Browse Universities
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats strip */}
      <section className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat) => (
              <StatCard
                key={stat.label}
                icon={stat.icon}
                label={stat.label}
                value={stat.value}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Featured universities */}
      <section className="bg-slate-50 py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-8">
            <div>
              <h2 className="text-2xl font-semibold tracking-tight text-slate-900">
                Featured Universities
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-slate-500">
                Hand-picked institutions with strong outcomes for international students.
              </p>
            </div>
            <Link
              href="/universities"
              className="hidden sm:inline-flex text-sm font-semibold text-indigo-600 hover:text-indigo-700"
            >
              View all universities →
            </Link>
          </div>
          <UniversityGrid universities={featuredUniversities} />
        </div>
      </section>

      {/* Featured scholarships */}
      <section className="bg-white py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-8">
            <div>
              <h2 className="text-2xl font-semibold tracking-tight text-slate-900">
                Scholarships Worth Exploring
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-slate-500">
                Funding opportunities across our partner countries and universities.
              </p>
            </div>
            <Link
              href="/scholarships"
              className="hidden sm:inline-flex text-sm font-semibold text-indigo-600 hover:text-indigo-700"
            >
              View all scholarships →
            </Link>
          </div>
          <ScholarshipGrid scholarships={featuredScholarships} />
        </div>
      </section>

      {/* How it works */}
      <section className="bg-slate-50 py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-2xl font-semibold tracking-tight text-slate-900">
              How StudyBridge Works
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-slate-500">
              Three steps from exploring options to holding your acceptance letter.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {steps.map((step, index) => (
              <div
                key={step.title}
                className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600">
                    <step.icon className="h-5 w-5" />
                  </div>
                  <span className="text-xs font-medium tracking-wide uppercase text-slate-400">
                    Step {index + 1}
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-slate-900">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-500">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-br from-indigo-600 to-indigo-800 py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-white">
            Ready to find your best-fit university?
          </h2>
          <p className="mt-3 text-base leading-relaxed text-indigo-100 max-w-xl mx-auto">
            Join thousands of students who planned their study abroad journey with
            StudyBridge.
          </p>
          <div className="mt-8">
            <Link
              href="/auth/register"
              className="inline-flex items-center rounded-lg bg-white px-6 py-3 text-sm font-semibold text-indigo-700 transition-all duration-200 ease-out hover:bg-indigo-50 active:scale-[0.98]"
            >
              Create Your Free Account
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}