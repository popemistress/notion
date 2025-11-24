import React from 'react'
import { ReadingItem } from '@/types'
import { formatDate, getStatusColor } from '@/lib/utils'
import { BookMarked, ExternalLink, Star } from 'lucide-react'
import { cn } from '@/lib/utils'

interface ReadingCardProps {
  item: ReadingItem
}

export function ReadingCard({ item }: ReadingCardProps) {
  return (
    <a
      href={item.url}
      target="_blank"
      rel="noopener noreferrer"
      className="block bg-white rounded-lg border border-notion-gray-light p-4 hover:shadow-md transition-all group"
    >
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0 mt-1">
          <BookMarked className="w-5 h-5 text-notion-green" />
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div>
              <h3 className="font-medium text-notion-text group-hover:text-notion-blue transition-colors">
                {item.title}
              </h3>
              {item.author && (
                <p className="text-sm text-notion-gray mt-0.5">by {item.author}</p>
              )}
            </div>
            <ExternalLink className="w-4 h-4 text-notion-gray opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0" />
          </div>

          <div className="flex flex-wrap items-center gap-2 mt-3">
            {/* Type */}
            <span className="text-xs px-2 py-1 bg-green-50 text-green-600 rounded-full font-medium">
              {item.type}
            </span>

            {/* Status */}
            <span
              className={cn(
                'text-xs px-2 py-1 rounded-full font-medium',
                getStatusColor(item.status)
              )}
            >
              {item.status.replace('_', ' ')}
            </span>

            {/* Rating */}
            {item.rating && item.rating > 0 && (
              <div className="flex items-center gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={cn(
                      'w-3 h-3',
                      i < item.rating! ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
                    )}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Notes */}
          {item.notes && (
            <p className="text-sm text-notion-gray mt-2 line-clamp-2">
              {item.notes}
            </p>
          )}

          {/* Tags */}
          {item.tags && item.tags.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-2">
              {item.tags.map((tag, i) => (
                <span
                  key={i}
                  className="text-xs px-2 py-0.5 bg-notion-gray-light text-notion-gray rounded"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          <p className="text-xs text-notion-gray mt-2">
            Added {formatDate(item.createdTime)}
          </p>
        </div>
      </div>
    </a>
  )
}
