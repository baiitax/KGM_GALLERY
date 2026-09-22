import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '@/lib/db/database';
import { ImageAnalysisService } from '@/lib/ai/image-analysis';
import { StoryboardAssistant } from '@/lib/ai/storyboard-assistant';
import { PropertyImage } from '@/lib/types';

export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const db = getDb();
    const projectId = params.id;
    const now = new Date().toISOString();

    const images = db.prepare('SELECT * FROM property_images WHERE project_id = ? ORDER BY sort_order ASC').all(projectId) as PropertyImage[];
    if (images.length === 0) {
      return NextResponse.json({ error: 'No images found in project' }, { status: 400 });
    }

    const analyzedImages = [];

    for (const img of images) {
      const analysis = ImageAnalysisService.analyzeImage({
        filename: img.original_filename,
        categoryHint: img.category,
        fileSize: img.file_size,
      });

      // Update image
      db.prepare(`
        UPDATE property_images
        SET category = ?, analysis_status = 'completed', analysis_json = ?
        WHERE id = ?
      `).run(analysis.category, JSON.stringify(analysis), img.id);

      // Upsert image_analysis
      db.prepare(`
        INSERT INTO image_analysis (
          id, image_id, category, confidence, dominant_feature, camera_direction,
          foreground, midground, background, depth_score, lighting_condition,
          visual_quality, orientation, perspective, architectural_sensitivity,
          reflective_surfaces, fragile_objects, has_text, has_faces, generation_risk,
          recommended_motion, recommended_lens, suggested_duration, raw_json, created_at
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        ON CONFLICT(image_id) DO UPDATE SET
          category = excluded.category,
          confidence = excluded.confidence,
          dominant_feature = excluded.dominant_feature,
          camera_direction = excluded.camera_direction,
          foreground = excluded.foreground,
          midground = excluded.midground,
          background = excluded.background,
          depth_score = excluded.depth_score,
          lighting_condition = excluded.lighting_condition,
          recommended_motion = excluded.recommended_motion,
          recommended_lens = excluded.recommended_lens,
          suggested_duration = excluded.suggested_duration,
          raw_json = excluded.raw_json
      `).run(
        `ana_${img.id}`,
        img.id,
        analysis.category,
        analysis.confidence,
        analysis.dominant_feature,
        analysis.camera_direction,
        analysis.foreground,
        analysis.midground,
        analysis.background,
        analysis.depth_score,
        analysis.lighting_condition,
        analysis.visual_quality,
        analysis.orientation,
        analysis.perspective,
        analysis.architectural_sensitivity,
        analysis.reflective_surfaces,
        analysis.fragile_objects,
        analysis.has_text ? 1 : 0,
        analysis.has_faces ? 1 : 0,
        analysis.generation_risk,
        analysis.recommended_motion,
        analysis.recommended_lens,
        analysis.suggested_duration,
        JSON.stringify(analysis),
        now
      );

      analyzedImages.push({
        ...img,
        category: analysis.category,
        analysis,
      });
    }

    // Update project status
    db.prepare(`UPDATE projects SET status = 'storyboard_ready', updated_at = ? WHERE id = ?`).run(now, projectId);

    const summary = StoryboardAssistant.generateDirectorSummary(
      analyzedImages as any,
      analyzedImages.length,
      analyzedImages.length * 10
    );

    return NextResponse.json({
      success: true,
      analyzedImagesCount: analyzedImages.length,
      directorSummary: summary,
    });
  } catch (error: any) {
    console.error('Batch image analysis error:', error);
    return NextResponse.json({ error: error?.message }, { status: 500 });
  }
}
