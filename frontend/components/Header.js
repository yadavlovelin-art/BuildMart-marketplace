'use client'

import Link from 'next/link'
import { Mail, MapPin, Menu, Phone, Search, ShoppingCart, Truck, X } from 'lucide-react'
import { useState } from 'react'
import { useCart } from './cart/CartProvider'

const navLinks = [
  ['Home', '/'],
  ['Products', '/products'],
  ['Categories', '/#categories'],
  ['Track Order', '/track-order'],
  ['About Us', '/about'],
  ['Contact', '/contact'],
]

export default function Header() {
  const [open, setOpen] = useState(false)
  const { totalItems } = useCart()

  return (
    <header className="sticky top-0 z-50 bg-brand-dark text-white shadow-xl">
      <div className="border-b border-white/10 bg-[#0f141b]">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-4 py-2 text-xs text-white/75 lg:px-6">
          <div className="flex flex-wrap items-center gap-4">
            <a href="tel:9217179618" className="inline-flex items-center gap-1 hover:text-brand-accent"><Phone size={13} /> 9217179618</a>
            <a href="tel:9625516129" className="inline-flex items-center gap-1 hover:text-brand-accent"><Phone size={13} /> 9625516129</a>
            <a href="mailto:buildmartindiaoffical@gmail.com" className="inline-flex items-center gap-1 hover:text-brand-accent"><Mail size={13} /> buildmartindiaoffical@gmail.com</a>
            <span className="hidden items-center gap-1 lg:inline-flex"><MapPin size={13} /> Nathupur, Sector 24, Gurugram, Haryana</span>
          </div>
          <Link href="/admin/login" className="font-semibold text-brand-accent hover:text-white">
            Admin Dashboard
          </Link>
        </div>
      </div>

      <div className="mx-auto flex max-w-7xl items-center gap-4 px-4 py-3 lg:px-6">
        <Link href="/" className="flex min-w-fit items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-md bg-brand-accent text-lg font-black text-brand-text">
            BM
          </div>
          <div>
            <p className="text-xl font-black leading-none">BuildMart India</p>
            <p className="mt-1 text-xs text-white/70">Dust Rodi — Wholesale & Retail Supplier</p>
          </div>
        </Link>

        <form action="/products" className="hidden flex-1 items-center overflow-hidden rounded-md bg-white md:flex">
          <input
            name="search"
            className="h-12 w-full border-0 px-4 text-sm text-brand-text outline-none"
            placeholder="Search cement, red bricks, Jamuna sand, rodi..."
          />
          <button className="flex h-12 w-14 items-center justify-center bg-brand-accent text-brand-text" aria-label="Search">
            <Search size={20} />
          </button>
        </form>

        <nav className="hidden items-center gap-5 text-sm font-semibold xl:flex">
          {navLinks.map(([label, href]) => (
            <Link key={label} href={href} className="text-white/85 hover:text-brand-accent">
              {label}
            </Link>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-2 md:ml-0">
          <Link href="/cart" className="relative rounded-md border border-white/15 p-3 hover:border-brand-accent" aria-label="Cart">
            <ShoppingCart size={19} />
            <span className="absolute -right-2 -top-2 flex h-5 min-w-5 items-center justify-center rounded-full bg-brand-accent px-1 text-xs font-black text-brand-text">
              {totalItems}
            </span>
          </Link>
          <a href="tel:9217179618" className="hidden items-center gap-2 rounded-md bg-white px-3 py-3 text-sm font-bold text-brand-text hover:bg-brand-accent lg:inline-flex">
            <Phone size={16} /> Call Now
          </a>
          <a href="https://wa.me/919217179618" target="_blank" rel="noopener noreferrer" className="hidden items-center gap-2 rounded-md bg-[#25D366] px-3 py-3 text-sm font-bold text-white hover:bg-brand-accent hover:text-brand-text lg:inline-flex">
            <Truck size={16} /> WhatsApp
          </a>
          <button onClick={() => setOpen((value) => !value)} className="rounded-md border border-white/15 p-3 xl:hidden" aria-label="Open menu">
            {open ? <X size={19} /> : <Menu size={19} />}
          </button>
        </div>
      </div>

      <div className="border-t border-white/10 px-4 py-2 md:hidden">
        <form action="/products" className="flex items-center overflow-hidden rounded-md bg-white">
          <input name="search" className="h-10 w-full border-0 px-4 text-sm text-brand-text outline-none" placeholder="Search materials" />
          <button className="flex h-10 w-12 items-center justify-center bg-brand-accent text-brand-text" aria-label="Search">
            <Search size={18} />
          </button>
        </form>
      </div>

      {open && (
        <div className="border-t border-white/10 px-4 py-4 xl:hidden">
          <div className="mx-auto grid max-w-7xl gap-2">
            {navLinks.map(([label, href]) => (
              <Link key={label} href={href} onClick={() => setOpen(false)} className="rounded-md px-3 py-2 text-sm font-semibold hover:bg-white/10">
                {label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  )
}
