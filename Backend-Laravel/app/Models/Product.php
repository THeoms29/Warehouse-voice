<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
   protected $fillable = ['sku', 'name', 'location', 'stock_qty', 'min_stock'];

   public function movements(): HasMany
   {
       return $this->hasMany(StockMovement::class);
   }
}
