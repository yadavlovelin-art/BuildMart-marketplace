'use client'

import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Header from '../../../components/Header'
import Footer from '../../../components/Footer'

export default function ClientLoginPage() {
  const router = useRouter()
  const [loginType, setLoginType] = useState('email') // 'email' ya 'phone'
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [googleLoading, setGoogleLoading] = useState(false)

  // ── Email / Phone + Password login ──────────────────────────────
  async function handleLogin(event) {
    event.preventDefault()
    setError('')
    setLoading(true)
    try {
      const result = await signIn('credentials', {
        redirect: false,
        email: loginType === 'email' ? email : '',
        phone: loginType === 'phone' ? phone : '',
        password,
      })
      if (result?.error) {
        setError('Email/phone ya password galat hai.')
      } else {
        router.push('/client/dashboard')
      }
    } catch {
      setError('Kuch gadbad hui. Dobara try karo.')
    } finally {
      setLoading(false)
    }
  }

  // ── Google login ─────────────────────────────────────────────────
  async function handleGoogle() {
    setGoogleLoading(true)
    await signIn('google', { callbackUrl: '/client/dashboard' })
  }

  return (
    <div>
      <Header />
      <section className="mx-auto flex min-h-[calc(100vh-180px)] max-w-md items-center px-4 py-14">
        <div className="w-full rounded-xl bg-white p-8 shadow-card ring-1 ring-slate-200">
          {/* Title */}
          <p className="text-xs font-black uppercase tracking-[0.18em] text-brand-accent">Customer Login</p>
          <h1 className="mt-2 text-3xl font-black text-brand-text">Apne account mein login karo</h1>
          <p className="mt-2 text-sm text-slate-500">Orders track karo, quotes dekho, wishlist save karo.</p>

          {/* ── Google Button ── */}
          <button
            onClick={handleGoogle}
            disabled={googleLoading}
            className="mt-6 flex w-full items-center justify-center gap-3 rounded-lg border border-slate-200 bg-white px-5 py-3 font-bold text-slate-700 shadow-sm transition hover:bg-slate-50 disabled:opacity-60"
          >
            {/* Google SVG icon */}
            <svg width="20" height="20" viewBox="0 0 48 48">
              <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
              <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
              <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
              <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
              <path fill="none" d="M0 0h48v48H0z"/>
            </svg>
            {googleLoading ? 'Connecting...' : 'Continue with Google'}
          </button>

          {/* ── Divider ── */}
          <div className="my-5 flex items-center gap-3 text-slate-400">
            <div className="h-px flex-1 bg-slate-200" />
            <span className="text-xs font-bold uppercase">ya</span>
            <div className="h-px flex-1 bg-slate-200" />
          </div>

          {/* ── Email / Phone Toggle ── */}
          <div className="flex rounded-lg bg-slate-100 p-1">
            <button
              type="button"
              onClick={() => setLoginType('email')}
              className={`flex-1 rounded-md py-2 text-sm font-bold transition ${loginType === 'email' ? 'bg-white text-brand-text shadow' : 'text-slate-500'}`}
            >
              📧 Email
            </button>
            <button
              type="button"
              onClick={() => setLoginType('phone')}
              className={`flex-1 rounded-md py-2 text-sm font-bold transition ${loginType === 'phone' ? 'bg-white text-brand-text shadow' : 'text-slate-500'}`}
            >
              📱 Phone
            </button>
          </div>

          {/* ── Form ── */}
          <form onSubmit={handleLogin} className="mt-4 space-y-4">
            {loginType === 'email' ? (
              <div>
                <label className="mb-1 block text-sm font-bold text-slate-700">Email Address</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="aap@example.com"
                  className="w-full rounded-lg border border-slate-200 px-4 py-3 text-sm outline-none focus:border-brand-accent"
                />
              </div>
            ) : (
              <div>
                <label className="mb-1 block text-sm font-bold text-slate-700">Phone Number</label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+91 98765 43210"
                  className="w-full rounded-lg border border-slate-200 px-4 py-3 text-sm outline-none focus:border-brand-accent"
                />
              </div>
            )}

            <div>
              <label className="mb-1 block text-sm font-bold text-slate-700">Password</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full rounded-lg border border-slate-200 px-4 py-3 text-sm outline-none focus:border-brand-accent"
              />
            </div>

            {error && (
              <div className="rounded-lg bg-red-50 px-4 py-3 text-sm font-semibold text-red-600">
                ❌ {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-lg bg-brand-accent py-3 font-black text-brand-text transition hover:opacity-90 disabled:opacity-60"
            >
              {loading ? 'Login ho raha hai...' : 'Login Karo'}
            </button>
          </form>

          {/* ── Register link ── */}
          <p className="mt-5 text-center text-sm text-slate-500">
            Naya account chahiye?{' '}
            <Link href="/client/register" className="font-bold text-brand-accent hover:underline">
              Register karo
            </Link>
          </p>
        </div>
      </section>
      <Footer />
    </div>
  )
}
