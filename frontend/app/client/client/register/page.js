'use client'

import { useState } from 'react'
import { signIn } from 'next-auth/react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import Header from '../../../components/Header'
import Footer from '../../../components/Footer'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'

export default function ClientRegisterPage() {
  const router = useRouter()
  const [form, setForm] = useState({ name: '', email: '', phone: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [googleLoading, setGoogleLoading] = useState(false)

  const update = (field, value) => setForm((c) => ({ ...c, [field]: value }))

  async function handleRegister(event) {
    event.preventDefault()
    setError('')
    setLoading(true)
    try {
      const res = await fetch(`${API_BASE_URL}/auth/client-register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.message || 'Registration failed')
      // Auto login after register
      await signIn('credentials', {
        redirect: false,
        email: form.email,
        password: form.password,
      })
      router.push('/client/dashboard')
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  async function handleGoogle() {
    setGoogleLoading(true)
    await signIn('google', { callbackUrl: '/client/dashboard' })
  }

  return (
    <div>
      <Header />
      <section className="mx-auto flex min-h-[calc(100vh-180px)] max-w-md items-center px-4 py-14">
        <div className="w-full rounded-xl bg-white p-8 shadow-card ring-1 ring-slate-200">
          <p className="text-xs font-black uppercase tracking-[0.18em] text-brand-accent">New Account</p>
          <h1 className="mt-2 text-3xl font-black text-brand-text">BuildMart par register karo</h1>
          <p className="mt-2 text-sm text-slate-500">Free account — orders track karo aur quotes save karo.</p>

          {/* Google Button */}
          <button
            onClick={handleGoogle}
            disabled={googleLoading}
            className="mt-6 flex w-full items-center justify-center gap-3 rounded-lg border border-slate-200 bg-white px-5 py-3 font-bold text-slate-700 shadow-sm transition hover:bg-slate-50 disabled:opacity-60"
          >
            <svg width="20" height="20" viewBox="0 0 48 48">
              <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
              <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
              <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
              <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
              <path fill="none" d="M0 0h48v48H0z"/>
            </svg>
            {googleLoading ? 'Connecting...' : 'Continue with Google'}
          </button>

          <div className="my-5 flex items-center gap-3 text-slate-400">
            <div className="h-px flex-1 bg-slate-200" />
            <span className="text-xs font-bold uppercase">ya</span>
            <div className="h-px flex-1 bg-slate-200" />
          </div>

          <form onSubmit={handleRegister} className="space-y-4">
            <div>
              <label className="mb-1 block text-sm font-bold text-slate-700">Poora Naam</label>
              <input
                required
                value={form.name}
                onChange={(e) => update('name', e.target.value)}
                placeholder="Rahul Sharma"
                className="w-full rounded-lg border border-slate-200 px-4 py-3 text-sm outline-none focus:border-brand-accent"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-bold text-slate-700">Email Address</label>
              <input
                type="email"
                required
                value={form.email}
                onChange={(e) => update('email', e.target.value)}
                placeholder="aap@example.com"
                className="w-full rounded-lg border border-slate-200 px-4 py-3 text-sm outline-none focus:border-brand-accent"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-bold text-slate-700">Phone Number <span className="font-normal text-slate-400">(optional)</span></label>
              <input
                type="tel"
                value={form.phone}
                onChange={(e) => update('phone', e.target.value)}
                placeholder="+91 98765 43210"
                className="w-full rounded-lg border border-slate-200 px-4 py-3 text-sm outline-none focus:border-brand-accent"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-bold text-slate-700">Password</label>
              <input
                type="password"
                required
                minLength={6}
                value={form.password}
                onChange={(e) => update('password', e.target.value)}
                placeholder="•••••••• (kam se kam 6 characters)"
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
              {loading ? 'Account ban raha hai...' : 'Account Banao'}
            </button>
          </form>

          <p className="mt-5 text-center text-sm text-slate-500">
            Pehle se account hai?{' '}
            <Link href="/client/login" className="font-bold text-brand-accent hover:underline">
              Login karo
            </Link>
          </p>
        </div>
      </section>
      <Footer />
    </div>
  )
}
