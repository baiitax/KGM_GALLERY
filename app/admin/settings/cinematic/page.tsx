'use client';

import React from 'react';
import { Film, CheckCircle2, Sliders } from 'lucide-react';

export default function AdminCinematicDefaultsPage() {
  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-8 max-w-5xl w-full mx-auto">
      <div className="border-b border-stone-800 pb-6">
        <span className="text-xs font-mono uppercase tracking-widest text-[#C5A869]">Master Standards</span>
        <h1 className="text-2xl sm:text-3xl font-serif font-medium text-white tracking-tight">
          Cinematic Defaults & Codec Standards
        </h1>
        <p className="text-xs sm:text-sm text-stone-400 font-light mt-1">
          System-wide defaults for shot duration, resolution, frame rate, and color pipeline.
        </p>
      </div>

      <div className="bg-[#081812]/90 border border-stone-800 rounded-3xl p-6 sm:p-8 space-y-4 text-xs font-mono text-stone-300">
        <div className="flex justify-between p-3 rounded-xl bg-stone-950 border border-stone-800">
          <span className="text-stone-400">Default Shot Duration:</span>
          <span className="text-[#C5A869] font-bold">10.0 Seconds Standard</span>
        </div>
        <div className="flex justify-between p-3 rounded-xl bg-stone-950 border border-stone-800">
          <span className="text-stone-400">Master Output Resolution:</span>
          <span className="text-white">4K DCI (3840x2160)</span>
        </div>
        <div className="flex justify-between p-3 rounded-xl bg-stone-950 border border-stone-800">
          <span className="text-stone-400">Color Science Profile:</span>
          <span className="text-emerald-400">ACES 2065-1 (KGM Emerald Gold)</span>
        </div>
        <div className="flex justify-between p-3 rounded-xl bg-stone-950 border border-stone-800">
          <span className="text-stone-400">Synchronized Output Cuts:</span>
          <span className="text-stone-200">16:9 • 9:16 • 1:1 • 4:5</span>
        </div>
      </div>
    </div>
  );
}
