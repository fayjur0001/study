// src/app/(public)/about/page.tsx
import { Target, Heart, ShieldCheck, Sparkles } from 'lucide-react'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import PageHeader from '@/components/common/PageHeader'

export default function AboutPage() {
  const values = [
    {
      icon: Target,
      title: 'Clarity over confusion',
      description:
        'Study abroad decisions involve dozens of moving parts. We organize them into one clear path.',
    },
    {
      icon: Heart,
      title: 'Student-first, always',
      description:
        'Every feature we build starts with a real question a student asked us — not a sales goal.',
    },
    {
      icon: ShieldCheck,
      title: 'Verified, trustworthy partners',
      description:
        'Agencies and institutions on StudyBridge go through an approval process before they reach you.',
    },
    {
      icon: Sparkles,
      title: 'AI that actually helps',
      description:
        'From SOP drafts to visa probability, our tools are built to save you hours, not add noise.',
    },
  ]

  return (
    <>
      <Navbar />

      <div className="bg-slate-50">
        {/* Mission */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <PageHeader
            title="About StudyBridge"
            description="We're building the clearest, most supportive path from 'I want to study abroad' to 'I got accepted.'"
          />

          <div className="mt-10 rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
            <h2 className="text-2xl font-semibold tracking-tight text-slate-900">
              Our Mission
            </h2>
            <p className="mt-4 text-base leading-relaxed text-slate-500 max-w-3xl">
              Every year, hundreds of thousands of students in Bangladesh and beyond
              dream of studying abroad — but get lost in scattered spreadsheets,
              conflicting agency advice, and application deadlines that arrive too
              fast. StudyBridge brings university research, scholarship discovery,
              document tracking, and application management into a single, guided
              experience — backed by AI tools that make the hardest parts of the
              process feel manageable.
            </p>
          </div>
        </section>

        {/* Story */}
        <section className="bg-white border-y border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
            <div className="max-w-3xl">
              <h2 className="text-2xl font-semibold tracking-tight text-slate-900">
                Our Story
              </h2>
              <p className="mt-4 text-base leading-relaxed text-slate-500">
                StudyBridge started with a simple observation: students applying
                abroad were juggling university websites, agency phone calls, WhatsApp
                groups, and paper checklists all at once — with no single place to see
                the full picture. We set out to build that place. Today, StudyBridge
                connects students with verified agencies, curated university and
                scholarship data, and AI tools that shorten the distance between
                "researching" and "accepted."
              </p>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-2xl font-semibold tracking-tight text-slate-900">
              What We Stand For
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-slate-500">
              The principles that guide every decision we make.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 gap-6">
            {values.map((value) => (
              <div
                key={value.title}
                className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600 mb-4">
                  <value.icon className="h-5 w-5" />
                </div>
                <h3 className="text-lg font-semibold text-slate-900">{value.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-500">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </section>
      </div>

      <Footer />
    </>
  )
}