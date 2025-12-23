<?php

namespace Database\Seeders;

use App\Models\Product;
use App\Models\StockMovement;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\DB;

class IntegrationSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create Test User
        $user = User::updateOrCreate(
            ['email' => 'staff@warehouse.com'],
            [
                'name' => 'Budi Santoso',
                'password' => Hash::make('password'),
                'pin' => '123456'
            ]
        );

        // Create Dummy Products
        $product1 = Product::firstOrCreate(
            ['sku' => 'NIKE-AIR-42'],
            ['name' => 'Nike Air Jordan Size 42', 'stock_qty' => 100, 'location' => 'A-1-2']
        );

        $product2 = Product::firstOrCreate(
            ['sku' => 'TSHIRT-RED-L'],
            ['name' => 'Red T-Shirt Large', 'stock_qty' => 250, 'location' => 'B-2-2']
        );

        // Create Dummy History Logs
        StockMovement::create([
            'product_id' => $product1->id,
            'user_id' => $user->id,
            'type' => 'masuk',
            'quantity' => 50,
            'notes' => 'Restock bulanan'
        ]);

        StockMovement::create([
            'product_id' => $product2->id,
            'user_id' => $user->id,
            'type' => 'keluar',
            'quantity' => 10,
            'notes' => 'Order #ORD-2024-001'
        ]);

        $this->command->info('Integration data seeded!');
    }
}
