<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class VillageInfo extends Model
{
    protected $table = 'village_info';

    protected $fillable = [
        'name',
        'tagline',
        'description',
        'history',
        'vision',
        'mission',
        'address',
        'kecamatan',
        'kabupaten',
        'provinsi',
        'kode_pos',
        'phone',
        'email',
        'website',
        'latitude',
        'longitude',
        'logo_url',
        'cover_image_url',
        'total_penduduk',
        'total_kk',
        'luas_wilayah',
    ];

    protected $casts = [
        'latitude'       => 'float',
        'longitude'      => 'float',
        'total_penduduk' => 'integer',
        'total_kk'       => 'integer',
        'luas_wilayah'   => 'float',
    ];
}
