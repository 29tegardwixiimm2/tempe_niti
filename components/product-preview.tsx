"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ShoppingCart, Star, Flame, TrendingUp } from "lucide-react"
import { CheckoutButton } from "@/components/checkout-button";

const products = [
  {
    id: 1,
    name: "Keripik Tempe Original",
    price: "Rp 25.000",
    rating: 4.8,
    description: "Rasa gurih original yang sempurna sebagai cemilan",
    image: "/keripik-tempe-original.jpg",
    badge: "Terlaris",
    badgeColor: "bg-red-500",
  },
  {
    id: 2,
    name: "Keripik Tempe Pedas",
    price: "Rp 25.000",
    rating: 4.9,
    description: "Pedas menggugah selera dengan bumbu rempah pilihan",
    image: "/keripik-tempe-pedas-merah.jpg",
    badge: "Favorit",
    badgeColor: "bg-orange-500",
    badge2: <Flame size={12} className="inline mr-1" />,
  },
  {
    id: 3,
    name: "Keripik Tempe Manis Asin",
    price: "Rp 27.000",
    rating: 4.7,
    description: "Manis gurih yang sempurna untuk keluarga",
    image: "/keripik-tempe-manis-asin.jpg",
  },
  {
    id: 4,
    name: "Paket Mix Premium",
    price: "Rp 50.000",
    rating: 5.0,
    description: "Kombinasi semua rasa dalam satu paket hemat",
    image: "/keripik-tempe-assorted-pack.jpg",
    badge: "Best Deal",
    badgeColor: "bg-amber-500",
    badge2: <TrendingUp size={12} className="inline mr-1" />,
  },
]

export default function ProductPreview() {
  
  // Fungsi Helper: Mengubah "Rp 25.000" menjadi angka 25000
  const parsePrice = (priceString: string) => {
    return parseInt(priceString.replace(/[^0-9]/g, ''), 10);
  };

  return (
    <section className="py-20 md:py-32 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-red-50/30">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <p className="text-primary font-black text-lg mb-3 tracking-wide">PILIHAN PRODUK KAMI</p>
          <h2 className="text-5xl md:text-6xl font-black text-foreground mb-6 text-balance">
            Nikmati <span className="text-secondary">Berbagai Varian</span> Rasa
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Setiap produk dibuat dengan standar kualitas tertinggi dan resep asli. Pilih favoritmu dan rasakan
            perbedaannya!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {products.map((product) => (
            <Card
              key={product.id}
              className="overflow-hidden hover:shadow-2xl transition-all duration-300 border border-primary/10 hover:border-primary/30 group"
            >
              <div className="relative aspect-square bg-gradient-to-br from-yellow-100 to-red-100 overflow-hidden">
                {product.badge && (
                  <div
                    className={`absolute top-3 right-3 z-10 ${product.badgeColor} text-white px-4 py-1 rounded-full text-xs font-bold flex items-center gap-1 shadow-lg`}
                  >
                    {product.badge2}
                    {product.badge}
                  </div>
                )}
                {/* Ganti src dengan placeholder kalau gambar belum ada biar ga error */}
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  onError={(e) => { e.currentTarget.src = "https://placehold.co/400x400?text=No+Image" }} 
                />
              </div>
              <div className="p-6 space-y-4">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={16} className="fill-secondary text-secondary" />
                  ))}
                  <span className="text-xs text-muted-foreground ml-2 font-semibold">({product.rating})</span>
                </div>
                <div>
                  <h3 className="font-black text-base text-foreground line-clamp-2 mb-1">{product.name}</h3>
                  <p className="text-sm text-muted-foreground line-clamp-2">{product.description}</p>
                </div>
                <div className="flex items-center justify-between pt-3 border-t border-border">
                  <p className="text-2xl font-black text-primary">{product.price}</p>
                  
                  {/* --- BAGIAN INI YANG DIBENERIN --- */}
                  {/* Kita panggil tombol checkout dan kirim data produk spesifik */}
                  <CheckoutButton 
                    id={`PROD-${product.id}`}
                    productName={product.name}
                    price={parsePrice(product.price)}
                    quantity={1}
                  />
                  {/* ---------------------------------- */}
                  
                </div>
              </div>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Link href="/produk">
            <Button
              size="lg"
              className="bg-primary hover:bg-primary/90 text-primary-foreground font-black px-10 shadow-lg hover:shadow-xl transition-all text-lg h-14"
            >
              Lihat Semua Produk
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}