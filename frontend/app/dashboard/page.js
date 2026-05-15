import Header from '../../components/Header'
import Footer from '../../components/Footer'
import DashboardShell from '../../components/DashboardShell'

export default function DashboardPage() {
  return (
    <div>
      <Header />
      <section className="mx-auto max-w-7xl px-4 py-8 lg:px-6">
        <div className="mb-6">
          <p className="text-sm font-black uppercase tracking-[0.18em] text-brand-accent">Admin Dashboard</p>
          <h1 className="mt-2 text-3xl font-black text-brand-text">Manage BuildMart products, inquiries, and tracking</h1>
        </div>
        <DashboardShell />
      </section>
      <Footer />
    </div>
  )
}
