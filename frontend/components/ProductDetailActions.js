'use client'

import Link from 'next/link'
import { MessageCircle, Phone, ShoppingCart } from 'lucide-react'
import { useCart } from './cart/CartProvider'

export default function ProductDetailActions({ product }) {
  const { addItem } = useCart()

  return (
    <div className="rounded-md bg-brand-dark p-6 text-white shadow-card">
      <p className="text-sm font-black uppercase tracking-[0.18em] text-brand-accent">Supplier Actions</p>
      <h2 className="mt-2 text-2xl font-black">Talk to BuildMart India</h2>
      <p className="mt-3 leading-7 text-white/70">
        Add this material to your quote cart or contact BuildMart directly for current rates, truck load planning, and delivery slots.
      </p>
      <div className="mt-6 grid gap-3">
        <button onClick={() => addItem(product)} className="inline-flex items-center justify-center gap-2 rounded-md bg-brand-accent px-5 py-3 font-black text-brand-text">
          <ShoppingCart size={18} /> Add to Cart
        </button>
        <Link href="/contact" className="rounded-md bg-white px-5 py-3 text-center font-black text-brand-text hover:bg-brand-accent">
          Request Quote
        </Link>
        <div className="grid grid-cols-2 gap-3">
          <a href="tel:9217179618" className="inline-flex items-center justify-center gap-2 rounded-md border border-white/15 px-4 py-3 font-bold hover:border-brand-accent">
            <Phone size={17} /> 9217179618
          </a>
          <a href="https://wa.me/919217179618" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 rounded-md border border-white/15 px-4 py-3 font-bold hover:border-brand-accent">
            <MessageCircle size={17} /> WhatsApp
          </a>
        </div>
      </div>
    </div>
  )
}
