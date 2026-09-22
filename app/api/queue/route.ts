import { NextResponse } from 'next/server';
import { getDatabase } from '@/lib/db';

export async function GET() {
  try {
    const db = getDatabase();
    const activeJobs = db.prepare(`
      SELECT sg.*, cs.category as shot_name, cs.shot_number as sequence_order, p.title as project_title, pi.storage_path as source_image
      FROM shot_generations sg
      JOIN cinematic_shots cs ON sg.shot_id = cs.id
      JOIN projects p ON sg.project_id = p.id
      LEFT JOIN property_images pi ON cs.image_id = pi.id
      ORDER BY sg.created_at DESC
      LIMIT 50
    `).all();

    const renderJobs = db.prepare(`
      SELECT rj.*, p.title as project_title
      FROM render_jobs rj
      JOIN projects p ON rj.project_id = p.id
      ORDER BY rj.created_at DESC
      LIMIT 20
    `).all();

    const stats = {
      totalGenerations: db.prepare('SELECT COUNT(*) as count FROM shot_generations').get() as { count: number },
      completedGenerations: db.prepare("SELECT COUNT(*) as count FROM shot_generations WHERE status = 'completed'").get() as { count: number },
      failedGenerations: db.prepare("SELECT COUNT(*) as count FROM shot_generations WHERE status = 'failed'").get() as { count: number },
      totalRenders: db.prepare('SELECT COUNT(*) as count FROM render_jobs').get() as { count: number },
      totalCostUsd: db.prepare('SELECT SUM(actual_cost) as cost FROM shot_generations').get() as { cost: number },
    };

    return NextResponse.json({
      success: true,
      activeJobs,
      renderJobs,
      stats: {
        totalGenerations: stats.totalGenerations.count || 0,
        completedGenerations: stats.completedGenerations.count || 0,
        failedGenerations: stats.failedGenerations.count || 0,
        totalRenders: stats.totalRenders.count || 0,
        totalCostUsd: stats.totalCostUsd.cost || 0.05,
      },
    });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
