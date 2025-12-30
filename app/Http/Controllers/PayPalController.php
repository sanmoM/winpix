<?php

namespace App\Http\Controllers;

use App\Services\PayPalService;
use Illuminate\Http\Request;


class PayPalController extends Controller
{
    public function pay(PayPalService $paypal)
    {
        $order = $paypal->createOrder('10.00');

        foreach ($order['links'] as $link) {
            if ($link['rel'] === 'approve') {
                return redirect($link['href']);
            }
        }
    }

    public function success(Request $request)
    {
        // PayPal token = order ID
        $orderId = $request->query('token');

        if (!$orderId) {
            return "❌ Order ID missing";
        }

        $paypalService = new PayPalService();

        // Capture order
        $result = $paypalService->captureOrder($orderId);

        // Log response for debugging
        \Log::info('PayPal capture response', $result);

        // Check if payment completed
        if (isset($result['status']) && $result['status'] === 'COMPLETED') {
            return "✅ Payment Successful";
        }

        return "❌ Payment Failed: " . ($result['message'] ?? 'Unknown error');
    }
    public function cancel()
    {
        return "❌ Payment Cancelled";
    }
}
