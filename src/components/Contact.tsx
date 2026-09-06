/**
 * @file Contact.tsx
 * @description Contact and office information section with styled cards
 * for address, phone, and email, plus a "How to Reach Us" map placeholder.
 */

import React from 'react'
import { MapPin, Phone, Mail, Clock, Globe } from 'lucide-react'
import { ContactCard } from './ui/Card'

const CONTACT_INFO = [
  {
    icon: <MapPin size={24} />,
    title: 'Community Office',
    lines: [
      'Kumawat Samaj Bhawan,',
      'M.I. Road, Near Ajmeri Gate,',
      'Jaipur, Rajasthan — 302 001',
    ],
    accentColor: 'bg-saffron-100 text-saffron-600',
  },
  {
    icon: <Phone size={24} />,
    title: 'Helpline Numbers',
    lines: [
      '+91 94140 12345 (General)',
      '+91 98290 67890 (Membership)',
      'Mon – Sat: 10:00 AM – 6:00 PM',
    ],
    href: 'tel:+919414012345',
    accentColor: 'bg-gold-100 text-gold-600',
  },
  {
    icon: <Mail size={24} />,
    title: 'Email Us',
    lines: [
      'info@kumawatsamaj.org',
      'membership@kumawatsamaj.org',
      'We reply within 24 hours',
    ],
    href: 'mailto:info@kumawatsamaj.org',
    accentColor: 'bg-kumawat-lotus/20 text-kumawat-lotus',
  },
  {
    icon: <Globe size={24} />,
    title: 'Online Presence',
    lines: [
      'www.kumawatsamaj.org',
      'Follow us on social media',
      '@KumawatSamaj',
    ],
    href: 'https://kumawatsamaj.org',
    accentColor: 'bg-blue-50 text-blue-500',
  },
]

const OFFICE_HOURS = [
  { day: 'Monday – Friday', time: '10:00 AM – 6:00 PM' },
  { day: 'Saturday', time: '10:00 AM – 4:00 PM' },
  { day: 'Sunday', time: 'Closed' },
]

/**
 * `Contact` — community contact section with cards and office hours.
 */
export const Contact: React.FC = () => {
  return (
    <section
      id="contact"
      className="py-20 px-4 sm:px-6 lg:px-8 bg-white"
      aria-labelledby="contact-heading"
    >
      <div className="max-w-6xl mx-auto">

        {/* Section Header */}
        <div className="text-center mb-14">
          <div className="om-divider">
            <span className="text-2xl text-saffron-400 font-devanagari">ॐ</span>
          </div>
          <h2 id="contact-heading" className="section-title mb-3">
            Get in Touch
          </h2>
          <p className="text-kumawat-deep/60 text-base max-w-lg mx-auto">
            Reach out to the Kumawat Samaj community office for membership queries,
            events, or any assistance you may need.
          </p>
        </div>

        {/* Contact Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-14">
          {CONTACT_INFO.map((info) => (
            <ContactCard key={info.title} {...info} />
          ))}
        </div>

        {/* Office Hours + Map Placeholder */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

          {/* Office Hours */}
          <div className="floating-card p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-saffron-100 flex items-center justify-center text-saffron-600">
                <Clock size={20} />
              </div>
              <h3 className="font-semibold text-kumawat-deep text-lg">Office Hours</h3>
            </div>

            <ul className="space-y-4">
              {OFFICE_HOURS.map(({ day, time }) => (
                <li key={day} className="flex justify-between items-center py-2 border-b border-saffron-50 last:border-0">
                  <span className="text-kumawat-deep/70 font-medium text-sm">{day}</span>
                  <span
                    className={`text-sm font-semibold ${time === 'Closed' ? 'text-red-400' : 'text-saffron-600'}`}
                  >
                    {time}
                  </span>
                </li>
              ))}
            </ul>

            <div className="mt-6 p-4 bg-saffron-50 rounded-xl border border-saffron-100">
              <p className="text-xs text-saffron-700">
                <strong>Note:</strong> Office may be closed on national holidays
                and special Samaj events. Call ahead to confirm.
              </p>
            </div>
          </div>

          {/* Map / Location Visual */}
          <div className="floating-card overflow-hidden">
            <div className="h-full min-h-[280px] bg-gradient-to-br from-saffron-50 to-gold-50 flex flex-col items-center justify-center gap-4 p-8 text-center relative">
              {/* Decorative map pin */}
              <div className="w-16 h-16 rounded-full bg-saffron-100 flex items-center justify-center animate-float">
                <MapPin size={32} className="text-saffron-500" />
              </div>
              <div>
                <h4 className="font-semibold text-kumawat-deep mb-1">Find Our Office</h4>
                <p className="text-kumawat-deep/60 text-sm">
                  Kumawat Samaj Bhawan,<br />
                  M.I. Road, Jaipur, Rajasthan
                </p>
              </div>
              <a
                href="https://maps.google.com/?q=Kumawat+Samaj+Bhawan+Jaipur"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary text-sm px-5 py-2.5"
              >
                Open in Google Maps
              </a>

              {/* Decorative pattern */}
              <div
                className="absolute inset-0 opacity-5 pointer-events-none"
                style={{
                  // backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='60' viewBox='0 0 60 60'%3E%3Ccircle cx='30' cy='30' r='25' fill='none' stroke='%23ff7d0a' stroke-width='1'/%3E%3Ccircle cx='30' cy='30' r='15' fill='none' stroke='%23ff7d0a' stroke-width='1'/%3E%3C/svg%3E")`,
                  backgroundSize: '80px 80px',
                }}
                aria-hidden="true"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
