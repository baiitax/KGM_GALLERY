'use client';

import React from 'react';
import Link from 'next/link';
import { Building2, PlusCircle, ArrowRight, Eye, Film } from 'lucide-react';

export default function PropertiesPage() {
  const properties = [
    {
      id: 'prop_kgm_riyadh_01',
      title: 'The Sovereign Villa — Al-Malqa',
      ref: 'KGM-RUH-001',
      location: 'Northern Riyadh, Saudi Arabia',
      type: 'Luxury Villa',
      size: '18,500 sq ft (1,720 m²)',
      price: '$14,800,000 USD',
      image: '/uploads/villa_01_hero_exterior.jpg',
      filmsCount: 1,
      assetsCount: 10,
    },
  ];

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-8 max-w-7xl w-full mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-800 pb-6">
        <div>
          <span className="text-xs font-mono uppercase tracking-widest text-[#C5A869]">Property Portfolio</span>
          <h1 className="text-2xl sm:text-3xl font-serif font-medium text-white tracking-tight">
            Permanent Property Workspaces
          </h1>
          <p className="text-xs sm:text-sm text-stone-400 font-light mt-1">
            Permanent workspaces storing architectural assets, specs, and film deliverables.
          </p>
        </div>

        <Link
          href="/studio/create"
          className="py-2.5 px-5 rounded-lg bg-[#C5A869] text-[#07130E] font-semibold text-xs tracking-wider uppercase flex items-center gap-2"
        >
          <PlusCircle className="w-4 h-4" />
          <span>+ Register New Property</span>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {properties.map((prop) => (
          <div
            key={prop.id}
            className="rounded-2xl bg-[#0C1E17]/80 border border-stone-800/90 overflow-hidden shadow-xl flex flex-col justify-between"
          >
            <div>
              <div className="relative h-48 w-full">
                <img src={prop.image} alt={prop.title} className="w-full h-full object-cover" />
                <span className="absolute top-3 left-3 px-2 py-0.5 rounded bg-black/70 text-[#C5A869] text-[10px] font-mono border border-[#C5A869]/30">
                  {prop.ref}
                </span>
              </div>

              <div className="p-4 space-y-2">
                <h3 className="text-base font-serif font-medium text-white">{prop.title}</h3>
                <p className="text-xs text-stone-400 font-light">{prop.location}</p>
                <div className="flex items-center justify-between text-xs font-mono pt-2">
                  <span className="text-[#C5A869]">{prop.price}</span>
                  <span className="text-stone-300">{prop.size}</span>
                </div>
              </div>
            </div>

            <div className="p-4 pt-0 flex items-center justify-between border-t border-stone-800/80 mt-2 text-xs">
              <span className="text-stone-400 font-mono">{prop.assetsCount} Assets • {prop.filmsCount} Film</span>
              <Link
                href="/studio/projects/proj_kgm_riyadh_01"
                className="text-[#C5A869] hover:underline font-mono"
              >
                Open Workspace →
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
