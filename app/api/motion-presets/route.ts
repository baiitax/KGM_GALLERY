import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '@/lib/db/database';

export async function GET() {
  try {
    const db = getDb();
    const presets = db.prepare('SELECT * FROM motion_presets ORDER BY is_custom ASC, name ASC').all();
    return NextResponse.json({ presets });
  } catch (error: any) {
    return NextResponse.json({ error: error?.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const db = getDb();
    const body = await req.json();
    const now = new Date().toISOString();
    const id = `mot_custom_${Date.now()}`;
    const key = body.name.toLowerCase().replace(/[^a-z0-9]+/g, '_');

    db.prepare(`
      INSERT INTO motion_presets (
        id, key, name, description, best_for, risk_level, direction, speed,
        default_duration, default_lens, motion_intensity, parallax_intensity,
        environmental_motion, stability_req, preferred_model, fallback_model,
        prompt_template, negative_prompt, is_active, is_custom, created_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 1, 1, ?)
    `).run(
      id,
      key,
      body.name || 'Custom Motion',
      body.description || 'Custom cinematic choreography',
      body.best_for || 'Specialty Architecture',
      body.risk_level || 'low',
      body.direction || 'left_to_right',
      body.speed || 'slow',
      Number(body.default_duration) || 10,
      body.default_lens || '28mm',
      Number(body.motion_intensity) || 0.22,
      Number(body.parallax_intensity) || 0.35,
      body.environmental_motion || 'subtle_ambient_light',
      body.stability_req || 'strict',
      body.preferred_model || 'runway_gen3_alpha',
      body.fallback_model || 'kgm_neural_render',
      body.prompt_template || 'Slow controlled cinematic camera motion preserving architectural lines.',
      body.negative_prompt || 'morphing, warping walls, jitter, blur.',
      now
    );

    const created = db.prepare('SELECT * FROM motion_presets WHERE id = ?').get(id);
    return NextResponse.json({ success: true, preset: created });
  } catch (error: any) {
    return NextResponse.json({ error: error?.message }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const db = getDb();
    const body = await req.json();
    const { id, ...updates } = body;
    if (!id) return NextResponse.json({ error: 'Preset ID required' }, { status: 400 });

    const fields: string[] = [];
    const values: any[] = [];

    for (const [k, v] of Object.entries(updates)) {
      if (v !== undefined) {
        fields.push(`${k} = ?`);
        values.push(typeof v === 'boolean' ? (v ? 1 : 0) : v);
      }
    }

    if (fields.length > 0) {
      values.push(id);
      db.prepare(`UPDATE motion_presets SET ${fields.join(', ')} WHERE id = ?`).run(...values);
    }

    const updated = db.prepare('SELECT * FROM motion_presets WHERE id = ?').get(id);
    return NextResponse.json({ success: true, preset: updated });
  } catch (error: any) {
    return NextResponse.json({ error: error?.message }, { status: 500 });
  }
}
