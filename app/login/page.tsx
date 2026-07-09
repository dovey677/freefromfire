'use client'

import { useState } from 'react'
import { createClient } from '../../lib/supabase'

export default function LoginPage() {
  const [mode, setMode] = useState<'login' | 'signup'>('login')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)

  const supabase = createClient()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setMessage('')
    setLoading(true)

    if (mode === 'login') {
      const { error } = await supabase.auth.signInWithPassword({ email, password })
      if (error) {
        setError(error.message)
      } else {
        window.location.href = '/'
      }
    } else {
      const { error } = await supabase.auth.signUp({ email, password })
      if (error) {
        setError(error.message)
      } else {
        setMessage('Check your email to confirm your account.')
      }
    }

    setLoading(false)
  }

  async function handleGoogleSignIn() {
    setError('')
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    })
  }

  return (
    <main style={{ backgroundColor: '#1F1F1F', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
      <div style={{ width: '100%', maxWidth: '400px' }}>

        <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.75rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#7A8F6A', marginBottom: '0.75rem', textAlign: 'center' }}>
          Free From Fire
        </p>
        <h1 style={{ fontFamily: 'Oswald, sans-serif', fontSize: '2.25rem', fontWeight: 700, color: '#F7F5F2', letterSpacing: '0.02em', marginBottom: '0.5rem', textAlign: 'center' }}>
          {mode === 'login' ? 'SIGN IN' : 'CREATE ACCOUNT'}
        </h1>
        <div style={{ width: '3rem', height: '3px', backgroundColor: '#E85C2B', margin: '0 auto 2rem' }} />

        <button
          onClick={handleGoogleSignIn}
          style={{
            width: '100%',
            padding: '0.875rem 1.25rem',
            backgroundColor: '#F7F5F2',
            border: 'none',
            borderRadius: '8px',
            color: '#1F1F1F',
            fontFamily: 'Inter, sans-serif',
            fontSize: '0.95rem',
            fontWeight: 600,
            cursor: 'pointer',
            marginBottom: '1.5rem',
          }}
        >
          Continue with Google
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
          <div style={{ flex: 1, height: '1px', backgroundColor: '#3a2a2a' }} />
          <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.75rem', color: '#7A8F6A', textTransform: 'uppercase', letterSpacing: '0.08em' }}>or</span>
          <div style={{ flex: 1, height: '1px', backgroundColor: '#3a2a2a' }} />
        </div>

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{
              width: '100%',
              padding: '0.875rem 1.25rem',
              backgroundColor: '#2a2020',
              border: '1px solid #3a2a2a',
              borderRadius: '8px',
              color: '#F7F5F2',
              fontFamily: 'Inter, sans-serif',
              fontSize: '0.95rem',
              outline: 'none',
              marginBottom: '1rem',
              boxSizing: 'border-box',
            }}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={6}
            style={{
              width: '100%',
              padding: '0.875rem 1.25rem',
              backgroundColor: '#2a2020',
              border: '1px solid #3a2a2a',
              borderRadius: '8px',
              color: '#F7F5F2',
              fontFamily: 'Inter, sans-serif',
              fontSize: '0.95rem',
              outline: 'none',
              marginBottom: '1.5rem',
              boxSizing: 'border-box',
            }}
          />

          {error && (
            <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.85rem', color: '#EAD7C5', backgroundColor: '#2a1515', border: '1px solid #B23A1B', borderRadius: '8px', padding: '0.75rem 1rem', marginBottom: '1rem' }}>
              {error}
            </p>
          )}
          {message && (
            <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.85rem', color: '#EAD7C5', backgroundColor: '#1a2a1a', border: '1px solid #7A8F6A', borderRadius: '8px', padding: '0.75rem 1rem', marginBottom: '1rem' }}>
              {message}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%',
              padding: '0.875rem 1.25rem',
              backgroundColor: '#E85C2B',
              border: 'none',
              borderRadius: '8px',
              color: '#F7F5F2',
              fontFamily: 'Inter, sans-serif',
              fontSize: '0.95rem',
              fontWeight: 600,
              letterSpacing: '0.05em',
              textTransform: 'uppercase',
              cursor: loading ? 'default' : 'pointer',
              opacity: loading ? 0.7 : 1,
            }}
          >
            {loading ? 'Please wait...' : mode === 'login' ? 'Sign In' : 'Sign Up'}
          </button>
        </form>

        <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.85rem', color: '#7A8F6A', textAlign: 'center', marginTop: '1.5rem' }}>
          {mode === 'login' ? "Don't have an account? " : 'Already have an account? '}
          <button
            onClick={() => {
              setMode(mode === 'login' ? 'signup' : 'login')
              setError('')
              setMessage('')
            }}
            style={{ background: 'none', border: 'none', color: '#E85C2B', fontFamily: 'Inter, sans-serif', fontSize: '0.85rem', cursor: 'pointer', textDecoration: 'underline', padding: 0 }}
          >
            {mode === 'login' ? 'Sign up' : 'Sign in'}
          </button>
        </p>

      </div>
    </main>
  )
}