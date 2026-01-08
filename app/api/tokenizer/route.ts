import { NextResponse } from "next/server";
import Midtrans from "midtrans-client";

export const revalidate = 0; // no-cache

type Body = {
  id: string;
  productName: string;
  price: number;
  quantity?: number;
};

function isProductionEnv() {
  // Ikuti env yang sama dengan frontend biar sinkron
  const env = process.env.NEXT_PUBLIC_MIDTRANS_ENV ?? "sandbox";
  return env === "production";
}

export async function POST(request: Request) {
  try {
    // 1) Ambil & validasi env server key
    const serverKey = process.env.MIDTRANS_SERVER_KEY;
    if (!serverKey) {
      return NextResponse.json(
        { error: "MIDTRANS_SERVER_KEY belum diset di .env.local" },
        { status: 500 }
      );
    }

    // 2) Parse body
    let body: Body;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        { error: "Body harus JSON valid" },
        { status: 400 }
      );
    }

    const { id, productName, price, quantity = 1 } = body;

    // 3) Validasi input (biar tidak error random)
    if (!id || typeof id !== "string") {
      return NextResponse.json({ error: "id wajib string" }, { status: 400 });
    }
    if (!productName || typeof productName !== "string") {
      return NextResponse.json(
        { error: "productName wajib string" },
        { status: 400 }
      );
    }
    if (typeof price !== "number" || !Number.isFinite(price) || price <= 0) {
      return NextResponse.json(
        { error: "price wajib number > 0" },
        { status: 400 }
      );
    }
    if (
      typeof quantity !== "number" ||
      !Number.isFinite(quantity) ||
      quantity <= 0
    ) {
      return NextResponse.json(
        { error: "quantity wajib number > 0" },
        { status: 400 }
      );
    }

    // Midtrans butuh integer rupiah
    const grossAmount = Math.round(price * quantity);

    // 4) Inisialisasi Midtrans Snap (server-only)
    const snap = new Midtrans.Snap({
      isProduction: isProductionEnv(),
      serverKey,
      // clientKey tidak wajib untuk createTransaction dari server
    });

    console.log("🛠️ Request token Midtrans...");
    console.log("📦 Data:", { id, productName, price, quantity, grossAmount });

    // 5) Parameter transaksi
    const parameter = {
      transaction_details: {
        order_id: id,
        gross_amount: grossAmount,
      },
      item_details: [
        {
          id,
          price: Math.round(price),
          quantity: Math.round(quantity),
          name: String(productName).slice(0, 50),
        },
      ],
    };

    // 6) Create transaction
    const tokenResponse = await snap.createTransaction(parameter);

    // tokenResponse biasanya berisi: { token, redirect_url }
    return NextResponse.json(
      { token: tokenResponse.token, redirect_url: tokenResponse.redirect_url },
      {
        headers: {
          "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
          Pragma: "no-cache",
          Expires: "0",
        },
      }
    );
  } catch (err: any) {
    console.error("❌ ERROR SERVER:", err);
    return NextResponse.json(
      { error: err?.message || "Server Error" },
      { status: 500 }
    );
  }
}
