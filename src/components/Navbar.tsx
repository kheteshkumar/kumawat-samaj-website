/**
 * @file Navbar.tsx
 * @description Two-tier sticky navbar:
 *   Row 1 — Logo | Nav links | Join Now CTA
 *   Row 2 — Community stats pills (Members, States, Goals, Villages)
 * Dark teal theme with animated count-up on first render.
 */

import React, { useEffect, useRef, useState } from 'react'
import { Menu, X, Users, MapPin, Target, Home } from 'lucide-react'

// ── Nav links ─────────────────────────────────────

const NAV_LINKS = [
  { href: '#home',     label: 'Home' },
  { href: '#goals',    label: 'Our Goals' },
  { href: '#register', label: 'Register' },
  { href: '#contact',  label: 'Contact' },
]

// ── Stats ─────────────────────────────────────────

const STATS = [
  { icon: <Users  size={12} />, value: 50000, suffix: '+', label: 'Members',          href: '#register', color: '#0ecbbc' },
  { icon: <MapPin size={12} />, value: 25,    suffix: '+', label: 'States',           href: undefined,   color: '#4ddcd2' },
  { icon: <Target size={12} />, value: 10,    suffix: '',  label: 'Community Goals',  href: '#goals',    color: '#0ecbbc' },
  { icon: <Home   size={12} />, value: 200,   suffix: '+', label: 'Villages',         href: undefined,   color: '#4ddcd2' },
]

// ── Count-up hook ─────────────────────────────────

