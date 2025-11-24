import { Client } from '@notionhq/client'
import {
  PageObjectResponse,
  DatabaseObjectResponse,
  QueryDatabaseResponse,
} from '@notionhq/client/build/src/api-endpoints'
import {
  NotionPage,
  Task,
  Project,
  JournalEntry,
  ReadingItem,
  QuickNote,
  DashboardData,
} from '@/types'

export class NotionService {
  private client: Client

  constructor(accessToken: string) {
    this.client = new Client({ auth: accessToken })
  }

  /**
   * Search for all pages and databases accessible to the integration
   */
  async searchAll(query?: string): Promise<NotionPage[]> {
    try {
      const response = await this.client.search({
        query: query || '',
        filter: {
          property: 'object',
          value: 'page',
        },
        sort: {
          direction: 'descending',
          timestamp: 'last_edited_time',
        },
        page_size: 100,
      })

      return response.results
        .filter((page): page is PageObjectResponse => 'properties' in page)
        .map(this.mapToNotionPage)
    } catch (error) {
      console.error('Error searching Notion:', error)
      throw new Error('Failed to search Notion content')
    }
  }

  /**
   * Get all databases
   */
  async getDatabases(): Promise<NotionPage[]> {
    try {
      const response = await this.client.search({
        filter: {
          property: 'object',
          value: 'database',
        },
        sort: {
          direction: 'descending',
          timestamp: 'last_edited_time',
        },
      })

      return response.results
        .filter((db): db is DatabaseObjectResponse => 'title' in db)
        .map(this.mapDatabaseToPage)
    } catch (error) {
      console.error('Error fetching databases:', error)
      return []
    }
  }

  /**
   * Query a specific database
   */
  async queryDatabase(databaseId: string): Promise<PageObjectResponse[]> {
    try {
      const response = await this.client.databases.query({
        database_id: databaseId,
        page_size: 100,
      })

      return response.results.filter(
        (page): page is PageObjectResponse => 'properties' in page
      )
    } catch (error) {
      console.error(`Error querying database ${databaseId}:`, error)
      return []
    }
  }

  /**
   * Get all content organized by type
   */
  async getAllContent(): Promise<DashboardData> {
    try {
      const [pages, databases] = await Promise.all([
        this.searchAll(),
        this.getDatabases(),
      ])

      // Initialize arrays for each content type
      const tasks: Task[] = []
      const projects: Project[] = []
      const journals: JournalEntry[] = []
      const readingList: ReadingItem[] = []
      const quickNotes: QuickNote[] = []

      // Query each database and categorize content
      for (const db of databases) {
        const dbPages = await this.queryDatabase(db.id)
        const dbName = db.title.toLowerCase()

        // Categorize based on database name/properties
        if (this.isTaskDatabase(dbName)) {
          tasks.push(...this.mapToTasks(dbPages))
        } else if (this.isProjectDatabase(dbName)) {
          projects.push(...this.mapToProjects(dbPages))
        } else if (this.isJournalDatabase(dbName)) {
          journals.push(...this.mapToJournals(dbPages))
        } else if (this.isReadingDatabase(dbName)) {
          readingList.push(...this.mapToReadingList(dbPages))
        } else if (this.isQuickNoteDatabase(dbName)) {
          quickNotes.push(...this.mapToQuickNotes(dbPages))
        }
      }

      // Also check standalone pages for quick notes
      const standalonNotes = pages
        .filter(p => p.type === 'page' && this.isQuickNote(p))
        .map(this.mapPageToQuickNote)

      return {
        tasks,
        projects,
        journals,
        readingList,
        quickNotes: [...quickNotes, ...standalonNotes],
        pages: pages.filter(p => p.type === 'page'),
      }
    } catch (error) {
      console.error('Error fetching all content:', error)
      throw new Error('Failed to fetch Notion content')
    }
  }

  /**
   * Helper: Check if database is for tasks
   */
  private isTaskDatabase(name: string): boolean {
    return /task|todo|to-do/i.test(name)
  }

  /**
   * Helper: Check if database is for projects
   */
  private isProjectDatabase(name: string): boolean {
    return /project/i.test(name)
  }

  /**
   * Helper: Check if database is for journals
   */
  private isJournalDatabase(name: string): boolean {
    return /journal|diary|daily/i.test(name)
  }

