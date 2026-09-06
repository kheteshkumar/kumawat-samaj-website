/**
 * @file Spinner.tsx
 * @description Animated loading spinner with saffron/gold theming.
 */

import React from 'react'

type SpinnerSize = 'sm' | 'md' | 'lg' | 'xl'

interface SpinnerProps {
  size?: SpinnerSize
  /** Full-page overlay mode */
  overlay?: boolean
  label?: string
  className?: string
}

const sizeMap: Record<SpinnerSize, string> = {
  sm: 'w-4 h-4 border-2',
  md: 'w-8 h-8 border-2',
  lg: 'w-12 h-12 border-4',
  xl: 'w-16 h-16 border-4',
}

/**
 * `Spinner` — animated saffron ring spinner.
 *
 * @example
 * ```tsx
 * <Spinner size="lg" label="Submitting..." />
 * ```
 */
export const Spinner: React.FC<SpinnerProps> = ({
  size = 'md',
  overlay = false,
  label,
  className = '',
}) => {
  const spinner = (
    <div className={`flex flex-col items-center gap-3 ${className}`} role="status" aria-label={label ?? 'Loading'}>
      <div
        className={`
          ${sizeMap[size]} rounded-full
          border-saffron-200 border-t-saffron-500
          animate-spin
        `}
      />
      {label && (
        <p className="text-saffron-600 text-sm font-medium animate-pulse">{label}</p>
      )}
    </div>
  )

  if (overlay) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-kumawat-cream/80 backdrop-blur-sm">
        {spinner}
      </div>
    )
  }

  return spinner
}
