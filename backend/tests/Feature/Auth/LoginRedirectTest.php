<?php

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);

test('authenticated users are redirected away from login', function () {
    $user = User::factory()->create();

    $response = $this->actingAs($user)->get('/login');

    // It should redirect to the frontend dashboard as configured in bootstrap/app.php
    // or at least not throw a 405 error.
    // Given my change in web.php, it will redirect to config('app.frontend_url')
    $response->assertStatus(302);
});

test('unauthenticated users hitting GET login are redirected to frontend', function () {
    $response = $this->get('/login');

    $response->assertStatus(302);
    $response->assertRedirect(config('app.frontend_url'));
});
