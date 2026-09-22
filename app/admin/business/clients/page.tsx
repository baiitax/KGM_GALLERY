'use client';

import React from 'react';
import Link from 'next/link';
import { Briefcase, Eye, Mail, Phone, CheckCircle2, Share2 } from 'lucide-react';

export default function AdminBusinessClientsPage() {
  const clients = [
    {
      id: 'cli_01',
      name: 'Private Sovereign Family Office',
      contact: 'HRH Investment Advisor',
      email: 'advisory@sovereign-capital.sa',
      projectsCount: 4,
      viewsCount: 142,
      nda: 'Active',
      lastActive: '10 mins ago',
    },
    {
      id: 'cli_02',
      name: 'Al-Nakhla Prestige Investments',
      contact: 'Faris Al-Saud',
      email: 'faris.alsaud@kgm-estates.com',
      projectsCount: 2,
      viewsCount: 88,
      nda: 'Active',
      lastActive: 'Yesterday',
    },
    {
      id: 'cli_03',
      name: 'Kingdom Sovereign Estates Fund',
      contact: 'Marcus Vance',
      email: 'producer@kgm-estates.com',
      projectsCount: 3,
      viewsCount: 94,
      nda: 'Active',
      lastActive: '3 days ago',
    },
  ];

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-8 max-w-[1600px] w-full mx-auto">
      <div className="border-b border-stone-800 pb-6">
        <span className="text-xs font-mono uppercase tracking-widest text-[#C5A869]">Client Intelligence</span>
        <h1 className="text-2xl sm:text-3xl font-serif font-medium text-white tracking-tight">
          Executive Client Directory & Engagement
        </h1>
        <p className="text-xs sm:text-sm text-stone-400 font-light mt-1">
          Engagement timelines, private pitch deck views, and NDA compliance status.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {clients.map((c) => (
          <div key={c.id} className="p-6 rounded-3xl bg-[#081812]/90 border border-stone-800 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-serif font-medium text-white">{c.name}</h3>
              <span className="px-2 py-0.5 rounded bg-emerald-950 border border-emerald-800 text-emerald-300 font-mono text-[10px]">
                {c.nda}
              </span>
            </div>
            <div className="space-y-1.5 text-xs text-stone-400 font-mono">
              <p className="text-stone-300">{c.contact}</p>
              <p>{c.email}</p>
            </div>
            <div className="pt-3 border-t border-stone-800/80 flex items-center justify-between text-xs font-mono">
              <span className="text-stone-400">{c.projectsCount} Projects</span>
              <span className="text-[#C5A869]">{c.viewsCount} VIP Views</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
