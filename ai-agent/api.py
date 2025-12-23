import os
import logging
import requests
import json
from typing import Literal
from livekit.agents import llm

logger = logging.getLogger("inventory-tools")

class InventoryTools:
    @llm.function_tool(description="Mencari stok barang berdasarkan nama atau query.")
    async def lookup_item(self, item_name: str):
        laravel_url = os.getenv("LARAVEL_API_URL")
        logger.info(f"Lookup request: {item_name}")

        try:
            headers = {"Accept": "application/json"}
            response = requests.get(
                f"{laravel_url}/api/internal/inventory/search",
                params={"query": item_name},
                headers=headers,
                timeout=5
            )
            
            try:
                data_json = response.json()
            except json.JSONDecodeError:
                logger.error(f"Response not JSON: {response.text[:200]}")
                return "Terjadi kesalahan pada server gudang (Invalid Response)."
            
            if response.status_code != 200:
                logger.error(f"Status {response.status_code}: {response.text}")
                return "Maaf, terjadi gangguan koneksi ke database."

            data = data_json.get('data', [])
            if not data:
                return f"Barang '{item_name}' tidak ditemukan dalam sistem."

            result = "Data ditemukan (Gunakan SKU untuk update):\n"
            for item in data:
                result += f"- {item['name']} (SKU: {item['sku']}): Stok {item['stock_qty']} di {item['location']}\n"
            return result

        except Exception as e:
            logger.error(f"Lookup error: {e}")
            return "Terjadi kesalahan sistem saat mencari barang."

    @llm.function_tool(description="Update stok. WAJIB: Parameter 'sku' harus KODE SKU (contoh: HDMI-2M), JANGAN kirim nama barang. Jika user hanya sebut nama, lakukan lookup_item dulu.")
    async def update_stock(self, sku: str, quantity: int, movement_type: Literal["masuk", "keluar"], notes: str = ""):
        laravel_url = os.getenv("LARAVEL_API_URL")
        safe_qty  = abs(quantity)
        safe_sku = sku.strip()
        
        payload = {
                "sku": safe_sku,
                "qty": safe_qty,
                "type": movement_type,
                "notes": notes
            }
        
        logger.info(f"Update request: {safe_sku} ({movement_type}) {safe_qty}")
        logger.info(f"Payload: {payload}")
        
        try:            
            headers = {
                "Accept": "application/json",
                "Content-Type": "application/json"
            }
            
            response = requests.post(
                f"{laravel_url}/api/internal/inventory/update",
                json=payload,
                headers=headers,
                timeout=5
            )
            
            logger.info(f"Response Status: {response.status_code}")
            logger.info(f"Response Body: {response.text[:500]}")
            
            try: 
                data_json = response.json()
            except json.JSONDecodeError:
                logger.error(f"Response not JSON: {response.text[:200]}")
                return f"Server Error (HTML): {response.text[:200]}"

            if response.status_code == 200:
                if data_json.get('status') == 'success':
                    d = data_json.get('data', {})
                    return f"Sukses! Stok {d.get('product')} sekarang {d.get('new_stock')}."
                else:
                    return f"Gagal: {data_json.get('message')}"
            else:
                msg = data_json.get('message', response.text[:200])
                return f"Gagal (Code {response.status_code}): {msg}"
        except Exception as e:
            logger.error(f"Update error: {e}")
            return "Terjadi kesalahan koneksi."