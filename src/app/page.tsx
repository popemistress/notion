'use client'

import { signIn, useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { 
  CheckSquare, 
  FolderOpen, 
  BookOpen, 
  BookMarked, 
  StickyNote,
  ArrowRight,
  Zap,
  Shield,
  Sparkles
} from 'lucide-react'

export default function HomePage() {
  const { status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === 'authenticated') {
      router.push('/dashboard')
    }
  }, [status, router])

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-notion-blue"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Header */}
      <header className="border-b border-notion-gray-light bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <span className="text-2xl">📔</span>
              <span className="text-xl font-bold text-notion-text">
                Notion Dashboard
              </span>
            </div>
            <button
              onClick={() => signIn('notion', { callbackUrl: '/dashboard' })}
              className="px-4 py-2 bg-notion-blue text-white rounded-lg hover:bg-opacity-90 transition-all font-medium"
            >
              Sign In with Notion
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 rounded-full text-sm font-medium text-blue-600">
            <Sparkles className="w-4 h-4" />
            Connect Your Notion Workspace
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold text-notion-text">
            All Your Notion Content
            <br />
            <span className="text-notion-blue">In One Dashboard</span>
          </h1>
          
          <p className="text-xl text-notion-gray max-w-2xl mx-auto">
            View and manage your tasks, projects, journals, reading lists, and quick notes
            from your Notion workspace in a beautiful, unified interface.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <button
              onClick={() => signIn('notion', { callbackUrl: '/dashboard' })}
              className="flex items-center gap-2 px-8 py-4 bg-notion-blue text-white rounded-lg hover:bg-opacity-90 transition-all font-semibold text-lg shadow-lg hover:shadow-xl"
            >
              Get Started
              <ArrowRight className="w-5 h-5" />
            </button>
            <a
              href="#features"
              className="px-8 py-4 border-2 border-notion-gray-light text-notion-text rounded-lg hover:bg-gray-50 transition-all font-semibold text-lg"
            >
              Learn More
            </a>
          </div>
        </div>

        {/* Features Grid */}
        <div id="features" className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-32">
          <FeatureCard
            icon={<CheckSquare className="w-8 h-8 text-notion-blue" />}
            title="Tasks"
            description="View all your tasks with status, priority, and due dates at a glance."
          />
          <FeatureCard
            icon={<FolderOpen className="w-8 h-8 text-notion-blue" />}
            title="Projects"
            description="Track your projects, their progress, and important milestones."
          />
          <FeatureCard
            icon={<BookOpen className="w-8 h-8 text-notion-purple" />}
            title="Journal"
            description="Access your journal entries and daily reflections."
          />
          <FeatureCard
            icon={<BookMarked className="w-8 h-8 text-notion-green" />}
            title="Reading List"
            description="Keep track of books, articles, and resources you want to read."
          />
          <FeatureCard
            icon={<StickyNote className="w-8 h-8 text-notion-yellow" />}
            title="Quick Notes"
            description="Capture and organize your quick thoughts and ideas."
          />
          <FeatureCard
            icon={<Zap className="w-8 h-8 text-notion-orange" />}
            title="Fast & Real-time"
            description="Instant access to all your Notion content with live updates."
          />
        </div>

        {/* Benefits Section */}
        <div className="mt-32 space-y-12">
          <h2 className="text-3xl font-bold text-center text-notion-text">
            Why Use Notion Dashboard?
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <BenefitCard
              icon={<Zap className="w-6 h-6" />}
              title="Lightning Fast"
              description="Access all your content in one place without switching between pages."
            />
            <BenefitCard
              icon={<Shield className="w-6 h-6" />}
              title="Secure & Private"
              description="Your data stays in Notion. We only read what you authorize."
            />
            <BenefitCard
              icon={<Sparkles className="w-6 h-6" />}
              title="Beautiful UI"
              description="Enjoy a clean, modern interface designed for productivity."
            />
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-32 text-center space-y-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-12">
          <h2 className="text-3xl font-bold text-notion-text">
            Ready to supercharge your Notion workflow?
          </h2>
          <p className="text-lg text-notion-gray max-w-2xl mx-auto">
            Connect your Notion workspace now and experience a better way to view
            and manage your content.
          </p>
          <button
            onClick={() => signIn('notion', { callbackUrl: '/dashboard' })}
            className="inline-flex items-center gap-2 px-8 py-4 bg-notion-blue text-white rounded-lg hover:bg-opacity-90 transition-all font-semibold text-lg shadow-lg hover:shadow-xl"
          >
            Connect to Notion
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-notion-gray-light mt-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <p className="text-center text-notion-gray text-sm">
            © 2024 Notion Dashboard. Built with Next.js and the Notion API.
          </p>
        </div>
      </footer>
    </div>
  )
}

function FeatureCard({ 
  icon, 
  title, 
  description 
}: { 
  icon: React.ReactNode
  title: string
  description: string 
}) {
  return (
    <div className="bg-white rounded-xl border border-notion-gray-light p-6 hover:shadow-lg transition-all">
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-semibold text-notion-text mb-2">{title}</h3>
      <p className="text-notion-gray">{description}</p>
    </div>
  )
}

function BenefitCard({ 
  icon, 
  title, 
  description 
}: { 
  icon: React.ReactNode
  title: string
  description: string 
}) {
  return (
    <div className="text-center space-y-3">
      <div className="inline-flex items-center justify-center w-12 h-12 bg-notion-blue bg-opacity-10 rounded-full text-notion-blue">
        {icon}
      </div>
      <h3 className="text-lg font-semibold text-notion-text">{title}</h3>
      <p className="text-notion-gray">{description}</p>
    </div>
  )
}
