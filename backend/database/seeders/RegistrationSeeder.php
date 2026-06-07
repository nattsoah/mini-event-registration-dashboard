<?php

namespace Database\Seeders;

use App\Models\Registration;
use App\Models\RegistrationLog;
use Illuminate\Database\Seeder;

class RegistrationSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // 1. Clear existing data to ensure exactly 12
        RegistrationLog::truncate();
        Registration::truncate();

        // 2. Define the 12 permanent mockup records
        $mockups = [
            ['name' => 'Somchai Jaidee', 'email' => 'somchai.j@gmail.com', 'event' => 'Bangkok Tech Summit 2024', 'status' => 'pending'],
            ['name' => 'Natthrika Smith', 'email' => 'natthrika.s@outlook.com', 'event' => 'Digital Marketing Expo', 'status' => 'confirmed'],
            ['name' => 'James Wilson', 'email' => 'j.wilson@company.com', 'event' => 'Cloud Native Workshop', 'status' => 'cancelled'],
            ['name' => 'Somsri Rakthai', 'email' => 'somsri.r@hotmail.com', 'event' => 'Bangkok Tech Summit 2024', 'status' => 'pending'],
            ['name' => 'Sarah Connor', 'email' => 's.connor@cyberdyne.com', 'event' => 'AI & Future Robotics', 'status' => 'confirmed'],
            ['name' => 'Ananda Everingham', 'email' => 'ananda.e@studio.th', 'event' => 'Modern Photography Masterclass', 'status' => 'cancelled'],
            ['name' => 'Michael Chen', 'email' => 'm.chen@globaltech.sg', 'event' => 'Cloud Native Workshop', 'status' => 'confirmed'],
            ['name' => 'Wipawee Mongkol', 'email' => 'wipawee.m@university.ac.th', 'event' => 'Sustainable Living Forum', 'status' => 'pending'],
            ['name' => 'David Beckham', 'email' => 'david.b7@intermiami.com', 'event' => 'Sport Science & Performance', 'status' => 'confirmed'],
            ['name' => 'Emma Watson', 'email' => 'e.watson@unwomen.org', 'event' => 'Women in Leadership 2024', 'status' => 'pending'],
            ['name' => 'Lisa Manoban', 'email' => 'lisa.m@yg.kr', 'event' => 'Modern Photography Masterclass', 'status' => 'confirmed'],
            ['name' => 'Elon Musk', 'email' => 'elon@spacex.com', 'event' => 'AI & Future Robotics', 'status' => 'cancelled'],
        ];

        foreach ($mockups as $index => $data) {
            $reg = Registration::create([
                'name' => $data['name'],
                'email' => $data['email'],
                'phone' => '08' . rand(10000000, 99999999),
                'event_name' => $data['event'],
                'status' => $data['status'],
                'registered_at' => now()->subDays(10 + $index),
                'created_at' => now()->subDays(10 + $index),
            ]);
            
            // Initial Milestone: Every registration starts with this
            $reg->logs()->create([
                'status' => 'pending',
                'message' => 'Registration received via online form.',
                'created_at' => $reg->registered_at
            ]);

            // Journey Step: If not pending, record the transition
            if ($data['status'] !== 'pending') {
                $reg->logs()->create([
                    'status' => $data['status'],
                    'message' => 'Status updated by administrator during review.',
                    'created_at' => now()->subDays(rand(1, 5))
                ]);
            }
        }
    }
}