function useCountUp(target: number, duration = 1200, trigger = false) {
  const [count, setCount] = useState(0)
  useEffect(() => {
    if (!trigger) return
    let start: number | null = null
    const tick = (ts: number) => {
      if (!start) start = ts
      const p = Math.min((ts - start) / duration, 1)
      const eased = 1 - Math.pow(1 - p, 3)
      setCount(Math.floor(eased * target))
      if (p < 1) requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
  }, [target, duration, trigger])
  return count
}

// ── StatPill ─────────────────────────────────────

interface StatPillProps {
  icon: React.ReactNode
  value: number
  suffix: string
  label: string
  href?: string
  color: string
  trigger: boolean
}

const StatPill: React.FC<StatPillProps> = ({ icon, value, suffix, label, href, color, trigger }) => {
  const count = useCountUp(value, 1200, trigger)
  const display = value >= 1000
    ? `${(count / 1000).toFixed(count >= value ? 0 : 1)}k`
    : `${count}`

  const pill = (
    <span
      className="inline-flex items-center gap-1.5 text-xs font-semibold transition-all duration-200 group"
      style={{ color: 'rgba(255,255,255,0.65)', cursor: href ? 'pointer' : 'default' }}
    >
      <span style={{ color }} className="transition-transform duration-200 group-hover:scale-110">
        {icon}
      </span>
      <span
        className="font-black tabular-nums"
        style={{ color, fontVariantNumeric: 'tabular-nums' }}
      >
        {display}{suffix}
      </span>
      <span>{label}</span>
    </span>
  )

  return href
    ? <a href={href} className="hover:opacity-100 opacity-85 transition-opacity">{pill}</a>
    : pill
}

// ── Navbar ────────────────────────────────────────

export const Navbar: React.FC = () => {
  const [scrolled,    setScrolled]    = useState(false)
  const [mobileOpen,  setMobileOpen]  = useState(false)
  const [countTrigger, setCountTrigger] = useState(false)
  const statsRef = useRef<HTMLDivElement>(null)

  // Scroll detection
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Trigger count-up once stats row is visible
  useEffect(() => {
    const el = statsRef.current
    if (!el) return
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setCountTrigger(true) },
      { threshold: 0.1 }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  const handleLinkClick = () => setMobileOpen(false)

  return (
    <header
      className="fixed left-0 right-0 z-50 transition-all duration-300"
      style={{
        top: 0,
        background: scrolled
          ? 'rgba(9, 22, 22, 0.98)'
          : 'rgba(11, 26, 26, 0.88)',
        backdropFilter: 'blur(18px)',
        borderBottom: '1px solid rgba(14,203,188,0.12)',
        boxShadow: scrolled ? '0 4px 32px rgba(0,0,0,0.55)' : 'none',
      }}
      role="banner"
    >

      {/* ══ Row 1 — Brand + Nav ═════════════════════ */}
      <nav
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-14"
        aria-label="Main navigation"
      >
        {/* Brand */}
        <a href="#home" className="flex items-center gap-3 shrink-0" aria-label="Kumawat Samaj — Home">
          <span className="leading-none select-none" aria-hidden="true">
          <img
              src="./logo.png"
              alt="Kumawat Samaj Logo"
              width="42px"
              height="42px"
              className="rounded-full object-cover"
              style={{ boxShadow: '0 0 10px rgba(14,203,188,0.30)' }}
            />
          </span>
          <div className="flex flex-col leading-tight">
            <span className="font-serif font-bold text-base tracking-wide text-white">Kumawat Samaj</span>
            <span className="font-devanagari text-[10px] tracking-wider" style={{ color: '#0ecbbc' }}>कुमावत समाज</span>
          </div>
        </a>

        {/* Desktop nav links */}
        <ul className="hidden md:flex items-center gap-1" role="list">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="px-3 py-1.5 rounded-lg font-medium text-sm transition-all duration-200"
                style={{ color: 'rgba(255,255,255,0.70)' }}
                onMouseEnter={e => {
                  ;(e.target as HTMLAnchorElement).style.color = '#ffffff'
                  ;(e.target as HTMLAnchorElement).style.background = 'rgba(255,255,255,0.07)'
                }}
                onMouseLeave={e => {
                  ;(e.target as HTMLAnchorElement).style.color = 'rgba(255,255,255,0.70)'
                  ;(e.target as HTMLAnchorElement).style.background = 'transparent'
                }}
              >
                {link.label}
              </a>
            </li>
          ))}
          <li>
            <a
              href="#register"
              className="ml-2 px-4 py-1.5 rounded-lg font-bold text-sm transition-all duration-200 active:scale-95"
              style={{ background: '#0ecbbc', color: '#0b1a1a', boxShadow: '0 2px 12px rgba(14,203,188,0.35)' }}
              onMouseEnter={e => {
                ;(e.target as HTMLAnchorElement).style.background = '#26d0c5'
                ;(e.target as HTMLAnchorElement).style.boxShadow = '0 4px 20px rgba(14,203,188,0.55)'
              }}
              onMouseLeave={e => {
                ;(e.target as HTMLAnchorElement).style.background = '#0ecbbc'
                ;(e.target as HTMLAnchorElement).style.boxShadow = '0 2px 12px rgba(14,203,188,0.35)'
              }}
            >
              Join Now
            </a>
          </li>
        </ul>

        {/* Mobile toggle */}
        <button
          className="md:hidden p-2 rounded-lg transition-colors duration-200"
          style={{ color: 'rgba(255,255,255,0.80)' }}
          onClick={() => setMobileOpen(o => !o)}
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={mobileOpen}
          aria-controls="mobile-menu"
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {/* ══ Row 2 — Stats bar ═══════════════════════ */}
      <div
        ref={statsRef}
        className="hidden sm:block border-t"
        style={{ borderColor: 'rgba(255,255,255,0.06)' }}
        aria-label="Community statistics"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-center gap-6 py-1.5">
          {STATS.map((stat, i) => (
            <React.Fragment key={stat.label}>
              <StatPill {...stat} trigger={countTrigger} />
              {i < STATS.length - 1 && (
                <span
                  className="text-xs select-none"
                  style={{ color: 'rgba(255,255,255,0.12)' }}
                  aria-hidden="true"
                >
                  |
                </span>
              )}
            </React.Fragment>
          ))}

          {/* Subtle pulse dot + tagline on the right */}
          <span
            className="ml-auto hidden lg:flex items-center gap-1.5 text-xs"
            style={{ color: 'rgba(255,255,255,0.30)' }}
          >
            <span
              className="w-1.5 h-1.5 rounded-full animate-pulse"
              style={{ background: '#0ecbbc' }}
              aria-hidden="true"
            />
            एकता • संस्कृति • विरासत
          </span>
        </div>
      </div>

      {/* ══ Mobile drawer ═══════════════════════════ */}
      {mobileOpen && (
        <div
          id="mobile-menu"
          style={{ background: '#0f2020', borderTop: '1px solid rgba(14,203,188,0.10)' }}
          className="md:hidden"
        >
          <ul className="max-w-7xl mx-auto px-4 py-4 flex flex-col gap-1" role="list">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={handleLinkClick}
                  className="block px-4 py-3 rounded-xl font-medium transition-colors duration-200"
                  style={{ color: 'rgba(255,255,255,0.75)' }}
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li className="pt-2">
              <a
                href="#register"
                onClick={handleLinkClick}
                className="block px-4 py-3 rounded-xl font-bold text-center transition-colors duration-200"
                style={{ background: '#0ecbbc', color: '#0b1a1a' }}
              >
                Join Now — Register
              </a>
            </li>

            {/* Stats in mobile drawer */}
            <li className="pt-4 pb-2">
              <div className="flex flex-wrap gap-3 px-2">
                {STATS.map((stat) => (
                  <StatPill key={stat.label} {...stat} trigger={countTrigger} />
                ))}
              </div>
            </li>
          </ul>
        </div>
      )}
    </header>
  )
}
