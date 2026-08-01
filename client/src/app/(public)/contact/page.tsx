'use client'

// src/app/(public)/contact/page.tsx
import { useState, FormEvent } from 'react'
import toast from 'react-hot-toast'
import { Mail, Phone, MapPin, Send } from 'lucide-react'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

const subjectOptions = [
  { id: 'general', label: 'General Inquiry' },
  { id: 'application', label: 'Application Support' },
  { id: 'scholarship', label: 'Scholarship Guidance' },
  { id: 'agency', label: 'Partner Agency Program' },
]

export default function ContactPage() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [subject, setSubject] = useState('general')
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
      setSubject('general')
      setMessage('')
    }, 1200)
  }

  return (
    <>
      <Navbar />

      <main className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 md:py-24">
        <div className="mb-16 text-center md:text-left">
          <h1 className="text-3xl font-bold text-[#0d3286] md:text-5xl">Get in Touch</h1>
          <p className="mt-4 max-w-2xl text-slate-500">
            Have questions about your global education journey? Our team of academic
            experts and advisors are here to bridge the gap between you and your
            future.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-12">
          {/* Form */}
          <div className="rounded-[24px] bg-white p-6 shadow-sm md:col-span-7 md:p-8">
            <h2 className="mb-8 text-xl font-semibold text-[#0d3286]">Send us a message</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid gap-6 sm:grid-cols-2">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wide text-slate-500" htmlFor="name">
                    Full Name
                  </label>
                  <Input
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="John Doe"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wide text-slate-500" htmlFor="email">
                    Email Address
                  </label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="john@example.com"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wide text-slate-500">
                  Subject
                </label>
                <Select selectedKey={subject} onSelectionChange={(key) => setSubject(String(key))}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {subjectOptions.map((opt) => (
                      <SelectItem key={opt.id} id={opt.id}>
                        {opt.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wide text-slate-500" htmlFor="message">
                  Message
                </label>
                <Textarea
                  id="message"
                  rows={6}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="How can we help you achieve your study goals?"
                />
              </div>

              <Button
                type="submit"
                isDisabled={isSubmitting}
                className="w-full gap-3 rounded-xl bg-[#0d3286] py-6 text-base font-bold hover:bg-[#0d3286]/90 sm:w-auto sm:px-10"
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
                <Send className="h-4 w-4" />
              </Button>
            </form>
          </div>

          {/* Info */}
          <div className="space-y-6 md:col-span-5">
            <div className="rounded-[24px] bg-[#0d3286] p-6 text-white shadow-sm md:p-8">
              <h3 className="mb-6 text-lg font-semibold">Direct Support</h3>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="rounded-full bg-white/10 p-3">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-xs uppercase text-white/60">Email Support</p>
                    <p className="text-base font-semibold">support@studybridge.com</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="rounded-full bg-white/10 p-3">
                    <Phone className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-xs uppercase text-white/60">Hotline</p>
                    <p className="text-base font-semibold">+880 1700-000000</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-[24px] bg-white p-6 shadow-sm md:p-8">
              <h3 className="mb-6 text-lg font-semibold text-[#0d3286]">Our Office</h3>
              <div className="group">
                <div className="mb-2 flex items-center justify-between">
                  <h4 className="flex items-center gap-2 text-base font-bold text-slate-900">
                    <MapPin className="h-5 w-5 text-[#0d3286]" /> Dhaka, Bangladesh
                  </h4>
                  <span className="rounded-full bg-[#dce1ff] px-2 py-1 text-xs font-medium text-[#0d3286]">
                    HQ
                  </span>
                </div>
                <p className="text-sm text-slate-500">
                  Gulshan Avenue, Dhaka 1212, Bangladesh
                </p>
              </div>
              <div className="mt-6 border-t border-slate-100 pt-6 text-sm text-slate-500">
                Sun – Thu, 9:00 AM – 6:00 PM (GMT+6)
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  )
}