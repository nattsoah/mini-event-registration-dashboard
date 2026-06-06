'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LayoutDashboard, Users, LogOut, Ticket, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useAuth } from '@/app/providers'
import { confirmDialog } from '@/lib/swal'

interface SidebarProps {
  isOpen: boolean
  onClose: () => void
}

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const pathname = usePathname()
  const { logout } = useAuth()

  const menuItems = [
    { label: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { label: 'Registrations', href: '/registrations', icon: Users },
  ]

  const handleSignOut = async () => {
    const result = await confirmDialog({
      title: 'Confirm Sign Out',
      text: 'Are you sure you want to sign out?',
      confirmButtonText: 'Sign Out',
      confirmButtonColor: '#e11d48',
    })

    if (result.isConfirmed) {
      logout()
    }
  }

  const SidebarContent = (
    <div className="flex flex-col h-full">
      <div className="p-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-white shadow-lg shadow-primary/20">
            <Ticket className="w-6 h-6" />
          </div>
          <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600">
            EventHub
          </span>
        </div>
        <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg md:hidden">
          <X className="w-5 h-5 text-gray-500" />
        </button>
      </div>

      <nav className="flex-1 mt-4 px-4 space-y-1.5">
        {menuItems.map((item) => {
          const isActive = pathname === item.href || (item.href !== '/dashboard' && pathname.startsWith(item.href))
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onClose}
              className={cn(
                'flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all group',
                isActive
                  ? 'bg-primary text-white shadow-md shadow-primary/10'
                  : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
              )}
            >
              <item.icon className={cn('w-5 h-5', isActive ? 'text-white' : 'text-gray-400 group-hover:text-gray-900')} />
              {item.label}
            </Link>
          )
        })}
      </nav>

      <div className="p-4 border-t border-gray-100">
        <button
          onClick={handleSignOut}
          className="flex items-center gap-3 w-full px-4 py-3 rounded-xl text-sm font-medium text-rose-600 hover:bg-rose-50 transition-all group"
        >
          <LogOut className="w-5 h-5 text-rose-400 group-hover:text-rose-600" />
          Sign Out
        </button>
      </div>
    </div>
  )

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 hidden md:flex flex-col h-screen sticky top-0">
        {SidebarContent}
      </aside>

      {/* Mobile Sidebar (Drawer) */}
      <div 
        className={cn(
          "fixed inset-0 z-50 md:hidden transition-opacity duration-300",
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
      >
        {/* Backdrop */}
        <div className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm" onClick={onClose} />
        
        {/* Panel */}
        <aside 
          className={cn(
            "absolute inset-y-0 left-0 w-72 bg-white shadow-2xl transition-transform duration-300 ease-in-out",
            isOpen ? "translate-x-0" : "-translate-x-full"
          )}
        >
          {SidebarContent}
        </aside>
      </div>
    </>
  )
}
