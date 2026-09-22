import { PropertyImage, RoomCategory } from '../types';

const CATEGORY_PRIORITY_ORDER: Record<RoomCategory, number> = {
  exterior: 10,
  entrance: 20,
  living_room: 30,
  dining_room: 40,
  kitchen: 50,
  office: 55,
  hallway: 58,
  staircase: 59,
  bedroom: 60,
  master_bedroom: 70,
  bathroom: 80,
  balcony: 85,
  terrace: 90,
  pool: 100,
  garden: 110,
  view: 120,
  land: 130,
  aerial: 140,
  garage: 150,
  other: 160,
};

export class StoryboardAssistant {
  public static autoArrangeImages(images: PropertyImage[]): PropertyImage[] {
    if (!images || images.length <= 1) return images;

    // Separate into categories
    const sorted = [...images].sort((a, b) => {
      const pA = CATEGORY_PRIORITY_ORDER[a.category] ?? 99;
      const pB = CATEGORY_PRIORITY_ORDER[b.category] ?? 99;
      if (pA !== pB) return pA - pB;
      return a.sort_order - b.sort_order;
    });

    // If we have multiple exteriors, make sure the last one is at the very end as a closing hero
    const exteriors = sorted.filter(img => img.category === 'exterior');
    if (exteriors.length > 1 && sorted.length > 3) {
      const closingExterior = exteriors[exteriors.length - 1];
      const remaining = sorted.filter(img => img.id !== closingExterior.id);
      remaining.push(closingExterior);
      return remaining.map((img, idx) => ({ ...img, sort_order: idx + 1 }));
    }

    return sorted.map((img, idx) => ({ ...img, sort_order: idx + 1 }));
  }

  public static generateDirectorSummary(images: PropertyImage[], totalShots: number, durationSec: number) {
    const mins = Math.floor(durationSec / 60);
    const secs = durationSec % 60;
    const formattedRuntime = `${mins}:${secs < 10 ? '0' : ''}${secs}`;

    const categoriesPresent = Array.from(new Set(images.map(i => i.category)));
    const openingImage = images[0];
    const closingImage = images[images.length - 1];

    return {
      totalImagesAnalyzed: images.length,
      recommendedShots: totalShots,
      estimatedRuntime: formattedRuntime,
      totalDurationSeconds: durationSec,
      suggestedOpening: openingImage ? `${openingImage.category.replace('_', ' ').toUpperCase()} (${openingImage.original_filename})` : 'Grand Exterior Facade',
      suggestedClosing: closingImage ? `${closingImage.category.replace('_', ' ').toUpperCase()} (${closingImage.original_filename})` : 'Twilight Finale Pullback',
      categoriesCoverage: categoriesPresent,
      directorRecommendation: 'Balanced luxury spatial progression from front elevation through grand living zones to private master quarters and outdoor amenities.',
    };
  }
}
