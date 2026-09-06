/**
 * @file Navbar.tsx
 * @description Sticky navigation bar with translucent glassmorphism effect,
 * Om symbol branding, and smooth scroll navigation links.
 * Becomes fully opaque on scroll.
 */

import React, { useEffect, useState } from 'react'
import { Menu, X } from 'lucide-react'

const NAV_LINKS = [
  { href: '#home', label: 'Home' },
  { href: '#register', label: 'Register' },
  { href: '#contact', label: 'Contact' },
]

/**
 * `Navbar` — sticky top navigation with Om branding and mobile menu.
 */
export const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleLinkClick = () => setMobileOpen(false)

  return (
    <header
      className={`
        fixed top-0 left-0 right-0 z-50 transition-all duration-300
        ${scrolled
          ? 'shadow-[0_4px_24px_rgba(45,26,0,0.35)]'
          : 'shadow-[0_2px_12px_rgba(45,26,0,0.20)]'}
      `}
      style={{
        background: scrolled
          ? 'linear-gradient(135deg, #7c3100 0%, #c04900 60%, #e86200 100%)'
          : 'linear-gradient(135deg, #9a3a00 0%, #e86200 60%, #ff9d40 100%)',
        borderBottom: '2px solid rgba(251,191,36,0.6)',
      }}
      role="banner"
    >
      <nav
        className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16"
        aria-label="Main navigation"
      >
        {/* ── Brand ─────────────────────────────── */}
        <a
          href="#home"
          className="flex items-center gap-3 group"
          aria-label="Kumawat Samaj — Home"
        >
          {/* Om Symbol */}
          <span
            className="text-3xl font-devanagari leading-none select-none text-gold-300 drop-shadow"
            aria-hidden="true"
          >
            <img src="./samaj_logo.svg" alt="om-symbol" width={"50px"} />
          </span>
          <div className="flex flex-col leading-tight">
            <span className="font-serif font-bold text-lg tracking-wide text-white drop-shadow-sm">
              Kumawat Samaj
            </span>
            <span className="font-devanagari text-xs tracking-wider text-gold-200/90">
              कुमावत समाज
            </span>
          </div>
        </a>

        {/* ── Desktop Links ─────────────────────── */}
        <ul className="hidden md:flex items-center gap-1" role="list">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="px-4 py-2 rounded-lg font-medium text-sm text-white/90 hover:text-white hover:bg-white/15 transition-all duration-200"
              >
                {link.label}
              </a>
            </li>
          ))}
          <li>
            <a
              href="#register"
              className="ml-3 px-5 py-2.5 rounded-xl font-bold text-sm bg-gold-400 text-kumawat-deep hover:bg-gold-300 shadow-[0_2px_10px_rgba(251,191,36,0.4)] transition-all duration-200 active:scale-95"
            >
              Join Now
            </a>
          </li>
        </ul>

        {/* ── Mobile Menu Toggle ────────────────── */}
        <button
          className="md:hidden p-2 rounded-lg text-white hover:bg-white/15 transition-colors duration-200"
          onClick={() => setMobileOpen((o) => !o)}
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={mobileOpen}
          aria-controls="mobile-menu"
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {/* ── Mobile Drawer ──────────────────────── */}
      {mobileOpen && (
        <div
          id="mobile-menu"
          style={{ background: 'linear-gradient(135deg, #7c3100 0%, #c04900 100%)', borderTop: '1px solid rgba(251,191,36,0.3)' }}
          className="md:hidden shadow-[0_8px_24px_rgba(45,26,0,0.3)]"
        >
          <ul className="max-w-6xl mx-auto px-4 py-4 flex flex-col gap-1" role="list">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={handleLinkClick}
                  className="block px-4 py-3 rounded-xl font-medium text-white/90 hover:bg-white/15 hover:text-white transition-colors duration-200"
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li className="pt-2">
              <a
                href="#register"
                onClick={handleLinkClick}
                className="block px-4 py-3 rounded-xl font-bold text-center text-kumawat-deep bg-gold-400 hover:bg-gold-300 shadow-[0_2px_8px_rgba(251,191,36,0.4)] transition-colors duration-200"
              >
                Join Now — Register
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  )
}
