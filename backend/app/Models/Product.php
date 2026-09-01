<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Str;

class Product extends Model
{
    protected $fillable = [
        'store_id',
        'name',
        'slug',
        'description',
        'price',
        'price_min',
        'price_max',
        'unit',
        'image_url',
        'category',
        'stock_status',
        'is_featured',
        'is_active',
        'sort_order',
    ];

    protected $casts = [
        'price'       => 'float',
        'price_min'   => 'float',
        'price_max'   => 'float',
        'is_featured' => 'boolean',
        'is_active'   => 'boolean',
        'sort_order'  => 'integer',
    ];

    protected static function boot()
    {
        parent::boot();
        static::creating(function ($product) {
            if (empty($product->slug)) {
                $product->slug = Str::slug($product->name);
            }
        });
    }

    public function store(): BelongsTo
    {
        return $this->belongsTo(UmkmStore::class, 'store_id');
    }

    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }

    /**
     * Accessor: format harga dalam Rupiah
     */
    public function getFormattedPriceAttribute(): string
    {
        if ($this->price_min && $this->price_max) {
            return 'Rp ' . number_format($this->price_min, 0, ',', '.') .
                   ' - Rp ' . number_format($this->price_max, 0, ',', '.');
        }
        if ($this->price) {
            return 'Rp ' . number_format($this->price, 0, ',', '.');
        }
        return 'Hubungi Penjual';
    }
}
