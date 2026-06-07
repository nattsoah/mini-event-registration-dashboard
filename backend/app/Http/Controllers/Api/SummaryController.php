<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Registration;
use App\Http\Resources\RegistrationResource;
use Illuminate\Http\JsonResponse;

class SummaryController extends Controller
{
    public function index(): JsonResponse
    {
        $stats = [
            'total' => Registration::count(),
            'pending' => Registration::where('status', 'pending')->count(),
            'confirmed' => Registration::where('status', 'confirmed')->count(),
            'cancelled' => Registration::where('status', 'cancelled')->count(),
        ];

        $recentRegistrations = Registration::with('logs')
            ->latest()
            ->take(5)
            ->get();

        return response()->json([
            'stats' => $stats,
            'recent_registrations' => RegistrationResource::collection($recentRegistrations),
        ]);
    }
}
