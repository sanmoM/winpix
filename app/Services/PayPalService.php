<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class PayPalService
{
    private function token()
    {
        $response = Http::withoutVerifying()->withBasicAuth(
            config('app.paypal_client_id'),
            config('app.paypal_client_secret')
        )->asForm()->post(
                config('app.paypal_base_url') . '/v1/oauth2/token',
                ['grant_type' => 'client_credentials']
            );

        return $response->json()['access_token'];
    }

    public function createOrder($amount, $id, $userId)
    {
        $token = $this->token();

        return Http::withoutVerifying()->withToken($token)->post(
            config('app.paypal_base_url') . '/v2/checkout/orders',
            [
                'intent' => 'CAPTURE',
                'purchase_units' => [
                    [
                        'amount' => [
                            'currency_code' => 'USD',
                            'value' => $amount
                        ]
                    ]
                ],
                'application_context' => [
                    'return_url' => route('paypal.success', ['id' => $id, 'user_id' => $userId]),
                    'cancel_url' => route('paypal.cancel'),
                ]
            ]
        )->json();
    }

    public function captureOrder($orderId)
    {
        $token = $this->token();
        $response = Http::withoutVerifying()->withToken($token)
            ->withBody('', 'application/json') // Empty JSON body
            ->post(config('app.paypal_base_url') . "/v2/checkout/orders/{$orderId}/capture");

        Log::info('PayPal Capture Response', $response->json());

        return $response->json();
    }
}
