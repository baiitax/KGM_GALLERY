'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Sparkles, ArrowLeft, ArrowUp, ArrowDown, Eye, CheckCircle2 } from 'lucide-react';
import { ADMIN_SEED_DATA, GalleryItem } from '@/lib/admin/analytics';

export default function FeaturedWorksManagerPage() {
  const [featured, setFeatured] = useState<GalleryItem[]>(
    ADMIN_SEED_DATA.galleryItems.filter((i) => i.featuredOrder)
  );

  const moveUp = (idx: number) => {
    if (idx === 0) return;
    const next = [...featured];
    const temp = next[idx - 1];
    next[idx - 1] = next[idx];
    next[idx] = temp;
    setFeatured(next);
  };

  const moveDown = (idx: number) => {
    if (idx === featured.length - 1) return;
    const next = [...featured];
    const temp = next[idx + 1];
    next[idx + 1] = next[idx];
    next[idx] = temp;
    setFeatured(next);
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-8 max-w-[1600px] w-full mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-800 pb-6">
        <div>
          <span className="text-xs font-mono uppercase tracking-widest text-[#C5A869]">Showcase Curation</span>
          <h1 className="text-2xl sm:text-3xl font-serif font-medium text-white tracking-tight">
            Featured Works & Showcase Order
          </h1>
          <p className="text-xs sm:text-sm text-stone-400 font-light mt-1">
            Reorder prominent films displayed on public pitch decks and executive dashboards.
          </p>
        </div>

        <Link
          href="/admin/gallery"
          className="text-xs text-stone-400 hover:text-stone-200 flex items-center gap-1.5"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Gallery
        </Link>
      </div>

      <div className="space-y-4">
        {featured.map((item, idx) => (
          <div
            key={item.id}
            className="p-5 rounded-2xl bg-[#081812]/90 border border-stone-800 flex items-center justify-between gap-6"
          >
            <div className="flex items-center gap-4">
              <span className="w-8 h-8 rounded-lg bg-[#0B2B20] text-[#C5A869] font-mono font-bold text-sm flex items-center justify-center border border-[#C5A869]/40">
                #{idx + 1}
              </span>
              <img src={item.thumbnail} alt={item.title} className="w-24 h-16 object-cover rounded-xl border border-stone-800" />
              <div>
                <h3 className="text-base font-serif font-medium text-white">{item.title}</h3>
                <p className="text-xs text-stone-400 font-light">{item.property} • {item.views} Views</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => moveUp(idx)}
                disabled={idx === 0}
                className="p-2 rounded bg-stone-900 border border-stone-800 text-stone-300 hover:text-white disabled:opacity-30"
              >
                <ArrowUp className="w-4 h-4" />
              </button>
              <button
                onClick={() => moveDown(idx)}
                disabled={idx === featured.length - 1}
                className="p-2 rounded bg-stone-900 border border-stone-800 text-stone-300 hover:text-white disabled:opacity-30"
              >
                <ArrowDown className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
