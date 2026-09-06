/**
 * @file Button.tsx
 * @description Reusable button component with saffron/gold variants.
 */

import React from 'react'
import { Loader2 } from 'lucide-react'

type Variant = 'primary' | 'secondary' | 'gold' | 'ghost'
type Size    = 'sm' | 'md' | 'lg'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant
  size?: Size
  loading?: boolean
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
}

const variantClasses: Record<Variant, string> = {
  primary:
    'btn-primary',
  secondary:
    'btn-secondary',
  gold:
    'btn-gold',
  ghost:
    'inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold text-saffron-600 hover:bg-saffron-50 active:scale-95 transition-all duration-200 disabled:opacity-60',
}

const sizeClasses: Record<Size, string> = {
  sm: 'text-xs px-4 py-2',
  md: '',   // base size from variant
  lg: 'text-base px-8 py-4',
}

/**
 * `Button` — styled button with loading state, icon slots, and variants.
 *
 * @example
 * ```tsx
 * <Button variant="primary" loading={isPending}>Submit</Button>
 * <Button variant="secondary" leftIcon={<ArrowLeft size={16} />}>Back</Button>
 * ```
 */
export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  loading = false,
  leftIcon,
  rightIcon,
  children,
  disabled,
  className = '',
  ...props
}) => {
  return (
    <button
      className={`${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <Loader2 size={16} className="animate-spin" />
      ) : (
        leftIcon
      )}
      {children}
      {!loading && rightIcon}
    </button>
  )
}
