import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '@/lib/db/database';

export async function GET() {
  try {
    const db = getDb();
    const providersRaw = db.prepare('SELECT * FROM provider_accounts ORDER BY priority ASC').all() as any[];
    const providers = providersRaw.map(p => {
      const models = db.prepare('SELECT * FROM provider_models WHERE provider_id = ?').all(p.id);
      return {
        ...p,
        models,
      };
    });

    const settings = db.prepare('SELECT * FROM system_settings').all();

    return NextResponse.json({ providers, settings });
  } catch (error: any) {
    return NextResponse.json({ error: error?.message }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const db = getDb();
    const body = await req.json();
    const { providerId, isActive, priority, apiKeyConfigured, routingTier } = body;

    if (providerId) {
      if (isActive !== undefined) {
        db.prepare('UPDATE provider_accounts SET is_active = ? WHERE id = ?').run(isActive ? 1 : 0, providerId);
      }
      if (priority !== undefined) {
        db.prepare('UPDATE provider_accounts SET priority = ? WHERE id = ?').run(Number(priority), providerId);
      }
      if (apiKeyConfigured !== undefined) {
        db.prepare('UPDATE provider_accounts SET api_key_configured = ? WHERE id = ?').run(apiKeyConfigured ? 1 : 0, providerId);
      }
    }

    if (routingTier) {
      db.prepare("UPDATE system_settings SET value = ?, updated_at = datetime('now') WHERE key = 'default_model_routing'").run(routingTier);
    }

    return NextResponse.json({ success: true, message: 'Provider settings updated' });
  } catch (error: any) {
    return NextResponse.json({ error: error?.message }, { status: 500 });
  }
}
