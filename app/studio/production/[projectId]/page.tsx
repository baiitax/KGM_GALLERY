'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Clock,
  CheckCircle2,
  Cpu,
  Layers,
  Sliders,
  Play,
  ArrowLeft,
  RotateCcw,
  Film
} from 'lucide-react';

export default function ProductionMonitorPage({ params }: { params: { projectId: string } }) {
  const stages = [
    { name: 'ASSETS', status: 'completed', desc: '10 High-Res Photos Ingested & Calibrated' },
    { name: 'SCENES', status: 'completed', desc: '10 Architectural Shots Structured' },
    { name: 'GENERATION', status: 'completed', desc: 'GPU Multi-Pass Trajectories Computed' },
    { name: 'EDITING', status: 'completed', desc: 'Frame Pacing & Cross-Dissolves Assembled' },
    { name: 'MASTERING', status: 'completed', desc: 'ACES 2065-1 Color Grading & 4K DCI Encoding' },
    { name: 'EXPORT', status: 'completed', desc: '4-Format Synchronized Cuts Delivered' },
  ];

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-8 max-w-7xl w-full mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-800 pb-6">
        <div>
          <span className="text-xs font-mono uppercase tracking-widest text-[#C5A869]">Compute Monitor</span>
          <h1 className="text-2xl sm:text-3xl font-serif font-medium text-white tracking-tight">
            Production Pipeline Monitor
          </h1>
          <p className="text-xs sm:text-sm text-stone-400 font-light mt-1">
            Real-time pipeline progression, GPU compute telemetry, and master render logs.
          </p>
        </div>

        <Link
          href={`/studio/projects/${params.projectId}`}
          className="text-xs text-stone-400 hover:text-stone-200 flex items-center gap-1.5"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Project Detail
        </Link>
      </div>

      {/* Timeline Bar */}
      <div className="p-6 rounded-2xl bg-[#0C1E17]/80 border border-stone-800/90 shadow-xl space-y-6">
        <h3 className="text-sm font-serif font-medium text-white text-[#C5A869] uppercase tracking-wider">
          Production Lifecycle Stages
        </h3>

        <div className="grid grid-cols-2 md:grid-cols-6 gap-3">
          {stages.map((st, idx) => (
            <div
              key={st.name}
              className="p-3.5 rounded-xl bg-stone-950/80 border border-emerald-800/60 space-y-2 flex flex-col justify-between"
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono text-[#C5A869]">0{idx + 1}</span>
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              </div>
              <div>
                <p className="text-xs font-semibold text-stone-100">{st.name}</p>
                <p className="text-[10px] text-stone-400 font-light mt-0.5 leading-tight">{st.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Compute Cluster Logs */}
      <div className="p-6 rounded-2xl bg-[#0C1E17]/80 border border-stone-800/90 space-y-4">
        <div className="flex items-center justify-between text-xs font-mono">
          <span className="text-emerald-400 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            CLUSTER NODE: KGM-GPU-PRIMARY-01 (100% READY)
          </span>
          <span className="text-stone-400">FPS: 24.000 DCI</span>
        </div>

        <div className="p-4 rounded-xl bg-stone-950 font-mono text-xs text-stone-300 space-y-1.5 border border-stone-800">
          <p className="text-emerald-400">[04:15:00] [INGEST] Ingested 10 high-resolution architectural captures.</p>
          <p className="text-stone-400">[04:15:02] [SPATIAL] Neural room classification completed (Exterior, Foyer, Salon, Suite, Spa, Pool).</p>
          <p className="text-stone-400">[04:15:04] [TRAJECTORY] Compiled 10 physical camera motion vectors with anti-distortion guards.</p>
          <p className="text-stone-400">[04:15:08] [ACES] Applied 2065-1 Emerald Gold master color look-up table.</p>
          <p className="text-stone-400">[04:15:10] [MASTER] 16:9 4K Cinema Master compiled cleanly (21.6 MB).</p>
          <p className="text-[#C5A869]">[04:15:12] [SYNCHRONIZER] Exported 9:16 VIP Vertical, 1:1 Feed Showcase, and 4:5 Briefing.</p>
        </div>
      </div>
    </div>
  );
}
