/**
 * @file Step1Personal.tsx
 * @description Step 1 of the registration form — Personal Information.
 * Collects: Full Name, Gotra, Mobile Number, and Email.
 * Validates using Zod's `step1Schema` via react-hook-form.
 */

import React from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { User, Phone, Mail, Sparkles } from 'lucide-react'
import { step1Schema, GOTRAS, type Step1Data } from '../../types/member'
import { useFormStore } from '../../store/formStore'
import { Input, Select } from '../ui/Input'
import { Button } from '../ui/Button'

/**
 * `Step1Personal` — personal information form step with Zod validation.
 * On valid submission, saves data to Zustand and advances the step.
 */
export const Step1Personal: React.FC = () => {
  const { formData, updateStep1, nextStep } = useFormStore()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Step1Data>({
    resolver: zodResolver(step1Schema),
    defaultValues: {
      fullName: formData.fullName ?? '',
      gotra:    formData.gotra,
      mobile:   formData.mobile ?? '',
      email:    formData.email  ?? '',
    },
  })

  const onSubmit = (data: Step1Data) => {
    updateStep1(data)
    nextStep()
  }

  const gotraOptions = GOTRAS.map((g) => ({ value: g, label: g }))

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5" id="step1-form">
      {/* Section header */}
      <div className="flex items-center gap-3 mb-6 pb-4 border-b border-saffron-100">
        <div className="w-10 h-10 rounded-xl bg-saffron-100 flex items-center justify-center text-saffron-600">
          <Sparkles size={20} />
        </div>
        <div>
          <h3 className="font-semibold text-kumawat-deep">Personal Information</h3>
          <p className="text-xs text-kumawat-deep/50">Tell us about yourself</p>
        </div>
      </div>

      {/* Full Name */}
      <Input
        label="Full Name"
        placeholder="e.g. Ramesh Kumar Kumawat"
        leftIcon={<User size={16} />}
        error={errors.fullName?.message}
        required
        autoComplete="name"
        {...register('fullName')}
      />

      {/* Gotra */}
      <Select
        label="Gotra (Clan Lineage)"
        placeholder="— Select your Gotra —"
        options={gotraOptions}
        error={errors.gotra?.message}
        required
        {...register('gotra')}
      />

      {/* Mobile & Email — 2 column on md+ */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <Input
          label="Mobile Number"
          placeholder="+91 9876543210"
          type="tel"
          leftIcon={<Phone size={16} />}
          error={errors.mobile?.message}
          required
          autoComplete="tel"
          hint="10-digit Indian number"
          {...register('mobile')}
        />

        <Input
          label="Email Address"
          placeholder="you@example.com"
          type="email"
          leftIcon={<Mail size={16} />}
          error={errors.email?.message}
          required
          autoComplete="email"
          {...register('email')}
        />
      </div>

      {/* Navigation */}
      <div className="flex justify-end pt-4">
        <Button type="submit" variant="primary" rightIcon={<span>→</span>}>
          Next Step
        </Button>
      </div>
    </form>
  )
}
