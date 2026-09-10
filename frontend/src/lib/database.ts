import { supabase } from './supabase'
import type { VillageInfo, VillageOfficial, News, UmkmStore, Product } from '../types'

// ========================
// Village Info API
// ========================
export async function getVillageInfo(): Promise<VillageInfo | null> {
  const { data, error } = await supabase
    .from('village_info')
    .select('*')
    .single()

  if (error) {
    console.error('Error fetching village info:', error)
    return null
  }
  return data
}

export async function adminUpdateVillageInfo(payload: Partial<VillageInfo>) {
  // Assuming there is only one row, id = 1
  return supabase.from('village_info').update(payload).eq('id', 1)
}

// ========================
// Village Officials API
// ========================
export async function getVillageOfficials(): Promise<VillageOfficial[]> {
  const { data, error } = await supabase
    .from('village_officials')
    .select('*')
    .eq('is_active', true)
    .order('sort_order', { ascending: true })

  if (error) {
    console.error('Error fetching village officials:', error)
    return []
  }
  return data ?? []
}

// ========================
// News API
// ========================
export async function getPublishedNews(limit?: number): Promise<News[]> {
  let query = supabase
    .from('news')
    .select('*')
    .eq('is_published', true)
    .order('published_at', { ascending: false })

  if (limit) query = query.limit(limit)

  const { data, error } = await query
  if (error) {
    console.error('Error fetching news:', error)
    return []
  }
  return data ?? []
}

export async function getFeaturedNews(): Promise<News[]> {
  const { data, error } = await supabase
    .from('news')
    .select('*')
    .eq('is_published', true)
    .eq('is_featured', true)
    .order('published_at', { ascending: false })
    .limit(3)

  if (error) {
    console.error('Error fetching featured news:', error)
    return []
  }
  return data ?? []
}

export async function getNewsBySlug(slug: string): Promise<News | null> {
  const { data, error } = await supabase
    .from('news')
    .select('*')
    .eq('slug', slug)
    .eq('is_published', true)
    .single()

  if (error) {
    console.error('Error fetching news by slug:', error)
    return null
  }

  // Increment views
  await supabase
    .from('news')
    .update({ views: (data.views ?? 0) + 1 })
    .eq('id', data.id)

  return data
}

// ========================
// UMKM API
// ========================
export async function getUmkmStores(category?: string): Promise<UmkmStore[]> {
  let query = supabase
    .from('umkm_stores')
    .select('*')
    .eq('is_active', true)
    .order('is_featured', { ascending: false })

  if (category) query = query.eq('category', category)

  const { data, error } = await query
  if (error) {
    console.error('Error fetching UMKM stores:', error)
    return []
  }
  return data ?? []
}

export async function getUmkmBySlug(slug: string): Promise<UmkmStore | null> {
  const { data, error } = await supabase
    .from('umkm_stores')
    .select('*, products(*)')
    .eq('slug', slug)
    .eq('is_active', true)
    .single()

  if (error) {
    console.error('Error fetching UMKM by slug:', error)
    return null
  }
  return data
}

// ========================
// Products API
// ========================
export async function getProductsByStore(storeId: number): Promise<Product[]> {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('store_id', storeId)
    .eq('is_active', true)
    .order('sort_order', { ascending: true })

  if (error) {
    console.error('Error fetching products:', error)
    return []
  }
  return data ?? []
}

// ========================
// Admin: CRUD News
// ========================
export async function adminGetAllNews(): Promise<News[]> {
  const { data, error } = await supabase
    .from('news')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching admin news:', error)
    return []
  }
  return data ?? []
}

export async function adminCreateNews(payload: Partial<News>) {
  return supabase.from('news').insert(payload)
}

export async function adminUpdateNews(id: number, payload: Partial<News>) {
  return supabase.from('news').update(payload).eq('id', id)
}

export async function adminDeleteNews(id: number) {
  return supabase.from('news').delete().eq('id', id)
}

// ========================
// Admin: CRUD UMKM
// ========================
export async function adminGetAllUmkm(): Promise<UmkmStore[]> {
  const { data, error } = await supabase
    .from('umkm_stores')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching admin UMKM:', error)
    return []
  }
  return data ?? []
}

export async function adminCreateUmkm(payload: Partial<UmkmStore>) {
  return supabase.from('umkm_stores').insert(payload)
}

export async function adminUpdateUmkm(id: number, payload: Partial<UmkmStore>) {
  return supabase.from('umkm_stores').update(payload).eq('id', id)
}

export async function adminDeleteUmkm(id: number) {
  return supabase.from('umkm_stores').delete().eq('id', id)
}

// ========================
// Admin: CRUD Officials
// ========================
export async function adminGetOfficials(): Promise<VillageOfficial[]> {
  const { data, error } = await supabase
    .from('village_officials')
    .select('*')
    .order('sort_order', { ascending: true })

  if (error) {
    console.error('Error fetching admin officials:', error)
    return []
  }
  return data ?? []
}

export async function adminCreateOfficial(payload: Partial<VillageOfficial>) {
  return supabase.from('village_officials').insert(payload)
}

export async function adminUpdateOfficial(id: number, payload: Partial<VillageOfficial>) {
  return supabase.from('village_officials').update(payload).eq('id', id)
}

export async function adminDeleteOfficial(id: number) {
  return supabase.from('village_officials').delete().eq('id', id)
}

// ========================
// Storage: Upload Foto
// ========================
export async function uploadImage(file: File, folder: string): Promise<string | null> {
  const ext = file.name.split('.').pop()
  const fileName = `${folder}/${Date.now()}.${ext}`

  const { data, error } = await supabase.storage
    .from('desa-selorejo-storage')
    .upload(fileName, file, {
      cacheControl: '3600',
      upsert: false,
    })

  if (error) {
    console.error('Error uploading image:', error)
    return null
  }

  const { data: urlData } = supabase.storage
    .from('desa-selorejo-storage')
    .getPublicUrl(data.path)

  return urlData.publicUrl
}

export async function deleteImage(url: string) {
  const path = url.split('/desa-selorejo-storage/')[1]
  if (!path) return
  await supabase.storage.from('desa-selorejo-storage').remove([path])
}
