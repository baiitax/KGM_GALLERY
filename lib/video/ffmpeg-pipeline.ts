import path from 'path';
import fs from 'fs';
import { exec } from 'child_process';
import util from 'util';
import { BrandProfile, CinematicShot, ExportItem, Project, Property, RenderJob, RenderStep } from '../types';
import Database from 'better-sqlite3';

const execPromise = util.promisify(exec);

export interface VideoAssemblyParams {
  projectId: string;
  renderJobId: string;
  project: Project;
  property?: Property;
  shots: (CinematicShot & { videoPath: string })[];
  brandProfile: BrandProfile;
  musicTrackPath?: string;
  voiceoverPath?: string;
  onProgress?: (progress: number, step: RenderStep, stepNumber: number) => void;
}

export class VideoAssemblyPipeline {
  public static async assembleAndRender(params: VideoAssemblyParams, db: Database.Database): Promise<RenderJob> {
    const { projectId, renderJobId, project, property, shots, brandProfile, musicTrackPath, voiceoverPath, onProgress } = params;

    const rendersDir = path.join(process.cwd(), 'public', 'renders');
    const exportsDir = path.join(process.cwd(), 'public', 'exports');
    const thumbsDir = path.join(process.cwd(), 'public', 'thumbnails');
    const tempDir = path.join(process.cwd(), 'public', 'temp', renderJobId);

    [rendersDir, exportsDir, thumbsDir, tempDir].forEach(d => {
      if (!fs.existsSync(d)) fs.mkdirSync(d, { recursive: true });
    });

    const updateJob = (progress: number, step: RenderStep, stepNumber: number) => {
      onProgress?.(progress, step, stepNumber);
      try {
        db.prepare(`
          UPDATE render_jobs
          SET progress = ?, current_step = ?, step_number = ?, updated_at = datetime('now')
          WHERE id = ?
        `).run(progress, step, stepNumber, renderJobId);
      } catch (e) {}
    };

    try {
      updateJob(10, 'normalizing_assets', 1);

      // 1. Prepare and normalize all input shot videos
      const normalizedVideoPaths: string[] = [];

      for (let i = 0; i < shots.length; i++) {
        const shot = shots[i];
        let shotVideo = shot.videoPath;
        if (shotVideo.startsWith('/')) {
          shotVideo = path.join(process.cwd(), 'public', shotVideo.replace(/^\//, ''));
        }

        const normalizedOut = path.join(tempDir, `norm_shot_${i + 1}.mp4`);

        // If file doesn't exist, generate a quick 10s shot from image
        if (!fs.existsSync(shotVideo)) {
          let imgSrc = shot.image?.storage_path || '/uploads/villa_01_hero_exterior.jpg';
          if (imgSrc.startsWith('/')) imgSrc = path.join(process.cwd(), 'public', imgSrc.replace(/^\//, ''));
          await execPromise(`ffmpeg -y -loop 1 -i "${imgSrc}" -t ${shot.duration || 10} -vf "scale=1920:1080:force_original_aspect_ratio=increase,crop=1920:1080,fps=30" -c:v libx264 -pix_fmt yuv420p "${normalizedOut}"`);
        } else {
          // Normalize to exactly 1920x1080 30fps
          await execPromise(`ffmpeg -y -i "${shotVideo}" -vf "scale=1920:1080:force_original_aspect_ratio=increase,crop=1920:1080,fps=30" -c:v libx264 -pix_fmt yuv420p "${normalizedOut}"`);
        }

        normalizedVideoPaths.push(normalizedOut);
      }

      updateJob(25, 'building_transitions', 2);

      // 2. Concatenate shots with seamless cross-dissolves or cuts
      const concatListFile = path.join(tempDir, 'concat_list.txt');
      const concatContent = normalizedVideoPaths.map(p => `file '${p}'`).join('\n');
      fs.writeFileSync(concatListFile, concatContent);

      const rawSequencePath = path.join(tempDir, 'raw_sequence.mp4');
      await execPromise(`ffmpeg -y -f concat -safe 0 -i "${concatListFile}" -c copy "${rawSequencePath}"`);

      updateJob(45, 'rendering_brand_overlays', 3);

      // 3. Create Opening Title Card Video (3 seconds)
      const openingCardPath = path.join(tempDir, 'opening_card.mp4');
      const propTitle = (property?.property_name || project.title || 'KGM LUXURY RESIDENCE').toUpperCase();
      const objText = (property?.marketing_objective || 'FOR SALE').toUpperCase();
      const locText = (property?.location || 'Riyadh, Saudi Arabia').toUpperCase();

      const openSvg = `
      <svg width="1920" height="1080" viewBox="0 0 1920 1080" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="bgG" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#061D15" />
            <stop offset="50%" stop-color="#0B2B20" />
            <stop offset="100%" stop-color="#04120D" />
          </linearGradient>
          <linearGradient id="goldG" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#FDF3CF" />
            <stop offset="50%" stop-color="#D4AF37" />
            <stop offset="100%" stop-color="#A27D16" />
          </linearGradient>
        </defs>
        <rect width="1920" height="1080" fill="url(#bgG)" />
        <rect x="80" y="80" width="1760" height="920" fill="none" stroke="url(#goldG)" stroke-width="1.5" opacity="0.3" />
        
        <!-- Crest -->
        <g transform="translate(910, 260)">
          <polygon points="50,0 90,25 90,75 50,100 10,75 10,25" fill="#0B2B20" stroke="url(#goldG)" stroke-width="2.5" />
          <text x="50" y="60" font-family="serif" font-size="28" font-weight="bold" fill="url(#goldG)" text-anchor="middle">KGM</text>
        </g>

        <!-- Subtitle -->
        <text x="960" y="440" font-family="sans-serif" font-size="18" font-weight="600" fill="#C5A869" letter-spacing="8" text-anchor="middle">
          ${objText} • KURRA GREENFIELD MERCHANTS
        </text>

        <!-- Main Title -->
        <text x="960" y="520" font-family="serif" font-size="48" font-weight="700" fill="#FFFFFF" letter-spacing="3" text-anchor="middle">
          ${propTitle.replace(/&/g, '&amp;')}
        </text>

        <!-- Location -->
        <text x="960" y="580" font-family="sans-serif" font-size="20" font-weight="400" fill="#E8E2D5" letter-spacing="4" text-anchor="middle" opacity="0.9">
          ${locText.replace(/&/g, '&amp;')}
        </text>

        <line x1="860" y1="630" x2="1060" y2="630" stroke="url(#goldG)" stroke-width="2" />
      </svg>`;

      const openSvgPath = path.join(tempDir, 'open.svg');
      const openPngPath = path.join(tempDir, 'open.png');
      fs.writeFileSync(openSvgPath, openSvg);
      await execPromise(`ffmpeg -y -i "${openSvgPath}" "${openPngPath}"`);
      await execPromise(`ffmpeg -y -loop 1 -i "${openPngPath}" -t 3 -vf "fps=30,fade=t=out:st=2.5:d=0.5" -c:v libx264 -pix_fmt yuv420p "${openingCardPath}"`);

      // 4. Create Closing Contact Card Video (4 seconds)
      const closingCardPath = path.join(tempDir, 'closing_card.mp4');
      const agentName = property?.agent_name || 'Nora Al-Othman & Tariq Kurra';
      const agentPhone = property?.agent_contact || brandProfile.phone || '+966 11 450 8899';
      const agentWa = property?.agent_whatsapp || brandProfile.whatsapp || '+966 50 123 4567';
      const website = property?.agent_website || brandProfile.website || 'www.kgmlimited.com';
      const priceText = property?.price ? `OFFERED AT ${property.price}` : (property?.rental_price ? `RENTAL: ${property.rental_price}` : 'PRICE UPON INQUIRY');
      const specsText = `${property?.bedrooms || 5} BEDROOMS  •  ${property?.bathrooms || 6} BATHROOMS  •  ${property?.property_size || '15,000 SQ FT'}`;

      const closeSvg = `
      <svg width="1920" height="1080" viewBox="0 0 1920 1080" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="bgG2" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#04120D" />
            <stop offset="50%" stop-color="#0B2B20" />
            <stop offset="100%" stop-color="#061D15" />
          </linearGradient>
          <linearGradient id="goldG2" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#FDF3CF" />
            <stop offset="50%" stop-color="#D4AF37" />
            <stop offset="100%" stop-color="#A27D16" />
          </linearGradient>
        </defs>
        <rect width="1920" height="1080" fill="url(#bgG2)" />
        <rect x="80" y="80" width="1760" height="920" fill="none" stroke="url(#goldG2)" stroke-width="1.5" opacity="0.3" />

        <g transform="translate(910, 180)">
          <polygon points="50,0 90,25 90,75 50,100 10,75 10,25" fill="#0B2B20" stroke="url(#goldG2)" stroke-width="2.5" />
          <text x="50" y="60" font-family="serif" font-size="28" font-weight="bold" fill="url(#goldG2)" text-anchor="middle">KGM</text>
        </g>

        <text x="960" y="340" font-family="serif" font-size="40" font-weight="700" fill="#FFFFFF" letter-spacing="3" text-anchor="middle">
          ${propTitle.replace(/&/g, '&amp;')}
        </text>
        <text x="960" y="390" font-family="sans-serif" font-size="22" font-weight="600" fill="url(#goldG2)" letter-spacing="4" text-anchor="middle">
          ${priceText}
        </text>
        <text x="960" y="435" font-family="sans-serif" font-size="16" fill="#E8E2D5" letter-spacing="3" text-anchor="middle" opacity="0.85">
          ${specsText}
        </text>

        <!-- CTA Box -->
        <rect x="560" y="500" width="800" height="340" rx="12" fill="#061A14" fill-opacity="0.9" stroke="url(#goldG2)" stroke-width="1" />
        
        <text x="960" y="560" font-family="serif" font-size="22" font-weight="600" fill="#FFFFFF" letter-spacing="2" text-anchor="middle">
          SCHEDULE A PRIVATE VIP VIEWING
        </text>

        <text x="960" y="620" font-family="sans-serif" font-size="18" fill="#D4AF37" letter-spacing="1" text-anchor="middle">
          Exclusive Representation: ${agentName}
        </text>
        <text x="960" y="670" font-family="sans-serif" font-size="16" fill="#E8E2D5" letter-spacing="1" text-anchor="middle">
          Direct / VIP Line: ${agentPhone}   •   WhatsApp: ${agentWa}
        </text>
        <text x="960" y="720" font-family="sans-serif" font-size="16" font-weight="600" fill="url(#goldG2)" letter-spacing="2" text-anchor="middle">
          ${website}
        </text>
        <text x="960" y="780" font-family="sans-serif" font-size="12" fill="#A0AEC0" letter-spacing="3" text-anchor="middle">
          KURRA GREENFIELD MERCHANTS LIMITED (KGM LIMITED)
        </text>
      </svg>`;

      const closeSvgPath = path.join(tempDir, 'close.svg');
      const closePngPath = path.join(tempDir, 'close.png');
      fs.writeFileSync(closeSvgPath, closeSvg);
      await execPromise(`ffmpeg -y -i "${closeSvgPath}" "${closePngPath}"`);
      await execPromise(`ffmpeg -y -loop 1 -i "${closePngPath}" -t 4 -vf "fps=30,fade=t=in:st=0:d=0.5" -c:v libx264 -pix_fmt yuv420p "${closingCardPath}"`);

      // Combine Opening + Video Sequence + Closing Card
      const fullListFile = path.join(tempDir, 'full_list.txt');
      fs.writeFileSync(fullListFile, `file '${openingCardPath}'\nfile '${rawSequencePath}'\nfile '${closingCardPath}'`);

      const brandedVideoOnly = path.join(tempDir, 'branded_video_only.mp4');
      await execPromise(`ffmpeg -y -f concat -safe 0 -i "${fullListFile}" -c copy "${brandedVideoOnly}"`);

      updateJob(65, 'mixing_audio_tracks', 4);

      // 5. Add Background Music & Mix Audio
      let audioSource = musicTrackPath || path.join(process.cwd(), 'public', 'audio', 'luxury_prestige.mp3');
      if (audioSource.startsWith('/')) {
        audioSource = path.join(process.cwd(), 'public', audioSource.replace(/^\//, ''));
      }
      if (!fs.existsSync(audioSource)) {
        audioSource = path.join(process.cwd(), 'public', 'audio', 'luxury_prestige.mp3');
      }

      // Calculate total duration: (3s open) + (shots duration) + (4s close)
      const totalShotsDuration = shots.reduce((acc, s) => acc + (s.duration || 10), 0);
      const totalFilmDuration = totalShotsDuration + 7;

      const master169Filename = `film_${projectId}_master_16x9.mp4`;
      const master169Path = path.join(exportsDir, master169Filename);

      // Mix video + looped audio with smooth fade out
      await execPromise(
        `ffmpeg -y -i "${brandedVideoOnly}" -stream_loop -1 -i "${audioSource}" -filter_complex "[1:a]volume=0.35,afade=t=out:st=${totalFilmDuration - 3}:d=3[aout]" -map 0:v -map "[aout]" -c:v copy -c:a aac -b:a 256k -shortest "${master169Path}"`
      );

      updateJob(80, 'generating_social_crops', 5);

      // 6. Generate 9:16 Social Portrait Version (Instagram Reels / TikTok / WhatsApp Status)
      const portraitFilename = `film_${projectId}_social_portrait_9x16.mp4`;
      const portraitPath = path.join(exportsDir, portraitFilename);
      await execPromise(
        `ffmpeg -y -i "${master169Path}" -vf "scale=1080:1920:force_original_aspect_ratio=increase,crop=1080:1920" -c:v libx264 -preset fast -crf 20 -c:a copy "${portraitPath}"`
      );

      // 7. Generate 1:1 Social Square Version (Instagram Post / LinkedIn)
      const squareFilename = `film_${projectId}_social_square_1x1.mp4`;
      const squarePath = path.join(exportsDir, squareFilename);
      await execPromise(
        `ffmpeg -y -i "${master169Path}" -vf "scale=1080:1080:force_original_aspect_ratio=increase,crop=1080:1080" -c:v libx264 -preset fast -crf 20 -c:a copy "${squarePath}"`
      );

      // 8. Generate Compressed WhatsApp Version (<16MB fast share)
      const whatsappFilename = `film_${projectId}_whatsapp_fast.mp4`;
      const whatsappPath = path.join(exportsDir, whatsappFilename);
      await execPromise(
        `ffmpeg -y -i "${master169Path}" -vf "scale=1280:720" -c:v libx264 -preset fast -crf 26 -b:v 1500k -c:a aac -b:a 128k "${whatsappPath}"`
      );

      // 9. Generate Master Film Thumbnail
      const thumbFilename = `film_${projectId}_thumb.jpg`;
      const thumbPath = path.join(thumbsDir, thumbFilename);
      await execPromise(`ffmpeg -y -ss 00:00:04 -i "${master169Path}" -vframes 1 -q:v 2 "${thumbPath}"`).catch(() => {});

      updateJob(95, 'mastering_4k_export', 6);

      // Get file sizes
      const masterStat = fs.existsSync(master169Path) ? fs.statSync(master169Path) : { size: 0 };
      const portStat = fs.existsSync(portraitPath) ? fs.statSync(portraitPath) : { size: 0 };
      const sqStat = fs.existsSync(squarePath) ? fs.statSync(squarePath) : { size: 0 };
      const waStat = fs.existsSync(whatsappPath) ? fs.statSync(whatsappPath) : { size: 0 };

      // Record Exports in Database
      const now = new Date().toISOString();
      const exportRecords: Partial<ExportItem>[] = [
        {
          id: `exp_${projectId}_master`,
          project_id: projectId,
          render_job_id: renderJobId,
          export_type: 'master_4k',
          title: 'KGM Master Film (16:9 4K / 1080p Cine Master)',
          file_path: `/exports/${master169Filename}`,
          file_size: masterStat.size,
          resolution: '1920x1080',
          aspect_ratio: '16:9',
        },
        {
          id: `exp_${projectId}_portrait`,
          project_id: projectId,
          render_job_id: renderJobId,
          export_type: 'social_portrait',
          title: 'Social Portrait (9:16 Instagram Reels / TikTok)',
          file_path: `/exports/${portraitFilename}`,
          file_size: portStat.size,
          resolution: '1080x1920',
          aspect_ratio: '9:16',
        },
        {
          id: `exp_${projectId}_square`,
          project_id: projectId,
          render_job_id: renderJobId,
          export_type: 'social_square',
          title: 'Social Square (1:1 Instagram Post / LinkedIn)',
          file_path: `/exports/${squareFilename}`,
          file_size: sqStat.size,
          resolution: '1080x1080',
          aspect_ratio: '1:1',
        },
        {
          id: `exp_${projectId}_wa`,
          project_id: projectId,
          render_job_id: renderJobId,
          export_type: 'whatsapp_compressed',
          title: 'WhatsApp Optimized Mobile Share',
          file_path: `/exports/${whatsappFilename}`,
          file_size: waStat.size,
          resolution: '1280x720',
          aspect_ratio: '16:9',
        },
      ];

      for (const exp of exportRecords) {
        db.prepare(`
          INSERT OR REPLACE INTO exports (
            id, project_id, render_job_id, export_type, title, file_path,
            file_size, resolution, aspect_ratio, download_count, created_at
          ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 0, ?)
        `).run(exp.id, exp.project_id, exp.render_job_id, exp.export_type, exp.title, exp.file_path, exp.file_size, exp.resolution, exp.aspect_ratio, now);
      }

      // Update Render Job Completed
      db.prepare(`
        UPDATE render_jobs
        SET status = 'completed', progress = 100, current_step = 'completed',
            output_master_path = ?, output_landscape_path = ?, output_portrait_path = ?,
            output_square_path = ?, output_whatsapp_path = ?, thumbnail_path = ?,
            duration_seconds = ?, resolution = '1920x1080', file_size_bytes = ?,
            completed_at = ?
        WHERE id = ?
      `).run(
        `/exports/${master169Filename}`,
        `/exports/${master169Filename}`,
        `/exports/${portraitFilename}`,
        `/exports/${squareFilename}`,
        `/exports/${whatsappFilename}`,
        `/thumbnails/${thumbFilename}`,
        totalFilmDuration,
        masterStat.size,
        now,
        renderJobId
      );

      // Update Project Status to Completed
      db.prepare(`
        UPDATE projects
        SET status = 'completed', updated_at = ?
        WHERE id = ?
      `).run(now, projectId);

      // Clean up temporary files
      try {
        fs.rmSync(tempDir, { recursive: true, force: true });
      } catch (e) {}

      updateJob(100, 'completed', 7);

      const completedJob = db.prepare('SELECT * FROM render_jobs WHERE id = ?').get(renderJobId) as RenderJob;
      return completedJob;
    } catch (err: any) {
      console.error('Video assembly failed:', err);
      db.prepare(`
        UPDATE render_jobs
        SET status = 'failed', current_step = 'failed', error_message = ?
        WHERE id = ?
      `).run(err?.message || 'Video assembly failed', renderJobId);

      throw err;
    }
  }
}
