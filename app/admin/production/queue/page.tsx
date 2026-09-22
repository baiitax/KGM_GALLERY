'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Clock, CheckCircle2, Pause, Play, RotateCcw, X, Cpu, HardDrive, Shield } from 'lucide-react';
import { ADMIN_SEED_DATA } from '@/lib/admin/analytics';

export default function AdminProductionQueuePage() {
  const [queuePaused, setQueuePaused] = useState(false);
  const [activeWorkers, setActiveWorkers] = useState(8);

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-8 max-w-[1600px] w-full mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-800 pb-6">
        <div>
          <span className="text-xs font-mono uppercase tracking-widest text-[#C5A869]">Compute Infrastructure</span>
          <h1 className="text-2xl sm:text-3xl font-serif font-medium text-white tracking-tight">
            Render Queue & GPU Cluster Governance
          </h1>
          <p className="text-xs sm:text-sm text-stone-400 font-light mt-1">
            Control distributed worker nodes, pause/resume pipelines, and manage worker allocation.
          </p>
        </div>

        {/* Infrastructure Actions */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setQueuePaused(!queuePaused)}
            className={`py-2.5 px-4 rounded-xl text-xs font-mono font-semibold flex items-center gap-2 cursor-pointer transition-all ${
              queuePaused
                ? 'bg-amber-950 border border-amber-800 text-amber-300'
                : 'bg-stone-900 border border-stone-700 text-stone-200 hover:border-[#C5A869]'
            }`}
          >
            {queuePaused ? <Play className="w-3.5 h-3.5" /> : <Pause className="w-3.5 h-3.5" />}
            <span>{queuePaused ? 'RESUME QUEUE' : 'PAUSE QUEUE'}</span>
          </button>
          <button
            onClick={() => alert('All stalled queue jobs re-dispatched to idle GPU nodes.')}
            className="py-2.5 px-4 rounded-xl bg-[#C5A869] text-[#07130E] text-xs font-semibold uppercase tracking-wider flex items-center gap-2 cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>RETRY FAILED JOBS</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="p-4 rounded-2xl bg-[#081812]/90 border border-stone-800">
          <p className="text-[10px] font-mono text-stone-400 uppercase">GPU Nodes Active</p>
          <p className="text-2xl font-serif text-white mt-1">8 / 8 Units</p>
          <span className="text-[10px] font-mono text-emerald-400 mt-1 block">100% Health</span>
        </div>
        <div className="p-4 rounded-2xl bg-[#081812]/90 border border-stone-800">
          <p className="text-[10px] font-mono text-stone-400 uppercase">Queue Depth</p>
          <p className="text-2xl font-serif text-[#C5A869] mt-1">4 Active Jobs</p>
          <span className="text-[10px] font-mono text-stone-400 mt-1 block">Avg latency: 18s</span>
        </div>
        <div className="p-4 rounded-2xl bg-[#081812]/90 border border-stone-800">
          <p className="text-[10px] font-mono text-stone-400 uppercase">Mastering Codec</p>
          <p className="text-2xl font-serif text-white mt-1">HEVC 4K DCI</p>
          <span className="text-[10px] font-mono text-[#C5A869] mt-1 block">ACES 2065-1</span>
        </div>
        <div className="p-4 rounded-2xl bg-[#081812]/90 border border-stone-800">
          <p className="text-[10px] font-mono text-stone-400 uppercase">Failure Rate</p>
          <p className="text-2xl font-serif text-emerald-400 mt-1">0.6%</p>
          <span className="text-[10px] font-mono text-stone-400 mt-1 block">Auto-recovered</span>
        </div>
      </div>

      {/* Live Jobs Table */}
      <div className="rounded-2xl bg-[#081812]/90 border border-stone-800 overflow-hidden">
        <div className="p-4 border-b border-stone-800 flex items-center justify-between">
          <h3 className="text-sm font-serif font-medium text-white">Active Render & Mastering Tasks</h3>
          <span className="text-xs font-mono text-stone-400">4 Jobs In-Flight</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono">
            <thead className="bg-stone-950/80 border-b border-stone-800 text-stone-400 uppercase text-[10px]">
              <tr>
                <th className="p-3.5">Task ID & Project</th>
                <th className="p-3.5">Assigned GPU Node</th>
                <th className="p-3.5">Pipeline Stage</th>
                <th className="p-3.5">Progress</th>
                <th className="p-3.5">Runtime</th>
                <th className="p-3.5 text-right">Control</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-800/80 text-stone-200">
              {ADMIN_SEED_DATA.activeJobs.map((j) => (
                <tr key={j.id} className="hover:bg-stone-900/40">
                  <td className="p-3.5">
                    <p className="font-semibold text-white">{j.project}</p>
                    <p className="text-[10px] text-stone-400">{j.id}</p>
                  </td>
                  <td className="p-3.5 text-[#C5A869]">KGM-NODE-01 (RTX 4090)</td>
                  <td className="p-3.5 text-stone-300">{j.stage}</td>
                  <td className="p-3.5">
                    <span className="text-[#C5A869] font-bold">{j.progress}%</span>
                  </td>
                  <td className="p-3.5 text-stone-400">{j.runtime}</td>
                  <td className="p-3.5 text-right">
                    <button className="text-stone-400 hover:text-rose-400">Cancel</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
