<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\BrandMarketing;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Inertia\Inertia;

class BrandMarketingController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {

        $brand_marketings = BrandMarketing::latest()
            ->paginate(10)
            ->withQueryString();

        return Inertia::render('Admin/BrandMarketing/Index', [
            'brand_marketings' => $brand_marketings,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Admin/BrandMarketing/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'content' => 'required',
            'brand_marketing_type' => 'required',
            'bg_image' => 'nullable|image|max:2048',
        ]);

        $path = null;
        if ($request->hasFile('bg_image')) {
            $path = $request->file('bg_image')->store('uploads/BrandMarketing', 'public');
        }

        try {
            // Translate
            $translations = $this->translateData($validated['title'], $validated['content']);

            // <-- FIXED FALLBACK (must be an array of arrays)
            if (! is_array($translations) || empty($translations)) {
                $translations = [[
                    'lang' => 'en',
                    'title' => $validated['title'],
                    'content' => $validated['content'],
                ]];
            }

            $groupId = Str::uuid()->toString();

            // Create records for each language
            foreach ($translations as $t) {
                BrandMarketing::create([
                    'lang' => $t['lang'],
                    'title' => $t['title'],
                    'content' => $t['content'],
                    'brand_marketing_type' => $validated['brand_marketing_type'],
                    'bg_image' => $path,
                    'group_id' => $groupId,
                ]);
            }

            // UPDATED redirect to index
            return Redirect::route('admin.brand_marketing.index')->with('success', 'BrandMarketing created successfully.');

        } catch (\Exception $e) {
            Log::error('Gemini API Translation Failed: '.$e->getMessage());

            // <-- ADDED cleanup on failure
            if ($path && file_exists(public_path('storage/'.$path))) {
                unlink(public_path('storage/'.$path));
            }

            return back()->with('error', 'Translation failed. Please try again.');
        }
    }

    /**
     * Private method for translation (no changes needed)
     */
    private function translateData(string $title, string $content): ?array
    {
        $apiKey = config('app.gemini_api_key');

        if (! $apiKey) {
            throw new \Exception('Gemini API key is not set');
        }

        $apiUrl = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key={$apiKey}";

        $prompt = <<<PROMPT
        You are a translation assistant.
        Translate the following data into **English (en)**, **Arabic (ar)**.
        Return a valid JSON array of three objects, like this:
        [
            {"lang": "en", "title": "...", "content": "..."},
            {"lang": "ar", "title": "...", "content": "..."},
        ]
        If translation fails, just return the original English text.
        Title: {$title}
        Content: {$content}
        PROMPT;

        $payload = ['contents' => [['role' => 'user', 'parts' => [['text' => $prompt]]]]];
        $response = Http::withoutVerifying()->post($apiUrl, $payload);

        if (! $response->ok()) {
            Log::error('Gemini API Error: '.$response->body());

            return null;
        }

        $result = $response->json();
        $text = $result['candidates'][0]['content']['parts'][0]['text'] ?? null;

        if (! $text) {
            Log::error('Gemini Response Malformed: '.$response->body());

            return null;
        }

        $text = trim(str_replace(['```json', '```', "\n"], '', $text));
        $translatedArray = json_decode($text, true);

        if (! is_array($translatedArray)) {
            Log::warning('Gemini JSON Parse Failed, using fallback: '.$text);

            return null;
        }

        return $translatedArray;
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        // UPDATED to use findOrFail and load other languages
        $brand_marketing = BrandMarketing::findOrFail($id);

        $otherLanguages = collect();
        if ($brand_marketing->group_id) {
            $otherLanguages = BrandMarketing::where('group_id', $brand_marketing->group_id)
                ->where('id', '!=', $brand_marketing->id)
                ->get();
        }

        return Inertia::render('Admin/BrandMarketing/Edit', [
            'brand_marketing' => $brand_marketing,
            'otherLanguages' => $otherLanguages,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {

        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'content' => 'required',
            'brand_marketing_type' => 'required',
            'bg_image' => 'nullable|image|max:2048',
            'status' => 'required',
        ]);

        $brand_marketing = BrandMarketing::findOrFail($id);

        // 1. Update unique fields for THIS item
        $brand_marketing->update([
            'title' => $validated['title'],
            'content' => $validated['content'],
        ]);

        // 2. Update shared 'status' for THE ENTIRE GROUP
        if ($brand_marketing->group_id) {
            BrandMarketing::where('group_id', $brand_marketing->group_id)
                ->update(['status' => $validated['status']]);
        } else {
            $brand_marketing->update(['status' => $validated['status']]); // Fallback
        }

        // 3. Handle new image upload for THE ENTIRE GROUP
        if ($request->hasFile('bg_image')) {
            // Delete old image
            if ($brand_marketing->bg_image && Storage::disk('public')->exists($brand_marketing->bg_image)) {
                Storage::disk('public')->delete($brand_marketing->bg_image);
            }
            // Store new image
            $path = $request->file('bg_image')->store('uploads/BrandMarketing', 'public');

            // Update path for ALL items in the group
            if ($brand_marketing->group_id) {
                BrandMarketing::where('group_id', $brand_marketing->group_id)
                    ->update(['bg_image' => $path]);
            } else {
                $brand_marketing->update(['bg_image' => $path]); // Fallback
            }
        }

        return redirect()
            ->route('admin.brand_marketing.index')
            ->with('success', 'BrandMarketing updated successfully 🎉');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        // <-- FIXED to delete the entire group and image

        $brand_marketing = BrandMarketing::findOrFail($id);

        // Find all items in the group
        $groupItems = BrandMarketing::where('group_id', $brand_marketing->group_id)->get();

        if ($groupItems->isEmpty()) {
            // Fallback for old/ungrouped item
            if ($brand_marketing->bg_image && Storage::disk('public')->exists($brand_marketing->bg_image)) {
                Storage::disk('public')->delete($brand_marketing->bg_image);
            }
            $brand_marketing->delete();
        } else {
            // This is a grouped item. Delete the file...
            if ($brand_marketing->bg_image && Storage::disk('public')->exists($brand_marketing->bg_image)) {
                Storage::disk('public')->delete($brand_marketing->bg_image);
            }
            // ...and then delete ALL records in that group.
            BrandMarketing::where('group_id', $brand_marketing->group_id)->delete();
        }

        return redirect()
            ->back()
            ->with('success', 'BrandMarketing item deleted successfully 🎉');
    }
}
