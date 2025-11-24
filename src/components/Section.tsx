import React from 'react'
import { cn } from '@/lib/utils'

interface SectionProps {
  title: string
  icon?: React.ReactNode
  count?: number
  children: React.ReactNode
  action?: {
    label: string
    onClick: () => void
  }
  className?: string
}

export function Section({ title, icon, count, children, action, className }: SectionProps) {
  return (
    <section className={cn('space-y-4', className)}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {icon && <div className="text-2xl">{icon}</div>}
          <h2 className="text-xl font-semibold text-notion-text">
            {title}
            {count !== undefined && (
              <span className="ml-2 text-sm font-normal text-notion-gray">
                ({count})
              </span>
            )}
          </h2>
        </div>
        {action && (
          <button
            onClick={action.onClick}
            className="text-sm text-notion-blue hover:underline"
          >
            {action.label}
          </button>
        )}
      </div>
      <div>{children}</div>
    </section>
  )
}
