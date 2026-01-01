<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Help;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Str;
use Inertia\Inertia;

class HelpController extends Controller
{
    public function index()
    {
        $items = Help::orderBy('id', 'desc')->paginate(10)->withQueryString();

        return Inertia::render('Admin/Help/Index', [
            'items' => $items,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Admin/Help/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'section' => 'required|string|max:255',
            'question' => 'required|string',
            'answer' => 'required',
        ]);

        try {
            // Step 1: Translate
            $translations = $this->translateData(
                $validated['question'],
                $validated['answer']
            );

            // Step 2: Fallback if translation fails
            if (!is_array($translations) || empty($translations)) {
                $translations = [
                    [
                        'lang' => 'en',
                        'question' => $validated['question'],
                        'answer' => $validated['answer'],
                    ]
                ];
            }

            $groupId = Str::uuid()->toString();

            // Step 4: Create records for each language
            foreach ($translations as $t) {
                Help::create([
                    'lang' => $t['lang'],
                    'section' => $validated['section'],
                    'question' => $t['question'],
                    'answer' => $t['answer'],
                    'group_id' => $groupId,
                ]);
            }

            return Redirect::route('admin.help.index')
                ->with('success', 'Help items created successfully 🎉');

        } catch (\Exception $e) {
            Log::error('Gemini API Translation Failed: ' . $e->getMessage());

            return back()->with('error', 'Translation failed. Please try again.');
        }
    }

    /**
     * Display the specified resource.
     */
    private function translateData(string $question, string $answer): ?array
    {
        $apiKey = config('app.gemini_api_key');

        if (!$apiKey) {
            throw new \Exception('Gemini API key is not set');
        }

        $apiUrl = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key={$apiKey}";
        $prompt = <<<PROMPT
        You are a translation assistant.
        Translate the following data into **English (en)** and **Arabic (ar)**.
        Return a valid JSON array of objects, like this:
        [
            {"lang": "en", "question": "...", "answer": "..."},
            {"lang": "ar", "question": "...", "answer": "..."}
        ]
        If translation fails, just return the original English text.

        Question: {$question}
        Answer: {$answer}
        PROMPT;

        $payload = [
            'contents' => [
                [
                    'role' => 'user',
                    'parts' => [['text' => $prompt]],
                ],
            ],
        ];

        $response = Http::withoutVerifying()->post($apiUrl, $payload);

        if (!$response->ok()) {
            Log::error('Gemini API Error: ' . $response->body());

            return null;
        }

        $result = $response->json();
        $text = $result['candidates'][0]['content']['parts'][0]['text'] ?? null;

        if (!$text) {
            Log::error('Gemini Response Malformed: ' . $response->body());

            return null;
        }

        // Clean up the JSON string
        $text = trim(str_replace(['```json', '```', "\n"], '', $text));
        $translatedArray = json_decode($text, true);

        if (!is_array($translatedArray)) {
            Log::warning('Gemini JSON Parse Failed, using fallback: ' . $text);

            return null; // Fallback will be triggered in store()
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
        $item = Help::findOrFail($id);

        return Inertia::render('Admin/Help/Edit', [
            'item' => $item,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $item = Help::findOrFail($id);
        // return dd($request->all());
        $validated = $request->validate([
            'section' => 'required|string|max:255',
            'question' => 'required|string',
            'answer' => 'required',
            'lang' => 'required',
        ]);


        if ($item->group_id) {
            Help::where('group_id', $item->group_id)->where('lang', $validated['lang'])
                ->update(['section' => $validated['section'], 'question' => $validated['question'], 'answer' => $validated['answer']]);
        } else {
            $item->update(['section' => $validated['section']]);
        }

        return redirect()
            ->route('admin.help.index')
            ->with('success', 'Question updated successfully 🎉');

    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $help = Help::findOrFail($id);
        $help->delete();

        return redirect()
            ->back()
            ->with('success', 'Question deleted successfully 🎉');
    }
}
