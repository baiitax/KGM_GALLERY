import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '@/lib/db/database';

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const db = getDb();
    const generation = db.prepare('SELECT * FROM shot_generations WHERE id = ?').get(params.id);
    if (!generation) return NextResponse.json({ error: 'Generation not found' }, { status: 404 });

    const attempts = db.prepare('SELECT * FROM generation_attempts WHERE generation_id = ? ORDER BY created_at ASC').all(params.id);
    return NextResponse.json({ generation, attempts });
  } catch (error: any) {
    return NextResponse.json({ error: error?.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const db = getDb();
    db.prepare('UPDATE shot_generations SET status = "cancelled" WHERE id = ?').run(params.id);
    return NextResponse.json({ success: true, message: 'Generation cancelled' });
  } catch (error: any) {
    return NextResponse.json({ error: error?.message }, { status: 500 });
  }
}
