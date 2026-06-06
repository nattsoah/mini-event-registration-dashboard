import ProtectedRoute from '@/components/auth/ProtectedRoute';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-background flex">
        {/* Sidebar Space - We will add actual Sidebar component later */}
        <aside className="w-64 bg-card border-r hidden md:block overflow-y-auto">
            <div className="p-6">
                <h2 className="text-xl font-bold text-primary">Admin Panel</h2>
            </div>
            <nav className="mt-6 px-4 space-y-2">
                <div className="p-3 rounded-lg bg-primary/10 text-primary font-bold">Dashboard</div>
                <div className="p-3 rounded-lg hover:bg-gray-100 transition-colors">Registrations</div>
            </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 flex flex-col">
          <header className="h-16 border-b bg-card flex items-center justify-between px-8">
            <h1 className="text-lg font-semibold">Overview</h1>
            <div className="flex items-center gap-4">
                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">A</div>
            </div>
          </header>
          <div className="p-8">
            {children}
          </div>
        </main>
      </div>
    </ProtectedRoute>
  );
}
