/**
 * @file Hero.tsx
 * @description Full-viewport Hero section with a warm vanilla/cream gradient
 * background, community stats, and a prominent "Register Now" call-to-action button.
 */

import React from 'react'
import { Users, Heart, Star, ChevronDown } from 'lucide-react'
import { StatCard } from './ui/Card'

// Community statistics shown in the stats bar
const COMMUNITY_STATS = [
  { value: '50,000+', label: 'Members', icon: <Users size={20} className="text-amber-700" /> },
  { value: '200+', label: 'Villages', icon: <Star size={20} className="text-amber-700" /> },
  { value: '500+', label: 'Years Legacy', icon: <Heart size={20} className="text-amber-700" /> },
  { value: '25+', label: 'States', icon: <Star size={20} className="text-amber-700" /> },
]

/**
 * `Hero` — full-viewport hero with vanilla gradient and styled copy.
 */
export const Hero: React.FC = () => {
  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col bg-gradient-to-br from-stone-50 via-amber-50/60 to-orange-50/30 text-stone-900"
      aria-label="Hero — Kumawat Samaj Welcome"
    >
      {/* ── Decorative subtle watermark pattern ───── */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none select-none"
        aria-hidden="true"
        style={{
          // backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120' viewBox='0 0 120 120'%3E%3Ctext x='60' y='80' text-anchor='middle' font-size='64' fill='%2378350f' font-family='serif'%3Eॐ%3C/text%3E%3C/svg%3E")`,
          backgroundSize: '160px 160px',
        }}
      />

      {/* ── Main content ──────────────────────────── */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 pt-24 pb-16 text-center">

        {/* Om Badge */}
        <div
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/80 backdrop-blur-md border border-amber-200/60 shadow-sm mb-8 animate-fade-in"
          aria-label="Auspicious greeting — Kumawat Samaj"
        >
          <span className="text-amber-900 text-sm font-medium tracking-widest uppercase">
            कुमावत समाज • हमारी पहचान, हमारा गौरव
          </span>
        </div>

        {/* Main Heading */}
        <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-stone-900 leading-tight mb-6 animate-fade-in-up">
          <span className="block">कुमावत समाज</span>
          <span className="block text-amber-700 mt-2 text-3xl sm:text-4xl md:text-5xl font-semibold">
            Kumawat Samaj
          </span>
        </h1>

        {/* Tagline */}
        <p
          className="text-amber-900/90 text-lg sm:text-xl md:text-2xl font-semibold max-w-2xl mx-auto mb-4 animate-fade-in-up animate-delay-100"
        >
          एकता • संस्कृति • विरासत
        </p>
        <p
          className="text-stone-600 text-base sm:text-lg max-w-xl mx-auto mb-10 animate-fade-in-up animate-delay-200"
        >
          Uniting our community through heritage, values, and togetherness.
          Join thousands of Kumawat families across India in celebrating
          our rich cultural legacy.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up animate-delay-300">
          <a
            href="#register"
            className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white font-semibold text-base px-8 py-4 rounded-xl shadow-md hover:shadow-lg transition-all duration-200"
          >
            🪔 Register as Member
          </a>
          <a
            href="#contact"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-semibold text-base text-stone-800 bg-white/70 hover:bg-white border-2 border-stone-200 shadow-sm transition-all duration-200"
          >
            Learn More
          </a>
        </div>

        {/* Scroll indicator */}
        <div className="mt-16 animate-float animate-delay-500" aria-hidden="true">
          <ChevronDown size={28} className="text-amber-800/60 mx-auto" />
        </div>
      </div>

      {/* ── Community Stats Bar ───────────────────── */}
      <div className="relative z-10 bg-white/80 backdrop-blur-md border-t border-amber-900/10 shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-stone-900">
            {COMMUNITY_STATS.map((stat) => (
              <div key={stat.label} className="text-center flex flex-col items-center justify-center">
                <div className="p-3 rounded-xl bg-amber-100/60 text-amber-800 mb-2">
                  {stat.icon}
                </div>
                <span className="text-2xl sm:text-3xl font-bold font-serif text-stone-900">
                  {stat.value}
                </span>
                <span className="text-sm font-medium text-stone-600 mt-1">
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