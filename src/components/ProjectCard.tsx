import React from 'react'
import { Project } from '@/types'
import { formatDate, getStatusColor } from '@/lib/utils'
import { FolderOpen, ExternalLink, Calendar } from 'lucide-react'
import { cn } from '@/lib/utils'

interface ProjectCardProps {
  project: Project
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <a
      href={project.url}
      target="_blank"
      rel="noopener noreferrer"
      className="block bg-white rounded-lg border border-notion-gray-light p-4 hover:shadow-md transition-all group"
    >
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0 mt-1">
          <FolderOpen className="w-5 h-5 text-notion-blue" />
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-medium text-notion-text group-hover:text-notion-blue transition-colors">
              {project.name}
            </h3>
            <ExternalLink className="w-4 h-4 text-notion-gray opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0" />
          </div>

          {project.description && (
            <p className="text-sm text-notion-gray mt-1 line-clamp-2">
              {project.description}
            </p>
          )}

          <div className="flex flex-wrap items-center gap-2 mt-3">
            {/* Status */}
            <span
              className={cn(
                'text-xs px-2 py-1 rounded-full font-medium',
                getStatusColor(project.status)
              )}
            >
              {project.status.replace('_', ' ')}
            </span>

            {/* Progress */}
            {project.progress !== undefined && (
              <div className="flex items-center gap-2">
                <div className="w-24 h-2 bg-notion-gray-light rounded-full overflow-hidden">
                  <div
                    className="h-full bg-notion-blue rounded-full transition-all"
                    style={{ width: `${project.progress}%` }}
                  />
                </div>
                <span className="text-xs text-notion-gray">{project.progress}%</span>
              </div>
            )}
          </div>

          {/* Dates */}
          {(project.startDate || project.endDate) && (
            <div className="flex items-center gap-3 mt-2 text-xs text-notion-gray">
              {project.startDate && (
                <div className="flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  <span>Start: {formatDate(project.startDate)}</span>
                </div>
              )}
              {project.endDate && (
                <div className="flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  <span>End: {formatDate(project.endDate)}</span>
                </div>
              )}
            </div>
          )}

          {/* Tags */}
          {project.tags && project.tags.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-2">
              {project.tags.map((tag, i) => (
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
            Updated {formatDate(project.lastEditedTime)}
          </p>
        </div>
      </div>
    </a>
  )
}
