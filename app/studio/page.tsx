'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Sparkles,
  PlusCircle,
  Play,
  Film,
  Layers,
  Sliders,
  Clock,
  ArrowRight,
  Eye,
  Download,
  Share2,
  Tv,
  CheckCircle2,
  FolderKanban,
  Building2,
  Activity,
  Cpu,
  Smartphone,
  Square,
  Maximize2
} from 'lucide-react';

export default function StudioDashboard() {
  const [user, setUser] = useState<any>(null);
  const [projects, setProjects] = useState<any[]>([]);
  const [properties, setProperties] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Load session and projects
    Promise.all([
      fetch('/api/auth/me').then((r) => r.json()),
      fetch('/api/projects').then((r) => r.json()),
      fetch('/api/properties').then((r) => r.json()),
    ])
      .then(([authData, projData, propData]) => {
        if (authData.success && authData.user) setUser(authData.user);
        if (projData.success && projData.projects) setProjects(projData.projects);
        if (propData.success && propData.properties) setProperties(propData.properties);
      })
      .catch((err) => console.error(err))
      .finally(() => setIsLoading(false));
  }, []);

  const queueItems = [
    {
      id: 'job_4k_master_01',
      title: 'The Sovereign Villa — 16:9 4K Cinema Master',
      property: 'Al-Malqa, Riyadh',
      stage: 'Mastering (ACES 2065-1 Grade)',
      progress: 100,
      status: 'Ready',
      aspect: '16:9',
    },
    {
      id: 'job_reel_916',
      title: 'VIP Vertical Reel (9:16 Social Cut)',
      property: 'Al-Malqa, Riyadh',
      stage: 'Multi-Aspect Synchronizer',
      progress: 100,
      status: 'Ready',
      aspect: '9:16',
    },
    {
      id: 'job_sq_11',
      title: 'Digital Lookbook (1:1 Feed Showcase)',
      property: 'Al-Malqa, Riyadh',
      stage: 'Export Optimization',
      progress: 100,
      status: 'Ready',
      aspect: '1:1',
    },
  ];

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-8 max-w-7xl w-full mx-auto">
      {/* Top Hero Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-stone-800/80 pb-6">
        <div>
          <span className="text-xs font-mono uppercase tracking-widest text-[#C5A869] font-medium flex items-center gap-1.5 mb-1.5">
            <Sparkles className="w-3.5 h-3.5 text-[#C5A869]" />
            KGM Production Operating System
          </span>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-medium text-white tracking-tight">
            Good morning, {user?.fullName || 'Alexander'}
          </h1>
          <p className="text-xs sm:text-sm text-stone-400 font-light mt-1">
            Your cinematic production studio is ready. 10-second master pipeline online.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/studio/create"
            className="py-3 px-6 rounded-xl bg-gradient-to-r from-[#C5A869] to-[#9E8345] hover:from-[#D8BC7D] text-[#07130E] font-semibold text-xs tracking-widest uppercase flex items-center gap-2 shadow-lg shadow-[#C5A869]/20 transition-all cursor-pointer"
          >
            <PlusCircle className="w-4 h-4" />
            <span>+ CREATE NEW FILM</span>
          </Link>
        </div>
      </div>

      {/* Quick Telemetry Indicators */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5">
        <div className="p-4 rounded-xl bg-[#0C1E17]/80 border border-stone-800/90 flex flex-col justify-between">
          <span className="text-[11px] font-mono text-stone-400 uppercase tracking-wider">GPU Cluster Status</span>
          <div className="mt-2 flex items-baseline justify-between">
            <span className="text-xl font-serif text-[#C5A869]">Online</span>
            <span className="text-[10px] font-mono text-emerald-400">12ms Latency</span>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-[#0C1E17]/80 border border-stone-800/90 flex flex-col justify-between">
          <span className="text-[11px] font-mono text-stone-400 uppercase tracking-wider">Master Standards</span>
          <div className="mt-2 flex items-baseline justify-between">
            <span className="text-xl font-serif text-stone-100">10 Seconds</span>
            <span className="text-[10px] font-mono text-[#C5A869]">24.000 FPS DCI</span>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-[#0C1E17]/80 border border-stone-800/90 flex flex-col justify-between">
          <span className="text-[11px] font-mono text-stone-400 uppercase tracking-wider">Color Calibration</span>
          <div className="mt-2 flex items-baseline justify-between">
            <span className="text-xl font-serif text-stone-100">ACES 2065-1</span>
            <span className="text-[10px] font-mono text-[#C5A869]">Emerald Gold</span>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-[#0C1E17]/80 border border-stone-800/90 flex flex-col justify-between">
          <span className="text-[11px] font-mono text-stone-400 uppercase tracking-wider">Synchronized Cuts</span>
          <div className="mt-2 flex items-baseline justify-between">
            <span className="text-xl font-serif text-stone-100">4 Formats</span>
            <span className="text-[10px] font-mono text-stone-400">16:9 • 9:16 • 1:1 • 4:5</span>
          </div>
        </div>
      </div>

      {/* Quick Action Bar */}
      <div className="p-4 rounded-2xl bg-stone-900/60 border border-stone-800/80">
        <p className="text-xs font-mono uppercase tracking-widest text-[#C5A869] mb-3">Quick Production Actions</p>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5">
          <Link
            href="/studio/create"
            className="p-3 rounded-xl bg-stone-950/80 hover:bg-[#0B2B20]/60 border border-stone-800 hover:border-[#C5A869]/50 text-left transition-all group"
          >
            <PlusCircle className="w-4 h-4 text-[#C5A869] mb-1.5 group-hover:scale-110 transition-transform" />
            <p className="text-xs font-semibold text-stone-200">Create Film</p>
            <p className="text-[10px] text-stone-400">Launch guided pipeline</p>
          </Link>

          <Link
            href="/studio/properties"
            className="p-3 rounded-xl bg-stone-950/80 hover:bg-[#0B2B20]/60 border border-stone-800 hover:border-[#C5A869]/50 text-left transition-all group"
          >
            <Building2 className="w-4 h-4 text-[#C5A869] mb-1.5 group-hover:scale-110 transition-transform" />
            <p className="text-xs font-semibold text-stone-200">Upload Property</p>
            <p className="text-[10px] text-stone-400">Register new estate</p>
          </Link>

          <Link
            href="/studio/assets"
            className="p-3 rounded-xl bg-stone-950/80 hover:bg-[#0B2B20]/60 border border-stone-800 hover:border-[#C5A869]/50 text-left transition-all group"
          >
            <Layers className="w-4 h-4 text-[#C5A869] mb-1.5 group-hover:scale-110 transition-transform" />
            <p className="text-xs font-semibold text-stone-200">Asset Library</p>
            <p className="text-[10px] text-stone-400">Analyze photography</p>
          </Link>

          <Link
            href="/studio/deliverables"
            className="p-3 rounded-xl bg-stone-950/80 hover:bg-[#0B2B20]/60 border border-stone-800 hover:border-[#C5A869]/50 text-left transition-all group"
          >
            <Sliders className="w-4 h-4 text-[#C5A869] mb-1.5 group-hover:scale-110 transition-transform" />
            <p className="text-xs font-semibold text-stone-200">4-Aspect Cuts</p>
            <p className="text-[10px] text-stone-400">Download 4K & Reels</p>
          </Link>

          <Link
            href="/studio/projects/proj_kgm_riyadh_01/presentation"
            className="p-3 rounded-xl bg-stone-950/80 hover:bg-[#0B2B20]/60 border border-stone-800 hover:border-[#C5A869]/50 text-left transition-all group col-span-2 sm:col-span-1"
          >
            <Share2 className="w-4 h-4 text-[#C5A869] mb-1.5 group-hover:scale-110 transition-transform" />
            <p className="text-xs font-semibold text-stone-200">Client Presentation</p>
            <p className="text-[10px] text-stone-400">VIP private showcase</p>
          </Link>
        </div>
      </div>

      {/* Active Productions Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Film className="w-4 h-4 text-[#C5A869]" />
            <h2 className="text-lg font-serif font-medium text-white">Active Productions</h2>
          </div>
          <Link href="/studio/projects" className="text-xs text-[#C5A869] hover:underline font-mono">
            View All Projects ({projects.length || 1}) →
          </Link>
        </div>

        {/* Master Active Project Card */}
        <div className="rounded-2xl bg-[#0C1E17]/80 border border-stone-800/90 p-5 sm:p-6 shadow-xl space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            {/* Visual Thumbnail */}
            <div className="lg:col-span-5 relative rounded-xl overflow-hidden border border-stone-800 group">
              <img
                src="/uploads/villa_01_hero_exterior.jpg"
                alt="The Sovereign Villa"
                className="w-full h-52 sm:h-60 object-cover group-hover:scale-105 transition-transform duration-700 brightness-90"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-between p-3.5">
                <span className="self-start px-2.5 py-1 rounded bg-black/70 border border-[#C5A869]/40 text-[#C5A869] text-[10px] font-mono">
                  100% MASTER RENDERED
                </span>
                <div>
                  <span className="text-[10px] font-mono text-[#C5A869] uppercase">Project #KGM-RUH-001</span>
                  <h3 className="text-base font-serif text-white font-medium">The Sovereign Villa — Al-Malqa</h3>
                </div>
              </div>
            </div>

            {/* Production Metadata & Controls */}
            <div className="lg:col-span-7 space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div>
                  <span className="text-xs font-mono text-emerald-400 flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Stage: Master Approved & 4-Aspect Synchronized
                  </span>
                  <p className="text-xs text-stone-400 font-light mt-0.5">
                    Location: Northern Riyadh • 10 Scenes • ACES 2065-1 Grade
                  </p>
                </div>
                <span className="px-2.5 py-1 rounded bg-stone-900 border border-stone-800 text-[11px] font-mono text-stone-300">
                  Last updated: Today
                </span>
              </div>

              {/* Progress */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-stone-400">Master Pipeline Progress</span>
                  <span className="text-[#C5A869]">100% Complete</span>
                </div>
                <div className="w-full h-2 rounded-full bg-stone-950 border border-stone-800 overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-[#C5A869] to-[#8C733E] w-full"></div>
                </div>
              </div>

              {/* Aspect Ratio deliverables preview */}
              <div className="grid grid-cols-4 gap-2 pt-1 text-center">
                <div className="p-2 rounded bg-stone-950/60 border border-stone-800/80">
                  <p className="text-xs font-mono text-[#C5A869]">16:9 4K</p>
                  <p className="text-[9px] text-stone-400">Master Cine</p>
                </div>
                <div className="p-2 rounded bg-stone-950/60 border border-stone-800/80">
                  <p className="text-xs font-mono text-[#C5A869]">9:16 VIP</p>
                  <p className="text-[9px] text-stone-400">Vertical Reel</p>
                </div>
                <div className="p-2 rounded bg-stone-950/60 border border-stone-800/80">
                  <p className="text-xs font-mono text-[#C5A869]">1:1 Feed</p>
                  <p className="text-[9px] text-stone-400">Lookbook</p>
                </div>
                <div className="p-2 rounded bg-stone-950/60 border border-stone-800/80">
                  <p className="text-xs font-mono text-[#C5A869]">4:5 Brief</p>
                  <p className="text-[9px] text-stone-400">Collector Pitch</p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <Link
                  href="/film/kgm-film-royal-villa-riyadh"
                  className="py-2.5 px-4 rounded-lg bg-[#C5A869] hover:bg-[#D8BC7D] text-[#07130E] font-semibold text-xs uppercase tracking-wider flex items-center gap-2 transition-all shadow-md shadow-[#C5A869]/20"
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>PLAY MASTER FILM</span>
                </Link>

                <Link
                  href="/studio/projects/proj_kgm_riyadh_01/review"
                  className="py-2.5 px-4 rounded-lg bg-stone-900 hover:bg-stone-850 border border-stone-700 text-stone-200 text-xs font-medium uppercase tracking-wider flex items-center gap-2"
                >
                  <Eye className="w-3.5 h-3.5 text-[#C5A869]" />
                  <span>REVIEW SCENES</span>
                </Link>

                <Link
                  href="/studio/deliverables"
                  className="py-2.5 px-4 rounded-lg bg-stone-900 hover:bg-stone-850 border border-stone-700 text-stone-200 text-xs font-medium uppercase tracking-wider flex items-center gap-2"
                >
                  <Download className="w-3.5 h-3.5 text-stone-400" />
                  <span>EXPORT ASSETS</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Production Queue & Telemetry Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Production Queue */}
        <div className="lg:col-span-7 rounded-2xl bg-[#0C1E17]/80 border border-stone-800/90 p-5 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#C5A869]" />
              <h3 className="text-base font-serif font-medium text-white">Production Queue & Master Jobs</h3>
            </div>
            <Link href="/studio/queue" className="text-xs text-[#C5A869] hover:underline font-mono">
              Queue Hub →
            </Link>
          </div>

          <div className="space-y-2.5">
            {queueItems.map((job) => (
              <div
                key={job.id}
                className="p-3 rounded-xl bg-stone-950/70 border border-stone-800/80 flex items-center justify-between gap-3 text-xs"
              >
                <div className="min-w-0">
                  <p className="font-medium text-stone-200 truncate">{job.title}</p>
                  <p className="text-[10px] text-stone-400 font-mono mt-0.5">{job.stage}</p>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  <span className="px-2 py-0.5 rounded bg-emerald-950 border border-emerald-800 text-emerald-300 font-mono text-[10px]">
                    {job.status}
                  </span>
                  <Link
                    href="/studio/deliverables"
                    className="p-1.5 rounded bg-stone-900 text-[#C5A869] hover:bg-stone-800"
                  >
                    <Download className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Camera Motion Physics Engine Snapshot */}
        <div className="lg:col-span-5 rounded-2xl bg-[#0C1E17]/80 border border-stone-800/90 p-5 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Cpu className="w-4 h-4 text-[#C5A869]" />
              <h3 className="text-base font-serif font-medium text-white">Motion Physics Engine</h3>
            </div>
            <Link href="/studio/motion" className="text-xs text-[#C5A869] hover:underline font-mono">
              Presets →
            </Link>
          </div>

          <p className="text-xs text-stone-400 font-light leading-relaxed">
            All camera trajectories follow physical inertial dampening models ensuring absolute structural geometry preservation without synthetic distortions.
          </p>

          <div className="space-y-2 text-xs font-mono">
            <div className="flex items-center justify-between p-2 rounded bg-stone-950/60 border border-stone-800">
              <span className="text-stone-300">Axial Dolly Speed</span>
              <span className="text-[#C5A869]">0.25 m/s (Cinematic)</span>
            </div>
            <div className="flex items-center justify-between p-2 rounded bg-stone-950/60 border border-stone-800">
              <span className="text-stone-300">Lens Calibrations</span>
              <span className="text-[#C5A869]">24mm • 28mm • 35mm Prime</span>
            </div>
            <div className="flex items-center justify-between p-2 rounded bg-stone-950/60 border border-stone-800">
              <span className="text-stone-300">Anti-Hallucination Guard</span>
              <span className="text-emerald-400">Active (100% Strict)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