  /**
   * Helper: Check if database is for reading list
   */
  private isReadingDatabase(name: string): boolean {
    return /reading|book|article/i.test(name)
  }

  /**
   * Helper: Check if database is for quick notes
   */
  private isQuickNoteDatabase(name: string): boolean {
    return /note|quick|inbox/i.test(name)
  }

  /**
   * Helper: Check if page is a quick note
   */
  private isQuickNote(page: NotionPage): boolean {
    // Consider standalone pages created recently as quick notes
    const created = new Date(page.createdTime)
    const weekAgo = new Date()
    weekAgo.setDate(weekAgo.getDate() - 7)
    return created > weekAgo
  }

  /**
   * Map Notion page to NotionPage type
   */
  private mapToNotionPage(page: PageObjectResponse): NotionPage {
    const title = this.extractTitle(page.properties)
    
    return {
      id: page.id,
      title: title || 'Untitled',
      url: page.url,
      icon: this.extractIcon(page.icon),
      cover: this.extractCover(page.cover),
      createdTime: page.created_time,
      lastEditedTime: page.last_edited_time,
      type: 'page',
      properties: page.properties,
    }
  }

  /**
   * Map database to NotionPage type
   */
  private mapDatabaseToPage(db: DatabaseObjectResponse): NotionPage {
    const title = db.title.map(t => t.plain_text).join('')
    
    return {
      id: db.id,
      title: title || 'Untitled Database',
      url: db.url,
      icon: this.extractIcon(db.icon),
      cover: this.extractCover(db.cover),
      createdTime: db.created_time,
      lastEditedTime: db.last_edited_time,
      type: 'database',
    }
  }

  /**
   * Map database pages to Tasks
   */
  private mapToTasks(pages: PageObjectResponse[]): Task[] {
    return pages.map(page => {
      const title = this.extractTitle(page.properties)
      const status = this.extractSelect(page.properties, 'Status') || 'not_started'
      const priority = this.extractSelect(page.properties, 'Priority')
      const dueDate = this.extractDate(page.properties, 'Due Date')
      const tags = this.extractMultiSelect(page.properties, 'Tags')

      return {
        id: page.id,
        title: title || 'Untitled Task',
        status: this.mapTaskStatus(status),
        priority: priority?.toLowerCase() as 'low' | 'medium' | 'high' | undefined,
        dueDate,
        createdTime: page.created_time,
        lastEditedTime: page.last_edited_time,
        url: page.url,
        tags,
      }
    })
  }

  /**
   * Map database pages to Projects
   */
  private mapToProjects(pages: PageObjectResponse[]): Project[] {
    return pages.map(page => {
      const name = this.extractTitle(page.properties)
      const status = this.extractSelect(page.properties, 'Status') || 'active'
      const startDate = this.extractDate(page.properties, 'Start Date')
      const endDate = this.extractDate(page.properties, 'End Date')
      const tags = this.extractMultiSelect(page.properties, 'Tags')

      return {
        id: page.id,
        name: name || 'Untitled Project',
        status: this.mapProjectStatus(status),
        startDate,
        endDate,
        createdTime: page.created_time,
        lastEditedTime: page.last_edited_time,
        url: page.url,
        tags,
      }
    })
  }

  /**
   * Map database pages to Journal Entries
   */
  private mapToJournals(pages: PageObjectResponse[]): JournalEntry[] {
    return pages.map(page => {
      const title = this.extractTitle(page.properties)
      const date = this.extractDate(page.properties, 'Date') || page.created_time
      const mood = this.extractSelect(page.properties, 'Mood')
      const tags = this.extractMultiSelect(page.properties, 'Tags')

      return {
        id: page.id,
        title: title || 'Untitled Entry',
        date,
        mood,
        tags,
        createdTime: page.created_time,
        lastEditedTime: page.last_edited_time,
        url: page.url,
      }
    })
  }

