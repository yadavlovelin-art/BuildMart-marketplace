import ProductCard from './ProductCard'

export default function ProductGrid({
  products,
  title = 'Featured Products',
  subtitle = 'Popular BuildMart materials ready for quote requests and site delivery',
}) {
  return (
    <section className="bg-brand-bg py-14">
      <div className="mx-auto max-w-7xl px-4 lg:px-6">
        <div className="mb-8">
          <p className="text-sm font-black uppercase tracking-[0.18em] text-brand-accent">Catalog</p>
          <h2 className="mt-2 text-3xl font-black text-brand-text">{title}</h2>
          <p className="mt-3 max-w-2xl text-slate-600">{subtitle}</p>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </div>
    </section>
  )
}
