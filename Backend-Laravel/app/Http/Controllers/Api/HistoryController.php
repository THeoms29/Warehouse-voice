<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\StockMovement;
use Illuminate\Http\Request;

class HistoryController extends Controller
{
    public function index()
    {
        // Get latest 20 stock movements with user and product relation
        $logs = StockMovement::with(['user', 'product'])
            ->latest()
            ->limit(20)
            ->get()
            ->map(function ($movement) {
                return [
                    'id' => $movement->id,
                    'type' => $movement->type,
                    'quantity' => $movement->quantity,
                    'notes' => $movement->notes,
                    'timestamp' => $movement->created_at->toISOString(),
                    'product_name' => $movement->product ? $movement->product->name : 'Unknown Product',
                    'user_name' => $movement->user ? $movement->user->name : 'System',
                ];
            });

        return response()->json($logs);
    }
}