  /**
   * Map database pages to Reading List
   */
  private mapToReadingList(pages: PageObjectResponse[]): ReadingItem[] {
    return pages.map(page => {
      const title = this.extractTitle(page.properties)
      const author = this.extractRichText(page.properties, 'Author')
      const type = this.extractSelect(page.properties, 'Type') || 'other'
      const status = this.extractSelect(page.properties, 'Status') || 'to_read'
      const rating = this.extractNumber(page.properties, 'Rating')
      const tags = this.extractMultiSelect(page.properties, 'Tags')

      return {
        id: page.id,
        title: title || 'Untitled',
        author,
        type: type.toLowerCase() as 'book' | 'article' | 'paper' | 'other',
        status: this.mapReadingStatus(status),
        rating,
        tags,
        url: page.url,
        createdTime: page.created_time,
        lastEditedTime: page.last_edited_time,
      }
    })
  }

  /**
   * Map database pages to Quick Notes
   */
  private mapToQuickNotes(pages: PageObjectResponse[]): QuickNote[] {
    return pages.map(page => {
      const title = this.extractTitle(page.properties)
      const tags = this.extractMultiSelect(page.properties, 'Tags')

      return {
        id: page.id,
        title: title || 'Untitled Note',
        tags,
        createdTime: page.created_time,
        lastEditedTime: page.last_edited_time,
        url: page.url,
      }
    })
  }

  /**
   * Map standalone page to Quick Note
   */
  private mapPageToQuickNote = (page: NotionPage): QuickNote => {
    return {
      id: page.id,
      title: page.title,
      createdTime: page.createdTime,
      lastEditedTime: page.lastEditedTime,
      url: page.url,
    }
  }

  // Property extraction helpers
  private extractTitle(properties: Record<string, any>): string {
    const titleProp = Object.values(properties).find(
      (prop: any) => prop.type === 'title'
    ) as any
    
    if (titleProp?.title) {
      return titleProp.title.map((t: any) => t.plain_text).join('')
    }
    return ''
  }

  private extractRichText(properties: Record<string, any>, name: string): string | undefined {
    const prop = properties[name]
    if (prop?.type === 'rich_text' && prop.rich_text) {
      return prop.rich_text.map((t: any) => t.plain_text).join('')
    }
    return undefined
  }

  private extractSelect(properties: Record<string, any>, name: string): string | undefined {
    const prop = properties[name]
    return prop?.type === 'select' ? prop.select?.name : undefined
  }

  private extractMultiSelect(properties: Record<string, any>, name: string): string[] {
    const prop = properties[name]
    if (prop?.type === 'multi_select' && prop.multi_select) {
      return prop.multi_select.map((s: any) => s.name)
    }
    return []
  }

  private extractDate(properties: Record<string, any>, name: string): string | undefined {
    const prop = properties[name]
    return prop?.type === 'date' ? prop.date?.start : undefined
  }

  private extractNumber(properties: Record<string, any>, name: string): number | undefined {
    const prop = properties[name]
    return prop?.type === 'number' ? prop.number : undefined
  }

  private extractIcon(icon: any): string | undefined {
    if (!icon) return undefined
    if (icon.type === 'emoji') return icon.emoji
    if (icon.type === 'external') return icon.external.url
    if (icon.type === 'file') return icon.file.url
    return undefined
  }

  private extractCover(cover: any): string | undefined {
    if (!cover) return undefined
    if (cover.type === 'external') return cover.external.url
    if (cover.type === 'file') return cover.file.url
    return undefined
  }

  // Status mapping helpers
  private mapTaskStatus(status: string): 'not_started' | 'in_progress' | 'completed' {
    const normalized = status.toLowerCase().replace(/\s+/g, '_')
    if (normalized.includes('complete') || normalized.includes('done')) return 'completed'
    if (normalized.includes('progress') || normalized.includes('doing')) return 'in_progress'
    return 'not_started'
  }

  private mapProjectStatus(status: string): 'planning' | 'active' | 'completed' | 'on_hold' {
    const normalized = status.toLowerCase().replace(/\s+/g, '_')
    if (normalized.includes('complete') || normalized.includes('done')) return 'completed'
    if (normalized.includes('hold') || normalized.includes('pause')) return 'on_hold'
    if (normalized.includes('plan')) return 'planning'
    return 'active'
  }

  private mapReadingStatus(status: string): 'to_read' | 'reading' | 'completed' {
    const normalized = status.toLowerCase().replace(/\s+/g, '_')
    if (normalized.includes('complete') || normalized.includes('done') || normalized.includes('read')) {
      return 'completed'
    }
    if (normalized.includes('reading') || normalized.includes('progress')) return 'reading'
    return 'to_read'
  }
}
