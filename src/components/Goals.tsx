/**
 * @file Goals.tsx
 * @description Community Goals section — SDG-style colorful numbered cards
 * showcasing the Kumawat Samaj organisation's mission pillars.
 * Dark teal page background with vibrant per-card accent colours.
 */

import React, { useState } from 'react'
import {
  Users,
  BookOpen,
  Landmark,
  TrendingUp,
  Heart,
  Smartphone,
  Leaf,
  ShieldCheck,
  Star,
  Globe,
} from 'lucide-react'

// ── Goal data ─────────────────────────────────────

interface Goal {
  id: number
  title: string
  description: string
  icon: React.ReactNode
  color: string        // card background
  lightColor: string   // icon backdrop / badge
}

const GOALS: Goal[] = [
  {
    id: 1,
    title: 'Community Unity',
    description: 'Bring every Kumawat family under one umbrella, fostering bonds across states and generations.',
    icon: <Users size={40} strokeWidth={1.5} />,
    color: '#c0392b',
    lightColor: 'rgba(255,255,255,0.18)',
  },
  {
    id: 2,
    title: 'Education for All',
    description: 'Fund scholarships and coaching for students from economically weaker sections of our community.',
    icon: <BookOpen size={40} strokeWidth={1.5} />,
    color: '#d4a017',
    lightColor: 'rgba(255,255,255,0.18)',
  },
  {
    id: 3,
    title: 'Cultural Preservation',
    description: 'Document, celebrate and transmit our 500+ year heritage through festivals, archives, and arts.',
    icon: <Landmark size={40} strokeWidth={1.5} />,
    color: '#27ae60',
    lightColor: 'rgba(255,255,255,0.18)',
  },
  {
    id: 4,
    title: 'Economic Growth',
    description: 'Connect artisans & entrepreneurs with markets, mentors, and micro-finance opportunities.',
    icon: <TrendingUp size={40} strokeWidth={1.5} />,
    color: '#8e1a1a',
    lightColor: 'rgba(255,255,255,0.18)',
  },
  {
    id: 5,
    title: 'Women Empowerment',
    description: 'Support women through skill development, self-help groups, and leadership programmes.',
    icon: <ShieldCheck size={40} strokeWidth={1.5} />,
    color: '#e67e22',
    lightColor: 'rgba(255,255,255,0.18)',
  },
  {
    id: 6,
    title: 'Health & Welfare',
    description: 'Organise free health camps, insurance drives, and welfare funds for elderly and needy members.',
    icon: <Heart size={40} strokeWidth={1.5} />,
    color: '#0e8fb5',
    lightColor: 'rgba(255,255,255,0.18)',
  },
  {
    id: 7,
    title: 'Youth Development',
    description: 'Sports leagues, leadership retreats, and career guidance to shape the next generation.',
    icon: <Star size={40} strokeWidth={1.5} />,
    color: '#7d3c98',
    lightColor: 'rgba(255,255,255,0.18)',
  },
  {
    id: 8,
    title: 'Digital Connectivity',
    description: 'Build a digital member directory, event portal, and mobile app to keep the community connected.',
    icon: <Smartphone size={40} strokeWidth={1.5} />,
    color: '#1a7a6e',
    lightColor: 'rgba(255,255,255,0.18)',
  },
  {
    id: 9,
    title: 'Environmental Care',
    description: 'Plant trees, promote clean villages, and lead eco-friendly festival celebrations.',
    icon: <Leaf size={40} strokeWidth={1.5} />,
    color: '#1e8449',
    lightColor: 'rgba(255,255,255,0.18)',
  },
  {
    id: 10,
    title: 'Global Outreach',
    description: 'Connect the Kumawat diaspora across the globe and celebrate our culture on the world stage.',
    icon: <Globe size={40} strokeWidth={1.5} />,
    color: '#1a5276',
    lightColor: 'rgba(255,255,255,0.18)',
  },
]

// ── GoalCard ──────────────────────────────────────

interface GoalCardProps extends Goal {
  delay: number
}

