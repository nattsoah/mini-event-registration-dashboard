'use client'

import { Search, Menu } from 'lucide-react'
import { useAuth } from '@/app/providers'
import { usePathname } from 'next/navigation'

interface NavbarProps {
  onMenuClick: () => void
}

export function Navbar({ onMenuClick }: NavbarProps) {
  const { user } = useAuth()
  const pathname = usePathname()

  const getPageTitle = () => {
    if (pathname === '/dashboard') return 'Dashboard Overview'
    if (pathname.startsWith('/registrations/create')) return 'New Registration'
    if (pathname.startsWith('/registrations/')) return 'Registration Details'
    if (pathname.startsWith('/registrations')) return 'Manage Registrations'
    return 'Admin Panel'
  }

  return (
    <header className="h-20 bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-40 px-8 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <button onClick={onMenuClick} className="p-2 hover:bg-gray-100 rounded-lg md:hidden transition-colors">
          <Menu className="w-6 h-6 text-gray-600" />
        </button>
        <h1 className="text-xl font-bold text-gray-900">{getPageTitle()}</h1>
      </div>

      <div className="flex items-center gap-6">
        <div className="hidden lg:flex items-center relative">
          <Search className="w-4 h-4 text-gray-400 absolute left-3" />
          <input 
            type="text" 
            placeholder="Global search..." 
            className="pl-10 pr-4 py-2 bg-gray-50 border-transparent focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/5 rounded-xl text-sm transition-all w-64"
          />
        </div>
        
        <div className="flex items-center gap-3 border-l border-gray-100 pl-6">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-bold text-gray-900">{user?.name || 'Admin User'}</p>
            <p className="text-xs text-gray-500 font-medium">{user?.email || 'admin@example.com'}</p>
          </div>
          <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-primary to-indigo-600 flex items-center justify-center text-white font-bold shadow-sm">
            {user?.name?.[0] || 'A'}
          </div>
        </div>
      </div>
    </header>
  )
}
