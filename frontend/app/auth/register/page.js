import Header from '../../../components/Header'
import Footer from '../../../components/Footer'
import AuthForm from '../../../components/AuthForm'

export default function RegisterPage() {
  return (
    <div>
      <Header />
      <section className="mx-auto grid min-h-[calc(100vh-180px)] max-w-7xl items-center gap-10 px-4 py-10 lg:grid-cols-2 lg:px-6">
        <div>
          <p className="text-sm font-black uppercase tracking-[0.18em] text-brand-accent">Admin Setup</p>
          <h1 className="mt-3 text-4xl font-black text-brand-text">Create a BuildMart admin account.</h1>
          <p className="mt-4 max-w-xl text-slate-600">This setup route requires `ADMIN_SETUP_KEY` from the backend environment and does not create customer or seller accounts.</p>
        </div>
        <AuthForm type="register" />
      </section>
      <Footer />
    </div>
  )
}
