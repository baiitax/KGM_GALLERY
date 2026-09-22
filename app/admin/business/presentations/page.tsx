'use client';

import React from 'react';
import Link from 'next/link';
import { Share2, Eye, ExternalLink, Lock } from 'lucide-react';

export default function AdminPresentationsPage() {
  const presentations = [
    {
      id: 'pres_01',
      title: 'The Sovereign Villa VIP Presentation',
      property: 'The Sovereign Villa — Al-Malqa',
      client: 'Private Sovereign Family Office',
      url: '/film/kgm-film-royal-villa-riyadh',
      views: 142,
      avgDuration: '98.4%',
      status: 'Active (Password Protected)',
    },
  ];

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-8 max-w-[1600px] w-full mx-auto">
      <div className="border-b border-stone-800 pb-6">
        <span className="text-xs font-mono uppercase tracking-widest text-[#C5A869]">Presentation Analytics</span>
        <h1 className="text-2xl sm:text-3xl font-serif font-medium text-white tracking-tight">
          Client Presentations & Viewer Telemetry
        </h1>
      </div>

      <div className="space-y-4">
        {presentations.map((p) => (
          <div key={p.id} className="p-6 rounded-3xl bg-[#081812]/90 border border-stone-800 flex items-center justify-between gap-6">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-serif font-medium text-white">{p.title}</h3>
                <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 font-mono text-[10px] border border-emerald-800">
                  {p.status}
                </span>
              </div>
              <p className="text-xs text-stone-400 mt-1">{p.property} • Client: {p.client}</p>
              <p className="text-[11px] font-mono text-[#C5A869] mt-2">
                {p.views} Unique Screenings • {p.avgDuration} Completion Rate
              </p>
            </div>

            <Link
              href={p.url}
              target="_blank"
              className="py-2.5 px-5 rounded-xl bg-[#C5A869] text-[#07130E] text-xs font-semibold uppercase tracking-wider flex items-center gap-2"
            >
              <ExternalLink className="w-4 h-4" />
              <span>Launch Live Deck</span>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
