import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '@/lib/db/database';
import { FilmDirectorReviewEngine } from '@/lib/ai/film-director-review';
import { BrandProfile, CinematicShot, Project, Property } from '@/lib/types';

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const db = getDb();
    const projectId = params.id;

    const project = db.prepare('SELECT * FROM projects WHERE id = ?').get(projectId) as Project | undefined;
    if (!project) return NextResponse.json({ error: 'Project not found' }, { status: 404 });

    const property = db.prepare('SELECT * FROM properties WHERE id = ?').get(project.property_id) as Property | undefined;
    const shots = db.prepare('SELECT * FROM cinematic_shots WHERE project_id = ? ORDER BY sort_order ASC').all(projectId) as CinematicShot[];
    const brandProfile = db.prepare('SELECT * FROM brand_profiles WHERE id = ?').get(project.brand_profile_id || 'brand_kgm_default') as BrandProfile | undefined;

    const qcReport = FilmDirectorReviewEngine.evaluateProject({
      project,
      property,
      shots,
      brandProfile,
      hasMusic: Boolean(project.music_track_id),
      hasVoiceover: Boolean(project.voiceover_id),
    });

    return NextResponse.json({ qcReport });
  } catch (error: any) {
    return NextResponse.json({ error: error?.message }, { status: 500 });
  }
}
