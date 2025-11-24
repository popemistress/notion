import { type ClassValue, clsx } from 'clsx'

/**
 * Merge class names
 */
export function cn(...inputs: ClassValue[]) {
  return clsx(inputs)
}

/**
 * Format date to readable string
 */
export function formatDate(dateString: string): string {
  const date = new Date(dateString)
  const now = new Date()
  const diffInMs = now.getTime() - date.getTime()
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24))

  if (diffInDays === 0) return 'Today'
  if (diffInDays === 1) return 'Yesterday'
  if (diffInDays < 7) return `${diffInDays} days ago`
  if (diffInDays < 30) return `${Math.floor(diffInDays / 7)} weeks ago`
  if (diffInDays < 365) return `${Math.floor(diffInDays / 30)} months ago`

  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}

/**
 * Format time to readable string
 */
export function formatTime(dateString: string): string {
  const date = new Date(dateString)
  return date.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  })
}

/**
 * Format full date and time
 */
export function formatDateTime(dateString: string): string {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  })
}

/**
 * Truncate text
 */
export function truncate(text: string, length: number): string {
  if (text.length <= length) return text
  return text.substring(0, length) + '...'
}

/**
 * Get status color
 */
export function getStatusColor(status: string): string {
  const statusColors: Record<string, string> = {
    completed: 'text-green-600 bg-green-50',
    done: 'text-green-600 bg-green-50',
    in_progress: 'text-blue-600 bg-blue-50',
    active: 'text-blue-600 bg-blue-50',
    not_started: 'text-gray-600 bg-gray-50',
    to_read: 'text-gray-600 bg-gray-50',
    planning: 'text-purple-600 bg-purple-50',
    on_hold: 'text-yellow-600 bg-yellow-50',
    reading: 'text-orange-600 bg-orange-50',
  }

  return statusColors[status] || 'text-gray-600 bg-gray-50'
}

/**
 * Get priority color
 */
export function getPriorityColor(priority?: string): string {
  if (!priority) return 'text-gray-400'
  
  const priorityColors: Record<string, string> = {
    high: 'text-red-600',
    medium: 'text-yellow-600',
    low: 'text-green-600',
  }

  return priorityColors[priority.toLowerCase()] || 'text-gray-400'
}

/**
 * Group items by date
 */
export function groupByDate<T extends { createdTime: string }>(
  items: T[]
): Record<string, T[]> {
  return items.reduce((groups, item) => {
    const date = new Date(item.createdTime).toLocaleDateString()
    if (!groups[date]) {
      groups[date] = []
    }
    groups[date].push(item)
    return groups
  }, {} as Record<string, T[]>)
}

/**
 * Sort items by date
 */
export function sortByDate<T extends { createdTime: string }>(
  items: T[],
  direction: 'asc' | 'desc' = 'desc'
): T[] {
  return [...items].sort((a, b) => {
    const dateA = new Date(a.createdTime).getTime()
    const dateB = new Date(b.createdTime).getTime()
    return direction === 'asc' ? dateA - dateB : dateB - dateA
  })
}

/**
 * Filter items by search query
 */
export function filterBySearch<T extends { title: string }>(
  items: T[],
  query: string
): T[] {
  if (!query.trim()) return items

  const lowerQuery = query.toLowerCase()
  return items.filter(item =>
    item.title.toLowerCase().includes(lowerQuery)
  )
}

/**
 * Get icon emoji for content type
 */
export function getContentTypeIcon(type: string): string {
  const icons: Record<string, string> = {
    task: '✓',
    project: '📁',
    journal: '📔',
    reading: '📚',
    note: '📝',
    page: '📄',
  }

  return icons[type] || '📄'
}

/**
 * Calculate reading progress percentage
 */
export function calculateProgress(completed: number, total: number): number {
  if (total === 0) return 0
  return Math.round((completed / total) * 100)
}

/**
 * Debounce function
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null

  return function executedFunction(...args: Parameters<T>) {
    const later = () => {
      timeout = null
      func(...args)
    }

    if (timeout) clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}

/**
 * Generate random ID
 */
export function generateId(): string {
  return Math.random().toString(36).substring(2) + Date.now().toString(36)
}

/**
 * Check if date is overdue
 */
export function isOverdue(dateString?: string): boolean {
  if (!dateString) return false
  return new Date(dateString) < new Date()
}

/**
 * Get relative time string
 */
export function getRelativeTime(dateString: string): string {
  const date = new Date(dateString)
  const now = new Date()
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000)

  if (diffInSeconds < 60) return 'just now'
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`
  if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)}d ago`
  
  return formatDate(dateString)
}

/**
 * Validate email
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

/**
 * Sleep utility for async operations
 */
export function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms))
}
