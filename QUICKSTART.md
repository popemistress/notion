# Quick Start Guide

Get your Notion Dashboard up and running in 5 minutes!

## Prerequisites

- ✅ Node.js 18+ installed ([Download](https://nodejs.org/))
- ✅ A Notion account ([Sign up](https://www.notion.so/))
- ✅ 5 minutes of your time

## Step 1: Create Notion Integration (2 minutes)

1. **Go to Notion Integrations**
   - Visit: https://www.notion.so/my-integrations
   - Click the "+ New integration" button

2. **Configure Integration**
   ```
   Name: Notion Dashboard
   Type: Public
   Capabilities: ✓ Read content
   ```

3. **Set OAuth Redirect**
   ```
   Redirect URI: http://localhost:3000/api/auth/callback/notion
   ```

4. **Save Credentials**
   - Copy your **Client ID**
   - Copy your **Client Secret**
   - Keep these safe!

## Step 2: Install & Configure (2 minutes)

1. **Extract the project**
   ```bash
   # Navigate to the project directory
   cd notion-dashboard
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Create environment file**
   ```bash
   cp .env.example .env.local
   ```

4. **Add your credentials to `.env.local`**
   ```env
   NOTION_CLIENT_ID=paste_your_client_id_here
   NOTION_CLIENT_SECRET=paste_your_client_secret_here
   NOTION_REDIRECT_URI=http://localhost:3000/api/auth/callback/notion
   NEXTAUTH_URL=http://localhost:3000
   NEXTAUTH_SECRET=run_this_command_below
   ```

5. **Generate secret**
   ```bash
   # Run this and paste the output as NEXTAUTH_SECRET
   openssl rand -base64 32
   ```

## Step 3: Run the App (1 minute)

1. **Start development server**
   ```bash
   npm run dev
   ```

2. **Open your browser**
   - Go to: http://localhost:3000
   - Click "Sign In with Notion"
   - Authorize the integration
   - You're done! 🎉

## What's Next?

### Set Up Your Notion Workspace

To get the most out of the dashboard, create these databases in Notion:

#### 1. Tasks Database
- Database name: "Tasks" or "Todo"
- Properties:
  - Title (title)
  - Status (select: Not Started, In Progress, Completed)
  - Priority (select: Low, Medium, High)
  - Due Date (date)
  - Tags (multi-select)

#### 2. Projects Database
- Database name: "Projects"
- Properties:
  - Name (title)
  - Status (select: Planning, Active, Completed, On Hold)
  - Start Date (date)
  - End Date (date)
  - Progress (number: 0-100)
  - Tags (multi-select)

#### 3. Journal Database
- Database name: "Journal" or "Daily"
- Properties:
  - Title (title)
  - Date (date)
  - Mood (select: Great, Good, Okay, Bad)
  - Tags (multi-select)

#### 4. Reading List Database
- Database name: "Reading" or "Books"
- Properties:
  - Title (title)
  - Author (text)
  - Type (select: Book, Article, Paper, Other)
  - Status (select: To Read, Reading, Completed)
  - Rating (number: 1-5)
  - Tags (multi-select)

#### 5. Quick Notes Database
- Database name: "Notes" or "Quick"
- Properties:
  - Title (title)
  - Tags (multi-select)

### Grant Access

Don't forget to:
1. Share each database with your integration
2. Or grant the integration access to the entire workspace

## Troubleshooting

### "Unauthorized" Error
- Check your Client ID and Secret are correct
- Verify the integration has "Read content" capability
- Make sure you've authorized the integration

### No Data Showing
- Grant integration access to your pages/databases
- Check database names match expected patterns
- Click the "Refresh" button

### Port 3000 Already in Use
```bash
# Use a different port
PORT=3001 npm run dev
# Update NEXTAUTH_URL and redirect URI accordingly
```

### Can't Generate Secret
```bash
# Alternative method
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

## Common Issues

**Q: Do I need to create all databases?**
A: No! Create only the ones you need. The dashboard will show what you have.

**Q: Can I use existing Notion databases?**
A: Yes! Just make sure they have the expected properties and names.

**Q: Is my data secure?**
A: Yes! All data stays in Notion. The app only reads what you authorize.

## Need Help?

- 📖 Read the [full README](README.md)
- 🔧 Check [DEPLOYMENT.md](DEPLOYMENT.md) for production setup
- 🐛 Found a bug? Open an issue on GitHub
- 💡 Have a question? Start a discussion

## Next Steps

Once everything is working:

1. **Explore the Dashboard**
   - View your tasks, projects, and notes
   - Try the search functionality
   - Click items to open them in Notion

2. **Deploy to Production**
   - See [DEPLOYMENT.md](DEPLOYMENT.md) for detailed instructions
   - Recommended: Deploy to Vercel (free & easy)

3. **Customize**
   - Modify colors in `tailwind.config.js`
   - Add new features (see [CONTRIBUTING.md](CONTRIBUTING.md))
   - Share your improvements!

---

**Congratulations!** You now have a fully functional Notion Dashboard. 🚀

Happy organizing! ✨
