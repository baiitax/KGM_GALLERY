import { NextResponse } from 'next/server';
import { getDatabase } from '@/lib/db';

export async function GET() {
  try {
    const db = getDatabase();
    const brand = db.prepare('SELECT * FROM brand_profiles WHERE is_default = 1 LIMIT 1').get();
    return NextResponse.json({ success: true, brand });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const db = getDatabase();
    const body = await req.json();
    const now = new Date().toISOString();

    db.prepare(`
      UPDATE brand_profiles
      SET company_name = COALESCE(?, company_name),
          tagline = COALESCE(?, tagline),
          primary_color = COALESCE(?, primary_color),
          secondary_color = COALESCE(?, secondary_color),
          accent_color = COALESCE(?, accent_color),
          font_heading = COALESCE(?, font_heading),
          font_body = COALESCE(?, font_body),
          show_intro_card = COALESCE(?, show_intro_card),
          show_outro_card = COALESCE(?, show_outro_card),
          intro_duration_seconds = COALESCE(?, intro_duration_seconds),
          outro_duration_seconds = COALESCE(?, outro_duration_seconds),
          watermark_enabled = COALESCE(?, watermark_enabled),
          updated_at = ?
      WHERE is_default = 1
    `).run(
      body.company_name,
      body.tagline,
      body.primary_color,
      body.secondary_color,
      body.accent_color,
      body.font_heading,
      body.font_body,
      body.show_intro_card ? 1 : 0,
      body.show_outro_card ? 1 : 0,
      body.intro_duration_seconds,
      body.outro_duration_seconds,
      body.watermark_enabled ? 1 : 0,
      now
    );

    const updated = db.prepare('SELECT * FROM brand_profiles WHERE is_default = 1 LIMIT 1').get();
    return NextResponse.json({ success: true, brand: updated });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
