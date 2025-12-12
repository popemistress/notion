# 📔 Notion Dashboard

A modern, full-featured Next.js application that connects to your Notion workspace and displays all your tasks, projects, journals, reading lists, and quick notes in a beautiful, unified dashboard.

## ✨ Features

- **🔐 Secure OAuth Authentication** - Connect safely to your Notion workspace
- **✅ Task Management** - View tasks with status, priority, and due dates
- **📁 Project Tracking** - Monitor project progress and milestones
- **📔 Journal Entries** - Access your daily reflections and notes
- **📚 Reading List** - Track books, articles, and resources
- **📝 Quick Notes** - Capture and organize quick thoughts
- **🔍 Universal Search** - Search across all your content instantly
- **🎨 Beautiful UI** - Clean, modern interface inspired by Notion
- **⚡ Real-time Updates** - Refresh data on demand
- **📱 Responsive Design** - Works perfectly on all devices

## 🏗️ Architecture

### Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Authentication**: NextAuth.js with Notion OAuth
- **API Integration**: Notion SDK (@notionhq/client)
- **State Management**: React Query (@tanstack/react-query)
- **Icons**: Lucide React

### Project Structure

```
notion-dashboard/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── api/               # API routes
│   │   │   ├── auth/          # NextAuth configuration
│   │   │   └── notion/        # Notion API endpoints
│   │   ├── dashboard/         # Dashboard page
│   │   ├── auth/              # Auth error page
│   │   ├── layout.tsx         # Root layout
│   │   ├── page.tsx           # Landing page
│   │   └── providers.tsx      # Context providers
│   ├── components/            # React components
│   │   ├── Dashboard.tsx      # Main dashboard component
│   │   ├── Header.tsx         # Navigation header
│   │   ├── TaskCard.tsx       # Task display card
│   │   ├── ProjectCard.tsx    # Project display card
│   │   ├── JournalCard.tsx    # Journal entry card
│   │   ├── ReadingCard.tsx    # Reading list item card
│   │   ├── QuickNoteCard.tsx  # Quick note card
│   │   ├── Section.tsx        # Section wrapper
│   │   ├── Loading.tsx        # Loading states
│   │   └── ErrorState.tsx     # Error handling
│   ├── lib/                   # Utility libraries
│   │   ├── auth.ts           # NextAuth configuration
│   │   ├── notion.ts         # Notion service class
│   │   └── utils.ts          # Utility functions
│   └── types/                 # TypeScript type definitions
│       └── index.ts          # All type definitions
├── public/                    # Static assets
├── .env.example              # Environment variables template
├── package.json              # Dependencies
├── tsconfig.json             # TypeScript configuration
├── tailwind.config.js        # Tailwind CSS configuration
└── next.config.js            # Next.js configuration
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn
- A Notion account
- A Notion integration (OAuth app)

### 1. Create a Notion Integration

1. Go to [Notion Integrations](https://www.notion.so/my-integrations)
2. Click **"+ New integration"**
3. Fill in the details:
   - **Name**: Notion Dashboard
   - **Integration type**: Public
   - **Capabilities**: Select "Read content"
4. Click **"Submit"**
5. Configure OAuth:
   - **Redirect URI**: `http://localhost:3000/api/auth/callback/notion`
6. Save your **Client ID** and **Client Secret**

### 2. Install Dependencies

```bash
# Clone the repository (if applicable)
cd notion-dashboard

# Install dependencies
npm install
```

### 3. Configure Environment Variables

Create a `.env.local` file in the root directory:

```bash
cp .env.example .env.local
```

Edit `.env.local` with your values:

```env
# Notion OAuth Configuration
NOTION_CLIENT_ID=your_notion_client_id_here
NOTION_CLIENT_SECRET=your_notion_client_secret_here
NOTION_REDIRECT_URI=http://localhost:3000/api/auth/callback/notion

# NextAuth Configuration
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=generate_a_random_secret_here

# Application Settings
NODE_ENV=development
```

**Generate a secure NEXTAUTH_SECRET:**
```bash
openssl rand -base64 32
```

### 4. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 5. Connect Your Notion Workspace

1. Click **"Sign In with Notion"**
2. Authorize the integration to access your workspace
3. You'll be redirected to the dashboard

