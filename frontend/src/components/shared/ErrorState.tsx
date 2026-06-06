import React from 'react';

interface ErrorStateProps {
  message?: string;
  onRetry?: () => void;
}

export default function ErrorState({ message = 'Something went wrong while fetching data.', onRetry }: ErrorStateProps) {
  return (
    <div className="flex flex-col items-center justify-center p-12 bg-destructive/5 rounded-2xl border border-destructive/10">
      <div className="w-12 h-12 bg-destructive/10 rounded-full flex items-center justify-center mb-4">
        <span className="text-2xl">⚠️</span>
      </div>
      <h3 className="text-lg font-bold text-destructive">Data Fetching Error</h3>
      <p className="text-muted-foreground text-center max-w-sm mt-1">{message}</p>
      {onRetry && (
        <button 
          onClick={onRetry}
          className="mt-6 px-6 py-2 bg-destructive text-white rounded-lg font-bold hover:bg-destructive/90 transition-all"
        >
          Try Again
        </button>
      )}
    </div>
  );
}
