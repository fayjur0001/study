// src/app/(public)/page.tsx
import Link from 'next/link'
import {
  BadgeCheck,
  TrendingUp,
  GraduationCap,
  Briefcase,
  Landmark,
  CheckCircle2,
  ArrowRight,
  Star,
  LineChart,
} from 'lucide-react'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import { mockUniversities, mockCountries } from '@/lib/mockData'

export default function HomePage() {
  const heroUniversity = mockUniversities[0]

  return (
    <>
      <Navbar />

      {/* Hero */}
      <section className="relative overflow-hidden bg-white py-10 md:py-16">
        <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-16 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <div className="max-w-2xl">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-[#0d3286]/10 px-3 py-1 text-[#0d3286]">
              <BadgeCheck className="h-3.5 w-3.5" />
              <span className="text-xs font-medium">
                Trusted by {mockCountries.length * 60}+ Global Universities
              </span>
            </div>

            <h1 className="text-3xl font-semibold leading-tight tracking-tight text-[#0d3286] md:text-5xl">
              Maximize Your Chances of Global Academic Success.
            </h1>

            <p className="mt-4 text-base leading-relaxed text-slate-500 md:mt-6">
              The all-in-one platform connecting ambitious students with world-class
              universities using our proprietary <b>MatchScore™</b> technology.
            </p>

            <div className="mt-6 flex flex-wrap gap-3 md:mt-8">
              <Link
                href="/universities"
                className="inline-flex items-center rounded-lg bg-[#0d3286] px-6 py-3 text-base font-bold text-white shadow-md transition-transform duration-200 hover:scale-[1.02]"
              >
                Find Your Match
              </Link>
              <Link
                href="/countries"
                className="inline-flex items-center rounded-lg border border-slate-200 bg-white px-6 py-3 text-base font-bold text-[#0d3286] transition-colors duration-200 hover:bg-slate-50"
              >
                Explore Programs
              </Link>
            </div>

            {/* Floating match card */}
            <div className="mt-8 max-w-sm rounded-xl border border-slate-200/60 bg-white p-4 shadow-lg">
              <div className="mb-2 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded bg-slate-100">
                    <GraduationCap className="h-4 w-4 text-[#0d3286]" />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-slate-900">
                      {heroUniversity.name}
                    </div>
                    <div className="text-[10px] text-slate-400">
                      {heroUniversity.programs[0]}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-[#0d3286]">98%</div>
                  <div className="text-[8px] font-bold uppercase tracking-wider text-slate-400">
                    MatchScore
                  </div>
                </div>
              </div>
              <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-100">
                <div className="h-full w-[98%] rounded-full bg-[#0d3286]" />
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="relative aspect-[4/3] overflow-hidden rounded-[32px] border border-white/50 shadow-xl">
              <img
                alt={`${heroUniversity.name} campus`}
                className="h-full w-full object-cover"
                src={heroUniversity.campusImages[0]}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0d3286]/40 to-transparent" />
            </div>

            <div className="absolute -bottom-6 -left-6 flex items-center gap-4 rounded-2xl border border-slate-200/60 bg-white p-6 shadow-lg">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#3156c4]/10 text-[#3156c4]">
                <TrendingUp className="h-6 w-6" />
              </div>
              <div>
                <div className="text-2xl font-bold text-[#0d3286]">3x Higher</div>
                <div className="text-xs text-slate-400">Admission Probability</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Social proof ribbon */}
      <section className="border-y border-slate-200/60 bg-white py-8">
        <div className="px-4 text-center sm:px-6 lg:px-8">
          <p className="mb-10 text-xs font-medium uppercase tracking-[0.2em] text-slate-400">
            Trusted by Global Institutions
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-16 gap-y-10 opacity-60 grayscale transition-all duration-500 hover:opacity-100 hover:grayscale-0">
            {['Oxford Elite', 'Ivy Connect', 'Global Scholar', 'Stanford Reach'].map(
              (name) => (
                <div
                  key={name}
                  className="flex items-center gap-2 text-xl font-bold text-[#0d3286]"
                >
                  <GraduationCap className="h-6 w-6" /> {name.toUpperCase()}
                </div>
              )
            )}
          </div>
        </div>
      </section>

      {/* Feature pillar cards */}
      <section className="bg-slate-50 py-12 md:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-16 text-center">
            <h2 className="text-2xl font-semibold tracking-tight text-[#0d3286] md:text-3xl">
              Tailored Solutions for the Academic Ecosystem
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-slate-500">
              Modern infrastructure designed for students, recruitment partners, and
              higher-ed institutions.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <div className="flex flex-col rounded-2xl border border-slate-200/60 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg">
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-[#0d3286]/5 text-[#0d3286]">
                <GraduationCap className="h-6 w-6" />
              </div>
              <h3 className="mb-2 text-lg font-semibold text-[#0d3286]">
                For Students
              </h3>
              <p className="mb-4 flex-grow leading-relaxed text-slate-500">
                Discover programs that align with your background and goals using our
                MatchScore system.
              </p>
              <ul className="mb-6 space-y-2">
                <li className="flex items-center gap-2 text-sm text-slate-500">
                  <CheckCircle2 className="h-3.5 w-3.5 text-[#0d3286]" /> Application
                  Tracking
                </li>
                <li className="flex items-center gap-2 text-sm text-slate-500">
                  <CheckCircle2 className="h-3.5 w-3.5 text-[#0d3286]" /> Scholarship
                  Matching
                </li>
              </ul>
              <Link
                href="/universities"
                className="group flex items-center gap-2 text-sm font-bold text-[#0d3286]"
              >
                Explore Features
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>

            <div className="flex flex-col rounded-2xl border border-slate-200/60 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg">
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-[#3156c4]/5 text-[#3156c4]">
                <Briefcase className="h-6 w-6" />
              </div>
              <h3 className="mb-2 text-lg font-semibold text-[#0d3286]">
                For Agencies
              </h3>
              <p className="mb-4 flex-grow leading-relaxed text-slate-500">
                Streamline recruitment workflows and manage student applications through
                a single dashboard.
              </p>
              <ul className="mb-6 space-y-2">
                <li className="flex items-center gap-2 text-sm text-slate-500">
                  <CheckCircle2 className="h-3.5 w-3.5 text-[#3156c4]" /> CRM
                  Integration
                </li>
                <li className="flex items-center gap-2 text-sm text-slate-500">
                  <CheckCircle2 className="h-3.5 w-3.5 text-[#3156c4]" /> Commission
                  Management
                </li>
              </ul>
              <Link
                href="/agencies"
                className="group flex items-center gap-2 text-sm font-bold text-[#0d3286]"
              >
                Partner With Us
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>

            <div className="relative flex flex-col overflow-hidden rounded-2xl bg-[#0d3286] p-6 text-white shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg">
              <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-white/10 blur-2xl" />
              <div className="relative z-10 mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 text-white">
                <Landmark className="h-6 w-6" />
              </div>
              <h3 className="relative z-10 mb-2 text-lg font-semibold text-white">
                For Institutions
              </h3>
              <p className="relative z-10 mb-4 flex-grow leading-relaxed text-white/80">
                Access a pool of qualified, high-intent students and showcase your brand
                to a global audience.
              </p>
              <ul className="relative z-10 mb-6 space-y-2">
                <li className="flex items-center gap-2 text-sm text-white/80">
                  <BadgeCheck className="h-3.5 w-3.5 text-white/60" /> Verified Lead Gen
                </li>
                <li className="flex items-center gap-2 text-sm text-white/80">
                  <BadgeCheck className="h-3.5 w-3.5 text-white/60" /> Direct Admissions
                </li>
              </ul>
              <Link
                href="/agencies"
                className="group relative z-10 flex items-center gap-2 text-sm font-bold text-white"
              >
                List Your Institution
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats & data */}
      <section className="bg-white py-12 md:py-16">
        <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-16 px-4 sm:px-6 lg:grid-cols-2 lg:gap-24 lg:px-8">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-[#0d3286] md:text-5xl">
              Empowering Excellence Through Data.
            </h2>
            <p className="mb-10 mt-6 leading-relaxed text-slate-500">
              Our platform is engineered to remove friction from global education. We
              provide the structural beauty and modern tools required for elite
              academic success.
            </p>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div className="rounded-3xl border border-slate-200/60 bg-white p-8 shadow-sm">
                <div className="mb-2 text-4xl font-bold text-[#0d3286]">94%</div>
                <div className="text-sm font-semibold uppercase tracking-wider text-slate-400">
                  Success Rate
                </div>
              </div>
              <div className="rounded-3xl border border-slate-200/60 bg-white p-8 shadow-sm">
                <div className="mb-2 text-4xl font-bold text-[#0d3286]">
                  {mockUniversities.length * 40}+
                </div>
                <div className="text-sm font-semibold uppercase tracking-wider text-slate-400">
                  Active Programs
                </div>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="relative overflow-hidden rounded-[32px] border border-slate-200/60 bg-white p-8 shadow-lg">
              <div className="mb-8 flex items-center justify-between border-b pb-4">
                <div className="font-bold text-[#0d3286]">Performance Insights</div>
                <LineChart className="h-5 w-5 text-slate-400" />
              </div>
              <div className="space-y-8">
                <div className="flex items-end justify-between">
                  <div>
                    <div className="text-3xl font-bold text-[#0d3286]">45k</div>
                    <div className="text-xs font-bold text-slate-400">
                      Successful Placements
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-bold text-slate-500">
                    <span>Global Admissions Target</span>
                    <span>85% achieved</span>
                  </div>
                  <div className="h-3 w-full overflow-hidden rounded-full bg-slate-100">
                    <div className="h-full w-[85%] rounded-full bg-[#3156c4]" />
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div className="h-24 rounded-xl bg-slate-50" />
                  <div className="h-24 rounded-xl bg-[#0d3286]/5" />
                  <div className="h-24 rounded-xl bg-[#3156c4]/5" />
                </div>
              </div>
            </div>
            <div className="absolute -right-10 -top-10 -z-10 h-40 w-40 rounded-full border-[20px] border-[#3156c4]/5" />
          </div>
        </div>
      </section>

      {/* Testimonial */}
      <section className="px-4 py-12 sm:px-6 lg:px-8">
        <div className="relative mx-auto flex max-w-4xl flex-col items-center gap-8 overflow-hidden rounded-3xl bg-[#0d3286] p-8 text-white md:flex-row md:p-10">
          <div className="h-40 w-40 shrink-0 rotate-3 overflow-hidden rounded-2xl border-4 border-white/20 shadow-2xl transition-transform duration-500 hover:rotate-0">
            <img
              alt="Student testimonial"
              className="h-full w-full object-cover"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAdckpbwc2E1YLRbNw5sq6ZmAdz0wfOs7zXXH45obsoiaR9rl5akskJbj_tTgln2RSsIWhbE7zeHahvTmNxMSQQuAT-hO2tAlYWKEVWxlTdvGy9YKpsymSznNDMy2HHxoN55975-mJrQ9hElK1EKejTgjqjLroo2CoPjQOaym4YhN9v0_oX7232uxFtNKYrgb6Vmgjch_tkfpc2lB0hFuN9dI03KKjr1KQ08GU1JNOSW1ez-Fh4jbHp"
            />
          </div>
          <div className="relative z-10">
            <div className="mb-4 flex gap-1 text-[#6f8fff]">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="h-3.5 w-3.5 fill-current" />
              ))}
            </div>
            <p className="mb-6 text-lg font-medium italic leading-relaxed md:text-xl">
              &ldquo;StudyBridge didn&apos;t just help me find a university; they helped
              me architect my entire professional future. The clarity of the platform
              and the MatchScore precision are truly world-class.&rdquo;
            </p>
            <div>
              <div className="text-base font-bold">Alexander Sterling</div>
              <div className="text-white/60">MBA Candidate, INSEAD</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-white px-4 py-16 text-center sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-3xl font-bold tracking-tight text-[#0d3286] md:text-5xl">
            Ready to Start Your Academic Journey?
          </h2>
          <p className="mx-auto mb-12 mt-8 max-w-2xl leading-relaxed text-slate-500">
            Join the global network of excellence and let data-driven matching guide
            your future.
          </p>
          <div className="flex flex-col justify-center gap-6 sm:flex-row">
            <Link
              href="/auth/register"
              className="rounded-2xl bg-[#0d3286] px-12 py-5 text-lg font-bold text-white shadow-xl transition-transform duration-200 hover:scale-105"
            >
              Create Your Free Profile
            </Link>
            <Link
              href="/universities"
              className="rounded-2xl border border-slate-200 bg-white px-12 py-5 text-lg font-bold text-[#0d3286] transition-colors duration-200 hover:bg-slate-50"
            >
              View Universities
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}