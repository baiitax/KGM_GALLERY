'use client';

import React from 'react';
import { Cpu, ShieldCheck, Lock } from 'lucide-react';

export default function AdminAISettingsPage() {
  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-8 max-w-5xl w-full mx-auto">
      <div className="border-b border-stone-800 pb-6">
        <span className="text-xs font-mono uppercase tracking-widest text-[#C5A869]">Inference Gateway</span>
        <h1 className="text-2xl sm:text-3xl font-serif font-medium text-white tracking-tight">
          AI Provider Gateway & Limits
        </h1>
        <p className="text-xs sm:text-sm text-stone-400 font-light mt-1">
          Configure model inference routes, concurrency limits, fallback chains, and secret tokens.
        </p>
      </div>

      <div className="bg-[#081812]/90 border border-stone-800 rounded-3xl p-6 sm:p-8 space-y-4 text-xs font-mono text-stone-300">
        <div className="flex justify-between p-3 rounded-xl bg-stone-950 border border-stone-800">
          <span className="text-stone-400">Primary AI Inference Route:</span>
          <span className="text-[#C5A869]">KGM Native Neural (FFmpeg GPU Cluster)</span>
        </div>
        <div className="flex justify-between p-3 rounded-xl bg-stone-950 border border-stone-800">
          <span className="text-stone-400">Maximum Concurrent GPU Workers:</span>
          <span className="text-white">8 Dedicated Worker Nodes</span>
        </div>
        <div className="flex justify-between p-3 rounded-xl bg-stone-950 border border-stone-800">
          <span className="text-stone-400">Retry Policy:</span>
          <span className="text-emerald-400">3 Automatic Retries with Exponential Backoff</span>
        </div>
        <div className="flex justify-between p-3 rounded-xl bg-stone-950 border border-stone-800">
          <span className="text-stone-400">Anti-Hallucination Architectural Guard:</span>
          <span className="text-emerald-400">Enforced (100% Strict Structural Preservation)</span>
        </div>
      </div>
    </div>
  );
}
