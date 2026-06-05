<?php

use App\Models\Registration;
use App\Models\User;
use App\Enums\RegistrationStatus;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);

beforeEach(function () {
    $this->user = User::factory()->create();
});

test('unauthenticated users cannot access registration list', function () {
    $response = $this->getJson('/api/registrations');
    $response->assertStatus(401);
});

test('authenticated users can fetch registrations with pagination', function () {
    Registration::factory()->count(15)->create();

    $response = $this->actingAs($this->user)
        ->getJson('/api/registrations?per_page=10');

    $response->assertStatus(200)
        ->assertJsonCount(10, 'data')
        ->assertJsonStructure([
            'data',
            'links',
            'meta'
        ]);
});

test('anyone can submit a registration', function () {
    $data = [
        'name' => 'John Doe',
        'email' => 'john@example.com',
        'phone' => '0812345678',
        'event_name' => 'Tech Summit 2024',
        'notes' => 'I am excited!'
    ];

    $response = $this->postJson('/api/registrations', $data);

    $response->assertStatus(201)
        ->assertJsonPath('data.name', 'John Doe')
        ->assertJsonPath('data.status', 'pending');

    $this->assertDatabaseHas('registrations', [
        'email' => 'john@example.com',
        'event_name' => 'Tech Summit 2024'
    ]);
});

test('registration requires valid email', function () {
    $data = [
        'name' => 'John Doe',
        'email' => 'not-an-email',
        'event_name' => 'Tech Summit 2024'
    ];

    $response = $this->postJson('/api/registrations', $data);

    $response->assertStatus(422)
        ->assertJsonValidationErrors(['email']);
});

test('authenticated users can update registration status', function () {
    $registration = Registration::factory()->create([
        'status' => RegistrationStatus::Pending
    ]);

    $response = $this->actingAs($this->user)
        ->patchJson("/api/registrations/{$registration->id}/status", [
            'status' => 'confirmed'
        ]);

    $response->assertStatus(200)
        ->assertJsonPath('data.status', 'confirmed');

    $this->assertDatabaseHas('registrations', [
        'id' => $registration->id,
        'status' => 'confirmed'
    ]);
});

test('authenticated users can search registrations', function () {
    Registration::factory()->create(['name' => 'Alice']);
    Registration::factory()->create(['name' => 'Bob']);

    $response = $this->actingAs($this->user)
        ->getJson('/api/registrations?search=Alice');

    $response->assertStatus(200)
        ->assertJsonCount(1, 'data')
        ->assertJsonPath('data.0.name', 'Alice');
});
