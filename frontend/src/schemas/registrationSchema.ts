import { z } from 'zod'

export const createRegistrationSchema = z.object({
  firstName: z.string()
    .trim()
    .min(2, 'First name must be at least 2 characters')
    .max(50, 'First name is too long'),
  lastName: z.string()
    .trim()
    .min(2, 'Last name must be at least 2 characters')
    .max(50, 'Last name is too long'),
  email: z.string()
    .min(1, 'Email is required')
    .email('Invalid email address'),
  phone: z.string()
    .regex(/^0[0-9]{9}$/, 'Phone number must be 10 digits starting with 0')
    .optional()
    .or(z.literal('')),
  event_name: z.string()
    .min(1, 'Please select an event'),
  notes: z.string()
    .max(500, 'Notes cannot exceed 500 characters')
    .optional()
    .or(z.literal('')),
})

export const updateStatusSchema = z.object({
  status: z.enum(['pending', 'confirmed', 'cancelled']),
})

export type CreateRegistrationInput = z.infer<typeof createRegistrationSchema>
export type UpdateStatusInput = z.infer<typeof updateStatusSchema>
