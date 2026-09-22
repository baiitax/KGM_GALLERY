import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '@/lib/db/database';
import { ImageAnalysisService } from '@/lib/ai/image-analysis';

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string; imageId: string } }
) {
  try {
    const db = getDb();
    const { id: projectId, imageId } = params;
    const body = await req.json();

    const updates: string[] = [];
    const values: any[] = [];

    if (body.is_cover !== undefined) {
      if (body.is_cover) {
        // Clear previous cover for project
        db.prepare('UPDATE property_images SET is_cover = 0 WHERE project_id = ?').run(projectId);
        const img = db.prepare('SELECT storage_path FROM property_images WHERE id = ?').get(imageId) as any;
        if (img) {
          db.prepare('UPDATE projects SET cover_image_url = ? WHERE id = ?').run(img.storage_path, projectId);
        }
      }
      updates.push('is_cover = ?');
      values.push(body.is_cover ? 1 : 0);
    }

    if (body.is_locked !== undefined) {
      updates.push('is_locked = ?');
      values.push(body.is_locked ? 1 : 0);
    }

    if (body.is_optional !== undefined) {
      updates.push('is_optional = ?');
      values.push(body.is_optional ? 1 : 0);
    }

    if (body.rotation !== undefined) {
      updates.push('rotation = ?');
      values.push(Number(body.rotation) % 360);
    }

    if (body.category !== undefined) {
      updates.push('category = ?');
      values.push(body.category);

      // Re-run analysis for updated category
      const img = db.prepare('SELECT * FROM property_images WHERE id = ?').get(imageId) as any;
      if (img) {
        const reAnalysis = ImageAnalysisService.analyzeImage({
          filename: img.original_filename,
          categoryHint: body.category,
        });

        db.prepare(`
          UPDATE image_analysis
          SET category = ?, dominant_feature = ?, camera_direction = ?,
              depth_score = ?, recommended_motion = ?, recommended_lens = ?,
              raw_json = ?
          WHERE image_id = ?
        `).run(
          reAnalysis.category,
          reAnalysis.dominant_feature,
          reAnalysis.camera_direction,
          reAnalysis.depth_score,
          reAnalysis.recommended_motion,
          reAnalysis.recommended_lens,
          JSON.stringify(reAnalysis),
          imageId
        );
      }
    }

    if (body.sort_order !== undefined) {
      updates.push('sort_order = ?');
      values.push(Number(body.sort_order));
    }

    if (updates.length > 0) {
      values.push(imageId);
      db.prepare(`UPDATE property_images SET ${updates.join(', ')} WHERE id = ?`).run(...values);
    }

    return NextResponse.json({ success: true, message: 'Image updated' });
  } catch (error: any) {
    return NextResponse.json({ error: error?.message }, { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string; imageId: string } }
) {
  try {
    const db = getDb();
    const { id: projectId, imageId } = params;

    db.prepare('DELETE FROM property_images WHERE id = ? AND project_id = ?').run(imageId, projectId);
    db.prepare('DELETE FROM cinematic_shots WHERE image_id = ?').run(imageId);

    return NextResponse.json({ success: true, message: 'Image deleted' });
  } catch (error: any) {
    return NextResponse.json({ error: error?.message }, { status: 500 });
  }
}
