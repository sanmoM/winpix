<?php

namespace Database\Seeders;

use App\Models\QuestCategory;
use Illuminate\Database\Seeder;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        QuestCategory::create([
            'name' => 'Community',
            'status' => 'Active',
        ]);
    }
}
