<?php

namespace Database\Seeders;

use App\Models\PrizePool;
use Illuminate\Database\Seeder;

class PrizeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $prizes = [
            [
                'name' => 'Pixel',
                'image' => 'uploads/slider/pixel.jpg',
            ],
            [
                'name' => 'Coin',
                'image' => 'uploads/slider/coin.jpg',
            ],
            [
                'name' => 'Cash',
                'image' => 'uploads/slider/cash.jpg',
            ],
        ];

        foreach ($prizes as $prize) {
            PrizePool::create([
                'name' => $prize['name'],
                'image' => $prize['image'],
                'is_editable' => 1,
            ]);
        }
    }
}
