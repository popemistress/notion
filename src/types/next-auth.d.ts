import 'next-auth'
import 'next-auth/jwt'

declare module 'next-auth' {
  interface Session {
    accessToken?: string
    workspaceId?: string
    workspaceName?: string
  }

  interface User {
    accessToken?: string
    workspaceId?: string
    workspaceName?: string
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    accessToken?: string
    workspaceId?: string
    workspaceName?: string
  }
}
