/**
 * @file RegistrationForm/index.tsx
 * @description Container component that orchestrates the 3-step registration
 * form. Reads `currentStep` from Zustand, renders the correct step component,
 * and shows a success screen after submission.
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
      className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-kumawat-cream to-saffron-50"
      aria-labelledby="register-heading"
    >
      <div className="max-w-2xl mx-auto">

        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="om-divider">
            <span className="text-2xl text-saffron-400 font-devanagari">ॐ</span>
          </div>
          <h2 id="register-heading" className="section-title mb-3">
            Become a Member
          </h2>
          <p className="text-kumawat-deep/60 text-base max-w-lg mx-auto">
            Join the Kumawat Samaj community. Fill in the form below to
            complete your membership registration.
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-warm border border-saffron-100 overflow-hidden">

          {/* Success Screen */}
          {submitStatus === 'success' ? (
            <div className="p-10 text-center animate-fade-in">
              {/* Animated checkmark */}
              <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6 animate-float">
                <CheckCircle2 size={40} className="text-green-500" />
              </div>

              <h3 className="font-serif text-2xl font-bold text-kumawat-deep mb-2">
                🎉 Welcome to the Family!
              </h3>
              <p className="text-kumawat-deep/60 mb-4">
                Your membership has been successfully registered.
              </p>

              {registeredMemberId && (
                <div className="inline-flex flex-col items-center gap-1 px-6 py-3 bg-saffron-50 border border-saffron-200 rounded-xl mb-8">
                  <span className="text-xs text-saffron-600 font-medium uppercase tracking-wider">Member ID</span>
                  <span className="font-mono text-xl font-bold text-saffron-700">{registeredMemberId}</span>
                  <span className="text-xs text-kumawat-deep/40">Save this ID for future reference</span>
                </div>
              )}

              <div className="om-divider">
                <span className="text-saffron-300 font-devanagari">ॐ</span>
              </div>

              <p className="text-sm text-kumawat-deep/50 mb-6">
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
              <div className="border-b border-saffron-100 bg-saffron-50/50">
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
        <p className="text-center text-xs text-kumawat-deep/40 mt-4">
          🔒 Your information is kept confidential and used only for community records.
        </p>
      </div>
    </section>
  )
}
