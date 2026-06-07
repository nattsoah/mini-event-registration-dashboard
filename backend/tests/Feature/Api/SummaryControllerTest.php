<?php

use App\Models\Registration;
use App\Models\User;
use App\Enums\RegistrationStatus;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);

beforeEach(function () {
    $this->user = User::factory()->create();
});

test('authenticated users can access dashboard summary', function () {
    Registration::factory()->create(['status' => RegistrationStatus::Pending]);
    Registration::factory()->create(['status' => RegistrationStatus::Confirmed]);
    Registration::factory()->create(['status' => RegistrationStatus::Cancelled]);

    $response = $this->actingAs($this->user)
        ->getJson('/api/summary');

    $response->assertStatus(200)
        ->assertJsonStructure([
            'stats' => ['total', 'pending', 'confirmed', 'cancelled'],
            'recent_registrations'
        ])
        ->assertJsonPath('stats.total', 3)
        ->assertJsonPath('stats.pending', 1)
        ->assertJsonPath('stats.confirmed', 1)
        ->assertJsonPath('stats.cancelled', 1);
});

test('unauthenticated users cannot access dashboard summary', function () {
    $response = $this->getJson('/api/summary');
    $response->assertStatus(401);
});
