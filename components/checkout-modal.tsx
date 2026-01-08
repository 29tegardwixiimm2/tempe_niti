"use client";

import React, { useState, useEffect } from "react";
import { X, Truck } from "lucide-react";
import { useCart } from "@/app/context/cart-context";
import { Button } from "@/components/ui/button";

// Daftar Ongkir per Kabupaten (Simulasi)
const shippingRates = [
  { id: 1, name: "Kabupaten Banyumas", cost: 8000 },
  { id: 2, name: "Kabupaten Purbalingga", cost: 10000 },
  { id: 3, name: "Kabupaten Cilacap", cost: 12000 },
  { id: 4, name: "Kabupaten Banjarnegara", cost: 12000 },
  { id: 5, name: "Kabupaten Kebumen", cost: 15000 },
  { id: 6, name: "Luar Kota (Jawa Tengah)", cost: 20000 },
  { id: 7, name: "DKI Jakarta", cost: 25000 },
];

declare global {
  interface Window {
    snap: any;
  }
}

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

function getSnapScriptUrl() {
  const env = process.env.NEXT_PUBLIC_MIDTRANS_ENV ?? "sandbox";
  return env === "production"
    ? "https://app.midtrans.com/snap/snap.js"
    : "https://app.sandbox.midtrans.com/snap/snap.js";
}

