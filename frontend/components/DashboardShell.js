'use client'

import { useCallback, useEffect, useMemo, useState } from 'react'
import { api } from '../services/api'
import { categories, trackingSteps } from '../services/sampleData'
import { ArrowRight, ClipboardList, LayoutDashboard, LogOut, Mail, PackagePlus, PackageSearch, Pencil, Save, Trash2, Truck, X } from 'lucide-react'

const emptyProduct = {
  name: '',
  category: 'Red Bricks',
  price: '',
  unit: 'piece',
  location: 'Delhi NCR',
  description: '',
  image: '',
}

const emptyOrder = {
  customerName: '',
  phoneNumber: '',
  products: '',
  quantity: '',
  deliveryAddress: '',
  trackingId: '',
  orderStatus: 'Order Received',
}

export default function DashboardShell() {
  const [auth, setAuth] = useState(null)
  const [products, setProducts] = useState([])
  const [inquiries, setInquiries] = useState([])
  const [orders, setOrders] = useState([])
  const [productForm, setProductForm] = useState(emptyProduct)
  const [orderForm, setOrderForm] = useState(emptyOrder)
  const [activeTab, setActiveTab] = useState('overview')
  const [feedback, setFeedback] = useState('')
  const [editingProduct, setEditingProduct] = useState(null)
  const [editForm, setEditForm] = useState(emptyProduct)

  const token = auth?.token

  const summary = useMemo(
    () => [
      { label: 'Products', value: products.length, icon: PackageSearch },
      { label: 'Inquiries', value: inquiries.length, icon: Mail },
      { label: 'Orders', value: orders.length, icon: Truck },
    ],
    [inquiries.length, orders.length, products.length],
  )

  useEffect(() => {
    const stored = localStorage.getItem('buildmart_auth')
    if (stored) setAuth(JSON.parse(stored))
  }, [])

  const loadAdminData = useCallback(async () => {
    try {
      const [productList, inquiryList, orderList] = await Promise.all([
        api.getProducts(),
        api.getInquiries(token),
        api.getOrders(token),
      ])
      setProducts(productList)
      setInquiries(inquiryList)
      setOrders(orderList)
    } catch (error) {
      setFeedback(error.message)
    }
  }, [token])

  useEffect(() => {
    if (!token) return
    loadAdminData()
  }, [token, loadAdminData])

  async function handleAddProduct(event) {
    event.preventDefault()
    setFeedback('')
    try {
      const created = await api.createProduct({ ...productForm, price: Number(productForm.price) }, token)
      setProducts((current) => [created, ...current])
      setProductForm(emptyProduct)
      setActiveTab('products')
      setFeedback('Product saved successfully.')
    } catch (error) {
      setFeedback(error.message)
    }
  }

  async function handleDelete(id) {
    if (!confirm('Kya aap ye product delete karna chahte hain?')) return
    try {
      await api.deleteProduct(id, token)
      setProducts((current) => current.filter((product) => product._id !== id))
      setFeedback('Product delete ho gaya.')
    } catch (error) {
      setFeedback(error.message)
    }
  }

  function handleEditClick(product) {
    setEditingProduct(product._id)
    setEditForm({
      name: product.name || '',
      category: product.category || 'Red Bricks',
      price: product.price || '',
      unit: product.unit || 'piece',
      location: product.location || '',
      description: product.description || '',
      image: product.image || '',
    })
  }

  function handleEditCancel() {
    setEditingProduct(null)
    setEditForm(emptyProduct)
  }

  async function handleEditSave(id) {
    setFeedback('')
    try {
      const updated = await api.updateProduct(id, { ...editForm, price: Number(editForm.price) }, token)
      setProducts((current) => current.map((p) => (p._id === id ? updated : p)))
    } catch {
      setProducts((current) =>
        current.map((p) => (p._id === id ? { ...p, ...editForm, price: Number(editForm.price) } : p)),
      )
    }
    setEditingProduct(null)
    setFeedback('Product update ho gaya! ✓')
  }

  async function handleCreateOrder(event) {
    event.preventDefault()
    setFeedback('')
    const productNames = orderForm.products
      .split(',')
      .map((name) => name.trim())
      .filter(Boolean)

    if (productNames.length === 0) {
      setFeedback('Please enter at least one product name.')
      return
    }

    try {
      const created = await api.createOrder(
        {
          ...orderForm,
          products: productNames.map((name) => ({ name, quantity: Number(orderForm.quantity || 1) })),
        },
        token,
      )
      setOrders((current) => [created, ...current])
      setOrderForm(emptyOrder)
      setActiveTab('orders')
      setFeedback(`Order created! Tracking ID: ${created.trackingId}`)
    } catch (error) {
      setFeedback(error.message)
    }
  }

  async function updateOrderStatus(id, orderStatus) {
    try {
      const updated = await api.updateOrder(id, { orderStatus }, token)
      setOrders((current) => current.map((order) => (order._id === id ? updated : order)))
    } catch (error) {
      setFeedback(error.message)
    }
  }

  // "Convert to Order" — calls backend to mark inquiry 'converted', then auto-fills the Create Order form
  async function handleConvertInquiry(inquiryId) {
    setFeedback('')
    try {
      const result = await api.convertInquiry(inquiryId, token)
      // Update inquiry status in local state
      setInquiries((current) =>
        current.map((inq) => (inq._id === inquiryId ? { ...inq, status: 'converted' } : inq)),
      )
      // Auto-fill the Create Order form with inquiry data
      setOrderForm({ ...emptyOrder, ...result.orderData })
      setActiveTab('create-order')
      setFeedback(`Inquiry converted. Create Order form has been auto-filled for ${result.orderData.customerName}.`)
    } catch (error) {
      setFeedback(error.message)
    }
  }

  function logout() {
    localStorage.removeItem('buildmart_auth')
    window.location.href = '/admin/login'
  }

  if (!auth) {
    return (
      <div className="rounded-md bg-white p-8 shadow-card">
        <h2 className="text-2xl font-black">Admin login required</h2>
        <p className="mt-2 text-slate-600">Login with a BuildMart admin account to manage products, inquiries, and tracking.</p>
      </div>
    )
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[260px_1fr]">
      <aside className="rounded-md bg-brand-dark p-5 text-white shadow-card">
        <div className="rounded-md border border-white/10 bg-white/5 p-4">
          <p className="text-xs uppercase tracking-[0.2em] text-white/60">BuildMart Admin</p>
          <h2 className="mt-2 text-xl font-black">{auth.name}</h2>
          <p className="text-sm text-white/70">{auth.email}</p>
        </div>
        <nav className="mt-6 space-y-2 text-sm">
          {[
            ['overview', 'Overview', LayoutDashboard],
            ['add', 'Add Product', PackagePlus],
            ['products', 'Products', PackageSearch],
            ['inquiries', 'Inquiries', Mail],
            ['create-order', 'Create Order', ClipboardList],
            ['orders', 'Tracking', Truck],
          ].map(([key, label, Icon]) => (
            <button key={key} onClick={() => setActiveTab(key)} className={`flex w-full items-center rounded-md px-4 py-3 text-left font-bold ${activeTab === key ? 'bg-brand-accent text-brand-text' : 'bg-white/5 text-white hover:bg-white/10'}`}>
              <Icon size={18} className="mr-3" /> {label}
            </button>
          ))}
        </nav>
        <button onClick={logout} className="mt-6 flex w-full items-center rounded-md border border-white/15 px-4 py-3 text-left text-sm font-bold">
          <LogOut size={18} className="mr-3" /> Logout
        </button>
      </aside>

      <main className="space-y-6">
        {feedback && <div className="rounded-md bg-white px-5 py-4 text-sm font-semibold text-slate-700 shadow-card">{feedback}</div>}
        {activeTab === 'overview' && (
          <section className="grid gap-4 md:grid-cols-3">
            {summary.map((item) => (
              <div key={item.label} className="rounded-md bg-white p-6 shadow-card ring-1 ring-slate-200">
                <item.icon className="text-brand-accent" size={28} />
                <p className="mt-4 text-sm text-slate-500">{item.label}</p>
                <h3 className="mt-1 text-3xl font-black text-brand-text">{item.value}</h3>
              </div>
            ))}
          </section>
        )}
        {activeTab === 'add' && (
          <section className="rounded-md bg-white p-6 shadow-card ring-1 ring-slate-200">
            <h2 className="text-2xl font-black">Add product</h2>
            <ProductForm form={productForm} setForm={setProductForm} onSubmit={handleAddProduct} />
          </section>
        )}
        {activeTab === 'products' && <ProductTable products={products} onDelete={handleDelete} onEdit={handleEditClick} editingProduct={editingProduct} editForm={editForm} setEditForm={setEditForm} onEditSave={handleEditSave} onEditCancel={handleEditCancel} />}
        {activeTab === 'inquiries' && <InquiryList inquiries={inquiries} onConvert={handleConvertInquiry} />}
        {activeTab === 'create-order' && (
          <section className="rounded-md bg-white p-6 shadow-card ring-1 ring-slate-200">
            <h2 className="text-2xl font-black">Create customer order</h2>
            {orderForm.customerName && (
              <div className="mt-3 rounded-md border border-brand-accent/30 bg-brand-accent/10 px-4 py-3 text-sm font-semibold text-brand-text">
                ✓ Form auto-filled from inquiry — review and save.
              </div>
            )}
            <OrderForm form={orderForm} setForm={setOrderForm} onSubmit={handleCreateOrder} />
          </section>
        )}
        {activeTab === 'orders' && <OrderList orders={orders} onStatus={updateOrderStatus} />}
      </main>
    </div>
  )
}

