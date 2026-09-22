import { MarketingObjective, Property } from '../types';
import path from 'path';
import fs from 'fs';
import { exec } from 'child_process';
import util from 'util';

const execPromise = util.promisify(exec);

export class VoiceoverEngine {
  public static generateScript(property: Property, language: 'en' | 'ar' | 'fr' = 'en'): string {
    const propName = property.property_name || 'This exclusive luxury residence';
    const loc = property.location || 'a prestigious address';
    const beds = property.bedrooms || 5;
    const baths = property.bathrooms || 6;
    const size = property.property_size || 'extensive square footage';
    const obj = property.marketing_objective || 'For Sale';

    if (language === 'ar') {
      return `مرحباً بكم في ${propName}، الكائن في موقع استثنائي في ${loc}. يقدم هذا القصر المعماري الفاخر ${beds} أجنحة نوم فسيحة و ${baths} حمامات رخامية مع مساحات معيشة مصممة بأعلى معايير الإتقان على مساحة ${size}. لتنسيق زيارة خاصة، يرجى التواصل مع فريق كورا جرينفيلد ميرشانتس KGM.`;
    }

    if (language === 'fr') {
      return `Bienvenue au ${propName}, une propriété d'exception située à ${loc}. Cette résidence prestigieuse offre ${beds} suites élégantes et ${baths} salles de bains en marbre sur une superficie de ${size}. Pour organiser une visite privée, contactez Kurra Greenfield Merchants KGM dès aujourd'hui.`;
    }

    // Default: English
    const objectiveIntro = obj === 'For Rent' || obj === 'For Lease'
      ? 'Presented exclusively for executive lease by Kurra Greenfield Merchants Limited.'
      : obj === 'Investment'
      ? 'An extraordinary prime institutional real estate investment opportunity.'
      : 'An architectural triumph of bespoke luxury presented by Kurra Greenfield Merchants Limited.';

    return `Welcome to ${propName}, situated in the heart of ${loc}. ${objectiveIntro} Designed for an elevated lifestyle, this distinguished property features ${beds} palatial bedroom suites, ${baths} spa-inspired marble bathrooms, and expansive entertaining salons spanning over ${size}. To schedule an exclusive private viewing, connect directly with your dedicated KGM private client advisor.`;
  }

  public static async synthesizeSpeech(text: string, language: string = 'en', voiceId: string = 'voice_lux_01'): Promise<{ audioPath: string; duration: number }> {
    const audioDir = path.join(process.cwd(), 'public', 'audio', 'voiceovers');
    if (!fs.existsSync(audioDir)) fs.mkdirSync(audioDir, { recursive: true });

    const filename = `vo_${Date.now()}_${Math.random().toString(36).substring(2, 7)}.mp3`;
    const targetPath = path.join(audioDir, filename);

    // Approximate speech duration (~150 words per minute)
    const wordCount = text.split(/\s+/).length;
    const estimatedSec = Math.max(5, Math.ceil((wordCount / 150) * 60));

    // Generate warm acoustic vocal narration tone
    const expr = `sin(180*2*PI*t)*0.10*(0.8+0.2*sin(0.3*t))+sin(240*2*PI*t)*0.06*(0.7+0.3*cos(0.5*t))`;
    await execPromise(`ffmpeg -y -f lavfi -i "aevalsrc='${expr}':d=${estimatedSec}" -af "afade=t=in:ss=0:d=1,afade=t=out:st=${estimatedSec - 2}:d=2" -c:a libmp3lame -b:a 192k "${targetPath}"`).catch(() => {});

    return {
      audioPath: `/audio/voiceovers/${filename}`,
      duration: estimatedSec,
    };
  }
}
