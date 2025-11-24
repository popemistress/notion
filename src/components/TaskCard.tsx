import React from 'react'
import { Task } from '@/types'
import { formatDate, getStatusColor, getPriorityColor, isOverdue } from '@/lib/utils'
import { CheckCircle2, Circle, Clock, ExternalLink, AlertCircle } from 'lucide-react'
import { cn } from '@/lib/utils'

interface TaskCardProps {
  task: Task
}

export function TaskCard({ task }: TaskCardProps) {
  const statusIcon = task.status === 'completed' ? (
    <CheckCircle2 className="w-5 h-5 text-green-600" />
  ) : (
    <Circle className="w-5 h-5 text-gray-400" />
  )

  const overdue = isOverdue(task.dueDate)

  return (
    <a
      href={task.url}
      target="_blank"
      rel="noopener noreferrer"
      className="block bg-white rounded-lg border border-notion-gray-light p-4 hover:shadow-md transition-all group"
    >
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0 mt-0.5">{statusIcon}</div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <h3
              className={cn(
                'font-medium text-notion-text group-hover:text-notion-blue transition-colors',
                task.status === 'completed' && 'line-through text-notion-gray'
              )}
            >
              {task.title}
            </h3>
            <ExternalLink className="w-4 h-4 text-notion-gray opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0" />
          </div>

          <div className="flex flex-wrap items-center gap-2 mt-2">
            {/* Status */}
            <span
              className={cn(
                'text-xs px-2 py-1 rounded-full font-medium',
                getStatusColor(task.status)
              )}
            >
              {task.status.replace('_', ' ')}
            </span>

            {/* Priority */}
            {task.priority && (
              <span className={cn('text-xs font-medium', getPriorityColor(task.priority))}>
                {task.priority.toUpperCase()}
              </span>
            )}

            {/* Due Date */}
            {task.dueDate && (
              <div
                className={cn(
                  'flex items-center gap-1 text-xs',
                  overdue ? 'text-red-600 font-medium' : 'text-notion-gray'
                )}
              >
                {overdue ? (
                  <AlertCircle className="w-3 h-3" />
                ) : (
                  <Clock className="w-3 h-3" />
                )}
                <span>{formatDate(task.dueDate)}</span>
              </div>
            )}
          </div>

          {/* Tags */}
          {task.tags && task.tags.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-2">
              {task.tags.map((tag, i) => (
                <span
                  key={i}
                  className="text-xs px-2 py-0.5 bg-notion-gray-light text-notion-gray rounded"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Description */}
          {task.description && (
            <p className="text-sm text-notion-gray mt-2 line-clamp-2">
              {task.description}
            </p>
          )}

          <p className="text-xs text-notion-gray mt-2">
            Updated {formatDate(task.lastEditedTime)}
          </p>
        </div>
      </div>
    </a>
  )
}
