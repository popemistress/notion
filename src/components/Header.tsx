'use client'

import React from 'react'
import { signOut, useSession } from 'next-auth/react'
import { LogOut, User } from 'lucide-react'

export function Header() {
  const { data: session } = useSession()

  return (
    <header className="sticky top-0 z-10 bg-white border-b border-notion-gray-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="text-2xl font-bold text-notion-text">
              📔 Notion Dashboard
            </div>
          </div>

          {/* User Menu */}
          {session && (
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-sm">
                <User className="w-4 h-4 text-notion-gray" />
                <span className="text-notion-text font-medium">
                  {session.user?.name || 'User'}
                </span>
                {session.workspaceName && (
                  <span className="text-notion-gray">
                    · {session.workspaceName}
                  </span>
                )}
              </div>
              
              <button
                onClick={() => signOut({ callbackUrl: '/' })}
                className="flex items-center gap-2 px-3 py-2 text-sm text-notion-gray hover:text-notion-text border border-notion-gray-light rounded-lg hover:bg-gray-50 transition-colors"
              >
                <LogOut className="w-4 h-4" />
                Sign Out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
