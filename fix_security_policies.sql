-- ==========================================
-- SCRIPT PERBAIKAN KEAMANAN (RLS & STORAGE)
-- ==========================================

-- 1. Mengaktifkan Row Level Security (RLS) di semua tabel
ALTER TABLE public.village_info ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.village_officials ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.umkm_stores ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.news ENABLE ROW LEVEL SECURITY;

-- 2. Menghapus (drop) semua policy lama (jika ada) untuk menghindari bentrok
DROP POLICY IF EXISTS "Public can read village_info" ON public.village_info;
DROP POLICY IF EXISTS "Admin can manage village_info" ON public.village_info;

DROP POLICY IF EXISTS "Public can read active officials" ON public.village_officials;
DROP POLICY IF EXISTS "Admin can manage officials" ON public.village_officials;

DROP POLICY IF EXISTS "Public can read active umkm" ON public.umkm_stores;
DROP POLICY IF EXISTS "Admin can manage umkm" ON public.umkm_stores;

DROP POLICY IF EXISTS "Public can read active products" ON public.products;
DROP POLICY IF EXISTS "Admin can manage products" ON public.products;

DROP POLICY IF EXISTS "Public can read published news" ON public.news;
DROP POLICY IF EXISTS "Admin can manage news" ON public.news;

-- 3. Membuat Policy Baru (Berdasarkan Prinsip Keamanan Standar)

-- a. village_info
-- Publik hanya boleh membaca
CREATE POLICY "Public can read village_info" 
ON public.village_info FOR SELECT 
USING (true);

-- Admin (auth) boleh melakukan semuanya
CREATE POLICY "Admin can manage village_info" 
ON public.village_info FOR ALL 
USING (auth.role() = 'authenticated')
WITH CHECK (auth.role() = 'authenticated');

-- b. village_officials
CREATE POLICY "Public can read active officials" 
ON public.village_officials FOR SELECT 
USING (is_active = true);

CREATE POLICY "Admin can manage officials" 
ON public.village_officials FOR ALL 
USING (auth.role() = 'authenticated')
WITH CHECK (auth.role() = 'authenticated');

-- c. umkm_stores
CREATE POLICY "Public can read active umkm" 
ON public.umkm_stores FOR SELECT 
USING (is_active = true);

CREATE POLICY "Admin can manage umkm" 
ON public.umkm_stores FOR ALL 
USING (auth.role() = 'authenticated')
WITH CHECK (auth.role() = 'authenticated');

-- d. products
CREATE POLICY "Public can read active products" 
ON public.products FOR SELECT 
USING (is_active = true);

CREATE POLICY "Admin can manage products" 
ON public.products FOR ALL 
USING (auth.role() = 'authenticated')
WITH CHECK (auth.role() = 'authenticated');

-- e. news
CREATE POLICY "Public can read published news" 
ON public.news FOR SELECT 
USING (is_published = true);

CREATE POLICY "Admin can manage news" 
ON public.news FOR ALL 
USING (auth.role() = 'authenticated')
WITH CHECK (auth.role() = 'authenticated');


-- ==========================================
-- 4. Memperbaiki Policy Storage (desa-selorejo-storage)
-- ==========================================

-- Menghapus policy storage yang berbahaya
DROP POLICY IF EXISTS "Public Access" ON storage.objects;
DROP POLICY IF EXISTS "Upload Access" ON storage.objects;
DROP POLICY IF EXISTS "Delete Access" ON storage.objects;
DROP POLICY IF EXISTS "Update Access" ON storage.objects;

-- Membuat policy baru untuk Storage
-- Publik hanya boleh membaca/melihat gambar
CREATE POLICY "Public can view images" 
ON storage.objects FOR SELECT 
USING (bucket_id = 'desa-selorejo-storage');

-- HANYA ADMIN yang boleh Upload, Update, dan Delete
CREATE POLICY "Admin can upload images" 
ON storage.objects FOR INSERT 
WITH CHECK (
    bucket_id = 'desa-selorejo-storage' 
    AND auth.role() = 'authenticated'
);

CREATE POLICY "Admin can update images" 
ON storage.objects FOR UPDATE 
USING (
    bucket_id = 'desa-selorejo-storage' 
    AND auth.role() = 'authenticated'
);

CREATE POLICY "Admin can delete images" 
ON storage.objects FOR DELETE 
USING (
    bucket_id = 'desa-selorejo-storage' 
    AND auth.role() = 'authenticated'
);
