/**
 * @file Step2Address.tsx
 * @description Step 2 of the registration form — Residential Address.
 * Collects: Address Line 1, Address Line 2 (optional), City, State, PIN Code.
 * Validates using Zod's `step2Schema` via react-hook-form.
 */

import React from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { MapPin, Building2, Hash } from 'lucide-react'
import { step2Schema, type Step2Data } from '../../types/member'
import { useFormStore } from '../../store/formStore'
import { Input } from '../ui/Input'
import { Button } from '../ui/Button'

// Indian states list for the state dropdown (using Input instead of restricted Select)
const INDIAN_STATES = [
  'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
  'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka',
  'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram',
  'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu',
  'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal',
  'Delhi', 'Jammu & Kashmir', 'Ladakh',
]

/**
 * `Step2Address` — residential address form step.
 * Navigates back to Step 1 and forwards to Step 3.
 */
export const Step2Address: React.FC = () => {
  const { formData, updateStep2, nextStep, prevStep } = useFormStore()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Step2Data>({
    resolver: zodResolver(step2Schema),
    defaultValues: {
      addressLine1: formData.addressLine1 ?? '',
      addressLine2: formData.addressLine2 ?? '',
      city:         formData.city         ?? '',
      state:        formData.state        ?? '',
      pinCode:      formData.pinCode      ?? '',
    },
  })

  const onSubmit = (data: Step2Data) => {
    updateStep2(data)
    nextStep()
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5" id="step2-form">
      {/* Section header */}
      <div className="flex items-center gap-3 mb-6 pb-4 border-b border-saffron-100">
        <div className="w-10 h-10 rounded-xl bg-saffron-100 flex items-center justify-center text-saffron-600">
          <MapPin size={20} />
        </div>
        <div>
          <h3 className="font-semibold text-kumawat-deep">Residential Address</h3>
          <p className="text-xs text-kumawat-deep/50">Your current place of residence</p>
        </div>
      </div>

      {/* Address Line 1 */}
      <Input
        label="Address Line 1"
        placeholder="House No., Building, Street Name"
        leftIcon={<Building2 size={16} />}
        error={errors.addressLine1?.message}
        required
        autoComplete="address-line1"
        {...register('addressLine1')}
      />

      {/* Address Line 2 (optional) */}
      <Input
        label="Address Line 2"
        placeholder="Locality, Colony, Landmark (optional)"
        leftIcon={<MapPin size={16} />}
        error={errors.addressLine2?.message}
        autoComplete="address-line2"
        hint="Optional — area, colony, or nearby landmark"
        {...register('addressLine2')}
      />

      {/* City, State, PIN — responsive grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <Input
          label="City / Town"
          placeholder="e.g. Jaipur"
          error={errors.city?.message}
          required
          autoComplete="address-level2"
          {...register('city')}
        />

        {/* State — using datalist for suggestions */}
        <div className="form-field">
          <label htmlFor="state-input" className="form-label">
            State <span className="text-saffron-500">*</span>
          </label>
          <input
            id="state-input"
            list="states-list"
            placeholder="e.g. Rajasthan"
            className={`form-input ${errors.state ? 'error' : ''}`}
            autoComplete="address-level1"
            {...register('state')}
          />
          <datalist id="states-list">
            {INDIAN_STATES.map((s) => (
              <option key={s} value={s} />
            ))}
          </datalist>
          {errors.state && (
            <p className="form-error" role="alert">
              {errors.state.message}
            </p>
          )}
        </div>

        <Input
          label="PIN Code"
          placeholder="e.g. 302001"
          leftIcon={<Hash size={16} />}
          error={errors.pinCode?.message}
          required
          maxLength={6}
          inputMode="numeric"
          pattern="[0-9]*"
          autoComplete="postal-code"
          {...register('pinCode')}
        />
      </div>

      {/* Navigation */}
      <div className="flex justify-between pt-4">
        <Button type="button" variant="secondary" onClick={prevStep} leftIcon={<span>←</span>}>
          Back
        </Button>
        <Button type="submit" variant="primary" rightIcon={<span>→</span>}>
          Next Step
        </Button>
      </div>
    </form>
  )
}
