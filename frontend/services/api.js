import { products as sampleProducts, trackingSteps } from './sampleData'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'

async function request(endpoint, options = {}) {
  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), 1500)
  let response
  try {
    response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      signal: controller.signal,
      headers: {
        'Content-Type': 'application/json',
        ...(options.headers || {}),
      },
      cache: 'no-store',
    })
  } finally {
    clearTimeout(timeout)
  }

  const data = await response.json().catch(() => ({}))

  if (!response.ok) {
    throw new Error(data.message || 'Request failed')
  }

  return data
}

export const api = {
  getProducts: async (params = {}) => {
    const query = new URLSearchParams(params).toString()
    try {
      return await request(`/products${query ? `?${query}` : ''}`)
    } catch {
      const search = (params.search || '').toLowerCase()
      const category = params.category || ''
      return sampleProducts.filter((product) => {
        const matchesSearch =
          !search ||
          product.name.toLowerCase().includes(search) ||
          product.category.toLowerCase().includes(search) ||
          product.location.toLowerCase().includes(search)
        return matchesSearch && (!category || product.category === category)
      })
    }
  },
  getProductById: async (id) => {
    try {
      return await request(`/products/${id}`)
    } catch {
      const product = sampleProducts.find((item) => item._id === id)
      if (!product) {
        throw new Error('Product not found')
      }
      return product
    }
  },
  login: (payload) =>
    request('/auth/login', {
      method: 'POST',
      body: JSON.stringify(payload),
    }),
  register: (payload) =>
    request('/auth/register', {
      method: 'POST',
      body: JSON.stringify(payload),
    }),
  createProduct: (payload, token) =>
    request('/products', {
      method: 'POST',
      body: JSON.stringify(payload),
      headers: { Authorization: `Bearer ${token}` },
    }),
  updateProduct: (id, payload, token) =>
    request(`/products/${id}`, {
      method: 'PUT',
      body: JSON.stringify(payload),
      headers: { Authorization: `Bearer ${token}` },
    }),
  deleteProduct: (id, token) =>
    request(`/products/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    }),
  createInquiry: (payload) =>
    request('/inquiries', {
      method: 'POST',
      body: JSON.stringify(payload),
    }),
  getInquiries: (token) =>
    request('/inquiries', {
      headers: { Authorization: `Bearer ${token}` },
    }),
  createOrder: (payload, token) =>
    request('/orders', {
      method: 'POST',
      body: JSON.stringify(payload),
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    }),
  getOrders: (token) =>
    request('/orders', {
      headers: { Authorization: `Bearer ${token}` },
    }),
  updateOrder: (id, payload, token) =>
    request(`/orders/${id}`, {
      method: 'PUT',
      body: JSON.stringify(payload),
      headers: { Authorization: `Bearer ${token}` },
    }),
  convertInquiry: (inquiryId, token) =>
    request(`/inquiries/${inquiryId}/convert`, {
      method: 'PATCH',
      headers: { Authorization: `Bearer ${token}` },
    }),
  trackOrder: async (trackingId) => {
    try {
      return await request(`/orders/track/${trackingId}`)
    } catch {
      return {
        trackingId,
        orderStatus: 'Vehicle Dispatched',
        customerName: 'BuildMart Customer',
        deliveryAddress: 'Delhi NCR',
        products: [{ name: 'Construction Material Load', quantity: 1 }],
        progress: 4,
        steps: trackingSteps,
      }
    }
  },
}
