'use client';

import React from 'react';
import Link from 'next/link';
import { Layers, PlusCircle, ArrowLeft } from 'lucide-react';
import { ADMIN_SEED_DATA } from '@/lib/admin/analytics';

export default function CollectionsManagerPage() {
  const collections = ADMIN_SEED_DATA.collections;

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-8 max-w-[1600px] w-full mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-800 pb-6">
        <div>
          <span className="text-xs font-mono uppercase tracking-widest text-[#C5A869]">Asset Taxonomy</span>
          <h1 className="text-2xl sm:text-3xl font-serif font-medium text-white tracking-tight">
            Curated Collections
          </h1>
          <p className="text-xs sm:text-sm text-stone-400 font-light mt-1">
            Organize architectural films and assets into thematic editorial collections.
          </p>
        </div>

        <button className="py-2.5 px-5 rounded-lg bg-[#C5A869] text-[#07130E] text-xs font-semibold uppercase tracking-wider flex items-center gap-2">
          <PlusCircle className="w-4 h-4" />
          <span>+ New Collection</span>
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {collections.map((col) => (
          <div
            key={col.id}
            className="rounded-2xl bg-[#081812]/90 border border-stone-800 overflow-hidden shadow-xl flex flex-col justify-between"
          >
            <div className="relative h-44 w-full">
              <img src={col.cover} alt={col.name} className="w-full h-full object-cover" />
              <span className="absolute bottom-2 right-2 px-2 py-0.5 rounded bg-black/80 text-[10px] font-mono text-[#C5A869]">
                {col.count} Assets
              </span>
            </div>
            <div className="p-4 space-y-2">
              <h3 className="text-base font-serif font-medium text-white">{col.name}</h3>
              <p className="text-xs text-stone-400 font-mono">ID: {col.id}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
