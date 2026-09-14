/**
 * @file Contact.tsx
 * @description Contact and office information section — dark teal theme.
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
    accentColor: 'teal',
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
    accentColor: 'teal',
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
    accentColor: 'teal',
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
    accentColor: 'teal',
  },
]

const OFFICE_HOURS = [
  { day: 'Monday – Friday', time: '10:00 AM – 6:00 PM' },
  { day: 'Saturday', time: '10:00 AM – 4:00 PM' },
  { day: 'Sunday', time: 'Closed' },
]

/**
 * `Contact` — community contact section with dark cards and office hours.
 */
export const Contact: React.FC = () => {
  return (
    <section
      id="contact"
      className="py-20 px-4 sm:px-6 lg:px-8"
      style={{ background: '#0b1a1a' }}
      aria-labelledby="contact-heading"
    >
      <div className="max-w-6xl mx-auto">

        {/* Section Header */}
        <div className="text-center mb-14">
          <div className="om-divider">
            <img src="./logo.png" alt="Kumawat Samaj" className="w-8 h-8 rounded-full object-cover" />
          </div>
          <h2 id="contact-heading" className="section-title mb-3">
            Get in Touch
          </h2>
          <p className="text-base max-w-lg mx-auto" style={{ color: 'rgba(255,255,255,0.50)' }}>
            Reach out to the Kumawat Samaj community office for membership queries,
            events, or any assistance you may need.
          </p>
        </div>

        {/* Contact Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-14 items-stretch">
          {CONTACT_INFO.map((info) => (
            <ContactCard key={info.title} {...info} />
          ))}
        </div>

        {/* Office Hours + Map Placeholder */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

          {/* Office Hours */}
          <div className="floating-card p-8">
            <div className="flex items-center gap-3 mb-6">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center"
                style={{ background: 'rgba(14,203,188,0.12)', color: '#0ecbbc' }}
              >
                <Clock size={20} />
              </div>
              <h3 className="font-semibold text-lg" style={{ color: '#ffffff' }}>Office Hours</h3>
            </div>

            <ul className="space-y-4">
              {OFFICE_HOURS.map(({ day, time }) => (
                <li
                  key={day}
                  className="flex justify-between items-center py-2"
                  style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}
                >
                  <span className="font-medium text-sm" style={{ color: 'rgba(255,255,255,0.60)' }}>{day}</span>
                  <span
                    className="text-sm font-semibold"
                    style={{ color: time === 'Closed' ? '#f87171' : '#0ecbbc' }}
                  >
                    {time}
                  </span>
                </li>
              ))}
            </ul>

            <div
              className="mt-6 p-4 rounded-xl"
              style={{ background: 'rgba(14,203,188,0.07)', border: '1px solid rgba(14,203,188,0.15)' }}
            >
              <p className="text-xs" style={{ color: 'rgba(14,203,188,0.85)' }}>
                <strong>Note:</strong> Office may be closed on national holidays
                and special Samaj events. Call ahead to confirm.
              </p>
            </div>
          </div>

          {/* Map / Location Visual */}
          <div className="floating-card overflow-hidden">
            <div
              className="h-full min-h-[280px] flex flex-col items-center justify-center gap-4 p-8 text-center relative"
              style={{
                background: 'linear-gradient(135deg, rgba(14,203,188,0.07) 0%, rgba(14,203,188,0.03) 100%)',
              }}
            >
              {/* Decorative map pin */}
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center animate-float"
                style={{ background: 'rgba(14,203,188,0.12)', color: '#0ecbbc' }}
              >
                <MapPin size={32} />
              </div>
              <div>
                <h4 className="font-semibold mb-1" style={{ color: '#ffffff' }}>Find Our Office</h4>
                <p className="text-sm" style={{ color: 'rgba(255,255,255,0.50)' }}>
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
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
