<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\News;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class NewsController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $query = News::published()->latest('published_at');

        if ($request->has('category')) {
            $query->where('category', $request->category);
        }

        if ($request->has('search')) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('title', 'like', "%{$search}%")
                  ->orWhere('excerpt', 'like', "%{$search}%");
            });
        }

        $news = $query->paginate($request->get('per_page', 10));

        return response()->json($news);
    }

    public function featured(): JsonResponse
    {
        $news = News::published()->featured()->latest('published_at')->limit(3)->get();
        return response()->json(['data' => $news]);
    }

    public function show(string $slug): JsonResponse
    {
        $news = News::published()->where('slug', $slug)->firstOrFail();
        return response()->json(['data' => $news]);
    }

    public function incrementView(int $id): JsonResponse
    {
        $news = News::findOrFail($id);
        $news->increment('views');
        return response()->json(['views' => $news->views]);
    }

    // Admin CRUD
    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'title'           => 'required|string|max:500',
            'content'         => 'required|string',
            'excerpt'         => 'nullable|string',
            'cover_image_url' => 'nullable|url',
            'category'        => 'required|in:berita,pengumuman,kegiatan,informasi',
            'is_published'    => 'boolean',
            'is_featured'     => 'boolean',
        ]);

        $validated['author_id']   = auth()->id();
        $validated['author_name'] = auth()->user()->name;

        $news = News::create($validated);
        return response()->json(['data' => $news, 'message' => 'Berita berhasil ditambahkan'], 201);
    }

    public function update(Request $request, News $news): JsonResponse
    {
        $validated = $request->validate([
            'title'           => 'sometimes|string|max:500',
            'content'         => 'sometimes|string',
            'excerpt'         => 'nullable|string',
            'cover_image_url' => 'nullable|url',
            'category'        => 'sometimes|in:berita,pengumuman,kegiatan,informasi',
            'is_published'    => 'boolean',
            'is_featured'     => 'boolean',
        ]);

        $news->update($validated);
        return response()->json(['data' => $news, 'message' => 'Berita berhasil diperbarui']);
    }

    public function destroy(News $news): JsonResponse
    {
        $news->delete();
        return response()->json(['message' => 'Berita berhasil dihapus']);
    }
}
