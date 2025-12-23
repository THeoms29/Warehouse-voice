<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\Internal\InventoryController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

Route::prefix('api/internal')->group(function () {
    Route::get('inventory/search', [InventoryController::class, 'search']);
    Route::post('inventory/update', [InventoryController::class, 'update']);
});