'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { Container, Section } from '@/components/layout'
import { Button } from '@/components/button'
import { ArrowRight, Lock } from 'lucide-react'

export default function AdminLoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      setError(error.message)
      setLoading(false)
    } else {
      router.push('/admin/dashboard')
      router.refresh()
    }
  }

  return (
    <main className="min-h-screen bg-[var(--canvas)] flex flex-col justify-center items-center py-24">
      <div className="w-full max-w-md p-8 rounded-3xl border border-[var(--hairline)] bg-[var(--canvas-dark)] shadow-[0_20px_40px_-20px_rgba(0,0,0,0.8)]">
        <div className="flex flex-col items-center mb-8">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[var(--accent-cyan)]/10 text-[var(--accent-cyan)] border border-[var(--accent-cyan)]/20 mb-4">
            <Lock className="h-6 w-6" />
          </div>
          <h1 className="text-2xl font-semibold text-[var(--ink)]">Admin Portal</h1>
          <p className="text-sm text-[var(--body)] mt-2">Sign in to manage Vistaar content</p>
        </div>

        <form onSubmit={handleLogin} className="flex flex-col gap-5">
          {error && (
            <div className="p-3 text-sm text-red-400 bg-red-400/10 border border-red-400/20 rounded-xl">
              {error}
            </div>
          )}

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-[var(--body)]">Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-11 w-full rounded-xl border border-[var(--hairline)] bg-[var(--canvas)] px-4 text-sm text-[var(--ink)] outline-none focus:border-[var(--accent-cyan)] transition-colors"
              placeholder="admin@vistaar.com"
              required
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-[var(--body)]">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="h-11 w-full rounded-xl border border-[var(--hairline)] bg-[var(--canvas)] px-4 text-sm text-[var(--ink)] outline-none focus:border-[var(--accent-cyan)] transition-colors"
              placeholder="••••••••"
              required
            />
          </div>

          <Button
            type="submit"
            variant="primary"
            size="md"
            className="w-full mt-2 rounded-xl"
            rightIcon={<ArrowRight className="h-4 w-4" />}
            disabled={loading}
          >
            {loading ? 'Signing in...' : 'Sign in to Admin Dashboard'}
          </Button>
        </form>
      </div>
    </main>
  )
}
