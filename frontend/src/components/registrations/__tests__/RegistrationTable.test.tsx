import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { RegistrationTable } from '../RegistrationTable'
import { Registration } from '@/types/registration'

// Mock Next.js Link
vi.mock('next/link', () => ({
  default: ({ children, href }: { children: React.ReactNode; href: string }) => <a href={href}>{children}</a>,
}))

const mockRegistrations: Registration[] = [
  {
    id: 1,
    name: 'Test User',
    email: 'test@example.com',
    event_name: 'Test Event',
    status: 'pending',
    created_at: '2024-01-01T10:00:00Z',
    updated_at: '2024-01-01T10:00:00Z',
    registered_at: '2024-01-01T10:00:00Z',
  },
]

describe('RegistrationTable', () => {
  it('renders registration data correctly', () => {
    render(
      <RegistrationTable
        registrations={mockRegistrations}
        sortBy="created_at"
        sortOrder="desc"
        onSort={() => {}}
      />
    )

    expect(screen.getByText('Test User')).toBeInTheDocument()
    expect(screen.getByText('test@example.com')).toBeInTheDocument()
    expect(screen.getByText('Test Event')).toBeInTheDocument()
    expect(screen.getByText('Pending')).toBeInTheDocument()
  })

  it('shows action buttons', () => {
    render(
      <RegistrationTable
        registrations={mockRegistrations}
        sortBy="created_at"
        sortOrder="desc"
        onSort={() => {}}
      />
    )

    const actionButton = screen.getByTitle('Actions')
    expect(actionButton).toBeInTheDocument()
  })
})
