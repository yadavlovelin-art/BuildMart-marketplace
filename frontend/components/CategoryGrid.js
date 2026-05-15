import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { categories } from '../services/sampleData'

export default function CategoryGrid() {
  return (
    <section id="categories" className="bg-white py-14">
      <div className="mx-auto max-w-7xl px-4 lg:px-6">
        <div className="mb-8 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.18em] text-brand-accent">Categories</p>
            <h2 className="mt-2 text-3xl font-black text-brand-text">Construction materials supplied by BuildMart</h2>
          </div>
          <Link href="/products" className="inline-flex items-center gap-2 font-bold text-brand-text hover:text-brand-accent">
            View all products <ArrowUpRight size={18} />
          </Link>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((category) => (
            <Link
              href={`/products?category=${encodeURIComponent(category.name)}`}
              key={category.name}
              className="group overflow-hidden rounded-md bg-white shadow-card ring-1 ring-slate-200 transition hover:-translate-y-1 hover:ring-brand-accent"
            >
              <div className="h-44 bg-cover bg-center transition duration-500 group-hover:scale-105" style={{ backgroundImage: `url(${category.image})` }} />
              <div className="p-5">
                <h3 className="text-xl font-black text-brand-text">{category.name}</h3>
                <p className="mt-2 min-h-16 text-sm leading-6 text-slate-600">{category.description}</p>
                <span className="mt-5 inline-flex rounded-md bg-brand-accent px-4 py-2 text-sm font-black text-brand-text">
                  Get Best Price
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
