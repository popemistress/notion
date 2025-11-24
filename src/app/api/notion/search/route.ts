import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/lib/auth'
import { NotionService } from '@/lib/notion'

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.accessToken) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const searchParams = request.nextUrl.searchParams
    const query = searchParams.get('q') || ''

    const notionService = new NotionService(session.accessToken as string)
    const results = await notionService.searchAll(query)

    return NextResponse.json({
      success: true,
      data: results,
    })
  } catch (error) {
    console.error('Error searching Notion:', error)
    
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to search',
      },
      { status: 500 }
    )
  }
}
