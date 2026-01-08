import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { orderId, status } = body;
    const cleanStatus = status.toLowerCase(); 

    console.log(`🔥 DB UPDATE: Order #${orderId} -> ${cleanStatus}`);

    // Eksekusi Update
    // Kita simpan hasilnya di variabel 'result'
    const [result]: any = await db.query(
        'UPDATE orders SET status = ? WHERE id = ?', 
        [cleanStatus, orderId]
    );

    // Cek apakah ada baris yang berubah?
    if (result.affectedRows === 0) {
        console.log("⚠️ Gagal Update: ID tidak ditemukan atau status sama.");
    } else {
        console.log("✅ Berhasil Update Database!");
    }
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("❌ ERROR SERVER:", error);
    return NextResponse.json({ error: 'Server Error' }, { status: 500 });
  }
}

// ... (Biarkan fungsi POST check status yang dibawah tetep ada) ...
export async function POST(request: Request) {
    try {
      const body = await request.json();
      const { orderId } = body;
      const [rows]: any = await db.query('SELECT status FROM orders WHERE id = ?', [orderId]);
      if (rows.length === 0) return NextResponse.json({ status: 'unknown' });
      return new NextResponse(JSON.stringify({ status: rows[0].status }), { headers: { 'Cache-Control': 'no-store' } });
    } catch (error) { return NextResponse.json({ error: 'Error DB' }, { status: 500 }); }
}