import Header from '../components/Header'
import Hero from '../components/Hero'
import CategoryGrid from '../components/CategoryGrid'
import ProductGrid from '../components/ProductGrid'
import Footer from '../components/Footer'
import { DeliveryDistribution, WhyChooseUs } from '../components/HomeSections'
import InquiryForm from '../components/InquiryForm'
import { api } from '../services/api'

export default async function HomePage() {
  const products = await api.getProducts()

  return (
    <div>
      <Header />
      <Hero />
      <CategoryGrid />
      <ProductGrid products={products.slice(0, 8)} />
      <WhyChooseUs />
      <DeliveryDistribution />
      <section className="bg-brand-bg py-14">
        <div className="mx-auto max-w-5xl px-4 lg:px-6">
          <InquiryForm />
        </div>
      </section>
      <Footer />
    </div>
  )
}