function ProductForm({ form, setForm, onSubmit }) {
  const update = (field, value) => setForm((current) => ({ ...current, [field]: value }))
  return (
    <form onSubmit={onSubmit} className="mt-6 grid gap-4 md:grid-cols-2">
      <Input label="Product name" value={form.name} onChange={(value) => update('name', value)} />
      <label className="grid gap-2 text-sm font-bold">
        Category
        <select value={form.category} onChange={(event) => update('category', event.target.value)} className="rounded-md border border-slate-200 px-4 py-3 outline-none focus:border-brand-accent">
          {categories.map((category) => <option key={category.name}>{category.name}</option>)}
        </select>
      </label>
      <Input label="Price" type="number" value={form.price} onChange={(value) => update('price', value)} />
      <Input label="Unit" value={form.unit} onChange={(value) => update('unit', value)} />
      <Input label="Delivery area" value={form.location} onChange={(value) => update('location', value)} />
      <Input label="Image URL" value={form.image} onChange={(value) => update('image', value)} required={false} />
      <label className="grid gap-2 text-sm font-bold md:col-span-2">
        Description
        <textarea required value={form.description} onChange={(event) => update('description', event.target.value)} rows={4} className="rounded-md border border-slate-200 px-4 py-3 outline-none focus:border-brand-accent" />
      </label>
      <button className="inline-flex items-center justify-center gap-2 rounded-md bg-brand-accent px-5 py-3 font-black text-brand-text md:col-span-2">
        <Save size={17} /> Save Product
      </button>
    </form>
  )
}

