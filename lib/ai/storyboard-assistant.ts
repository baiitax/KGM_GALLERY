export interface StoryboardImage {
  id: string;
  category: string;
  sort_order: number;
  original_filename: string;
  [key: string]: unknown;
}

const CATEGORY_PRIORITY_ORDER = [
  'exterior',
  'facade',
  'entrance',
  'foyer',
  'living_room',
  'dining',
  'kitchen',
  'master_bedroom',
  'bedroom',
  'bathroom',
  'balcony',
  'terrace',
  'pool',
  'garden',
  'aerial',
];

export class StoryboardAssistant {
  static autoArrangeImages<T extends { category?: string; [key: string]: unknown }>(images: T[]): T[] {
    return [...images].sort((a, b) => {
      const catA = (a.category || '').toLowerCase();
      const catB = (b.category || '').toLowerCase();

      const indexA = CATEGORY_PRIORITY_ORDER.findIndex(c => catA.includes(c));
      const indexB = CATEGORY_PRIORITY_ORDER.findIndex(c => catB.includes(c));

      const rankA = indexA === -1 ? 99 : indexA;
      const rankB = indexB === -1 ? 99 : indexB;

      return rankA - rankB;
    });
  }

  static calculateFilmDuration(shotCount: number, durationPerShot = 10): { totalSeconds: number; formatted: string } {
    const totalSeconds = shotCount * durationPerShot;
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    const formatted = `${mins}:${secs.toString().padStart(2, '0')}`;
    return { totalSeconds, formatted };
  }
}
