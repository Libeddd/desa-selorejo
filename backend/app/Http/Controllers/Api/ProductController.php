<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class ProductController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $query = Product::active()->with('store:id,name,slug');

        if ($request->has('category')) {
            $query->where('category', $request->category);
        }
        if ($request->has('search')) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                  ->orWhere('description', 'like', "%{$search}%");
            });
        }
        if ($request->has('store_id')) {
            $query->where('store_id', $request->store_id);
        }

        $products = $query->orderBy('sort_order')->paginate($request->get('per_page', 15));
        return response()->json($products);
    }

    public function featured(): JsonResponse
    {
        $products = Product::active()
            ->where('is_featured', true)
            ->with('store:id,name,slug')
            ->orderBy('sort_order')
            ->limit(8)
            ->get();
        return response()->json(['data' => $products]);
    }

    public function show(int $id): JsonResponse
    {
        $product = Product::active()->with('store')->findOrFail($id);
        return response()->json(['data' => $product]);
    }

    // Admin CRUD
    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'store_id'     => 'required|exists:umkm_stores,id',
            'name'         => 'required|string|max:255',
            'description'  => 'nullable|string',
            'price'        => 'nullable|numeric',
            'price_min'    => 'nullable|numeric',
            'price_max'    => 'nullable|numeric',
            'unit'         => 'nullable|string|max:50',
            'image_url'    => 'nullable|url',
            'category'     => 'nullable|string|max:100',
            'stock_status' => 'in:available,out_of_stock,pre_order',
            'is_featured'  => 'boolean',
            'sort_order'   => 'integer',
        ]);

        $product = Product::create($validated);
        return response()->json(['data' => $product, 'message' => 'Produk berhasil ditambahkan'], 201);
    }

    public function update(Request $request, Product $product): JsonResponse
    {
        $validated = $request->validate([
            'name'         => 'sometimes|string|max:255',
            'description'  => 'nullable|string',
            'price'        => 'nullable|numeric',
            'price_min'    => 'nullable|numeric',
            'price_max'    => 'nullable|numeric',
            'unit'         => 'nullable|string|max:50',
            'image_url'    => 'nullable|url',
            'category'     => 'nullable|string|max:100',
            'stock_status' => 'in:available,out_of_stock,pre_order',
            'is_featured'  => 'boolean',
            'is_active'    => 'boolean',
            'sort_order'   => 'integer',
        ]);

        $product->update($validated);
        return response()->json(['data' => $product, 'message' => 'Produk berhasil diperbarui']);
    }

    public function destroy(Product $product): JsonResponse
    {
        $product->update(['is_active' => false]);
        return response()->json(['message' => 'Produk berhasil dinonaktifkan']);
    }
}
