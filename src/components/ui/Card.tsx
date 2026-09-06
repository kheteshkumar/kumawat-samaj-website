/**
 * @file Card.tsx
 * @description Reusable card component variants for the Kumawat Samaj UI.
 * Includes floating, contact, and stat card variants.
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
 *
 * @example
 * ```tsx
 * <Card hoverable className="p-6">Content</Card>
 * ```
 */
export const Card: React.FC<CardProps> = ({
  children,
  className = '',
  hoverable = false,
  glass = false,
}) => {
  const base = glass
    ? 'bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl'
    : 'bg-white/80 backdrop-blur-sm border border-saffron-100 rounded-2xl shadow-card'
  const hover = hoverable ? 'transition-all duration-300 hover:shadow-warm hover:-translate-y-1' : ''

  return (
    <div className={`${base} ${hover} ${className}`}>
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
 * Optionally wraps in an anchor tag.
 */
export const ContactCard: React.FC<ContactCardProps> = ({
  icon,
  title,
  lines,
  href,
  accentColor = 'bg-saffron-100 text-saffron-600',
}) => {
  const inner = (
    <div className="floating-card p-6 flex flex-col items-center text-center gap-4">
      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${accentColor}`}>
        {icon}
      </div>
      <div>
        <h3 className="font-semibold text-kumawat-deep text-lg mb-2">{title}</h3>
        {lines.map((line, i) => (
          <p key={i} className="text-kumawat-deep/70 text-sm leading-relaxed">
            {line}
          </p>
        ))}
      </div>
    </div>
  )

  if (href) {
    return (
      <a href={href} className="block" target="_blank" rel="noopener noreferrer">
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
 * `StatCard` — displays a key statistic with a label.
 */
export const StatCard: React.FC<StatCardProps> = ({ value, label, icon }) => (
  <div className="flex flex-col items-center gap-1 text-center">
    {icon && <div className="text-gold-300 mb-1">{icon}</div>}
    <span className="text-3xl md:text-4xl font-bold text-gradient-gold font-serif">{value}</span>
    <span className="text-gold-200/80 text-sm font-medium tracking-wide uppercase">{label}</span>
  </div>
)
