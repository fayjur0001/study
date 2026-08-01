// src/app/(public)/about/page.tsx
import Link from 'next/link'
import { BadgeCheck, Brain, ArrowRight } from 'lucide-react'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import { mockUniversities } from '@/lib/mockData'

const impactStats = [
  { value: '500+', label: 'Partner Universities' },
  { value: '45k+', label: 'Students Placed' },
  { value: '80+', label: 'Countries Represented' },
  { value: '98%', label: 'Visa Success Rate' },
]

const timeline = [
  {
    year: '2021: The Beginning',
    text: 'A small team of international-alumni students realized the application process was broken and set out to fix it.',
  },
  {
    year: '2023: Regional Expansion',
    text: 'Launched dedicated support for students across Bangladesh, connecting them with verified agencies and partner universities.',
  },
  {
    year: '2025: The AI Revolution',
    text: "Launched StudyBridge's AI Matchmaking and document tools, cutting application prep time while raising acceptance rates.",
  },
]

const leadership = [
  {
    name: 'Dr. Sarah Chen',
    role: 'CEO & Co-Founder',
    bio: 'Former Dean of International Admissions at Oxford.',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDkxWL96QlEog6wXYhy9R8iv2CiHJJGiuiw7Z08eLMC6Z5zWaAy7qEUj3BkYpLLOpoxkTud7H9jhJpoCnIyeQxiDG7Miia_tlFibnefAQ7ao0nMtOlmn9pXdwQWnAS3_8b8IFd3FPnX2IdTSfHnCokEaFXna5W1ZMCWX43vuppiimW37TbbCjkeJZk3t3FAuPutPzf05xf5gHPgvqXcGpRxEZFzOiiI474OcLuGlkwpBGIEH7Xo5Gc4',
  },
  {
    name: 'James Aris',
    role: 'Chief Technology Officer',
    bio: 'Ex-Lead Engineer at a major global EdTech unicorn.',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDBP3ChEpWT5u7_kjHJq49MUMIJ5_3jtJ-l19MzdmlG1SPENcfGlKHfvPZnZsrcqYSfQqhpOMhMErLerHrSO4bSL0WC6GIuYw2JnaLE4VpS8OoagTgl9n84zQPm3A28M3ujSldSTbhLln6z96NpferJ_SH-d4fr7Oc2cfvqAYdPKd_BSfNWvtysalHlYK8JFnOGozH2hkumbD6-qkhzLf2G6sVJvJ2o1bXTUoTvKpQCCY7i1l0xH1Rk',
  },
  {
    name: 'Elena Rodriguez',
    role: 'Head of Global Partnerships',
    bio: 'Specialist in international educational policy and relations.',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDQJGtYZB_Knzu3qIhzc0Cr6Uzf8_ceS8twMKTzOouT8rynA79eEKuIRqC9HPzXUHSS_mqc-k9tyFRtm7egHPr8I8nJww-3do28VsSZCNEC3JKEGaPsxkriwRxaaZMLq45Co6FAgcmUYwJmvCL2Essbmphly9zmM9byODqugAPlP1Ns1gJ8vSqJB3pbG2QYTplg5oD6k-Npz8euWqRhBJJzabY22gxVUs8EzxYo7sq55-xH5r7iwFfQ',
  },
  {
    name: 'Marcus Thorne',
    role: 'Chief Operating Officer',
    bio: 'Focusing on operational excellence and global scale.',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAGOQk6BJI-q04dBNL9C6QnQSPG7NDwInEUJ5deUFiyEOsj6sN5jqnZgu3k22hNmJLhosCUt-kdSfHGvbCtu89mQ7-FKoSV3tB4tTJL2GYZ4IxyuXtQOdTjOHguG8twqmSGvaBmXypgXcUlkRRH4nC0YOtGAJwTodjraHzkBn_hK6MI361z8jSAXwYk__rp-ym2FGTdGY_fXjINMiCryN-V2ZgW-nE9XPUvBAUpMUwcPYQTfeI26GP7',
  },
]

