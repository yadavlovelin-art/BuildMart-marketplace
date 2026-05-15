import Header from '../../../components/Header'
import Footer from '../../../components/Footer'
import AuthForm from '../../../components/AuthForm'

export default function LoginPage() {
  return (
    <div>
      <Header />
      <section className="mx-auto grid min-h-[calc(100vh-180px)] max-w-7xl items-center gap-10 px-4 py-10 lg:grid-cols-2 lg:px-6">
        <div>
          <p className="text-sm font-black uppercase tracking-[0.18em] text-brand-accent">BuildMart Admin</p>
          <h1 className="mt-3 text-4xl font-black text-brand-text">Login to manage products, inquiries, and order tracking.</h1>
          <p className="mt-4 max-w-xl text-slate-600">Customers do not need accounts. They browse products, request quotes, and track orders directly.</p>
        </div>
        <AuthForm type="login" />
      </section>
      <Footer />
    </div>
  )
}
