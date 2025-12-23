<?php

use App\Http\Controllers\Api\Internal\InventoryController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\LiveKitController;
use App\Http\Controllers\Api\AuthController;

Route::post('/auth/verify-pin', [AuthController::class, 'verifyPin']);

Route::post('test', function () {
    return response()->json(['message' => 'POST works!']);
});

Route::prefix('internal')->group(function () {
    Route::get('inventory/search', [InventoryController::class, 'search']);
    Route::post('inventory/update', [InventoryController::class, 'update']);
});

Route::get('/livekit/token', [LiveKitController::class, 'getToken']);
Route::get('/activity-log', [\App\Http\Controllers\Api\HistoryController::class, 'index']);