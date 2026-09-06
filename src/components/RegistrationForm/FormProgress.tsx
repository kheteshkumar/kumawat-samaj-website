/**
 * @file FormProgress.tsx
 * @description Visual step progress indicator for the multi-step registration form.
 * Shows completed, active, and pending steps with connecting lines and labels.
 */

import React from 'react'
import { Check } from 'lucide-react'
import { STEP_LABELS, TOTAL_STEPS } from '../../store/formStore'

interface FormProgressProps {
  currentStep: number
}

/**
 * `FormProgress` — horizontal step indicator with icons, labels, and connecting lines.
 *
 * @example
 * ```tsx
 * <FormProgress currentStep={2} />
 * ```
 */
export const FormProgress: React.FC<FormProgressProps> = ({ currentStep }) => {
  return (
    <div className="w-full px-4 py-6" role="progressbar" aria-valuenow={currentStep} aria-valuemin={1} aria-valuemax={TOTAL_STEPS}>
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
                  className={`
                    w-10 h-10 rounded-full flex items-center justify-center
                    font-bold text-sm transition-all duration-300 border-2
                    ${isComplete
                      ? 'bg-saffron-500 border-saffron-500 text-white shadow-saffron'
                      : isActive
                      ? 'bg-white border-saffron-500 text-saffron-600 shadow-saffron scale-110'
                      : 'bg-white border-saffron-200 text-saffron-300'}
                  `}
                  aria-label={`Step ${step}: ${label} — ${isComplete ? 'Completed' : isActive ? 'Current' : 'Upcoming'}`}
                >
                  {isComplete ? <Check size={16} strokeWidth={3} /> : step}
                </div>
                <span
                  className={`
                    text-xs font-semibold whitespace-nowrap transition-colors duration-300
                    ${isActive ? 'text-saffron-600' : isComplete ? 'text-saffron-500' : 'text-kumawat-deep/30'}
                  `}
                >
                  {label}
                </span>
              </div>

              {/* Connecting line (between steps) */}
              {index < TOTAL_STEPS - 1 && (
                <div
                  className={`
                    flex-1 h-0.5 mx-2 mt-[-18px] rounded-full transition-all duration-500
                    ${isComplete ? 'bg-saffron-400' : 'bg-saffron-100'}
                  `}
                  aria-hidden="true"
                />
              )}
            </React.Fragment>
          )
        })}
      </div>

      {/* Completion percentage */}
      <p className="text-center text-xs text-kumawat-deep/50 mt-4">
        Step {currentStep} of {TOTAL_STEPS} — {Math.round((currentStep / TOTAL_STEPS) * 100)}% complete
      </p>
    </div>
  )
}
