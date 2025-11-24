'use client'

import React, { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { DashboardData } from '@/types'
import { TaskCard } from './TaskCard'
import { ProjectCard } from './ProjectCard'
import { JournalCard } from './JournalCard'
import { ReadingCard } from './ReadingCard'
import { QuickNoteCard } from './QuickNoteCard'
import { Section } from './Section'
import { LoadingSkeleton } from './Loading'
import { ErrorState, EmptyState } from './ErrorState'
import { 
  CheckSquare, 
  FolderOpen, 
  BookOpen, 
  BookMarked, 
  StickyNote,
  RefreshCw,
  Search
} from 'lucide-react'

export function Dashboard() {
  const { data: session } = useSession()
  const [data, setData] = useState<DashboardData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [refreshing, setRefreshing] = useState(false)

  const fetchData = async () => {
    try {
      setError(null)
      const response = await fetch('/api/notion/all')
      const result = await response.json()

      if (!result.success) {
        throw new Error(result.error || 'Failed to fetch data')
      }

      setData(result.data)
    } catch (err) {
      console.error('Error fetching dashboard data:', err)
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setLoading(false)
      setRefreshing(false)
    }
  }

  useEffect(() => {
    if (session) {
      fetchData()
    }
  }, [session])

  const handleRefresh = async () => {
    setRefreshing(true)
    await fetchData()
  }

  const filterBySearch = <T extends { title?: string; name?: string }>(items: T[]): T[] => {
    if (!searchQuery.trim()) return items
    const query = searchQuery.toLowerCase()
    return items.filter(item => {
      const searchText = (item.title || item.name || '').toLowerCase()
      return searchText.includes(query)
    })
  }

  if (loading) {
    return (
      <div className="space-y-8">
        <LoadingSkeleton count={3} />
      </div>
    )
  }

  if (error) {
    return <ErrorState message={error} retry={fetchData} />
  }

  if (!data) {
    return (
      <EmptyState
        icon="📭"
        title="No data found"
        description="We couldn't find any content in your Notion workspace."
      />
    )
  }

  const {
    tasks = [],
    projects = [],
    journals = [],
    readingList = [],
    quickNotes = [],
    pages: _pages = [],
  } = data

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-notion-text">
            Welcome back{session?.user?.name ? `, ${session.user.name}` : ''}!
          </h1>
          <p className="text-notion-gray mt-1">
            Here&apos;s everything from your Notion workspace
          </p>
        </div>
        
        <button
          onClick={handleRefresh}
          disabled={refreshing}
          className="flex items-center gap-2 px-4 py-2 bg-white border border-notion-gray-light rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
        >
          <RefreshCw className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`} />
          Refresh
        </button>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-notion-gray" />
        <input
          type="text"
          placeholder="Search across all content..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-3 border border-notion-gray-light rounded-lg focus:outline-none focus:ring-2 focus:ring-notion-blue focus:border-transparent"
        />
      </div>

      {/* Quick Notes */}
      {quickNotes.length > 0 && (
        <Section
          title="Quick Notes"
          icon={<StickyNote className="w-6 h-6 text-notion-yellow" />}
          count={filterBySearch(quickNotes).length}
        >
          {filterBySearch(quickNotes).length === 0 ? (
            <EmptyState
              icon="🔍"
              title="No matching notes"
              description="Try a different search term"
            />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filterBySearch(quickNotes).slice(0, 6).map((note) => (
                <QuickNoteCard key={note.id} note={note} />
              ))}
            </div>
          )}
        </Section>
      )}

      {/* Tasks */}
      {tasks.length > 0 && (
        <Section
          title="Tasks"
          icon={<CheckSquare className="w-6 h-6 text-notion-blue" />}
          count={filterBySearch(tasks).length}
        >
          {filterBySearch(tasks).length === 0 ? (
            <EmptyState
              icon="🔍"
              title="No matching tasks"
              description="Try a different search term"
            />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filterBySearch(tasks).map((task) => (
                <TaskCard key={task.id} task={task} />
              ))}
            </div>
          )}
        </Section>
      )}

      {/* Projects */}
      {projects.length > 0 && (
        <Section
          title="Projects"
          icon={<FolderOpen className="w-6 h-6 text-notion-blue" />}
          count={filterBySearch(projects).length}
        >
          {filterBySearch(projects).length === 0 ? (
            <EmptyState
              icon="🔍"
              title="No matching projects"
              description="Try a different search term"
            />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filterBySearch(projects).map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          )}
        </Section>
      )}

      {/* Journal */}
      {journals.length > 0 && (
        <Section
          title="Journal Entries"
          icon={<BookOpen className="w-6 h-6 text-notion-purple" />}
          count={filterBySearch(journals).length}
        >
          {filterBySearch(journals).length === 0 ? (
            <EmptyState
              icon="🔍"
              title="No matching entries"
              description="Try a different search term"
            />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filterBySearch(journals).slice(0, 6).map((entry) => (
                <JournalCard key={entry.id} entry={entry} />
              ))}
            </div>
          )}
        </Section>
      )}

      {/* Reading List */}
      {readingList.length > 0 && (
        <Section
          title="Reading List"
          icon={<BookMarked className="w-6 h-6 text-notion-green" />}
          count={filterBySearch(readingList).length}
        >
          {filterBySearch(readingList).length === 0 ? (
            <EmptyState
              icon="🔍"
              title="No matching items"
              description="Try a different search term"
            />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filterBySearch(readingList).map((item) => (
                <ReadingCard key={item.id} item={item} />
              ))}
            </div>
          )}
        </Section>
      )}

      {/* Empty state when no content */}
      {tasks.length === 0 &&
        projects.length === 0 &&
        journals.length === 0 &&
        readingList.length === 0 &&
        quickNotes.length === 0 && (
          <EmptyState
            icon="🚀"
            title="Get started with Notion"
            description="Create databases for tasks, projects, journals, or reading lists in Notion to see them here."
          />
        )}
    </div>
  )
}
