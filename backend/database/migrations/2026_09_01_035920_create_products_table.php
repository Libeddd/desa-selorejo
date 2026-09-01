<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->foreignId('store_id')->constrained('umkm_stores')->cascadeOnDelete();
            $table->string('name');
            $table->string('slug');
            $table->text('description')->nullable();
            $table->decimal('price', 15, 2)->nullable();
            $table->decimal('price_min', 15, 2)->nullable();
            $table->decimal('price_max', 15, 2)->nullable();
            $table->string('unit', 50)->nullable();
            $table->text('image_url')->nullable();
            $table->string('category', 100)->nullable();
            $table->enum('stock_status', ['available', 'out_of_stock', 'pre_order'])->default('available');
            $table->boolean('is_featured')->default(false);
            $table->boolean('is_active')->default(true);
            $table->integer('sort_order')->default(0);
            $table->timestamps();
            
            $table->unique(['store_id', 'slug']);
            $table->index('store_id');
            $table->index('is_active');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('products');
    }
};
