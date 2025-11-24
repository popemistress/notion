# Project Structure

Complete file tree of the Notion Dashboard application.

```
notion-dashboard/
│
├── src/                                    # Source code directory
│   ├── app/                               # Next.js App Router
│   │   ├── api/                          # API routes
│   │   │   ├── auth/                     # Authentication endpoints
│   │   │   │   └── [...nextauth]/        # NextAuth catch-all route
│   │   │   │       └── route.ts          # NextAuth configuration handler
│   │   │   └── notion/                   # Notion API endpoints
│   │   │       ├── all/                  # Fetch all content endpoint
│   │   │       │   └── route.ts          # GET handler for all content
│   │   │       └── search/               # Search endpoint
│   │   │           └── route.ts          # GET handler for search
│   │   ├── auth/                         # Auth-related pages
│   │   │   └── error/                    # Auth error page
│   │   │       └── page.tsx              # Error display component
│   │   ├── dashboard/                    # Dashboard page
│   │   │   └── page.tsx                  # Main dashboard page
│   │   ├── globals.css                   # Global styles with Tailwind
│   │   ├── layout.tsx                    # Root layout component
│   │   ├── page.tsx                      # Home/landing page
│   │   └── providers.tsx                 # Context providers wrapper
│   │
│   ├── components/                        # React components
│   │   ├── Dashboard.tsx                 # Main dashboard component
│   │   ├── ErrorState.tsx                # Error handling components
│   │   ├── Header.tsx                    # Navigation header
│   │   ├── JournalCard.tsx              # Journal entry card
│   │   ├── Loading.tsx                   # Loading states
│   │   ├── ProjectCard.tsx              # Project card
│   │   ├── QuickNoteCard.tsx            # Quick note card
│   │   ├── ReadingCard.tsx              # Reading list item card
│   │   ├── Section.tsx                   # Section wrapper component
│   │   └── TaskCard.tsx                  # Task card
│   │
│   ├── lib/                               # Utility libraries
│   │   ├── auth.ts                       # NextAuth configuration
│   │   ├── notion.ts                     # Notion service class
│   │   └── utils.ts                      # Utility functions
│   │
│   └── types/                             # TypeScript definitions
│       └── index.ts                      # All type definitions
│
├── public/                                # Static assets
│   └── (static files like favicon, images, etc.)
│
├── .env.example                           # Environment variables template
├── .eslintrc.json                        # ESLint configuration
├── .gitignore                            # Git ignore rules
├── API.md                                # API documentation
├── CHANGELOG.md                          # Version history
├── CONTRIBUTING.md                       # Contributing guidelines
├── DEPLOYMENT.md                         # Deployment guide
├── LICENSE                               # MIT License
├── next.config.js                        # Next.js configuration
├── package.json                          # Dependencies and scripts
├── postcss.config.js                     # PostCSS configuration
├── PROJECT_STRUCTURE.md                  # This file
├── QUICKSTART.md                         # Quick start guide
├── README.md                             # Main documentation
├── tailwind.config.js                    # Tailwind CSS configuration
└── tsconfig.json                         # TypeScript configuration

```

## Directory Descriptions

### `/src/app/`
Next.js 14 App Router directory containing all pages and API routes.

**Key Features:**
- File-based routing
- Server components by default
- API routes co-located with pages
- Layout inheritance

### `/src/components/`
Reusable React components following atomic design principles.

**Organization:**
- UI components (cards, headers, loading states)
- Feature-specific components
- Layout components

### `/src/lib/`
Business logic, services, and utility functions.

**Contents:**
- `auth.ts`: NextAuth OAuth configuration
- `notion.ts`: Notion API service layer
- `utils.ts`: Helper functions (formatting, filtering, etc.)

### `/src/types/`
TypeScript type definitions for type safety.

**Contents:**
- Interface definitions
- Type aliases
- API response types
- Component prop types

## Key Files

### Configuration Files

| File | Purpose |
|------|---------|
| `next.config.js` | Next.js configuration (images, env vars) |
| `tsconfig.json` | TypeScript compiler options |
| `tailwind.config.js` | Tailwind CSS theme and plugins |
| `postcss.config.js` | PostCSS plugins for Tailwind |
| `.eslintrc.json` | ESLint rules and settings |
| `package.json` | Dependencies and npm scripts |

### Environment Configuration

| File | Purpose |
|------|---------|
| `.env.example` | Template for environment variables |
| `.env.local` | Local development environment (not in git) |

### Documentation Files

| File | Purpose |
|------|---------|
| `README.md` | Main project documentation |
| `QUICKSTART.md` | 5-minute setup guide |
| `API.md` | API endpoints documentation |
| `DEPLOYMENT.md` | Production deployment guide |
| `CONTRIBUTING.md` | Contribution guidelines |
| `CHANGELOG.md` | Version history |
| `LICENSE` | MIT license |

## Component Architecture

### Page Components
```
HomePage (/)
└── Landing page with authentication

DashboardPage (/dashboard)
├── Header
└── Dashboard
    ├── Search
    ├── TaskCard (multiple)
    ├── ProjectCard (multiple)
    ├── JournalCard (multiple)
    ├── ReadingCard (multiple)
    └── QuickNoteCard (multiple)
```

### Shared Components
- **Loading**: Spinner and skeleton states
- **ErrorState**: Error displays with retry
- **Section**: Content section wrapper
- **Cards**: Content type displays

## Data Flow

```
User Browser
    ↓ (OAuth)
NextAuth.js
    ↓ (Session)
API Routes (/api/notion/*)
    ↓ (Access Token)
Notion Service (lib/notion.ts)
    ↓ (Notion SDK)
Notion API
    ↓ (JSON Data)
React Components
    ↓ (Render)
User Interface
```

## State Management

- **Session**: NextAuth.js (JWT-based)
- **Server State**: React Query (@tanstack/react-query)
- **Component State**: React useState/useReducer
- **No Global State**: Props and context passing

## Styling Architecture

```
Tailwind CSS
├── Base styles (globals.css)
├── Component utilities
├── Custom theme (tailwind.config.js)
└── Responsive breakpoints
```

## API Architecture

```
/api/
├── auth/
│   └── [...nextauth]/          # OAuth flow
└── notion/
    ├── all/                    # Fetch all content
    └── search/                 # Search content
```

## Type Safety

Every file uses TypeScript:
- ✅ Strict mode enabled
- ✅ No implicit any
- ✅ Proper prop types
- ✅ API response types
- ✅ Service class types

## Build Output

When built, Next.js generates:
```
.next/
├── cache/                      # Build cache
├── server/                     # Server-side code
├── static/                     # Static assets
└── standalone/                 # Standalone deployment
```

## Testing Structure (Future)

```
tests/
├── unit/                       # Unit tests
│   ├── components/
│   └── lib/
├── integration/               # Integration tests
│   └── api/
└── e2e/                       # End-to-end tests
    └── flows/
```

## Performance Considerations

- Server components by default (faster initial load)
- Client components only when needed
- React Query caching (reduces API calls)
- Next.js image optimization
- Code splitting automatic

## Security Measures

- Environment variables for secrets
- HTTP-only cookies for sessions
- Server-side API key storage
- CSRF protection (NextAuth)
- No sensitive data in client

## Deployment Structure

Production build includes:
- Optimized bundles
- Minified CSS/JS
- Compressed assets
- Server-side rendering
- Static page generation

---

This structure follows Next.js best practices and ensures:
- 🎯 Clear separation of concerns
- 🔒 Secure by default
- ⚡ Optimal performance
- 🧪 Easy to test
- 📈 Scalable architecture
