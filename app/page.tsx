"use client";

import { useState, useEffect } from "react";
import { ShoppingCart, Plus, Minus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

// --- INI BAGIAN PENTING: KITA PANGGIL FILE LAMA BIAR MENU MUNCUL ---
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import HeroSection from "../components/hero-section";
import { products, formatRupiah } from "../lib/products";

export default function ProdukPage() {
  // ✅ cek ENV Supabase (client-side)
  useEffect(() => {
    console.log("SUPABASE:", {
      url: process.env.NEXT_PUBLIC_SUPABASE_URL,
      anon: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.slice(0, 10),
    });
  }, []);

  const [cart, setCart] = useState<{ id: number; qty: number }[]>([]);

  const addToCart = (productId: number) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === productId);
      if (existing) {
        return prev.map((item) =>
          item.id === productId ? { ...item, qty: item.qty + 1 } : item
        );
      }
      return [...prev, { id: productId, qty: 1 }];
    });
  };

  const removeFromCart = (productId: number) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === productId);
      if (existing && existing.qty > 1) {
        return prev.map((item) =>
          item.id === productId ? { ...item, qty: item.qty - 1 } : item
        );
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
        message += `- ${product.name} (${item.qty} bungkus) : ${formatRupiah(
          product.price * item.qty
        )}\n`;
      }
    });
    message += `\n*Total: ${formatRupiah(totalAmount)}*`;

    // ✅ ganti nomor WA kamu (format internasional tanpa +)
    const waNumber = "6281234567890";
    const waUrl = `https://wa.me/${waNumber}?text=${encodeURIComponent(message)}`;
    window.open(waUrl, "_blank");
  };

  const getQty = (productId: number) =>
    cart.find((item) => item.id === productId)?.qty ?? 0;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />

      <main className="container mx-auto px-4 py-10">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product) => {
              const qty = getQty(product.id);

              return (
                <Card
                  key={product.id}
                  className="overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all"
                >
                  <CardHeader className="p-6 pb-0">
                    <div className="relative w-full h-64 bg-secondary rounded-xl mb-6 overflow-hidden flex items-center justify-center">
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
                      <p className="text-2xl font-bold text-primary">
                        {formatRupiah(product.price)}
                      </p>
                    </div>
                    <p className="text-gray-600 leading-relaxed">{product.description}</p>
                  </CardContent>

                  <CardFooter className="p-6 pt-0">
                    {qty === 0 ? (
                      <Button
                        className="w-full text-lg py-6"
                        onClick={() => addToCart(product.id)}
                      >
                        <ShoppingCart className="mr-2 h-5 w-5" /> Pesan Sekarang
                      </Button>
                    ) : (
                      <div className="flex items-center justify-between w-full bg-secondary/20 p-2 rounded-lg border border-secondary">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-10 w-10"
                          onClick={() => removeFromCart(product.id)}
                        >
                          <Minus className="h-5 w-5" />
                        </Button>
                        <span className="font-bold text-xl">{qty} Bungkus</span>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-10 w-10"
                          onClick={() => addToCart(product.id)}
                        >
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

      <Footer />

      {/* Tombol floating checkout */}
      {cart.length > 0 && (
        <div className="fixed bottom-8 right-1/2 translate-x-1/2 z-50 w-full max-w-sm px-4">
          <Button
            size="lg"
            className="w-full shadow-2xl py-8 text-lg rounded-full animate-in slide-in-from-bottom-5"
            onClick={handleCheckout}
          >
            <ShoppingCart className="mr-2 h-6 w-6" />
            Checkout via WA ({formatRupiah(totalAmount)})
          </Button>
        </div>
      )}
    </div>
  );
}
