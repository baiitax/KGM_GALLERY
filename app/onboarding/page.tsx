'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  Sparkles,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Film,
  Layers,
  Video,
  MonitorPlay,
  Sliders,
  FolderKanban,
  FileCheck,
  Share2,
  ShieldCheck,
  Building2,
  Tv,
  Smartphone,
  Square,
  Maximize2
} from 'lucide-react';
import { UserRole } from '@/lib/auth/session';

export default function OnboardingPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedRole, setSelectedRole] = useState<UserRole>('producer');
  const [selectedAspectRatio, setSelectedAspectRatio] = useState<'16:9' | '9:16' | '1:1' | '4:5'>('16:9');
  const [selectedQuality, setSelectedQuality] = useState<'prores_422' | 'h265_4k' | 'h264_master'>('h265_4k');
  const [selectedBrandProfile, setSelectedBrandProfile] = useState('brand_kgm_sovereign');
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [renderAlerts, setRenderAlerts] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const roleOptions = [
    {
      id: 'creative_director',
      title: 'Creative & Artistic Direction',
      desc: 'Orchestrates visual storytelling, architectural shot sequencing, camera kinetics, and ACES color styling.',
      icon: Film,
    },
    {
      id: 'producer',
      title: 'Cinematic Film Production',
      desc: 'Manages project timelines, render queues, multi-camera mastering, and 10-second deliverable pipelines.',
      icon: Video,
    },
    {
      id: 'marketing',
      title: 'Real Estate Marketing & Media',
      desc: 'Generates multi-format social cuts (9:16 reels, 1:1 showcases), syndication assets, and high-impact campaigns.',
      icon: Smartphone,
    },
    {
      id: 'super_admin',
      title: 'Studio Administration & Governance',
      desc: 'Full enterprise control over GPU compute allocation, team credentials, security policies, and brand assets.',
      icon: ShieldCheck,
    },
    {
      id: 'reviewer',
      title: 'Executive & Client Review',
      desc: 'Confidential client reviews, boardroom screenings, VIP presentation pitch decks, and private feedback.',
      icon: Tv,
    },
  ];

  const tourModules = [
    {
      title: '1. Projects Hub',
      desc: 'Central command for tracking all active luxury estate film productions, render stages, and version lineage.',
      icon: FolderKanban,
    },
    {
      title: '2. Asset Intelligence Library',
      desc: 'Upload high-resolution architectural captures; AI automatically classifies spaces and calculates optical composition.',
      icon: Layers,
    },
    {
      title: '3. Cinematic Motion Engine',
      desc: 'Apply 10 physical camera trajectories (axial dolly, lateral glide, crane ascent) tuned for photographic realism.',
      icon: Film,
    },
    {
      title: '4. Distributed Production Queue',
      desc: 'Live telemetry tracking multi-pass AI generation, FFmpeg mastering, and GPU compute clusters.',
      icon: Video,
    },
    {
      title: '5. Multi-Aspect Mastering',
      desc: 'Instant synchronized output across 16:9 4K Master, 9:16 VIP Vertical Reel, 1:1 Feed Showcase, and 4:5 Briefing.',
      icon: Sliders,
    },
    {
      title: '6. Deliverables Center',
      desc: 'One-click uncompressed MP4 downloads, ProRes master archives, and cloud CDN asset distribution.',
      icon: FileCheck,
    },
    {
      title: '7. Private Client Presentations',
      desc: 'Password-protected luxury digital pitch decks with interactive 4K video player and direct VIP inquiry channels.',
      icon: Share2,
    },
  ];

  const handleComplete = async () => {
    setIsSubmitting(true);
    try {
      await fetch('/api/auth/onboarding', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: 'usr_active_session',
          role: selectedRole,
          preferences: {
            preferredAspectRatio: selectedAspectRatio,
            defaultQuality: selectedQuality,
            defaultBrandProfile: selectedBrandProfile,
            emailNotifications: emailAlerts,
            renderAlerts: renderAlerts,
          },
        }),
      });
      router.push('/studio');
    } catch (e) {
      router.push('/studio');
    }
  };

  return (
    <div className="min-h-screen bg-[#07130E] text-stone-100 flex flex-col justify-between font-sans selection:bg-[#C5A869]/30">
      {/* Top Bar */}
      <header className="border-b border-stone-800/80 px-6 py-4 flex items-center justify-between backdrop-blur-md bg-[#07130E]/80 sticky top-0 z-50">
        <Link href="/" className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-[#C5A869] to-[#8C733E] flex items-center justify-center text-[#07130E] font-serif font-bold text-lg">
            K
          </div>
          <div>
            <span className="font-serif tracking-[0.25em] text-stone-100 text-sm font-semibold block">KGM LIMITED</span>
            <span className="text-[10px] tracking-[0.2em] text-[#C5A869] uppercase font-medium">Studio Onboarding</span>
          </div>
        </Link>
        <div className="flex items-center gap-2 text-xs font-mono text-stone-400">
          <span className="text-[#C5A869]">STEP 0{currentStep}</span>
          <span>/</span>
          <span>04</span>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-4xl w-full mx-auto p-4 sm:p-6 lg:p-8 my-auto">
        {/* Progress Pills */}
        <div className="grid grid-cols-4 gap-2 mb-8">
          {[
            { num: 1, title: 'Welcome' },
            { num: 2, title: 'Your Role' },
            { num: 3, title: 'Preferences' },
            { num: 4, title: 'Studio Tour' },
          ].map((s) => (
            <div
              key={s.num}
              className={`h-1.5 rounded-full transition-all ${
                currentStep >= s.num ? 'bg-[#C5A869]' : 'bg-stone-800'
              }`}
            />
          ))}
        </div>

        {/* Step 1: Welcome */}
        {currentStep === 1 && (
          <div className="bg-[#0C1E17]/90 border border-stone-800/90 rounded-2xl p-6 sm:p-10 backdrop-blur-xl shadow-2xl space-y-6">
            <div className="text-center max-w-xl mx-auto space-y-3">
              <span className="text-xs font-mono uppercase tracking-widest text-[#C5A869] font-medium flex items-center justify-center gap-1.5">
                <Sparkles className="w-4 h-4 text-[#C5A869]" />
                Private Creative Facility
              </span>
              <h1 className="text-3xl sm:text-4xl font-serif font-medium text-white tracking-tight">
                WELCOME TO KGM CINEMATIC STUDIO OS
              </h1>
              <p className="text-sm text-stone-400 font-light leading-relaxed">
                Transform architectural photography into master-grade 10-second property films, multi-format social cuts, and VIP client presentations with mathematical precision.
              </p>
            </div>

            <div className="relative rounded-xl overflow-hidden border border-stone-800">
              <img
                src="/uploads/villa_01_hero_exterior.jpg"
                alt="Architectural Cinema"
                className="w-full h-56 sm:h-72 object-cover brightness-90"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0C1E17] via-transparent to-transparent"></div>
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs font-mono">
                <span className="px-3 py-1 rounded bg-black/60 border border-[#C5A869]/40 text-[#C5A869]">
                  STRICT ARCHITECTURAL PRESERVATION • 24.000 FPS
                </span>
                <span className="text-stone-300 hidden sm:inline">ACES 2065-1 COLOR PIPELINE</span>
              </div>
            </div>

            <div className="flex justify-end pt-4">
              <button
                onClick={() => setCurrentStep(2)}
                className="py-3 px-8 rounded-lg bg-gradient-to-r from-[#C5A869] to-[#9E8345] hover:from-[#D8BC7D] text-[#07130E] font-semibold text-xs tracking-widest uppercase flex items-center gap-2 cursor-pointer shadow-lg shadow-[#C5A869]/20"
              >
                PROCEED TO ROLE CONFIGURATION <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Role Selection */}
        {currentStep === 2 && (
          <div className="bg-[#0C1E17]/90 border border-stone-800/90 rounded-2xl p-6 sm:p-10 backdrop-blur-xl shadow-2xl space-y-6">
            <div className="space-y-2">
              <span className="text-xs font-mono uppercase tracking-widest text-[#C5A869] font-medium block">
                Step 02 • Production Identity
              </span>
              <h2 className="text-2xl sm:text-3xl font-serif font-medium text-white tracking-tight">
                Confirm Your Studio Role
              </h2>
              <p className="text-xs sm:text-sm text-stone-400 font-light">
                Tailors your workspace layout, quick actions, and default production permissions.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
              {roleOptions.map((opt) => {
                const Icon = opt.icon;
                const isSelected = selectedRole === opt.id;
                return (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => setSelectedRole(opt.id as UserRole)}
                    className={`p-4 rounded-xl text-left border transition-all flex items-start gap-3.5 cursor-pointer ${
                      isSelected
                        ? 'bg-[#0B2B20] border-[#C5A869] shadow-lg shadow-[#C5A869]/10'
                        : 'bg-stone-950/60 border-stone-800/80 hover:border-stone-700'
                    }`}
                  >
                    <div
                      className={`p-2.5 rounded-lg flex-shrink-0 ${
                        isSelected ? 'bg-[#C5A869] text-[#07130E]' : 'bg-stone-900 text-[#C5A869]'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h4 className="text-sm font-semibold text-stone-100">{opt.title}</h4>
                        {isSelected && <CheckCircle2 className="w-4 h-4 text-[#C5A869]" />}
                      </div>
                      <p className="text-xs text-stone-400 font-light mt-1 leading-relaxed">
                        {opt.desc}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-stone-800">
              <button
                onClick={() => setCurrentStep(1)}
                className="py-2.5 px-5 rounded-lg border border-stone-800 hover:border-stone-700 text-stone-400 hover:text-stone-200 text-xs font-medium flex items-center gap-2 cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" /> Back
              </button>
              <button
                onClick={() => setCurrentStep(3)}
                className="py-3 px-8 rounded-lg bg-gradient-to-r from-[#C5A869] to-[#9E8345] hover:from-[#D8BC7D] text-[#07130E] font-semibold text-xs tracking-widest uppercase flex items-center gap-2 cursor-pointer shadow-lg shadow-[#C5A869]/20"
              >
                CONFIGURE STUDIO PREFERENCES <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Studio Preferences */}
        {currentStep === 3 && (
          <div className="bg-[#0C1E17]/90 border border-stone-800/90 rounded-2xl p-6 sm:p-10 backdrop-blur-xl shadow-2xl space-y-6">
            <div className="space-y-2">
              <span className="text-xs font-mono uppercase tracking-widest text-[#C5A869] font-medium block">
                Step 03 • Production Settings
              </span>
              <h2 className="text-2xl sm:text-3xl font-serif font-medium text-white tracking-tight">
                Studio Defaults & Mastering Output
              </h2>
              <p className="text-xs sm:text-sm text-stone-400 font-light">
                Define default aspect ratios, rendering codec standards, and brand styles for your outputs.
              </p>
            </div>

            <div className="space-y-5 pt-2">
              {/* Aspect Ratio */}
              <div>
                <label className="block text-xs font-medium text-stone-300 uppercase tracking-wider mb-2">
                  Primary Aspect Ratio Default
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {[
                    { id: '16:9', label: '16:9 4K Master', icon: Tv, sub: 'Boardroom Master' },
                    { id: '9:16', label: '9:16 VIP Vertical', icon: Smartphone, sub: 'Social Reels' },
                    { id: '1:1', label: '1:1 Feed Showcase', icon: Square, sub: 'Square Lookbook' },
                    { id: '4:5', label: '4:5 Collector Briefing', icon: Maximize2, sub: 'Portrait Pitch' },
                  ].map((asp) => (
                    <button
                      key={asp.id}
                      type="button"
                      onClick={() => setSelectedAspectRatio(asp.id as any)}
                      className={`p-3 rounded-xl text-left border transition-all cursor-pointer ${
                        selectedAspectRatio === asp.id
                          ? 'bg-[#0B2B20] border-[#C5A869] text-[#C5A869]'
                          : 'bg-stone-950/60 border-stone-800 text-stone-400 hover:text-stone-200'
                      }`}
                    >
                      <p className="text-xs font-semibold text-stone-100">{asp.label}</p>
                      <p className="text-[10px] text-stone-400 mt-0.5">{asp.sub}</p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Quality Codec */}
              <div>
                <label className="block text-xs font-medium text-stone-300 uppercase tracking-wider mb-2">
                  Default Video Mastering Codec
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {[
                    { id: 'h265_4k', title: '4K H.265 (HEVC 10-Bit)', desc: 'Ultra-clear HDR color grading, web optimized' },
                    { id: 'prores_422', title: 'Apple ProRes 422 HQ', desc: 'Uncompressed master archival standard' },
                    { id: 'h264_master', title: 'H.264 Universal Cinema', desc: 'Instant compatibility across all client devices' },
                  ].map((q) => (
                    <button
                      key={q.id}
                      type="button"
                      onClick={() => setSelectedQuality(q.id as any)}
                      className={`p-3 rounded-xl text-left border transition-all cursor-pointer ${
                        selectedQuality === q.id
                          ? 'bg-[#0B2B20] border-[#C5A869]'
                          : 'bg-stone-950/60 border-stone-800'
                      }`}
                    >
                      <p className="text-xs font-semibold text-stone-100">{q.title}</p>
                      <p className="text-[11px] text-stone-400 mt-1">{q.desc}</p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Toggles */}
              <div className="p-4 rounded-xl bg-stone-950/60 border border-stone-800/80 space-y-3">
                <p className="text-xs font-mono uppercase tracking-wider text-stone-400">
                  Notification Dispatch Telemetry
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-stone-300">Email alerts on 10-second master completion</span>
                  <input
                    type="checkbox"
                    checked={emailAlerts}
                    onChange={(e) => setEmailAlerts(e.target.checked)}
                    className="rounded bg-stone-900 border-stone-700 text-[#C5A869] focus:ring-0 cursor-pointer"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-stone-300">GPU compute queue status and render alerts</span>
                  <input
                    type="checkbox"
                    checked={renderAlerts}
                    onChange={(e) => setRenderAlerts(e.target.checked)}
                    className="rounded bg-stone-900 border-stone-700 text-[#C5A869] focus:ring-0 cursor-pointer"
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-stone-800">
              <button
                onClick={() => setCurrentStep(2)}
                className="py-2.5 px-5 rounded-lg border border-stone-800 hover:border-stone-700 text-stone-400 hover:text-stone-200 text-xs font-medium flex items-center gap-2 cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" /> Back
              </button>
              <button
                onClick={() => setCurrentStep(4)}
                className="py-3 px-8 rounded-lg bg-gradient-to-r from-[#C5A869] to-[#9E8345] hover:from-[#D8BC7D] text-[#07130E] font-semibold text-xs tracking-widest uppercase flex items-center gap-2 cursor-pointer shadow-lg shadow-[#C5A869]/20"
              >
                VIEW STUDIO TOUR <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Step 4: Studio Tour */}
        {currentStep === 4 && (
          <div className="bg-[#0C1E17]/90 border border-stone-800/90 rounded-2xl p-6 sm:p-10 backdrop-blur-xl shadow-2xl space-y-6">
            <div className="space-y-2 text-center max-w-xl mx-auto">
              <span className="text-xs font-mono uppercase tracking-widest text-[#C5A869] font-medium block">
                Step 04 • Architectural Studio Tour
              </span>
              <h2 className="text-2xl sm:text-3xl font-serif font-medium text-white tracking-tight">
                Your Production Suite Modules
              </h2>
              <p className="text-xs sm:text-sm text-stone-400 font-light">
                KGM Cinematic Studio OS orchestrates every step from architectural photography to VIP client delivery.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 pt-2">
              {tourModules.map((m, idx) => {
                const Icon = m.icon;
                return (
                  <div
                    key={idx}
                    className="p-3.5 rounded-xl bg-stone-950/70 border border-stone-800/80 hover:border-[#C5A869]/40 transition-all group"
                  >
                    <div className="w-8 h-8 rounded-lg bg-[#0B2B20] text-[#C5A869] flex items-center justify-center mb-2.5 group-hover:scale-105 transition-transform">
                      <Icon className="w-4 h-4" />
                    </div>
                    <h4 className="text-xs font-semibold text-stone-200 group-hover:text-white">
                      {m.title}
                    </h4>
                    <p className="text-[11px] text-stone-400 font-light mt-1 leading-relaxed">
                      {m.desc}
                    </p>
                  </div>
                );
              })}
            </div>

            <div className="pt-6 border-t border-stone-800 flex flex-col sm:flex-row items-center justify-between gap-4">
              <button
                onClick={() => setCurrentStep(3)}
                className="py-2.5 px-5 rounded-lg border border-stone-800 hover:border-stone-700 text-stone-400 hover:text-stone-200 text-xs font-medium flex items-center gap-2 cursor-pointer w-full sm:w-auto justify-center"
              >
                <ArrowLeft className="w-4 h-4" /> Back to Preferences
              </button>
              <button
                onClick={handleComplete}
                disabled={isSubmitting}
                className="w-full sm:w-auto py-3.5 px-10 rounded-lg bg-gradient-to-r from-[#C5A869] to-[#9E8345] hover:from-[#D8BC7D] text-[#07130E] font-semibold text-xs tracking-widest uppercase flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-[#C5A869]/20"
              >
                {isSubmitting ? (
                  <span>Entering Studio OS...</span>
                ) : (
                  <>
                    <span>ENTER STUDIO</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-stone-800/80 px-6 py-4 text-center text-xs text-stone-500">
        KGM CINEMATIC STUDIO OS • ONBOARDING & ENVIRONMENT INITIALIZATION
      </footer>
    </div>
  );
}
