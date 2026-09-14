/**
 * @file RegistrationForm/index.tsx
 * @description Container component for the 3-step registration form — dark teal theme.
 */

import React from 'react'
import { useFormStore } from '../../store/formStore'
import { FormProgress } from './FormProgress'
import { Step1Personal } from './Step1Personal'
import { Step2Address } from './Step2Address'
import { Step3Family } from './Step3Family'
import { CheckCircle2, RefreshCw } from 'lucide-react'
import { Button } from '../ui/Button'

/** Map step numbers to their corresponding form components */
const STEP_COMPONENTS: Record<number, React.FC> = {
  1: Step1Personal,
  2: Step2Address,
  3: Step3Family,
}

/**
 * `RegistrationForm` — top-level form container with step routing and success view.
 */
export const RegistrationForm: React.FC = () => {
  const { currentStep, submitStatus, registeredMemberId, resetForm } = useFormStore()

  const ActiveStep = STEP_COMPONENTS[currentStep]

  return (
    <section
      id="register"
      className="pt-14 pb-20 px-4 sm:px-6 lg:px-8"
      style={{ background: 'linear-gradient(180deg, #0b1a1a 0%, #0f2020 50%, #0b1a1a 100%)' }}
      aria-labelledby="register-heading"
    >
      <div className="max-w-2xl mx-auto">

        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="om-divider">
            <span style={{ color: '#0ecbbc', fontSize: '1.25rem' }}>🪷</span>
          </div>
          <h2 id="register-heading" className="section-title mb-3">
            Become a Member
          </h2>
          <p className="text-base max-w-lg mx-auto" style={{ color: 'rgba(255,255,255,0.50)' }}>
            Join the Kumawat Samaj community. Fill in the form below to
            complete your membership registration.
          </p>
        </div>

        {/* Form Card */}
        <div
          className="rounded-3xl overflow-hidden"
          style={{
            background: '#122525',
            border: '1px solid rgba(255,255,255,0.08)',
            boxShadow: '0 8px 48px rgba(0,0,0,0.50)',
          }}
        >

          {/* Success Screen */}
          {submitStatus === 'success' ? (
            <div className="p-10 text-center animate-fade-in">
              {/* Animated checkmark */}
              <div
                className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 animate-float"
                style={{ background: 'rgba(14,203,188,0.12)' }}
              >
                <CheckCircle2 size={40} style={{ color: '#0ecbbc' }} />
              </div>

              <h3 className="font-serif text-2xl font-bold mb-2" style={{ color: '#ffffff' }}>
                🎉 Welcome to the Family!
              </h3>
              <p className="mb-4" style={{ color: 'rgba(255,255,255,0.55)' }}>
                Your membership has been successfully registered.
              </p>

              {registeredMemberId && (
                <div
                  className="inline-flex flex-col items-center gap-1 px-6 py-3 rounded-xl mb-8"
                  style={{
                    background: 'rgba(14,203,188,0.10)',
                    border: '1px solid rgba(14,203,188,0.20)',
                  }}
                >
                  <span
                    className="text-xs font-medium uppercase tracking-wider"
                    style={{ color: 'rgba(14,203,188,0.80)' }}
                  >
                    Member ID
                  </span>
                  <span className="font-mono text-xl font-bold" style={{ color: '#0ecbbc' }}>
                    {registeredMemberId}
                  </span>
                  <span className="text-xs" style={{ color: 'rgba(255,255,255,0.35)' }}>
                    Save this ID for future reference
                  </span>
                </div>
              )}

              <div className="om-divider">
                <span style={{ color: 'rgba(14,203,188,0.50)', fontSize: '1.25rem' }}>🪷</span>
              </div>

              <p className="text-sm mb-6" style={{ color: 'rgba(255,255,255,0.40)' }}>
                जय कुमावत समाज 🙏
              </p>

              <Button
                variant="secondary"
                onClick={resetForm}
                leftIcon={<RefreshCw size={16} />}
              >
                Register Another Member
              </Button>
            </div>
          ) : (
            <>
              {/* Progress Indicator */}
              <div style={{ borderBottom: '1px solid rgba(255,255,255,0.07)', background: 'rgba(255,255,255,0.02)' }}>
                <FormProgress currentStep={currentStep} />
              </div>

              {/* Active Step */}
              <div className="p-6 sm:p-8">
                {ActiveStep && <ActiveStep />}
              </div>
            </>
          )}
        </div>

        {/* Privacy note */}
        <p className="text-center text-xs mt-4" style={{ color: 'rgba(255,255,255,0.30)' }}>
          🔒 Your information is kept confidential and used only for community records.
        </p>
      </div>
    </section>
  )
}