export default function AboutPage() {
  const missionImage = mockUniversities[1]?.campusImages[0] ?? mockUniversities[0].campusImages[0]

  return (
    <>
      <Navbar />

      {/* Hero */}
      <header className="relative flex h-[70vh] w-full items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            alt="StudyBridge campus"
            className="h-full w-full object-cover"
            src={mockUniversities[0].campusImages[0]}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0d3286]/90 to-[#0d3286]/40" />
        </div>

        <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <span className="mb-6 inline-block rounded-full bg-white/10 px-4 py-1.5 text-xs font-medium text-white backdrop-blur-md">
              OUR LEGACY & FUTURE
            </span>
            <h1 className="text-4xl font-bold leading-tight text-white md:text-5xl">
              Bridging the Gap Between Ambition and Education
            </h1>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-white/80 md:text-lg">
              StudyBridge is a growing leader in academic mobility, dedicated to
              simplifying the international student journey through technology and
              expert mentorship.
            </p>
            <div className="mt-8 flex gap-4">
              
                href="#mission"
                className="rounded-xl bg-white px-8 py-3 font-bold text-[#0d3286] transition-all hover:bg-slate-100"
              >
                Discover Our Mission
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* Global Impact Stats */}
      <section className="bg-[#0d3286] py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-6 text-center md:grid-cols-4">
            {impactStats.map((stat) => (
              <div key={stat.label} className="p-6">
                <div className="mb-1 text-3xl font-bold text-white md:text-4xl">
                  {stat.value}
                </div>
                <div className="text-xs font-medium uppercase tracking-wider text-white/60">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="bg-slate-50 py-16 md:py-24" id="mission">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center gap-20 md:flex-row">
            <div className="w-full md:w-1/2">
              <h2 className="text-2xl font-semibold tracking-tight text-[#0d3286] md:text-3xl">
                Empowering Global Students to Reach Higher
              </h2>
              <p className="mt-6 leading-relaxed text-slate-500">
                We believe that education is a universal right that should not be
                limited by borders. Our mission is to democratize access to elite
                education by providing students with the tools, data, and support they
                need to navigate the complex world of international admissions.
              </p>

              <div className="mt-6 space-y-4">
                <div className="flex items-start gap-4 rounded-xl bg-white p-4 shadow-sm">
                  <BadgeCheck className="mt-0.5 h-6 w-6 shrink-0 text-[#0d3286]" />
                  <div>
                    <h4 className="text-base font-semibold text-slate-900">
                      Integrity First
                    </h4>
                    <p className="text-sm text-slate-500">
                      We partner only with accredited institutions to ensure student
                      success.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4 rounded-xl bg-white p-4 shadow-sm">
                  <Brain className="mt-0.5 h-6 w-6 shrink-0 text-[#0d3286]" />
                  <div>
                    <h4 className="text-base font-semibold text-slate-900">
                      AI-Powered Matches
                    </h4>
                    <p className="text-sm text-slate-500">
                      Utilizing advanced algorithms to find the perfect academic fit for
                      every student.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="w-full md:w-1/2">
              <div className="aspect-square overflow-hidden rounded-3xl shadow-lg">
                <img
                  alt="Students collaborating"
                  className="h-full w-full object-cover"
                  src={missionImage}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Story timeline */}
      <section className="bg-white py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto mb-16 max-w-3xl text-center">
            <h2 className="text-2xl font-semibold tracking-tight text-[#0d3286] md:text-3xl">
              Our Story
            </h2>
            <p className="mt-4 text-slate-500">
              Founded by international alumni for future international students.
              We&apos;ve been in your shoes.
            </p>
          </div>

          <div className="relative">
            <div className="absolute bottom-0 left-1/2 top-0 hidden w-0.5 bg-slate-200 md:block" />
            <div className="space-y-12">
              {timeline.map((event, index) => {
                const isEven = index % 2 === 0
                return (
                  <div
                    key={event.year}
                    className={`relative flex flex-col items-center gap-8 md:flex-row ${
                      isEven ? '' : 'md:flex-row-reverse'
                    }`}
                  >
                    <div
                      className={`md:w-1/2 ${
                        isEven ? 'md:pr-12 md:text-right' : 'md:pl-12 md:text-left'
                      }`}
                    >
                      <h3 className="text-lg font-semibold text-[#0d3286]">
                        {event.year}
                      </h3>
                      <p className="mt-1 text-sm leading-relaxed text-slate-500">
                        {event.text}
                      </p>
                    </div>
                    <div className="absolute left-1/2 hidden h-4 w-4 -translate-x-1/2 rounded-full border-4 border-white bg-[#0d3286] md:block" />
                    <div
                      className={`h-32 w-full rounded-2xl bg-slate-100 md:w-1/2 ${
                        isEven ? 'md:pl-12' : 'md:pr-12'
                      }`}
                    />
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Leadership */}
      <section className="bg-slate-50 py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-16 flex items-end justify-between">
            <div>
              <h2 className="text-2xl font-semibold tracking-tight text-[#0d3286] md:text-3xl">
                Our Leadership
              </h2>
              <p className="mt-2 text-slate-500">
                The visionaries shaping the future of global education.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {leadership.map((person) => (
              <div
                key={person.name}
                className="group overflow-hidden rounded-3xl bg-white shadow-sm transition-all hover:shadow-lg"
              >
                <div className="relative aspect-[4/5]">
                  <img
                    alt={person.name}
                    className="h-full w-full object-cover grayscale transition-all duration-500 group-hover:grayscale-0"
                    src={person.image}
                  />
                </div>
                <div className="p-6">
                  <h4 className="text-lg font-semibold text-slate-900">
                    {person.name}
                  </h4>
                  <p className="mb-3 text-xs font-medium uppercase text-[#0d3286]">
                    {person.role}
                  </p>
                  <p className="text-sm text-slate-500">{person.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA to universities (kept consistent with rest of site) */}
      <section className="bg-white px-4 py-16 text-center sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-2xl font-semibold tracking-tight text-[#0d3286] md:text-3xl">
            Ready to start your own story with us?
          </h2>
          <Link
            href="/universities"
            className="mt-8 inline-flex items-center gap-2 rounded-xl bg-[#0d3286] px-8 py-3 font-bold text-white shadow-md transition-transform hover:scale-[1.02]"
          >
            Explore Universities <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      <Footer />
    </>
  )
}