'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Film, ArrowRight, ArrowLeft, MoveVertical, Sparkles, Sliders } from 'lucide-react';

export default function CinematicStoryBuilderPage() {
  const [scenes, setScenes] = useState([
    {
      id: 1,
      title: 'Scene 01: Arrival & Horizon',
      type: 'Wide Establishing Shot',
      motion: 'Architectural Push (Axial Dolly In)',
      lens: '24mm Prime',
      duration: 10,
      image: '/uploads/villa_01_hero_exterior.jpg',
    },
    {
      id: 2,
      title: 'Scene 02: Approach & Pivot Entry',
      type: 'Vertical Reveal',
      motion: 'Vertical Jib / Crane Ascent',
      lens: '24mm Prime',
      duration: 10,
      image: '/uploads/villa_02_entrance_foyer.jpg',
    },
    {
      id: 3,
      title: 'Scene 03: Grand Salon Entertaining',
      type: 'Lateral Architectural Sweep',
      motion: 'Lateral Tracking (Left to Right)',
      lens: '28mm Prime',
      duration: 10,
      image: '/uploads/villa_03_living_salon.jpg',
    },
    {
      id: 4,
      title: 'Scene 04: Master Suite Sanctuary',
      type: 'Private Living Push',
      motion: 'Horizon Drift (Forward Push)',
      lens: '35mm Prime',
      duration: 10,
      image: '/uploads/villa_06_master_suite.jpg',
    },
    {
      id: 5,
      title: 'Scene 05: Spa Primary Bath',
      type: 'Wellness Detail',
      motion: 'Lateral Drift with Reflection',
      lens: '35mm Prime',
      duration: 10,
      image: '/uploads/villa_07_spa_bathroom.jpg',
    },
    {
      id: 6,
      title: 'Scene 06: Infinity Pool Oasis & Climax',
      type: 'Hero Twilight Reveal',
      motion: 'Waterline Forward Glide',
      lens: '24mm Prime',
      duration: 10,
      image: '/uploads/villa_08_infinity_pool.jpg',
    },
  ]);

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-8 max-w-7xl w-full mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-800 pb-6">
        <div>
          <span className="text-xs font-mono uppercase tracking-widest text-[#C5A869]">Pipeline Step 03</span>
          <h1 className="text-2xl sm:text-3xl font-serif font-medium text-white tracking-tight">
            Cinematic Story Builder
          </h1>
          <p className="text-xs sm:text-sm text-stone-400 font-light mt-1">
            Reorder scenes, calibrate focal lengths, and sequence narrative progression.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="/studio/create/assets"
            className="py-2.5 px-4 rounded-lg border border-stone-800 text-stone-300 text-xs hover:border-stone-700"
          >
            ← Assets & AI
          </Link>
          <Link
            href="/studio/create/motion"
            className="py-2.5 px-5 rounded-lg bg-[#C5A869] text-[#07130E] font-semibold text-xs tracking-wider uppercase flex items-center gap-2"
          >
            <span>Motion Engine →</span>
          </Link>
        </div>
      </div>

      <div className="space-y-4">
        {scenes.map((scene, idx) => (
          <div
            key={scene.id}
            className="p-4 sm:p-5 rounded-2xl bg-[#0C1E17]/80 border border-stone-800/90 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6 hover:border-[#C5A869]/40 transition-all"
          >
            <div className="flex items-center gap-4">
              <div className="relative w-28 h-20 rounded-xl overflow-hidden border border-stone-800 shrink-0">
                <img src={scene.image} alt={scene.title} className="w-full h-full object-cover" />
                <span className="absolute bottom-1 right-1 px-1.5 py-0.5 rounded bg-black/80 text-[9px] font-mono text-[#C5A869]">
                  {scene.duration}s
                </span>
              </div>

              <div>
                <span className="text-[10px] font-mono uppercase text-[#C5A869] tracking-wider">
                  {scene.type}
                </span>
                <h3 className="text-base font-serif font-medium text-white">{scene.title}</h3>
                <p className="text-xs text-stone-400 font-light mt-0.5">
                  Lens: {scene.lens} • Trajectory: {scene.motion}
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3 self-end md:self-center">
              <select
                value={scene.motion}
                onChange={() => {}}
                className="px-3 py-1.5 rounded-lg bg-stone-950 border border-stone-800 text-stone-300 text-xs font-mono outline-none"
              >
                <option>Architectural Push (Axial Dolly In)</option>
                <option>Vertical Jib / Crane Ascent</option>
                <option>Lateral Tracking (Left to Right)</option>
                <option>Horizon Drift (Forward Push)</option>
                <option>Waterline Forward Glide</option>
              </select>

              <span className="px-3 py-1.5 rounded-lg bg-stone-900 border border-stone-800 text-[#C5A869] text-xs font-mono font-semibold">
                10.0s Standard
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
