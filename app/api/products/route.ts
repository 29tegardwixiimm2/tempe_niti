import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

// 1. FUNGSI AMBIL DATA (GET)
export async function GET() {
  try {
    const [rows] = await db.query('SELECT * FROM products');
    return NextResponse.json(rows);
  } catch (error) {
    return NextResponse.json({ error: 'Gagal ambil data' }, { status: 500 });
  }
}

// 2. FUNGSI UPDATE DATA (PUT) - INI YANG TADI MUNGKIN SALAH
export async function PUT(request: Request) {
  try {
    const body = await request.json(); // Baca data yang dikirim
    const { id, stock, price } = body;

    // Perintah update ke database
    await db.query(
      'UPDATE products SET stock = ?, price = ? WHERE id = ?',
      [stock, price, id]
    );
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error Update:", error); // Biar ketahuan kalo ada error di terminal
    return NextResponse.json({ error: 'Gagal update' }, { status: 500 });
  }
}