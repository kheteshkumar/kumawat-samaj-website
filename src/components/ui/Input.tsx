/**
 * @file Input.tsx
 * @description Reusable form input component with label, error message,
 * and optional icon. Supports text, email, tel, and textarea variants.
 */

import React from 'react'
import { AlertCircle } from 'lucide-react'

// ── Text / Tel / Email Input ─────────────────────

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  hint?: string
  leftIcon?: React.ReactNode
  wrapperClassName?: string
}

/**
 * `Input` — styled form input with label, inline error, and icon slot.
 *
 * @example
 * ```tsx
 * <Input label="Full Name" error={errors.fullName?.message} {...register('fullName')} />
 * ```
 */
export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, hint, leftIcon, wrapperClassName = '', className = '', id, ...props }, ref) => {
    const inputId = id ?? label?.toLowerCase().replace(/\s+/g, '-')
    return (
      <div className={`form-field ${wrapperClassName}`}>
        {label && (
          <label htmlFor={inputId} className="form-label">
            {label}
            {props.required && <span className="text-saffron-500 ml-0.5">*</span>}
          </label>
        )}
        <div className="relative">
          {leftIcon && (
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-saffron-400">
              {leftIcon}
            </span>
          )}
          <input
            id={inputId}
            ref={ref}
            className={`form-input ${leftIcon ? 'pl-10' : ''} ${error ? 'error' : ''} ${className}`}
            aria-invalid={!!error}
            aria-describedby={error ? `${inputId}-error` : undefined}
            {...props}
          />
        </div>
        {hint && !error && (
          <p className="text-xs text-kumawat-deep/50">{hint}</p>
        )}
        {error && (
          <p id={`${inputId}-error`} className="form-error" role="alert">
            <AlertCircle size={12} />
            {error}
          </p>
        )}
      </div>
    )
  }
)
Input.displayName = 'Input'

// ── Select ────────────────────────────────────────

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string
  error?: string
  options: { value: string; label: string }[]
  placeholder?: string
  wrapperClassName?: string
}

/**
 * `Select` — styled select dropdown with label and error.
 */
export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, error, options, placeholder, wrapperClassName = '', className = '', id, ...props }, ref) => {
    const selectId = id ?? label?.toLowerCase().replace(/\s+/g, '-')
    return (
      <div className={`form-field ${wrapperClassName}`}>
        {label && (
          <label htmlFor={selectId} className="form-label">
            {label}
            {props.required && <span className="text-saffron-500 ml-0.5">*</span>}
          </label>
        )}
        <select
          id={selectId}
          ref={ref}
          className={`form-input appearance-none cursor-pointer ${error ? 'error' : ''} ${className}`}
          aria-invalid={!!error}
          {...props}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        {error && (
          <p className="form-error" role="alert">
            <AlertCircle size={12} />
            {error}
          </p>
        )}
      </div>
    )
  }
)
Select.displayName = 'Select'

// ── Textarea ──────────────────────────────────────

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
  error?: string
  hint?: string
  wrapperClassName?: string
  maxLength?: number
  currentLength?: number
}

/**
 * `Textarea` — styled textarea with optional character counter.
 */
export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, hint, wrapperClassName = '', className = '', id, maxLength, currentLength, ...props }, ref) => {
    const textareaId = id ?? label?.toLowerCase().replace(/\s+/g, '-')
    return (
      <div className={`form-field ${wrapperClassName}`}>
        {label && (
          <label htmlFor={textareaId} className="form-label">
            {label}
          </label>
        )}
        <textarea
          id={textareaId}
          ref={ref}
          maxLength={maxLength}
          className={`form-input resize-none ${error ? 'error' : ''} ${className}`}
          aria-invalid={!!error}
          {...props}
        />
        <div className="flex justify-between items-center">
          {hint && !error && (
            <p className="text-xs text-kumawat-deep/50">{hint}</p>
          )}
          {error && (
            <p className="form-error" role="alert">
              <AlertCircle size={12} />
              {error}
            </p>
          )}
          {maxLength && (
            <p className="text-xs text-kumawat-deep/40 ml-auto">
              {currentLength ?? 0}/{maxLength}
            </p>
          )}
        </div>
      </div>
    )
  }
)
Textarea.displayName = 'Textarea'
