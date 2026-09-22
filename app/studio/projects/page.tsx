'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  FolderKanban,
  PlusCircle,
  Search,
  SlidersHorizontal,
  Play,
  Eye,
  Download,
  Share2,
  Tv,
  CheckCircle2,
  Clock,
  Sparkles
} from 'lucide-react';

export default function ProjectsPage() {
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');

  const projects = [
    {
      id: 'proj_kgm_riyadh_01',
      title: 'The Sovereign Villa — Al-Malqa',
      propertyRef: 'KGM-RUH-001',
      location: 'Northern Riyadh, Saudi Arabia',
      status: 'completed',
      client: 'Private Sovereign Family Office',
      duration: '100s Master (10 Shots)',
      shots: 10,
      image: '/uploads/villa_01_hero_exterior.jpg',
      aspectRatios: ['16:9 4K', '9:16 VIP', '1:1', '4:5'],
      updatedAt: 'Today',
    },
  ];

  const filtered = projects.filter((p) => {
    if (filter !== 'all' && p.status !== filter) return false;
    if (search && !p.title.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-8 max-w-7xl w-full mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-800 pb-6">
        <div>
          <span className="text-xs font-mono uppercase tracking-widest text-[#C5A869]">Production Catalog</span>
          <h1 className="text-2xl sm:text-3xl font-serif font-medium text-white tracking-tight">
            Cinematic Projects
          </h1>
          <p className="text-xs sm:text-sm text-stone-400 font-light mt-1">
            Master property films, version control, and multi-format deliverable suites.
          </p>
        </div>

        <Link
          href="/studio/create"
          className="py-2.5 px-5 rounded-lg bg-[#C5A869] hover:bg-[#D8BC7D] text-[#07130E] font-semibold text-xs tracking-wider uppercase flex items-center gap-2 shadow-lg shadow-[#C5A869]/20 shrink-0 self-start sm:self-auto"
        >
          <PlusCircle className="w-4 h-4" />
          <span>+ Create New Film</span>
        </Link>
      </div>

      {/* Filters & Search */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Status Filters */}
        <div className="flex flex-wrap items-center gap-2">
          {[
            { id: 'all', label: 'All Projects' },
            { id: 'active', label: 'Active' },
            { id: 'completed', label: 'Completed' },
            { id: 'rendering', label: 'Rendering' },
            { id: 'review', label: 'In Review' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setFilter(tab.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                filter === tab.id
                  ? 'bg-[#0B2B20] border border-[#C5A869] text-[#C5A869]'
                  : 'bg-stone-900 border border-stone-800 text-stone-400 hover:text-stone-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Search Bar */}
        <div className="relative w-full sm:w-64">
          <Search className="w-3.5 h-3.5 text-stone-500 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search projects, properties..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 rounded-lg bg-stone-950 border border-stone-800 text-xs text-stone-200 placeholder-stone-600 outline-none focus:border-[#C5A869]"
          />
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((proj) => (
          <div
            key={proj.id}
            className="rounded-2xl bg-[#0C1E17]/80 border border-stone-800/90 overflow-hidden shadow-xl hover:border-[#C5A869]/50 transition-all flex flex-col group"
          >
            <div className="relative h-48 w-full overflow-hidden">
              <img
                src={proj.image}
                alt={proj.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-between p-3.5">
                <span className="self-start px-2 py-0.5 rounded bg-black/70 text-[#C5A869] text-[10px] font-mono border border-[#C5A869]/30">
                  {proj.propertyRef}
                </span>
                <span className="self-end px-2 py-0.5 rounded bg-emerald-950 border border-emerald-800 text-emerald-300 text-[10px] font-mono">
                  100% Mastered
                </span>
              </div>
            </div>

            <div className="p-4 flex-1 flex flex-col justify-between space-y-4">
              <div>
                <h3 className="text-base font-serif font-medium text-white">{proj.title}</h3>
                <p className="text-xs text-stone-400 font-light mt-0.5">{proj.location}</p>
                <p className="text-[11px] font-mono text-[#C5A869] mt-2">{proj.duration}</p>
              </div>

              <div className="pt-3 border-t border-stone-800 flex items-center justify-between gap-2">
                <Link
                  href={`/studio/projects/${proj.id}`}
                  className="py-1.5 px-3 rounded bg-stone-900 border border-stone-700 hover:border-[#C5A869] text-stone-200 text-xs font-mono transition-all"
                >
                  View Details
                </Link>
                <div className="flex items-center gap-1.5">
                  <Link
                    href={`/studio/projects/${proj.id}/review`}
                    title="Review Player"
                    className="p-1.5 rounded bg-stone-900 text-[#C5A869] hover:bg-stone-800"
                  >
                    <Eye className="w-3.5 h-3.5" />
                  </Link>
                  <Link
                    href={`/studio/projects/${proj.id}/deliverables`}
                    title="Deliverables"
                    className="p-1.5 rounded bg-stone-900 text-stone-300 hover:bg-stone-800"
                  >
                    <Download className="w-3.5 h-3.5" />
                  </Link>
                  <Link
                    href={`/film/kgm-film-royal-villa-riyadh`}
                    title="VIP Client Film"
                    className="p-1.5 rounded bg-[#C5A869] text-[#07130E] hover:bg-[#D8BC7D]"
                  >
                    <Play className="w-3.5 h-3.5 fill-current" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
