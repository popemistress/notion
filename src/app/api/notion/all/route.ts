import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/lib/auth'
import { NotionService } from '@/lib/notion'
import { DashboardData } from '@/types'

export async function GET(_request: NextRequest) {
  try {
    // Get the session
    const session = await getServerSession(authOptions)

    if (!session?.accessToken) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized - No access token' },
        { status: 401 }
      )
    }

    // Initialize Notion service
    const notionService = new NotionService(session.accessToken as string)

    // Fetch all content
    const data: DashboardData = await notionService.getAllContent()

    return NextResponse.json({
      success: true,
      data,
    })
  } catch (error) {
    console.error('Error fetching Notion data:', error)
    
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to fetch Notion data',
      },
      { status: 500 }
    )
  }
}
