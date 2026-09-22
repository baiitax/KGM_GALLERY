'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Play,
  Pause,
  RotateCcw,
  Maximize2,
  CheckCircle2,
  RefreshCw,
  Film,
  Sliders,
  Volume2,
  VolumeX,
  ArrowLeft,
  Share2
} from 'lucide-react';

export default function CinematicReviewPage({ params }: { params: { projectId: string } }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [activeSceneIndex, setActiveSceneIndex] = useState(0);
  const [masterApproved, setMasterApproved] = useState(true);

  const scenes = [
    { id: 1, title: 'Scene 01: Hero Dusk Exterior', motion: 'Axial Dolly Push', duration: '10s', status: 'approved', image: '/uploads/villa_01_hero_exterior.jpg' },
    { id: 2, title: 'Scene 02: Grand Pivot Foyer', motion: 'Vertical Jib Ascent', duration: '10s', status: 'approved', image: '/uploads/villa_02_entrance_foyer.jpg' },
    { id: 3, title: 'Scene 03: Double-Height Salon', motion: 'Lateral Tracking Glide', duration: '10s', status: 'approved', image: '/uploads/villa_03_living_salon.jpg' },
    { id: 4, title: 'Scene 04: Formal Banqueting', motion: 'Slow Diagonal Push', duration: '10s', status: 'approved', image: '/uploads/villa_04_formal_dining.jpg' },
    { id: 5, title: 'Scene 05: Primary Sanctuary', motion: 'Horizon Drift', duration: '10s', status: 'approved', image: '/uploads/villa_06_master_suite.jpg' },
    { id: 6, title: 'Scene 06: Spa Bath Reflection', motion: 'Lateral Reflection Pan', duration: '10s', status: 'approved', image: '/uploads/villa_07_spa_bathroom.jpg' },
    { id: 7, title: 'Scene 07: Infinity Oasis Waterline', motion: 'Waterline Forward Glide', duration: '10s', status: 'approved', image: '/uploads/villa_08_infinity_pool.jpg' },
  ];

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-8 max-w-7xl w-full mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-800 pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-[#C5A869] mb-1">
            <Link href="/studio/projects">Projects</Link>
            <span>/</span>
            <span>Review & Approvals</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-serif font-medium text-white tracking-tight">
            Cinematic Review & Master Approval
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href={`/studio/projects/${params.projectId}/deliverables`}
            className="py-2.5 px-5 rounded-lg bg-[#C5A869] text-[#07130E] font-semibold text-xs tracking-wider uppercase flex items-center gap-2"
          >
            <span>Deliverables Center →</span>
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Main Video Player */}
        <div className="lg:col-span-8 space-y-4">
          <div className="relative aspect-video rounded-2xl overflow-hidden border border-stone-800 bg-black shadow-2xl group">
            <img
              src={scenes[activeSceneIndex].image}
              alt="Active Scene"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-between p-4">
              <span className="self-start px-2.5 py-1 rounded bg-black/70 text-[#C5A869] text-xs font-mono border border-[#C5A869]/30">
                16:9 4K DCI • {scenes[activeSceneIndex].title}
              </span>

              {/* Player Controls */}
              <div className="space-y-3">
                <div className="w-full h-1.5 rounded-full bg-stone-800 overflow-hidden">
                  <div className="h-full bg-[#C5A869] w-3/4"></div>
                </div>

                <div className="flex items-center justify-between text-xs font-mono text-stone-300">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setIsPlaying(!isPlaying)}
                      className="p-2 rounded-full bg-[#C5A869] text-[#07130E] hover:scale-105 transition-transform cursor-pointer"
                    >
                      {isPlaying ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current" />}
                    </button>
                    <button onClick={() => setIsMuted(!isMuted)} className="p-1.5 hover:text-white">
                      {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                    </button>
                    <span>00:07 / 00:10</span>
                  </div>

                  <span className="text-[#C5A869]">ACES 2065-1 CALIBRATED</span>
                </div>
              </div>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-[#0C1E17]/80 border border-stone-800 flex items-center justify-between">
            <div>
              <p className="text-xs font-mono text-[#C5A869] uppercase">Active Scene Trajectory</p>
              <h3 className="text-sm font-semibold text-white">{scenes[activeSceneIndex].motion}</h3>
            </div>
            <div className="flex items-center gap-2">
              <button className="py-2 px-3 rounded bg-stone-900 border border-stone-700 text-stone-200 text-xs font-mono hover:border-[#C5A869] flex items-center gap-1.5">
                <RefreshCw className="w-3 h-3 text-[#C5A869]" /> Regenerate Scene
              </button>
              <button className="py-2 px-4 rounded bg-emerald-950 border border-emerald-700 text-emerald-300 text-xs font-mono flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5" /> Approve Scene
              </button>
            </div>
          </div>
        </div>

        {/* Scene List Sidebar */}
        <div className="lg:col-span-4 space-y-4">
          <div className="p-4 rounded-2xl bg-[#0C1E17]/80 border border-stone-800 space-y-3">
            <h3 className="text-xs font-mono uppercase tracking-widest text-[#C5A869]">
              Scene Sequence Review ({scenes.length})
            </h3>
            <div className="space-y-2 max-h-[480px] overflow-y-auto pr-1">
              {scenes.map((sc, idx) => (
                <button
                  key={sc.id}
                  onClick={() => setActiveSceneIndex(idx)}
                  className={`w-full p-2.5 rounded-xl border text-left flex items-center gap-3 transition-all cursor-pointer ${
                    activeSceneIndex === idx
                      ? 'bg-[#0B2B20] border-[#C5A869]'
                      : 'bg-stone-950/60 border-stone-800/80 hover:border-stone-700'
                  }`}
                >
                  <img src={sc.image} alt={sc.title} className="w-14 h-10 object-cover rounded-md" />
                  <div className="flex-1 min-w-0 text-xs">
                    <p className="font-semibold text-stone-200 truncate">{sc.title}</p>
                    <p className="text-[10px] text-stone-400 font-mono truncate">{sc.motion}</p>
                  </div>
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                </button>
              ))}
            </div>

            <div className="pt-3 border-t border-stone-800">
              <button
                type="button"
                className="w-full py-3 rounded-lg bg-[#C5A869] hover:bg-[#D8BC7D] text-[#07130E] font-semibold text-xs tracking-wider uppercase flex items-center justify-center gap-2"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>APPROVE MASTER FOR EXPORT</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
