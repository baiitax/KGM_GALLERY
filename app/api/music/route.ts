import { NextResponse } from 'next/server';
import { getDatabase } from '@/lib/db';

export async function GET() {
  try {
    const db = getDatabase();
    const tracks = db.prepare('SELECT * FROM music_tracks ORDER BY category ASC').all();
    return NextResponse.json({ success: true, tracks });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
