// User session type
export interface NotionUser {
  access_token: string
  bot_id: string
  duplicated_template_id: string | null
  owner: {
    type: string
    user?: {
      id: string
      name: string
      avatar_url: string
      type: string
      person?: {
        email: string
      }
    }
  }
  workspace_icon: string | null
  workspace_id: string
  workspace_name: string | null
}

// Extended session type
export interface ExtendedSession {
  user: {
    name?: string | null
    email?: string | null
    image?: string | null
  }
  accessToken?: string
  workspaceId?: string
  workspaceName?: string
  expires: string
}

// Notion page types
export interface NotionPage {
  id: string
  title: string
  url: string
  icon?: string
  cover?: string
  createdTime: string
  lastEditedTime: string
  type: 'page' | 'database'
  properties?: Record<string, any>
}

// Task structure
export interface Task {
  id: string
  title: string
  status: 'not_started' | 'in_progress' | 'completed'
  priority?: 'low' | 'medium' | 'high'
  dueDate?: string
  createdTime: string
  lastEditedTime: string
  url: string
  tags?: string[]
  description?: string
}

// Project structure
export interface Project {
  id: string
  name: string
  description?: string
  status: 'planning' | 'active' | 'completed' | 'on_hold'
  startDate?: string
  endDate?: string
  progress?: number
  createdTime: string
  lastEditedTime: string
  url: string
  tags?: string[]
}

// Journal entry structure
export interface JournalEntry {
  id: string
  title: string
  date: string
  content?: string
  mood?: string
  tags?: string[]
  createdTime: string
  lastEditedTime: string
  url: string
}

// Reading list item structure
export interface ReadingItem {
  id: string
  title: string
  author?: string
  type: 'book' | 'article' | 'paper' | 'other'
  status: 'to_read' | 'reading' | 'completed'
  rating?: number
  notes?: string
  url: string
  createdTime: string
  lastEditedTime: string
  tags?: string[]
}

// Quick note structure
export interface QuickNote {
  id: string
  title: string
  content?: string
  createdTime: string
  lastEditedTime: string
  url: string
  tags?: string[]
}

// Unified content type
export type NotionContent = 
  | (NotionPage & { contentType: 'page' })
  | (Task & { contentType: 'task' })
  | (Project & { contentType: 'project' })
  | (JournalEntry & { contentType: 'journal' })
  | (ReadingItem & { contentType: 'reading' })
  | (QuickNote & { contentType: 'note' })

// API response types
export interface NotionApiResponse<T> {
  success: boolean
  data?: T
  error?: string
}

export interface DashboardData {
  tasks: Task[]
  projects: Project[]
  journals: JournalEntry[]
  readingList: ReadingItem[]
  quickNotes: QuickNote[]
  pages: NotionPage[]
}

// Filter and sort options
export interface FilterOptions {
  status?: string[]
  tags?: string[]
  dateRange?: {
    start: string
    end: string
  }
}

export interface SortOptions {
  field: string
  direction: 'asc' | 'desc'
}

// Component props types
export interface CardProps {
  title: string
  children: React.ReactNode
  icon?: React.ReactNode
  action?: {
    label: string
    onClick: () => void
  }
}

export interface LoadingStateProps {
  message?: string
}

export interface ErrorStateProps {
  message: string
  retry?: () => void
}
