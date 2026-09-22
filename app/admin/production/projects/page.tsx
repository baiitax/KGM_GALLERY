'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { FolderKanban, PlusCircle, Search, Eye, Download, Play, CheckCircle2 } from 'lucide-react';
import { ADMIN_SEED_DATA } from '@/lib/admin/analytics';

export default function AdminProductionProjectsPage() {
  const [filter, setFilter] = useState('all');

  const projects = [
    {
      id: 'proj_kgm_riyadh_01',
      title: 'The Sovereign Villa — Al-Malqa',
      property: 'Northern Riyadh Compound',
      client: 'Private Sovereign Family Office',
      stage: 'Completed',
      scenes: 10,
      updated: 'Today',
      image: '/uploads/villa_01_hero_exterior.jpg',
    },
    {
      id: 'proj_kgm_dubai_01',
      title: 'Palm Jumeirah Sky Palace',
      property: 'Dubai Waterfront',
      client: 'Al-Nakhla Prestige Investments',
      stage: 'Production',
      scenes: 8,
      updated: 'Yesterday',
      image: '/uploads/villa_08_infinity_pool.jpg',
    },
    {
      id: 'proj_kgm_dq_01',
      title: 'Diplomatic Quarter Manor',
      property: 'Riyadh DQ',
      client: 'Sovereign Advisory',
      stage: 'Rendering',
      scenes: 6,
      updated: '2 days ago',
      image: '/uploads/villa_03_living_salon.jpg',
    },
  ];

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-8 max-w-[1600px] w-full mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-800 pb-6">
        <div>
          <span className="text-xs font-mono uppercase tracking-widest text-[#C5A869]">Production Management</span>
          <h1 className="text-2xl sm:text-3xl font-serif font-medium text-white tracking-tight">
            All Studio Projects
          </h1>
          <p className="text-xs sm:text-sm text-stone-400 font-light mt-1">
            Executive oversight of all active, rendering, and completed master film productions.
          </p>
        </div>

        <Link
          href="/studio/create"
          className="py-2.5 px-5 rounded-lg bg-[#C5A869] text-[#07130E] font-semibold text-xs tracking-wider uppercase flex items-center gap-2"
        >
          <PlusCircle className="w-4 h-4" />
          <span>+ Create New Film</span>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((proj) => (
          <div
            key={proj.id}
            className="rounded-2xl bg-[#081812]/90 border border-stone-800 overflow-hidden shadow-xl flex flex-col justify-between"
          >
            <div>
              <div className="relative h-48 w-full">
                <img src={proj.image} alt={proj.title} className="w-full h-full object-cover" />
                <span className="absolute top-3 left-3 px-2 py-0.5 rounded bg-black/70 text-[#C5A869] text-[10px] font-mono border border-[#C5A869]/30">
                  {proj.stage}
                </span>
              </div>

              <div className="p-4 space-y-1.5">
                <h3 className="text-base font-serif font-medium text-white">{proj.title}</h3>
                <p className="text-xs text-stone-400 font-light">{proj.property} • Client: {proj.client}</p>
                <p className="text-[11px] font-mono text-[#C5A869] pt-1">{proj.scenes} Scenes • Updated {proj.updated}</p>
              </div>
            </div>

            <div className="p-4 pt-0 border-t border-stone-800/80 flex items-center justify-between mt-2 text-xs">
              <Link
                href={`/studio/projects/${proj.id}`}
                className="text-stone-300 hover:text-[#C5A869] font-mono"
              >
                Inspect Workflow →
              </Link>
              <div className="flex items-center gap-1.5">
                <Link
                  href={`/studio/projects/${proj.id}/review`}
                  className="p-1.5 rounded bg-stone-900 text-[#C5A869] hover:bg-stone-800"
                >
                  <Eye className="w-3.5 h-3.5" />
                </Link>
                <Link
                  href="/film/kgm-film-royal-villa-riyadh"
                  className="p-1.5 rounded bg-[#C5A869] text-[#07130E] hover:bg-[#D8BC7D]"
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
