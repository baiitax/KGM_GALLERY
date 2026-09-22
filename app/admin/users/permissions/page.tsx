'use client';

import React from 'react';
import { Users, ShieldCheck, Check, Minus } from 'lucide-react';

export default function RolePermissionMatrixPage() {
  const permissions = [
    { name: 'View Projects & Portfolio', admin: true, director: true, producer: true, editor: true, reviewer: true },
    { name: 'Create & Edit Project Workspaces', admin: true, director: true, producer: true, editor: true, reviewer: false },
    { name: 'Upload High-Res Assets & Classify', admin: true, director: true, producer: true, editor: true, reviewer: false },
    { name: 'Trigger 10s GPU Master Renders', admin: true, director: true, producer: true, editor: false, reviewer: false },
    { name: 'Approve Scenes & Master Films', admin: true, director: true, producer: true, editor: false, reviewer: true },
    { name: 'Export Multi-Aspect 4K Cuts', admin: true, director: true, producer: true, editor: true, reviewer: false },
    { name: 'Configure Private Client Pitch Decks', admin: true, director: true, producer: false, editor: false, reviewer: false },
    { name: 'Manage Team & Issue Invitations', admin: true, director: false, producer: false, editor: false, reviewer: false },
    { name: 'Control Brand Governance & Colors', admin: true, director: true, producer: false, editor: false, reviewer: false },
    { name: 'System Infrastructure & Storage Vault', admin: true, director: false, producer: false, editor: false, reviewer: false },
  ];

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-8 max-w-[1600px] w-full mx-auto">
      <div className="border-b border-stone-800 pb-6">
        <span className="text-xs font-mono uppercase tracking-widest text-[#C5A869]">RBAC Governance</span>
        <h1 className="text-2xl sm:text-3xl font-serif font-medium text-white tracking-tight">
          Granular Role & Permission Matrix
        </h1>
        <p className="text-xs sm:text-sm text-stone-400 font-light mt-1">
          Server-side enforced role-based access control across all studio operating system capabilities.
        </p>
      </div>

      <div className="rounded-3xl bg-[#081812]/90 border border-stone-800 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono">
            <thead className="bg-stone-950/80 border-b border-stone-800 text-stone-400 uppercase text-[10px]">
              <tr>
                <th className="p-4">Studio Capability / Permission</th>
                <th className="p-4 text-center">Senior Admin</th>
                <th className="p-4 text-center">Creative Director</th>
                <th className="p-4 text-center">Producer</th>
                <th className="p-4 text-center">Video Editor</th>
                <th className="p-4 text-center">Reviewer</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-800/80 text-stone-200">
              {permissions.map((p) => (
                <tr key={p.name} className="hover:bg-stone-900/40">
                  <td className="p-4 font-semibold text-white">{p.name}</td>
                  <td className="p-4 text-center">{p.admin ? <Check className="w-4 h-4 text-emerald-400 mx-auto" /> : <Minus className="w-4 h-4 text-stone-600 mx-auto" />}</td>
                  <td className="p-4 text-center">{p.director ? <Check className="w-4 h-4 text-emerald-400 mx-auto" /> : <Minus className="w-4 h-4 text-stone-600 mx-auto" />}</td>
                  <td className="p-4 text-center">{p.producer ? <Check className="w-4 h-4 text-emerald-400 mx-auto" /> : <Minus className="w-4 h-4 text-stone-600 mx-auto" />}</td>
                  <td className="p-4 text-center">{p.editor ? <Check className="w-4 h-4 text-emerald-400 mx-auto" /> : <Minus className="w-4 h-4 text-stone-600 mx-auto" />}</td>
                  <td className="p-4 text-center">{p.reviewer ? <Check className="w-4 h-4 text-emerald-400 mx-auto" /> : <Minus className="w-4 h-4 text-stone-600 mx-auto" />}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
