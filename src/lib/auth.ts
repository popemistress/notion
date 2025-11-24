import { NextAuthOptions } from 'next-auth'

export const authOptions: NextAuthOptions = {
  providers: [
    {
      id: 'notion',
      name: 'Notion',
      type: 'oauth',
      clientId: process.env.NOTION_CLIENT_ID!,
      clientSecret: process.env.NOTION_CLIENT_SECRET!,
      authorization: {
        url: 'https://api.notion.com/v1/oauth/authorize',
        params: {
          client_id: process.env.NOTION_CLIENT_ID,
          response_type: 'code',
          owner: 'user',
          redirect_uri: process.env.NOTION_REDIRECT_URI || `${process.env.NEXTAUTH_URL}/api/auth/callback/notion`,
        },
      },
      token: {
        url: 'https://api.notion.com/v1/oauth/token',
        async request({ client: _client, params, checks: _checks, provider: _provider }) {
          const basicAuth = Buffer.from(
            `${process.env.NOTION_CLIENT_ID}:${process.env.NOTION_CLIENT_SECRET}`
          ).toString('base64')

          const response = await fetch('https://api.notion.com/v1/oauth/token', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Basic ${basicAuth}`,
            },
            body: JSON.stringify({
              grant_type: 'authorization_code',
              code: params.code,
              redirect_uri: process.env.NOTION_REDIRECT_URI || `${process.env.NEXTAUTH_URL}/api/auth/callback/notion`,
            }),
          })

          const tokens = await response.json()
          
          if (!response.ok) {
            throw new Error(tokens.error || 'Failed to fetch Notion tokens')
          }

          return {
            tokens,
          }
        },
      },
      userinfo: {
        async request({ tokens }: any) {
          // Notion doesn't have a separate userinfo endpoint
          // The token response contains all user information
          return tokens
        },
      },
      profile(profile: any) {
        return {
          id: profile.workspace_id,
          name: profile.workspace_name || profile.owner?.user?.name || 'Notion User',
          email: profile.owner?.user?.person?.email || null,
          image: profile.workspace_icon || profile.owner?.user?.avatar_url || null,
          accessToken: profile.access_token,
          workspaceId: profile.workspace_id,
          workspaceName: profile.workspace_name,
        }
      },
    },
  ],
  callbacks: {
    async jwt({ token, account, profile }: any) {
      // Initial sign in
      if (account && profile) {
        return {
          ...token,
          accessToken: profile.access_token,
          workspaceId: profile.workspace_id,
          workspaceName: profile.workspace_name,
        }
      }
      return token
    },
    async session({ session, token }: any) {
      // Send properties to the client
      session.accessToken = token.accessToken
      session.workspaceId = token.workspaceId
      session.workspaceName = token.workspaceName
      return session
    },
  },
  pages: {
    signIn: '/',
    error: '/auth/error',
  },
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === 'development',
}
