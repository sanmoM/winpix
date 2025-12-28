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
                'image' => '/static-images/coin.png',
            ],
            [
                'name' => 'Coin',
                'image' => '/static-images/golden-coin.png',
            ],
            [
                'name' => 'Cash',
                'image' => '/static-images/cash.png',
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
