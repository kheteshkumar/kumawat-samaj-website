/**
 * @file member.ts
 * @description Zod validation schemas and TypeScript types for the Kumawat Samaj
 * member registration form. Each step has its own partial schema for
 * progressive validation.
 */

import { z } from 'zod'

// ──────────────────────────────────────────
// Enums / Literal Unions
// ──────────────────────────────────────────

/** Common Kumawat gotras (clan names) */
export const GOTRAS = [
  'Kashyap',
  'Bharadwaj',
  'Vashishtha',
  'Atri',
  'Gautam',
  'Vishwamitra',
  'Jamadagni',
  'Agastya',
  'Bhrigu',
  'Angira',
  'Shandilya',
  'Parashar',
  'Garg',
  'Kaushik',
  'Mudgal',
  'Upamanyu',
  'Other',
] as const

export type Gotra = typeof GOTRAS[number]

/** Marital status options */
export const MARITAL_STATUS = ['Single', 'Married', 'Widowed', 'Divorced'] as const
export type MaritalStatus = typeof MARITAL_STATUS[number]

// ──────────────────────────────────────────
// Step 1 — Personal Information Schema
// ──────────────────────────────────────────

export const step1Schema = z.object({
  /** Full legal name of the applicant */
  fullName: z
    .string()
    .min(2, 'Full name must be at least 2 characters')
    .max(80, 'Full name must not exceed 80 characters')
    .regex(/^[a-zA-Z\s.]+$/, 'Name must contain only letters, spaces, or dots'),

  /** Gotra (clan/lineage) of the applicant */
  gotra: z.enum(GOTRAS, { message: 'Please select a valid Gotra' }),

  /** 10-digit Indian mobile number (with or without +91 prefix) */
  mobile: z
    .string()
    .regex(/^(\+91[\-\s]?)?[6-9]\d{9}$/, 'Enter a valid 10-digit Indian mobile number'),

  /** Email address of the applicant */
  email: z
    .string()
    .email('Enter a valid email address')
    .max(100, 'Email must not exceed 100 characters'),
})

export type Step1Data = z.infer<typeof step1Schema>

// ──────────────────────────────────────────
// Step 2 — Residential Address Schema
// ──────────────────────────────────────────

export const step2Schema = z.object({
  /** House / Flat / Building number and street name */
  addressLine1: z
    .string()
    .min(5, 'Address line 1 must be at least 5 characters')
    .max(120, 'Address line 1 must not exceed 120 characters'),

  /** Locality, colony, or landmark (optional) */
  addressLine2: z
    .string()
    .max(120, 'Address line 2 must not exceed 120 characters')
    .optional(),

  /** City or town name */
  city: z
    .string()
    .min(2, 'City must be at least 2 characters')
    .max(60, 'City must not exceed 60 characters'),

  /** State of residence */
  state: z
    .string()
    .min(2, 'State must be at least 2 characters')
    .max(60, 'State must not exceed 60 characters'),

  /** 6-digit Indian PIN code */
  pinCode: z
    .string()
    .regex(/^[1-9][0-9]{5}$/, 'Enter a valid 6-digit PIN code'),
})

export type Step2Data = z.infer<typeof step2Schema>

// ──────────────────────────────────────────
// Step 3 — Family Details Schema
// ──────────────────────────────────────────

export const step3Schema = z.object({
  /** Marital status of the applicant */
  maritalStatus: z.enum(MARITAL_STATUS, { message: 'Please select your marital status' }),

  /** Number of children (0–20) */
  numberOfChildren: z
    .number({ message: 'Enter a valid number' })
    .min(0, 'Cannot be negative')
    .max(20, 'Please enter a realistic number')
    .int('Enter a whole number'),

  /** Father's full name */
  fatherName: z
    .string()
    .min(2, "Father's name must be at least 2 characters")
    .max(80, "Father's name must not exceed 80 characters")
    .regex(/^[a-zA-Z\s.]+$/, 'Name must contain only letters, spaces, or dots'),

  /** Spouse's full name (required only when married) */
  spouseName: z
    .string()
    .max(80, "Spouse's name must not exceed 80 characters")
    .optional(),

  /** Occupation of the applicant */
  occupation: z
    .string()
    .min(2, 'Occupation must be at least 2 characters')
    .max(80, 'Occupation must not exceed 80 characters'),

  /** Brief introduction or note the member wishes to add */
  bio: z
    .string()
    .max(500, 'Bio must not exceed 500 characters')
    .optional(),
})

export type Step3Data = z.infer<typeof step3Schema>

// ──────────────────────────────────────────
// Full Combined Schema (all 3 steps merged)
// ──────────────────────────────────────────

export const memberFormSchema = step1Schema.merge(step2Schema).merge(step3Schema)

export type MemberFormData = z.infer<typeof memberFormSchema>

// ──────────────────────────────────────────
// API Response Types
// ──────────────────────────────────────────

/** Shape of a successful API response */
export interface MemberRegistrationResponse {
  success: true
  memberId: string
  message: string
  registeredAt: string
}

/** Shape of an API error response */
export interface MemberRegistrationError {
  success: false
  code: string
  message: string
}
