<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\VillageInfo;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class VillageController extends Controller
{
    public function index(): JsonResponse
    {
        $village = VillageInfo::first();
        return response()->json(['data' => $village]);
    }

    public function officials(): JsonResponse
    {
        $officials = \DB::table('village_officials')
            ->where('is_active', true)
            ->orderBy('sort_order')
            ->get();
        return response()->json(['data' => $officials]);
    }

    public function update(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'name'            => 'sometimes|string|max:255',
            'tagline'         => 'nullable|string',
            'description'     => 'nullable|string',
            'history'         => 'nullable|string',
            'vision'          => 'nullable|string',
            'mission'         => 'nullable|string',
            'address'         => 'nullable|string',
            'phone'           => 'nullable|string|max:20',
            'email'           => 'nullable|email',
            'logo_url'        => 'nullable|url',
            'cover_image_url' => 'nullable|url',
            'total_penduduk'  => 'nullable|integer',
            'total_kk'        => 'nullable|integer',
        ]);

        $village = VillageInfo::firstOrCreate([], ['name' => 'Desa Selorejo']);
        $village->update($validated);

        return response()->json(['data' => $village, 'message' => 'Profil desa berhasil diperbarui']);
    }
}
