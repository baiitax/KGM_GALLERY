'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Film,
  Sparkles,
  Eye,
  Sliders,
  CheckCircle2,
  Share2,
  Download,
  Trash2,
  Filter,
  PlusCircle,
  Tag,
  Layers,
  Search
} from 'lucide-react';
import { ADMIN_SEED_DATA, GalleryItem } from '@/lib/admin/analytics';

export default function AdminGalleryPage() {
  const [items, setItems] = useState<GalleryItem[]>(ADMIN_SEED_DATA.galleryItems);
  const [selectedVisibility, setSelectedVisibility] = useState('ALL');
  const [search, setSearch] = useState('');

  const filtered = items.filter((item) => {
    if (selectedVisibility !== 'ALL' && item.visibility !== selectedVisibility) return false;
    if (search && !item.title.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const handleVisibilityChange = (id: string, newVis: any) => {
    setItems(items.map((i) => (i.id === id ? { ...i, visibility: newVis } : i)));
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-8 max-w-[1600px] w-full mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-800 pb-6">
        <div>
          <span className="text-xs font-mono uppercase tracking-widest text-[#C5A869]">Master Asset Governance</span>
          <h1 className="text-2xl sm:text-3xl font-serif font-medium text-white tracking-tight">
            Gallery Command Center
          </h1>
          <p className="text-xs sm:text-sm text-stone-400 font-light mt-1">
            Control visibility permissions, version history, featured showcases, and client-facing rights.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/admin/gallery/approval"
            className="py-2.5 px-4 rounded-xl bg-stone-900 border border-stone-700 text-stone-200 text-xs font-mono hover:border-[#C5A869] flex items-center gap-1.5"
          >
            <CheckCircle2 className="w-3.5 h-3.5 text-[#C5A869]" />
            <span>Approval Queue (2)</span>
          </Link>
          <Link
            href="/admin/gallery/featured"
            className="py-2.5 px-4 rounded-xl bg-[#C5A869] text-[#07130E] text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Featured Works</span>
          </Link>
        </div>
      </div>

      {/* Filter Tabs & Visibility Engine */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-2">
          {['ALL', 'FEATURED', 'PRESENTATION', 'CLIENT', 'TEAM', 'PRIVATE', 'ARCHIVED'].map((vis) => (
            <button
              key={vis}
              onClick={() => setSelectedVisibility(vis)}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all cursor-pointer ${
                selectedVisibility === vis
                  ? 'bg-[#0B2B20] border border-[#C5A869] text-[#C5A869] font-bold'
                  : 'bg-stone-900 border border-stone-800 text-stone-400 hover:text-stone-200'
              }`}
            >
              {vis}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="w-3.5 h-3.5 text-stone-500 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search gallery assets..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 rounded-lg bg-stone-950 border border-stone-800 text-xs text-stone-200 outline-none focus:border-[#C5A869]"
          />
        </div>
      </div>

      {/* Visual Masonry / Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((item) => (
          <div
            key={item.id}
            className="rounded-2xl bg-[#081812]/90 border border-stone-800/90 overflow-hidden shadow-xl hover:border-[#C5A869]/50 transition-all flex flex-col justify-between group"
          >
            <div>
              <div className="relative h-52 w-full overflow-hidden">
                <img
                  src={item.thumbnail}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-between p-3.5">
                  <div className="flex items-center justify-between">
                    <span className="px-2 py-0.5 rounded bg-black/70 text-[#C5A869] text-[10px] font-mono border border-[#C5A869]/30">
                      {item.resolution}
                    </span>
                    <span className="px-2 py-0.5 rounded bg-[#0B2B20] border border-[#C5A869]/60 text-[#C5A869] text-[10px] font-mono uppercase font-bold">
                      {item.visibility}
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-[#C5A869] uppercase">{item.property}</span>
                    <h3 className="text-sm font-serif font-medium text-white line-clamp-1">{item.title}</h3>
                  </div>
                </div>
              </div>

              <div className="p-4 space-y-2">
                <div className="flex items-center justify-between text-xs font-mono text-stone-400">
                  <span>Version: {item.version}</span>
                  <span className="text-emerald-400">{item.views} Views</span>
                </div>
                <p className="text-[11px] text-stone-400 font-light">
                  Client: {item.client} • Creator: {item.creator}
                </p>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {item.aspectRatios.map((asp) => (
                    <span key={asp} className="px-1.5 py-0.5 rounded bg-stone-900 border border-stone-800 text-[9px] font-mono text-stone-300">
                      {asp}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="p-4 pt-0 border-t border-stone-800/80 flex items-center justify-between mt-2 text-xs font-mono">
              <select
                value={item.visibility}
                onChange={(e) => handleVisibilityChange(item.id, e.target.value)}
                className="bg-stone-950 border border-stone-800 text-stone-300 text-[10px] px-2 py-1 rounded outline-none"
              >
                <option value="PRIVATE">Private</option>
                <option value="TEAM">Team Only</option>
                <option value="CLIENT">Client Only</option>
                <option value="PRESENTATION">Presentation</option>
                <option value="FEATURED">Featured</option>
                <option value="ARCHIVED">Archived</option>
              </select>

              <div className="flex items-center gap-2">
                <Link
                  href="/film/kgm-film-royal-villa-riyadh"
                  className="p-1.5 rounded bg-stone-900 hover:bg-stone-800 text-stone-300 hover:text-[#C5A869]"
                  title="Preview"
                >
                  <Eye className="w-3.5 h-3.5" />
                </Link>
                <a
                  href="/exports/film_proj_kgm_riyadh_01_master_16x9.mp4"
                  download
                  className="p-1.5 rounded bg-stone-900 hover:bg-stone-800 text-stone-300 hover:text-[#C5A869]"
                  title="Download MP4"
                >
                  <Download className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
