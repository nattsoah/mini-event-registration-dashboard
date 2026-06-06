<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return ['Laravel' => app()->version()];
});

// Gracefully handle GET /login (e.g. if a user manually types it or Laravel redirects to it)
// Redirect them back to the frontend
Route::get('/login', function () {
    return redirect(config('app.frontend_url'));
})->name('login.redirect');

require __DIR__.'/auth.php';
