'use client';

import React, { useState } from 'react';
import { Shield, Sparkles, Sliders, CheckCircle2 } from 'lucide-react';

export default function BrandProfilesPage() {
  const [primaryColor, setPrimaryColor] = useState('#0B2B20');
  const [accentColor, setAccentColor] = useState('#C5A869');

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-8 max-w-5xl w-full mx-auto">
      <div className="border-b border-stone-800 pb-6">
        <span className="text-xs font-mono uppercase tracking-widest text-[#C5A869]">Institutional Identity</span>
        <h1 className="text-2xl sm:text-3xl font-serif font-medium text-white tracking-tight">
          Brand Governance & Identity Control
        </h1>
        <p className="text-xs sm:text-sm text-stone-400 font-light mt-1">
          Centrally managed brand marks, typography, end cards, and watermarks.
        </p>
      </div>

      <div className="bg-[#0C1E17]/80 border border-stone-800/90 rounded-2xl p-6 sm:p-8 space-y-6">
        <h3 className="text-sm font-serif font-medium text-white text-[#C5A869] uppercase tracking-wider">
          KGM Sovereign Brand Standards
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-medium text-stone-300 uppercase tracking-wider mb-2">
              Primary Institutional Color
            </label>
            <div className="flex items-center gap-3 p-3 rounded-xl bg-stone-950 border border-stone-800">
              <div className="w-8 h-8 rounded-lg bg-[#0B2B20] border border-stone-700"></div>
              <div>
                <p className="text-xs font-mono text-white">#0B2B20</p>
                <p className="text-[10px] text-stone-400">Deep Institutional Green</p>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-stone-300 uppercase tracking-wider mb-2">
              Signature Accent Color
            </label>
            <div className="flex items-center gap-3 p-3 rounded-xl bg-stone-950 border border-stone-800">
              <div className="w-8 h-8 rounded-lg bg-[#C5A869] border border-stone-700"></div>
              <div>
                <p className="text-xs font-mono text-white">#C5A869</p>
                <p className="text-[10px] text-stone-400">Satin Champagne Gold</p>
              </div>
            </div>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-stone-950/60 border border-stone-800 space-y-2 text-xs font-mono text-stone-300">
          <p className="text-[#C5A869] uppercase">Typography & End Cards</p>
          <p>Heading Font: Cinzel / Serif Classical Sovereign</p>
          <p>Body Font: Montserrat / Pure Geometric Clean</p>
          <p>Watermark: Enabled (Subtle Lower-Right KGM Monogram)</p>
        </div>
      </div>
    </div>
  );
}
