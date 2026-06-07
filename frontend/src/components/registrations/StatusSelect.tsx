import { RegistrationStatus } from '@/types/registration'
import { CheckCircle, XCircle, Clock } from 'lucide-react'
import { cn } from '@/lib/utils'

interface StatusSelectProps {
  value: RegistrationStatus
  onChange: (value: RegistrationStatus) => void
  disabled?: boolean
}

export function StatusSelect({ value, onChange, disabled }: StatusSelectProps) {
  const options = [
    { 
      value: 'pending', 
      label: 'Pending', 
      icon: Clock, 
      color: 'text-amber-700', 
      bg: 'bg-amber-50', 
      border: 'border-amber-200'
    },
    { 
      value: 'confirmed', 
      label: 'Confirmed', 
      icon: CheckCircle, 
      color: 'text-emerald-700', 
      bg: 'bg-emerald-50', 
      border: 'border-emerald-200'
    },
    { 
      value: 'cancelled', 
      label: 'Cancelled', 
      icon: XCircle, 
      color: 'text-rose-700', 
      bg: 'bg-rose-50', 
      border: 'border-rose-200'
    },
  ] as const

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
      {options.map((option) => {
        const isSelected = value === option.value
        return (
          <button
            key={option.value}
            type="button"
            disabled={disabled}
            onClick={() => onChange(option.value as RegistrationStatus)}
            className={cn(
              "flex items-center gap-3 px-4 py-3 rounded-xl border transition-all text-left group",
              isSelected 
                ? cn(option.bg, option.border, "shadow-sm ring-4 ring-primary/5") 
                : "bg-white border-gray-100 hover:border-gray-200 text-gray-500",
              disabled && "opacity-50 cursor-not-allowed"
            )}
          >
            <div className={cn(
              "w-10 h-10 rounded-xl flex items-center justify-center transition-colors",
              isSelected ? "bg-white shadow-sm" : "bg-gray-50 group-hover:bg-gray-100"
            )}>
              <option.icon className={cn("w-5 h-5", isSelected ? option.color : "text-gray-400")} />
            </div>
            <div>
              <p className={cn("text-sm font-bold transition-colors", isSelected ? "text-gray-900" : "text-gray-600")}>
                {option.label}
              </p>
              {isSelected && <p className={cn("text-[10px] font-bold uppercase tracking-widest", option.color)}>Selected</p>}
            </div>
          </button>
        )
      })}
    </div>
  )
}
