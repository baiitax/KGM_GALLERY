import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '@/lib/db/database';
import { StoryboardAssistant } from '@/lib/ai/storyboard-assistant';
import { CinematicDirectorEngine } from '@/lib/ai/director-engine';
import { ImageAnalysisService } from '@/lib/ai/image-analysis';
import { MotionPreset, Project, Property, PropertyImage } from '@/lib/types';

export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const db = getDb();
    const projectId = params.id;
    const now = new Date().toISOString();

    const project = db.prepare('SELECT * FROM projects WHERE id = ?').get(projectId) as Project | undefined;
    if (!project) return NextResponse.json({ error: 'Project not found' }, { status: 404 });

    const property = db.prepare('SELECT * FROM properties WHERE id = ?').get(project.property_id) as Property | undefined;
    const presets = db.prepare('SELECT * FROM motion_presets WHERE is_active = 1').all() as MotionPreset[];
    
    let images = db.prepare('SELECT * FROM property_images WHERE project_id = ? AND is_optional = 0 ORDER BY sort_order ASC').all(projectId) as PropertyImage[];
    if (images.length === 0) {
      return NextResponse.json({ error: 'No images available to create storyboard' }, { status: 400 });
    }

    // Auto-Arrange image sequence
    images = StoryboardAssistant.autoArrangeImages(images);

    // Update image sort orders in DB
    images.forEach((img, idx) => {
      db.prepare('UPDATE property_images SET sort_order = ? WHERE id = ?').run(idx + 1, img.id);
    });

    // Delete non-locked old shots to recreate fresh storyboard
    db.prepare('DELETE FROM cinematic_shots WHERE project_id = ? AND status != "locked"').run(projectId);

    const createdShots = [];

    for (let i = 0; i < images.length; i++) {
      const img = images[i];
      let analysisData = img.analysis_json ? JSON.parse(img.analysis_json) : null;
      if (!analysisData) {
        analysisData = ImageAnalysisService.analyzeImage({ filename: img.original_filename, categoryHint: img.category });
      }

      const shotSpec = CinematicDirectorEngine.createShotSpecification(
        analysisData,
        presets,
        i + 1,
        images.length,
        property?.property_name,
        project.cinematic_style
      );

      const shotId = `shot_${projectId.replace('proj_', '')}_${i + 1}`;

      db.prepare(`
        INSERT INTO cinematic_shots (
          id, project_id, image_id, shot_number, category, motion_preset_id,
          camera_direction, camera_speed, lens, duration, motion_intensity,
          prompt, negative_prompt, status, approved_generation_id,
          transition_type, caption_text, sort_order, created_at, updated_at
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'pending', null, ?, ?, ?, ?, ?)
      `).run(
        shotId,
        projectId,
        img.id,
        i + 1,
        shotSpec.category,
        shotSpec.motionPresetId,
        shotSpec.cameraDirection,
        shotSpec.cameraSpeed,
        shotSpec.lens,
        project.default_duration || 10,
        shotSpec.motionIntensity,
        shotSpec.prompt,
        shotSpec.negativePrompt,
        shotSpec.transitionType,
        shotSpec.captionText,
        i + 1,
        now,
        now
      );

      createdShots.push({
        id: shotId,
        shot_number: i + 1,
        ...shotSpec,
        image: img,
      });
    }

    db.prepare(`UPDATE projects SET status = 'storyboard_ready', updated_at = ? WHERE id = ?`).run(now, projectId);

    return NextResponse.json({
      success: true,
      message: `Cinematic storyboard created with ${createdShots.length} shots.`,
      shots: createdShots,
    });
  } catch (error: any) {
    console.error('Storyboard generation error:', error);
    return NextResponse.json({ error: error?.message }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const db = getDb();
    const projectId = params.id;
    const body = await req.json();
    const now = new Date().toISOString();

    // Handle batch shots reordering or updates
    if (Array.isArray(body.shots)) {
      for (let i = 0; i < body.shots.length; i++) {
        const s = body.shots[i];
        db.prepare(`
          UPDATE cinematic_shots
          SET sort_number = ?, shot_number = ?, duration = coalesce(?, duration),
              motion_preset_id = coalesce(?, motion_preset_id),
              camera_direction = coalesce(?, camera_direction),
              transition_type = coalesce(?, transition_type),
              caption_text = coalesce(?, caption_text),
              prompt = coalesce(?, prompt),
              negative_prompt = coalesce(?, negative_prompt),
              status = coalesce(?, status),
              updated_at = ?
          WHERE id = ? AND project_id = ?
        `).run(
          i + 1,
          i + 1,
          s.duration || null,
          s.motion_preset_id || null,
          s.camera_direction || null,
          s.transition_type || null,
          s.caption_text || null,
          s.prompt || null,
          s.negative_prompt || null,
          s.status || null,
          now,
          s.id,
          projectId
        );
      }
      return NextResponse.json({ success: true, message: 'Storyboard updated' });
    }

    // Single shot update
    if (body.shotId) {
      const s = body;
      const updates: string[] = [];
      const values: any[] = [];

      if (s.duration !== undefined) { updates.push('duration = ?'); values.push(Number(s.duration)); }
      if (s.motion_preset_id !== undefined) { updates.push('motion_preset_id = ?'); values.push(s.motion_preset_id); }
      if (s.camera_direction !== undefined) { updates.push('camera_direction = ?'); values.push(s.camera_direction); }
      if (s.camera_speed !== undefined) { updates.push('camera_speed = ?'); values.push(s.camera_speed); }
      if (s.lens !== undefined) { updates.push('lens = ?'); values.push(s.lens); }
      if (s.motion_intensity !== undefined) { updates.push('motion_intensity = ?'); values.push(Number(s.motion_intensity)); }
      if (s.prompt !== undefined) { updates.push('prompt = ?'); values.push(s.prompt); }
      if (s.negative_prompt !== undefined) { updates.push('negative_prompt = ?'); values.push(s.negative_prompt); }
      if (s.transition_type !== undefined) { updates.push('transition_type = ?'); values.push(s.transition_type); }
      if (s.caption_text !== undefined) { updates.push('caption_text = ?'); values.push(s.caption_text); }
      if (s.status !== undefined) { updates.push('status = ?'); values.push(s.status); }

      if (updates.length > 0) {
        updates.push('updated_at = ?');
        values.push(now);
        values.push(s.shotId);
        values.push(projectId);
        db.prepare(`UPDATE cinematic_shots SET ${updates.join(', ')} WHERE id = ? AND project_id = ?`).run(...values);
      }
      return NextResponse.json({ success: true, message: 'Shot updated' });
    }

    return NextResponse.json({ error: 'No update payload provided' }, { status: 400 });
  } catch (error: any) {
    return NextResponse.json({ error: error?.message }, { status: 500 });
  }
}