## 📖 Usage

### Dashboard Overview

The dashboard displays all your Notion content organized by type:

- **Quick Notes** - Recently created standalone pages
- **Tasks** - Items from databases named "Tasks", "Todo", or "To-Do"
- **Projects** - Items from databases named "Projects"
- **Journal Entries** - Items from databases named "Journal" or "Daily"
- **Reading List** - Items from databases named "Reading", "Books", or "Articles"

### Search Functionality

Use the search bar at the top to filter across all content types. Search works on titles and is case-insensitive.

### Refreshing Data

Click the **"Refresh"** button in the top-right corner to fetch the latest data from Notion.

## 🔧 Configuration

### Database Structure

The app intelligently detects and categorizes your Notion databases based on their names and properties:

#### Tasks Database
Expected properties:
- **Title** (required)
- **Status** (select: "Not Started", "In Progress", "Completed")
- **Priority** (select: "Low", "Medium", "High")
- **Due Date** (date)
- **Tags** (multi-select)

#### Projects Database
Expected properties:
- **Name** (title, required)
- **Status** (select: "Planning", "Active", "Completed", "On Hold")
- **Start Date** (date)
- **End Date** (date)
- **Progress** (number, 0-100)
- **Tags** (multi-select)

#### Journal Database
Expected properties:
- **Title** (required)
- **Date** (date, required)
- **Mood** (select)
- **Tags** (multi-select)

#### Reading List Database
Expected properties:
- **Title** (required)
- **Author** (text)
- **Type** (select: "Book", "Article", "Paper", "Other")
- **Status** (select: "To Read", "Reading", "Completed")
- **Rating** (number, 1-5)
- **Tags** (multi-select)

#### Quick Notes Database
Expected properties:
- **Title** (required)
- **Tags** (multi-select)

### Customization

The app is highly customizable. You can:

1. **Modify Colors**: Edit `tailwind.config.js` to change the color scheme
2. **Add New Content Types**: Extend the Notion service in `src/lib/notion.ts`
3. **Customize Cards**: Modify component files in `src/components/`
4. **Change Detection Logic**: Update the database detection methods in `NotionService`

## 🧪 Testing

```bash
# Type checking
npm run type-check

# Linting
npm run lint

# Run tests (when implemented)
npm test
```

## 📦 Building for Production

```bash
# Build the application
npm run build

# Start production server
npm start
```

## 🚢 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import project in [Vercel](https://vercel.com)
3. Add environment variables in project settings
4. Update Notion OAuth redirect URI to your production URL
5. Deploy!

### Other Platforms

The app can be deployed to any platform that supports Next.js:
- Netlify
- AWS Amplify
- Digital Ocean App Platform
- Railway
- Render

**Important**: Update the `NEXTAUTH_URL` and Notion OAuth redirect URI to match your production domain.

## 🔒 Security

- All authentication is handled by NextAuth.js with secure session management
- API routes are protected and require valid authentication
- Environment variables keep sensitive credentials secure
- No data is stored in the application - everything stays in Notion

## 🐛 Troubleshooting

### "Unauthorized" Error
- Check that your Notion integration is properly configured
- Verify OAuth credentials in `.env.local`
- Ensure the integration has "Read content" capability

### No Data Showing
- Make sure you've granted the integration access to your pages/databases
- Check database names match expected patterns (see Configuration section)
- Click the "Refresh" button to fetch latest data

### OAuth Redirect Error
- Verify redirect URI matches exactly in both `.env.local` and Notion integration settings
- Check that `NEXTAUTH_URL` is set correctly

### Build Errors
- Run `npm install` to ensure all dependencies are installed
- Check that Node.js version is 18+
- Delete `.next` folder and rebuild

## 🤝 Contributing

Contributions are welcome! Please feel free to submit issues or pull requests.

## 📄 License

This project is open source and available under the MIT License.

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- Powered by [Notion API](https://developers.notion.com/)
- Authentication by [NextAuth.js](https://next-auth.js.org/)
- Icons from [Lucide](https://lucide.dev/)

## 📞 Support

For issues, questions, or suggestions, please open an issue on GitHub.

---

Made with ❤️ and ☕
# notion
# notion
# test1
# test1
# test1
