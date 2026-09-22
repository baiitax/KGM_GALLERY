'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Sparkles,
  ArrowRight,
  Play,
  Film,
  Layers,
  Sliders,
  ShieldCheck,
  Video,
  MonitorPlay,
  Share2,
  Tv,
  Smartphone,
  Square,
  Maximize2,
  Lock,
  Compass,
  CheckCircle2,
  ChevronDown,
  Building2,
  Cpu,
  Eye,
  FileCheck,
  Download
} from 'lucide-react';

export default function StudioLandingPage() {
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [selectedFormat, setSelectedFormat] = useState<'16:9' | '9:16' | '1:1' | '4:5'>('16:9');
  const [selectedLut, setSelectedLut] = useState('emerald_gold');

  useEffect(() => {
    // Check active session
    fetch('/api/auth/me')
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.user) {
          setCurrentUser(data.user);
        }
      })
      .catch(() => {});
  }, []);

  const formatPreviews = {
    '16:9': {
      title: '16:9 Ultra HD 4K Cinematic Master',
      sub: 'Boardroom Screenings & Ultra-Wide Presentation Displays',
      aspectClass: 'aspect-video w-full max-w-2xl',
      badge: '4K DCI 24.000 FPS',
      deliverable: 'film_proj_kgm_riyadh_01_master_16x9.mp4',
    },
    '9:16': {
      title: '9:16 VIP Vertical Reel',
      sub: 'Mobile Luxury Distribution & Private Client Social Feeds',
      aspectClass: 'aspect-[9/16] w-64',
      badge: '1080x1920 HD 60.000 FPS',
      deliverable: 'film_proj_kgm_riyadh_01_social_portrait_9x16.mp4',
    },
    '1:1': {
      title: '1:1 Curated Feed Showcase',
      sub: 'Digital Lookbook & High-Net-Worth Portfolio Grid',
      aspectClass: 'aspect-square w-80',
      badge: '1080x1080 Square 30.000 FPS',
      deliverable: 'film_proj_kgm_riyadh_01_social_square_1x1.mp4',
    },
    '4:5': {
      title: '4:5 Collector Portrait Briefing',
      sub: 'Executive Briefings & Portrait Architectural Pitches',
      aspectClass: 'aspect-[4/5] w-72',
      badge: '1080x1350 Portrait Master',
      deliverable: 'film_proj_kgm_riyadh_01_whatsapp_fast.mp4',
    },
  };

  const luts = [
    {
      id: 'emerald_gold',
      name: 'KGM Emerald & Gold Master',
      desc: 'Proprietary institutional grade with deep emerald undertones and warm champagne highlights.',
      filter: 'contrast(1.08) saturate(1.15) sepia(0.12)',
    },
    {
      id: 'dusk_travertine',
      name: 'Dusk Travertine Warmth',
      desc: '3200K tungsten glow capturing the warm texture of Italian limestone in twilight light.',
      filter: 'contrast(1.05) saturate(1.2) sepia(0.25) hue-rotate(-10deg)',
    },
    {
      id: 'nordic_slate',
      name: 'Nordic Slate Neutral',
      desc: 'High-contrast modernist grade preserving natural monolithic stone fidelity.',
      filter: 'contrast(1.18) saturate(0.9) brightness(0.95)',
    },
    {
      id: 'midnight_royale',
      name: 'Midnight Royale',
      desc: 'Deep charcoal blacks with illuminated bronze fixtures and soft ambient pool reflections.',
      filter: 'contrast(1.25) saturate(1.05) brightness(0.88) hue-rotate(185deg) sepia(0.1)',
    },
  ];

  return (
    <div className="min-h-screen bg-[#07130E] text-stone-100 font-sans selection:bg-[#C5A869]/30">
      {/* Top Navigation */}
      <header className="border-b border-stone-800/80 px-6 py-4 flex items-center justify-between backdrop-blur-md bg-[#07130E]/90 sticky top-0 z-50">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#C5A869] to-[#8C733E] flex items-center justify-center text-[#07130E] font-serif font-bold text-xl shadow-lg shadow-[#C5A869]/20 group-hover:scale-105 transition-transform">
            K
          </div>
          <div>
            <span className="font-serif tracking-[0.25em] text-stone-100 text-sm sm:text-base font-semibold block">
              KURRA GREENFIELD MERCHANTS
            </span>
            <span className="text-[10px] tracking-[0.25em] text-[#C5A869] uppercase font-medium">
              Cinematic Studio OS
            </span>
          </div>
        </Link>

        <div className="flex items-center gap-3 sm:gap-6 text-xs">
          <Link
            href="#capabilities"
            className="hidden md:inline-block text-stone-400 hover:text-stone-200 transition-colors uppercase tracking-wider text-[11px]"
          >
            Capabilities
          </Link>
          <Link
            href="#mastering"
            className="hidden md:inline-block text-stone-400 hover:text-stone-200 transition-colors uppercase tracking-wider text-[11px]"
          >
            4-Aspect Mastering
          </Link>
          <Link
            href="/film/kgm-film-royal-villa-riyadh"
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-stone-900 border border-stone-800 text-stone-300 hover:text-[#C5A869] hover:border-[#C5A869]/40 transition-all font-mono text-[11px]"
          >
            <Eye className="w-3.5 h-3.5 text-[#C5A869]" />
            VIP 4K Film Preview
          </Link>

          {currentUser ? (
            <Link
              href="/studio"
              className="py-2 px-5 rounded-lg bg-gradient-to-r from-[#C5A869] to-[#9E8345] hover:from-[#D8BC7D] text-[#07130E] font-semibold tracking-wider text-xs uppercase flex items-center gap-2 shadow-lg shadow-[#C5A869]/20 transition-all"
            >
              <span>STUDIO OS</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          ) : (
            <Link
              href="/auth/login"
              className="py-2 px-5 rounded-lg bg-gradient-to-r from-[#C5A869] to-[#9E8345] hover:from-[#D8BC7D] text-[#07130E] font-semibold tracking-wider text-xs uppercase flex items-center gap-2 shadow-lg shadow-[#C5A869]/20 transition-all"
            >
              <span>ENTER STUDIO</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-12 pb-20 sm:pt-20 sm:pb-32 px-4 sm:px-6 max-w-7xl mx-auto text-center overflow-hidden">
        {/* Subtle background ambient glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[#0B2B20] blur-[140px] opacity-60 pointer-events-none -z-10"></div>

        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#0B2B20]/80 border border-[#C5A869]/30 text-[#C5A869] text-xs font-mono mb-8 backdrop-blur-md">
          <Sparkles className="w-3.5 h-3.5 text-[#C5A869]" />
          <span>PROPRIETARY PRODUCTION OPERATING SYSTEM</span>
        </div>

        <h1 className="text-4xl sm:text-6xl md:text-7xl font-serif font-medium tracking-tight text-stone-100 max-w-5xl mx-auto leading-[1.1]">
          KGM CINEMATIC STUDIO OS
        </h1>

        <p className="text-xl sm:text-2xl font-serif text-[#C5A869] italic font-light mt-4 mb-6">
          Transform Architecture Into Cinema.
        </p>

        <p className="text-sm sm:text-base text-stone-400 font-light max-w-3xl mx-auto leading-relaxed mb-10">
          A proprietary cinematic production environment for transforming architectural photography into master-grade property films, social cuts and client presentation experiences.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/studio"
            className="w-full sm:w-auto py-4 px-10 rounded-xl bg-gradient-to-r from-[#C5A869] to-[#9E8345] hover:from-[#D8BC7D] text-[#07130E] font-semibold text-xs sm:text-sm tracking-widest uppercase flex items-center justify-center gap-3 shadow-xl shadow-[#C5A869]/25 hover:shadow-[#C5A869]/35 transition-all cursor-pointer"
          >
            <span>ENTER STUDIO</span>
            <ArrowRight className="w-4 h-4" />
          </Link>

          <Link
            href="#capabilities"
            className="w-full sm:w-auto py-4 px-8 rounded-xl bg-stone-900/80 hover:bg-stone-850 border border-stone-800 hover:border-stone-700 text-stone-200 text-xs sm:text-sm tracking-wider uppercase font-medium flex items-center justify-center gap-2 transition-all cursor-pointer"
          >
            <span>VIEW CAPABILITIES</span>
            <ChevronDown className="w-4 h-4 text-stone-400" />
          </Link>
        </div>

        {/* Master Showcase Card */}
        <div className="mt-16 sm:mt-24 relative rounded-2xl overflow-hidden border border-stone-800/90 shadow-2xl bg-stone-900 group max-w-5xl mx-auto text-left">
          <div className="relative aspect-video w-full overflow-hidden">
            <img
              src="/uploads/villa_01_hero_exterior.jpg"
              alt="The Royal Sovereign Villa Riyadh"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 brightness-90"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#07130E] via-transparent to-black/40"></div>

            <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
              <span className="px-3 py-1 rounded-md bg-black/70 backdrop-blur-md border border-[#C5A869]/40 text-[#C5A869] text-xs font-mono font-medium tracking-wider flex items-center gap-2">
                <Film className="w-3.5 h-3.5" />
                10S ARCHITECTURAL CINEMA MASTER
              </span>
              <span className="px-3 py-1 rounded-md bg-emerald-950/80 backdrop-blur-md border border-emerald-800/60 text-emerald-300 text-xs font-mono">
                GPU RENDER READY
              </span>
            </div>

            <div className="absolute bottom-6 left-6 right-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div>
                <p className="text-xs font-mono uppercase tracking-widest text-[#C5A869]">Master Production File #KGM-RUH-001</p>
                <h3 className="text-xl sm:text-3xl font-serif text-white font-medium">The Sovereign Villa — Al-Malqa</h3>
                <p className="text-xs sm:text-sm text-stone-300 font-light mt-1">
                  Northern Riyadh • 18,500 sq ft • 10 Architectural Motion Scenes
                </p>
              </div>
              <div className="flex items-center gap-3">
                <Link
                  href="/film/kgm-film-royal-villa-riyadh"
                  className="py-2.5 px-5 rounded-lg bg-[#C5A869] hover:bg-[#D8BC7D] text-[#07130E] text-xs font-semibold tracking-wider uppercase flex items-center gap-2 transition-all shadow-lg shadow-[#C5A869]/20"
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>PLAY 4K FILM</span>
                </Link>
                <Link
                  href="/studio/create"
                  className="py-2.5 px-5 rounded-lg bg-stone-900/90 hover:bg-stone-800 border border-stone-700 text-stone-200 text-xs font-medium tracking-wider uppercase flex items-center gap-2"
                >
                  <span>EDIT IN PIPELINE</span>
                </Link>
              </div>
            </div>
          </div>

          <div className="p-6 bg-[#0B2B20]/50 border-t border-stone-800 grid grid-cols-2 sm:grid-cols-4 gap-4 text-center divide-x divide-stone-800">
            <div>
              <p className="text-base sm:text-lg font-serif text-[#C5A869]">100%</p>
              <p className="text-[10px] text-stone-400 uppercase tracking-wider">Geometry Preservation</p>
            </div>
            <div>
              <p className="text-base sm:text-lg font-serif text-[#C5A869]">10s Default</p>
              <p className="text-[10px] text-stone-400 uppercase tracking-wider">Cinema Standard Shot</p>
            </div>
            <div>
              <p className="text-base sm:text-lg font-serif text-[#C5A869]">4 Synchronized</p>
              <p className="text-[10px] text-stone-400 uppercase tracking-wider">Multi-Aspect Cuts</p>
            </div>
            <div>
              <p className="text-base sm:text-lg font-serif text-[#C5A869]">ACES 2065-1</p>
              <p className="text-[10px] text-stone-400 uppercase tracking-wider">Master Color Science</p>
            </div>
          </div>
        </div>
      </section>

      {/* Capabilities Section */}
      <section id="capabilities" className="py-20 px-4 sm:px-6 max-w-7xl mx-auto border-t border-stone-800/80">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-mono uppercase tracking-widest text-[#C5A869] font-medium">
            Architectural Motion Grammar
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif font-medium text-white tracking-tight">
            Engineered for Luxury Real Estate
          </h2>
          <p className="text-sm text-stone-400 font-light leading-relaxed">
            Eliminates artificial zooms and unstable AI hallucinations in favor of physics-accurate physical camera motions and authentic structural preservation.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-[#0C1E17]/80 border border-stone-800/90 space-y-4 hover:border-[#C5A869]/40 transition-all">
            <div className="w-10 h-10 rounded-xl bg-[#0B2B20] text-[#C5A869] flex items-center justify-center">
              <Compass className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-serif font-medium text-white">10 Cinematic Camera Moves</h3>
            <p className="text-xs text-stone-400 font-light leading-relaxed">
              Axial Dolly Forward, Lateral Tracking across stone mullions, Vertical Crane reveals, and locked Hero geometry holds designed specifically for luxury architecture.
            </p>
            <ul className="space-y-1.5 text-xs text-stone-300 font-mono">
              <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-[#C5A869]" /> Architectural Push</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-[#C5A869]" /> Lateral Stone Glide</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-[#C5A869]" /> Elevator Jib Reveal</li>
            </ul>
          </div>

          <div className="p-6 rounded-2xl bg-[#0C1E17]/80 border border-stone-800/90 space-y-4 hover:border-[#C5A869]/40 transition-all">
            <div className="w-10 h-10 rounded-xl bg-[#0B2B20] text-[#C5A869] flex items-center justify-center">
              <Sliders className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-serif font-medium text-white">ACES Cinema Color Science</h3>
            <p className="text-xs text-stone-400 font-light leading-relaxed">
              Calibrated color grading algorithms preserving the natural warmth of travertine limestone, fluted bronze, Italian book-matched marble, and desert twilight horizons.
            </p>
            <ul className="space-y-1.5 text-xs text-stone-300 font-mono">
              <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-[#C5A869]" /> KGM Emerald Gold LUT</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-[#C5A869]" /> 3200K Tungsten Warmth</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-[#C5A869]" /> Midnight Bronze Grade</li>
            </ul>
          </div>

          <div className="p-6 rounded-2xl bg-[#0C1E17]/80 border border-stone-800/90 space-y-4 hover:border-[#C5A869]/40 transition-all">
            <div className="w-10 h-10 rounded-xl bg-[#0B2B20] text-[#C5A869] flex items-center justify-center">
              <Share2 className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-serif font-medium text-white">Private VIP Presentations</h3>
            <p className="text-xs text-stone-400 font-light leading-relaxed">
              Generate password-protected private client pitch decks with synchronized 4K film playback, property specifications, floor plans, and direct confidential inquiry channels.
            </p>
            <ul className="space-y-1.5 text-xs text-stone-300 font-mono">
              <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-[#C5A869]" /> Password Protected Links</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-[#C5A869]" /> Client View Tracking</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-[#C5A869]" /> Uncompressed Downloads</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Multi-Aspect Mastering Interactive Section */}
      <section id="mastering" className="py-20 px-4 sm:px-6 max-w-7xl mx-auto border-t border-stone-800/80">
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <span className="text-xs font-mono uppercase tracking-widest text-[#C5A869] font-medium">
            Simultaneous Output Engine
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif font-medium text-white tracking-tight">
            4-Format Synchronized Mastering
          </h2>
          <p className="text-sm text-stone-400 font-light leading-relaxed">
            Every approved cinematic master automatically exports in four distinct aspect ratios with safe-zone subject reframing.
          </p>
        </div>

        {/* Format Selector Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-10">
          {[
            { id: '16:9', label: '16:9 4K Master', icon: Tv },
            { id: '9:16', label: '9:16 VIP Vertical Reel', icon: Smartphone },
            { id: '1:1', label: '1:1 Feed Showcase', icon: Square },
            { id: '4:5', label: '4:5 Collector Briefing', icon: Maximize2 },
          ].map((fmt) => {
            const Icon = fmt.icon;
            const isSel = selectedFormat === fmt.id;
            return (
              <button
                key={fmt.id}
                type="button"
                onClick={() => setSelectedFormat(fmt.id as any)}
                className={`py-2.5 px-5 rounded-xl text-xs font-semibold uppercase tracking-wider flex items-center gap-2 transition-all cursor-pointer ${
                  isSel
                    ? 'bg-[#C5A869] text-[#07130E] shadow-lg shadow-[#C5A869]/20'
                    : 'bg-stone-900/80 border border-stone-800 text-stone-300 hover:border-stone-700'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{fmt.label}</span>
              </button>
            );
          })}
        </div>

        {/* Active Aspect Ratio Preview Frame */}
        <div className="p-8 rounded-2xl bg-[#0C1E17]/60 border border-stone-800/90 flex flex-col items-center text-center">
          <div className="mb-4">
            <span className="px-3 py-1 rounded-full bg-stone-950 border border-[#C5A869]/30 text-[#C5A869] font-mono text-xs">
              {formatPreviews[selectedFormat].badge}
            </span>
            <h3 className="text-xl font-serif text-white font-medium mt-2">
              {formatPreviews[selectedFormat].title}
            </h3>
            <p className="text-xs text-stone-400 font-light mt-0.5">
              {formatPreviews[selectedFormat].sub}
            </p>
          </div>

          <div
            className={`relative rounded-xl overflow-hidden border-2 border-[#C5A869]/50 shadow-2xl bg-black ${formatPreviews[selectedFormat].aspectClass} transition-all duration-500`}
          >
            <img
              src="/uploads/villa_01_hero_exterior.jpg"
              alt="Format Preview"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/30 flex flex-col justify-between p-4">
              <span className="self-start text-[10px] font-mono px-2 py-0.5 rounded bg-black/60 text-[#C5A869]">
                SAFE ZONE: OPTIMAL
              </span>
              <div className="text-left">
                <p className="text-[10px] font-mono text-[#C5A869] uppercase">KGM Cinematic Cut</p>
                <p className="text-xs font-serif text-white font-semibold">The Sovereign Villa — Al-Malqa</p>
              </div>
            </div>
          </div>

          <div className="mt-6 flex items-center gap-4">
            <a
              href={`/exports/${formatPreviews[selectedFormat].deliverable}`}
              download
              className="py-2.5 px-5 rounded-lg bg-stone-900 border border-stone-700 hover:border-[#C5A869] text-stone-200 text-xs font-semibold uppercase tracking-wider flex items-center gap-2 transition-all"
            >
              <Download className="w-3.5 h-3.5 text-[#C5A869]" />
              <span>Download {selectedFormat} Master (MP4)</span>
            </a>
            <Link
              href="/studio/deliverables"
              className="text-xs text-[#C5A869] hover:underline font-mono"
            >
              View all project deliverables →
            </Link>
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="py-20 px-4 sm:px-6 max-w-5xl mx-auto text-center border-t border-stone-800/80">
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-b from-[#0C1E17] to-[#07130E] border border-stone-800/90 shadow-2xl space-y-6">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#C5A869] to-[#8C733E] flex items-center justify-center text-[#07130E] font-serif font-bold text-2xl mx-auto shadow-lg shadow-[#C5A869]/20">
            K
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-medium text-white tracking-tight">
            Enter KGM Cinematic Studio OS
          </h2>
          <p className="text-xs sm:text-sm text-stone-400 font-light max-w-xl mx-auto leading-relaxed">
            Private production suite for directors, producers, editors, and real estate executives at Kurra Greenfield Merchants Limited.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <Link
              href="/studio"
              className="w-full sm:w-auto py-3.5 px-8 rounded-xl bg-gradient-to-r from-[#C5A869] to-[#9E8345] hover:from-[#D8BC7D] text-[#07130E] font-semibold text-xs tracking-widest uppercase flex items-center justify-center gap-2 shadow-lg shadow-[#C5A869]/20"
            >
              <span>ACCESS PRODUCTION WORKSPACE</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/auth/invite"
              className="w-full sm:w-auto py-3.5 px-6 rounded-xl bg-stone-900 hover:bg-stone-850 border border-stone-800 text-stone-300 text-xs font-semibold tracking-wider uppercase flex items-center justify-center gap-2"
            >
              <span>REQUEST STUDIO INVITATION</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Bottom Footer */}
      <footer className="border-t border-stone-800/80 px-6 py-6 text-xs text-stone-500 bg-[#07130E]">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 rounded bg-[#C5A869] text-[#07130E] font-serif font-bold text-xs flex items-center justify-center">
              K
            </div>
            <span className="font-mono text-[11px] text-stone-400">
              KURRA GREENFIELD MERCHANTS LIMITED • CINEMATIC PRODUCTION OPERATING SYSTEM
            </span>
          </div>
          <div className="flex items-center gap-6 text-[11px] text-stone-400">
            <Link href="/auth/login" className="hover:text-[#C5A869]">Login</Link>
            <Link href="/auth/register" className="hover:text-[#C5A869]">Activate Account</Link>
            <Link href="/auth/invite" className="hover:text-[#C5A869]">Invite Personnel</Link>
            <Link href="/film/kgm-film-royal-villa-riyadh" className="hover:text-[#C5A869]">VIP Film</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