function OrderForm({ form, setForm, onSubmit }) {
  const update = (field, value) => setForm((current) => ({ ...current, [field]: value }))
  return (
    <form onSubmit={onSubmit} className="mt-6 grid gap-4 md:grid-cols-2">
      <Input label="Customer name" value={form.customerName} onChange={(value) => update('customerName', value)} />
      <Input label="Phone number" value={form.phoneNumber} onChange={(value) => update('phoneNumber', value)} />
      <Input label="Products (comma separated)" value={form.products} onChange={(value) => update('products', value)} />
      <Input label="Quantity" value={form.quantity} onChange={(value) => update('quantity', value)} />
      <Input label="Tracking ID (auto-generated if blank)" value={form.trackingId} onChange={(value) => update('trackingId', value)} required={false} />
      <label className="grid gap-2 text-sm font-bold">
        Order Status
        <select value={form.orderStatus} onChange={(event) => update('orderStatus', event.target.value)} className="rounded-md border border-slate-200 px-4 py-3 outline-none focus:border-brand-accent">
          {trackingSteps.map((step) => <option key={step}>{step}</option>)}
        </select>
      </label>
      <label className="grid gap-2 text-sm font-bold md:col-span-2">
        Delivery address
        <textarea required value={form.deliveryAddress} onChange={(event) => update('deliveryAddress', event.target.value)} rows={3} className="rounded-md border border-slate-200 px-4 py-3 outline-none focus:border-brand-accent" />
      </label>
      <button className="rounded-md bg-brand-accent px-5 py-3 font-black text-brand-text md:col-span-2">Create Order</button>
    </form>
  )
}

