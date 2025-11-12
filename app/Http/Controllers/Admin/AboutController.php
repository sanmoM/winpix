<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\About;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class AboutController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $items = About::all();

        return Inertia::render('Admin/About/Index', [
            'items' => $items,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Admin/About/Create');
    }

    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'picture' => 'nullable|image|mimes:jpeg,png,jpg,webp|max:2048',
            'title' => 'required|string|max:255',
            'content' => 'required|string',
        ]);

        $path = null;
        if ($request->hasFile('picture')) {
            $path = $request->file('picture')->store('uploads/about', 'public');
        }

        try {
            // Step 1: Translate
            $translations = $this->translateData($validatedData['title'], $validatedData['content']);

            // Step 2: Ensure we always have at least one translation
            if (! is_array($translations) || empty($translations)) {
                $translations = [[
                    'lang' => 'en',
                    'title' => $validatedData['title'],
                    'content' => $validatedData['content'],
                ]];
            }

            // Step 3: Create records for each language
            foreach ($translations as $t) {
                About::create([
                    'lang' => $t['lang'],
                    'title' => $t['title'],
                    'content' => $t['content'],
                    'picture' => $path,
                ]);
            }

            return Redirect::route('admin.about.index')->with('success', 'About page created successfully.');

        } catch (\Exception $e) {
            Log::error('Gemini API Translation Failed: '.$e->getMessage());

            return back()->with('error', 'Translation failed. Please try again.');
        }
    }

    /**
     * ✅ Safe Gemini API call that works even for free-tier users.
     */
    private function translateData(string $title, string $content): ?array
    {
        $apiKey = config('app.gemini_api_key');

        if (! $apiKey) {
            throw new \Exception('Gemini API key is not set');
        }

        // ✅ Use updated model name
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

        $payload = [
            'contents' => [
                [
                    'role' => 'user',
                    'parts' => [['text' => $prompt]],
                ],
            ],
        ];

        $response = Http::post($apiUrl, $payload);

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
        $item = About::findOrFail($id);

        return Inertia::render('Admin/About/Edit', [
            'item' => $item,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $about = About::findOrFail($id);

        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'content' => 'required|string',
            'picture' => 'nullable|image|mimes:jpeg,png,jpg,webp|max:2048',
        ]);

        // Handle image upload
        if ($request->hasFile('picture')) {
            // ✅ Delete old image if exists
            if ($about->picture && file_exists(public_path('storage/'.$about->picture))) {
                unlink(public_path('storage/'.$about->picture));
            }

            // ✅ Store new image
            $path = $request->file('picture')->store('uploads/about', 'public');
            $validated['picture'] = $path;
        }

        // ✅ Update data
        $about->update($validated);

        return redirect()
            ->route('admin.about.index')
            ->with('success', 'About updated successfully!');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $about = About::findOrFail($id);
        if ($about->picture && file_exists(public_path('storage/'.$about->picture))) {
            unlink(public_path('storage/'.$about->picture));
        }

        $about->delete();

        return redirect()
            ->back()
            ->with('success', 'About item deleted successfully 🎉');
    }
}
