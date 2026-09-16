/**
 * Script migrasi: Tambah kolom NIP ke tabel village_officials
 * Jalankan sekali: node run-migration.js
 */

const https = require('https');

// Kita pakai Supabase Management API untuk run SQL
// Caranya: POST ke /rest/v1/rpc/... atau pakai pg driver
// Karena anon key tidak bisa ALTER TABLE, kita gunakan pg langsung via pooler

const { Pool } = require('pg');

const pool = new Pool({
  connectionString: 'postgresql://postgres.mowstavktiyknazjpilx:sabusabu1294%40%21@aws-0-ap-southeast-1.pooler.supabase.com:6543/postgres',
  ssl: { rejectUnauthorized: false }
});

async function runMigration() {
  const client = await pool.connect();
  try {
    console.log('Terhubung ke database...');

    // Tambah kolom nip jika belum ada
    await client.query(`
      ALTER TABLE village_officials 
      ADD COLUMN IF NOT EXISTS nip TEXT;
    `);
    console.log('✓ Kolom NIP berhasil ditambahkan ke tabel village_officials');

    // Verifikasi
    const result = await client.query(`
      SELECT column_name, data_type 
      FROM information_schema.columns 
      WHERE table_name = 'village_officials' 
      ORDER BY ordinal_position;
    `);
    console.log('\nStruktur tabel village_officials:');
    result.rows.forEach(row => {
      console.log(`  - ${row.column_name} (${row.data_type})`);
    });

  } catch (err) {
    console.error('Error:', err.message);
  } finally {
    client.release();
    await pool.end();
  }
}

runMigration();
