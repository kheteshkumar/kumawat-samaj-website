/**
 * @file memberService.ts
 * @description Mock API service that simulates member registration submission.
 * Mimics a real REST API with:
 *  - Realistic async delay (1200–1800ms)
 *  - ~10% random failure rate for testing error states
 *  - Generated member ID in the response
 *
 * Replace `submitMemberRegistration` with a real `fetch()` / `axios` call
 * when connecting to a production backend.
 */

import type { MemberFormData, MemberRegistrationResponse } from '../types/member'

// ──────────────────────────────────────────
// Helpers
// ──────────────────────────────────────────

/** Simulated network delay between min and max milliseconds */
const delay = (min = 1200, max = 1800): Promise<void> =>
  new Promise((resolve) =>
    setTimeout(resolve, Math.floor(Math.random() * (max - min + 1)) + min)
  )

/** Generates a pseudo-unique member ID */
const generateMemberId = (): string => {
  const prefix = 'KS'
  const year = new Date().getFullYear()
  const random = Math.floor(100000 + Math.random() * 900000)
  return `${prefix}-${year}-${random}`
}

// ──────────────────────────────────────────
// Mock Error Codes
// ──────────────────────────────────────────

const MOCK_ERROR_MESSAGES = [
  'Mobile number is already registered with another member.',
  'Email address is already in use. Please use a different email.',
  'Server temporarily unavailable. Please try again in a few moments.',
]

// ──────────────────────────────────────────
// Service Function
// ──────────────────────────────────────────

/**
 * Submits member registration data to the (mock) API.
 *
 * @param data - Validated form data from all three steps
 * @returns Promise resolving to a `MemberRegistrationResponse`
 * @throws Error with a descriptive message on failure (10% probability)
 *
 * @example
 * ```ts
 * const result = await submitMemberRegistration(formData)
 * console.log(result.memberId) // "KS-2024-482931"
 * ```
 */
export async function submitMemberRegistration(
  data: MemberFormData
): Promise<MemberRegistrationResponse> {
  // Simulate network latency
  await delay()

  // Simulate ~10% failure rate
  if (Math.random() < 0.1) {
    const errorMessage =
      MOCK_ERROR_MESSAGES[Math.floor(Math.random() * MOCK_ERROR_MESSAGES.length)]
    throw new Error(errorMessage)
  }

  // Return successful response
  return {
    success: true,
    memberId: generateMemberId(),
    message: `Welcome to Kumawat Samaj, ${data.fullName}! Your membership has been registered successfully.`,
    registeredAt: new Date().toISOString(),
  }
}

/**
 * Fetches all registered members (mock).
 * Returns an empty array — replace with real API call.
 */
export async function fetchMembers(): Promise<{ id: string; name: string }[]> {
  await delay(300, 600)
  return []
}
