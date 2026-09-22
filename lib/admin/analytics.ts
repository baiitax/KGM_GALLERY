export interface ExecutiveKPIs {
  activeProjects: { value: number; previous: number; trend: 'up' | 'down' | 'neutral'; changePercent: number };
  filmsGenerated: { today: number; week: number; month: number; lifetime: number };
  masteredOutputs: { total: number; aspect16x9: number; aspect9x16: number; aspect1x1: number; aspect4x5: number };
  totalAssets: { count: number; totalSizeGB: number; highResPercent: number };
  activeClients: { count: number; activePresentations: number; hnwCount: number };
  successRate: { value: number; totalJobs: number; failedJobs: number };
  aiUtilization: { activeGenerations: number; capacityPercent: number; avgLatencyMs: number };
  storageUtilization: { usedGB: number; allocatedGB: number; percent: number };
}

export interface BottleneckAlert {
  id: string;
  issue: string;
  severity: 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW';
  affectedProjects: string[];
  duration: string;
  recommendedAction: string;
}

export interface AIModelTelemetry {
  provider: string;
  model: string;
  successRate: number;
  avgProcessingTimeSec: number;
  failureRate: number;
  usageVolume: number;
  costPerOutputUSD: number;
  status: 'optimal' | 'warning' | 'degraded';
}

export interface GalleryItem {
  id: string;
  title: string;
  property: string;
  client: string;
  creator: string;
  thumbnail: string;
  date: string;
  status: 'Approved' | 'Pending Review' | 'Featured' | 'Restricted' | 'Archived';
  aspectRatios: string[];
  visibility: 'PRIVATE' | 'TEAM' | 'CLIENT' | 'PRESENTATION' | 'FEATURED' | 'ARCHIVED';
  version: string;
  resolution: string;
  views: number;
  featuredOrder?: number;
}

export interface SystemServiceStatus {
  name: string;
  category: string;
  status: 'Operational' | 'Degraded' | 'Unavailable';
  latency: string;
  uptime: string;
  lastChecked: string;
}

