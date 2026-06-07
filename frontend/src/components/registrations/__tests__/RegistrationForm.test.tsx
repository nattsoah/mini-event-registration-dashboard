import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { RegistrationForm } from '../RegistrationForm'
import api from '@/lib/axios'

// Mock next/navigation
vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: vi.fn(),
    refresh: vi.fn(),
    back: vi.fn(),
  }),
}))

// Mock axios
vi.mock('@/lib/axios', () => ({
  default: {
    post: vi.fn(),
  },
}))

// Mock SweetAlert2
vi.mock('@/lib/swal', () => ({
  default: {
    fire: vi.fn().mockResolvedValue({ isConfirmed: true }),
  },
  confirmDialog: vi.fn().mockResolvedValue({ isConfirmed: true }),
}))

describe('RegistrationForm', () => {
  it('renders all form fields', () => {
    render(<RegistrationForm />)

    expect(screen.getByPlaceholderText(/^e.g. John$/i)).toBeInTheDocument()
    expect(screen.getByPlaceholderText(/e.g. Doe/i)).toBeInTheDocument()
    expect(screen.getByPlaceholderText(/e.g. john@example.com/i)).toBeInTheDocument()
    expect(screen.getByPlaceholderText(/e.g. 0812345678/i)).toBeInTheDocument()
    expect(screen.getByText(/Select an event.../i)).toBeInTheDocument()
    expect(screen.getByPlaceholderText(/Any special requests/i)).toBeInTheDocument()
  })

  it('shows validation errors for required fields', async () => {
    render(<RegistrationForm />)

    // Fill something to enable the button
    fireEvent.change(screen.getByPlaceholderText(/^e.g. John$/i), { target: { value: 'J' } })

    fireEvent.click(screen.getByText(/Create Registration/i))

    await waitFor(() => {
      expect(screen.getByText(/First name must be at least 2 characters/i)).toBeInTheDocument()
      expect(screen.getByText(/Last name must be at least 2 characters/i)).toBeInTheDocument()
      expect(screen.getByText(/Email is required/i)).toBeInTheDocument()
      expect(screen.getByText(/Please select an event/i)).toBeInTheDocument()
    })
  })

  it('only allows numeric input for the phone field and limits to 10 digits', () => {
    render(<RegistrationForm />)
    const phoneInput = screen.getByPlaceholderText(/e.g. 0812345678/i) as HTMLInputElement

    fireEvent.change(phoneInput, { target: { value: '081abc23456789' } })
    
    // Should strip letters and limit to 10 digits
    expect(phoneInput.value).toBe('0812345678')
  })

  it('submits the form successfully', async () => {
    render(<RegistrationForm />)

    fireEvent.change(screen.getByPlaceholderText(/^e.g. John$/i), { target: { value: 'Alice' } })
    fireEvent.change(screen.getByPlaceholderText(/e.g. Doe/i), { target: { value: 'Smith' } })
    fireEvent.change(screen.getByPlaceholderText(/e.g. john@example.com/i), { target: { value: 'alice@example.com' } })
    fireEvent.change(screen.getByRole('combobox'), { target: { value: 'Bangkok Tech Summit 2024' } })

    vi.mocked(api.post).mockResolvedValueOnce({ data: {} })

    fireEvent.click(screen.getByText(/Create Registration/i))

    await waitFor(() => {
      expect(api.post).toHaveBeenCalledWith('/api/registrations', expect.objectContaining({
        name: 'Alice Smith',
        email: 'alice@example.com',
        event_name: 'Bangkok Tech Summit 2024',
      }))
    })
  })
})
