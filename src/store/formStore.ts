/**
 * @file formStore.ts
 * @description Zustand store for managing the multi-step member registration
 * form state, including current step, accumulated form data, and submission
 * status. This is the single source of truth for the entire form flow.
 */

import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import type { MemberFormData, Step1Data, Step2Data, Step3Data } from '../types/member'

// ──────────────────────────────────────────
// Constants
// ──────────────────────────────────────────

/** Total number of form steps */
export const TOTAL_STEPS = 3

/** Human-readable label for each step */
export const STEP_LABELS = [
  'Personal Info',
  'Address',
  'Family Details',
] as const

// ──────────────────────────────────────────
// Types
// ──────────────────────────────────────────

/** Possible states of the form submission */
export type SubmitStatus = 'idle' | 'loading' | 'success' | 'error'

/** Accumulated form data — merged from all steps progressively */
export type PartialFormData = Partial<MemberFormData>

/** Shape of the Zustand store */
interface FormState {
  // ── State ──────────────────────────────
  /** Current active step (1-indexed) */
  currentStep: number

  /** Accumulated form data from all steps */
  formData: PartialFormData

  /** Current submission status */
  submitStatus: SubmitStatus

  /** Error message on failed submission */
  submitError: string | null

  /** Registered member ID on success */
  registeredMemberId: string | null

  // ── Actions ────────────────────────────

  /** Advance to the next step */
  nextStep: () => void

  /** Go back to the previous step */
  prevStep: () => void

  /** Jump to a specific step (used by step indicator clicks) */
  goToStep: (step: number) => void

  /** Merge step data into the accumulated form data */
  updateFormData: (data: PartialFormData) => void

  /** Merge Step 1 data specifically */
  updateStep1: (data: Step1Data) => void

  /** Merge Step 2 data specifically */
  updateStep2: (data: Step2Data) => void

  /** Merge Step 3 data specifically */
  updateStep3: (data: Step3Data) => void

  /** Set the submission status */
  setSubmitStatus: (status: SubmitStatus) => void

  /** Set a submission error message */
  setSubmitError: (error: string | null) => void

  /** Set the registered member ID after successful submission */
  setRegisteredMemberId: (id: string) => void

  /** Reset the entire form back to initial state */
  resetForm: () => void
}

// ──────────────────────────────────────────
// Initial State
// ──────────────────────────────────────────

const initialState = {
  currentStep: 1,
  formData: {} as PartialFormData,
  submitStatus: 'idle' as SubmitStatus,
  submitError: null,
  registeredMemberId: null,
}

// ──────────────────────────────────────────
// Store
// ──────────────────────────────────────────

/**
 * `useFormStore` — Zustand store for the multi-step registration form.
 *
 * @example
 * ```tsx
 * const { currentStep, nextStep, updateStep1 } = useFormStore()
 * ```
 */
export const useFormStore = create<FormState>()(
  devtools(
    (set, _get) => ({
      ...initialState,

      nextStep: () =>
        set(
          (state) => ({
            currentStep: Math.min(state.currentStep + 1, TOTAL_STEPS),
          }),
          false,
          'nextStep'
        ),

      prevStep: () =>
        set(
          (state) => ({
            currentStep: Math.max(state.currentStep - 1, 1),
          }),
          false,
          'prevStep'
        ),

      goToStep: (step) =>
        set({ currentStep: Math.min(Math.max(step, 1), TOTAL_STEPS) }, false, 'goToStep'),

      updateFormData: (data) =>
        set(
          (state) => ({ formData: { ...state.formData, ...data } }),
          false,
          'updateFormData'
        ),

      updateStep1: (data) =>
        set(
          (state) => ({ formData: { ...state.formData, ...data } }),
          false,
          'updateStep1'
        ),

      updateStep2: (data) =>
        set(
          (state) => ({ formData: { ...state.formData, ...data } }),
          false,
          'updateStep2'
        ),

      updateStep3: (data) =>
        set(
          (state) => ({ formData: { ...state.formData, ...data } }),
          false,
          'updateStep3'
        ),

      setSubmitStatus: (status) =>
        set({ submitStatus: status }, false, 'setSubmitStatus'),

      setSubmitError: (error) =>
        set({ submitError: error }, false, 'setSubmitError'),

      setRegisteredMemberId: (id) =>
        set({ registeredMemberId: id }, false, 'setRegisteredMemberId'),

      resetForm: () =>
        set({ ...initialState }, false, 'resetForm'),
    }),
    { name: 'KumawatSamaj/FormStore' }
  )
)

// ──────────────────────────────────────────
// Selectors (for performance optimization)
// ──────────────────────────────────────────

/** Returns true if the current step is the last step */
export const selectIsLastStep = (state: FormState) =>
  state.currentStep === TOTAL_STEPS

/** Returns the completion percentage of the form (0–100) */
export const selectCompletionPercent = (state: FormState) =>
  Math.round((state.currentStep / TOTAL_STEPS) * 100)
