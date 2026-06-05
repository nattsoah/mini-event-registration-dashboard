<?php

namespace Database\Seeders;

use App\Enums\RegistrationStatus;
use App\Models\Registration;
use Illuminate\Database\Seeder;

class RegistrationSeeder extends Seeder
{
    public function run(): void
    {
        $statuses = [
            RegistrationStatus::Pending,
            RegistrationStatus::Confirmed,
            RegistrationStatus::Cancelled,
        ];

        $eventNames = [
            'Tech Conference 2024',
            'Music Festival',
            'Startup Workshop',
            'Design Summit',
            'AI & Robotics Expo',
            'Laravel Meetup Thailand',
            'Marketing Masterclass',
            'Cloud Computing Seminar',
        ];

        for ($i = 0; $i < 12; $i++) {
            Registration::create([
                'name' => fake()->name(),
                'email' => fake()->unique()->safeEmail(),
                'phone' => fake()->numerify('08########'), // Realistic Thai-style phone format
                'event_name' => fake()->randomElement($eventNames),
                'status' => fake()->randomElement($statuses),
                'notes' => fake()->boolean(70) ? fake()->sentence() : null, // 70% chance of having a note
                'registered_at' => fake()->dateTimeBetween('-15 days', 'now'),
            ]);
        }
    }
}
