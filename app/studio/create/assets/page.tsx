'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Upload, ArrowRight, ArrowLeft, Layers, Sparkles, CheckCircle2 } from 'lucide-react';

export default function AssetIntelligencePage() {
  const [selectedTag, setSelectedTag] = useState('all');

  const assets = [
    {
      id: 'img_01',
      url: '/uploads/villa_01_hero_exterior.jpg',
      name: 'villa_01_hero_exterior.jpg',
      category: 'exterior',
      label: 'Hero Exterior Dusk',
      res: '3840x2160',
      analysis: 'Façade symmetry, warm dusk lighting, optimal for axial dolly push.',
      score: '99%',
      isHero: true,
    },
    {
      id: 'img_02',
      url: '/uploads/villa_02_entrance_foyer.jpg',
      name: 'villa_02_entrance_foyer.jpg',
      category: 'entrance',
      label: 'Grand Pivot Foyer',
      res: '3840x2160',
      analysis: 'Double-height volume with custom chandelier, suited for crane ascent.',
      score: '98%',
      isHero: false,
    },
    {
      id: 'img_03',
      url: '/uploads/villa_03_living_salon.jpg',
      name: 'villa_03_living_salon.jpg',
      category: 'interior',
      label: 'Double-Height Salon',
      res: '3840x2160',
      analysis: 'Travertine mullions and bespoke lounge, suited for lateral tracking glide.',
      score: '97%',
      isHero: false,
    },
    {
      id: 'img_04',
      url: '/uploads/villa_06_master_suite.jpg',
      name: 'villa_06_master_suite.jpg',
      category: 'interior',
      label: 'Primary Suite Sanctuary',
      res: '3840x2160',
      analysis: 'Floor-to-ceiling glass, optimal for slow horizon drift.',
      score: '96%',
      isHero: false,
    },
    {
      id: 'img_05',
      url: '/uploads/villa_07_spa_bathroom.jpg',
      name: 'villa_07_spa_bathroom.jpg',
      category: 'interior',
      label: 'Spa Primary Bath',
      res: '3840x2160',
      analysis: 'Calacatta marble vanity and soaking tub, suited for reflection pan.',
      score: '95%',
      isHero: false,
    },
    {
      id: 'img_06',
      url: '/uploads/villa_08_infinity_pool.jpg',
      name: 'villa_08_infinity_pool.jpg',
      category: 'exterior',
      label: 'Infinity Pool Oasis',
      res: '3840x2160',
      analysis: 'Waterline symmetry with integrated fire pit, optimal for waterline glide.',
      score: '99%',
      isHero: false,
    },
  ];

  const filtered = selectedTag === 'all' ? assets : assets.filter((a) => a.category === selectedTag);

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-8 max-w-7xl w-full mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-800 pb-6">
        <div>
          <span className="text-xs font-mono uppercase tracking-widest text-[#C5A869]">Pipeline Step 02</span>
          <h1 className="text-2xl sm:text-3xl font-serif font-medium text-white tracking-tight">
            AI Asset Intelligence & Classification
          </h1>
          <p className="text-xs sm:text-sm text-stone-400 font-light mt-1">
            Automatic neural spatial classification and camera motion readiness scoring.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="/studio/create"
            className="py-2.5 px-4 rounded-lg border border-stone-800 text-stone-300 text-xs hover:border-stone-700"
          >
            ← Property Specs
          </Link>
          <Link
            href="/studio/create/story"
            className="py-2.5 px-5 rounded-lg bg-[#C5A869] text-[#07130E] font-semibold text-xs tracking-wider uppercase flex items-center gap-2"
          >
            <span>Story Builder →</span>
          </Link>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2">
        {['all', 'exterior', 'interior', 'entrance'].map((tag) => (
          <button
            key={tag}
            onClick={() => setSelectedTag(tag)}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono uppercase transition-all ${
              selectedTag === tag
                ? 'bg-[#0B2B20] border border-[#C5A869] text-[#C5A869]'
                : 'bg-stone-900 border border-stone-800 text-stone-400'
            }`}
          >
            {tag} ({tag === 'all' ? assets.length : assets.filter((a) => a.category === tag).length})
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map((item) => (
          <div
            key={item.id}
            className="rounded-2xl bg-[#0C1E17]/80 border border-stone-800/90 overflow-hidden shadow-xl flex flex-col"
          >
            <div className="relative h-48 w-full">
              <img src={item.url} alt={item.label} className="w-full h-full object-cover" />
              <div className="absolute top-3 left-3 flex items-center gap-2">
                <span className="px-2.5 py-1 rounded bg-black/70 text-[#C5A869] font-mono text-[10px] border border-[#C5A869]/30">
                  {item.label}
                </span>
                {item.isHero && (
                  <span className="px-2.5 py-1 rounded bg-[#C5A869] text-[#07130E] font-mono font-bold text-[10px]">
                    HERO SHOT
                  </span>
                )}
              </div>
            </div>

            <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
              <div>
                <div className="flex items-center justify-between text-xs font-mono text-stone-400">
                  <span>{item.res}</span>
                  <span className="text-emerald-400">Score: {item.score}</span>
                </div>
                <div className="mt-2 p-2.5 rounded-lg bg-stone-950/80 border border-stone-800 text-xs text-stone-300 font-light leading-relaxed">
                  <span className="text-[#C5A869] font-mono text-[10px] block mb-0.5">AI KINETIC SUITABILITY:</span>
                  {item.analysis}
                </div>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-stone-800 text-xs">
                <span className="text-emerald-400 font-mono flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Geometry Verified
                </span>
                <span className="text-[#C5A869] font-mono text-[11px]">10s Master Ready</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
