import Link from 'next/link'
import { BadgeCheck, Clock, IndianRupee, MapPinned, Route, ShieldCheck, Truck, Users } from 'lucide-react'
import { deliveryCities } from '../services/sampleData'

const features = [
  [ShieldCheck, 'Trusted Supplier'],
  [BadgeCheck, 'Premium Quality Materials'],
  [IndianRupee, 'Affordable Pricing'],
  [Clock, 'Fast Delivery'],
  [Truck, 'Bulk Order Supply'],
  [Users, 'Experienced Team'],
]

export function WhyChooseUs() {
  return (
    <section className="bg-white py-14">
      <div className="mx-auto max-w-7xl px-4 lg:px-6">
        <p className="text-sm font-black uppercase tracking-[0.18em] text-brand-accent">Why Choose Us</p>
        <h2 className="mt-2 text-3xl font-black text-brand-text">Built for procurement teams and home builders</h2>
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {features.map(([Icon, title]) => (
            <div key={title} className="rounded-md bg-brand-bg p-6 ring-1 ring-slate-200 transition hover:-translate-y-1 hover:ring-brand-accent">
              <Icon className="text-brand-accent" size={28} />
              <h3 className="mt-4 text-xl font-black text-brand-text">{title}</h3>
              <p className="mt-2 leading-6 text-slate-600">
                Consistent coordination, transparent quotation support, and reliable dispatch planning for construction sites.
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export function DeliveryDistribution() {
  return (
    <section className="bg-[#171f2a] py-14 text-white">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 lg:grid-cols-[0.95fr_1.05fr] lg:px-6">
        <div>
          <p className="text-sm font-black uppercase tracking-[0.18em] text-brand-accent">Delivery & Distribution</p>
          <h2 className="mt-2 text-3xl font-black">Fast & Reliable Material Supply Across NCR & Haryana</h2>
          <p className="mt-4 leading-7 text-white/70">
            BuildMart coordinates truck movement, bulk loading, and quote-led material supply for active construction sites across key delivery zones.
          </p>
          <div className="mt-7 grid gap-3 sm:grid-cols-2">
            {deliveryCities.map((city) => (
              <div key={city} className="rounded-md border border-white/10 bg-white/5 p-4">
                <MapPinned className="text-brand-accent" size={20} />
                <h3 className="mt-3 font-black">{city}</h3>
                <Link href="/contact" className="mt-3 inline-flex rounded-md bg-brand-accent px-4 py-2 text-sm font-black text-brand-text">
                  Request Supply
                </Link>
              </div>
            ))}
          </div>
        </div>

        <div className="relative min-h-[420px] overflow-hidden rounded-md border border-white/10 bg-[#101720] p-6">
          <div className="absolute inset-6 rounded-md border border-dashed border-brand-accent/40" />
          <div className="relative grid h-full grid-cols-2 gap-4">
            {deliveryCities.map((city, index) => (
              <div key={city} className={`flex items-center gap-3 ${index === 4 ? 'col-span-2 justify-center' : ''}`}>
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-accent text-brand-text">
                  <Truck size={22} />
                </div>
                <div>
                  <p className="font-black">{city}</p>
                  <p className="text-xs text-white/55">Active route</p>
                </div>
              </div>
            ))}
            <div className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center gap-2 rounded-full bg-white px-5 py-3 font-black text-brand-text shadow-xl">
              <Route className="text-brand-accent" size={20} /> BuildMart Hub
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
