'use client';

import React from 'react';
import { HardDrive, CheckCircle2, ShieldCheck, Cpu } from 'lucide-react';
import { ADMIN_SEED_DATA } from '@/lib/admin/analytics';

export default function AdminSystemHealthPage() {
  const services = ADMIN_SEED_DATA.systemServices;

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-8 max-w-[1600px] w-full mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-800 pb-6">
        <div>
          <span className="text-xs font-mono uppercase tracking-widest text-[#C5A869]">Platform Infrastructure</span>
          <h1 className="text-2xl sm:text-3xl font-serif font-medium text-white tracking-tight">
            System Health & Core Services
          </h1>
          <p className="text-xs sm:text-sm text-stone-400 font-light mt-1">
            Real-time telemetry across authentication, database, GPU clusters, and edge networks.
          </p>
        </div>

        <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-emerald-950/80 border border-emerald-800 text-emerald-300 font-mono text-xs">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
          <span>ALL 7 CORE SERVICES OPERATIONAL</span>
        </div>
      </div>

      <div className="rounded-3xl bg-[#081812]/90 border border-stone-800 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono">
            <thead className="bg-stone-950/80 border-b border-stone-800 text-stone-400 uppercase text-[10px]">
              <tr>
                <th className="p-4">Subsystem Service</th>
                <th className="p-4">Category</th>
                <th className="p-4">Uptime SLA</th>
                <th className="p-4">Avg Latency</th>
                <th className="p-4">Last Verified</th>
                <th className="p-4 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-800/80 text-stone-200">
              {services.map((s) => (
                <tr key={s.name} className="hover:bg-stone-900/40">
                  <td className="p-4 font-semibold text-white">{s.name}</td>
                  <td className="p-4 text-stone-400">{s.category}</td>
                  <td className="p-4 text-emerald-400">{s.uptime}</td>
                  <td className="p-4 text-stone-300">{s.latency}</td>
                  <td className="p-4 text-stone-500">{s.lastChecked}</td>
                  <td className="p-4 text-right">
                    <span className="px-2.5 py-1 rounded bg-emerald-950 border border-emerald-800 text-emerald-300 font-bold text-[10px]">
                      {s.status.toUpperCase()}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
