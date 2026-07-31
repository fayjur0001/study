'use client'

// src/app/(public)/contact/page.tsx
import { useState, FormEvent } from 'react'
import toast from 'react-hot-toast'
import { Mail, Phone, MapPin, Clock } from 'lucide-react'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import PageHeader from '@/components/common/PageHeader'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'

export default function ContactPage() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [subject, setSubject] = useState('')
  const [message, setMessage] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (!name || !email || !message) {
      toast.error('Please fill in all required fields.')
      return
    }
    setIsSubmitting(true)
    setTimeout(() => {
      setIsSubmitting(false)
      toast.success("Message sent — we'll get back to you within 1-2 business days.")
      setName('')
      setEmail('')
      setSubject('')
      setMessage('')
    }, 1200)
  }

  const officeInfo = [
    {
      icon: Mail,
      label: 'Email',
      value: 'support@studybridge.com',
    },
    {
      icon: Phone,
      label: 'Phone',
      value: '+880 1700-000000',
    },
    {
      icon: MapPin,
      label: 'Office',
      value: 'Gulshan Avenue, Dhaka, Bangladesh',
    },
    {
      icon: Clock,
      label: 'Hours',
      value: 'Sun – Thu, 9:00 AM – 6:00 PM',
    },
  ]

  return (
    <>
      <Navbar />

      <div className="bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <PageHeader
            title="Get in Touch"
            description="Questions about universities, scholarships, or your application? Our team is here to help."
          />

          <div className="mt-10 grid lg:grid-cols-3 gap-6">
            {/* Contact form */}
            <div className="lg:col-span-2 rounded-2xl border border-slate-200 bg-white p-6 md:p-8 shadow-sm">
              <h2 className="text-lg font-semibold text-slate-900">Send us a message</h2>
              <form onSubmit={handleSubmit} className="mt-6 space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <label className="text-sm font-normal text-slate-500" htmlFor="name">
                      Full Name *
                    </label>
                    <Input
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Tanvir Ahmed"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-normal text-slate-500" htmlFor="email">
                      Email Address *
                    </label>
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@example.com"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-normal text-slate-500" htmlFor="subject">
                    Subject
                  </label>
                  <Input
                    id="subject"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    placeholder="What's this about?"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-normal text-slate-500" htmlFor="message">
                    Message *
                  </label>
                  <Textarea
                    id="message"
                    rows={6}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Tell us how we can help..."
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto rounded-lg bg-indigo-600 hover:bg-indigo-700 active:scale-[0.98] transition-all duration-200 ease-out"
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </Button>
              </form>
            </div>

            {/* Office info */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 md:p-8 shadow-sm h-fit">
              <h2 className="text-lg font-semibold text-slate-900">Contact Information</h2>
              <div className="mt-6 space-y-5">
                {officeInfo.map((item) => (
                  <div key={item.label} className="flex items-start gap-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600">
                      <item.icon className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="text-xs font-medium tracking-wide uppercase text-slate-400">
                        {item.label}
                      </p>
                      <p className="text-sm leading-relaxed text-slate-900 mt-0.5">
                        {item.value}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  )
}