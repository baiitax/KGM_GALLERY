'use client';

import React from 'react';
import Link from 'next/link';
import { Clock, CheckCircle2, Cpu, Download, Eye } from 'lucide-react';

export default function QueuePage() {
  const jobs = [
    {
      id: 'rend_01',
      title: 'The Sovereign Villa — 16:9 4K Cinema Master',
      property: 'Al-Malqa, Riyadh',
      stage: 'Master Rendered (ACES 2065-1)',
      status: 'Ready',
      duration: '100s',
      file: 'film_proj_kgm_riyadh_01_master_16x9.mp4',
    },
    {
      id: 'rend_02',
      title: '9:16 VIP Vertical Reel',
      property: 'Al-Malqa, Riyadh',
      stage: 'Synchronized Social Cut',
      status: 'Ready',
      duration: '100s',
      file: 'film_proj_kgm_riyadh_01_social_portrait_9x16.mp4',
    },
    {
      id: 'rend_03',
      title: '1:1 Lookbook Feed Cut',
      property: 'Al-Malqa, Riyadh',
      stage: 'Curated Square Master',
      status: 'Ready',
      duration: '100s',
      file: 'film_proj_kgm_riyadh_01_social_square_1x1.mp4',
    },
  ];

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-8 max-w-7xl w-full mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-800 pb-6">
        <div>
          <span className="text-xs font-mono uppercase tracking-widest text-[#C5A869]">Distributed Compute</span>
          <h1 className="text-2xl sm:text-3xl font-serif font-medium text-white tracking-tight">
            Production & Render Queue
          </h1>
          <p className="text-xs sm:text-sm text-stone-400 font-light mt-1">
            Real-time status of distributed GPU generation, FFmpeg multi-camera mastering, and exports.
          </p>
        </div>

        <div className="flex items-center gap-2 p-2 rounded-lg bg-emerald-950/60 border border-emerald-800 text-emerald-300 text-xs font-mono">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
          <span>GPU Nodes Operational (100% Health)</span>
        </div>
      </div>

      <div className="space-y-4">
        {jobs.map((j) => (
          <div
            key={j.id}
            className="p-5 rounded-2xl bg-[#0C1E17]/80 border border-stone-800/90 shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4"
          >
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-white">{j.title}</span>
                <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 font-mono text-[10px] border border-emerald-800">
                  {j.status}
                </span>
              </div>
              <p className="text-xs text-stone-400 font-light">{j.property} • {j.stage}</p>
            </div>

            <div className="flex items-center gap-3">
              <a
                href={`/exports/${j.file}`}
                download
                className="py-2 px-4 rounded-lg bg-stone-900 hover:bg-stone-800 border border-stone-700 text-stone-200 text-xs font-mono flex items-center gap-2"
              >
                <Download className="w-3.5 h-3.5 text-[#C5A869]" />
                <span>Download Asset</span>
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
