import Link from 'next/link'
import { ArrowRight, Phone, ShieldCheck, Truck } from 'lucide-react'

export default function Hero() {
  return (
    <section className="relative min-h-[580px] overflow-hidden bg-brand-dark text-white">
      <div
        className="absolute inset-0 bg-cover bg-center opacity-45"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1800&q=85')",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-brand-dark via-brand-dark/85 to-brand-dark/30" />
      <div className="relative mx-auto grid max-w-7xl gap-10 px-4 py-20 lg:grid-cols-[1.05fr_0.95fr] lg:px-6 lg:py-24">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-semibold text-white/85">
            <ShieldCheck size={17} className="text-brand-accent" /> Bulk supply for B2B and B2C projects
          </div>
          <h1 className="mt-7 text-4xl font-black leading-tight md:text-6xl">
            Premium Building Materials for Modern Construction
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-white/78">
            Trusted Supplier of Bricks, Cement, Sand, Concrete & More
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link href="/contact" className="inline-flex items-center gap-2 rounded-md bg-brand-accent px-6 py-4 font-black text-brand-text shadow-lg transition hover:-translate-y-0.5">
              Request Quote <ArrowRight size={18} />
            </Link>
            <Link href="tel:9217179618" className="inline-flex items-center gap-2 rounded-md bg-white px-6 py-4 font-black text-brand-text transition hover:bg-brand-accent">
              <Phone size={18} /> Call Now
            </Link>
          </div>
        </div>

        <div className="grid content-end gap-4 md:grid-cols-3 lg:mt-32">
          {[
            ['NCR Coverage', 'Delhi, Gurgaon, Sonipat'],
            ['Fast Loading', 'Trucks planned by site need'],
            ['Bulk Orders', 'Quote-led procurement support'],
          ].map(([title, text]) => (
            <div key={title} className="rounded-md border border-white/15 bg-white/10 p-4 backdrop-blur">
              <Truck className="mb-3 text-brand-accent" size={22} />
              <p className="font-black">{title}</p>
              <p className="mt-2 text-sm leading-6 text-white/70">{text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
