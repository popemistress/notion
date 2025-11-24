import React from 'react'
import { AlertCircle, RefreshCw } from 'lucide-react'

interface ErrorStateProps {
  message: string
  retry?: () => void
  fullScreen?: boolean
}

export function ErrorState({ message, retry, fullScreen = false }: ErrorStateProps) {
  const content = (
    <div className="flex flex-col items-center justify-center gap-4 text-center p-8">
      <div className="rounded-full bg-red-50 p-4">
        <AlertCircle className="w-8 h-8 text-red-500" />
      </div>
      <div className="space-y-2">
        <h3 className="text-lg font-semibold text-notion-text">
          Something went wrong
        </h3>
        <p className="text-sm text-notion-gray max-w-md">{message}</p>
      </div>
      {retry && (
        <button
          onClick={retry}
          className="flex items-center gap-2 px-4 py-2 bg-notion-blue text-white rounded-lg hover:bg-opacity-90 transition-all"
        >
          <RefreshCw className="w-4 h-4" />
          Try Again
        </button>
      )}
    </div>
  )

  if (fullScreen) {
    return (
      <div className="fixed inset-0 bg-white flex items-center justify-center">
        {content}
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg border border-red-200">{content}</div>
  )
}

export function EmptyState({ 
  icon, 
  title, 
  description 
}: { 
  icon: React.ReactNode
  title: string
  description: string 
}) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 text-center p-12">
      <div className="rounded-full bg-notion-gray-light p-4 text-4xl">
        {icon}
      </div>
      <div className="space-y-1">
        <h3 className="text-lg font-semibold text-notion-text">{title}</h3>
        <p className="text-sm text-notion-gray max-w-md">{description}</p>
      </div>
    </div>
  )
}
