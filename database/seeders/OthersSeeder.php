<?php

namespace Database\Seeders;

use App\Models\Other;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class OthersSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Other::create([
            'light_logo' => 'static-images/logo-light.png',
            'dark_logo' => 'static-images/logo-dark.png',
            'fav_icon' => '',
            'app_name' => 'Winpix',
            'app_description' => '',
            'terms_of_service' => '',
            'privacy_policy' => '',
            'copyright' => '© 2026 Winpix.co All Right reserved.',
            'facebook' => '#',
            'twitter' => '#',
            'instagram' => '#',
        ]);
    }
}
