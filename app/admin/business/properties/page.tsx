'use client';

import React from 'react';
import Link from 'next/link';
import { Building2, PlusCircle, ArrowRight } from 'lucide-react';

export default function AdminBusinessPropertiesPage() {
  const properties = [
    {
      id: 'prop_01',
      name: 'The Sovereign Villa — Al-Malqa',
      location: 'Northern Riyadh, Saudi Arabia',
      valuation: '$14,800,000 USD',
      assets: 10,
      films: 1,
      image: '/uploads/villa_01_hero_exterior.jpg',
    },
    {
      id: 'prop_02',
      name: 'Palm Jumeirah Sky Palace',
      location: 'Dubai Waterfront',
      valuation: '$22,500,000 USD',
      assets: 14,
      films: 1,
      image: '/uploads/villa_08_infinity_pool.jpg',
    },
  ];

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-8 max-w-[1600px] w-full mx-auto">
      <div className="border-b border-stone-800 pb-6">
        <span className="text-xs font-mono uppercase tracking-widest text-[#C5A869]">Property Portfolio</span>
        <h1 className="text-2xl sm:text-3xl font-serif font-medium text-white tracking-tight">
          Executive Property Directory
        </h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {properties.map((p) => (
          <div key={p.id} className="rounded-3xl bg-[#081812]/90 border border-stone-800 overflow-hidden">
            <img src={p.image} alt={p.name} className="w-full h-52 object-cover" />
            <div className="p-5 space-y-2">
              <h3 className="text-base font-serif font-medium text-white">{p.name}</h3>
              <p className="text-xs text-stone-400">{p.location}</p>
              <div className="pt-2 flex items-center justify-between text-xs font-mono">
                <span className="text-[#C5A869] font-bold">{p.valuation}</span>
                <span className="text-stone-300">{p.assets} Assets • {p.films} Film</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
