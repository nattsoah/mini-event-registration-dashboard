import { z } from 'zod'

export const createRegistrationSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  phone: z.string().optional(),
  event_name: z.string().min(1),
  notes: z.string().optional(),
})

export const updateStatusSchema = z.object({
  status: z.enum(['pending', 'confirmed', 'cancelled']),
})

export type CreateRegistrationInput = z.infer<typeof createRegistrationSchema>
export type UpdateStatusInput = z.infer<typeof updateStatusSchema>
