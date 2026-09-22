import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '@/lib/db/database';
import { VoiceoverEngine } from '@/lib/audio/voiceover-engine';
import { Property } from '@/lib/types';

export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const db = getDb();
    const projectId = params.id;
    const body = await req.json();
    const { action, language, scriptText, voiceId } = body; // action: 'generate_script' | 'synthesize'

    const project = db.prepare('SELECT * FROM projects WHERE id = ?').get(projectId) as any;
    if (!project) return NextResponse.json({ error: 'Project not found' }, { status: 404 });

    const property = db.prepare('SELECT * FROM properties WHERE id = ?').get(project.property_id) as Property;

    if (action === 'generate_script') {
      const script = VoiceoverEngine.generateScript(property, language || 'en');
      return NextResponse.json({ success: true, script, language: language || 'en' });
    }

    if (action === 'synthesize') {
      const targetScript = scriptText || VoiceoverEngine.generateScript(property, language || 'en');
      const synthResult = await VoiceoverEngine.synthesizeSpeech(targetScript, language || 'en', voiceId || 'voice_lux_01');
      const now = new Date().toISOString();
      const voId = `vo_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`;

      db.prepare(`
        INSERT INTO voiceovers (id, project_id, language, script_text, voice_id, audio_path, duration_seconds, status, created_at)
        VALUES (?, ?, ?, ?, ?, ?, ?, 'ready', ?)
        ON CONFLICT(project_id) DO UPDATE SET
          language = excluded.language,
          script_text = excluded.script_text,
          voice_id = excluded.voice_id,
          audio_path = excluded.audio_path,
          duration_seconds = excluded.duration_seconds,
          status = 'ready'
      `).run(
        voId,
        projectId,
        language || 'en',
        targetScript,
        voiceId || 'voice_lux_01',
        synthResult.audioPath,
        synthResult.duration,
        now
      );

      db.prepare('UPDATE projects SET voiceover_id = ?, updated_at = ? WHERE id = ?').run(voId, now, projectId);

      return NextResponse.json({
        success: true,
        voiceover: {
          id: voId,
          audio_path: synthResult.audioPath,
          duration_seconds: synthResult.duration,
          script_text: targetScript,
          language: language || 'en',
        },
      });
    }

    return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
  } catch (error: any) {
    return NextResponse.json({ error: error?.message }, { status: 500 });
  }
}
