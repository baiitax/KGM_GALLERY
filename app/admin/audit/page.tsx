'use client';

import React, { useState } from 'react';
import { FileCheck, Search, Filter, Download } from 'lucide-react';

export default function AdminAuditLogsPage() {
  const [search, setSearch] = useState('');

  const logs = [
    { id: 'aud_01', who: 'Alexander Kurra', what: 'Master Film 4K Generated', when: '12 mins ago', where: 'GPU Cluster Node 01', object: 'The Sovereign Villa (10s Master)', result: 'SUCCESS' },
    { id: 'aud_02', who: 'Marcus Vance', what: 'Scene Approved for Multi-Aspect Cut', when: '45 mins ago', where: 'Review Player', object: 'Scene 06 (Waterline Glide)', result: 'SUCCESS' },
    { id: 'aud_03', who: 'Tariq Mansoor', what: 'Exported 9:16 VIP Vertical Reel', when: '1 hr ago', where: 'Export Synchronizer', object: 'Villa Social Portrait Reel', result: 'SUCCESS' },
    { id: 'aud_04', who: 'Alexander Kurra', what: 'Issued Studio Invitation Token', when: '3 hrs ago', where: 'Access Management', object: 'zahra.khalid@kgm-estates.com', result: 'SUCCESS' },
    { id: 'aud_05', who: 'Faris Al-Saud', what: 'Client Presentation Link Generated', when: '5 hrs ago', where: 'Presentation Builder', object: 'VIP Client Sovereign Deck', result: 'SUCCESS' },
  ];

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-8 max-w-[1600px] w-full mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-800 pb-6">
        <div>
          <span className="text-xs font-mono uppercase tracking-widest text-[#C5A869]">Compliance & Operations</span>
          <h1 className="text-2xl sm:text-3xl font-serif font-medium text-white tracking-tight">
            Cryptographic Audit Log Explorer
          </h1>
          <p className="text-xs sm:text-sm text-stone-400 font-light mt-1">
            Complete immutable record tracking WHO, WHAT, WHEN, WHERE, OBJECT, and RESULT across the studio.
          </p>
        </div>

        <button
          onClick={() => alert('Audit log exported in encrypted CSV format.')}
          className="py-2.5 px-5 rounded-xl bg-stone-900 border border-stone-700 hover:border-[#C5A869] text-stone-200 text-xs font-mono flex items-center gap-2"
        >
          <Download className="w-3.5 h-3.5 text-[#C5A869]" /> Export Audit Log (CSV)
        </button>
      </div>

      <div className="rounded-3xl bg-[#081812]/90 border border-stone-800 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono">
            <thead className="bg-stone-950/80 border-b border-stone-800 text-stone-400 uppercase text-[10px]">
              <tr>
                <th className="p-4">WHO</th>
                <th className="p-4">WHAT</th>
                <th className="p-4">OBJECT</th>
                <th className="p-4">WHERE</th>
                <th className="p-4">WHEN</th>
                <th className="p-4 text-right">RESULT</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-800/80 text-stone-200">
              {logs.map((l) => (
                <tr key={l.id} className="hover:bg-stone-900/40">
                  <td className="p-4 font-semibold text-white">{l.who}</td>
                  <td className="p-4 text-stone-300">{l.what}</td>
                  <td className="p-4 text-[#C5A869]">{l.object}</td>
                  <td className="p-4 text-stone-400">{l.where}</td>
                  <td className="p-4 text-stone-500">{l.when}</td>
                  <td className="p-4 text-right">
                    <span className="px-2 py-0.5 rounded bg-emerald-950 border border-emerald-800 text-emerald-300 font-bold text-[10px]">
                      {l.result}
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
