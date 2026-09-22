'use client';

import React from 'react';
import { Layers, HardDrive, Sparkles, CheckCircle2 } from 'lucide-react';
import { ADMIN_SEED_DATA } from '@/lib/admin/analytics';

export default function AdminAssetIntelligencePage() {
  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-8 max-w-[1600px] w-full mx-auto">
      <div className="border-b border-stone-800 pb-6">
        <span className="text-xs font-mono uppercase tracking-widest text-[#C5A869]">Media Vault</span>
        <h1 className="text-2xl sm:text-3xl font-serif font-medium text-white tracking-tight">
          Asset Intelligence & Storage Analytics
        </h1>
        <p className="text-xs sm:text-sm text-stone-400 font-light mt-1">
          3,420 photographic assets under management (184.6 GB of 500 GB Master Vault).
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 rounded-3xl bg-[#081812]/90 border border-stone-800 space-y-2">
          <p className="text-xs font-mono text-stone-400">High-Resolution Photography</p>
          <p className="text-3xl font-serif text-white">96.2%</p>
          <p className="text-xs text-emerald-400 font-mono">3,290 4K+ captures</p>
        </div>
        <div className="p-6 rounded-3xl bg-[#081812]/90 border border-stone-800 space-y-2">
          <p className="text-xs font-mono text-stone-400">Asset Reuse Rate</p>
          <p className="text-3xl font-serif text-[#C5A869]">74.5%</p>
          <p className="text-xs text-stone-400 font-mono">Multi-project utilization</p>
        </div>
        <div className="p-6 rounded-3xl bg-[#081812]/90 border border-stone-800 space-y-2">
          <p className="text-xs font-mono text-stone-400">Zero-Distortion Verification</p>
          <p className="text-3xl font-serif text-emerald-400">100%</p>
          <p className="text-xs text-stone-400 font-mono">Geometric preservation</p>
        </div>
      </div>
    </div>
  );
}
