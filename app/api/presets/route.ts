import { NextResponse } from 'next/server';
import { getDatabase } from '@/lib/db';

export async function GET() {
  try {
    const db = getDatabase();
    const presets = db.prepare('SELECT * FROM motion_presets ORDER BY id ASC').all();
    return NextResponse.json({ success: true, presets });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
