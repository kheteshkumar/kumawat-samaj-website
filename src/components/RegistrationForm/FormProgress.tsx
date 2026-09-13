/**
 * @file FormProgress.tsx
 * @description Visual step progress indicator — dark teal theme.
 */

import React from 'react'
import { Check } from 'lucide-react'
import { STEP_LABELS, TOTAL_STEPS } from '../../store/formStore'

interface FormProgressProps {
  currentStep: number
}

/**
 * `FormProgress` — horizontal step indicator with teal active/complete states.
 *
 * @example
 * ```tsx
 * <FormProgress currentStep={2} />
 * ```
 */
export const FormProgress: React.FC<FormProgressProps> = ({ currentStep }) => {
  return (
    <div
      className="w-full px-4 py-6"
      role="progressbar"
      aria-valuenow={currentStep}
      aria-valuemin={1}
      aria-valuemax={TOTAL_STEPS}
    >
      <div className="flex items-center justify-between max-w-sm mx-auto">
        {STEP_LABELS.map((label, index) => {
          const step       = index + 1
          const isComplete = step < currentStep
          const isActive   = step === currentStep

          return (
            <React.Fragment key={step}>
              {/* Step circle + label */}
              <div className="flex flex-col items-center gap-2 relative">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300"
                  style={
                    isComplete
                      ? {
                          background: '#0ecbbc',
                          border: '2px solid #0ecbbc',
                          color: '#0b1a1a',
                          boxShadow: '0 0 16px rgba(14,203,188,0.40)',
                        }
                      : isActive
                      ? {
                          background: 'rgba(14,203,188,0.12)',
                          border: '2px solid #0ecbbc',
                          color: '#0ecbbc',
                          boxShadow: '0 0 16px rgba(14,203,188,0.30)',
                          transform: 'scale(1.10)',
                        }
                      : {
                          background: 'rgba(255,255,255,0.04)',
                          border: '2px solid rgba(255,255,255,0.15)',
                          color: 'rgba(255,255,255,0.30)',
                        }
                  }
                  aria-label={`Step ${step}: ${label} — ${isComplete ? 'Completed' : isActive ? 'Current' : 'Upcoming'}`}
                >
                  {isComplete ? <Check size={16} strokeWidth={3} /> : step}
                </div>
                <span
                  className="text-xs font-semibold whitespace-nowrap transition-colors duration-300"
                  style={{
                    color: isActive
                      ? '#0ecbbc'
                      : isComplete
                      ? 'rgba(14,203,188,0.70)'
                      : 'rgba(255,255,255,0.25)',
                  }}
                >
                  {label}
                </span>
              </div>

              {/* Connecting line */}
              {index < TOTAL_STEPS - 1 && (
                <div
                  className="flex-1 mx-2 mt-[-18px] rounded-full transition-all duration-500"
                  style={{
                    height: '2px',
                    background: isComplete
                      ? 'linear-gradient(to right, #0ecbbc, rgba(14,203,188,0.50))'
                      : 'rgba(255,255,255,0.08)',
                  }}
                  aria-hidden="true"
                />
              )}
            </React.Fragment>
          )
        })}
      </div>

      {/* Completion percentage */}
      <p className="text-center text-xs mt-4" style={{ color: 'rgba(255,255,255,0.35)' }}>
        Step {currentStep} of {TOTAL_STEPS} — {Math.round((currentStep / TOTAL_STEPS) * 100)}% complete
      </p>
    </div>
  )
}
