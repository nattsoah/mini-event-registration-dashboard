'use client'

import { useState } from 'react'
import api from '@/lib/axios'
import MySwal from '@/lib/swal'
import { RegistrationStatus } from '@/types/registration'

export function useUpdateStatus() {
  const [isUpdating, setIsUpdating] = useState(false)

  const changeStatus = async (id: number, currentStatus: RegistrationStatus, onSuccess?: () => void) => {
    const { value: newStatus } = await MySwal.fire({
      title: 'Update Registration Status',
      input: 'select',
      inputOptions: {
        pending: 'Pending',
        confirmed: 'Confirmed',
        cancelled: 'Cancelled'
      },
      inputValue: currentStatus,
      inputPlaceholder: 'Select a status',
      showCancelButton: true,
      confirmButtonText: 'Update Status',
      confirmButtonColor: '#4f46e5',
      cancelButtonText: 'Cancel',
      inputValidator: (value) => {
        if (value === currentStatus) {
          return 'Please select a different status'
        }
        return null
      },
      customClass: {
        popup: 'rounded-2xl border-none',
        confirmButton: 'px-6 py-2.5 rounded-xl font-bold transition-all shadow-md',
        cancelButton: 'px-6 py-2.5 rounded-xl font-bold transition-all',
        input: 'rounded-xl border-gray-200 focus:ring-primary focus:border-primary'
      }
    })

    if (newStatus) {
      setIsUpdating(true)
      try {
        await api.patch(`/api/registrations/${id}/status`, { status: newStatus })
        MySwal.fire({
          icon: 'success',
          title: 'Updated!',
          text: `Status has been changed to ${newStatus}.`,
          timer: 2000,
          showConfirmButton: false,
          customClass: { popup: 'rounded-2xl' }
        })
        if (onSuccess) onSuccess()
      } catch (err: unknown) {
        let message = 'Failed to update status'
        if (err && typeof err === 'object' && 'response' in err) {
            const axiosError = err as { response: { data?: { message?: string } } }
            message = axiosError.response.data?.message || message
        }
        MySwal.fire({
          icon: 'error',
          title: 'Update Failed',
          text: message,
          customClass: { popup: 'rounded-2xl' }
        })
      } finally {
        setIsUpdating(false)
      }
    }
  }

  const updateStatus = async (id: number, status: RegistrationStatus, onSuccess?: () => void) => {
    // Legacy direct update (still useful for quick buttons)
    setIsUpdating(true)
    try {
      await api.patch(`/api/registrations/${id}/status`, { status })
      if (onSuccess) onSuccess()
    } catch (err: unknown) {
      console.error('Failed to update status', err)
    } finally {
      setIsUpdating(false)
    }
  }

  return { updateStatus, changeStatus, isUpdating }
}
