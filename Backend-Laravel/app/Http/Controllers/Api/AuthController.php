<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;

class AuthController extends Controller
{
    public function verifyPin(Request $request)
    {
        $request->validate([
            'pin' => 'required|string|size:6',
        ]);

        $user = User::where('pin', $request->pin)->first();

        if (!$user) {
            return response()->json([
                'success' => false,
                'message' => 'Invalid PIN'
            ], 401);
        }

        $token = 'mock-token-' . uniqid();

        return response()->json([
            'success' => true,
            'user' => [
                'id' => $user->id,
                'name' => $user->name,
                'role' => 'Staff',
                'warehouse_id' => 1
            ],
            'token' => $token
        ]);
    }
}
