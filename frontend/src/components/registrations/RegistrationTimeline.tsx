import { Registration } from '@/types/registration'
import { Calendar, RefreshCw, CheckCircle2 } from 'lucide-react'
import { cn } from '@/lib/utils'

interface RegistrationTimelineProps {
  registration: Registration
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

  const timelineItems = [
    {
      title: 'Registration Received',
      description: `Initial registration for ${registration.event_name}`,
      date: registration.registered_at,
      icon: Calendar,
      color: 'bg-blue-500',
    },
  ]

  // If updated_at is significantly different from created_at, show it as a status update
  const isUpdated = new Date(registration.updated_at).getTime() - new Date(registration.created_at).getTime() > 1000
  
  if (isUpdated) {
    const statusColor = registration.status === 'confirmed' 
      ? 'bg-emerald-500' 
      : registration.status === 'cancelled' 
        ? 'bg-rose-500' 
        : 'bg-amber-500';

    timelineItems.push({
      title: `Status Updated to ${registration.status.charAt(0).toUpperCase() + registration.status.slice(1)}`,
      description: 'The registration status was modified by an administrator.',
      date: registration.updated_at,
      icon: RefreshCw,
      color: statusColor,
    })
  } else if (registration.status !== 'pending') {
    const statusColor = registration.status === 'confirmed' 
      ? 'bg-emerald-500' 
      : registration.status === 'cancelled' 
        ? 'bg-rose-500' 
        : 'bg-amber-500';

    timelineItems.push({
        title: `Registration ${registration.status.charAt(0).toUpperCase() + registration.status.slice(1)}`,
        description: 'System processed the current status.',
        date: registration.updated_at,
        icon: CheckCircle2,
        color: statusColor,
      })
  }

  // Sort by date descending
  timelineItems.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  return (
    <div className="flow-root">
      <ul role="list" className="-mb-8">
        {timelineItems.map((item, itemIdx) => (
          <li key={itemIdx}>
            <div className="relative pb-8">
              {itemIdx !== timelineItems.length - 1 ? (
                <span className="absolute left-5 top-5 -ml-px h-full w-0.5 bg-gray-200" aria-hidden="true" />
              ) : null}
              <div className="relative flex items-start space-x-3">
                <div className={cn(
                  "relative flex h-10 w-10 items-center justify-center rounded-full ring-8 ring-white",
                  item.color
                )}>
                  <item.icon className="h-5 w-5 text-white" aria-hidden="true" />
                </div>
                <div className="min-w-0 flex-1 py-1.5">
                  <div className="text-sm font-bold text-gray-900">
                    {item.title}
                  </div>
                  <p className="text-sm text-gray-500 mt-0.5">
                    {item.description}
                  </p>
                  <div className="mt-2 text-xs font-medium text-gray-400">
                    {formatDate(item.date)}
                  </div>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
