'use client';

import React from 'react';
import Link from 'next/link';
import { Tv, Smartphone, Square, Maximize2, Download } from 'lucide-react';
import { ADMIN_SEED_DATA } from '@/lib/admin/analytics';

export default function AdminDeliverablesPage() {
  const cuts = [
    { title: '16:9 Ultra HD 4K Cinema Master', count: 486, size: '21.6 MB avg', icon: Tv, file: 'film_proj_kgm_riyadh_01_master_16x9.mp4' },
    { title: '9:16 VIP Vertical Reel', count: 486, size: '19.5 MB avg', icon: Smartphone, file: 'film_proj_kgm_riyadh_01_social_portrait_9x16.mp4' },
    { title: '1:1 Curated Feed Showcase', count: 486, size: '13.0 MB avg', icon: Square, file: 'film_proj_kgm_riyadh_01_social_square_1x1.mp4' },
    { title: '4:5 Collector Briefing', count: 486, size: '2.9 MB avg', icon: Maximize2, file: 'film_proj_kgm_riyadh_01_whatsapp_fast.mp4' },
  ];

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-8 max-w-[1600px] w-full mx-auto">
      <div className="border-b border-stone-800 pb-6">
        <span className="text-xs font-mono uppercase tracking-widest text-[#C5A869]">Export Intelligence</span>
        <h1 className="text-2xl sm:text-3xl font-serif font-medium text-white tracking-tight">
          Mastered Output Deliverables
        </h1>
        <p className="text-xs sm:text-sm text-stone-400 font-light mt-1">
          1,944 total synchronized multi-aspect video assets delivered across the KGM network.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {cuts.map((c) => {
          const Icon = c.icon;
          return (
            <div key={c.title} className="p-6 rounded-3xl bg-[#081812]/90 border border-stone-800 space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-xl bg-[#0B2B20] text-[#C5A869] flex items-center justify-center border border-[#C5A869]/30">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="text-base font-serif font-medium text-white">{c.title}</h3>
                <p className="text-2xl font-serif text-[#C5A869] font-semibold">{c.count} Masters</p>
                <p className="text-xs text-stone-400 font-mono">Size: {c.size}</p>
              </div>

              <a
                href={`/exports/${c.file}`}
                download
                className="w-full py-2 px-3 rounded-lg bg-stone-900 hover:bg-stone-800 border border-stone-700 text-stone-200 text-xs font-mono flex items-center justify-center gap-2"
              >
                <Download className="w-3.5 h-3.5 text-[#C5A869]" /> Download Sample
              </a>
            </div>
          );
        })}
      </div>
    </div>
  );
}
