'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Compass, ArrowRight, ArrowLeft, Sliders, CheckCircle2 } from 'lucide-react';

export default function CinematicMotionEnginePage() {
  const [selectedPreset, setSelectedPreset] = useState('dolly_in');

  const presets = [
    {
      id: 'dolly_in',
      name: 'Architectural Push (Axial Dolly In)',
      axis: 'Z-Forward (Central Optical Axis)',
      speed: '0.22 m/s',
      focal: '24mm Prime',
      desc: 'Controlled steady glide forward down the central architectural axis maintaining strict vertical lines.',
    },
    {
      id: 'dolly_out',
      name: 'Cinematic Pull-Out & Reveal',
      axis: 'Z-Backward (Receding Field)',
      speed: '0.18 m/s',
      focal: '28mm Prime',
      desc: 'Majestic backward drift expanding the viewing angle to reveal surrounding estate grounds.',
    },
    {
      id: 'lateral_slide',
      name: 'Lateral Architectural Slide',
      axis: 'X-Horizontal (Left to Right)',
      speed: '0.20 m/s',
      focal: '35mm Prime',
      desc: 'Smooth sideways tracking shot emphasizing continuous materials like fluted travertine or book-matched marble.',
    },
    {
      id: 'crane_rise',
      name: 'Vertical Crane / Jib Rise',
      axis: 'Y-Vertical (Ascending)',
      speed: '0.15 m/s',
      focal: '24mm Prime',
      desc: 'Vertical elevator rise revealing soaring double-height ceilings, statement chandeliers, and upper mezzanines.',
    },
    {
      id: 'orbital_arc',
      name: 'Orbital Arc Wrap',
      axis: 'Curved Polar Track',
      speed: '0.14 rad/s',
      focal: '35mm Prime',
      desc: 'Gentle circular arc revolving smoothly around island counters, freestanding sculptures, or pool fire pits.',
    },
    {
      id: 'hero_hold',
      name: 'Hero Filmic Geometry Hold',
      axis: 'Locked Optical Center (Subtle Drift)',
      speed: '0.05 m/s',
      focal: '24mm Prime',
      desc: 'Stabilized hero shot with micro-parallax drift for high-impact opening and closing statements.',
    },
  ];

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-8 max-w-7xl w-full mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-800 pb-6">
        <div>
          <span className="text-xs font-mono uppercase tracking-widest text-[#C5A869]">Pipeline Step 04</span>
          <h1 className="text-2xl sm:text-3xl font-serif font-medium text-white tracking-tight">
            Cinematic Motion Engine
          </h1>
          <p className="text-xs sm:text-sm text-stone-400 font-light mt-1">
            Camera motion presets calibrated strictly for architectural realism and zero synthetic distortion.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="/studio/create/story"
            className="py-2.5 px-4 rounded-lg border border-stone-800 text-stone-300 text-xs hover:border-stone-700"
          >
            ← Story Builder
          </Link>
          <Link
            href="/studio/generate"
            className="py-2.5 px-5 rounded-lg bg-[#C5A869] text-[#07130E] font-semibold text-xs tracking-wider uppercase flex items-center gap-2"
          >
            <span>Master 10s Generation →</span>
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {presets.map((preset) => (
          <div
            key={preset.id}
            onClick={() => setSelectedPreset(preset.id)}
            className={`p-5 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between space-y-4 ${
              selectedPreset === preset.id
                ? 'bg-[#0B2B20] border-[#C5A869] shadow-xl shadow-[#C5A869]/10'
                : 'bg-[#0C1E17]/80 border-stone-800 hover:border-stone-700'
            }`}
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono text-[#C5A869] uppercase tracking-wider">{preset.axis}</span>
                {selectedPreset === preset.id && <CheckCircle2 className="w-4 h-4 text-[#C5A869]" />}
              </div>
              <h3 className="text-base font-serif font-medium text-white">{preset.name}</h3>
              <p className="text-xs text-stone-400 font-light leading-relaxed">{preset.desc}</p>
            </div>

            <div className="pt-3 border-t border-stone-800/80 flex items-center justify-between text-[11px] font-mono text-stone-300">
              <span>Speed: {preset.speed}</span>
              <span className="text-[#C5A869]">Lens: {preset.focal}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
