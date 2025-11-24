# API Documentation

This document describes the API endpoints available in the Notion Dashboard application.

## Authentication

All API endpoints (except authentication endpoints) require a valid session. The session is managed by NextAuth.js using JWT tokens.

### Headers

```
Cookie: next-auth.session-token=<session-token>
```

### Response Format

All API responses follow this format:

```typescript
{
  success: boolean
  data?: T
  error?: string
}
```

## Endpoints

### Authentication

#### `POST /api/auth/signin/notion`

Initiates OAuth flow with Notion.

**Request:**
```
No body required
```

**Response:**
Redirects to Notion OAuth authorization page.

---

#### `GET /api/auth/callback/notion`

OAuth callback endpoint. Handles the authorization code from Notion.

**Query Parameters:**
- `code` (string, required): Authorization code from Notion

**Response:**
Redirects to `/dashboard` on success or `/auth/error` on failure.

---

### Notion Content

#### `GET /api/notion/all`

Fetches all content from the user's Notion workspace, organized by type.

**Authentication:** Required

**Response:**
```typescript
{
  success: true,
  data: {
    tasks: Task[],
    projects: Project[],
    journals: JournalEntry[],
    readingList: ReadingItem[],
    quickNotes: QuickNote[],
    pages: NotionPage[]
  }
}
```

**Error Response:**
```typescript
{
  success: false,
  error: "Error message"
}
```

**Status Codes:**
- `200`: Success
- `401`: Unauthorized (no valid session)
- `500`: Server error

**Example:**
```bash
curl -X GET https://your-app.com/api/notion/all \
  -H "Cookie: next-auth.session-token=..."
```

---

#### `GET /api/notion/search`

Searches across all Notion content.

**Authentication:** Required

**Query Parameters:**
- `q` (string, optional): Search query

**Response:**
```typescript
{
  success: true,
  data: NotionPage[]
}
```

**Example:**
```bash
curl -X GET "https://your-app.com/api/notion/search?q=project" \
  -H "Cookie: next-auth.session-token=..."
```

---

## Type Definitions

### Task

```typescript
interface Task {
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
```

### Project

```typescript
interface Project {
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
```

### JournalEntry

```typescript
interface JournalEntry {
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
```

### ReadingItem

```typescript
interface ReadingItem {
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
```

### QuickNote

```typescript
interface QuickNote {
  id: string
  title: string
  content?: string
  createdTime: string
  lastEditedTime: string
  url: string
  tags?: string[]
}
```

### NotionPage

```typescript
interface NotionPage {
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
```

## Error Handling

### Error Codes

| Code | Description |
|------|-------------|
| `400` | Bad Request - Invalid parameters |
| `401` | Unauthorized - No valid session |
| `403` | Forbidden - Insufficient permissions |
| `404` | Not Found - Resource doesn't exist |
| `500` | Internal Server Error |

### Error Response Format

```typescript
{
  success: false,
  error: string
}
```

### Common Errors

#### Authentication Errors

```json
{
  "success": false,
  "error": "Unauthorized - No access token"
}
```

**Solution:** User needs to sign in again.

#### Notion API Errors

```json
{
  "success": false,
  "error": "Failed to fetch Notion content"
}
```

**Possible Causes:**
- Notion integration has been revoked
- Network connectivity issues
- Notion API is down

## Rate Limiting

The application respects Notion API rate limits:
- 3 requests per second
- Exponential backoff on rate limit errors

## Caching

API responses are cached client-side using React Query:
- Cache duration: 1 minute
- Stale time: 1 minute
- Automatic background refetch disabled

## Security

### CORS

CORS is not enabled by default. If you need to access the API from a different origin, configure Next.js middleware.

### Session Security

- Sessions use JWT tokens
- Tokens are HTTP-only cookies
- Tokens expire after 30 days
- Tokens are signed with NEXTAUTH_SECRET

### API Key Protection

Notion OAuth credentials are stored server-side only and never exposed to the client.

## Testing

### Using curl

```bash
# Get all content (requires valid session cookie)
curl -X GET https://your-app.com/api/notion/all \
  -H "Cookie: next-auth.session-token=your-session-token"

# Search content
curl -X GET "https://your-app.com/api/notion/search?q=task" \
  -H "Cookie: next-auth.session-token=your-session-token"
```

### Using Postman

1. Sign in to the application in a browser
2. Copy the `next-auth.session-token` cookie value
3. Add it to your Postman request cookies
4. Make API calls

### Using JavaScript/Fetch

```javascript
// Fetch all content
const response = await fetch('/api/notion/all', {
  credentials: 'include' // Include cookies
})
const data = await response.json()

if (data.success) {
  console.log('Content:', data.data)
} else {
  console.error('Error:', data.error)
}
```

## Extending the API

### Adding New Endpoints

1. Create a new route file in `src/app/api/notion/`
2. Export GET/POST functions
3. Use `getServerSession` for authentication
4. Return standardized response format

Example:

```typescript
// src/app/api/notion/tasks/route.ts
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

    const notionService = new NotionService(session.accessToken)
    const tasks = await notionService.getTasks()

    return NextResponse.json({ success: true, data: tasks })
  } catch (error) {
    return NextResponse.json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : 'Unknown error' 
      },
      { status: 500 }
    )
  }
}
```

## Webhooks

The application does not currently support webhooks. To get real-time updates, the client must manually refresh data.

**Future Enhancement:** Implement Notion webhooks for real-time updates.

## Versioning

Current API version: `v1` (implicit)

The API follows semantic versioning principles. Breaking changes will result in a new major version.

## Support

For API questions or issues:
1. Check this documentation
2. Review the source code
3. Open an issue on GitHub

---

Last updated: 2024
