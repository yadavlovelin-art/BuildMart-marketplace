'use client'

import Link from 'next/link'
import { MapPin, ShoppingCart } from 'lucide-react'
import { useCart } from './cart/CartProvider'

export default function ProductCard({ product }) {
  const { addItem } = useCart()

  return (
    <div className="overflow-hidden rounded-md bg-white shadow-card ring-1 ring-slate-200 transition hover:-translate-y-1 hover:ring-brand-accent">
      <Link href={`/products/${product._id}`} className="block h-52 bg-cover bg-center" style={{ backgroundImage: `url(${product.image})` }} />
      <div className="p-5">
        <span className="rounded-full bg-brand-accent/15 px-3 py-1 text-xs font-black text-brand-text">
          {product.category}
        </span>
        <Link href={`/products/${product._id}`}>
          <h3 className="mt-3 line-clamp-2 text-lg font-black text-brand-text hover:text-brand-accent">{product.name}</h3>
        </Link>
        <p className="mt-3 text-2xl font-black text-brand-text">
          Rs. {product.price}
          <span className="ml-1 text-sm font-medium text-slate-500">/ {product.unit}</span>
        </p>
        <div className="mt-3 flex items-start gap-2 text-sm text-slate-600">
          <MapPin size={16} className="mt-0.5 shrink-0 text-brand-accent" /> {product.location}
        </div>
        <p className="mt-3 line-clamp-2 min-h-10 text-sm leading-5 text-slate-600">{product.description}</p>
        <div className="mt-5 grid grid-cols-2 gap-3">
          <button
            onClick={() => addItem(product)}
            className="inline-flex items-center justify-center gap-2 rounded-md border border-slate-200 px-3 py-2 text-sm font-black text-brand-text hover:border-brand-accent"
          >
            <ShoppingCart size={16} /> Add
          </button>
          <Link href="/contact" className="rounded-md bg-brand-accent px-3 py-2 text-center text-sm font-black text-brand-text">
            Get Best Price
          </Link>
        </div>
      </div>
    </div>
  )
}
