/**
 * @file Hero.tsx
 * @description Full-viewport Hero section — dark teal theme.
 * Deep charcoal background with vibrant teal accents and subtle radial glow.
 */

import React from 'react'
import { Users, Heart, Star, ChevronDown } from 'lucide-react'

// Community statistics shown in the stats bar
const COMMUNITY_STATS = [
  { value: '50,000+', label: 'Members', icon: <Users size={20} /> },
  { value: '200+', label: 'Villages', icon: <Star size={20} /> },
  { value: '500+', label: 'Years Legacy', icon: <Heart size={20} /> },
  { value: '25+', label: 'States', icon: <Star size={20} /> },
]

/**
 * `Hero` — full-viewport dark hero with teal accent and community stats.
 */
export const Hero: React.FC = () => {
  return (
    <section
      id="home"
      className="relative flex flex-col"
      style={{ background: 'linear-gradient(160deg, #0b1a1a 0%, #0f2020 60%, #0b1a1a 100%)' }}
      aria-label="Hero — Kumawat Samaj Welcome"
    >
      {/* ── Radial teal glow ───────────────────── */}
      <div
        className="absolute inset-0 pointer-events-none select-none"
        aria-hidden="true"
        style={{
          background: 'radial-gradient(ellipse 70% 50% at 50% 0%, rgba(14,203,188,0.10) 0%, transparent 70%)',
        }}
      />

      {/* ── Subtle grid pattern ─────────────────── */}
      <div
        className="absolute inset-0 pointer-events-none select-none opacity-[0.025]"
        aria-hidden="true"
        style={{
          backgroundImage: `linear-gradient(rgba(14,203,188,1) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(14,203,188,1) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
      />

      {/* ── Main content ──────────────────────────── */}
      <div className="relative z-10 flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 pt-28 pb-4 text-center">

        {/* Main Heading */}
        <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold leading-tight mb-4 animate-fade-in-up" style={{ color: '#ffffff' }}>
          <span className="block">कुमावत समाज</span>
          <span
            className="block mt-1 text-2xl sm:text-3xl md:text-4xl font-semibold"
            style={{
              background: 'linear-gradient(to right, #0ecbbc, #80e6df, #0ecbbc)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            Kumawat Samaj
          </span>
        </h1>


        <p
          className="text-sm sm:text-base max-w-lg mx-auto mb-5 animate-fade-in-up animate-delay-200"
          style={{ color: 'rgba(255,255,255,0.55)' }}
        >
          Uniting our community through heritage, values, and togetherness.
          Join thousands of Kumawat families across India in celebrating
          our rich cultural legacy.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up animate-delay-300">
          <a
            href="#register"
            className="inline-flex items-center justify-center gap-2 font-semibold text-sm px-6 py-2.5 rounded-lg transition-all duration-200 active:scale-95"
            style={{
              background: '#0ecbbc',
              color: '#0b1a1a',
              boxShadow: '0 4px 24px rgba(14,203,188,0.35)',
            }}
            onMouseEnter={e => {
              ; (e.currentTarget as HTMLAnchorElement).style.background = '#26d0c5'
                ; (e.currentTarget as HTMLAnchorElement).style.boxShadow = '0 8px 32px rgba(14,203,188,0.50)'
            }}
            onMouseLeave={e => {
              ; (e.currentTarget as HTMLAnchorElement).style.background = '#0ecbbc'
                ; (e.currentTarget as HTMLAnchorElement).style.boxShadow = '0 4px 24px rgba(14,203,188,0.35)'
            }}
          >
            🪔 Register as Member
          </a>
          <a
            href="#contact"
            className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-lg font-semibold text-sm transition-all duration-200 active:scale-95"
            style={{
              color: 'rgba(255,255,255,0.85)',
              background: 'rgba(255,255,255,0.06)',
              border: '1px solid rgba(255,255,255,0.12)',
            }}
            onMouseEnter={e => {
              ; (e.currentTarget as HTMLAnchorElement).style.background = 'rgba(255,255,255,0.10)'
                ; (e.currentTarget as HTMLAnchorElement).style.borderColor = 'rgba(14,203,188,0.30)'
            }}
            onMouseLeave={e => {
              ; (e.currentTarget as HTMLAnchorElement).style.background = 'rgba(255,255,255,0.06)'
                ; (e.currentTarget as HTMLAnchorElement).style.borderColor = 'rgba(255,255,255,0.12)'
            }}
          >
            Learn More
          </a>
        </div>

        {/* Scroll indicator */}
        <div className="mt-3 mb-1 animate-float animate-delay-500" aria-hidden="true">
          <ChevronDown size={18} className="mx-auto" style={{ color: 'rgba(14,203,188,0.4)' }} />
        </div>
      </div>

      {/* ── Community Stats Bar ───────────────────── */}
      <div
        className="relative z-10"
        style={{
          background: 'rgba(18,37,37,0.85)',
          backdropFilter: 'blur(12px)',
          borderTop: '1px solid rgba(14,203,188,0.10)',
        }}
      >
        <div className="max-w-4xl mx-auto px-4 py-5">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {COMMUNITY_STATS.map((stat) => (
              <div key={stat.label} className="text-center flex flex-col items-center justify-center gap-2">
                <div
                  className="p-3 rounded-xl mb-1"
                  style={{
                    background: 'rgba(14,203,188,0.10)',
                    color: '#0ecbbc',
                  }}
                >
                  {stat.icon}
                </div>
                <span
                  className="text-2xl sm:text-3xl font-bold font-serif"
                  style={{ color: '#ffffff' }}
                >
                  {stat.value}
                </span>
                <span
                  className="text-sm font-medium"
                  style={{ color: 'rgba(255,255,255,0.50)' }}
                >
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}