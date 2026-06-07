'use client'

import Link from 'next/link'
import { Eye, ArrowUpDown, ArrowUp, ArrowDown, MoreHorizontal, RefreshCw } from 'lucide-react'
import { Registration } from '@/types/registration'
import { StatusBadge } from './StatusBadge'
import { useState } from 'react'
import { cn } from '@/lib/utils'

interface RegistrationTableProps {
  registrations: Registration[]
  sortBy: string
  sortOrder: 'asc' | 'desc'
  onSort: (field: string) => void
}

export function RegistrationTable({ registrations, sortBy, sortOrder, onSort }: RegistrationTableProps) {
  const [activeMenu, setActiveMenu] = useState<number | null>(null)

  const SortIcon = ({ field }: { field: string }) => {
    if (sortBy !== field) return <ArrowUpDown className="w-4 h-4 ml-1 opacity-20" />
    return sortOrder === 'asc' ? <ArrowUp className="w-4 h-4 ml-1 text-primary" /> : <ArrowDown className="w-4 h-4 ml-1 text-primary" />
  }

  const formatDate = (dateString: string) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(new Date(dateString))
  }

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-visible">
      <div className="overflow-x-auto rounded-xl">
        <table className="w-full text-left border-collapse">
          <thead className="bg-gray-50/80">
            <tr>
              <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                <button onClick={() => onSort('name')} className="flex items-center hover:text-gray-900 transition-colors">
                  Attendee <SortIcon field="name" />
                </button>
              </th>
              <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Event
              </th>
              <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                <button onClick={() => onSort('status')} className="flex items-center hover:text-gray-900 transition-colors">
                  Status <SortIcon field="status" />
                </button>
              </th>
              <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                <button onClick={() => onSort('created_at')} className="flex items-center hover:text-gray-900 transition-colors">
                  Registered At <SortIcon field="created_at" />
                </button>
              </th>
              <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider text-right">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {registrations.map((reg) => (
              <tr key={reg.id} className="hover:bg-gray-50/50 transition-colors group">
                <td className="px-6 py-4">
                  <div className="flex flex-col">
                    <span className="font-semibold text-gray-900">{reg.name}</span>
                    <span className="text-sm text-gray-500">{reg.email}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="text-sm text-gray-700 font-medium">{reg.event_name}</span>
                </td>
                <td className="px-6 py-4">
                  <StatusBadge status={reg.status} />
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">
                  {formatDate(reg.created_at)}
                </td>
                <td className="px-6 py-4 text-right relative">
                  <div className="flex items-center justify-end">
                    <div className="relative">
                      <button
                        onClick={() => setActiveMenu(activeMenu === reg.id ? null : reg.id)}
                        className={cn(
                          "p-2 rounded-lg transition-all",
                          activeMenu === reg.id ? "bg-primary/10 text-primary" : "text-gray-400 hover:text-gray-900 hover:bg-gray-100"
                        )}
                        title="Actions"
                      >
                        <MoreHorizontal className="w-5 h-5" />
                      </button>

                      {activeMenu === reg.id && (
                        <>
                          <div className="fixed inset-0 z-10" onClick={() => setActiveMenu(null)} />
                          <div className="absolute right-0 mt-2 w-52 bg-white rounded-xl shadow-xl border border-gray-100 py-2 z-20 animate-in fade-in zoom-in duration-100 origin-top-right">
                            <Link
                              href={`/registrations/${reg.id}`}
                              className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                              onClick={() => setActiveMenu(null)}
                            >
                              <Eye className="w-4 h-4 text-gray-400" />
                              View Details
                            </Link>

                            <Link
                              href={`/registrations/${reg.id}?edit=true`}
                              className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                              onClick={() => setActiveMenu(null)}
                            >
                              <RefreshCw className="w-4 h-4 text-gray-400" />
                              Update Status
                            </Link>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