const GoalCard: React.FC<GoalCardProps> = ({
  id,
  title,
  description,
  icon,
  color,
  lightColor,
  delay,
}) => {
  const [hovered, setHovered] = useState(false)

  return (
    <div
      className="relative rounded-2xl overflow-hidden cursor-pointer select-none animate-fade-in-up"
      style={{
        background: color,
        animationDelay: `${delay}ms`,
        transform: hovered ? 'translateY(-6px) scale(1.02)' : 'translateY(0) scale(1)',
        boxShadow: hovered
          ? `0 16px 40px rgba(0,0,0,0.50), 0 0 0 2px ${color}80`
          : '0 4px 20px rgba(0,0,0,0.35)',
        transition: 'transform 0.25s ease, box-shadow 0.25s ease',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* ── Number badge (top-left) ── */}
      <div className="absolute top-4 left-4 flex items-start gap-1">
        <span
          className="font-black leading-none"
          style={{ fontSize: '3rem', color: 'rgba(255,255,255,0.92)', lineHeight: 1 }}
        >
          {id}
        </span>
      </div>

      {/* ── Title (top-right of number) ── */}
      <div className="pt-4 pr-4 pl-20 pb-2">
        <h3
          className="font-black uppercase leading-tight"
          style={{
            fontSize: '0.78rem',
            letterSpacing: '0.06em',
            color: 'rgba(255,255,255,0.95)',
          }}
        >
          {title}
        </h3>
      </div>

      {/* ── Icon (centred) ── */}
      <div className="flex items-center justify-center py-5">
        <div
          className="rounded-2xl flex items-center justify-center"
          style={{
            background: lightColor,
            width: 80,
            height: 80,
            color: '#ffffff',
          }}
        >
          {icon}
        </div>
      </div>

      {/* ── Hover description overlay ── */}
      <div
        className="absolute inset-0 flex items-end p-4 transition-opacity duration-300"
        style={{
          background: `linear-gradient(to top, rgba(0,0,0,0.75) 0%, transparent 55%)`,
          opacity: hovered ? 1 : 0,
        }}
      >
        <p
          className="text-xs leading-relaxed"
          style={{ color: 'rgba(255,255,255,0.90)' }}
        >
          {description}
        </p>
      </div>
    </div>
  )
}

// ── Goals section ─────────────────────────────────

/**
 * `Goals` — SDG-style community goals grid section.
 */
export const Goals: React.FC = () => {
  return (
    <section
      id="goals"
      className="py-20 px-4 sm:px-6 lg:px-8"
      style={{ background: 'linear-gradient(180deg, #0f2020 0%, #0b1a1a 100%)' }}
      aria-labelledby="goals-heading"
    >
      <div className="max-w-7xl mx-auto">

        {/* ── Section header ── */}
        <div className="text-center mb-14">
          <div className="om-divider">
            <span style={{ color: '#0ecbbc', fontSize: '1.25rem' }}>🪷</span>
          </div>

          {/* SDG-style rainbow strip */}
          <div className="flex justify-center gap-1 mb-6" aria-hidden="true">
            {['#c0392b','#d4a017','#27ae60','#8e1a1a','#e67e22',
              '#0e8fb5','#7d3c98','#1a7a6e','#1e8449','#1a5276'].map((c) => (
              <div
                key={c}
                className="h-2 rounded-full flex-1 max-w-[36px]"
                style={{ background: c }}
              />
            ))}
          </div>

          <h2
            id="goals-heading"
            className="section-title mb-3"
          >
            Our Community Goals
          </h2>
          <p
            className="text-base max-w-xl mx-auto"
            style={{ color: 'rgba(255,255,255,0.50)' }}
          >
            Ten pillars that guide the Kumawat Samaj towards a stronger,
            more united, and prosperous future.
          </p>
          <p
            className="text-xs mt-2 font-devanagari"
            style={{ color: 'rgba(255,255,255,0.30)' }}
          >
            (कार्ड पर माउस ले जाएँ — लक्ष्य विवरण देखें)
          </p>
        </div>

        {/* ── Goals grid ── */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-5">
          {GOALS.map((goal, index) => (
            <GoalCard key={goal.id} {...goal} delay={index * 60} />
          ))}
        </div>

        {/* ── Bottom CTA ── */}
        <div className="text-center mt-14">
          <p
            className="text-sm mb-5"
            style={{ color: 'rgba(255,255,255,0.45)' }}
          >
            Be part of the mission — register today and help us achieve these goals together.
          </p>
          <a
            href="#register"
            className="btn-primary inline-flex"
            style={{ gap: '0.5rem' }}
          >
            🌟 Join the Mission
          </a>
        </div>

      </div>
    </section>
  )
}
