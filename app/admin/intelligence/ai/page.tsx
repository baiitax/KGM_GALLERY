'use client';

import React from 'react';
import { Cpu, CheckCircle2, TrendingUp, Sliders } from 'lucide-react';
import { ADMIN_SEED_DATA } from '@/lib/admin/analytics';

export default function AdminAIIntelligencePage() {
  const models = ADMIN_SEED_DATA.aiModels;

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-8 max-w-[1600px] w-full mx-auto">
      <div className="border-b border-stone-800 pb-6">
        <span className="text-xs font-mono uppercase tracking-widest text-[#C5A869]">Model Telemetry</span>
        <h1 className="text-2xl sm:text-3xl font-serif font-medium text-white tracking-tight">
          AI Generation & Quality Intelligence
        </h1>
        <p className="text-xs sm:text-sm text-stone-400 font-light mt-1">
          Granular model performance, scene regeneration rates, and inference speed.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {models.map((m) => (
          <div key={m.model} className="p-6 rounded-3xl bg-[#081812]/90 border border-stone-800 space-y-4">
            <span className="text-[10px] font-mono text-[#C5A869] uppercase tracking-wider">{m.provider}</span>
            <h3 className="text-base font-serif font-medium text-white">{m.model}</h3>
            <div className="space-y-2 text-xs font-mono">
              <div className="flex justify-between">
                <span className="text-stone-400">Success Rate:</span>
                <span className="text-emerald-400 font-bold">{m.successRate}%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-400">Avg Latency:</span>
                <span className="text-white">{m.avgProcessingTimeSec}s</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-400">Volume:</span>
                <span className="text-[#C5A869]">{m.usageVolume} scenes</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-400">Cost/Shot:</span>
                <span className="text-stone-300">${m.costPerOutputUSD.toFixed(2)}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