export const ADMIN_SEED_DATA = {
  kpis: {
    activeProjects: { value: 18, previous: 14, trend: 'up', changePercent: 28.5 },
    filmsGenerated: { today: 4, week: 29, month: 112, lifetime: 486 },
    masteredOutputs: { total: 1944, aspect16x9: 486, aspect9x16: 486, aspect1x1: 486, aspect4x5: 486 },
    totalAssets: { count: 3420, totalSizeGB: 184.6, highResPercent: 96.2 },
    activeClients: { count: 24, activePresentations: 19, hnwCount: 16 },
    successRate: { value: 99.4, totalJobs: 540, failedJobs: 3 },
    aiUtilization: { activeGenerations: 6, capacityPercent: 68.0, avgLatencyMs: 142 },
    storageUtilization: { usedGB: 184.6, allocatedGB: 500, percent: 36.9 },
  } as ExecutiveKPIs,

  productionPipeline: [
    { stage: 'Draft', count: 4, percent: 12.5, color: '#78716C' },
    { stage: 'Production', count: 18, percent: 56.2, color: '#C5A869' },
    { stage: 'Rendering', count: 5, percent: 15.6, color: '#38BDF8' },
    { stage: 'Review', count: 3, percent: 9.4, color: '#F59E0B' },
    { stage: 'Approved', count: 2, percent: 6.3, color: '#10B981' },
    { stage: 'Completed', count: 25, percent: 100, color: '#059669' },
    { stage: 'Archived', count: 8, percent: 0, color: '#52525B' },
  ],

  activeJobs: [
    {
      id: 'job_active_01',
      project: 'The Sovereign Villa — Al-Malqa',
      property: 'Northern Riyadh Compound',
      stage: 'Rendering (10s Master)',
      progress: 78,
      runtime: '02:14',
      status: 'Active',
      operator: 'Alexander Kurra',
    },
    {
      id: 'job_active_02',
      project: 'Palm Jumeirah Sky Palace',
      property: 'Dubai Waterfront',
      stage: 'AI Motion Vectors',
      progress: 42,
      runtime: '01:08',
      status: 'Active',
      operator: 'Elena Vance',
    },
    {
      id: 'job_active_03',
      project: 'Diplomatic Quarter Manor',
      property: 'Riyadh DQ',
      stage: 'Mastering (ACES 2065-1)',
      progress: 91,
      runtime: '00:48',
      status: 'Finalizing',
      operator: 'Tariq Mansoor',
    },
    {
      id: 'job_active_04',
      project: 'Red Sea Coastal Oasis',
      property: 'Shura Island Private Estate',
      stage: 'Multi-Aspect Synchronizer',
      progress: 100,
      runtime: '00:32',
      status: 'Completed',
      operator: 'Marcus Vance',
    },
  ],

  bottlenecks: [
    {
      id: 'bot_01',
      issue: 'REVIEW BACKLOG IN ULTRA-LUXURY PIPELINE',
      severity: 'MEDIUM',
      affectedProjects: ['Palm Jumeirah Sky Palace', 'Diplomatic Quarter Manor'],
      duration: '4.2 hrs',
      recommendedAction: 'Reassign pending scene approvals to Senior Film Producer for VIP sign-off.',
    },
    {
      id: 'bot_02',
      issue: 'EXPORT QUEUE DELAY FOR 9:16 VERTICAL REELS',
      severity: 'LOW',
      affectedProjects: ['Victoria Island Sovereign Manor'],
      duration: '18 mins',
      recommendedAction: 'Allocate 2 additional GPU rendering workers to social aspect downscaling.',
    },
  ] as BottleneckAlert[],

  aiModels: [
    {
      provider: 'KGM Native Neural Engine',
      model: 'FFmpeg ACES GPU Cluster v3',
      successRate: 99.8,
      avgProcessingTimeSec: 8.4,
      failureRate: 0.2,
      usageVolume: 342,
      costPerOutputUSD: 0.12,
      status: 'optimal',
    },
    {
      provider: 'Runway ML',
      model: 'Gen-3 Alpha Turbo',
      successRate: 98.6,
      avgProcessingTimeSec: 14.2,
      failureRate: 1.4,
      usageVolume: 120,
      costPerOutputUSD: 0.85,
      status: 'optimal',
    },
    {
      provider: 'Luma Labs',
      model: 'Dream Machine v1.5',
      successRate: 97.2,
      avgProcessingTimeSec: 19.8,
      failureRate: 2.8,
      usageVolume: 64,
      costPerOutputUSD: 0.65,
      status: 'optimal',
    },
    {
      provider: 'Google DeepMind',
      model: 'Veo 2 Cinematic 4K',
      successRate: 99.1,
      avgProcessingTimeSec: 24.5,
      failureRate: 0.9,
      usageVolume: 42,
      costPerOutputUSD: 1.40,
      status: 'optimal',
    },
  ] as AIModelTelemetry[],

  galleryItems: [
    {
      id: 'gal_01',
      title: 'The Sovereign Villa — Al-Malqa (Master Film)',
      property: 'The Royal Sovereign Villa',
      client: 'Private Sovereign Family Office',
      creator: 'Alexander Kurra',
      thumbnail: '/uploads/villa_01_hero_exterior.jpg',
      date: '2026-09-22',
      status: 'Featured',
      aspectRatios: ['16:9', '9:16', '1:1', '4:5'],
      visibility: 'FEATURED',
      version: 'v3 (Approved Master)',
      resolution: '3840x2160 4K DCI',
      views: 1420,
      featuredOrder: 1,
    },
    {
      id: 'gal_02',
      title: 'Palm Jumeirah Sky Palace — Twilight Horizons',
      property: 'Palm Jumeirah Penthouse',
      client: 'Al-Nakhla Prestige Investments',
      creator: 'Elena Vance',
      thumbnail: '/uploads/villa_08_infinity_pool.jpg',
      date: '2026-09-21',
      status: 'Approved',
      aspectRatios: ['16:9', '9:16'],
      visibility: 'CLIENT',
      version: 'v2',
      resolution: '3840x2160 4K',
      views: 890,
      featuredOrder: 2,
    },
    {
      id: 'gal_03',
      title: 'Grand Entrance & Calacatta Foyer',
      property: 'The Royal Sovereign Villa',
      client: 'Private Sovereign Family Office',
      creator: 'Alexander Kurra',
      thumbnail: '/uploads/villa_02_entrance_foyer.jpg',
      date: '2026-09-20',
      status: 'Approved',
      aspectRatios: ['16:9', '9:16', '1:1', '4:5'],
      visibility: 'PRESENTATION',
      version: 'v1',
      resolution: '3840x2160 4K',
      views: 640,
      featuredOrder: 3,
    },
    {
      id: 'gal_04',
      title: 'Double-Height Living Salon & Travertine Mullions',
      property: 'The Royal Sovereign Villa',
      client: 'Private Sovereign Family Office',
      creator: 'Tariq Mansoor',
      thumbnail: '/uploads/villa_03_living_salon.jpg',
      date: '2026-09-19',
      status: 'Approved',
      aspectRatios: ['16:9', '1:1'],
      visibility: 'TEAM',
      version: 'v1',
      resolution: '3840x2160 4K',
      views: 410,
    },
    {
      id: 'gal_05',
      title: 'Primary Sanctuary & Terrace Horizon',
      property: 'The Royal Sovereign Villa',
      client: 'Private Sovereign Family Office',
      creator: 'Elena Vance',
      thumbnail: '/uploads/villa_06_master_suite.jpg',
      date: '2026-09-18',
      status: 'Approved',
      aspectRatios: ['16:9', '9:16', '4:5'],
      visibility: 'PRIVATE',
      version: 'v2',
      resolution: '3840x2160 4K',
      views: 320,
    },
    {
      id: 'gal_06',
      title: 'Spa Wellness Primary Bath',
      property: 'The Royal Sovereign Villa',
      client: 'Private Sovereign Family Office',
      creator: 'Marcus Vance',
      thumbnail: '/uploads/villa_07_spa_bathroom.jpg',
      date: '2026-09-18',
      status: 'Pending Review',
      aspectRatios: ['16:9', '9:16'],
      visibility: 'TEAM',
      version: 'v1',
      resolution: '3840x2160 4K',
      views: 180,
    },
  ] as GalleryItem[],

  collections: [
    { id: 'col_01', name: 'Luxury Sovereign Villas', count: 12, cover: '/uploads/villa_01_hero_exterior.jpg' },
    { id: 'col_02', name: 'Sky Penthouses & Towers', count: 8, cover: '/uploads/villa_08_infinity_pool.jpg' },
    { id: 'col_03', name: 'Spa & Wellness Sanctuaries', count: 6, cover: '/uploads/villa_07_spa_bathroom.jpg' },
    { id: 'col_04', name: 'Palatial Reception Salons', count: 10, cover: '/uploads/villa_03_living_salon.jpg' },
  ],

  systemServices: [
    { name: 'Authentication & Session Engine', category: 'Security', status: 'Operational', latency: '18ms', uptime: '99.99%', lastChecked: 'Just now' },
    { name: 'Unified Database & Storage Layer', category: 'Core DB', status: 'Operational', latency: '12ms', uptime: '100.0%', lastChecked: 'Just now' },
    { name: 'KGM GPU Render Cluster (FFmpeg DCI)', category: 'Media', status: 'Operational', latency: '24ms', uptime: '99.95%', lastChecked: 'Just now' },
    { name: 'AI Generation Model Gateway', category: 'Inference', status: 'Operational', latency: '142ms', uptime: '99.88%', lastChecked: 'Just now' },
    { name: '4-Aspect Multi-Format Synchronizer', category: 'Mastering', status: 'Operational', latency: '35ms', uptime: '100.0%', lastChecked: 'Just now' },
    { name: 'Client Presentation VIP Edge CDN', category: 'Delivery', status: 'Operational', latency: '8ms', uptime: '99.99%', lastChecked: 'Just now' },
    { name: 'Notification & Audit Event Dispatch', category: 'Telemetry', status: 'Operational', latency: '15ms', uptime: '100.0%', lastChecked: 'Just now' },
  ] as SystemServiceStatus[],

  costIntelligence: {
    monthlyBudgetUSD: 10000,
    actualSpendUSD: 4620,
    varianceUSD: 5380,
    breakdown: [
      { category: 'AI Inference Compute', spend: 2180, budget: 4500, status: 'On Track' },
      { category: 'GPU Video Encoding & FFmpeg', spend: 1240, budget: 2500, status: 'On Track' },
      { category: 'High-Res Media Vault Storage', spend: 680, budget: 1500, status: 'Optimal' },
      { category: 'Global Edge Presentation CDN', spend: 520, budget: 1500, status: 'Optimal' },
    ],
  },
};

export class AdminAnalyticsService {
  static getOverview() {
    return ADMIN_SEED_DATA;
  }

  static getGallery() {
    return {
      items: ADMIN_SEED_DATA.galleryItems,
      collections: ADMIN_SEED_DATA.collections,
    };
  }

  static getSystemHealth() {
    return {
      services: ADMIN_SEED_DATA.systemServices,
      activeJobs: ADMIN_SEED_DATA.activeJobs,
      bottlenecks: ADMIN_SEED_DATA.bottlenecks,
    };
  }
}
