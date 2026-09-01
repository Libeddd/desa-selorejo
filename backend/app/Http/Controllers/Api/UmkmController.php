<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\UmkmStore;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class UmkmController extends Controller
{
    /**
     * GET /api/umkm
     * List semua UMKM dengan filter & pagination
     */
    public function index(Request $request): JsonResponse
    {
        $query = UmkmStore::where('is_active', true)
            ->withCount('products');

        // Filter by category
        if ($request->has('category')) {
            $query->where('category', $request->category);
        }

        // Search by name or owner
        if ($request->has('search')) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                  ->orWhere('owner_name', 'like', "%{$search}%")
                  ->orWhere('description', 'like', "%{$search}%");
            });
        }

        // Featured only
        if ($request->boolean('featured')) {
            $query->where('is_featured', true);
        }

        $umkm = $query->orderBy('is_featured', 'desc')
            ->orderBy('name')
            ->paginate($request->get('per_page', 12));

        return response()->json($umkm);
    }

    /**
     * GET /api/umkm/featured
     * UMKM unggulan untuk homepage
     */
    public function featured(): JsonResponse
    {
        $stores = UmkmStore::where('is_active', true)
            ->where('is_featured', true)
            ->withCount('products')
            ->with(['products' => function ($q) {
                $q->where('is_active', true)->limit(3);
            }])
            ->orderBy('name')
            ->limit(6)
            ->get();

        return response()->json(['data' => $stores]);
    }

    /**
     * GET /api/umkm/categories
     * Daftar kategori UMKM yang tersedia
     */
    public function categories(): JsonResponse
    {
        $categories = UmkmStore::where('is_active', true)
            ->whereNotNull('category')
            ->select('category')
            ->distinct()
            ->pluck('category');

        return response()->json(['data' => $categories]);
    }

    /**
     * GET /api/umkm/{slug}
     * Detail UMKM by slug
     */
    public function show(string $slug): JsonResponse
    {
        $store = UmkmStore::where('slug', $slug)
            ->where('is_active', true)
            ->with(['products' => function ($q) {
                $q->where('is_active', true)->orderBy('sort_order');
            }])
            ->firstOrFail();

        return response()->json(['data' => $store]);
    }

    /**
     * GET /api/umkm/{id}/products
     * Produk milik satu UMKM
     */
    public function products(int $id): JsonResponse
    {
        $store = UmkmStore::where('is_active', true)->findOrFail($id);

        $products = $store->products()
            ->where('is_active', true)
            ->orderBy('sort_order')
            ->get();

        return response()->json(['data' => $products]);
    }

    // ============================================
    // Admin CRUD (protected by sanctum middleware)
    // ============================================

    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'name'           => 'required|string|max:255',
            'owner_name'     => 'required|string|max:255',
            'description'    => 'nullable|string',
            'category'       => 'nullable|string|max:100',
            'address'        => 'nullable|string',
            'phone'          => 'nullable|string|max:20',
            'whatsapp'       => 'nullable|string|max:20',
            'instagram'      => 'nullable|string|max:255',
            'logo_url'       => 'nullable|url',
            'cover_image_url'=> 'nullable|url',
            'is_active'      => 'boolean',
            'is_featured'    => 'boolean',
        ]);

        // Generate slug
        $validated['slug'] = \Str::slug($validated['name']);
        // Ensure unique slug
        $count = UmkmStore::where('slug', 'like', $validated['slug'] . '%')->count();
        if ($count > 0) {
            $validated['slug'] .= '-' . ($count + 1);
        }

        $store = UmkmStore::create($validated);

        return response()->json(['data' => $store, 'message' => 'UMKM berhasil ditambahkan'], 201);
    }

    public function update(Request $request, UmkmStore $umkm): JsonResponse
    {
        $validated = $request->validate([
            'name'           => 'sometimes|string|max:255',
            'owner_name'     => 'sometimes|string|max:255',
            'description'    => 'nullable|string',
            'category'       => 'nullable|string|max:100',
            'address'        => 'nullable|string',
            'phone'          => 'nullable|string|max:20',
            'whatsapp'       => 'nullable|string|max:20',
            'instagram'      => 'nullable|string|max:255',
            'logo_url'       => 'nullable|url',
            'cover_image_url'=> 'nullable|url',
            'is_active'      => 'boolean',
            'is_featured'    => 'boolean',
        ]);

        $umkm->update($validated);

        return response()->json(['data' => $umkm, 'message' => 'UMKM berhasil diperbarui']);
    }

    public function destroy(UmkmStore $umkm): JsonResponse
    {
        $umkm->update(['is_active' => false]); // Soft disable, not delete
        return response()->json(['message' => 'UMKM berhasil dinonaktifkan']);
    }
}
