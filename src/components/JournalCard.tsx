import React from 'react'
import { JournalEntry } from '@/types'
import { formatDate } from '@/lib/utils'
import { BookOpen, ExternalLink } from 'lucide-react'

interface JournalCardProps {
  entry: JournalEntry
}

export function JournalCard({ entry }: JournalCardProps) {
  return (
    <a
      href={entry.url}
      target="_blank"
      rel="noopener noreferrer"
      className="block bg-white rounded-lg border border-notion-gray-light p-4 hover:shadow-md transition-all group"
    >
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0 mt-1">
          <BookOpen className="w-5 h-5 text-notion-purple" />
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div>
              <h3 className="font-medium text-notion-text group-hover:text-notion-blue transition-colors">
                {entry.title}
              </h3>
              <p className="text-sm text-notion-gray mt-0.5">
                {formatDate(entry.date)}
              </p>
            </div>
            <ExternalLink className="w-4 h-4 text-notion-gray opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0" />
          </div>

          {entry.content && (
            <p className="text-sm text-notion-gray mt-2 line-clamp-3">
              {entry.content}
            </p>
          )}

          <div className="flex flex-wrap items-center gap-2 mt-3">
            {/* Mood */}
            {entry.mood && (
              <span className="text-xs px-2 py-1 bg-purple-50 text-purple-600 rounded-full font-medium">
                {entry.mood}
              </span>
            )}

            {/* Tags */}
            {entry.tags && entry.tags.length > 0 && (
              <div className="flex flex-wrap gap-1">
                {entry.tags.map((tag, i) => (
                  <span
                    key={i}
                    className="text-xs px-2 py-0.5 bg-notion-gray-light text-notion-gray rounded"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </a>
  )
}
