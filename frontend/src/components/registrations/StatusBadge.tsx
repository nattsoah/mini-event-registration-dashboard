import { RegistrationStatus } from '@/types/registration'
import { cn } from '@/lib/utils'

interface StatusBadgeProps {
  status: RegistrationStatus
  className?: string
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const statusConfig = {
    pending: {
      label: 'Pending',
      className: 'bg-amber-50 text-amber-700 border-amber-200',
    },
    confirmed: {
      label: 'Confirmed',
      className: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    },
    cancelled: {
      label: 'Cancelled',
      className: 'bg-rose-50 text-rose-700 border-rose-200',
    },
  }

  const config = statusConfig[status]

  return (
    <span
      className={cn(
        'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border transition-colors',
        config.className,
        className
      )}
    >
      <span className={cn('w-1.5 h-1.5 rounded-full mr-1.5', {
        'bg-amber-500': status === 'pending',
        'bg-emerald-500': status === 'confirmed',
        'bg-rose-500': status === 'cancelled',
      })} />
      {config.label}
    </span>
  )
}
