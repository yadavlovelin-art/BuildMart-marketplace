import Link from 'next/link'
import { Facebook, Instagram, Linkedin, Mail, MapPin, MessageCircle, Phone } from 'lucide-react'
import { categories } from '../services/sampleData'

const quickLinks = [
  ['Home', '/'],
  ['Products', '/products'],
  ['Categories', '/#categories'],
  ['Track Order', '/track-order'],
  ['About Us', '/about'],
  ['Contact', '/contact'],
]

const socials = [
  [MessageCircle, 'WhatsApp', 'https://wa.me/919217179618'],
  [Instagram, 'Instagram', '#'],
  [Linkedin, 'LinkedIn', '#'],
  [Facebook, 'Facebook', '#'],
  [Phone, 'Phone', 'tel:9217179618'],
  [Mail, 'Email', 'mailto:buildmartindiaoffical@gmail.com'],
]

export default function Footer() {
  return (
    <footer className="bg-brand-dark text-white">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:grid-cols-2 lg:grid-cols-5 lg:px-6">
        <div className="lg:col-span-2">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-md bg-brand-accent text-lg font-black text-brand-text">
              BM
            </div>
            <div>
              <p className="text-xl font-black">BuildMart India</p>
              <p className="text-xs text-white/65">Dust Rodi — Wholesale & Retail Supplier</p>
            </div>
          </div>
          <p className="mt-5 max-w-md leading-7 text-white/70">
            BuildMart India is a trusted supplier of premium construction and building materials — cement, bricks, sand, rodi, and more. Serving Delhi NCR and Haryana.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            {socials.map(([Icon, label, href]) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                target={href.startsWith('http') ? '_blank' : undefined}
                rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-brand-accent hover:text-brand-text"
              >
                <Icon size={18} />
              </a>
            ))}
          </div>
        </div>

        <FooterColumn title="Quick Links" items={quickLinks} />
        <FooterColumn title="Product Categories" items={categories.map((item) => [item.name, `/products?category=${encodeURIComponent(item.name)}`])} />

        <div>
          <h3 className="text-sm font-black uppercase tracking-[0.18em] text-brand-accent">Contact Details</h3>
          <div className="mt-5 space-y-3 text-sm text-white/75">
            <a href="tel:9217179618" className="flex items-center gap-2 hover:text-brand-accent"><Phone size={16} /> 9217179618</a>
            <a href="tel:9625516129" className="flex items-center gap-2 hover:text-brand-accent"><Phone size={16} /> 9625516129</a>
            <a href="mailto:buildmartindiaoffical@gmail.com" className="flex items-center gap-2 hover:text-brand-accent"><Mail size={16} /> buildmartindiaoffical@gmail.com</a>
            <a href="https://wa.me/919217179618" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-brand-accent"><MessageCircle size={16} /> WhatsApp: 9217179618</a>
            <p className="flex items-start gap-2"><MapPin size={16} className="mt-0.5 shrink-0" /> Dust Rodi, opposite Furniture Market, near Sikanderpur Metro, Nathupur, Sector 24, Gurugram, Haryana 122002</p>
          </div>
        </div>
      </div>

      {/* Google Maps Embed */}
      <div className="border-t border-white/10">
        <div className="mx-auto max-w-7xl px-4 py-8 lg:px-6">
          <h3 className="mb-4 text-sm font-black uppercase tracking-[0.18em] text-brand-accent">Find Us</h3>
          <div className="overflow-hidden rounded-md">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3507.7!2d77.0856!3d28.4712!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjjCsDI4JzE2LjMiTiA3N8KwMDUnMDguMiJF!5e0!3m2!1sen!2sin!4v1620000000000!5m2!1sen!2sin&q=Nathupur+Sector+24+Gurugram+Haryana"
              width="100%"
              height="280"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="BuildMart India Location — Nathupur, Sector 24, Gurugram"
            />
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-5 text-sm text-white/65 md:flex-row md:items-center md:justify-between lg:px-6">
          <p>© 2026 BuildMart India. All Rights Reserved.</p>
          <div className="flex flex-wrap gap-4">
            <Link href="#">Privacy Policy</Link>
            <Link href="#">Terms & Conditions</Link>
            <Link href="/contact">Contact Us</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

function FooterColumn({ title, items }) {
  return (
    <div>
      <h3 className="text-sm font-black uppercase tracking-[0.18em] text-brand-accent">{title}</h3>
      <div className="mt-5 grid gap-3 text-sm text-white/75">
        {items.map(([label, href]) => (
          <Link key={label} href={href} className="hover:text-brand-accent">
            {label}
          </Link>
        ))}
      </div>
    </div>
  )
}
