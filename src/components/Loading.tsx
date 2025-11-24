import React from 'react'
import { cn } from '@/lib/utils'

interface LoadingProps {
  size?: 'sm' | 'md' | 'lg'
  message?: string
  fullScreen?: boolean
}

export function Loading({ size = 'md', message, fullScreen = false }: LoadingProps) {
  const sizeClasses = {
    sm: 'w-6 h-6 border-2',
    md: 'w-12 h-12 border-3',
    lg: 'w-16 h-16 border-4',
  }

  const spinner = (
    <div className="flex flex-col items-center justify-center gap-4">
      <div
        className={cn(
          'animate-spin rounded-full border-notion-gray border-t-notion-blue',
          sizeClasses[size]
        )}
      />
      {message && (
        <p className="text-sm text-notion-gray animate-pulse">{message}</p>
      )}
    </div>
  )

  if (fullScreen) {
    return (
      <div className="fixed inset-0 bg-white bg-opacity-90 backdrop-blur-sm flex items-center justify-center z-50">
        {spinner}
      </div>
    )
  }

  return spinner
}

export function LoadingCard() {
  return (
    <div className="bg-white rounded-lg border border-notion-gray-light p-6 animate-pulse">
      <div className="space-y-3">
        <div className="h-4 bg-notion-gray-light rounded w-3/4"></div>
        <div className="h-3 bg-notion-gray-light rounded w-1/2"></div>
        <div className="h-3 bg-notion-gray-light rounded w-5/6"></div>
      </div>
    </div>
  )
}

export function LoadingSkeleton({ count = 3 }: { count?: number }) {
  return (
    <div className="space-y-4">
      {Array.from({ length: count }).map((_, i) => (
        <LoadingCard key={i} />
      ))}
    </div>
  )
}
