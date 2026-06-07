import { Registration, RegistrationStatus } from '@/types/registration'
import { Calendar, CheckCircle2, XCircle, Clock, RefreshCw } from 'lucide-react'
import { cn } from '@/lib/utils'

interface RegistrationTimelineProps {
  registration: Registration
}

interface LogEntry {
    id: number
    status: RegistrationStatus
    message: string
    created_at: string
}

export function RegistrationTimeline({ registration }: RegistrationTimelineProps) {
  const formatDate = (dateString: string) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(new Date(dateString))
  }

  const logs = (registration.logs || []) as LogEntry[]
  
  // Logic to build the timeline based on your professional requirements:
  // 1. Bottom point is ALWAYS "Registration Received" (based on the very first log or registered_at)
  // 2. Subsequent points are status changes that happened AFTER initial registration
  
  const timelineItems = logs.map((log, index) => {
    const isOldestLog = index === logs.length - 1
    const status = log.status as string

    // Rule: The oldest log represents the registration act itself
    if (isOldestLog) {
      return {
        id: log.id,
        title: 'Registration Received',
        description: 'Successful submission of registration form.',
        date: log.created_at,
        icon: Calendar,
        color: 'bg-blue-500',
      }
    }

    // Subsequent logs are actual status transitions
    let ui = {
      title: `Status: ${status.charAt(0).toUpperCase() + status.slice(1)}`,
      icon: Clock,
      color: 'bg-amber-500',
    }

    if (status === 'confirmed') {
      ui = { title: 'Status: Confirmed', icon: CheckCircle2, color: 'bg-emerald-500' }
    } else if (status === 'cancelled') {
      ui = { title: 'Status: Cancelled', icon: XCircle, color: 'bg-rose-500' }
    }

    return {
      id: log.id,
      title: ui.title,
      description: log.message,
      date: log.created_at,
      icon: ui.icon,
      color: ui.color,
    }
  })

  return (
    <div className="flow-root">
      <ul role="list" className="-mb-8">
        {timelineItems.map((item, index) => {
          const isLastInList = index === timelineItems.length - 1

          return (
            <li key={item.id}>
              <div className="relative pb-8">
                {!isLastInList && (
                  <span 
                    className="absolute left-5 top-5 -ml-px h-full w-0.5 bg-gray-200" 
                    aria-hidden="true" 
                  />
                )}
                <div className="relative flex items-start space-x-3">
                  <div className={cn(
                    "relative flex h-10 w-10 items-center justify-center rounded-full ring-8 ring-white shadow-sm transition-all",
                    item.color
                  )}>
                    <item.icon className="h-5 w-5 text-white" />
                  </div>
                  <div className="min-w-0 flex-1 py-1.5">
                    <div className="text-sm font-bold text-gray-900">
                      {item.title}
                    </div>
                    <p className="text-xs text-gray-500 mt-1 leading-relaxed">
                      {item.description}
                    </p>
                    <div className="mt-2 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                      {formatDate(item.date)}
                    </div>
                  </div>
                </div>
              </div>
            </li>
          )
        })}
      </ul>
      {timelineItems.length === 0 && (
        <p className="text-center py-4 text-gray-400 text-sm italic">No history available</p>
      )}
    </div>
  )
}
