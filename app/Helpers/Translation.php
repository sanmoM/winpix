<?php

namespace App\Helper;

class Translation
{
    /**
     * Translate a data array to English and Arabic using Gemini API
     *
     * @param array $data Example: ['title' => 'good', 'description' => 'this is a good store']
     * @param bool $disableSSLVerify Set true to disable SSL verification (use only for local testing)
     * @return array Example:
     * [
     *   ['title' => 'good', 'description' => 'this is a good store', 'lang' => 'en'],
     *   ['title' => 'جيد', 'description' => 'هذا متجر جيد', 'lang' => 'ar']
     * ]
     * @throws \Exception
     */
    public static function translate(array $data, bool $disableSSLVerify = false): array
    {
        // 1️⃣ Get API key
        $apiKey = config('api-key.gemini_api_key');
        if (!$apiKey) {
            throw new \Exception("Gemini API key not found in config.");
        }

        // 2️⃣ API URL
        $apiUrl = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key={$apiKey}";

        // 3️⃣ Prepare prompt
        $jsonInput = json_encode($data, JSON_UNESCAPED_UNICODE);
        $prompt = "
            Translate the following JSON object into English and Arabic.
            Return an array with exactly two JSON objects:
            - One with lang = 'en' (English translations)
            - One with lang = 'ar' (Arabic translations)
            Maintain the same keys as the original object.
            Input: {$jsonInput}
        ";

        $payload = [
            'contents' => [
                [
                    'role' => 'user',
                    'parts' => [
                        ['text' => $prompt]
                    ]
                ]
            ]
        ];

        

        // 4️⃣ cURL request
        // $ch = curl_init($apiUrl);
        // curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        // curl_setopt($ch, CURLOPT_HTTPHEADER, ['Content-Type: application/json']);
        // curl_setopt($ch, CURLOPT_POST, true);
        // curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($payload));

        // // Optional: disable SSL verification (for local testing only)
        // if ($disableSSLVerify) {
        //     curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
        //     curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, 0);
        // }

        // $response = curl_exec($ch);
        // $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);

        // if ($response === false) {
        //     $err = curl_error($ch);
        //     curl_close($ch);
        //     throw new \Exception("cURL error: {$err}");
        // }

        // curl_close($ch);

        // if ($httpCode < 200 || $httpCode >= 300) {
        //     $errorData = json_decode($response, true);
        //     $message = $errorData['error']['message'] ?? 'Unknown API error';
        //     throw new \Exception("API error: {$message}");
        // }

        // // 5️⃣ Decode model output
        // $result = json_decode($response, true);
        // $text = $result['candidates'][0]['content']['parts'][0]['text'] ?? null;

        // if (!$text) {
        //     throw new \Exception('No valid translation returned from Gemini.');
        // }

        // // 6️⃣ Parse returned JSON array
        // $translatedArray = json_decode($text, true);
        // if (!is_array($translatedArray)) {
        //     throw new \Exception("Invalid translation format: {$text}");
        // }

        // return $translatedArray;
    }
}