export default function CheckoutModal({ isOpen, onClose }: CheckoutModalProps) {
  const { cart, totalPrice, clearCart } = useCart();

  const [shippingCost, setShippingCost] = useState(0);
  const [selectedCity, setSelectedCity] = useState("");
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    district: "",
    address: "",
  });

  const grandTotal = totalPrice + shippingCost;

  // Load Midtrans Snap script (env-based)
  useEffect(() => {
    const scriptId = "midtrans-script";
    const clientKey = process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY;

    if (!clientKey) {
      console.error("NEXT_PUBLIC_MIDTRANS_CLIENT_KEY belum diset di .env.local");
      return;
    }

    if (!document.getElementById(scriptId)) {
      const script = document.createElement("script");
      script.src = getSnapScriptUrl();
      script.setAttribute("data-client-key", clientKey);
      script.id = scriptId;
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  const handleCityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const cityName = e.target.value;
    setSelectedCity(cityName);
    const rate = shippingRates.find((r) => r.name === cityName);
    setShippingCost(rate ? rate.cost : 0);
  };

  const handlePayment = async () => {
    if (!cart.length) {
      alert("Keranjang masih kosong!");
      return;
    }

    if (!formData.name || !formData.phone || !formData.address || !formData.district || !selectedCity) {
      alert("Mohon lengkapi semua data pengiriman!");
      return;
    }

    if (grandTotal <= 0) {
      alert("Total pembayaran tidak valid.");
      return;
    }

    setLoading(true);

    const orderTitle = `Order ${cart.length} Item + Ongkir ke ${selectedCity}`;

    try {
      const response = await fetch("/api/tokenizer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: "ORDER-" + Date.now(),
          productName: orderTitle,
          price: grandTotal,
          quantity: 1,
        }),
      });

      if (!response.ok) {
        const err = await response.json().catch(() => ({}));
        throw new Error(err?.error || "Gagal membuat transaksi.");
      }

      const requestData = await response.json();

      if (!requestData?.token) {
        throw new Error("Token Midtrans tidak ditemukan dari server.");
      }

      if (!window.snap) {
        throw new Error("Snap.js belum siap. Coba refresh halaman.");
      }

      window.snap.pay(requestData.token, {
        onSuccess: function () {
          alert("Pembayaran Berhasil! Pesanan akan segera diproses.");
          clearCart();
          onClose();
          window.location.href = "/produk?status=success";
        },
        onPending: function () {
          window.location.href = "/produk?status=pending";
          setLoading(false);
        },
        onError: function () {
          alert("Pembayaran Gagal!");
          setLoading(false);
        },
        onClose: function () {
          setLoading(false);
        },
      });
    } catch (error: any) {
      console.error("Checkout error:", error);
      alert("Terjadi kesalahan: " + (error?.message || "Unknown error"));
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl flex flex-col">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b sticky top-0 bg-white z-10">
          <h2 className="text-2xl font-black text-gray-800">Checkout Pesanan</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <X className="w-6 h-6 text-gray-500" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Informasi Pembeli */}
          <div className="space-y-4">
            <h3 className="font-bold text-gray-700 flex items-center gap-2">
              <span className="bg-gray-200 w-6 h-6 rounded-full flex items-center justify-center text-xs">1</span>
              Informasi Pembeli
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">Nama Lengkap *</label>
                <input
                  type="text"
                  className="w-full border rounded-lg p-2.5 focus:ring-2 focus:ring-primary focus:outline-none"
                  placeholder="Contoh: Budi Santoso"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">No. Telepon (WA) *</label>
                <input
                  type="text"
                  className="w-full border rounded-lg p-2.5 focus:ring-2 focus:ring-primary focus:outline-none"
                  placeholder="08xxxxxxxxxx"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                />
              </div>
            </div>
          </div>

          {/* Alamat Pengiriman */}
          <div className="space-y-4">
            <h3 className="font-bold text-gray-700 flex items-center gap-2">
              <span className="bg-gray-200 w-6 h-6 rounded-full flex items-center justify-center text-xs">2</span>
              Alamat Pengiriman
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">Kabupaten/Kota *</label>
                <select
                  className="w-full border rounded-lg p-2.5 focus:ring-2 focus:ring-primary focus:outline-none bg-white"
                  value={selectedCity}
                  onChange={handleCityChange}
                >
                  <option value="">-- Pilih Kabupaten --</option>
                  {shippingRates.map((rate) => (
                    <option key={rate.id} value={rate.name}>
                      {rate.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">Kecamatan *</label>
                <input
                  type="text"
                  className="w-full border rounded-lg p-2.5 focus:ring-2 focus:ring-primary focus:outline-none"
                  placeholder="Contoh: Purwokerto Utara"
                  value={formData.district}
                  onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Alamat Lengkap *</label>
              <textarea
                rows={2}
                className="w-full border rounded-lg p-2.5 focus:ring-2 focus:ring-primary focus:outline-none"
                placeholder="Nama jalan, nomor rumah, patokan..."
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              />
            </div>
          </div>

          {/* Info Kurir */}
          {selectedCity && (
            <div className="bg-red-600 text-white p-4 rounded-xl flex justify-between items-center shadow-md animate-in slide-in-from-top-2">
              <div className="flex items-center gap-3">
                <div className="bg-white/20 p-2 rounded-lg">
                  <Truck size={24} />
                </div>
                <div>
                  <p className="font-black text-lg">J&T EXPRESS</p>
                  <p className="text-white/80 text-xs">Estimasi 2-3 hari</p>
                </div>
              </div>
              <p className="font-bold text-xl">Rp {shippingCost.toLocaleString("id-ID")}</p>
            </div>
          )}

          {/* Ringkasan */}
          <div className="bg-gray-50 p-5 rounded-xl border">
            <h3 className="font-bold text-gray-800 mb-4">Ringkasan Pesanan</h3>

            <div className="space-y-2 mb-4">
              {cart.map((item) => (
                <div key={item.id} className="flex justify-between text-sm text-gray-600">
                  <span>
                    {item.name} ({item.quantity}x)
                  </span>
                  <span>Rp {(item.price * item.quantity).toLocaleString("id-ID")}</span>
                </div>
              ))}
            </div>

            <div className="border-t border-dashed border-gray-300 my-4"></div>

            <div className="space-y-2">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal Produk</span>
                <span>Rp {totalPrice.toLocaleString("id-ID")}</span>
              </div>

              <div className="flex justify-between text-gray-600">
                <span>Ongkos Kirim</span>
                <span className="font-medium">
                  {shippingCost > 0 ? `Rp ${shippingCost.toLocaleString("id-ID")}` : "-"}
                </span>
              </div>

              <div className="flex justify-between text-xl font-black text-gray-900 mt-4 pt-4 border-t border-gray-300">
                <span>Total Bayar</span>
                <span className="text-primary">Rp {grandTotal.toLocaleString("id-ID")}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t bg-gray-50 sticky bottom-0">
          <Button
            onClick={handlePayment}
            disabled={loading}
            className="w-full h-14 text-lg font-bold shadow-lg bg-yellow-600 hover:bg-yellow-700 text-white rounded-xl"
          >
            {loading ? "Memproses..." : "Bayar Sekarang"}
          </Button>
        </div>
      </div>
    </div>
  );
}
