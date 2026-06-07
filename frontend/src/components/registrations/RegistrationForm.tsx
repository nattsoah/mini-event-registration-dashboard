'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { User, Mail, Phone, Calendar, FileText, Send, AlertCircle } from 'lucide-react'
import { createRegistrationSchema, CreateRegistrationInput } from '@/schemas/registrationSchema'
import api from '@/lib/axios'
import MySwal, { confirmDialog } from '@/lib/swal'
import { cn } from '@/lib/utils'

export function RegistrationForm() {
  const router = useRouter()
  const [isSubmitting, setIsUpdating] = useState(false)
  const [serverError, setServerError] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty },
  } = useForm<CreateRegistrationInput>({
    resolver: zodResolver(createRegistrationSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      event_name: '',
      notes: '',
    }
  })

  const handleReset = async () => {
    if (!isDirty) return

    const result = await confirmDialog({
      title: 'Clear Form?',
      text: 'All information you have entered will be lost.',
      confirmButtonText: 'Yes, Clear it',
      confirmButtonColor: '#e11d48', // Rose-600
    })

    if (result.isConfirmed) {
      reset()
      setServerError(null)
    }
  }

  const onSubmit = async (data: CreateRegistrationInput) => {
    // 1. Show confirmation dialog before proceeding
    const result = await confirmDialog({
      title: 'Confirm Registration',
      text: `Are you sure you want to register ${data.firstName} ${data.lastName} for ${data.event_name}?`,
      confirmButtonText: 'Yes, Register Now',
      confirmButtonColor: '#4f46e5', // Indigo-600
    })

    if (!result.isConfirmed) return

    setIsUpdating(true)
    setServerError(null)
    try {
      // Merge first and last name into a single 'name' field for the backend API
      const payload = {
        name: `${data.firstName.trim()} ${data.lastName.trim()}`,
        email: data.email,
        phone: data.phone,
        event_name: data.event_name,
        notes: data.notes,
      }

      await api.post('/api/registrations', payload)
      
      await MySwal.fire({
        icon: 'success',
        title: 'Registration Created!',
        text: 'The attendee has been successfully registered.',
        timer: 2000,
        showConfirmButton: false,
        customClass: { popup: 'rounded-2xl border-none' }
      })
      
      router.push('/registrations')
      router.refresh()
    } catch (err: unknown) {
      console.error('Failed to create registration', err)
      let message = 'An unexpected error occurred'
      
      if (err && typeof err === 'object' && 'response' in err) {
        const axiosError = err as { response: { data?: { message?: string } } }
        message = axiosError.response.data?.message || message
      }
      
      setServerError(message)
      
      MySwal.fire({
        icon: 'error',
        title: 'Submission Failed',
        text: message,
        customClass: { popup: 'rounded-2xl border-none' }
      })
    } finally {
      setIsUpdating(false)
    }
  }

  const inputClasses = (hasError: boolean) => cn(
    "w-full pl-11 pr-4 py-3 bg-white border rounded-xl outline-none transition-all duration-200",
    hasError 
      ? "border-rose-300 focus:border-rose-500 focus:ring-4 focus:ring-rose-500/10" 
      : "border-gray-200 focus:border-primary focus:ring-4 focus:ring-primary/10"
  )

  const labelClasses = "block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 ml-1"
  
  const RequiredStar = () => <span className="text-rose-500 ml-1">*</span>

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      {serverError && (
        <div className="p-4 bg-rose-50 border border-rose-100 rounded-2xl flex items-start gap-3 animate-in fade-in slide-in-from-top-2">
          <AlertCircle className="w-5 h-5 text-rose-500 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-rose-600 font-medium">{serverError}</p>
        </div>
      )}

      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100 bg-gray-50/50">
          <h3 className="font-bold text-gray-900">Personal Information</h3>
        </div>
        <div className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* First Name Field */}
            <div className="space-y-1">
              <label className={labelClasses}>First Name <RequiredStar /></label>
              <div className="relative group">
                <User className={cn("absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors", errors.firstName ? "text-rose-400" : "text-gray-400 group-focus-within:text-primary")} />
                <input
                  {...register('firstName')}
                  placeholder="e.g. John"
                  className={inputClasses(!!errors.firstName)}
                />
              </div>
              {errors.firstName && <p className="text-xs font-medium text-rose-500 mt-1 ml-1">{errors.firstName.message}</p>}
            </div>

            {/* Last Name Field */}
            <div className="space-y-1">
              <label className={labelClasses}>Last Name <RequiredStar /></label>
              <div className="relative group">
                <User className={cn("absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors", errors.lastName ? "text-rose-400" : "text-gray-400 group-focus-within:text-primary")} />
                <input
                  {...register('lastName')}
                  placeholder="e.g. Doe"
                  className={inputClasses(!!errors.lastName)}
                />
              </div>
              {errors.lastName && <p className="text-xs font-medium text-rose-500 mt-1 ml-1">{errors.lastName.message}</p>}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Email Field */}
            <div className="space-y-1">
              <label className={labelClasses}>Email Address <RequiredStar /></label>
              <div className="relative group">
                <Mail className={cn("absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors", errors.email ? "text-rose-400" : "text-gray-400 group-focus-within:text-primary")} />
                <input
                  {...register('email')}
                  type="email"
                  placeholder="e.g. john@example.com"
                  className={inputClasses(!!errors.email)}
                />
              </div>
              {errors.email && <p className="text-xs font-medium text-rose-500 mt-1 ml-1">{errors.email.message}</p>}
            </div>

            {/* Phone Field */}
            <div className="space-y-1">
              <label className={labelClasses}>Phone Number</label>
              <div className="relative group">
                <Phone className={cn("absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors", errors.phone ? "text-rose-400" : "text-gray-400 group-focus-within:text-primary")} />
                <input
                  {...register('phone', {
                    onChange: (e) => {
                      // Remove non-numeric characters and limit to 10 digits
                      e.target.value = e.target.value.replace(/[^0-9]/g, '').slice(0, 10)
                    }
                  })}
                  type="text"
                  inputMode="numeric"
                  placeholder="e.g. 0812345678"
                  className={inputClasses(!!errors.phone)}
                />
              </div>
              {errors.phone && <p className="text-xs font-medium text-rose-500 mt-1 ml-1">{errors.phone.message}</p>}
            </div>

          </div>

          {/* Event Field */}
          <div className="space-y-1">
            <label className={labelClasses}>Event Selection <RequiredStar /></label>
            <div className="relative group">
              <Calendar className={cn("absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors", errors.event_name ? "text-rose-400" : "text-gray-400 group-focus-within:text-primary")} />
              <select
                {...register('event_name')}
                className={cn(inputClasses(!!errors.event_name), "appearance-none")}
              >
                <option value="">Select an event...</option>
                <option value="Bangkok Tech Summit 2024">Bangkok Tech Summit 2024</option>
                <option value="Digital Marketing Expo">Digital Marketing Expo</option>
                <option value="Cloud Native Workshop">Cloud Native Workshop</option>
                <option value="AI & Future Robotics">AI & Future Robotics</option>
                <option value="Modern Photography Masterclass">Modern Photography Masterclass</option>
                <option value="Sustainable Living Forum">Sustainable Living Forum</option>
              </select>
            </div>
            {errors.event_name && <p className="text-xs font-medium text-rose-500 mt-1 ml-1">{errors.event_name.message}</p>}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100 bg-gray-50/50">
          <h3 className="font-bold text-gray-900">Additional Details</h3>
        </div>
        <div className="p-6">
          <div className="space-y-1">
            <label className={labelClasses}>Internal Notes</label>
            <div className="relative group">
              <FileText className={cn("absolute left-4 top-4 w-5 h-5 transition-colors", errors.notes ? "text-rose-400" : "text-gray-400 group-focus-within:text-primary")} />
              <textarea
                {...register('notes')}
                rows={4}
                placeholder="Any special requests or background info..."
                className={cn(inputClasses(!!errors.notes), "pl-11 pt-3 resize-none")}
              />
            </div>
            {errors.notes && <p className="text-xs font-medium text-rose-500 mt-1 ml-1">{errors.notes.message}</p>}
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-end gap-4 pt-4">
        <button
          type="button"
          onClick={handleReset}
          disabled={!isDirty || isSubmitting}
          className="w-full sm:w-auto px-8 py-3 bg-white border border-gray-200 rounded-xl text-sm font-bold text-rose-600 hover:bg-rose-50 hover:border-rose-200 disabled:opacity-30 disabled:grayscale disabled:cursor-not-allowed transition-all active:scale-95 flex items-center justify-center gap-2"
        >
          Clear
        </button>
        <button
          type="submit"
          disabled={!isDirty || isSubmitting}
          className="w-full sm:w-auto px-10 py-3 bg-primary text-white rounded-xl text-sm font-bold hover:bg-primary/90 disabled:opacity-50 disabled:grayscale transition-all shadow-lg shadow-primary/20 flex items-center justify-center gap-2 active:scale-95"
        >
          {isSubmitting ? (
            <>
              <RefreshCwIcon className="w-4 h-4 animate-spin" />
              Creating...
            </>
          ) : (
            <>
              <Send className="w-4 h-4" />
              Create Registration
            </>
          )}
        </button>
      </div>
    </form>
  )
}

// Separate component for spinning icon since RefreshCw is common
function RefreshCwIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8" />
      <path d="M21 3v5h-5" />
    </svg>
  )
}
