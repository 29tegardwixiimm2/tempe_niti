"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/navbar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button"; 
import { Card } from "@/components/ui/card";
import { ShoppingCart } from "lucide-react";
import { useCart } from "@/app/context/cart-context";

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  image: string;
}

export default function ProdukPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const { addToCart } = useCart();

  useEffect(() => {
    fetch('/api/products')
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(err => console.error("Gagal ambil produk:", err));
  }, []);

  const formatRupiah = (n: number) => 
    new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(n);

  const handleAddToCart = (product: Product) => {
    addToCart({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image || "/placeholder.jpg",
        quantity: 1
    });
    // Alert kita hapus biar ga ganggu, cukup user liat keranjang nambah
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-black text-gray-800 mb-2">Katalog Produk</h1>
          <p className="text-gray-500 text-lg">Pilih keripik favoritmu, masukkan keranjang, lalu bayar sekaligus!</p>
        </div>

        {/* --- REVISI DI SINI: Pake FLEX biar Center --- */}
        <div className="flex flex-wrap justify-center gap-8">
          {products.map((product) => (
            <Card 
              key={product.id} 
              className="bg-white rounded-xl shadow-lg border-none overflow-hidden flex flex-col w-full max-w-sm hover:shadow-2xl transition-all duration-300"
            >
              <div className="h-64 bg-gray-200 relative overflow-hidden group">
                <img 
                  src={product.image || "/placeholder.jpg"} 
                  alt={product.name} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                  onError={(e) => { e.currentTarget.src = "https://placehold.co/400x400?text=No+Image" }}
                />
                <Badge className="absolute top-3 right-3 bg-yellow-500 text-black font-bold shadow-md">
                  Stok: {product.stock}
                </Badge>
              </div>

              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-xl font-bold text-gray-900 line-clamp-2 mb-2">{product.name}</h3>
                <p className="text-gray-500 text-sm line-clamp-2 mb-4">{product.description}</p>

                <div className="mt-auto border-t border-gray-100 pt-4">
                  <div className="flex items-center justify-between mb-4">
                      <span className="text-sm text-gray-500">Harga Satuan</span>
                      <span className="text-xl font-black text-red-600">{formatRupiah(product.price)}</span>
                  </div>

                  <Button 
                    onClick={() => handleAddToCart(product)}
                    className="w-full bg-primary hover:bg-primary/90 font-bold active:scale-95 transition-transform"
                  >
                    <ShoppingCart className="mr-2 h-4 w-4" /> + Keranjang
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
}