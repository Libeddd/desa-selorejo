<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('village_info', function (Blueprint $table) {
            $table->id();
            $table->string('name')->default('Desa Selorejo');
            $table->text('tagline')->nullable();
            $table->text('description')->nullable();
            $table->longText('history')->nullable();
            $table->text('vision')->nullable();
            $table->text('mission')->nullable();
            $table->text('address')->nullable();
            $table->string('kecamatan')->nullable();
            $table->string('kabupaten')->default('Magetan');
            $table->string('provinsi')->default('Jawa Timur');
            $table->string('kode_pos', 10)->nullable();
            $table->string('phone', 20)->nullable();
            $table->string('email')->nullable();
            $table->string('website')->nullable();
            $table->decimal('latitude', 10, 8)->nullable();
            $table->decimal('longitude', 11, 8)->nullable();
            $table->text('logo_url')->nullable();
            $table->text('cover_image_url')->nullable();
            $table->integer('total_penduduk')->nullable();
            $table->integer('total_kk')->nullable();
            $table->decimal('luas_wilayah', 10, 2)->nullable();
            $table->timestamps();
        });

        // Insert data awal
        \DB::table('village_info')->insert([
            'name'        => 'Desa Selorejo',
            'tagline'     => 'Desa Inovatif, Masyarakat Sejahtera',
            'description' => 'Desa Selorejo adalah desa yang terletak di Kabupaten Magetan, Jawa Timur.',
            'kabupaten'   => 'Magetan',
            'provinsi'    => 'Jawa Timur',
            'created_at'  => now(),
            'updated_at'  => now(),
        ]);
    }

    public function down(): void
    {
        Schema::dropIfExists('village_info');
    }
};
