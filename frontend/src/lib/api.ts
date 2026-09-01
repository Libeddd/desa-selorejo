// Utility untuk memanggil Laravel API
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'

type FetchOptions = {
  method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'
  body?: unknown
  token?: string
}

async function apiFetch<T>(endpoint: string, options: FetchOptions = {}): Promise<T> {
  const { method = 'GET', body, token } = options

  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  }

  if (token) {
    headers['Authorization'] = `Bearer ${token}`
  }

  const response = await fetch(`${API_URL}/api${endpoint}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
    next: { revalidate: 60 }, // Cache 60 detik (ISR)
  })

  if (!response.ok) {
    throw new Error(`API Error: ${response.status} ${response.statusText}`)
  }

  return response.json()
}

// ========================
// Village API
// ========================
export const villageApi = {
  getInfo: () => apiFetch<{ data: object }>('/village'),
  getOfficials: () => apiFetch<{ data: object[] }>('/village/officials'),
}

// ========================
// UMKM API
// ========================
export const umkmApi = {
  getAll: (params?: { category?: string; search?: string; page?: number }) => {
    const query = new URLSearchParams()
    if (params?.category) query.set('category', params.category)
    if (params?.search) query.set('search', params.search)
    if (params?.page) query.set('page', String(params.page))
    return apiFetch<{ data: object[]; meta: object }>(`/umkm?${query}`)
  },
  getById: (id: number) => apiFetch<{ data: object }>(`/umkm/${id}`),
  getBySlug: (slug: string) => apiFetch<{ data: object }>(`/umkm/${slug}`),
  getProducts: (storeId: number) => apiFetch<{ data: object[] }>(`/umkm/${storeId}/products`),
}

// ========================
// Products API
// ========================
export const productsApi = {
  getAll: (params?: { category?: string; search?: string }) => {
    const query = new URLSearchParams()
    if (params?.category) query.set('category', params.category)
    if (params?.search) query.set('search', params.search)
    return apiFetch<{ data: object[] }>(`/products?${query}`)
  },
  getById: (id: number) => apiFetch<{ data: object }>(`/products/${id}`),
}

// ========================
// News API
// ========================
export const newsApi = {
  getAll: (params?: { category?: string; page?: number }) => {
    const query = new URLSearchParams()
    if (params?.category) query.set('category', params.category)
    if (params?.page) query.set('page', String(params.page))
    return apiFetch<{ data: object[]; meta: object }>(`/news?${query}`)
  },
  getBySlug: (slug: string) => apiFetch<{ data: object }>(`/news/${slug}`),
  getFeatured: () => apiFetch<{ data: object[] }>('/news/featured'),
}

export default apiFetch
