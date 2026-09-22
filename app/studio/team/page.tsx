'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Users, UserPlus, ShieldCheck, Mail, CheckCircle2 } from 'lucide-react';

export default function TeamPage() {
  const [team, setTeam] = useState<any[]>([]);

  useEffect(() => {
    fetch('/api/auth/me')
      .then(() => {
        setTeam([
          {
            id: 'usr_director_01',
            name: 'Alexander Kurra',
            email: 'director@kgm-estates.com',
            role: 'Super Admin / Director',
            department: 'Executive Creative Direction',
            status: 'Active',
          },
          {
            id: 'usr_partner_01',
            name: 'HRH Prince Faris Al Saud',
            email: 'faris.alsaud@kgm-estates.com',
            role: 'Senior Managing Partner',
            department: 'Client & Board Advisory',
            status: 'Active',
          },
          {
            id: 'usr_producer_01',
            name: 'Marcus Vance',
            email: 'producer@kgm-estates.com',
            role: 'Senior Film Producer',
            department: 'Mastering & Pipeline',
            status: 'Active',
          },
          {
            id: 'usr_editor_01',
            name: 'Tariq Mansoor',
            email: 'editor@kgm-estates.com',
            role: 'Video Editor & Colorist',
            department: 'Post-Production',
            status: 'Active',
          },
        ]);
      });
  }, []);

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-8 max-w-7xl w-full mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-800 pb-6">
        <div>
          <span className="text-xs font-mono uppercase tracking-widest text-[#C5A869]">Governance & Access</span>
          <h1 className="text-2xl sm:text-3xl font-serif font-medium text-white tracking-tight">
            Team & Role-Based Permissions (RBAC)
          </h1>
          <p className="text-xs sm:text-sm text-stone-400 font-light mt-1">
            Manage authorized creative directors, producers, editors, and client relations staff.
          </p>
        </div>

        <Link
          href="/auth/invite"
          className="py-2.5 px-5 rounded-lg bg-[#C5A869] text-[#07130E] font-semibold text-xs tracking-wider uppercase flex items-center gap-2"
        >
          <UserPlus className="w-4 h-4" />
          <span>+ Invite Studio Member</span>
        </Link>
      </div>

      <div className="rounded-2xl bg-[#0C1E17]/80 border border-stone-800/90 overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono">
            <thead className="bg-stone-950/80 border-b border-stone-800 text-stone-400 uppercase">
              <tr>
                <th className="p-4">Personnel</th>
                <th className="p-4">Role</th>
                <th className="p-4">Department</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-800/80 text-stone-200">
              {team.map((m) => (
                <tr key={m.id} className="hover:bg-stone-900/40">
                  <td className="p-4">
                    <p className="font-semibold text-white">{m.name}</p>
                    <p className="text-[10px] text-stone-400">{m.email}</p>
                  </td>
                  <td className="p-4 text-[#C5A869] font-medium">{m.role}</td>
                  <td className="p-4 text-stone-400">{m.department}</td>
                  <td className="p-4">
                    <span className="px-2 py-0.5 rounded bg-emerald-950 border border-emerald-800 text-emerald-300 text-[10px]">
                      {m.status}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <button className="text-stone-400 hover:text-[#C5A869]">Edit Role</button>
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
