'use client'

import { useState, useEffect, useCallback } from 'react'
import api from '@/lib/axios'
import { Registration } from '@/types/registration'

export function useRegistration(id: string | number) {
  const [data, setData] = useState<Registration | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchRegistration = useCallback(async () => {
    if (!id) return
    
    setLoading(true)
    setError(null)
    try {
      const response = await api.get(`/api/registrations/${id}`)
      setData(response.data.data)
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Failed to fetch registration details'
      setError(message)
    } finally {
      setLoading(false)
    }
  }, [id])

  useEffect(() => {
    fetchRegistration()
  }, [fetchRegistration])

  return {
    data,
    loading,
    error,
    refresh: fetchRegistration
  }
}
