import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

// WAJIB PAKE "POST" (Huruf Besar) biar bisa nerima data transaksi
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { items, total } = body; 

    // 1. Simpan ke tabel orders
    const [orderResult]: any = await db.query(
      'INSERT INTO orders (total_amount, status, created_at) VALUES (?, ?, NOW())',
      [total, 'pending']
    );
    const orderId = orderResult.insertId;

    // 2. Simpan detail barang & Potong Stok
    for (const item of items) {
      await db.query(
        'INSERT INTO order_details (order_id, product_id, quantity, price) VALUES (?, ?, ?, ?)',
        [orderId, item.id, item.quantity, item.price]
      );

      await db.query(
        'UPDATE products SET stock = stock - ? WHERE id = ?',
        [item.quantity, item.id]
      );
    }

    return NextResponse.json({ success: true, orderId });
  } catch (error) {
    console.error("Error Checkout:", error); // Biar keliatan di terminal kalau ada error lain
    return NextResponse.json({ error: 'Gagal checkout' }, { status: 500 });
  }
}