'use client'

import { useState, useEffect } from 'react'
import { Plus, Search, Filter, Download, ChevronLeft, ChevronRight } from 'lucide-react'
import Link from 'next/link'
import { useRegistrations } from '@/hooks/useRegistrations'
import { RegistrationTable } from '@/components/registrations/RegistrationTable'
import { SkeletonTable } from '@/components/shared/SkeletonTable'
import EmptyState from '@/components/shared/EmptyState'
import ErrorState from '@/components/shared/ErrorState'
import api from '@/lib/axios'

export default function RegistrationsPage() {
  const [params, setParams] = useState({
    page: 1,
    search: '',
    status: '',
    sort_by: 'created_at',
    sort_order: 'desc' as 'asc' | 'desc',
  })

  const [searchInput, setSearchInput] = useState('')
  const { data, loading, error, refresh } = useRegistrations(params)

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => {
      setParams((prev) => ({ ...prev, search: searchInput, page: 1 }))
    }, 500)
    return () => clearTimeout(timer)
  }, [searchInput])

  const handleSort = (field: string) => {
    setParams((prev) => ({
      ...prev,
      sort_by: field,
      sort_order: prev.sort_by === field && prev.sort_order === 'asc' ? 'desc' : 'asc',
      page: 1,
    }))
  }

  const handleExport = async () => {
    try {
      const response = await api.get('/api/registrations/export', { responseType: 'blob' })
      const url = window.URL.createObjectURL(new Blob([response.data]))
      const link = document.createElement('a')
      link.href = url
      link.setAttribute('download', `registrations_${new Date().toISOString().split('T')[0]}.csv`)
      document.body.appendChild(link)
      link.click()
      link.remove()
    } catch (err) {
      console.error('Export failed', err)
      alert('Failed to export CSV')
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Registrations</h1>
          <p className="text-gray-500">Manage and monitor all event registrations.</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={handleExport}
            className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-all shadow-sm"
          >
            <Download className="w-4 h-4 mr-2" />
            Export CSV
          </button>
          <Link
            href="/registrations/create"
            className="inline-flex items-center px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary/90 transition-all shadow-sm"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Registration
          </Link>
        </div>
      </div>

      <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex flex-col md:flex-row gap-4 items-center">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search by name, email or event..."
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-4 w-full md:w-auto">
          <div className="relative w-full md:w-48">
            <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <select
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg appearance-none focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
              value={params.status}
              onChange={(e) => setParams((prev) => ({ ...prev, status: e.target.value, page: 1 }))}
            >
              <option value="">All Status</option>
              <option value="pending">Pending</option>
              <option value="confirmed">Confirmed</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
        </div>
      </div>

      {loading ? (
        <SkeletonTable />
      ) : error ? (
        <ErrorState message={error} onRetry={refresh} />
      ) : data?.data.length === 0 ? (
        <EmptyState 
          title="No Registrations Found" 
          description="Try adjusting your search or filters to find what you're looking for." 
        />
      ) : (
        <>
          <RegistrationTable
            registrations={data?.data || []}
            sortBy={params.sort_by}
            sortOrder={params.sort_order}
            onSort={handleSort}
          />

          {data && data.meta.last_page > 1 && (
            <div className="flex items-center justify-between pt-4">
              <p className="text-sm text-gray-600">
                Showing <span className="font-medium">{data.data.length}</span> of <span className="font-medium">{data.meta.total}</span> results
              </p>
              <div className="flex items-center gap-2">
                <button
                  disabled={params.page === 1}
                  onClick={() => setParams((prev) => ({ ...prev, page: prev.page - 1 }))}
                  className="p-2 border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-50 transition-all"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <div className="flex items-center gap-1">
                  {[...Array(data.meta.last_page)].map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setParams((prev) => ({ ...prev, page: i + 1 }))}
                      className={`w-10 h-10 rounded-lg text-sm font-medium transition-all ${
                        params.page === i + 1
                          ? 'bg-primary text-white shadow-md'
                          : 'hover:bg-gray-50 text-gray-600'
                      }`}
                    >
                      {i + 1}
                    </button>
                  ))}
                </div>
                <button
                  disabled={params.page === data.meta.last_page}
                  onClick={() => setParams((prev) => ({ ...prev, page: prev.page + 1 }))}
                  className="p-2 border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-50 transition-all"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  )
}
