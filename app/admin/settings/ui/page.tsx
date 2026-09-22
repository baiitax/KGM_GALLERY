'use client';

import React, { useState } from 'react';
import { SlidersHorizontal, CheckCircle2, LayoutDashboard } from 'lucide-react';

export default function AdminUISettingsPage() {
  const [theme, setTheme] = useState('dark_emerald');
  const [density, setDensity] = useState('executive');
  const [motion, setMotion] = useState('full');

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-8 max-w-5xl w-full mx-auto">
      <div className="border-b border-stone-800 pb-6">
        <span className="text-xs font-mono uppercase tracking-widest text-[#C5A869]">Interface Customization</span>
        <h1 className="text-2xl sm:text-3xl font-serif font-medium text-white tracking-tight">
          UI Settings & Executive Dashboard Builder
        </h1>
        <p className="text-xs sm:text-sm text-stone-400 font-light mt-1">
          Customize executive dashboard density, motion kinetics, and layout modules.
        </p>
      </div>

      <div className="bg-[#081812]/90 border border-stone-800 rounded-3xl p-6 sm:p-8 space-y-6">
        <div>
          <label className="block text-xs font-medium text-stone-300 uppercase tracking-wider mb-2">
            Executive Color Theme
          </label>
          <div className="grid grid-cols-2 gap-3">
            {[
              { id: 'dark_emerald', title: 'KGM Sovereign Dark Emerald', sub: '#050E0A / Deep Green & Gold' },
              { id: 'charcoal_minimal', title: 'Modern Charcoal & Platinum', sub: '#0A0A0A / Minimalist Noir' },
            ].map((t) => (
              <button
                key={t.id}
                onClick={() => setTheme(t.id)}
                className={`p-3.5 rounded-2xl text-left border transition-all cursor-pointer ${
                  theme === t.id
                    ? 'bg-[#0B2B20] border-[#C5A869] text-[#C5A869]'
                    : 'bg-stone-950 border-stone-800 text-stone-400'
                }`}
              >
                <p className="text-xs font-semibold text-stone-200">{t.title}</p>
                <p className="text-[10px] text-stone-400 mt-0.5">{t.sub}</p>
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-xs font-medium text-stone-300 uppercase tracking-wider mb-2">
            Dashboard Information Density
          </label>
          <div className="grid grid-cols-3 gap-3">
            {['comfortable', 'compact', 'executive'].map((d) => (
              <button
                key={d}
                onClick={() => setDensity(d)}
                className={`py-2.5 rounded-xl text-xs font-mono uppercase border transition-all cursor-pointer ${
                  density === d
                    ? 'bg-[#0B2B20] border-[#C5A869] text-[#C5A869]'
                    : 'bg-stone-950 border-stone-800 text-stone-400'
                }`}
              >
                {d}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
