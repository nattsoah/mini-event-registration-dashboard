<?php

use App\Http\Controllers\Api\RegistrationController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
*/

// Auth Check (Silent - No 401 in console)
Route::get('/auth-check', function (Request $request) {
    if (auth('sanctum')->check()) {
        return response()->json([
            'authenticated' => true,
            'user' => auth('sanctum')->user()
        ]);
    }
    return response()->json(['authenticated' => false]);
});

// Public routes
Route::post('/registrations', [RegistrationController::class, 'store']);

// Protected routes
Route::middleware(['auth:sanctum'])->group(function () {
    Route::get('/user', function (Request $request) {
        return $request->user();
    });

    Route::get('/registrations', [RegistrationController::class, 'index']);
    Route::get('/registrations/export', [RegistrationController::class, 'exportCsv']);
    Route::get('/registrations/{registration}', [RegistrationController::class, 'show']);
    Route::patch('/registrations/{registration}/status', [RegistrationController::class, 'updateStatus']);
    Route::get('/summary', [\App\Http\Controllers\Api\SummaryController::class, 'index']);
});
