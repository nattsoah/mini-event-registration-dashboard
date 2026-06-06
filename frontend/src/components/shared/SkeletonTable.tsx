export function SkeletonTable() {
  return (
    <div className="w-full animate-pulse">
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="bg-gray-50 border-b border-gray-200 h-12 flex items-center px-6">
          <div className="h-4 bg-gray-200 rounded w-full"></div>
        </div>
        {[...Array(5)].map((_, i) => (
          <div key={i} className="border-b border-gray-100 h-16 flex items-center px-6 space-x-4">
            <div className="h-10 w-10 bg-gray-100 rounded-full"></div>
            <div className="flex-1 space-y-2">
              <div className="h-4 bg-gray-100 rounded w-1/4"></div>
              <div className="h-3 bg-gray-100 rounded w-1/6"></div>
            </div>
            <div className="h-4 bg-gray-100 rounded w-20"></div>
            <div className="h-8 bg-gray-100 rounded-full w-24"></div>
            <div className="h-4 bg-gray-100 rounded w-32"></div>
          </div>
        ))}
      </div>
    </div>
  )
}
