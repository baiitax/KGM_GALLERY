'use client';

import React from 'react';
import { HardDrive, Trash2, CheckCircle2 } from 'lucide-react';
import { ADMIN_SEED_DATA } from '@/lib/admin/analytics';

export default function AdminStorageControlPage() {
  const kpis = ADMIN_SEED_DATA.kpis;

  const storageBreakdown = [
    { category: 'Uncompressed Master 4K Video', size: '112.4 GB', percent: 60.8, color: '#C5A869' },
    { category: 'High-Res Architectural Captures (RAW/JPEG)', size: '48.2 GB', percent: 26.1, color: '#10B981' },
    { category: 'Multi-Aspect Social Cuts (9:16 / 1:1)', size: '18.6 GB', percent: 10.1, color: '#38BDF8' },
    { category: 'Thumbnails & Frame Cache', size: '5.4 GB', percent: 3.0, color: '#78716C' },
  ];

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-8 max-w-[1600px] w-full mx-auto">
      <div className="border-b border-stone-800 pb-6">
        <span className="text-xs font-mono uppercase tracking-widest text-[#C5A869]">Vault Infrastructure</span>
        <h1 className="text-2xl sm:text-3xl font-serif font-medium text-white tracking-tight">
          Storage Control & Vault Governance
        </h1>
        <p className="text-xs sm:text-sm text-stone-400 font-light mt-1">
          {kpis.storageUtilization.usedGB} GB used of {kpis.storageUtilization.allocatedGB} GB Master Vault allocation ({kpis.storageUtilization.percent}% capacity).
        </p>
      </div>

      <div className="space-y-4">
        {storageBreakdown.map((b) => (
          <div key={b.category} className="p-5 rounded-2xl bg-[#081812]/90 border border-stone-800 space-y-2">
            <div className="flex justify-between text-xs font-mono">
              <span className="text-white font-semibold">{b.category}</span>
              <span className="text-[#C5A869] font-bold">{b.size} ({b.percent}%)</span>
            </div>
            <div className="w-full h-2 rounded-full bg-stone-950 overflow-hidden">
              <div className="h-full" style={{ width: `${b.percent}%`, backgroundColor: b.color }}></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
