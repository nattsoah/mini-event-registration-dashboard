import React from 'react';

interface EmptyStateProps {
  title?: string;
  description?: string;
}

export default function EmptyState({ 
  title = 'No Data Found', 
  description = 'It looks like there are no records matching your criteria.' 
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center p-16 bg-gray-50 rounded-2xl border border-dashed border-gray-300">
      <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-6 text-4xl grayscale opacity-50">
        📂
      </div>
      <h3 className="text-xl font-bold text-gray-900">{title}</h3>
      <p className="text-muted-foreground text-center max-w-sm mt-2">{description}</p>
    </div>
  );
}
