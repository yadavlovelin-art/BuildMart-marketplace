import { products as sampleProducts, trackingSteps } from './sampleData'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'

// ── Wake up Render before any important request ───────────────────────────────
async function wakeUpBackend() {
  try {
    await fetch(`${API_BASE_URL}/health`, {
      method: 'GET',
      cache: 'no-store',
      signal: AbortSignal.timeout(8000),
    })
  } catch {
    // ignore — just a warm-up ping, errors are fine here
  }
}

// ── Core fetch with retry ─────────────────────────────────────────────────────
async function request(endpoint, options = {}, retries = 2) {
  for (let attempt = 1; attempt <= retries; attempt++) {
    const controller = new AbortController()
    // 40 seconds — enough for Render cold start
    const timer = setTimeout(() => controller.abort(), 40000)

    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        ...options,
        signal: controller.signal,
        headers: {
          'Content-Type': 'application/json',
          ...(options.headers || {}),
        },
        cache: 'no-store',
      })
      clearTimeout(timer)

      const data = await response.json().catch(() => ({}))
      if (!response.ok) throw new Error(data.message || 'Request failed')
      return data

    } catch (err) {
      clearTimeout(timer)

      const isLastAttempt = attempt === retries
      const isAborted = err.name === 'AbortError'
      const isNetworkError = err.message === 'Failed to fetch'

      if ((isAborted || isNetworkError) && !isLastAttempt) {
        // Wait 3 seconds then retry — backend may still be waking up
        console.log(`Attempt ${attempt} failed, retrying in 3s...`)
        await new Promise((r) => setTimeout(r, 3000))
        continue
      }

      if (isAborted) throw new Error('Server took too long. Please try again.')
      if (isNetworkError) throw new Error('Cannot connect. Please check internet.')
      throw err
    }
  }
}

export const api = {
  // ── Products (fallback to sample data if backend down) ────────────────────
  getProducts: async (params = {}) => {
    const query = new URLSearchParams(params).toString()
    try {
      return await request(`/products${query ? `?${query}` : ''}`, {}, 1)
    } catch {
      const search = (params.search || '').toLowerCase()
      const category = params.category || ''
      return sampleProducts.filter((p) => {
        const matchSearch =
          !search ||
          p.name.toLowerCase().includes(search) ||
          p.category.toLowerCase().includes(search) ||
          p.location.toLowerCase().includes(search)
        return matchSearch && (!category || p.category === category)
      })
    }
  },

  getProductById: async (id) => {
    try {
      return await request(`/products/${id}`, {}, 1)
    } catch {
      const product = sampleProducts.find((p) => p._id === id)
      if (!product) throw new Error('Product not found')
      return product
    }
  },

  // ── Auth (wake up first, then login) ──────────────────────────────────────
  login: async (payload) => {
    await wakeUpBackend()
    return request('/auth/login', {
      method: 'POST',
      body: JSON.stringify(payload),
    }, 2)
  },

  register: (payload) =>
    request('/auth/register', {
      method: 'POST',
      body: JSON.stringify(payload),
    }, 2),

  // ── Products CRUD ──────────────────────────────────────────────────────────
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

  // ── Inquiry (wake up first) ────────────────────────────────────────────────
  createInquiry: async (payload) => {
    await wakeUpBackend()
    return request('/inquiries', {
      method: 'POST',
      body: JSON.stringify(payload),
    }, 2)
  },

  getInquiries: (token) =>
    request('/inquiries', {
      headers: { Authorization: `Bearer ${token}` },
    }),

  // ── Orders ─────────────────────────────────────────────────────────────────
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

  // ── Track order (fallback to demo data) ───────────────────────────────────
  trackOrder: async (trackingId) => {
    try {
      return await request(`/orders/track/${trackingId}`, {}, 1)
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
