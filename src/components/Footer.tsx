/**
 * @file Footer.tsx
 * @description Site-wide footer — dark teal theme.
 */

import React from 'react'
import { ExternalLink } from 'lucide-react'

const FacebookIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
)
const InstagramIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
  </svg>
)
const YoutubeIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-1.96C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.4 19.54C5.12 20 12 20 12 20s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z" />
    <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="white" />
  </svg>
)
const TwitterIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
)

const QUICK_LINKS = [
  { href: '#home', label: 'Home' },
  { href: '#register', label: 'Become a Member' },
  { href: '#contact', label: 'Contact Us' },
]

const COMMUNITY_LINKS = [
  { href: '#', label: 'About Kumawat Samaj' },
  { href: '#', label: 'Events & Festivals' },
  { href: '#', label: 'Member Directory' },
  { href: '#', label: 'Community Welfare' },
  { href: '#', label: 'Heritage & Culture' },
]

const SOCIAL_LINKS = [
  { href: 'https://facebook.com', icon: <FacebookIcon />, label: 'Facebook' },
  { href: 'https://instagram.com', icon: <InstagramIcon />, label: 'Instagram' },
  { href: 'https://youtube.com', icon: <YoutubeIcon />, label: 'YouTube' },
  { href: 'https://twitter.com', icon: <TwitterIcon />, label: 'Twitter' },
]

/**
 * `Footer` — dark teal footer with teal accent links and social icons.
 */
