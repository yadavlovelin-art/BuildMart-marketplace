'use client'

import Header from '../../components/Header'
import Footer from '../../components/Footer'
import InquiryForm from '../../components/InquiryForm'
import { useCart } from '../../components/cart/CartProvider'
import { Minus, Plus, Trash2 } from 'lucide-react'

export default function CartPage() {
  const { items, subtotal, updateQuantity, removeItem } = useCart()
  const materialSummary = items.map((item) => `${item.name} x ${item.quantity}`).join(', ')

  return (
    <div>
      <Header />
      <section className="mx-auto max-w-7xl px-4 py-10 lg:px-6">
        <p className="text-sm font-black uppercase tracking-[0.18em] text-brand-accent">Quote Cart</p>
        <h1 className="mt-2 text-4xl font-black text-brand-text">Request quotation for cart items</h1>
        <p className="mt-3 max-w-2xl text-slate-600">No online payment is collected. Submit your material request and BuildMart will contact you manually.</p>

        <div className="mt-8 grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="rounded-md bg-white p-5 shadow-card ring-1 ring-slate-200">
            {items.length === 0 ? (
              <p className="py-10 text-center font-semibold text-slate-600">Your cart is empty.</p>
            ) : (
              <div className="grid gap-4">
                {items.map((item) => (
                  <div key={item._id} className="grid gap-4 rounded-md border border-slate-200 p-4 md:grid-cols-[120px_1fr_auto]">
                    <div className="h-28 rounded-md bg-cover bg-center" style={{ backgroundImage: `url(${item.image})` }} />
                    <div>
                      <h2 className="text-lg font-black text-brand-text">{item.name}</h2>
                      <p className="mt-1 text-sm text-slate-600">{item.location}</p>
                      <p className="mt-2 font-black">Rs. {item.price} / {item.unit}</p>
                    </div>
                    <div className="flex items-center gap-2 md:flex-col md:items-end">
                      <div className="flex items-center overflow-hidden rounded-md border border-slate-200">
                        <button onClick={() => updateQuantity(item._id, item.quantity - 1)} className="p-2" aria-label="Decrease"><Minus size={16} /></button>
                        <span className="px-3 font-black">{item.quantity}</span>
                        <button onClick={() => updateQuantity(item._id, item.quantity + 1)} className="p-2" aria-label="Increase"><Plus size={16} /></button>
                      </div>
                      <button onClick={() => removeItem(item._id)} className="inline-flex items-center gap-2 rounded-md px-3 py-2 text-sm font-bold text-red-600 hover:bg-red-50">
                        <Trash2 size={16} /> Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
            <div className="mt-5 rounded-md bg-brand-bg p-4 text-right">
              <p className="text-sm text-slate-600">Estimated material subtotal</p>
              <p className="text-2xl font-black text-brand-text">Rs. {subtotal.toLocaleString('en-IN')}</p>
            </div>
          </div>
          <InquiryForm materialNeeded={materialSummary} />
        </div>
      </section>
      <Footer />
    </div>
  )
}
