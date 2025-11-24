# Deployment Guide

This guide covers deploying the Notion Dashboard application to various platforms.

## Prerequisites

Before deploying, ensure you have:
- A Notion integration with OAuth configured
- All environment variables ready
- Tested the application locally

## Vercel Deployment (Recommended)

Vercel provides the easiest deployment experience for Next.js applications.

### Step 1: Prepare Your Repository

```bash
# Initialize git repository (if not already done)
git init
git add .
git commit -m "Initial commit"

# Push to GitHub
git remote add origin https://github.com/yourusername/notion-dashboard.git
git push -u origin main
```

### Step 2: Import to Vercel

1. Go to [vercel.com](https://vercel.com)
2. Click **"New Project"**
3. Import your GitHub repository
4. Configure project:
   - Framework Preset: **Next.js**
   - Root Directory: `./`
   - Build Command: `npm run build`
   - Output Directory: `.next`

### Step 3: Configure Environment Variables

Add these in Vercel project settings:

```
NOTION_CLIENT_ID=your_notion_client_id
NOTION_CLIENT_SECRET=your_notion_client_secret
NOTION_REDIRECT_URI=https://your-domain.vercel.app/api/auth/callback/notion
NEXTAUTH_URL=https://your-domain.vercel.app
NEXTAUTH_SECRET=your_generated_secret
NODE_ENV=production
```

### Step 4: Update Notion Integration

1. Go to your [Notion Integration](https://www.notion.so/my-integrations)
2. Update OAuth settings:
   - Add redirect URI: `https://your-domain.vercel.app/api/auth/callback/notion`
3. Save changes

### Step 5: Deploy

Click **"Deploy"** in Vercel. Your app will be live in ~2 minutes!

## Netlify Deployment

### Step 1: Build Settings

Create `netlify.toml`:

```toml
[build]
  command = "npm run build"
  publish = ".next"

[[plugins]]
  package = "@netlify/plugin-nextjs"
```

### Step 2: Deploy

1. Go to [netlify.com](https://netlify.com)
2. Click **"Add new site"** → **"Import an existing project"**
3. Connect your Git repository
4. Configure build settings (or use netlify.toml)
5. Add environment variables
6. Deploy!

### Step 3: Update Notion Integration

Update the redirect URI to your Netlify domain.

## Railway Deployment

### Step 1: Create Project

```bash
# Install Railway CLI
npm i -g @railway/cli

# Login
railway login

# Initialize project
railway init
```

### Step 2: Configure

```bash
# Add environment variables
railway variables set NOTION_CLIENT_ID=your_id
railway variables set NOTION_CLIENT_SECRET=your_secret
railway variables set NEXTAUTH_URL=https://your-app.railway.app
railway variables set NEXTAUTH_SECRET=your_secret
railway variables set NOTION_REDIRECT_URI=https://your-app.railway.app/api/auth/callback/notion
```

### Step 3: Deploy

```bash
railway up
```

## Digital Ocean App Platform

### Step 1: Create App

1. Go to Digital Ocean App Platform
2. Click **"Create App"**
3. Connect your GitHub repository

### Step 2: Configure Build

- Build Command: `npm run build`
- Run Command: `npm start`
- HTTP Port: 3000

### Step 3: Add Environment Variables

Add all required environment variables in the App settings.

### Step 4: Deploy

Click **"Deploy"** and wait for the build to complete.

## Docker Deployment

### Step 1: Create Dockerfile

```dockerfile
FROM node:18-alpine AS base

# Dependencies
FROM base AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci

# Builder
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

# Runner
FROM base AS runner
WORKDIR /app
ENV NODE_ENV production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs
EXPOSE 3000
ENV PORT 3000

CMD ["node", "server.js"]
```

### Step 2: Build and Run

```bash
# Build
docker build -t notion-dashboard .

# Run
docker run -p 3000:3000 \
  -e NOTION_CLIENT_ID=your_id \
  -e NOTION_CLIENT_SECRET=your_secret \
  -e NEXTAUTH_URL=http://localhost:3000 \
  -e NEXTAUTH_SECRET=your_secret \
  notion-dashboard
```

## Environment Variables Reference

### Required Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `NOTION_CLIENT_ID` | Notion OAuth Client ID | `abc123...` |
| `NOTION_CLIENT_SECRET` | Notion OAuth Client Secret | `secret_xyz...` |
| `NOTION_REDIRECT_URI` | OAuth redirect URL | `https://app.com/api/auth/callback/notion` |
| `NEXTAUTH_URL` | Application URL | `https://app.com` |
| `NEXTAUTH_SECRET` | Random secret for session encryption | Generate with `openssl rand -base64 32` |

### Optional Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `NODE_ENV` | Environment mode | `development` |

## Post-Deployment Checklist

- [ ] Test OAuth login flow
- [ ] Verify all environment variables are set correctly
- [ ] Check that Notion redirect URI matches deployment URL
- [ ] Test data fetching from Notion
- [ ] Verify all pages load correctly
- [ ] Test search functionality
- [ ] Check mobile responsiveness
- [ ] Monitor application logs for errors

## Troubleshooting

### OAuth Redirect Mismatch
- Ensure redirect URI in Notion matches exactly (including protocol and path)
- Check `NEXTAUTH_URL` environment variable

### 500 Internal Server Error
- Check application logs
- Verify all environment variables are set
- Ensure Notion API credentials are correct

### Build Failures
- Check Node.js version (must be 18+)
- Verify all dependencies are installed
- Look for TypeScript errors in build logs

### Performance Issues
- Consider using Vercel Edge Functions
- Enable caching for API responses
- Optimize images and assets

## Monitoring

### Recommended Tools
- **Vercel Analytics** - Built-in performance monitoring
- **Sentry** - Error tracking and monitoring
- **LogRocket** - Session replay and debugging
- **Uptime Robot** - Uptime monitoring

## Scaling

### Performance Optimization
1. Enable Next.js caching
2. Use ISR (Incremental Static Regeneration) where applicable
3. Implement rate limiting for API routes
4. Consider Redis for session storage at scale

### Security Hardening
1. Implement rate limiting
2. Add CORS configuration
3. Use environment-specific secrets
4. Enable security headers in `next.config.js`

## Backup and Recovery

### Data Considerations
- All user data lives in Notion (no backup needed)
- Session data is ephemeral (JWT-based)
- No persistent database required

### Environment Variables Backup
Keep a secure backup of your environment variables in a password manager or secure vault.

## Support

For deployment issues:
1. Check platform-specific documentation
2. Review application logs
3. Verify environment variables
4. Test locally with production environment variables

---

Need help? Open an issue on GitHub!
