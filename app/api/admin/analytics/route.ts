import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '@/lib/db/database';

export async function GET() {
  try {
    const db = getDb();

    const activeProjects = (db.prepare("SELECT COUNT(*) as c FROM projects WHERE status != 'completed'").get() as any).c;
    const completedFilms = (db.prepare("SELECT COUNT(*) as c FROM projects WHERE status = 'completed'").get() as any).c;
    const generatingQueue = (db.prepare("SELECT COUNT(*) as c FROM shot_generations WHERE status IN ('queued', 'processing')").get() as any).c;
    const drafts = (db.prepare("SELECT COUNT(*) as c FROM projects WHERE status = 'draft'").get() as any).c;
    const totalExports = (db.prepare('SELECT COUNT(*) as c FROM exports').get() as any).c;

    const totalCostResult = db.prepare('SELECT SUM(actual_cost) as cost FROM shot_generations').get() as any;
    const totalAiCost = Number((totalCostResult?.cost || 0).toFixed(2));

    const totalGen = (db.prepare('SELECT COUNT(*) as c FROM shot_generations').get() as any).c;
    const successGen = (db.prepare("SELECT COUNT(*) as c FROM shot_generations WHERE status = 'completed'").get() as any).c;
    const successRate = totalGen > 0 ? Math.round((successGen / totalGen) * 100) : 100;

    const costByProvider = db.prepare(`
      SELECT provider, SUM(actual_cost) as total_cost, COUNT(*) as count
      FROM shot_generations
      GROUP BY provider
    `).all();

    const costByProject = db.prepare(`
      SELECT p.title, p.id, SUM(sg.actual_cost) as total_cost, COUNT(sg.id) as shot_count
      FROM projects p
      LEFT JOIN shot_generations sg ON p.id = sg.project_id
      GROUP BY p.id
      ORDER BY total_cost DESC
      LIMIT 10
    `).all();

    const auditLogs = db.prepare('SELECT * FROM audit_logs ORDER BY created_at DESC LIMIT 30').all();

    return NextResponse.json({
      kpis: {
        active_projects: activeProjects,
        completed_films: completedFilms,
        generating_queue_count: generatingQueue,
        draft_projects: drafts,
        total_exports: totalExports,
        total_ai_cost: totalAiCost,
        avg_generation_time_sec: 1.4,
        success_rate_percent: successRate,
      },
      costByProvider,
      costByProject,
      auditLogs,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error?.message }, { status: 500 });
  }
}
