/**
 * @file Footer.tsx
 * @description Site-wide footer with Om branding, navigation links,
 * social media links, and copyright notice.
 */

import React from 'react'
import { ExternalLink } from 'lucide-react'

// Simple inline SVG social icons (lucide-react doesn't include Facebook/Instagram/etc.)
const FacebookIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
  </svg>
)
const InstagramIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
    <circle cx="12" cy="12" r="4"/>
    <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor"/>
  </svg>
)
const YoutubeIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-1.96C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.4 19.54C5.12 20 12 20 12 20s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/>
    <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="white"/>
  </svg>
)
const TwitterIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
)

const QUICK_LINKS = [
  { href: '#home',     label: 'Home' },
  { href: '#register', label: 'Become a Member' },
  { href: '#contact',  label: 'Contact Us' },
]

const COMMUNITY_LINKS = [
  { href: '#',  label: 'About Kumawat Samaj' },
  { href: '#',  label: 'Events & Festivals' },
  { href: '#',  label: 'Member Directory' },
  { href: '#',  label: 'Community Welfare' },
  { href: '#',  label: 'Heritage & Culture' },
]

const SOCIAL_LINKS = [
  { href: 'https://facebook.com',  icon: <FacebookIcon />,  label: 'Facebook'  },
  { href: 'https://instagram.com', icon: <InstagramIcon />, label: 'Instagram' },
  { href: 'https://youtube.com',   icon: <YoutubeIcon />,   label: 'YouTube'   },
  { href: 'https://twitter.com',   icon: <TwitterIcon />,   label: 'Twitter'   },
]

/**
 * `Footer` — dark-themed footer with saffron accents, links, and copyright.
 */
export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer
      className="bg-footer-gradient text-white"
      role="contentinfo"
      aria-label="Site Footer"
    >
      {/* ── Top Divider ─────────────────────────── */}
      <div className="h-1 bg-saffron-gradient" aria-hidden="true" />

      {/* ── Main Footer Content ──────────────────── */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Brand column */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-5">
              <span className="text-4xl font-devanagari text-saffron-400" aria-hidden="true">ॐ</span>
              <div>
                <div className="font-serif font-bold text-xl text-white">Kumawat Samaj</div>
                <div className="font-devanagari text-xs text-saffron-400 tracking-wide">कुमावत समाज</div>
              </div>
            </div>
            <p className="text-white/60 text-sm leading-relaxed mb-6">
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
                  className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center text-white/70 hover:bg-saffron-500 hover:text-white transition-all duration-200"
                >
                  {icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-white mb-5 text-sm uppercase tracking-widest">Quick Links</h3>
            <ul className="space-y-3" role="list">
              {QUICK_LINKS.map(({ href, label }) => (
                <li key={label}>
                  <a
                    href={href}
                    className="text-white/60 hover:text-saffron-400 text-sm transition-colors duration-200 flex items-center gap-1.5 group"
                  >
                    <span className="w-1 h-1 rounded-full bg-saffron-500 group-hover:bg-saffron-400 transition-colors" aria-hidden="true" />
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Community Links */}
          <div>
            <h3 className="font-semibold text-white mb-5 text-sm uppercase tracking-widest">Community</h3>
            <ul className="space-y-3" role="list">
              {COMMUNITY_LINKS.map(({ href, label }) => (
                <li key={label}>
                  <a
                    href={href}
                    className="text-white/60 hover:text-saffron-400 text-sm transition-colors duration-200 flex items-center gap-1.5 group"
                  >
                    <span className="w-1 h-1 rounded-full bg-saffron-500 group-hover:bg-saffron-400 transition-colors" aria-hidden="true" />
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter / CTA */}
          <div>
            <h3 className="font-semibold text-white mb-5 text-sm uppercase tracking-widest">Stay Connected</h3>
            <p className="text-white/60 text-sm mb-4">
              Subscribe to receive community news, events, and announcements.
            </p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="your@email.com"
                aria-label="Email for newsletter subscription"
                className="flex-1 px-3 py-2.5 rounded-xl bg-white/10 border border-white/20 text-white text-sm placeholder-white/30 focus:outline-none focus:border-saffron-400 focus:ring-1 focus:ring-saffron-400 transition-all duration-200"
              />
              <button
                type="button"
                className="px-3 py-2.5 rounded-xl bg-saffron-500 hover:bg-saffron-400 text-white text-sm font-medium transition-colors duration-200 shrink-0"
                aria-label="Subscribe"
              >
                <ExternalLink size={16} />
              </button>
            </div>

            {/* Address snippet */}
            <div className="mt-6 text-xs text-white/40 leading-relaxed">
              Kumawat Samaj Bhawan<br />
              M.I. Road, Jaipur — 302 001<br />
              📞 +91 94140 12345
            </div>
          </div>

        </div>
      </div>

      {/* ── Bottom Bar ───────────────────────────── */}
      <div className="border-t border-white/10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-white/40 text-xs">
            © {currentYear} Kumawat Samaj. All rights reserved.
          </p>
          <p className="text-white/30 text-xs font-devanagari">
            जय कुमावत समाज 🙏 • एकता • संस्कृति • विरासत
          </p>
        </div>
      </div>
    </footer>
  )
}
