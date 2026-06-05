<?php

use App\Http\Controllers\Api\RegistrationController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
*/

// Public routes (if any)
Route::post('/registrations', [RegistrationController::class, 'store']); // Anyone can register

// Protected routes (Bonus: Route Protection)
Route::middleware(['auth:sanctum'])->group(function () {
    Route::get('/user', function (Request $request) {
        return $request->user();
    });

    Route::get('/registrations', [RegistrationController::class, 'index']);
    Route::get('/registrations/export', [RegistrationController::class, 'exportCsv']);
    Route::get('/registrations/{registration}', [RegistrationController::class, 'show']);
    Route::patch('/registrations/{registration}/status', [RegistrationController::class, 'updateStatus']);
});

require __DIR__.'/auth.php';
