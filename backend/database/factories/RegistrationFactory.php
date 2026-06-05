<?php

namespace Database\Factories;

use App\Enums\RegistrationStatus;
use App\Models\Registration;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Registration>
 */
class RegistrationFactory extends Factory
{
    protected $model = Registration::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => fake()->name(),
            'email' => fake()->unique()->safeEmail(),
            'phone' => fake()->phoneNumber(),
            'event_name' => fake()->sentence(3),
            'status' => fake()->randomElement(RegistrationStatus::cases()),
            'notes' => fake()->sentence(),
            'registered_at' => now(),
        ];
    }
}
