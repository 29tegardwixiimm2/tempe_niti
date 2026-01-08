"use client";

import Link from "next/link";
import { useState } from "react";
// Import Icon lengkap (buat Cart & Dropdown)
import { ShoppingCart, Trash2, X, Plus, Minus, ChevronDown } from "lucide-react"; 
import { useCart } from "@/app/context/cart-context";
import { Button } from "./ui/button";
// Import Modal Checkout (Fitur Ongkir Lu Tetap Ada Disini)
import CheckoutModal from "./checkout-modal"; 

export default function Navbar() {
  const { cart, addToCart, decreaseFromCart, removeFromCart, totalPrice, totalItems } = useCart();
  
  // State Cart (Keranjang Kecil)
  const [isCartOpen, setIsCartOpen] = useState(false);
  
  // State Checkout Modal (Formulir Alamat & Ongkir)
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  const formatRupiah = (n: number) => 
    new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(n);

  return (
    <>
    <nav className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-md">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        
        {/* LOGO */}
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground">
             <span className="font-bold">KN</span>
          </div>
          <span className="text-xl font-bold tracking-tight text-primary">Keripik Niti</span>
        </Link>

        {/* --- MENU TENGAH --- */}
        <div className="hidden md:flex gap-8 items-center">
            <Link href="/" className="text-sm font-medium hover:text-primary transition-colors">Beranda</Link>
            <Link href="/produk" className="text-sm font-medium hover:text-primary transition-colors">Produk</Link>
            
            {/* INI BAGIAN DROPDOWN "TENTANG KAMI" */}
            <div className="relative group h-16 flex items-center">
                <Link 
                    href="/tentang?view=sejarah" 
                    className="text-sm font-medium group-hover:text-primary transition-colors flex items-center gap-1 cursor-pointer"
                >
                    Tentang Kami <ChevronDown size={14} className="group-hover:rotate-180 transition-transform duration-300"/>
                </Link>

                {/* ISI MENU DROPDOWN (YANG DIUBAH CUMA HREF-NYA AJA) */}
                <div className="absolute top-[90%] left-1/2 -translate-x-1/2 w-56 bg-white border border-gray-100 shadow-xl rounded-xl overflow-hidden hidden group-hover:block animate-in fade-in slide-in-from-top-2">
                    <div className="py-2 flex flex-col">
                        <Link href="/tentang?view=sejarah" className="px-4 py-3 text-sm text-gray-700 hover:bg-orange-50 hover:text-primary text-left border-b border-gray-50">
                            📜 Sejarah Niti
                        </Link>
                        <Link href="/tentang?view=visi" className="px-4 py-3 text-sm text-gray-700 hover:bg-orange-50 hover:text-primary text-left border-b border-gray-50">
                            🎯 Visi & Misi
                        </Link>
                        <Link href="/tentang?view=keunggulan" className="px-4 py-3 text-sm text-gray-700 hover:bg-orange-50 hover:text-primary text-left border-b border-gray-50">
                            ⭐ Keunggulan
                        </Link>
                        <Link href="/tentang?view=produksi" className="px-4 py-3 text-sm text-gray-700 hover:bg-orange-50 hover:text-primary text-left border-b border-gray-50">
                            🏭 Proses Produksi
                        </Link>
                        <Link href="/tentang?view=kontak" className="px-4 py-3 text-sm text-gray-700 hover:bg-orange-50 hover:text-primary text-left">
                            📍 Kontak & Lokasi
                        </Link>
                    </div>
                </div>
            </div>
        </div>

        {/* --- ICON KERANJANG --- */}
        <div className="relative">
          <button 
            onClick={() => setIsCartOpen(!isCartOpen)} 
            className="relative p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <ShoppingCart className="w-6 h-6 text-gray-700" />
            {totalItems > 0 && (
              <span className="absolute top-0 right-0 h-5 w-5 rounded-full bg-red-500 text-[10px] font-bold text-white flex items-center justify-center animate-bounce">
                {totalItems}
              </span>
            )}
          </button>

          {/* POPUP KERANJANG KECIL */}
          {isCartOpen && (
            <div className="absolute right-0 top-12 w-80 md:w-96 bg-white shadow-2xl rounded-xl border border-gray-100 p-4 overflow-hidden z-50 animate-in fade-in slide-in-from-top-2">
              <div className="flex justify-between items-center mb-4 border-b pb-2">
                <h3 className="font-bold text-lg">Keranjang ({totalItems})</h3>
                <button onClick={() => setIsCartOpen(false)}><X className="w-5 h-5 text-gray-400 hover:text-red-500"/></button>
              </div>

              {cart.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <p>Keranjang masih kosong nih.</p>
                  <Link href="/produk" className="text-primary text-sm font-bold mt-2 inline-block">Mulai Belanja</Link>
                </div>
              ) : (
                <div className="max-h-[60vh] overflow-y-auto space-y-4">
                  {cart.map((item) => (
                    <div key={item.id} className="flex gap-3 items-start bg-gray-50 p-2 rounded-lg relative group">
                      <div className="h-16 w-16 bg-white rounded overflow-hidden flex-shrink-0 border">
                         <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                      </div>
                      
                      <div className="flex-1 min-w-0 pr-6">
                        <p className="font-bold text-sm truncate mb-1">{item.name}</p>
                        <p className="text-xs text-gray-500 mb-2">{formatRupiah(item.price)}</p>
                        <div className="flex items-center gap-3 bg-white border rounded-md w-fit px-1 py-0.5 shadow-sm">
                            <button onClick={() => decreaseFromCart(item.id)} className="p-1 hover:bg-gray-100 rounded text-gray-600"><Minus size={14} /></button>
                            <span className="text-xs font-bold w-4 text-center">{item.quantity}</span>
                            <button onClick={() => addToCart(item)} className="p-1 hover:bg-gray-100 rounded text-green-600"><Plus size={14} /></button>
                        </div>
                      </div>
                      <button onClick={() => removeFromCart(item.id)} className="absolute top-2 right-2 p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded transition-colors"><Trash2 className="w-4 h-4" /></button>
                    </div>
                  ))}
                </div>
              )}

              {cart.length > 0 && (
                <div className="mt-4 pt-4 border-t">
                  <div className="flex justify-between font-bold text-lg mb-4">
                    <span>Total</span>
                    <span className="text-primary">{formatRupiah(totalPrice)}</span>
                  </div>
                  
                  {/* TOMBOL INI MEMBUKA MODAL CHECKOUT (BUKAN LANGSUNG BAYAR) */}
                  <div className="w-full">
                    <Button 
                      onClick={() => {
                        setIsCartOpen(false); // Tutup keranjang kecil
                        setIsCheckoutOpen(true); // Buka Modal Checkout Besar
                      }}
                      className="w-full bg-primary hover:bg-primary/90 font-bold"
                    >
                        Checkout Pesanan
                    </Button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </nav>

    {/* --- MODAL CHECKOUT TETAP ADA DISINI --- */}
    <CheckoutModal 
      isOpen={isCheckoutOpen} 
      onClose={() => setIsCheckoutOpen(false)} 
    />
    </>
  );
}