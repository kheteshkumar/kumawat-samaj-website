/**
 * @file Card.tsx
 * @description Reusable card component variants — dark teal theme.
 */

import React from 'react'

// ── Base Card ─────────────────────────────

interface CardProps {
  children: React.ReactNode
  className?: string
  /** Enable the hover-lift animation */
  hoverable?: boolean
  /** Use glassmorphism style */
  glass?: boolean
}

/**
 * `Card` — base card with optional hover lift and glassmorphism.
 */
export const Card: React.FC<CardProps> = ({
  children,
  className = '',
  hoverable = false,
  glass = false,
}) => {
  const base = glass
    ? 'backdrop-blur-md rounded-2xl'
    : 'rounded-2xl'

  const style: React.CSSProperties = glass
    ? {
      background: 'rgba(255,255,255,0.05)',
      border: '1px solid rgba(255,255,255,0.10)',
      boxShadow: '0 2px 16px rgba(0,0,0,0.40)',
    }
    : {
      background: '#122525',
      border: '1px solid rgba(255,255,255,0.07)',
      boxShadow: '0 2px 16px rgba(0,0,0,0.40)',
    }

  const hover = hoverable ? 'transition-all duration-300 hover:-translate-y-1' : ''

  return (
    <div className={`${base} ${hover} ${className}`} style={style}>
      {children}
    </div>
  )
}

// ── Contact Card ──────────────────────────

interface ContactCardProps {
  icon: React.ReactNode
  title: string
  lines: string[]
  href?: string
  accentColor?: string
}

/**
 * `ContactCard` — displays an icon, title, and contact lines.
 * Dark surface with teal icon accent.
 */
export const ContactCard: React.FC<ContactCardProps> = ({
  icon,
  title,
  lines,
  href,
}) => {
  const inner = (
    <div
      className="h-full p-8 flex flex-col items-center text-center gap-5 rounded-2xl transition-all duration-300 cursor-default"
      style={{
        background: '#122525',
        border: '1px solid rgba(255,255,255,0.07)',
        boxShadow: '0 2px 16px rgba(0,0,0,0.40)',
      }}
      onMouseEnter={e => {
        ;(e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(14,203,188,0.20)'
          ;(e.currentTarget as HTMLDivElement).style.transform = 'translateY(-4px)'
          ;(e.currentTarget as HTMLDivElement).style.boxShadow = '0 8px 32px rgba(0,0,0,0.55)'
      }}
      onMouseLeave={e => {
        ;(e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(255,255,255,0.07)'
          ;(e.currentTarget as HTMLDivElement).style.transform = 'translateY(0)'
          ;(e.currentTarget as HTMLDivElement).style.boxShadow = '0 2px 16px rgba(0,0,0,0.40)'
      }}
    >
      <div
        className="w-16 h-16 rounded-2xl flex items-center justify-center flex-shrink-0"
        style={{ background: 'rgba(14,203,188,0.12)', color: '#0ecbbc' }}
      >
        {icon}
      </div>
      <div>
        <h3 className="font-semibold text-lg mb-2" style={{ color: '#ffffff' }}>{title}</h3>
        {lines.map((line, i) => (
          <p key={i} className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.55)' }}>
            {line}
          </p>
        ))}
      </div>
    </div>
  )

  if (href) {
    return (
      <a href={href} className="block h-full" target="_blank" rel="noopener noreferrer">
        {inner}
      </a>
    )
  }

  return inner
}

// ── Stat Card ─────────────────────────────

interface StatCardProps {
  value: string
  label: string
  icon?: React.ReactNode
}

/**
 * `StatCard` — displays a key statistic with a teal gradient value.
 */
export const StatCard: React.FC<StatCardProps> = ({ value, label, icon }) => (
  <div className="flex flex-col items-center gap-1 text-center">
    {icon && (
      <div style={{ color: '#0ecbbc' }} className="mb-1">{icon}</div>
    )}
    <span
      className="text-3xl md:text-4xl font-bold font-serif"
      style={{
        background: 'linear-gradient(to right, #0ecbbc, #80e6df, #0ecbbc)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text',
      }}
    >
      {value}
    </span>
    <span
      className="text-sm font-medium tracking-wide uppercase"
      style={{ color: 'rgba(255,255,255,0.50)' }}
    >
      {label}
    </span>
  </div>
)
