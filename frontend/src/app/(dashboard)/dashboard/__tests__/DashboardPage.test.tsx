import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import DashboardPage from '../page'
import { useSummary } from '@/hooks/useSummary'

// Mock next/navigation
vi.mock('next/navigation', () => ({
  useRouter: () => ({ push: vi.fn() }),
}))

// Mock useSummary hook
vi.mock('@/hooks/useSummary', () => ({
  useSummary: vi.fn(),
}))

// Mock Recharts to avoid ResponsiveContainer errors in JSDOM
vi.mock('recharts', () => ({
  ResponsiveContainer: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  PieChart: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  Pie: () => <div></div>,
  Cell: () => <div></div>,
  Tooltip: () => <div></div>,
  Legend: () => <div></div>,
}))

describe('DashboardPage', () => {
  it('renders loading state initially', () => {
    vi.mocked(useSummary).mockReturnValue({
      data: null,
      loading: true,
      error: null,
      refresh: vi.fn(),
    })

    render(<DashboardPage />)
    expect(screen.getByTestId('loading-state')).toBeInTheDocument()
  })

  it('renders error state when fetch fails', () => {
    vi.mocked(useSummary).mockReturnValue({
      data: null,
      loading: false,
      error: 'Failed to fetch',
      refresh: vi.fn(),
    })

    render(<DashboardPage />)
    expect(screen.getByText(/Failed to fetch/i)).toBeInTheDocument()
  })

  it('renders dashboard statistics correctly', () => {
    vi.mocked(useSummary).mockReturnValue({
      data: {
        stats: { total: 100, pending: 20, confirmed: 70, cancelled: 10 },
        recent_registrations: [],
      },
      loading: false,
      error: null,
      refresh: vi.fn(),
    })

    render(<DashboardPage />)
    const totalElements = screen.getAllByText('100')
    expect(totalElements.length).toBeGreaterThanOrEqual(1)
    expect(screen.getByText('20')).toBeInTheDocument()
    expect(screen.getByText('70')).toBeInTheDocument()
    expect(screen.getByText('10')).toBeInTheDocument()
    expect(screen.getByText(/Total Registrations/i)).toBeInTheDocument()
  })
})
