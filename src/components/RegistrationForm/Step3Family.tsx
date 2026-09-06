/**
 * @file Step3Family.tsx
 * @description Step 3 (final) of the registration form — Family Details.
 * Collects: Marital Status, Number of Children, Father's Name,
 *           Spouse's Name (conditional), Occupation, and Bio.
 * Submits combined form data via TanStack Query mutation.
 */

import React from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Heart, Briefcase } from 'lucide-react'
import { step3Schema, MARITAL_STATUS, type Step3Data, type MemberFormData } from '../../types/member'
import { useFormStore } from '../../store/formStore'
import { Input, Select, Textarea } from '../ui/Input'
import { Button } from '../ui/Button'
import { useMemberMutation } from '../../hooks/useMemberMutation'

/**
 * `Step3Family` — family details form step with conditional spouse field.
 * On valid submit, merges data and fires the TanStack Query mutation.
 */
export const Step3Family: React.FC = () => {
  const { formData, updateStep3, prevStep, submitStatus } = useFormStore()
  const { mutate, isPending } = useMemberMutation()

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<Step3Data>({
    resolver: zodResolver(step3Schema),
    defaultValues: {
      maritalStatus:    formData.maritalStatus    ?? undefined,
      numberOfChildren: formData.numberOfChildren ?? 0,
      fatherName:       formData.fatherName       ?? '',
      spouseName:       formData.spouseName       ?? '',
      occupation:       formData.occupation       ?? '',
      bio:              formData.bio              ?? '',
    },
  })

  const maritalStatus = watch('maritalStatus')
  const bioValue      = watch('bio') ?? ''
  const showSpouse    = maritalStatus === 'Married'

  const onSubmit = (data: Step3Data) => {
    updateStep3(data)
    // Merge all accumulated form data with fresh step3 data
    const fullData: MemberFormData = {
      ...(formData as MemberFormData),
      ...data,
    }
    mutate(fullData)
  }

  const maritalOptions = MARITAL_STATUS.map((s) => ({ value: s, label: s }))

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5" id="step3-form">
      {/* Section header */}
      <div className="flex items-center gap-3 mb-6 pb-4 border-b border-saffron-100">
        <div className="w-10 h-10 rounded-xl bg-saffron-100 flex items-center justify-center text-saffron-600">
          <Heart size={20} />
        </div>
        <div>
          <h3 className="font-semibold text-kumawat-deep">Family Details</h3>
          <p className="text-xs text-kumawat-deep/50">Help us know your family background</p>
        </div>
      </div>

      {/* Marital Status + Children count */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <Select
          label="Marital Status"
          placeholder="— Select Status —"
          options={maritalOptions}
          error={errors.maritalStatus?.message}
          required
          {...register('maritalStatus')}
        />

        <Input
          label="Number of Children"
          type="number"
          min={0}
          max={20}
          placeholder="0"
          error={errors.numberOfChildren?.message}
          required
          {...register('numberOfChildren', { valueAsNumber: true })}
        />
      </div>

      {/* Father's Name + Spouse Name (conditional) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <Input
          label="Father's Full Name"
          placeholder="e.g. Suresh Kumar Kumawat"
          error={errors.fatherName?.message}
          required
          {...register('fatherName')}
        />

        {showSpouse ? (
          <Input
            label="Spouse's Full Name"
            placeholder="e.g. Kavita Devi Kumawat"
            error={errors.spouseName?.message}
            hint="Required for married members"
            {...register('spouseName')}
          />
        ) : (
          <div /> /* placeholder to keep grid alignment */
        )}
      </div>

      {/* Occupation */}
      <Input
        label="Occupation / Profession"
        placeholder="e.g. Software Engineer, Farmer, Teacher, Business"
        leftIcon={<Briefcase size={16} />}
        error={errors.occupation?.message}
        required
        {...register('occupation')}
      />

      {/* Bio (optional) */}
      <Textarea
        label="Brief Introduction (Optional)"
        placeholder="Share a few words about yourself, your interests, or what you'd like to contribute to the community..."
        rows={4}
        maxLength={500}
        currentLength={bioValue.length}
        error={errors.bio?.message}
        hint="Optional but encouraged — helps other members know you better"
        {...register('bio')}
      />

      {/* Submit-level error */}
      {submitStatus === 'error' && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-sm text-red-700 animate-fade-in">
          ⚠️ Submission failed. Please try again. If the problem persists, contact support.
        </div>
      )}

      {/* Navigation */}
      <div className="flex justify-between pt-4">
        <Button type="button" variant="secondary" onClick={prevStep} disabled={isPending} leftIcon={<span>←</span>}>
          Back
        </Button>
        <Button
          type="submit"
          variant="gold"
          loading={isPending}
          disabled={isPending}
        >
          {isPending ? 'Submitting...' : '🪔 Complete Registration'}
        </Button>
      </div>
    </form>
  )
}
