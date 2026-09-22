'use client';

import React from 'react';
import { Activity, CheckCircle2, Film, Download, UserCheck, Shield } from 'lucide-react';

export default function ActivityPage() {
  const logs = [
    {
      id: 1,
      user: 'Alexander Kurra',
      action: 'Generated 10-Second 4K Cinema Master for The Sovereign Villa — Al-Malqa',
      time: '12 minutes ago',
      type: 'film',
    },
    {
      id: 2,
      user: 'Marcus Vance',
      action: 'Approved Scene 06 (Waterline Forward Glide) for 4-aspect export',
      time: '45 minutes ago',
      type: 'approval',
    },
    {
      id: 3,
      user: 'Tariq Mansoor',
      action: 'Exported 9:16 VIP Vertical Reel for Private Client Distribution',
      time: '1 hour ago',
      type: 'export',
    },
    {
      id: 4,
      user: 'Alexander Kurra',
      action: 'Dispatched authorized studio invitation to Zahra Khalid',
      time: '3 hours ago',
      type: 'security',
    },
  ];

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-8 max-w-7xl w-full mx-auto">
      <div className="border-b border-stone-800 pb-6">
        <span className="text-xs font-mono uppercase tracking-widest text-[#C5A869]">Audit & Operations</span>
        <h1 className="text-2xl sm:text-3xl font-serif font-medium text-white tracking-tight">
          Production Activity Center
        </h1>
        <p className="text-xs sm:text-sm text-stone-400 font-light mt-1">
          Complete cryptographic audit trail of all project generation, approvals, exports, and invitations.
        </p>
      </div>

      <div className="space-y-3">
        {logs.map((log) => (
          <div
            key={log.id}
            className="p-4 rounded-xl bg-[#0C1E17]/80 border border-stone-800 flex items-center justify-between text-xs"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-[#0B2B20] text-[#C5A869] flex items-center justify-center border border-[#C5A869]/30">
                <Activity className="w-4 h-4" />
              </div>
              <div>
                <p className="text-stone-200">
                  <strong className="text-white font-semibold">{log.user}</strong> {log.action}
                </p>
                <p className="text-[10px] text-stone-400 font-mono mt-0.5">{log.time}</p>
              </div>
            </div>
            <span className="px-2 py-0.5 rounded bg-stone-900 text-stone-400 text-[10px] font-mono">
              LOGGED
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
