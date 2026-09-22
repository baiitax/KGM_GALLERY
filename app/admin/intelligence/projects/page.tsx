'use client';

import React from 'react';
import { FolderKanban, Clock, TrendingUp } from 'lucide-react';

export default function AdminProjectAnalyticsPage() {
  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-8 max-w-[1600px] w-full mx-auto">
      <div className="border-b border-stone-800 pb-6">
        <span className="text-xs font-mono uppercase tracking-widest text-[#C5A869]">Production Metrics</span>
        <h1 className="text-2xl sm:text-3xl font-serif font-medium text-white tracking-tight">
          Project Performance Analytics
        </h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="p-6 rounded-3xl bg-[#081812]/90 border border-stone-800 space-y-2">
          <p className="text-xs font-mono text-stone-400">Total Projects</p>
          <p className="text-3xl font-serif text-white">32</p>
          <p className="text-xs text-emerald-400 font-mono">+28% growth</p>
        </div>
        <div className="p-6 rounded-3xl bg-[#081812]/90 border border-stone-800 space-y-2">
          <p className="text-xs font-mono text-stone-400">Completion Rate</p>
          <p className="text-3xl font-serif text-emerald-400">96.8%</p>
          <p className="text-xs text-stone-400 font-mono">25 completed</p>
        </div>
        <div className="p-6 rounded-3xl bg-[#081812]/90 border border-stone-800 space-y-2">
          <p className="text-xs font-mono text-stone-400">Avg Revision Count</p>
          <p className="text-3xl font-serif text-[#C5A869]">1.2</p>
          <p className="text-xs text-stone-400 font-mono">Per 10s scene</p>
        </div>
        <div className="p-6 rounded-3xl bg-[#081812]/90 border border-stone-800 space-y-2">
          <p className="text-xs font-mono text-stone-400">Avg Delivery Speed</p>
          <p className="text-3xl font-serif text-white">4.8 hrs</p>
          <p className="text-xs text-stone-400 font-mono">Ingest to export</p>
        </div>
      </div>
    </div>
  );
}
