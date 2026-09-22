'use client';

import React from 'react';
import Link from 'next/link';
import { Film, Sparkles, CheckCircle2, Clock, Ratio, Play, Layers } from 'lucide-react';

const TEMPLATES = [
  {
    id: 'ultra_luxury_estate',
    title: 'Ultra-Luxury Private Estate Narrative',
    category: 'For Sale • Sovereign Portfolio',
    duration: '100s Master (10 Shots)',
    description: 'Slow, majestic pacing designed for 50M+ SAR properties. Emphasizes grand entrance volumes, infinity pools, and dusk lighting.',
    shots: ['Twilight Facade', 'Pivot Entrance Foyer', 'Great Room Lateral Glide', 'Calacatta Kitchen', 'Private Primary Suite', 'Soaking Spa Bath', 'Infinity Water Terrace', 'Alfresco Dining', 'Sunset Aerial Drift', 'Closing Identity'],
    recommendedAudio: 'The Sovereign Estate (Classical Piano & Cello)',
    aspectRatios: ['16:9 Cinema 4K', '9:16 Instagram Reels', '1:1 Square Feed', 'WhatsApp Mobile'],
    badge: 'Flagship Standard',
  },
  {
    id: 'penthouse_sunset',
    title: 'Metropolitan Penthouse & Sky Villa',
    category: 'For Sale / Executive Rental',
    duration: '60s High Impact (6 Shots)',
    description: 'Dynamic floor-to-ceiling glass sweeps, metropolitan skyline panoramas, and moody golden hour lighting transitions.',
    shots: ['Skyline Elevation', 'Double-Height Salon', 'Designer Kitchen Island', 'Primary Suite Skyline View', 'Cantilevered Balcony', 'Nightfall Wrap'],
    recommendedAudio: 'Elysian Sunset (Ambient Electronic & Strings)',
    aspectRatios: ['16:9 Cinema 4K', '9:16 Instagram Reels', '1:1 Square Feed'],
    badge: 'Popular',
  },
  {
    id: 'commercial_investment',
    title: 'Commercial HQ & Prime Institutional Asset',
    category: 'Commercial • Investment Pitch',
    duration: '80s Precision Walkthrough (8 Shots)',
    description: 'Architectural precision, clear sightlines, structural sustainability features, and boardroom prestige.',
    shots: ['Atrium Elevation', 'Security Concierge Turnstiles', 'Open Floorplate Office', 'Executive Boardroom', 'Private Terrace Lounge', 'Subterranean Valet', 'LEED Architecture Detail', 'Investment Summary Card'],
    recommendedAudio: 'Corporate Monumental (Modern Minimalist)',
    aspectRatios: ['16:9 Cinema 4K', '1:1 LinkedIn Post'],
    badge: 'Institutional',
  },
];

export default function TemplatesPage() {
  return (
    <div className="min-h-screen bg-[#07130E] text-white p-6 md:p-10">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="border-b border-[#1A3D2F]/60 pb-6">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[#C5A869] text-xs font-semibold tracking-wider uppercase">Editorial Blueprint</span>
            <span className="text-[#1A3D2F]">•</span>
            <span className="text-zinc-400 text-xs">Curated Narrative Structures</span>
          </div>
          <h1 className="text-3xl font-serif text-[#F4EBD9]">Narrative Film Templates</h1>
          <p className="text-zinc-400 text-sm mt-1">
            Industry-tested cinematic storyboards calibrated for luxury estates, sky penthouses, and commercial real estate presentations.
          </p>
        </div>

        {/* Templates Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {TEMPLATES.map((tpl) => (
            <div
              key={tpl.id}
              className="bg-[#0B2319] border border-[#1A3D2F] hover:border-[#C5A869]/60 rounded-3xl p-6 flex flex-col justify-between space-y-6 shadow-xl transition-all duration-300"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono font-semibold uppercase tracking-wider bg-[#124232] text-[#C5A869] px-2.5 py-1 rounded-full border border-[#C5A869]/30">
                    {tpl.badge}
                  </span>
                  <span className="text-xs text-zinc-400">{tpl.category}</span>
                </div>

                <div>
                  <h3 className="font-serif text-xl text-[#F4EBD9]">{tpl.title}</h3>
                  <p className="text-xs text-zinc-400 mt-2 leading-relaxed">{tpl.description}</p>
                </div>

                <div className="space-y-2 pt-2 border-t border-[#1A3D2F]/60">
                  <div className="text-[11px] font-semibold text-[#C5A869] uppercase tracking-wider">
                    Shot Sequencing ({tpl.duration})
                  </div>
                  <ul className="space-y-1.5">
                    {tpl.shots.map((shot, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-xs text-zinc-300">
                        <span className="w-4 h-4 rounded-full bg-[#071710] border border-[#C5A869]/30 flex items-center justify-center text-[9px] font-mono text-[#C5A869]">
                          {idx + 1}
                        </span>
                        <span>{shot}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="pt-4 border-t border-[#1A3D2F]/60 flex items-center justify-between">
                <div className="text-[10px] text-zinc-400">
                  Includes full multi-aspect mastering
                </div>

                <Link
                  href="/projects"
                  className="flex items-center gap-1.5 bg-[#0B2B20] hover:bg-[#124232] text-[#C5A869] border border-[#C5A869]/40 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Use Template</span>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
