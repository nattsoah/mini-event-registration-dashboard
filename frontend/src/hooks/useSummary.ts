'use client'

import { useState, useEffect, useCallback } from 'react'
import api from '@/lib/axios'
import { DashboardSummary } from '@/types/registration'

export function useSummary() {
  const [data, setData] = useState<DashboardSummary | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchSummary = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const response = await api.get('/api/summary')
      setData(response.data)
    } catch (err: unknown) {
      console.error('Failed to fetch summary', err)
      const message = err instanceof Error ? err.message : 'Failed to fetch dashboard summary'
      setError(message)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchSummary()
  }, [fetchSummary])

  return {
    data,
    loading,
    error,
    refresh: fetchSummary
  }
}
