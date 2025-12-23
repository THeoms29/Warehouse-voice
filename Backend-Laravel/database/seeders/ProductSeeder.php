<?php

namespace Database\Seeders;

use App\Models\Product;
use Illuminate\Database\Seeder;

class ProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
       $products = [
            ['sku' => 'HDMI-2M', 'name' => 'Kabel HDMI 2 Meter', 'location' => 'Rak A1', 'stock_qty' => 50],
            ['sku' => 'MNTR-LG-24', 'name' => 'Monitor LG 24 Inch', 'location' => 'Rak B2', 'stock_qty' => 15],
            ['sku' => 'MSE-LOGI-M', 'name' => 'Mouse Logitech M170', 'location' => 'Rak A2', 'stock_qty' => 30],
            ['sku' => 'KB-MECH-RGB', 'name' => 'Keyboard Mechanical RGB', 'location' => 'Rak A3', 'stock_qty' => 10],
            ['sku' => 'SSD-SMS-500', 'name' => 'Samsung SSD 500GB', 'location' => 'Rak C1', 'stock_qty' => 25],
            ['sku' => 'RAM-VGEN-8', 'name' => 'RAM V-Gen 8GB DDR4', 'location' => 'Rak C1', 'stock_qty' => 40],
            ['sku' => 'PSU-COR-550', 'name' => 'PSU Corsair 550W', 'location' => 'Rak B3', 'stock_qty' => 8],
            ['sku' => 'USB-SAND-32', 'name' => 'Flashdisk SanDisk 32GB', 'location' => 'Rak A1', 'stock_qty' => 100],
            ['sku' => 'WBC-LOGI-C', 'name' => 'Webcam Logitech C920', 'location' => 'Rak A4', 'stock_qty' => 5],
            ['sku' => 'PRT-EPS-L', 'name' => 'Printer Epson L3210', 'location' => 'Rak B1', 'stock_qty' => 7],
        ];

        foreach ($products as $product) {
            Product::create($product);
        } 
    }
}
