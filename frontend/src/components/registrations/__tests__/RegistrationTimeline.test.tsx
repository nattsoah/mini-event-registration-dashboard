import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { RegistrationTimeline } from '../RegistrationTimeline'
import { Registration } from '@/types/registration'

const mockRegistration: Registration = {
  id: 1,
  name: 'Test User',
  email: 'test@example.com',
  event_name: 'Test Event',
  status: 'confirmed',
  created_at: '2024-01-01T10:00:00Z',
  updated_at: '2024-01-02T10:00:00Z',
  registered_at: '2024-01-01T10:00:00Z',
  logs: [
    {
        id: 1,
        status: 'confirmed',
        message: 'Status changed to Confirmed',
        created_at: '2024-01-02T10:00:00Z'
    },
    {
        id: 2,
        status: 'pending',
        message: 'Registration received',
        created_at: '2024-01-01T10:00:00Z'
    }
  ]
}

describe('RegistrationTimeline', () => {
  it('renders status history logs correctly', () => {
    render(<RegistrationTimeline registration={mockRegistration} />)

    // The titles are now "Status: Confirmed" and "Registration Received" based on the new logic
    expect(screen.getByText('Status: Confirmed')).toBeInTheDocument()
    expect(screen.getByText('Registration Received')).toBeInTheDocument()
    expect(screen.getByText('Status changed to Confirmed')).toBeInTheDocument()
    expect(screen.getByText('Registration received')).toBeInTheDocument()
  })

  it('renders fallback message if no logs are available', () => {
    const noLogsReg = { 
        ...mockRegistration, 
        logs: []
    }
    render(<RegistrationTimeline registration={noLogsReg} />)

    expect(screen.getByText('No history available')).toBeInTheDocument()
  })
})
