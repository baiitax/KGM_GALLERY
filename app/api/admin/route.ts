import { NextResponse } from 'next/server';
import { getDatabase } from '@/lib/db';

export async function GET() {
  try {
    const db = getDatabase();
    const providers = db.prepare('SELECT * FROM provider_accounts ORDER BY id ASC').all();
    const models = db.prepare('SELECT * FROM provider_models ORDER BY provider_id ASC').all();
    const settings = db.prepare('SELECT * FROM system_settings').all();
    const users = db.prepare('SELECT id, email, full_name, role, created_at FROM users').all();
    const recentAudit = db.prepare('SELECT * FROM audit_logs ORDER BY created_at DESC LIMIT 20').all();

    return NextResponse.json({
      success: true,
      providers,
      models,
      settings,
      users,
      recentAudit,
    });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const db = getDatabase();
    const body = await req.json();

    if (body.provider_id) {
      db.prepare(`
        UPDATE provider_accounts
        SET is_active = COALESCE(?, is_active),
            current_balance = COALESCE(?, current_balance)
        WHERE id = ?
      `).run(body.is_active !== undefined ? (body.is_active ? 1 : 0) : null, body.current_balance, body.provider_id);
    }

    return NextResponse.json({ success: true, message: 'Settings saved' });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
