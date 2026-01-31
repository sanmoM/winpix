<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use App\Models\User;

class UserSeeder extends Seeder
{
    public function run(): void
    {
        User::updateOrCreate(
            ['email' => 'admin@gmail.com'],
            [
                'name' => 'Admin User',
                'username' => 'admin',
                'number' => '+94712345678',
                'image' => null,
                'personal_website' => null,
                'instagram' => null,
                'facebook' => null,
                'x' => null,
                'country_id' => 1,
                'city' => null,
                'full_address' => null,
                'email_verified_at' => now(),
                'role' => 'admin',
                'password' => Hash::make('password'),
                'status' => 'active',
                'level' => 1,
                'votes_cast' => 0,
                'coin' => 0,
                'pixel' => 0,
                'cash' => 0,
                'isRedeemed' => false,
            ]
        );

        // Optional: create a normal user
        User::updateOrCreate(
            ['email' => 'user@gmail.com'],
            [
                'name' => 'Normal User',
                'username' => 'user1',
                'number' => '+94712345679',
                'country_id' => 1,
                'email_verified_at' => now(),
                'role' => 'user',
                'password' => Hash::make('password'),
                'status' => 'active',
            ]
        );
    }
}
