import Header from '../../components/Header'
import Footer from '../../components/Footer'
import { DeliveryDistribution, WhyChooseUs } from '../../components/HomeSections'

export default function AboutPage() {
  return (
    <div>
      <Header />
      <section className="bg-white py-14">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 lg:grid-cols-2 lg:px-6">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.18em] text-brand-accent">About BuildMart</p>
            <h1 className="mt-2 text-4xl font-black text-brand-text">A dedicated supplier for modern construction material needs</h1>
            <p className="mt-5 leading-8 text-slate-600">
              BuildMart supplies bricks, cement, sand, concrete, rodi, dust, and related construction materials for builders, contractors, businesses, and homeowners. The platform is operated by BuildMart only, so every quote request and order inquiry goes directly to our team.
            </p>
            <p className="mt-4 leading-8 text-slate-600">
              Our focus is simple: dependable material sourcing, clear communication, bulk supply support, and fast delivery coordination across Delhi NCR and Haryana routes.
            </p>
          </div>
          <div className="min-h-[360px] rounded-md bg-cover bg-center shadow-card" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1485083269755-a7b559a4fe5e?auto=format&fit=crop&w=1200&q=80')" }} />
        </div>
      </section>
      <WhyChooseUs />
      <DeliveryDistribution />
      <Footer />
    </div>
  )
}
