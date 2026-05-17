'use client'

import { useSession, signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import Header from '../../../components/Header'
import Footer from '../../../components/Footer'
import Link from 'next/link'

export default function ClientDashboard() {
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/client/login')
    }
  }, [status, router])

  if (status === 'loading') {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-slate-500 font-bold">Loading...</p>
      </div>
    )
  }

  return (
    <div>
      <Header />
      <section className="mx-auto max-w-4xl px-4 py-12">
        {/* Welcome Card */}
        <div className="rounded-xl bg-brand-dark p-6 text-white">
          <p className="text-xs uppercase tracking-[0.2em] text-white/60">Welcome back</p>
          <h1 className="mt-2 text-3xl font-black">{session?.user?.name}</h1>
          <p className="text-sm text-white/70">{session?.user?.email}</p>
        </div>

        {/* Quick Links */}
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          <Link href="/products" className="rounded-xl bg-white p-6 shadow-card ring-1 ring-slate-200 transition hover:-translate-y-1">
            <p className="text-2xl">🧱</p>
            <h3 className="mt-3 font-black text-brand-text">Products Dekho</h3>
            <p className="mt-1 text-sm text-slate-500">Cement, Rodi, Bricks sab milega</p>
          </Link>
          <Link href="/track-order" className="rounded-xl bg-white p-6 shadow-card ring-1 ring-slate-200 transition hover:-translate-y-1">
            <p className="text-2xl">🚛</p>
            <h3 className="mt-3 font-black text-brand-text">Order Track Karo</h3>
            <p className="mt-1 text-sm text-slate-500">Apna tracking ID dalo</p>
          </Link>
          <Link href="/contact" className="rounded-xl bg-white p-6 shadow-card ring-1 ring-slate-200 transition hover:-translate-y-1">
            <p className="text-2xl">📞</p>
            <h3 className="mt-3 font-black text-brand-text">Quote Maango</h3>
            <p className="mt-1 text-sm text-slate-500">Best price ke liye contact karo</p>
          </Link>
        </div>

        {/* Logout */}
        <div className="mt-8 text-center">
          <button
            onClick={() => signOut({ callbackUrl: '/' })}
            className="rounded-lg border border-slate-200 px-6 py-3 text-sm font-bold text-slate-600 hover:bg-slate-50"
          >
            Logout
          </button>
        </div>
      </section>
      <Footer />
    </div>
  )
}
