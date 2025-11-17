<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Slider;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Inertia\Inertia;

class SliderController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // Updated to group items for a cleaner view
        // $sliders = Slider::where('lang', 'en')
        //     ->orWhereDoesntHave('group', function ($query) {
        //         $query->where('lang', 'en');
        //     })
        //     ->orderBy('created_at', 'desc')
        //     ->get();
        $sliders = Slider::all();

        return Inertia::render('Admin/Slider/Index', [
            'sliders' => $sliders,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Admin/Slider/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'content' => 'required',
            'bg_image' => 'nullable|image|max:2048',
        ]);

        $path = null;
        if ($request->hasFile('bg_image')) {
            $path = $request->file('bg_image')->store('uploads/slider', 'public');
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
                Slider::create([
                    'lang' => $t['lang'],
                    'title' => $t['title'],
                    'content' => $t['content'],
                    'bg_image' => $path,
                    'group_id' => $groupId,
                ]);
            }

            // UPDATED redirect to index
            return Redirect::route('admin.slider.index')->with('success', 'Slider page created successfully.');

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
        // UPDATED to use findOrFail and load other languages
        $slider = Slider::findOrFail($id);

        $otherLanguages = collect();
        if ($slider->group_id) {
            $otherLanguages = Slider::where('group_id', $slider->group_id)
                ->where('id', '!=', $slider->id)
                ->get();
        }

        return Inertia::render('Admin/Slider/Edit', [
            'slider' => $slider,
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
            'bg_image' => 'nullable|image|max:2048',
            'status' => 'required',
        ]);

        $slider = Slider::findOrFail($id);

        // 1. Update unique fields for THIS item
        $slider->update([
            'title' => $validated['title'],
            'content' => $validated['content'],
        ]);

        // 2. Update shared 'status' for THE ENTIRE GROUP
        if ($slider->group_id) {
            Slider::where('group_id', $slider->group_id)
                ->update(['status' => $validated['status']]);
        } else {
            $slider->update(['status' => $validated['status']]); // Fallback
        }

        // 3. Handle new image upload for THE ENTIRE GROUP
        if ($request->hasFile('bg_image')) {
            // Delete old image
            if ($slider->bg_image && Storage::disk('public')->exists($slider->bg_image)) {
                Storage::disk('public')->delete($slider->bg_image);
            }
            // Store new image
            $path = $request->file('bg_image')->store('uploads/slider', 'public');

            // Update path for ALL items in the group
            if ($slider->group_id) {
                Slider::where('group_id', $slider->group_id)
                    ->update(['bg_image' => $path]);
            } else {
                $slider->update(['bg_image' => $path]); // Fallback
            }
        }

        return redirect()
            ->route('admin.slider.index')
            ->with('success', 'Slider updated successfully 🎉');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        // <-- FIXED to delete the entire group and image

        $slider = Slider::findOrFail($id);

        // Find all items in the group
        $groupItems = Slider::where('group_id', $slider->group_id)->get();

        if ($groupItems->isEmpty()) {
            // Fallback for old/ungrouped item
            if ($slider->bg_image && Storage::disk('public')->exists($slider->bg_image)) {
                Storage::disk('public')->delete($slider->bg_image);
            }
            $slider->delete();
        } else {
            // This is a grouped item. Delete the file...
            if ($slider->bg_image && Storage::disk('public')->exists($slider->bg_image)) {
                Storage::disk('public')->delete($slider->bg_image);
            }
            // ...and then delete ALL records in that group.
            Slider::where('group_id', $slider->group_id)->delete();
        }

        return redirect()
            ->back()
            ->with('success', 'Slider item (and all translations) deleted successfully 🎉');
    }
}
