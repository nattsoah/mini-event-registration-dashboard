'use client'

import { useState, useEffect, useCallback } from 'react'
import api from '@/lib/axios'
import { Registration, PaginatedResponse } from '@/types/registration'

interface UseRegistrationsParams {
  page?: number
  search?: string
  status?: string
  sort_by?: string
  sort_order?: 'asc' | 'desc'
}

export function useRegistrations(params: UseRegistrationsParams = {}) {
  const [data, setData] = useState<PaginatedResponse<Registration> | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchRegistrations = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const response = await api.get('/api/registrations', { params })
      setData(response.data)
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Failed to fetch registrations'
      setError(message)
    } finally {
      setLoading(false)
    }
    // We intentionally stringify params to use it as a dependency for the hook
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(params)])

  useEffect(() => {
    fetchRegistrations()
  }, [fetchRegistrations])

  return {
    data,
    loading,
    error,
    refresh: fetchRegistrations
  }
}
