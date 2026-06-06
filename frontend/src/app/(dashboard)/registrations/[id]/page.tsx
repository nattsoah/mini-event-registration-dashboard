'use client'

import { useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { ChevronLeft, Edit3, Save, X, Mail, Phone, Calendar, Info, Clock } from 'lucide-react'
import { useRegistration } from '@/hooks/useRegistration'
import { useUpdateStatus } from '@/hooks/useUpdateStatus'
import { StatusBadge } from '@/components/registrations/StatusBadge'
import { StatusSelect } from '@/components/registrations/StatusSelect'
import { RegistrationTimeline } from '@/components/registrations/RegistrationTimeline'
import LoadingState from '@/components/shared/LoadingState'
import ErrorState from '@/components/shared/ErrorState'
import { RegistrationStatus } from '@/types/registration'

export default function RegistrationDetailPage() {
  const { id } = useParams()
  const router = useRouter()
  const { data: registration, loading, error, refresh } = useRegistration(id as string)
  const { updateStatus, isUpdating } = useUpdateStatus()
  
  const [isEditMode, setIsEditMode] = useState(false)
  const [pendingStatus, setPendingStatus] = useState<RegistrationStatus | null>(null)

  const handleSaveStatus = async () => {
    if (!pendingStatus || !registration) return
    
    await updateStatus(registration.id, pendingStatus, () => {
      setIsEditMode(false)
      refresh()
    })
  }

  const handleCancelEdit = () => {
    setIsEditMode(false)
    setPendingStatus(null)
  }

  const startEdit = () => {
    if (registration) {
      setPendingStatus(registration.status)
      setIsEditMode(true)
    }
  }

  if (loading) return <LoadingState />
  if (error) return <ErrorState message={error} onRetry={refresh} />
  if (!registration) return <ErrorState message="Registration not found" />

  return (
    <div className="max-w-5xl mx-auto space-y-6 pb-20">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => router.back()}
            className="p-2.5 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-all shadow-sm"
          >
            <ChevronLeft className="w-5 h-5 text-gray-600" />
          </button>
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold text-gray-900">{registration.name}</h1>
              {!isEditMode && <StatusBadge status={registration.status} />}
            </div>
            <p className="text-gray-500 text-sm">Registration ID: #{registration.id}</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {isEditMode ? (
            <>
              <button
                onClick={handleCancelEdit}
                className="inline-flex items-center px-5 py-2.5 border border-gray-300 rounded-xl text-sm font-bold text-gray-700 bg-white hover:bg-gray-50 transition-all"
              >
                <X className="w-4 h-4 mr-2" />
                Cancel
              </button>
              <button
                onClick={handleSaveStatus}
                disabled={isUpdating || pendingStatus === registration.status}
                className="inline-flex items-center px-5 py-2.5 bg-primary text-white rounded-xl text-sm font-bold hover:bg-primary/90 disabled:opacity-50 transition-all shadow-lg shadow-primary/20"
              >
                <Save className="w-4 h-4 mr-2" />
                {isUpdating ? 'Saving...' : 'Save Changes'}
              </button>
            </>
          ) : (
            <button
              onClick={startEdit}
              className="inline-flex items-center px-5 py-2.5 bg-white border border-gray-200 rounded-xl text-sm font-bold text-gray-900 hover:border-primary hover:text-primary transition-all shadow-sm"
            >
              <Edit3 className="w-4 h-4 mr-2" />
              Edit Status
            </button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Details */}
        <div className="lg:col-span-2 space-y-6">
          {/* Status Selection Card (Edit Mode) */}
          {isEditMode && (
            <div className="bg-white p-6 rounded-2xl border-2 border-primary/20 shadow-xl shadow-primary/5 animate-in slide-in-from-top-4 duration-300">
              <div className="flex items-center gap-2 mb-4 text-primary">
                <Info className="w-5 h-5" />
                <h3 className="font-bold">Select New Status</h3>
              </div>
              <StatusSelect 
                value={pendingStatus || registration.status} 
                onChange={setPendingStatus} 
              />
            </div>
          )}

          {/* Attendee Info Card */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100 bg-gray-50/50">
              <h3 className="font-bold text-gray-900">Attendee Information</h3>
            </div>
            <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600 flex-shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-0.5">Email Address</p>
                  <p className="text-gray-900 font-medium">{registration.email}</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600 flex-shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-0.5">Phone Number</p>
                  <p className="text-gray-900 font-medium">{registration.phone || 'Not provided'}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center text-amber-600 flex-shrink-0">
                  <Calendar className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-0.5">Event Name</p>
                  <p className="text-gray-900 font-medium">{registration.event_name}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-purple-50 flex items-center justify-center text-purple-600 flex-shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-0.5">Registered On</p>
                  <p className="text-gray-900 font-medium">
                    {new Intl.DateTimeFormat('en-US', { dateStyle: 'long', timeStyle: 'short' }).format(new Date(registration.registered_at))}
                  </p>
                </div>
              </div>
            </div>

            {registration.notes && (
              <div className="px-6 py-6 border-t border-gray-100 bg-gray-50/30">
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Internal Notes</p>
                <div className="bg-white p-4 rounded-xl border border-gray-100 text-gray-600 text-sm italic leading-relaxed">
                  &quot;{registration.notes}&quot;
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Timeline */}
        <div className="space-y-6">
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden h-fit">
            <div className="px-6 py-4 border-b border-gray-100 bg-gray-50/50">
              <h3 className="font-bold text-gray-900">Registration Journey</h3>
            </div>
            <div className="p-6">
              <RegistrationTimeline registration={registration} />
            </div>
          </div>

          <div className="bg-gradient-to-br from-primary/5 to-indigo-50 p-6 rounded-2xl border border-primary/10">
            <h4 className="text-primary font-bold text-sm mb-2">Need help?</h4>
            <p className="text-xs text-gray-600 leading-relaxed">
              If you have any issues with this registration, please contact the support team or check the system logs.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
