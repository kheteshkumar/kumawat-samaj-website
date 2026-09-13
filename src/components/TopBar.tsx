/**
 * @file TopBar.tsx
 * @description Slim community-stats announcement bar pinned above the Navbar.
 * Shows member count, states, goals, and villages with animated number
 * count-up on first render. Collapses to a scrolling ticker on mobile.
 */

import React, { useEffect, useRef, useState } from 'react'
import { Users, MapPin, Target, Home } from 'lucide-react'

// ── Stat definition ───────────────────────────────

interface Stat {
  icon: React.ReactNode
  value: number
  suffix: string
  label: string
  href?: string
  color: string
}

const STATS: Stat[] = [
  {
    icon: <Users size={13} />,
    value: 50000,
    suffix: '+',
    label: 'Members',
    href: '#register',
    color: '#0ecbbc',
  },
  {
    icon: <MapPin size={13} />,
    value: 25,
    suffix: '+',
    label: 'States',
    color: '#4ddcd2',
  },
  {
    icon: <Target size={13} />,
    value: 10,
    suffix: '',
    label: 'Community Goals',
    href: '#goals',
    color: '#0ecbbc',
  },
  {
    icon: <Home size={13} />,
    value: 200,
    suffix: '+',
    label: 'Villages',
    color: '#4ddcd2',
  },
]

// ── Animated counter hook ─────────────────────────

function useCountUp(target: number, duration = 1400, start = false) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!start) return
    let startTime: number | null = null
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / duration, 1)
      // Ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.floor(eased * target))
      if (progress < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }, [target, duration, start])

  return count
}

// ── StatPill ─────────────────────────────────────

interface StatPillProps extends Stat {
  animate: boolean
}

const StatPill: React.FC<StatPillProps> = ({
  icon, value, suffix, label, href, color, animate,
}) => {
  const count = useCountUp(value, 1400, animate)

  const formatted =
    value >= 1000
      ? `${(count / 1000).toFixed(count >= value ? 0 : 1)}k`
      : `${count}`

  const inner = (
    <span
      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold transition-all duration-200 whitespace-nowrap"
      style={{
        background: 'rgba(255,255,255,0.05)',
        border: `1px solid rgba(255,255,255,0.09)`,
        color: 'rgba(255,255,255,0.80)',
        cursor: href ? 'pointer' : 'default',
      }}
      onMouseEnter={e => {
        if (!href) return
        ;(e.currentTarget as HTMLSpanElement).style.background = 'rgba(14,203,188,0.12)'
        ;(e.currentTarget as HTMLSpanElement).style.borderColor = 'rgba(14,203,188,0.30)'
        ;(e.currentTarget as HTMLSpanElement).style.color = '#ffffff'
      }}
      onMouseLeave={e => {
        if (!href) return
        ;(e.currentTarget as HTMLSpanElement).style.background = 'rgba(255,255,255,0.05)'
        ;(e.currentTarget as HTMLSpanElement).style.borderColor = 'rgba(255,255,255,0.09)'
        ;(e.currentTarget as HTMLSpanElement).style.color = 'rgba(255,255,255,0.80)'
      }}
    >
      {/* icon */}
      <span style={{ color }}>{icon}</span>

      {/* number */}
      <span style={{ color, fontVariantNumeric: 'tabular-nums' }}>
        {formatted}{suffix}
      </span>

      {/* label */}
      <span style={{ color: 'rgba(255,255,255,0.55)' }}>{label}</span>
    </span>
  )

  if (href) {
    return <a href={href}>{inner}</a>
  }
  return inner
}

// ── TopBar ────────────────────────────────────────

/**
 * `TopBar` — sticky announcement bar above the main Navbar.
 */
export const TopBar: React.FC = () => {
  const [animate, setAnimate] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  // Trigger count-up when bar enters viewport
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setAnimate(true) },
      { threshold: 0.1 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      className="fixed top-0 left-0 right-0 z-[60]"
      style={{
        background: 'rgba(7, 15, 15, 0.96)',
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid rgba(14,203,188,0.12)',
      }}
      aria-label="Community statistics bar"
    >
      {/* ── Desktop: single centred row ── */}
      <div className="hidden sm:flex items-center justify-center gap-2 px-4 py-1.5 max-w-7xl mx-auto">
        {STATS.map((stat, i) => (
          <React.Fragment key={stat.label}>
            <StatPill {...stat} animate={animate} />
            {i < STATS.length - 1 && (
              <span
                className="text-xs select-none"
                style={{ color: 'rgba(255,255,255,0.15)' }}
                aria-hidden="true"
              >
                •
              </span>
            )}
          </React.Fragment>
        ))}

        {/* Right side CTA */}
        <a
          href="#register"
          className="ml-4 text-xs font-bold px-3 py-1 rounded-full transition-all duration-200"
          style={{
            background: 'rgba(14,203,188,0.15)',
            border: '1px solid rgba(14,203,188,0.35)',
            color: '#0ecbbc',
          }}
          onMouseEnter={e => {
            ;(e.currentTarget as HTMLAnchorElement).style.background = '#0ecbbc'
            ;(e.currentTarget as HTMLAnchorElement).style.color = '#0b1a1a'
          }}
          onMouseLeave={e => {
            ;(e.currentTarget as HTMLAnchorElement).style.background = 'rgba(14,203,188,0.15)'
            ;(e.currentTarget as HTMLAnchorElement).style.color = '#0ecbbc'
          }}
        >
          Join Free →
        </a>
      </div>

      {/* ── Mobile: scrolling ticker ── */}
      <div className="sm:hidden overflow-hidden py-1.5 px-4">
        <div
          className="flex gap-4 w-max"
          style={{ animation: 'tickerScroll 18s linear infinite' }}
        >
          {/* Double the items so the loop is seamless */}
          {[...STATS, ...STATS].map((stat, i) => (
            <StatPill key={`${stat.label}-${i}`} {...stat} animate={animate} />
          ))}
        </div>
      </div>

      {/* Ticker keyframe injected inline */}
      <style>{`
        @keyframes tickerScroll {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  )
}
