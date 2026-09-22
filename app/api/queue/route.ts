import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '@/lib/db/database';

export async function GET() {
  try {
    const db = getDb();
    const queueJobs = db.prepare(`
      SELECT sg.*, cs.shot_number, cs.category, cs.prompt as shot_prompt,
             p.title as project_title, p.id as project_id
      FROM shot_generations sg
      LEFT JOIN cinematic_shots cs ON sg.shot_id = cs.id
      LEFT JOIN projects p ON sg.project_id = p.id
      ORDER BY sg.created_at DESC
      LIMIT 50
    `).all();

    const activeCount = (db.prepare(`
      SELECT COUNT(*) as c FROM shot_generations WHERE status IN ('queued', 'processing')
    `).get() as { c: number }).c;

    const completedCount = (db.prepare(`
      SELECT COUNT(*) as c FROM shot_generations WHERE status = 'completed'
    `).get() as { c: number }).c;

    const failedCount = (db.prepare(`
      SELECT COUNT(*) as c FROM shot_generations WHERE status = 'failed'
    `).get() as { c: number }).c;

    return NextResponse.json({
      queueJobs,
      activeCount,
      completedCount,
      failedCount,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error?.message }, { status: 500 });
  }
}
