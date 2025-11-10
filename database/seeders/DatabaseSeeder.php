<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\QuestCategory;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // ✅ Create or find the first test user
        User::firstOrCreate(
            ['email' => 'test@example.com'],
            [
                'name' => 'Test User',
                'password' => bcrypt('password'), // Always hash passwords
                'email_verified_at' => now(),
            ]
        );

        // ✅ Create or find the second user (Sanmo)
        User::firstOrCreate(
            ['email' => 'sanmobd@gmail.com'],
            [
                'name' => 'Sanmo',
                'password' => bcrypt('TestUser1'), // Securely hashed
                'email_verified_at' => now(),
            ]
        );

        // ✅ Create or find the "animal" quest category
        QuestCategory::firstOrCreate(
            ['name' => 'animal'],
            [
                'status' => 'Active',
                'description' => 'Only animal photo can upload...',
            ]
        );
    }
}
