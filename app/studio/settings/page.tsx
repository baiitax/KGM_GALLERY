'use client';

import React from 'react';
import { Settings, Cpu, HardDrive, Shield, Sliders } from 'lucide-react';

export default function SettingsPage() {
  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-8 max-w-5xl w-full mx-auto">
      <div className="border-b border-stone-800 pb-6">
        <span className="text-xs font-mono uppercase tracking-widest text-[#C5A869]">System Configuration</span>
        <h1 className="text-2xl sm:text-3xl font-serif font-medium text-white tracking-tight">
          Studio OS Settings & Infrastructure
        </h1>
        <p className="text-xs sm:text-sm text-stone-400 font-light mt-1">
          Configure AI compute adapters, storage buckets, export defaults, and security policies.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 rounded-2xl bg-[#0C1E17]/80 border border-stone-800 space-y-4">
          <div className="flex items-center gap-2.5">
            <Cpu className="w-5 h-5 text-[#C5A869]" />
            <h3 className="text-base font-serif font-medium text-white">AI Engine Adapter</h3>
          </div>
          <p className="text-xs text-stone-400 font-light leading-relaxed">
            Provider-agnostic AI layer. Switching adapters preserves all shot scripts, color LUTs, and project history.
          </p>
          <div className="p-3 rounded-lg bg-stone-950 font-mono text-xs text-stone-300">
            Current Engine: <span className="text-[#C5A869]">KGM Native Neural (FFmpeg GPU Cluster)</span>
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-[#0C1E17]/80 border border-stone-800 space-y-4">
          <div className="flex items-center gap-2.5">
            <HardDrive className="w-5 h-5 text-[#C5A869]" />
            <h3 className="text-base font-serif font-medium text-white">Storage & Media Retention</h3>
          </div>
          <p className="text-xs text-stone-400 font-light leading-relaxed">
            Uncompressed master archival storage with redundant multi-region edge caches.
          </p>
          <div className="p-3 rounded-lg bg-stone-950 font-mono text-xs text-stone-300">
            Storage Used: <span className="text-emerald-400">4.2 GB / 500 GB Master Vault</span>
          </div>
        </div>
      </div>
    </div>
  );
}
