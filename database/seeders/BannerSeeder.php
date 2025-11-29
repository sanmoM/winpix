<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class BannerSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        \App\Models\MarketingBanner::create([
            'bg_image' => 'banner-bg.jpg', // Make sure this file exists in storage/app/public/

            'title_en' => 'Launch Your Brand Contest with Winpix',
            'subtitle_en' => 'Turn your marketing campaign into an interactive photo contest.',

            'title_ar' => 'أطلق مسابقة علامتك التجارية مع Winpix',
            'subtitle_ar' => 'حول حملتك التسويقية إلى مسابقة صور تفاعلية.',

        ]);
    }
}
