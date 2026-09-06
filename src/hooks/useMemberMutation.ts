/**
 * @file useMemberMutation.ts
 * @description TanStack Query `useMutation` hook for submitting member
 * registration data. Handles loading state, success toast, and error toast
 * automatically, and syncs results back to the Zustand form store.
 */

import { useMutation } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import { submitMemberRegistration } from '../services/memberService'
import { useFormStore } from '../store/formStore'
import type { MemberFormData, MemberRegistrationResponse } from '../types/member'

// ──────────────────────────────────────────
// Hook
// ──────────────────────────────────────────

/**
 * `useMemberMutation` — wraps TanStack Query's `useMutation` to submit
 * member registration and orchestrate UI feedback.
 *
 * @returns TanStack Query mutation object with `mutate`, `isPending`, etc.
 *
 * @example
 * ```tsx
 * const { mutate, isPending } = useMemberMutation()
 * mutate(validFormData)
 * ```
 */
export function useMemberMutation() {
  const { setSubmitStatus, setSubmitError, setRegisteredMemberId } = useFormStore()

  return useMutation<MemberRegistrationResponse, Error, MemberFormData>({
    /**
     * The async function that performs the mutation.
     * TanStack Query will track its pending/success/error state.
     */
    mutationFn: submitMemberRegistration,

    /**
     * Called before the mutation function executes.
     * Update Zustand status to "loading" and dismiss prior toasts.
     */
    onMutate: () => {
      setSubmitStatus('loading')
      setSubmitError(null)
      toast.dismiss()
    },

    /**
     * Called when the mutation resolves successfully.
     * Shows a success toast and stores the member ID in Zustand.
     */
    onSuccess: (data: MemberRegistrationResponse) => {
      setSubmitStatus('success')
      setRegisteredMemberId(data.memberId)
      toast.success(
        `Registration Successful!\n${data.message}\nMember ID: ${data.memberId}`,
        {
          duration: 8000,
          style: {
            background: '#f0fdf4',
            border: '1px solid #86efac',
            padding: '16px',
            maxWidth: '400px',
            whiteSpace: 'pre-line',
            fontSize: '14px',
          },
          iconTheme: {
            primary: '#22c55e',
            secondary: '#f0fdf4',
          },
        }
      )
    },

    /**
     * Called when the mutation throws an error.
     * Shows an error toast and stores the error in Zustand.
     */
    onError: (error: Error) => {
      setSubmitStatus('error')
      setSubmitError(error.message)
      toast.error(
        `Registration Failed\n${error.message}`,
        {
          duration: 6000,
          style: {
            background: '#fef2f2',
            border: '1px solid #fca5a5',
            padding: '16px',
            maxWidth: '400px',
            whiteSpace: 'pre-line',
            fontSize: '14px',
          },
          iconTheme: {
            primary: '#ef4444',
            secondary: '#fef2f2',
          },
        }
      )
    },
  })
}
