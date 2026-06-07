import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { StatusSelect } from '../StatusSelect'

describe('StatusSelect', () => {
  it('renders all status options', () => {
    render(<StatusSelect value="pending" onChange={() => {}} />)

    expect(screen.getByText('Pending')).toBeInTheDocument()
    expect(screen.getByText('Confirmed')).toBeInTheDocument()
    expect(screen.getByText('Cancelled')).toBeInTheDocument()
  })

  it('highlights the currently selected status', () => {
    render(<StatusSelect value="confirmed" onChange={() => {}} />)
    
    // We marked selected ones with "Selected" text in the component
    expect(screen.getByText('Selected')).toBeInTheDocument()
  })

  it('calls onChange when an option is clicked', () => {
    const handleChange = vi.fn()
    render(<StatusSelect value="pending" onChange={handleChange} />)

    fireEvent.click(screen.getByText('Confirmed'))
    expect(handleChange).toHaveBeenCalledWith('confirmed')
  })
})
