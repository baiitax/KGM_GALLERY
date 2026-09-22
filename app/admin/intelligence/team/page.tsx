'use client';

import React from 'react';
import { Users, CheckCircle2, Clock } from 'lucide-react';

export default function AdminTeamIntelligencePage() {
  const teamWorkload = [
    { name: 'Alexander Kurra', role: 'Executive Creative Director', activeProjects: 4, generatedFilms: 84, turnaround: '3.2 hrs', load: '78%' },
    { name: 'Marcus Vance', role: 'Senior Film Producer', activeProjects: 6, generatedFilms: 120, turnaround: '4.1 hrs', load: '85%' },
    { name: 'Tariq Mansoor', role: 'Video Editor & Colorist', activeProjects: 5, generatedFilms: 98, turnaround: '3.8 hrs', load: '72%' },
    { name: 'Elena Vance', role: 'Creative Producer', activeProjects: 3, generatedFilms: 64, turnaround: '4.5 hrs', load: '60%' },
  ];

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-8 max-w-[1600px] w-full mx-auto">
      <div className="border-b border-stone-800 pb-6">
        <span className="text-xs font-mono uppercase tracking-widest text-[#C5A869]">Operational Capacity</span>
        <h1 className="text-2xl sm:text-3xl font-serif font-medium text-white tracking-tight">
          Team Workload & Production Efficiency
        </h1>
        <p className="text-xs sm:text-sm text-stone-400 font-light mt-1">
          Workload balance and workflow turnaround times without arbitrary rankings.
        </p>
      </div>

      <div className="rounded-3xl bg-[#081812]/90 border border-stone-800 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono">
            <thead className="bg-stone-950/80 border-b border-stone-800 text-stone-400 uppercase text-[10px]">
              <tr>
                <th className="p-4">Personnel</th>
                <th className="p-4">Role</th>
                <th className="p-4">Active Projects</th>
                <th className="p-4">Films Mastered</th>
                <th className="p-4">Avg Turnaround</th>
                <th className="p-4 text-right">Capacity Load</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-800/80 text-stone-200">
              {teamWorkload.map((t) => (
                <tr key={t.name} className="hover:bg-stone-900/40">
                  <td className="p-4 font-semibold text-white">{t.name}</td>
                  <td className="p-4 text-[#C5A869]">{t.role}</td>
                  <td className="p-4">{t.activeProjects} active</td>
                  <td className="p-4">{t.generatedFilms} masters</td>
                  <td className="p-4 text-emerald-400">{t.turnaround}</td>
                  <td className="p-4 text-right font-bold text-stone-300">{t.load}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
