import { NextResponse } from 'next/server';
import { getDatabase } from '@/lib/db';

export async function POST(req: Request) {
  try {
    const db = getDatabase();
    const body = await req.json();
    const now = new Date().toISOString();
    const auditId = `lead_${Date.now()}`;

    // Record lead / inquiry in audit logs or notification stream
    db.prepare(`
      INSERT INTO audit_logs (id, user_id, action, entity_type, entity_id, ip_address, created_at)
      VALUES (?, 'client_portal', 'lead_inquiry_submitted', 'property_lead', ?, ?, ?)
    `).run(
      auditId,
      body.property_id || 'unknown_property',
      body.email || 'client@example.com',
      now
    );

    return NextResponse.json({
      success: true,
      message: 'Thank you. A KGM Private Client Advisor has received your inquiry and will contact you confidentially.',
      reference_id: auditId,
    });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
