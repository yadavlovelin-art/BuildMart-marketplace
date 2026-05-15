import Header from '../../components/Header'
import Footer from '../../components/Footer'
import InquiryForm from '../../components/InquiryForm'
import { Instagram, Linkedin, Mail, MapPin, MessageCircle, Phone } from 'lucide-react'

const contacts = [
  [Phone, 'Phone', '9217179618', 'tel:9217179618'],
  [Phone, 'Phone 2', '9625516129', 'tel:9625516129'],
  [MessageCircle, 'WhatsApp', '9217179618', 'https://wa.me/919217179618'],
  [Instagram, 'Instagram', 'Add later', '#'],
  [Linkedin, 'LinkedIn', 'Add later', '#'],
  [Mail, 'Email', 'buildmartindiaoffical@gmail.com', 'mailto:buildmartindiaoffical@gmail.com'],
  [MapPin, 'Address', 'Dust Rodi, opp. Furniture Market, near Sikanderpur Metro, Nathupur, Sector 24, Gurugram 122002', '#'],
]

export default function ContactPage() {
  return (
    <div>
      <Header />
      <section className="bg-white py-12">
        <div className="mx-auto max-w-7xl px-4 lg:px-6">
          <p className="text-sm font-black uppercase tracking-[0.18em] text-brand-accent">Contact BuildMart India</p>
          <h1 className="mt-2 text-4xl font-black text-brand-text">Send inquiry for building material supply</h1>
          <p className="mt-3 max-w-2xl text-slate-600">Reach us directly or fill the form — we'll get back to you with a quote quickly.</p>
        </div>
      </section>
      <section className="mx-auto grid max-w-7xl gap-8 px-4 py-10 lg:grid-cols-[0.85fr_1.15fr] lg:px-6">
        <div className="space-y-5">
          <div className="grid gap-4 sm:grid-cols-2">
            {contacts.map(([Icon, title, detail, href]) => (
              <a key={title} href={href} className="rounded-md bg-white p-5 shadow-card ring-1 ring-slate-200 transition hover:ring-brand-accent">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-brand-dark text-white">
                  <Icon size={19} />
                </div>
                <p className="mt-4 font-black text-brand-text">{title}</p>
                <p className="mt-1 text-sm text-slate-600">{detail}</p>
              </a>
            ))}
          </div>

          {/* Google Maps Embed */}
          <div className="overflow-hidden rounded-md shadow-card ring-1 ring-slate-200">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3507.7!2d77.0856!3d28.4712!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjjCsDI4JzE2LjMiTiA3N8KwMDUnMDguMiJF!5e0!3m2!1sen!2sin!4v1620000000000!5m2!1sen!2sin&q=Nathupur+Sector+24+Gurugram+Haryana"
              width="100%"
              height="300"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="BuildMart India Location"
            />
          </div>
        </div>
        <InquiryForm />
      </section>
      <Footer />
    </div>
  )
}