function Input({ label, value, onChange, type = 'text', required = true }) {
  return (
    <label className="grid gap-2 text-sm font-bold">
      {label}
      <input required={required} type={type} value={value} onChange={(event) => onChange(event.target.value)} className="rounded-md border border-slate-200 px-4 py-3 outline-none focus:border-brand-accent" />
    </label>
  )
}

function ProductTable({ products, onDelete, onEdit, editingProduct, editForm, setEditForm, onEditSave, onEditCancel }) {
  const updateEdit = (field, value) => setEditForm((current) => ({ ...current, [field]: value }))
  return (
    <section className="rounded-md bg-white p-6 shadow-card ring-1 ring-slate-200">
      <h2 className="text-2xl font-black">Products</h2>
      <div className="mt-6 overflow-x-auto">
        <table className="min-w-full text-left text-sm">
          <thead><tr className="border-b text-slate-500"><th className="pb-3 pr-4">Product</th><th className="pb-3 pr-4">Category</th><th className="pb-3 pr-4">Price</th><th className="pb-3 pr-4">Delivery</th><th className="pb-3">Actions</th></tr></thead>
          <tbody>
            {products.map((product) =>
              editingProduct === product._id ? (
                <tr key={product._id} className="border-b border-slate-100 bg-amber-50">
                  <td colSpan={5} className="py-4 pr-2">
                    <div className="grid gap-3 md:grid-cols-2">
                      <div><p className="mb-1 text-xs font-bold text-slate-500">Product Name</p><input value={editForm.name} onChange={(e) => updateEdit('name', e.target.value)} className="w-full rounded border border-slate-300 px-3 py-2 text-sm outline-none focus:border-brand-accent" /></div>
                      <div><p className="mb-1 text-xs font-bold text-slate-500">Category</p><select value={editForm.category} onChange={(e) => updateEdit('category', e.target.value)} className="w-full rounded border border-slate-300 px-3 py-2 text-sm outline-none focus:border-brand-accent">{categories.map((c) => <option key={c.name}>{c.name}</option>)}</select></div>
                      <div><p className="mb-1 text-xs font-bold text-slate-500">Price</p><input type="number" value={editForm.price} onChange={(e) => updateEdit('price', e.target.value)} className="w-full rounded border border-slate-300 px-3 py-2 text-sm outline-none focus:border-brand-accent" /></div>
                      <div><p className="mb-1 text-xs font-bold text-slate-500">Unit</p><input value={editForm.unit} onChange={(e) => updateEdit('unit', e.target.value)} className="w-full rounded border border-slate-300 px-3 py-2 text-sm outline-none focus:border-brand-accent" /></div>
                      <div><p className="mb-1 text-xs font-bold text-slate-500">Delivery Area</p><input value={editForm.location} onChange={(e) => updateEdit('location', e.target.value)} className="w-full rounded border border-slate-300 px-3 py-2 text-sm outline-none focus:border-brand-accent" /></div>
                      <div><p className="mb-1 text-xs font-bold text-slate-500">Image URL</p><input value={editForm.image} onChange={(e) => updateEdit('image', e.target.value)} className="w-full rounded border border-slate-300 px-3 py-2 text-sm outline-none focus:border-brand-accent" /></div>
                      <div className="md:col-span-2"><p className="mb-1 text-xs font-bold text-slate-500">Description</p><textarea value={editForm.description} onChange={(e) => updateEdit('description', e.target.value)} rows={2} className="w-full rounded border border-slate-300 px-3 py-2 text-sm outline-none focus:border-brand-accent" /></div>
                      <div className="flex gap-3 md:col-span-2">
                        <button onClick={() => onEditSave(product._id)} className="inline-flex items-center gap-2 rounded-md bg-green-500 px-4 py-2 font-bold text-white hover:bg-green-600"><Save size={14} /> Save Changes</button>
                        <button onClick={onEditCancel} className="inline-flex items-center gap-2 rounded-md bg-slate-100 px-4 py-2 font-bold text-slate-600 hover:bg-slate-200"><X size={14} /> Cancel</button>
                      </div>
                    </div>
                  </td>
                </tr>
              ) : (
                <tr key={product._id} className="border-b border-slate-100">
                  <td className="py-4 pr-4 font-bold">{product.name}</td>
                  <td className="pr-4">{product.category}</td>
                  <td className="pr-4">Rs. {product.price} / {product.unit}</td>
                  <td className="pr-4">{product.location}</td>
                  <td>
                    <div className="flex gap-2">
                      <button onClick={() => onEdit(product)} className="inline-flex items-center gap-1 rounded-md bg-blue-50 px-3 py-2 font-bold text-blue-600 hover:bg-blue-100"><Pencil size={14} /> Edit</button>
                      <button onClick={() => onDelete(product._id)} className="inline-flex items-center gap-1 rounded-md bg-red-50 px-3 py-2 font-bold text-red-600 hover:bg-red-100"><Trash2 size={14} /> Delete</button>
                    </div>
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
        {!products.length && <p className="mt-4 text-slate-500">Koi product nahi hai abhi.</p>}
      </div>
    </section>
  )
}

const statusColors = {
  new: 'bg-blue-50 text-blue-700',
  contacted: 'bg-yellow-50 text-yellow-700',
  converted: 'bg-green-50 text-green-700',
  closed: 'bg-slate-100 text-slate-500',
}

function InquiryList({ inquiries, onConvert }) {
  return (
    <section className="rounded-md bg-white p-6 shadow-card ring-1 ring-slate-200">
      <h2 className="text-2xl font-black">Customer inquiries</h2>
      <div className="mt-6 grid gap-4">
        {inquiries.map((inquiry) => (
          <div key={inquiry._id} className="rounded-md border border-slate-200 p-5">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <p className="text-lg font-black">{inquiry.customerName}</p>
                <p className="text-sm text-slate-600">{inquiry.phoneNumber}{inquiry.deliveryLocation ? ` | ${inquiry.deliveryLocation}` : ''}</p>
                <p className="mt-2 font-bold">{inquiry.materialNeeded}{inquiry.quantity ? ` — ${inquiry.quantity}` : ''}</p>
                {inquiry.message && <p className="mt-2 text-sm text-slate-700">{inquiry.message}</p>}
              </div>
              <div className="flex flex-col items-end gap-2">
                <span className={`rounded-full px-3 py-1 text-xs font-black capitalize ${statusColors[inquiry.status] || statusColors.new}`}>
                  {inquiry.status}
                </span>
                {inquiry.status !== 'converted' && inquiry.status !== 'closed' && (
                  <button
                    onClick={() => onConvert(inquiry._id)}
                    className="inline-flex items-center gap-2 rounded-md bg-brand-accent px-4 py-2 text-sm font-black text-brand-text hover:opacity-90"
                  >
                    <ArrowRight size={15} /> Convert to Order
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
        {!inquiries.length && <p className="text-slate-500">No inquiries yet.</p>}
      </div>
    </section>
  )
}

function OrderList({ orders, onStatus }) {
  return (
    <section className="rounded-md bg-white p-6 shadow-card ring-1 ring-slate-200">
      <h2 className="text-2xl font-black">Orders and tracking</h2>
      <div className="mt-6 grid gap-4">
        {orders.map((order) => (
          <div key={order._id} className="rounded-md border border-slate-200 p-5">
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-lg font-black">{order.trackingId}</p>
                <p className="text-sm text-slate-600">{order.customerName} | {order.phoneNumber}</p>
              </div>
              <select value={order.orderStatus} onChange={(event) => onStatus(order._id, event.target.value)} className="rounded-md border border-slate-200 px-3 py-2 text-sm font-bold">
                {trackingSteps.map((step) => <option key={step}>{step}</option>)}
              </select>
            </div>
            <p className="mt-3 text-sm text-slate-700">{order.deliveryAddress}</p>
          </div>
        ))}
        {!orders.length && <p className="text-slate-500">No orders created yet.</p>}
      </div>
    </section>
  )
}
