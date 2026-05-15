import Header from '../../components/Header'
import Footer from '../../components/Footer'
import ProductGrid from '../../components/ProductGrid'
import CategoryGrid from '../../components/CategoryGrid'
import { api } from '../../services/api'

export const dynamic = 'force-dynamic'

export default async function ProductsPage({ searchParams }) {
  const products = await api.getProducts({
    search: searchParams?.search || '',
    category: searchParams?.category || '',
  })

  return (
    <div>
      <Header />
      <section className="bg-white py-10">
        <div className="mx-auto max-w-7xl px-4 lg:px-6">
          <p className="text-sm font-black uppercase tracking-[0.18em] text-brand-accent">Products</p>
          <h1 className="mt-2 text-4xl font-black text-brand-text">Browse construction materials</h1>
          <p className="mt-3 max-w-2xl text-slate-600">
            BuildMart is the direct supplier on this platform. Request quotes, add materials to cart, and coordinate manual orders with our team.
          </p>
        </div>
      </section>
      <ProductGrid products={products} title="BuildMart Product Catalog" subtitle="No external listings. All inquiries go directly to BuildMart." />
      <CategoryGrid />
      <Footer />
    </div>
  )
}
