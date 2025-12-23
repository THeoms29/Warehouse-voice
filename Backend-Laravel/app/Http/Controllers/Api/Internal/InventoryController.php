<?php

namespace App\Http\Controllers\Api\Internal;

use App\Http\Controllers\Controller;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class InventoryController extends Controller
{
    public function search(Request $request){

        $query = $request->input('query');

        if (!$query) {
            return response()->json(['error' => 'Query Kosong'], 400);
        }

        $products = Product::where('sku', 'like', "%{$query}%")
            ->orWhere('name', 'like', "%{$query}%")
            ->take(5)
            ->get();
            return response()->json(['data' => $products]);
    }

    public function update(Request $request){

        $request->validate([
            'sku' => 'required|exists:products,sku',
            'type' => 'required|in:masuk,keluar',
            'qty' => 'required|integer|min:1',
            'notes' => 'nullable|string'
        ]);

        try{
            $result = DB::transaction(function () use ($request) {
                $product = Product::where('sku', $request->sku)->lockForUpdate()->first();

                if (!$product) {
                    throw new \Exception("Produk dengan SKU '{$request->sku}' tidak ditemukan.");
                }

                if ($request->type === 'keluar' && $product->stock_qty < $request->qty) {
                    throw new \Exception("Stok tidak Cukup. Sisa: {$product->stock_qty}");
                }

                if ($request->type === 'masuk'){
                     $product->stock_qty += $request->qty;
                    } else {
                     $product->stock_qty -= $request->qty;
                    } $product->save();

                $product->movements()->create([
                    'product_id' => $product->id, 
                    'type' => $request->type,
                    'quantity' => $request->qty,
                    'notes' => $request->notes
                ]);

                return $product;
            });

            return response()->json([
                'status' => 'success',
                'message' => 'Stok berhasil diperbarui',
                'data' => [
                    'product' => $result->name,
                    'new_stock' => $result->stock_qty,
                    'sku' => $result->sku
                ]
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => $e->getMessage()
            ], 400);
        }
    }
}
