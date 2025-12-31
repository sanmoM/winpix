<?php

namespace App\Http\Controllers;

use App\Models\Store;
use App\Models\User;
use App\Services\PayPalService;
use Illuminate\Http\Request;


class PayPalController extends Controller
{
    public function pay(PayPalService $paypal, Request $request)
    {
        $request->validate([
            "price" => "required|numeric|min:1",
            "id" => "required|integer"
        ]);

        $userId = auth()->user()->id;

        // return dd($request->get('price'));
        $order = $paypal->createOrder($request->get('price'), $request->get('id'), $userId);
        foreach ($order['links'] as $link) {
            if ($link['rel'] === 'approve') {
                return response()->json([
                    'paypal_redirect' => $link['href'],
                ]);
            }
        }
        return redirect()->back()->withErrors([
            'paypal' => 'Unable to create PayPal order'
        ]);
    }

    public function success(Request $request)
    {
        // PayPal token = order ID
        $orderId = $request->query('token');
        $userId = $request->query('user_id');
        $id = $request->query('id');

        if (!$orderId) {
            return "❌ Order ID missing";
        }

        $paypalService = new PayPalService();

        // Capture order
        $result = $paypalService->captureOrder($orderId);

        // Check if payment completed
        if (isset($result['status']) && $result['status'] === 'COMPLETED') {

            $storeItem = Store::findOrFail($id);

            User::findOrFail($userId)->increment('pixel', $storeItem->number_of_coin);
            return redirect(config("app.url") . "/success-payment");
        }

        return "❌ Payment Failed: " . ($result['message'] ?? 'Unknown error');
    }
    public function cancel()
    {
        return "❌ Payment Cancelled";
    }
}
