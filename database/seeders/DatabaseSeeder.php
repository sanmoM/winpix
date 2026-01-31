<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call([
            PrizeSeeder::class,
            BannerSeeder::class,
            OthersSeeder::class,
            CategorySeeder::class,
            CountrySeeder::class,
            UserSeeder::class,
        ]);

    }
}
