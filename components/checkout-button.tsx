"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";

declare global {
  interface Window {
    snap: any;
  }
}

interface CheckoutProps {
  id: string;
  productName: string;
  price: number;
  quantity?: number;
}

function getSnapScriptUrl() {
  const env = process.env.NEXT_PUBLIC_MIDTRANS_ENV ?? "sandbox";
  return env === "production"
    ? "https://app.midtrans.com/snap/snap.js"
    : "https://app.sandbox.midtrans.com/snap/snap.js";
}

export function CheckoutButton({
  id,
  productName,
  price,
  quantity = 1,
}: CheckoutProps) {
  const [loading, setLoading] = useState(false);

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

  const checkout = async () => {
    setLoading(true);

    try {
      const response = await fetch("/api/tokenizer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: id + "-" + Math.floor(Math.random() * 1000),
          productName,
          price,
          quantity,
        }),
      });

      if (!response.ok) {
        const err = await response.json().catch(() => ({}));
        throw new Error(err?.error || "Gagal menghubungi server.");
      }

      const requestData = await response.json();

      if (!requestData?.token) {
        throw new Error("Token Midtrans kosong. Cek API /api/tokenizer.");
      }

      if (!window.snap) {
        throw new Error("Snap.js belum siap. Coba refresh halaman.");
      }

      window.snap.pay(requestData.token, {
        onSuccess: function () {
          alert("Pembayaran Berhasil!");
          setLoading(false);
        },
        onPending: function () {
          alert("Menunggu Pembayaran...");
          setLoading(false);
        },
        onError: function () {
          alert("Pembayaran Gagal!");
          setLoading(false);
        },
        onClose: function () {
          alert("Popup ditutup");
          setLoading(false);
        },
      });
    } catch (error: any) {
      console.error("Error Checkout:", error);
      alert("TERJADI ERROR: " + (error?.message || "Unknown error"));
      setLoading(false);
    }
  };

  return (
    <Button
      size="sm"
      onClick={checkout}
      disabled={loading}
      className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-md font-bold w-full"
    >
      {loading ? (
        "Loading..."
      ) : (
        <>
          <ShoppingCart className="mr-2 h-4 w-4" /> Beli Sekarang
        </>
      )}
    </Button>
  );
}
