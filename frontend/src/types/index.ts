// ========================
// Village Types
// ========================
export interface VillageInfo {
  id: number
  name: string
  tagline: string | null
  description: string | null
  history: string | null
  vision: string | null
  mission: string | null
  address: string | null
  kecamatan: string | null
  kabupaten: string | null
  provinsi: string | null
  kode_pos: string | null
  phone: string | null
  email: string | null
  logo_url: string | null
  cover_image_url: string | null
  total_penduduk: number | null
  total_kk: number | null
  luas_wilayah: number | null
  created_at: string
  updated_at: string
}

export interface VillageOfficial {
  id: number
  name: string
  position: string
  photo_url: string | null
  phone: string | null
  period_start: number | null
  period_end: number | null
  sort_order: number
  is_active: boolean
}

// ========================
// UMKM Types
// ========================
export interface UmkmStore {
  id: number
  name: string
  slug: string
  owner_name: string
  description: string | null
  category: string | null
  address: string | null
  rt: string | null
  rw: string | null
  phone: string | null
  whatsapp: string | null
  email: string | null
  instagram: string | null
  facebook: string | null
  logo_url: string | null
  cover_image_url: string | null
  operating_hours: string | null
  latitude: number | null
  longitude: number | null
  is_active: boolean
  is_featured: boolean
  products?: Product[]
  created_at: string
  updated_at: string
}

export type UmkmCategory =
  | 'Kuliner'
  | 'Kerajinan'
  | 'Pertanian'
  | 'Jasa'
  | 'Fashion'
  | 'Lainnya'

// ========================
// Product Types
// ========================
export interface Product {
  id: number
  store_id: number
  name: string
  slug: string
  description: string | null
  price: number | null
  price_min: number | null
  price_max: number | null
  unit: string | null
  image_url: string | null
  category: string | null
  stock_status: 'available' | 'out_of_stock' | 'pre_order'
  is_featured: boolean
  is_active: boolean
  sort_order: number
  store?: UmkmStore
  created_at: string
  updated_at: string
}

// ========================
// News Types
// ========================
export interface News {
  id: number
  title: string
  slug: string
  excerpt: string | null
  content: string
  cover_image_url: string | null
  category: 'berita' | 'pengumuman' | 'kegiatan' | 'informasi'
  author_name: string | null
  is_published: boolean
  is_featured: boolean
  published_at: string | null
  views: number
  created_at: string
  updated_at: string
}

// ========================
// API Response Types
// ========================
export interface ApiResponse<T> {
  data: T
  message?: string
}

export interface PaginatedResponse<T> {
  data: T[]
  meta: {
    current_page: number
    last_page: number
    per_page: number
    total: number
  }
  links: {
    first: string | null
    last: string | null
    prev: string | null
    next: string | null
  }
}
