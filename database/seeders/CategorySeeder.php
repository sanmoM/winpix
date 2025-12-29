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

        $categories = [
            [
                'name' => 'Brand & Marketing',
                'status' => 'Active',
                'description' => 'Brand & Marketing',
            ],

            [
                'name' => 'Community',
                'status' => 'Active',
                'description' => 'Community',
            ],
        ];

        foreach ($categories as $category) {
            QuestCategory::create($category);
        }

    }
}
