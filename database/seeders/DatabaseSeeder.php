<?php

namespace Database\Seeders;

use App\Models\Quest;
use App\Models\Series;
use App\Models\Slider;
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
        // -----------------------------
        // 1️⃣ Create Users
        // -----------------------------
        User::firstOrCreate(
            ['email' => 'test@example.com'],
            [
                'name' => 'Test User',
                'password' => bcrypt('password'), // Always hash passwords
                'email_verified_at' => now(),
            ]
        );

        User::firstOrCreate(
            ['email' => 'sanmobd@gmail.com'],
            [
                'name' => 'Sanmo',
                'password' => bcrypt('TestUser1'), // Securely hashed
                'email_verified_at' => now(),
            ]
        );

        // -----------------------------
        // 2️⃣ Create Quest Category
        // -----------------------------
        QuestCategory::firstOrCreate(
            ['name' => 'animal'],
            [
                'status' => 'Active',
                'description' => 'Only animal photo can upload...',
            ]
        );

        // -----------------------------
        // 3️⃣ Create Sliders
        // -----------------------------
        $sliders = require __DIR__ . '/../data/slider.php';

        foreach ($sliders as $slider) {
            Slider::create(
                [
                    'title' => $slider['title'],
                    'content' => $slider['description'],
                    'bg_image' => $slider['image'],
                ]
            );
        }

        Series::create([
            'image' => 'uploads/slider/Ft1NxqiJVmD9v9hy2y2efiBQhjJYNkvnAvdDinP4.jpg',
            'title' => 'Animal Photography',
            'description' => 'Only animal photo can upload...',
            'user_id' => 2
        ]);

        Quest::create([
            'image' => 'uploads/slider/Ft1NxqiJVmD9v9hy2y2efiBQhjJYNkvnAvdDinP4.jpg',
            'title' => 'Animal Photography',
            'description' => 'Only animal photo can upload...',
            'user_id' => 2
        ]);
    }
}
