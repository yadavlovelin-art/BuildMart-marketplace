'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { api } from '../services/api'

export default function AuthForm({ type = 'login' }) {
  const router = useRouter()
  const [form, setForm] = useState({ name: '', email: '', password: '', setupKey: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const update = (field, value) => setForm((current) => ({ ...current, [field]: value }))

  async function submit(event) {
    event.preventDefault()
    setLoading(true)
    setError('')
    try {
      const data = type === 'register' ? await api.register(form) : await api.login(form)
      localStorage.setItem('buildmart_auth', JSON.stringify(data))
      router.push('/dashboard')
    } catch (submitError) {
      setError(submitError.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={submit} className="mx-auto w-full max-w-md rounded-md bg-white p-8 shadow-card ring-1 ring-slate-200">
      <h1 className="text-3xl font-black text-brand-text">{type === 'register' ? 'Create admin' : 'Admin login'}</h1>
      <p className="mt-2 text-sm text-slate-600">BuildMart is a company-operated supplier platform. Access is reserved for company admins.</p>
      <div className="mt-6 space-y-4">
        {type === 'register' && (
          <input value={form.name} onChange={(event) => update('name', event.target.value)} required className="w-full rounded-md border border-slate-200 px-4 py-3 outline-none focus:border-brand-accent" placeholder="Admin name" />
        )}
        <input type="email" value={form.email} onChange={(event) => update('email', event.target.value)} required className="w-full rounded-md border border-slate-200 px-4 py-3 outline-none focus:border-brand-accent" placeholder="Email address" />
        <input type="password" value={form.password} onChange={(event) => update('password', event.target.value)} required className="w-full rounded-md border border-slate-200 px-4 py-3 outline-none focus:border-brand-accent" placeholder="Password" />
        {type === 'register' && (
          <input value={form.setupKey} onChange={(event) => update('setupKey', event.target.value)} required className="w-full rounded-md border border-slate-200 px-4 py-3 outline-none focus:border-brand-accent" placeholder="Admin setup key" />
        )}
      </div>
      {error && <p className="mt-4 text-sm text-red-600">{error}</p>}
      <button disabled={loading} className="mt-6 w-full rounded-md bg-brand-accent px-4 py-3 font-black text-brand-text disabled:opacity-60">
        {loading ? 'Please wait...' : type === 'register' ? 'Create Admin' : 'Login'}
      </button>
    </form>
  )
}
