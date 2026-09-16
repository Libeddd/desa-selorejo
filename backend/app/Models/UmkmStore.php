<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Support\Str;

class UmkmStore extends Model
{
    protected $table = 'umkm_stores';

    protected $fillable = [
        'name',
        'slug',
        'owner_name',
        'description',
        'category',
        'address',
        'rt',
        'rw',
        'phone',
        'whatsapp',
        'email',
        'instagram',
        'facebook',
        'logo_url',
        'cover_image_url',
        'operating_hours',
        'latitude',
        'longitude',
        'is_active',
        'is_featured',
    ];

    protected $casts = [
        'is_active'   => 'boolean',
        'is_featured' => 'boolean',
        'latitude'    => 'float',
        'longitude'   => 'float',
    ];

    // Auto-generate slug from name
    protected static function boot()
    {
        parent::boot();
        static::creating(function ($store) {
            if (empty($store->slug)) {
                $store->slug = Str::slug($store->name);
            }
        });
    }

    /**
     * Relasi: UMKM memiliki banyak Produk
     */
    public function products(): HasMany
    {
        return $this->hasMany(Product::class, 'store_id');
    }

    /**
     * Scope: hanya yang aktif
     */
    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }

    /**
     * Scope: hanya yang featured
     */
    public function scopeFeatured($query)
    {
        return $query->where('is_featured', true);
    }

    /**
     * Accessor: WhatsApp link
     */
    public function getWhatsappLinkAttribute(): ?string
    {
        if (!$this->whatsapp) return null;
        $number = preg_replace('/\D/', '', $this->whatsapp);
        if (str_starts_with($number, '0')) {
            $number = '62' . substr($number, 1);
        }
        return "https://wa.me/{$number}";
    }
}
