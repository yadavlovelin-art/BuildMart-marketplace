'use client'

import { useState } from 'react'
import Header from '../../../components/Header'
import Footer from '../../../components/Footer'
import { api } from '../../../services/api'

export default function AdminLoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')

  async function submit(event) {
    event.preventDefault()
    setMessage('Signing in...')
    try {
      const auth = await api.login({ email, password })
      localStorage.setItem('buildmart_auth', JSON.stringify(auth))
      window.location.href = '/dashboard'
    } catch (error) {
      setMessage(error.message)
    }
  }

  return (
    <div>
      <Header />
      <section className="mx-auto max-w-md px-4 py-14">
        <form onSubmit={submit} className="rounded-md bg-white p-7 shadow-card ring-1 ring-slate-200">
          <p className="text-sm font-black uppercase tracking-[0.18em] text-brand-accent">Admin Login</p>
          <h1 className="mt-2 text-3xl font-black text-brand-text">BuildMart dashboard access</h1>
          <label className="mt-6 grid gap-2 text-sm font-bold">
            Email
            <input type="email" value={email} onChange={(event) => setEmail(event.target.value)} className="rounded-md border border-slate-200 px-4 py-3 outline-none focus:border-brand-accent" required />
          </label>
          <label className="mt-4 grid gap-2 text-sm font-bold">
            Password
            <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} className="rounded-md border border-slate-200 px-4 py-3 outline-none focus:border-brand-accent" required />
          </label>
          <button className="mt-6 w-full rounded-md bg-brand-accent px-5 py-3 font-black text-brand-text">Login</button>
          {message && <p className="mt-4 text-sm font-semibold text-slate-600">{message}</p>}
        </form>
      </section>
      <Footer />
    </div>
  )
}
