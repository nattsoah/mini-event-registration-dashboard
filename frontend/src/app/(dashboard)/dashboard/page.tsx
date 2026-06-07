'use client'

import { useSummary } from '@/hooks/useSummary'
import { Users, Clock, CheckCircle, XCircle, ArrowUpRight, Plus, ExternalLink } from 'lucide-react'
import Link from 'next/link'
import { StatusBadge } from '@/components/registrations/StatusBadge'
import LoadingState from '@/components/shared/LoadingState'
import ErrorState from '@/components/shared/ErrorState'
import { Button } from '@/components/shared/Button'
import { formatDateTime } from '@/lib/date'
import { 
  PieChart, 
  Pie, 
  Cell, 
  ResponsiveContainer, 
  Tooltip, 
  Legend 
} from 'recharts'

export default function DashboardPage() {
  const { data, loading, error, refresh } = useSummary()

  if (loading) return <LoadingState />
  if (error) return <ErrorState message={error} onRetry={refresh} />
  if (!data) return null

  const { stats, recent_registrations } = data

  const statCards = [
    { label: 'Total Registrations', value: stats.total, icon: Users, color: 'bg-indigo-500' },
    { label: 'Pending Review', value: stats.pending, icon: Clock, color: 'bg-amber-500' },
    { label: 'Confirmed', value: stats.confirmed, icon: CheckCircle, color: 'bg-emerald-500' },
    { label: 'Cancelled', value: stats.cancelled, icon: XCircle, color: 'bg-rose-500' },
  ]

  const chartData = [
    { name: 'Pending', value: stats.pending, color: '#f59e0b' },
    { name: 'Confirmed', value: stats.confirmed, color: '#10b981' },
    { name: 'Cancelled', value: stats.cancelled, color: '#ef4444' },
  ].filter(d => d.value > 0)

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Welcome Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Dashboard Summary</h1>
          <p className="text-gray-500 mt-1 font-medium text-sm">Welcome back! Here&apos;s what&apos;s happening with your events today.</p>
        </div>
        <Button asChild className="group shadow-sm hover:shadow-md">
          <Link href="/registrations/create">
            <Plus className="w-5 h-5 mr-2 group-hover:rotate-90 transition-transform duration-300" />
            Add Registration
          </Link>
        </Button>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, i) => (
          <div 
            key={i} 
            className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all group overflow-hidden relative"
          >
            <div className="relative z-10 flex flex-col gap-4">
              <div className={`w-12 h-12 ${stat.color} rounded-xl flex items-center justify-center text-white shadow-sm group-hover:scale-110 transition-transform duration-300`}>
                <stat.icon className="w-6 h-6" />
              </div>
              <div>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">{stat.label}</p>
                <h3 className="text-3xl font-black text-gray-900 mt-1">{stat.value.toLocaleString()}</h3>
              </div>
            </div>
            <div className={`absolute -right-4 -bottom-4 w-24 h-24 ${stat.color} opacity-[0.03] rounded-full group-hover:scale-150 transition-transform duration-500`} />
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Chart Section */}
        <div className="lg:col-span-1 bg-white p-8 rounded-2xl border border-gray-100 shadow-sm flex flex-col h-full">
          <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
            Status Proportion
            <span className="text-[10px] font-black bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full uppercase tracking-tighter">Live</span>
          </h3>
          <div className="flex-1 min-h-[300px] w-full relative">
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none mb-10">
              <span className="text-3xl font-black text-gray-900">{stats.total}</span>
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Registrations</span>
            </div>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  innerRadius={75}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                  animationBegin={0}
                  animationDuration={1500}
                >
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} stroke="#fff" strokeWidth={2} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ 
                    borderRadius: '16px', 
                    border: 'none', 
                    boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
                    padding: '12px'
                  }}
                  itemStyle={{ fontWeight: 'bold', fontSize: '12px' }}
                />
                <Legend 
                  iconType="circle" 
                  layout="horizontal" 
                  verticalAlign="bottom" 
                  align="center"
                  wrapperStyle={{ paddingTop: '20px', fontSize: '12px', fontWeight: 'bold' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent Registrations Table */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden flex flex-col h-full">
          <div className="px-8 py-6 border-b border-gray-50 flex items-center justify-between bg-gray-50/30">
            <h3 className="text-lg font-bold text-gray-900">Recent Registrations</h3>
            <Link 
              href="/registrations" 
              className="text-primary hover:text-primary/80 text-sm font-bold flex items-center gap-1 group transition-all"
            >
              View All 
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Link>
          </div>
          <div className="overflow-x-auto flex-1">
            <table className="w-full text-left border-collapse">
              <thead className="bg-white">
                <tr>
                  <th className="px-8 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Attendee</th>
                  <th className="px-8 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Event</th>
                  <th className="px-8 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Status</th>
                  <th className="px-8 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest text-right">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {recent_registrations.map((reg) => (
                  <tr key={reg.id} className="hover:bg-gray-50/50 transition-colors group">
                    <td className="px-8 py-5">
                      <div className="flex flex-col">
                        <span className="text-sm font-bold text-gray-900">{reg.name}</span>
                        <span className="text-xs text-gray-500 font-medium">{reg.email}</span>
                      </div>
                    </td>
                    <td className="px-8 py-5 text-sm text-gray-600 font-medium">{reg.event_name}</td>
                    <td className="px-8 py-5">
                      <StatusBadge status={reg.status} className="scale-90 origin-left" />
                    </td>
                    <td className="px-8 py-5 text-right">
                       <Link 
                        href={`/registrations/${reg.id}`}
                        className="inline-flex flex-col items-end group/item"
                       >
                         <span className="text-[11px] font-bold text-gray-900 flex items-center gap-1 group-hover/item:text-primary transition-colors">
                            {formatDateTime(reg.created_at)}
                            <ExternalLink className="w-3 h-3 opacity-0 group-hover/item:opacity-100 transition-opacity" />
                         </span>
                         <span className="text-[10px] text-gray-400 font-medium">Click to view</span>
                       </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
