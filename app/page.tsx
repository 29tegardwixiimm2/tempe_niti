"use client";

import { useState } from "react";
import { ShoppingCart, Plus, Minus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

// --- INI BAGIAN PENTING: KITA PANGGIL FILE LAMA BIAR MENU MUNCUL ---
// Kita pakai "../" biar aman nyari filenya
import Navbar from "../components/navbar"; 
import Footer from "../components/footer";
import HeroSection from "../components/hero-section"; 
import { products, formatRupiah } from "../lib/products";

export default function ProdukPage() {
  const [cart, setCart] = useState<{ id: number; qty: number }[]>([]);

  const addToCart = (productId: number) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === productId);
      if (existing) {
        return prev.map((item) => item.id === productId ? { ...item, qty: item.qty + 1 } : item);
      }
      return [...prev, { id: productId, qty: 1 }];
    });
  };

  const removeFromCart = (productId: number) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === productId);
      if (existing && existing.qty > 1) {
        return prev.map((item) => item.id === productId ? { ...item, qty: item.qty - 1 } : item);
      }
      return prev.filter((item) => item.id !== productId);
    });
  };

  const totalAmount = cart.reduce((acc, item) => {
    const product = products.find((p) => p.id === item.id);
    return acc + (product ? product.price * item.qty : 0);
  }, 0);

  const handleCheckout = () => {
    if (cart.length === 0) return;
    let message = "Halo Keripik Tempe Niti, saya mau pesan:\n\n";
    cart.forEach((item) => {
      const product = products.find((p) => p.id === item.id);
      if (product) {
        message += `- ${product.name} (${item.qty} bungkus) : ${formatRupiah(product.price * item.qty)}\n`;
      }
    });
    message += `\n*Total: ${formatRupiah(totalAmount)}*`;
    message += "\n\nMohon info ongkir ke alamat saya.";
    window.open(`https://wa.me/6285726400255?text=${encodeURIComponent(message)}`, "_blank");
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* 1. MUNCULIN MENU ATAS */}
      <Navbar />

      <main className="flex-grow">
        {/* 2. MUNCULIN BANNER GEDE (HERO) */}
        <HeroSection />

        {/* 3. INI BAGIAN PRODUK YANG TADI */}
        <div className="container mx-auto py-16 px-4 flex flex-col items-center" id="produk">
          <h2 className="text-3xl font-bold text-center mb-2">Produk Unggulan</h2>
          <p className="text-gray-500 mb-10 text-center">Rasakan kerenyahan asli dari resep turun temurun.</p>

          <div className="flex justify-center w-full max-w-md">
            {products.map((product) => {
              const inCart = cart.find((item) => item.id === product.id);
              const qty = inCart ? inCart.qty : 0;

              return (
                <Card key={product.id} className="w-full shadow-xl border-2 border-primary/10">
                  <CardHeader className="p-0">
                    <div className="w-full h-64 bg-gray-100 flex items-center justify-center rounded-t-lg relative overflow-hidden">
                      {/* Placeholder Gambar */}
                      <span className="text-gray-400 text-lg">Foto Produk (250gr)</span>
                      <Badge className="absolute top-4 right-4 text-md px-3 py-1 bg-yellow-500 hover:bg-yellow-600">
                        {product.category}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <CardTitle className="text-2xl">{product.name}</CardTitle>
                      <p className="text-2xl font-bold text-primary">{formatRupiah(product.price)}</p>
                    </div>
                    <p className="text-gray-600 leading-relaxed">{product.description}</p>
                  </CardContent>
                  <CardFooter className="p-6 pt-0">
                    {qty === 0 ? (
                      <Button className="w-full text-lg py-6" onClick={() => addToCart(product.id)}>
                        <ShoppingCart className="mr-2 h-5 w-5" /> Pesan Sekarang
                      </Button>
                    ) : (
                      <div className="flex items-center justify-between w-full bg-secondary/20 p-2 rounded-lg border border-secondary">
                        <Button variant="ghost" size="icon" className="h-10 w-10" onClick={() => removeFromCart(product.id)}>
                          <Minus className="h-5 w-5" />
                        </Button>
                        <span className="font-bold text-xl">{qty} Bungkus</span>
                        <Button variant="ghost" size="icon" className="h-10 w-10" onClick={() => addToCart(product.id)}>
                          <Plus className="h-5 w-5" />
                        </Button>
                      </div>
                    )}
                  </CardFooter>
                </Card>
              );
            })}
          </div>
        </div>
      </main>

      {/* 4. MUNCULIN FOOTER BAWAH */}
      <Footer />

      {/* 5. TOMBOL FLOAT CHECKOUT */}
      {cart.length > 0 && (
        <div className="fixed bottom-8 right-1/2 translate-x-1/2 z-50 w-full max-w-sm px-4">
          <Button size="lg" className="w-full shadow-2xl py-8 text-lg rounded-full animate-in slide-in-from-bottom-5" onClick={handleCheckout}>
            <ShoppingCart className="mr-2 h-6 w-6" />
            Checkout via WA ({formatRupiah(totalAmount)})
          </Button>
        </div>
      )}
    </div>
  );
}