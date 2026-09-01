import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Types untuk database
export type Database = {
  public: {
    Tables: {
      village_info: {
        Row: {
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
          phone: string | null
          email: string | null
          logo_url: string | null
          cover_image_url: string | null
          total_penduduk: number | null
          total_kk: number | null
          created_at: string
          updated_at: string
        }
      }
      umkm_stores: {
        Row: {
          id: number
          name: string
          slug: string
          owner_name: string
          description: string | null
          category: string | null
          address: string | null
          phone: string | null
          whatsapp: string | null
          instagram: string | null
          logo_url: string | null
          cover_image_url: string | null
          is_active: boolean
          is_featured: boolean
          created_at: string
          updated_at: string
        }
      }
      products: {
        Row: {
          id: number
          store_id: number
          name: string
          slug: string
          description: string | null
          price: number | null
          image_url: string | null
          category: string | null
          stock_status: 'available' | 'out_of_stock' | 'pre_order'
          is_active: boolean
          created_at: string
          updated_at: string
        }
      }
      news: {
        Row: {
          id: number
          title: string
          slug: string
          excerpt: string | null
          content: string
          cover_image_url: string | null
          category: 'berita' | 'pengumuman' | 'kegiatan' | 'informasi'
          is_published: boolean
          is_featured: boolean
          published_at: string | null
          views: number
          created_at: string
          updated_at: string
        }
      }
    }
  }
}
