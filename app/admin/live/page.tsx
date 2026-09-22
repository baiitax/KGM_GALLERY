'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Activity, Play, Pause, RotateCcw, X, Eye, Film, Sliders, CheckCircle2 } from 'lucide-react';
import { ADMIN_SEED_DATA } from '@/lib/admin/analytics';

export default function AdminLiveOperationsPage() {
  const [jobs, setJobs] = useState(ADMIN_SEED_DATA.activeJobs);

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-8 max-w-[1600px] w-full mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-800 pb-6">
        <div>
          <span className="text-xs font-mono uppercase tracking-widest text-[#C5A869]">Real-Time Telemetry</span>
          <h1 className="text-2xl sm:text-3xl font-serif font-medium text-white tracking-tight">
            Live Production Operations
          </h1>
          <p className="text-xs sm:text-sm text-stone-400 font-light mt-1">
            Real-time pipeline progression across all distributed GPU rendering workers.
          </p>
        </div>

        <div className="flex items-center gap-2 p-2 rounded-xl bg-emerald-950/60 border border-emerald-800 text-emerald-300 text-xs font-mono">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
          <span>GPU Pipeline Online • 24.000 FPS Standard</span>
        </div>
      </div>

      <div className="space-y-4">
        {jobs.map((j) => (
          <div
            key={j.id}
            className="p-5 rounded-2xl bg-[#081812]/90 border border-stone-800 flex flex-col md:flex-row md:items-center justify-between gap-6"
          >
            <div className="space-y-1.5 flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <h3 className="text-base font-semibold text-white truncate">{j.project}</h3>
                <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 font-mono text-[10px] border border-emerald-800">
                  {j.status}
                </span>
              </div>
              <p className="text-xs text-stone-400 font-light">{j.property} • Operator: {j.operator}</p>
              
              {/* Progress bar */}
              <div className="pt-2 max-w-md">
                <div className="flex justify-between text-[10px] font-mono text-stone-400 mb-1">
                  <span>{j.stage}</span>
                  <span className="text-[#C5A869] font-bold">{j.progress}%</span>
                </div>
                <div className="w-full h-1.5 rounded-full bg-stone-950 overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-[#C5A869] to-[#E5CF98]" style={{ width: `${j.progress}%` }}></div>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 self-end md:self-center font-mono text-xs">
              <span className="text-stone-400">Elapsed: {j.runtime}</span>
              <Link
                href="/studio/projects/proj_kgm_riyadh_01/review"
                className="py-2 px-4 rounded-lg bg-stone-900 hover:bg-stone-800 border border-stone-700 text-stone-200 text-xs flex items-center gap-2"
              >
                <Eye className="w-3.5 h-3.5 text-[#C5A869]" />
                <span>View Stream</span>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
