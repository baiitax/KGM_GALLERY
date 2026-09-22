'use client';

import React from 'react';
import Link from 'next/link';
import { Briefcase, PlusCircle, ShieldCheck, Mail, Phone } from 'lucide-react';

export default function ClientsPage() {
  const clients = [
    {
      id: 'cli_01',
      name: 'Private Sovereign Family Office',
      contact: 'HRH Investment Advisor',
      email: 'advisory@sovereign-capital.sa',
      phone: '+966 11 800 9000',
      activeProjects: ['The Sovereign Villa — Al-Malqa'],
      ndaStatus: 'Active & Verified',
    },
    {
      id: 'cli_02',
      name: 'Al-Nakhla Prestige Investments',
      contact: 'Faris Al-Saud',
      email: 'faris.alsaud@kgm-estates.com',
      phone: '+966 50 123 4567',
      activeProjects: ['Palm Jumeirah Sky Palace'],
      ndaStatus: 'Active & Verified',
    },
  ];

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-8 max-w-7xl w-full mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-800 pb-6">
        <div>
          <span className="text-xs font-mono uppercase tracking-widest text-[#C5A869]">Client Relations</span>
          <h1 className="text-2xl sm:text-3xl font-serif font-medium text-white tracking-tight">
            Confidential Client Directory
          </h1>
          <p className="text-xs sm:text-sm text-stone-400 font-light mt-1">
            Permission-controlled high-net-worth accounts, VIP presentation access, and NDA tracking.
          </p>
        </div>

        <button
          type="button"
          className="py-2.5 px-5 rounded-lg bg-[#C5A869] text-[#07130E] font-semibold text-xs tracking-wider uppercase flex items-center gap-2"
        >
          <PlusCircle className="w-4 h-4" />
          <span>+ Register Client</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {clients.map((cli) => (
          <div
            key={cli.id}
            className="p-6 rounded-2xl bg-[#0C1E17]/80 border border-stone-800/90 shadow-xl space-y-4"
          >
            <div className="flex items-center justify-between">
              <h3 className="text-base font-serif font-medium text-white">{cli.name}</h3>
              <span className="px-2.5 py-1 rounded bg-emerald-950 border border-emerald-800 text-emerald-300 font-mono text-[10px]">
                {cli.ndaStatus}
              </span>
            </div>

            <div className="space-y-1.5 text-xs text-stone-300 font-mono">
              <p className="flex items-center gap-2 text-stone-400">
                <Mail className="w-3.5 h-3.5 text-[#C5A869]" /> {cli.email}
              </p>
              <p className="flex items-center gap-2 text-stone-400">
                <Phone className="w-3.5 h-3.5 text-[#C5A869]" /> {cli.phone}
              </p>
            </div>

            <div className="pt-3 border-t border-stone-800">
              <p className="text-[10px] font-mono text-[#C5A869] uppercase">Assigned Projects:</p>
              <p className="text-xs text-stone-200 mt-0.5">{cli.activeProjects.join(', ')}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
