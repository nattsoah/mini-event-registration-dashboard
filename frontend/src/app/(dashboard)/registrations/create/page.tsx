'use client'

import { RegistrationForm } from '@/components/registrations/RegistrationForm'
import { ChevronLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'

export default function NewRegistrationPage() {
  const router = useRouter()

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <button 
          onClick={() => router.back()}
          className="p-2.5 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-all shadow-sm"
          title="Go back"
        >
          <ChevronLeft className="w-5 h-5 text-gray-600" />
        </button>
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl font-bold text-gray-900">Add New Registration</h1>
          <p className="text-gray-500 text-sm">Fill in the details below to register a new attendee.</p>
        </div>
      </div>

      <RegistrationForm />
    </div>
  )
}
