import React from 'react'
import { QuickNote } from '@/types'
import { getRelativeTime } from '@/lib/utils'
import { StickyNote, ExternalLink } from 'lucide-react'

interface QuickNoteCardProps {
  note: QuickNote
}

export function QuickNoteCard({ note }: QuickNoteCardProps) {
  return (
    <a
      href={note.url}
      target="_blank"
      rel="noopener noreferrer"
      className="block bg-white rounded-lg border border-notion-gray-light p-4 hover:shadow-md transition-all group"
    >
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0 mt-1">
          <StickyNote className="w-5 h-5 text-notion-yellow" />
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-medium text-notion-text group-hover:text-notion-blue transition-colors">
              {note.title}
            </h3>
            <ExternalLink className="w-4 h-4 text-notion-gray opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0" />
          </div>

          {note.content && (
            <p className="text-sm text-notion-gray mt-2 line-clamp-3">
              {note.content}
            </p>
          )}

          {/* Tags */}
          {note.tags && note.tags.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-2">
              {note.tags.map((tag, i) => (
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
            {getRelativeTime(note.createdTime)}
          </p>
        </div>
      </div>
    </a>
  )
}