export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer
      style={{ background: 'linear-gradient(180deg, #0f2020 0%, #0b1a1a 100%)', color: '#fff' }}
      role="contentinfo"
      aria-label="Site Footer"
    >
      {/* ── Top Divider ─────────────────────────── */}
      <div
        style={{ height: '1px', background: 'linear-gradient(to right, transparent, rgba(14,203,188,0.4), transparent)' }}
        aria-hidden="true"
      />

      {/* ── Main Footer Content ──────────────────── */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">

          {/* Brand column */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-5">
              <img src="./logo.png" alt="Kumawat Samaj" className="w-12 h-12 rounded-full object-cover" style={{ boxShadow: '0 0 10px rgba(14,203,188,0.30)' }} />
              <div>
                <div className="font-serif font-bold text-xl text-white">Kumawat Samaj</div>
                <div className="font-devanagari text-xs tracking-wide" style={{ color: '#0ecbbc' }}>कुमावत समाज</div>
              </div>
            </div>
            <p className="text-sm leading-relaxed mb-6" style={{ color: 'rgba(255,255,255,0.50)' }}>
              Uniting the Kumawat community through heritage, culture, and
              mutual support across India.
            </p>

            {/* Social links */}
            <div className="flex gap-3">
              {SOCIAL_LINKS.map(({ href, icon, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={`Kumawat Samaj on ${label}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-lg flex items-center justify-center transition-all duration-200"
                  style={{
                    background: 'rgba(255,255,255,0.07)',
                    color: 'rgba(255,255,255,0.60)',
                    border: '1px solid rgba(255,255,255,0.08)',
                  }}
                  onMouseEnter={e => {
                    ; (e.currentTarget as HTMLAnchorElement).style.background = 'rgba(14,203,188,0.15)'
                      ; (e.currentTarget as HTMLAnchorElement).style.color = '#0ecbbc'
                      ; (e.currentTarget as HTMLAnchorElement).style.borderColor = 'rgba(14,203,188,0.30)'
                  }}
                  onMouseLeave={e => {
                    ; (e.currentTarget as HTMLAnchorElement).style.background = 'rgba(255,255,255,0.07)'
                      ; (e.currentTarget as HTMLAnchorElement).style.color = 'rgba(255,255,255,0.60)'
                      ; (e.currentTarget as HTMLAnchorElement).style.borderColor = 'rgba(255,255,255,0.08)'
                  }}
                >
                  {icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3
              className="font-semibold mb-5 text-sm uppercase tracking-widest"
              style={{ color: 'rgba(255,255,255,0.90)' }}
            >
              Quick Links
            </h3>
            <ul className="space-y-3" role="list">
              {QUICK_LINKS.map(({ href, label }) => (
                <li key={label}>
                  <a
                    href={href}
                    className="text-sm transition-colors duration-200 flex items-center gap-1.5 group"
                    style={{ color: 'rgba(255,255,255,0.50)' }}
                    onMouseEnter={e => { ; (e.currentTarget as HTMLAnchorElement).style.color = '#0ecbbc' }}
                    onMouseLeave={e => { ; (e.currentTarget as HTMLAnchorElement).style.color = 'rgba(255,255,255,0.50)' }}
                  >
                    <span className="w-1 h-1 rounded-full" style={{ background: '#0ecbbc', opacity: 0.7 }} aria-hidden="true" />
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Community Links */}
          <div>
            <h3
              className="font-semibold mb-5 text-sm uppercase tracking-widest"
              style={{ color: 'rgba(255,255,255,0.90)' }}
            >
              Community
            </h3>
            <ul className="space-y-3" role="list">
              {COMMUNITY_LINKS.map(({ href, label }) => (
                <li key={label}>
                  <a
                    href={href}
                    className="text-sm transition-colors duration-200 flex items-center gap-1.5"
                    style={{ color: 'rgba(255,255,255,0.50)' }}
                    onMouseEnter={e => { ; (e.currentTarget as HTMLAnchorElement).style.color = '#0ecbbc' }}
                    onMouseLeave={e => { ; (e.currentTarget as HTMLAnchorElement).style.color = 'rgba(255,255,255,0.50)' }}
                  >
                    <span className="w-1 h-1 rounded-full" style={{ background: '#0ecbbc', opacity: 0.7 }} aria-hidden="true" />
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter / CTA */}
          <div>
            <h3
              className="font-semibold mb-5 text-sm uppercase tracking-widest"
              style={{ color: 'rgba(255,255,255,0.90)' }}
            >
              Stay Connected
            </h3>
            <p className="text-sm mb-4" style={{ color: 'rgba(255,255,255,0.50)' }}>
              Subscribe to receive community news, events, and announcements.
            </p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="your@email.com"
                aria-label="Email for newsletter subscription"
                className="flex-1 px-3 py-2.5 rounded-xl text-white text-sm focus:outline-none transition-all duration-200"
                style={{
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.10)',
                }}
                onFocus={e => {
                  ; (e.target as HTMLInputElement).style.borderColor = '#0ecbbc'
                    ; (e.target as HTMLInputElement).style.boxShadow = '0 0 0 3px rgba(14,203,188,0.15)'
                }}
                onBlur={e => {
                  ; (e.target as HTMLInputElement).style.borderColor = 'rgba(255,255,255,0.10)'
                    ; (e.target as HTMLInputElement).style.boxShadow = 'none'
                }}
              />
              <button
                type="button"
                className="px-3 py-2.5 rounded-xl font-medium transition-colors duration-200 shrink-0"
                style={{ background: '#0ecbbc', color: '#0b1a1a' }}
                aria-label="Subscribe"
              >
                <ExternalLink size={16} />
              </button>
            </div>

            {/* Address snippet */}
            <div className="mt-6 text-xs leading-relaxed" style={{ color: 'rgba(255,255,255,0.35)' }}>
              Kumawat Samaj Bhawan<br />
              Bhayandar (East), Thane - 401105<br />
              📞 +91 9004450734
            </div>
          </div>

        </div>
      </div>

      {/* ── Bottom Bar ───────────────────────────── */}
      <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs" style={{ color: 'rgba(255,255,255,0.35)' }}>
            © {currentYear} Kumawat Samaj. All rights reserved.
          </p>
          <p className="text-xs font-devanagari" style={{ color: 'rgba(255,255,255,0.25)' }}>
            जय कुमावत समाज 🙏 • एकता • संस्कृति • विरासत
          </p>
        </div>
      </div>
    </footer>
  )
}
