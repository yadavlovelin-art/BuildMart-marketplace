'use client'

import { useState } from 'react'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import { api } from '../../services/api'
import { trackingSteps } from '../../services/sampleData'
import { CheckCircle2, PackageCheck, Search, Truck } from 'lucide-react'

export default function TrackOrderPage() {
  const [trackingId, setTrackingId] = useState('')
  const [order, setOrder] = useState(null)
  const [status, setStatus] = useState('')

  async function submit(event) {
    event.preventDefault()
    setStatus('Checking tracking status...')
    const data = await api.trackOrder(trackingId || 'BM-2026-DEMO')
    setOrder(data)
    setStatus('')
  }

  const currentIndex = order ? trackingSteps.indexOf(order.orderStatus) : -1
  const progress = currentIndex >= 0 ? currentIndex : order?.progress || 0

  return (
    <div>
      <Header />
      <section className="bg-white py-10">
        <div className="mx-auto max-w-7xl px-4 lg:px-6">
          <p className="text-sm font-black uppercase tracking-[0.18em] text-brand-accent">Track Order</p>
          <h1 className="mt-2 text-4xl font-black text-brand-text">Industrial order tracking</h1>
          <p className="mt-3 max-w-2xl text-slate-600">Enter your BuildMart tracking ID to view delivery progress and dispatch status.</p>
          <form onSubmit={submit} className="mt-7 flex max-w-2xl overflow-hidden rounded-md border border-slate-200 bg-white shadow-card">
            <input value={trackingId} onChange={(event) => setTrackingId(event.target.value)} className="h-14 flex-1 px-4 outline-none" placeholder="Example: BM-2026-1001" />
            <button className="inline-flex items-center gap-2 bg-brand-accent px-5 font-black text-brand-text">
              <Search size={18} /> Track
            </button>
          </form>
          {status && <p className="mt-4 font-semibold text-slate-600">{status}</p>}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10 lg:px-6">
        <div className="rounded-md bg-brand-dark p-6 text-white shadow-card md:p-8">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.18em] text-brand-accent">Delivery Progress</p>
              <h2 className="mt-2 text-2xl font-black">{order ? order.trackingId : 'Enter an order ID'}</h2>
            </div>
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-brand-accent text-brand-text">
              <Truck size={30} />
            </div>
          </div>
          <div className="mt-8 h-3 overflow-hidden rounded-full bg-white/10">
            <div className="h-full bg-brand-accent transition-all" style={{ width: `${order ? ((progress + 1) / trackingSteps.length) * 100 : 0}%` }} />
          </div>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {trackingSteps.map((step, index) => {
              const done = order && index <= progress
              return (
                <div key={step} className={`rounded-md border p-4 ${done ? 'border-brand-accent bg-brand-accent/10' : 'border-white/10 bg-white/5'}`}>
                  {done ? <CheckCircle2 className="text-brand-accent" /> : <PackageCheck className="text-white/45" />}
                  <p className="mt-3 font-black">{step}</p>
                  <p className="mt-1 text-sm text-white/55">{done ? 'Completed or active' : 'Pending update'}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>
      <Footer />
    </div>
  )
}
