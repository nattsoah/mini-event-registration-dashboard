export type RegistrationStatus = 'pending' | 'confirmed' | 'cancelled'

export interface Registration {
  id: number
  name: string
  email: string
  phone?: string
  event_name: string
  status: RegistrationStatus
  notes?: string
  registered_at: string
  created_at: string
  updated_at: string
  logs?: Array<{
    id: number
    status: RegistrationStatus
    message: string
    created_at: string
  }>
}

export interface DashboardSummary {
  stats: {
    total: number
    pending: number
    confirmed: number
    cancelled: number
  }
  recent_registrations: Registration[]
}

export interface PaginatedResponse<T> {
  data: T[]
  meta: {
    current_page: number
    last_page: number
    total: number
    per_page: number
  }
}

export interface SummaryData {
  total: number
  pending: number
  confirmed: number
  cancelled: number
}
