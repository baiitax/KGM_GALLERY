'use client';

import React from 'react';
import { Lock, ShieldCheck, UserX, KeyRound, AlertTriangle } from 'lucide-react';

export default function AdminSecurityPage() {
  const securityEvents = [
    { id: 'sec_01', type: 'Successful Executive Authentication', user: 'director@kgm-estates.com', ip: '197.210.x.x', time: 'Just now', severity: 'Info' },
    { id: 'sec_02', type: 'Session Revocation (Previous Workstation)', user: 'producer@kgm-estates.com', ip: '102.89.x.x', time: '1 hour ago', severity: 'Low' },
    { id: 'sec_03', type: 'Invitation Token Consumed & Verified', user: 'faris.alsaud@kgm-estates.com', ip: '197.210.x.x', time: '4 hours ago', severity: 'Info' },
  ];

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-8 max-w-[1600px] w-full mx-auto">
      <div className="border-b border-stone-800 pb-6">
        <span className="text-xs font-mono uppercase tracking-widest text-[#C5A869]">Cryptographic Governance</span>
        <h1 className="text-2xl sm:text-3xl font-serif font-medium text-white tracking-tight">
          Security Center & Access Control
        </h1>
        <p className="text-xs sm:text-sm text-stone-400 font-light mt-1">
          Monitor active sessions, cryptographic tokens, password updates, and network security events.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 rounded-3xl bg-[#081812]/90 border border-stone-800 space-y-2">
          <p className="text-xs font-mono text-stone-400">Active Sessions</p>
          <p className="text-3xl font-serif text-white">4 Executive Nodes</p>
          <p className="text-xs text-emerald-400 font-mono">100% Verified SSL/TLS</p>
        </div>
        <div className="p-6 rounded-3xl bg-[#081812]/90 border border-stone-800 space-y-2">
          <p className="text-xs font-mono text-stone-400">Failed Authentication Attempts</p>
          <p className="text-3xl font-serif text-emerald-400">0 in 24 hrs</p>
          <p className="text-xs text-stone-400 font-mono">Rate-limiting enforced</p>
        </div>
        <div className="p-6 rounded-3xl bg-[#081812]/90 border border-stone-800 space-y-2">
          <p className="text-xs font-mono text-stone-400">Anti-Enumeration Guard</p>
          <p className="text-3xl font-serif text-[#C5A869]">Active</p>
          <p className="text-xs text-stone-400 font-mono">Timing-safe hashing</p>
        </div>
      </div>

      <div className="rounded-3xl bg-[#081812]/90 border border-stone-800 overflow-hidden">
        <div className="p-4 border-b border-stone-800">
          <h3 className="text-sm font-serif font-medium text-white">Security & Audit Event Stream</h3>
        </div>
        <div className="divide-y divide-stone-800/80 text-xs font-mono">
          {securityEvents.map((evt) => (
            <div key={evt.id} className="p-4 flex items-center justify-between hover:bg-stone-900/40">
              <div>
                <p className="font-semibold text-white">{evt.type}</p>
                <p className="text-stone-400 text-[11px]">{evt.user} • IP: {evt.ip}</p>
              </div>
              <div className="text-right">
                <span className="px-2 py-0.5 rounded bg-stone-900 text-stone-300 text-[10px]">{evt.severity}</span>
                <p className="text-[10px] text-stone-500 mt-0.5">{evt.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
