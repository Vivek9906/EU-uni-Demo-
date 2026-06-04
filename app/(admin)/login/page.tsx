'use client'
import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email || !password) return
    setError('')
    setLoading(true)
    const res = await signIn('credentials', { email: email.trim().toLowerCase(), password, redirect: false })
    setLoading(false)
    if (res?.error) {
      setError('Invalid email or password. Please check your credentials.')
    } else if (res?.ok) {
      router.push('/dashboard')
      router.refresh()
    }
  }

  return (
    <div style={{ minHeight: '100vh', background: '#F1F5F9', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }}>
      <div style={{ width: '100%', maxWidth: 420 }}>
        
        {/* Logo card */}
        <div style={{ textAlign: 'center', marginBottom: 28 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 12, background: '#FFF', borderRadius: 12, padding: '14px 24px', boxShadow: '0 2px 8px rgba(0,0,0,0.07)', border: '1px solid #E2E8F0' }}>
            <Image src="/logo.png" alt="EU American University" width={36} height={36} style={{ objectFit: 'contain' }} onError={e => { (e.target as HTMLImageElement).style.display = 'none' }} />
            <div style={{ textAlign: 'left' }}>
              <div style={{ fontWeight: 800, color: '#0F172A', fontSize: 13, lineHeight: 1.2 }}>EU AMERICAN</div>
              <div style={{ color: '#64748B', fontSize: 10, letterSpacing: '0.1em', textTransform: 'uppercase' }}>UNIVERSITY</div>
            </div>
          </div>
        </div>

        {/* Login card */}
        <div style={{ background: '#FFF', borderRadius: 16, boxShadow: '0 4px 24px rgba(0,0,0,0.07)', border: '1px solid #E2E8F0', overflow: 'hidden' }}>
          
          {/* Card header */}
          <div style={{ background: 'linear-gradient(135deg, #0F2347, #1B3A6B)', padding: '28px 32px 24px' }}>
            <h1 style={{ color: '#FFF', fontSize: 20, fontWeight: 800, margin: '0 0 4px' }}>Admin Portal</h1>
            <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: 13, margin: 0 }}>Sign in to manage your university website</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} style={{ padding: '28px 32px' }}>
            {error && (
              <div style={{ background: '#FEF2F2', border: '1px solid #FECACA', borderRadius: 8, padding: '10px 14px', marginBottom: 18, display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ color: '#DC2626', fontSize: 16 }}>⚠</span>
                <p style={{ color: '#DC2626', fontSize: 13, margin: 0, fontWeight: 500 }}>{error}</p>
              </div>
            )}

            <div style={{ marginBottom: 16 }}>
              <label style={{ display: 'block', fontSize: 12.5, fontWeight: 700, color: '#374151', marginBottom: 6 }}>Email Address</label>
              <input
                type="email" required autoComplete="email"
                value={email} onChange={e => setEmail(e.target.value)}
                placeholder="admin@euamericanuniversity.us"
                style={{ width: '100%', padding: '11px 14px', border: '1.5px solid #D1D5DB', borderRadius: 8, fontSize: 14, outline: 'none', boxSizing: 'border-box', fontFamily: 'inherit', transition: 'border-color 0.15s' }}
                onFocus={e => (e.target as HTMLInputElement).style.borderColor = '#1B3A6B'}
                onBlur={e => (e.target as HTMLInputElement).style.borderColor = '#D1D5DB'}
              />
            </div>

            <div style={{ marginBottom: 24 }}>
              <label style={{ display: 'block', fontSize: 12.5, fontWeight: 700, color: '#374151', marginBottom: 6 }}>Password</label>
              <input
                type="password" required autoComplete="current-password"
                value={password} onChange={e => setPassword(e.target.value)}
                placeholder="••••••••"
                style={{ width: '100%', padding: '11px 14px', border: '1.5px solid #D1D5DB', borderRadius: 8, fontSize: 14, outline: 'none', boxSizing: 'border-box', fontFamily: 'inherit', transition: 'border-color 0.15s' }}
                onFocus={e => (e.target as HTMLInputElement).style.borderColor = '#1B3A6B'}
                onBlur={e => (e.target as HTMLInputElement).style.borderColor = '#D1D5DB'}
              />
            </div>

            <button
              type="submit" disabled={loading}
              style={{ width: '100%', padding: '12px', background: loading ? '#94A3B8' : '#1B3A6B', color: '#FFF', border: 'none', borderRadius: 8, fontWeight: 700, fontSize: 15, cursor: loading ? 'not-allowed' : 'pointer', fontFamily: 'inherit', transition: 'background 0.15s' }}
              onMouseEnter={e => { if (!loading) (e.currentTarget as HTMLButtonElement).style.background = '#0F2347' }}
              onMouseLeave={e => { if (!loading) (e.currentTarget as HTMLButtonElement).style.background = '#1B3A6B' }}
            >
              {loading ? 'Signing in...' : 'Sign In to Admin Portal'}
            </button>

            <p style={{ textAlign: 'center', fontSize: 12, color: '#94A3B8', marginTop: 16 }}>
              Secure admin access · EU American University
            </p>
          </form>
        </div>

        <p style={{ textAlign: 'center', marginTop: 20, fontSize: 12, color: '#94A3B8' }}>
          <a href="/" style={{ color: '#1B3A6B', textDecoration: 'none', fontWeight: 600 }}>← Back to Website</a>
        </p>
      </div>
    </div>
  )
}
