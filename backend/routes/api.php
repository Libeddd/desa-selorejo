<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\VillageController;
use App\Http\Controllers\Api\UmkmController;
use App\Http\Controllers\Api\ProductController;
use App\Http\Controllers\Api\NewsController;
use App\Http\Controllers\Api\AuthController;

/*
|--------------------------------------------------------------------------
| API Routes - Desa Selorejo
|--------------------------------------------------------------------------
*/

// ===========================
// Public Routes (No Auth)
// ===========================

// Village Info
Route::prefix('village')->group(function () {
    Route::get('/', [VillageController::class, 'index']);
    Route::get('/officials', [VillageController::class, 'officials']);
});

// UMKM
Route::prefix('umkm')->group(function () {
    Route::get('/', [UmkmController::class, 'index']);
    Route::get('/featured', [UmkmController::class, 'featured']);
    Route::get('/categories', [UmkmController::class, 'categories']);
    Route::get('/{slug}', [UmkmController::class, 'show']);
    Route::get('/{id}/products', [UmkmController::class, 'products']);
});

// Products
Route::prefix('products')->group(function () {
    Route::get('/', [ProductController::class, 'index']);
    Route::get('/featured', [ProductController::class, 'featured']);
    Route::get('/{id}', [ProductController::class, 'show']);
});

// News
Route::prefix('news')->group(function () {
    Route::get('/', [NewsController::class, 'index']);
    Route::get('/featured', [NewsController::class, 'featured']);
    Route::get('/{slug}', [NewsController::class, 'show']);
    Route::post('/{id}/view', [NewsController::class, 'incrementView']);
});

// ===========================
// Auth Routes
// ===========================
Route::prefix('auth')->group(function () {
    Route::post('/login', [AuthController::class, 'login']);
    Route::post('/logout', [AuthController::class, 'logout'])->middleware('auth:sanctum');
    Route::get('/me', [AuthController::class, 'me'])->middleware('auth:sanctum');
});

// ===========================
// Protected Routes (Auth Required)
// ===========================
Route::middleware('auth:sanctum')->prefix('admin')->group(function () {

    // Village Management
    Route::put('/village', [VillageController::class, 'update']);
    Route::apiResource('/officials', VillageController::class . 'OfficialController');

    // UMKM Management
    Route::apiResource('/umkm', UmkmController::class)->except(['index', 'show']);

    // Product Management
    Route::apiResource('/products', ProductController::class)->except(['index', 'show']);

    // News Management
    Route::apiResource('/news', NewsController::class)->except(['index', 'show']);
});
