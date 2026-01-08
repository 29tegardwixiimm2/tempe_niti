import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

// --- MATIKAN CACHE TOTAL ---
export const dynamic = 'force-dynamic';
export const revalidate = 0;
// ---------------------------

export async function GET() {
  try {
    // Ambil data terbaru dari database
    const [rows] = await db.query('SELECT * FROM orders ORDER BY id DESC');

    // Kita bungkus response pake Header anti-cache yang lebih galak
    return new NextResponse(JSON.stringify(rows), {
        status: 200,
        headers: {
            'Content-Type': 'application/json',
            'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
            'Pragma': 'no-cache',
            'Expires': '0',
        }
    });

  } catch (error) {
    return NextResponse.json({ error: 'Gagal ambil data admin' }, { status: 500 });
  }
}