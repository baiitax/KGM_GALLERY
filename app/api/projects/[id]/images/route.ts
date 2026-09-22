import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '@/lib/db/database';
import { ImageAnalysisService } from '@/lib/ai/image-analysis';
import path from 'path';
import fs from 'fs';

export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const db = getDb();
    const projectId = params.id;
    const now = new Date().toISOString();

    const uploadDir = path.join(process.cwd(), 'public', 'uploads');
    if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

    // Handle formData
    const formData = await req.formData();
    const files = formData.getAll('files') as File[];
    const categoryHint = (formData.get('category') as string) || '';

    if (!files || files.length === 0) {
      return NextResponse.json({ error: 'No files provided' }, { status: 400 });
    }

    const currentCount = (db.prepare('SELECT COUNT(*) as c FROM property_images WHERE project_id = ?').get(projectId) as { c: number }).c;
    const addedImages = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const buffer = Buffer.from(await file.arrayBuffer());
      const ext = path.extname(file.name) || '.jpg';
      const safeName = `img_${Date.now()}_${Math.random().toString(36).substring(2, 6)}${ext}`;
      const filePath = path.join(uploadDir, safeName);
      const publicPath = `/uploads/${safeName}`;

      fs.writeFileSync(filePath, buffer);

      const imageId = `img_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`;
      const sortOrder = currentCount + i + 1;

      // Run AI Image Analysis
      const analysis = ImageAnalysisService.analyzeImage({
        filename: file.name,
        categoryHint,
        fileSize: buffer.length,
      });

      // Insert Property Image
      db.prepare(`
        INSERT INTO property_images (
          id, project_id, storage_path, original_filename, mime_type, width, height,
          file_size, sort_order, category, analysis_status, analysis_json, is_cover,
          is_locked, is_optional, rotation, created_at
        ) VALUES (?, ?, ?, ?, ?, 1920, 1080, ?, ?, ?, 'completed', ?, ?, 0, 0, 0, ?)
      `).run(
        imageId,
        projectId,
        publicPath,
        file.name,
        file.type || 'image/jpeg',
        buffer.length,
        sortOrder,
        analysis.category,
        JSON.stringify(analysis),
        currentCount === 0 && i === 0 ? 1 : 0,
        now
      );

      // Insert Image Analysis
      db.prepare(`
        INSERT INTO image_analysis (
          id, image_id, category, confidence, dominant_feature, camera_direction,
          foreground, midground, background, depth_score, lighting_condition,
          visual_quality, orientation, perspective, architectural_sensitivity,
          reflective_surfaces, fragile_objects, has_text, has_faces, generation_risk,
          recommended_motion, recommended_lens, suggested_duration, raw_json, created_at
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `).run(
        `ana_${imageId}`,
        imageId,
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

      addedImages.push({
        id: imageId,
        storage_path: publicPath,
        original_filename: file.name,
        category: analysis.category,
        sort_order: sortOrder,
        analysis,
      });
    }

    // Update project cover image if not set
    const proj = db.prepare('SELECT cover_image_url FROM projects WHERE id = ?').get(projectId) as any;
    if (!proj?.cover_image_url && addedImages.length > 0) {
      db.prepare('UPDATE projects SET cover_image_url = ? WHERE id = ?').run(addedImages[0].storage_path, projectId);
    }

    return NextResponse.json({ success: true, addedImages });
  } catch (error: any) {
    console.error('Image upload failed:', error);
    return NextResponse.json({ error: error?.message }, { status: 500 });
  }
}

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const db = getDb();
    const images = db.prepare(`
      SELECT pi.*, ia.confidence, ia.dominant_feature, ia.recommended_motion
      FROM property_images pi
      LEFT JOIN image_analysis ia ON pi.id = ia.image_id
      WHERE pi.project_id = ?
      ORDER BY pi.sort_order ASC
    `).all(params.id);

    return NextResponse.json({ images });
  } catch (error: any) {
    return NextResponse.json({ error: error?.message }, { status: 500 });
  }
}
