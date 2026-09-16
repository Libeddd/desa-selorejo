-- ============================================
-- Skema Database: Website Desa Selorejo
-- Platform: Supabase (PostgreSQL)
-- ============================================

-- Hapus tabel jika sudah ada (urutan: dependent dulu)
DROP TABLE IF EXISTS products CASCADE;
DROP TABLE IF EXISTS umkm_stores CASCADE;
DROP TABLE IF EXISTS news CASCADE;
DROP TABLE IF EXISTS village_officials CASCADE;
DROP TABLE IF EXISTS village_info CASCADE;
DROP TABLE IF EXISTS users CASCADE;

-- ============================================
-- Tabel: users (Admin)
-- ============================================
CREATE TABLE users (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(50) DEFAULT 'admin' CHECK (role IN ('super_admin', 'admin', 'editor')),
    avatar_url TEXT,
    email_verified_at TIMESTAMP WITH TIME ZONE,
    remember_token VARCHAR(100),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- Tabel: village_info (Informasi Desa)
-- ============================================
CREATE TABLE village_info (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL DEFAULT 'Desa Selorejo',
    tagline TEXT,
    description TEXT,
    history TEXT,
    vision TEXT,
    mission TEXT,
    address TEXT,
    kecamatan VARCHAR(255),
    kabupaten VARCHAR(255) DEFAULT 'Magetan',
    provinsi VARCHAR(255) DEFAULT 'Jawa Timur',
    kode_pos VARCHAR(10),
    phone VARCHAR(20),
    email VARCHAR(255),
    website VARCHAR(255),
    latitude DECIMAL(10, 8),
    longitude DECIMAL(11, 8),
    logo_url TEXT,
    cover_image_url TEXT,
    total_penduduk INTEGER,
    total_kk INTEGER,
    luas_wilayah DECIMAL(10, 2), -- dalam hektar
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- Tabel: village_officials (Perangkat Desa)
-- ============================================
CREATE TABLE village_officials (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    position VARCHAR(255) NOT NULL, -- Kepala Desa, Sekretaris Desa, dll
    photo_url TEXT,
    phone VARCHAR(20),
    email VARCHAR(255),
    period_start YEAR,
    period_end YEAR,
    sort_order INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- Tabel: umkm_stores (Toko UMKM)
-- ============================================
CREATE TABLE umkm_stores (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    owner_name VARCHAR(255) NOT NULL,
    description TEXT,
    category VARCHAR(100), -- Kuliner, Kerajinan, Pertanian, Jasa, dll
    address TEXT,
    rt VARCHAR(5),
    rw VARCHAR(5),
    phone VARCHAR(20),
    whatsapp VARCHAR(20),
    email VARCHAR(255),
    instagram VARCHAR(255),
    facebook VARCHAR(255),
    logo_url TEXT,
    cover_image_url TEXT,
    operating_hours TEXT, -- Contoh: "Senin-Jumat 08:00-17:00"
    latitude DECIMAL(10, 8),
    longitude DECIMAL(11, 8),
    is_active BOOLEAN DEFAULT TRUE,
    is_featured BOOLEAN DEFAULT FALSE, -- UMKM unggulan
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- Tabel: products (Produk UMKM)
-- ============================================
CREATE TABLE products (
    id BIGSERIAL PRIMARY KEY,
    store_id BIGINT NOT NULL REFERENCES umkm_stores(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(255) NOT NULL,
    description TEXT,
    price DECIMAL(15, 2),
    price_min DECIMAL(15, 2), -- untuk produk dengan harga range
    price_max DECIMAL(15, 2),
    unit VARCHAR(50), -- pcs, kg, pack, dll
    image_url TEXT,
    category VARCHAR(100),
    stock_status VARCHAR(50) DEFAULT 'available' CHECK (stock_status IN ('available', 'out_of_stock', 'pre_order')),
    is_featured BOOLEAN DEFAULT FALSE,
    is_active BOOLEAN DEFAULT TRUE,
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(store_id, slug)
);

-- ============================================
-- Tabel: news (Berita & Pengumuman Desa)
-- ============================================
CREATE TABLE news (
    id BIGSERIAL PRIMARY KEY,
    title VARCHAR(500) NOT NULL,
    slug VARCHAR(500) UNIQUE NOT NULL,
    excerpt TEXT,
    content TEXT NOT NULL,
    cover_image_url TEXT,
    category VARCHAR(100) DEFAULT 'berita' CHECK (category IN ('berita', 'pengumuman', 'kegiatan', 'informasi')),
    author_id BIGINT REFERENCES users(id) ON DELETE SET NULL,
    author_name VARCHAR(255), -- fallback jika author dihapus
    is_published BOOLEAN DEFAULT FALSE,
    is_featured BOOLEAN DEFAULT FALSE,
    published_at TIMESTAMP WITH TIME ZONE,
    views INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- Indexes untuk performa
-- ============================================
CREATE INDEX idx_umkm_stores_category ON umkm_stores(category);
CREATE INDEX idx_umkm_stores_is_active ON umkm_stores(is_active);
CREATE INDEX idx_umkm_stores_slug ON umkm_stores(slug);
CREATE INDEX idx_products_store_id ON products(store_id);
CREATE INDEX idx_products_is_active ON products(is_active);
CREATE INDEX idx_news_category ON news(category);
CREATE INDEX idx_news_is_published ON news(is_published);
CREATE INDEX idx_news_published_at ON news(published_at DESC);

-- ============================================
-- Row Level Security (RLS) - Supabase
-- ============================================

-- Enable RLS
ALTER TABLE village_info ENABLE ROW LEVEL SECURITY;
ALTER TABLE village_officials ENABLE ROW LEVEL SECURITY;
ALTER TABLE umkm_stores ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE news ENABLE ROW LEVEL SECURITY;
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- Policy: Publik bisa READ data aktif
CREATE POLICY "Public read village_info" ON village_info FOR SELECT USING (true);
CREATE POLICY "Public read active officials" ON village_officials FOR SELECT USING (is_active = true);
CREATE POLICY "Public read active stores" ON umkm_stores FOR SELECT USING (is_active = true);
CREATE POLICY "Public read active products" ON products FOR SELECT USING (is_active = true);
CREATE POLICY "Public read published news" ON news FOR SELECT USING (is_published = true);

-- ============================================
-- Data awal (seed)
-- ============================================
INSERT INTO village_info (name, tagline, description, kabupaten, provinsi) VALUES (
    'Desa Selorejo',
    'Desa Inovatif, Masyarakat Sejahtera',
    'Desa Selorejo adalah desa yang terletak di Kabupaten Magetan, Jawa Timur. Kami berkomitmen untuk meningkatkan kesejahteraan masyarakat melalui pemberdayaan UMKM dan digitalisasi desa.',
    'Magetan',
    'Jawa Timur'
);
