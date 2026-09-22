'use client';

import React from 'react';
import Link from 'next/link';
import { LineChart, BarChart3, TrendingUp, Sparkles, Sliders, DollarSign, Cpu, Layers } from 'lucide-react';
import { ADMIN_SEED_DATA } from '@/lib/admin/analytics';

export default function StrategicAnalyticsPage() {
  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-8 max-w-[1600px] w-full mx-auto">
      <div className="border-b border-stone-800 pb-6">
        <span className="text-xs font-mono uppercase tracking-widest text-[#C5A869]">Executive Intelligence</span>
        <h1 className="text-2xl sm:text-3xl font-serif font-medium text-white tracking-tight">
          Strategic Studio Analytics
        </h1>
        <p className="text-xs sm:text-sm text-stone-400 font-light mt-1">
          High-level operational efficiency, resource allocation, and production velocity.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="p-6 rounded-3xl bg-[#081812]/90 border border-stone-800 space-y-4">
          <div className="flex items-center gap-2 text-[#C5A869]">
            <LineChart className="w-5 h-5" />
            <h3 className="text-base font-serif font-medium text-white">Average Project Cycle Time</h3>
          </div>
          <div className="my-2">
            <span className="text-3xl font-serif text-white">4.8 Hours</span>
            <span className="text-xs text-emerald-400 block font-mono mt-1">-32% vs last month</span>
          </div>
          <p className="text-xs text-stone-400 font-light leading-relaxed">
            From initial architectural photo ingestion to approved 4-format synchronized delivery.
          </p>
        </div>

        <div className="p-6 rounded-3xl bg-[#081812]/90 border border-stone-800 space-y-4">
          <div className="flex items-center gap-2 text-[#C5A869]">
            <Cpu className="w-5 h-5" />
            <h3 className="text-base font-serif font-medium text-white">Average GPU Render Time</h3>
          </div>
          <div className="my-2">
            <span className="text-3xl font-serif text-white">18.4 Seconds</span>
            <span className="text-xs text-[#C5A869] block font-mono mt-1">10-Second 4K DCI Standard</span>
          </div>
          <p className="text-xs text-stone-400 font-light leading-relaxed">
            Multi-pass optical motion compilation and ACES 2065-1 color science pipeline.
          </p>
        </div>

        <div className="p-6 rounded-3xl bg-[#081812]/90 border border-stone-800 space-y-4">
          <div className="flex items-center gap-2 text-[#C5A869]">
            <DollarSign className="w-5 h-5" />
            <h3 className="text-base font-serif font-medium text-white">Average Cost per 4K Master</h3>
          </div>
          <div className="my-2">
            <span className="text-3xl font-serif text-emerald-400">$3.85 USD</span>
            <span className="text-xs text-stone-400 block font-mono mt-1">Includes all 4 synchronized cuts</span>
          </div>
          <p className="text-xs text-stone-400 font-light leading-relaxed">
            Calculated across model inference, GPU render hours, and uncompressed media vault storage.
          </p>
        </div>
      </div>
    </div>
  );
}
