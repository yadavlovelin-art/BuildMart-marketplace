import Header from '../../../components/Header'
import Footer from '../../../components/Footer'
import ProductDetailActions from '../../../components/ProductDetailActions'
import InquiryForm from '../../../components/InquiryForm'
import { api } from '../../../services/api'
import { MapPin, Package, Phone, ShieldCheck } from 'lucide-react'

export const dynamic = 'force-dynamic'

export default async function ProductDetailPage({ params }) {
  const product = await api.getProductById(params.id)

  return (
    <div>
      <Header />
      <section className="mx-auto max-w-7xl px-4 py-10 lg:px-6">
        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="overflow-hidden rounded-md bg-white shadow-card ring-1 ring-slate-200">
            <div className="h-80 w-full bg-cover bg-center md:h-[470px]" style={{ backgroundImage: `url(${product.image})` }} />
            <div className="p-6 md:p-8">
              <span className="rounded-full bg-brand-accent/15 px-3 py-1 text-xs font-black text-brand-text">
                {product.category}
              </span>
              <h1 className="mt-4 text-3xl font-black text-brand-text md:text-4xl">{product.name}</h1>
              <p className="mt-4 text-3xl font-black text-brand-text">
                Rs. {product.price}
                <span className="ml-1 text-base font-medium text-slate-500">/ {product.unit}</span>
              </p>
              <div className="mt-6 grid gap-3 md:grid-cols-3">
                <Info icon={MapPin} title="Delivery Area" text={product.location} />
                <Info icon={ShieldCheck} title="Supplier" text="BuildMart only" />
                <Info icon={Phone} title="Manual Order" text="No online payment" />
              </div>
              <div className="mt-6 rounded-md border border-slate-200 p-5">
                <div className="flex items-center gap-2 text-lg font-black">
                  <Package size={20} className="text-brand-accent" /> Product description
                </div>
                <p className="mt-3 leading-7 text-slate-700">{product.description}</p>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <ProductDetailActions product={product} />
            <InquiryForm materialNeeded={product.name} />
          </div>
        </div>
      </section>
      <Footer />
    </div>
  )
}

function Info({ icon: Icon, title, text }) {
  return (
    <div className="rounded-md bg-brand-bg p-4 text-sm text-slate-700">
      <Icon className="mb-2 text-brand-accent" size={18} />
      <p className="font-black text-brand-text">{title}</p>
      <p>{text}</p>
    </div>
  )
}
