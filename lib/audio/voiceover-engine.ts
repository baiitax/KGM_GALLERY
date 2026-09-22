export interface VoiceoverScriptContext {
  property_name: string;
  location: string;
  bedrooms?: number;
  bathrooms?: number;
  property_size?: string;
  marketing_objective?: string;
}

export class VoiceoverEngine {
  static generateScript(prop: VoiceoverScriptContext, lang: 'en' | 'ar' | 'fr' = 'en'): string {
    const name = prop.property_name || 'Exceptional Estate';
    const loc = prop.location || 'Prime District';

    if (lang === 'ar') {
      return `مرحباً بكم في ${name}، إحدى أفخم التحف المعمارية في ${loc}. صُمم هذا العقار الاستثنائي بعناية فائقة وتجهيزات راقية ليعكس أرقى معايير الحياة الفاخرة. تم التطوير والتسويق بواسطة كورا جرينفيلد ميرشانتس ليمتد (KGM Limited). اتصل بنا اليوم لحجز جولتكم الخاصة.`;
    }

    if (lang === 'fr') {
      return `Bienvenue au ${name}, un chef-d'œuvre architectural d'exception situé à ${loc}. Une propriété prestigieuse alliant finitions sur mesure et design contemporain. Présenté par Kurra Greenfield Merchants Limited (KGM Limited). Contactez nos conseillers privés pour une visite exclusive.`;
    }

    // Default English
    return `Welcome to ${name}, an extraordinary architectural statement in ${loc}. Crafted with uncompromising precision, expansive entertaining spaces, and bespoke artisanal finishes throughout. Presented exclusively by Kurra Greenfield Merchants Limited (KGM Limited). Schedule your private consultation today.`;
  }
}
