'use client';

import React from 'react';
import Link from 'next/link';
import { 
  LayoutTemplate, 
  Film, 
  Smartphone, 
  Tv, 
  Share2, 
  Sparkles, 
  Check, 
  DollarSign, 
  Key, 
  TrendingUp, 
  MessageSquare 
} from 'lucide-react';

export default function TemplatesPage() {
  const templates = [
    {
      id: 'sales_standard',
      name: 'Sales Video Master Template',
      objective: 'For Sale / Luxury Residential Acquisition',
      icon: DollarSign,
      opening: 'PROPERTY NAME • FOR SALE',
      body: '10–14 Cinematic shots from grand exterior through living salons, gourmet kitchen, primary suites, to twilight finale.',
      closing: 'Price, Location, Bedrooms | Bathrooms | Size, Exclusive Representation Contact & WhatsApp',
      bestFor: 'Luxury Villas, Mansions, Penthouses, Prime Estates',
      duration: '100–140s total',
      aspectRatios: ['16:9 4K', '9:16 Reel', '1:1 Square', 'WhatsApp Fast'],
    },
    {
      id: 'rental_standard',
      name: 'Executive Rental & Leasing Showcase',
      objective: 'For Rent / Short-Term VIP Stay / Long-Term Lease',
      icon: Key,
      opening: 'PROPERTY NAME • LUXURY LEASE / EXECUTIVE RESIDENCE',
      body: '6–8 Curated shots focusing on lifestyle spaces, primary sanctuary, wellness spa, and entertainment terrace.',
      closing: 'Monthly/Annual Lease Rate, Move-in Date, Furnishing Status, Agent Contact',
      bestFor: 'Serviced Apartments, Sky Penthouses, Diplomate Residences',
      duration: '60–80s total',
      aspectRatios: ['9:16 Vertical Reel', '16:9 Landscape', '1:1 Square'],
    },
    {
      id: 'off_plan_investment',
      name: 'Commercial & Off-Plan Development Film',
      objective: 'Developer Showcase / Investor Briefing',
      icon: TrendingUp,
      opening: 'PROJECT NAME • OFF-PLAN INVESTMENT MASTER',
      body: 'Hero render establishing shots, masterplan aerials, interior lifestyle CGI, architectural amenities.',
      closing: 'Completion Q/Year, Payment Schedule, Developer Credentials, Private Advisory Booking',
      bestFor: 'High-Rise Towers, Master-Planned Communities, Commercial Developments',
      duration: '90–120s total',
      aspectRatios: ['16:9 4K Master', '9:16 Investor Reel', 'WhatsApp Compressed'],
    },
  ];

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-8 max-w-7xl w-full mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-800 pb-6">
        <div>
          <span className="text-xs font-mono uppercase tracking-widest text-[#C5A869]">Production Templates</span>
          <h1 className="text-2xl sm:text-3xl font-serif font-medium text-white tracking-tight">
            Architectural Master Templates
          </h1>
          <p className="text-xs sm:text-sm text-stone-400 font-light mt-1">
            Pre-configured production pipelines tailored for acquisitions, rentals, and investor pitches.
          </p>
        </div>
        <Link
          href="/studio/create"
          className="py-2.5 px-5 rounded-lg bg-[#C5A869] text-[#07130E] font-semibold text-xs tracking-wider uppercase"
        >
          + Create from Template
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {templates.map((tpl) => {
          const Icon = tpl.icon;
          return (
            <div
              key={tpl.id}
              className="p-6 rounded-2xl bg-[#0C1E17]/80 border border-stone-800/90 shadow-xl space-y-4 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-xl bg-[#0B2B20] text-[#C5A869] flex items-center justify-center border border-[#C5A869]/30">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="text-base font-serif font-medium text-white">{tpl.name}</h3>
                <p className="text-xs text-[#C5A869] font-mono">{tpl.objective}</p>
                <p className="text-xs text-stone-400 font-light leading-relaxed">{tpl.body}</p>
              </div>

              <div className="pt-4 border-t border-stone-800/80 space-y-3">
                <div className="text-[11px] font-mono text-stone-400">
                  <p className="text-stone-300">Format: {tpl.duration}</p>
                  <p className="mt-0.5">Cuts: {tpl.aspectRatios.join(', ')}</p>
                </div>
                <Link
                  href="/studio/create"
                  className="w-full py-2.5 px-4 rounded-lg bg-stone-900 hover:bg-stone-800 border border-stone-700 hover:border-[#C5A869] text-stone-200 text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 transition-all"
                >
                  <Sparkles className="w-3.5 h-3.5 text-[#C5A869]" /> Use Template
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
