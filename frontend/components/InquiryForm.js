'use client'

import { useState } from 'react'
import { Send } from 'lucide-react'
import { api } from '../services/api'

const initialState = {
  customerName: '',
  phoneNumber: '',
  materialNeeded: '',
  quantity: '',
  deliveryLocation: '',
  message: '',
}

export default function InquiryForm({ materialNeeded = '' }) {
  const [form, setForm] = useState({ ...initialState, materialNeeded })
  const [status, setStatus] = useState('')

  const update = (field, value) => setForm((current) => ({ ...current, [field]: value }))

  async function submit(event) {
    event.preventDefault()
    setStatus('Sending inquiry...')
    try {
      await api.createInquiry(form)
      setForm({ ...initialState, materialNeeded })
      setStatus('Inquiry sent. BuildMart will contact you manually.')
    } catch (error) {
      setStatus(error.message || 'Unable to send inquiry right now.')
    }
  }

  return (
    <form onSubmit={submit} className="rounded-md bg-white p-6 shadow-card ring-1 ring-slate-200">
      <p className="text-sm font-black uppercase tracking-[0.18em] text-brand-accent">Inquiry</p>
      <h2 className="mt-2 text-2xl font-black text-brand-text">Request material quotation</h2>
      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <Input label="Name" value={form.customerName} onChange={(value) => update('customerName', value)} />
        <Input label="Phone Number" value={form.phoneNumber} onChange={(value) => update('phoneNumber', value)} />
        <Input label="Material Needed" value={form.materialNeeded} onChange={(value) => update('materialNeeded', value)} />
        <Input label="Quantity" value={form.quantity} onChange={(value) => update('quantity', value)} />
        <Input label="Delivery Location" value={form.deliveryLocation} onChange={(value) => update('deliveryLocation', value)} className="md:col-span-2" />
        <label className="grid gap-2 text-sm font-bold text-brand-text md:col-span-2">
          Message
          <textarea
            value={form.message}
            onChange={(event) => update('message', event.target.value)}
            rows={4}
            className="rounded-md border border-slate-200 px-4 py-3 font-normal outline-none focus:border-brand-accent"
            placeholder="Tell us site timing, truck access, brand preference, or bulk order details."
          />
        </label>
      </div>
      <button className="mt-5 inline-flex items-center gap-2 rounded-md bg-brand-accent px-5 py-3 font-black text-brand-text">
        <Send size={17} /> Submit Inquiry
      </button>
      {status && <p className="mt-4 text-sm font-semibold text-slate-700">{status}</p>}
    </form>
  )
}

function Input({ label, value, onChange, className = '' }) {
  return (
    <label className={`grid gap-2 text-sm font-bold text-brand-text ${className}`}>
      {label}
      <input
        required={label !== 'Message'}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="rounded-md border border-slate-200 px-4 py-3 font-normal outline-none focus:border-brand-accent"
      />
    </label>
  )
}
