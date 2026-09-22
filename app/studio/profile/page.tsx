'use client';

import React, { useState } from 'react';
import { User, ShieldCheck, Lock, Sliders, CheckCircle2 } from 'lucide-react';

export default function ProfilePage() {
  const [name, setName] = useState('Alexander Kurra');
  const [email, setEmail] = useState('director@kgm-estates.com');
  const [role, setRole] = useState('Executive Creative Director');
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-8 max-w-4xl w-full mx-auto">
      <div className="border-b border-stone-800 pb-6">
        <span className="text-xs font-mono uppercase tracking-widest text-[#C5A869]">Studio Identity</span>
        <h1 className="text-2xl sm:text-3xl font-serif font-medium text-white tracking-tight">
          User Profile & Security
        </h1>
        <p className="text-xs sm:text-sm text-stone-400 font-light mt-1">
          Manage your personal credentials, session tokens, and studio preferences.
        </p>
      </div>

      <div className="bg-[#0C1E17]/80 border border-stone-800/90 rounded-2xl p-6 sm:p-8 space-y-6">
        {saved && (
          <div className="p-3.5 rounded-lg bg-emerald-950/80 border border-emerald-800 text-emerald-200 text-xs flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>Profile and studio preferences saved successfully.</span>
          </div>
        )}

        <form onSubmit={handleSave} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-stone-300 uppercase tracking-wider mb-1.5">
                Full Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-lg bg-stone-950 border border-stone-800 text-stone-100 text-sm outline-none focus:border-[#C5A869]"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-stone-300 uppercase tracking-wider mb-1.5">
                Work Email
              </label>
              <input
                type="email"
                disabled
                value={email}
                className="w-full px-3.5 py-2.5 rounded-lg bg-stone-900 border border-stone-800 text-stone-400 text-sm outline-none cursor-not-allowed"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-stone-300 uppercase tracking-wider mb-1.5">
              Production Role
            </label>
            <input
              type="text"
              disabled
              value={role}
              className="w-full px-3.5 py-2.5 rounded-lg bg-stone-900 border border-stone-800 text-stone-400 text-sm outline-none"
            />
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="py-2.5 px-6 rounded-lg bg-[#C5A869] hover:bg-[#D8BC7D] text-[#07130E] font-semibold text-xs tracking-wider uppercase"
            >
              Save Profile Preferences
            </button>
          </div>
        </form>

        <div className="pt-6 border-t border-stone-800 space-y-3">
          <h4 className="text-xs font-mono uppercase tracking-widest text-[#C5A869]">Active Sessions</h4>
          <div className="p-3.5 rounded-xl bg-stone-950/80 border border-stone-800 flex items-center justify-between text-xs font-mono">
            <div>
              <p className="text-stone-200">Current Workstation (Chrome / macOS)</p>
              <p className="text-[10px] text-stone-500">IP: 197.210.x.x • Session Active</p>
            </div>
            <span className="text-emerald-400 text-[10px]">CURRENT</span>
          </div>
        </div>
      </div>
    </div>
  );
}
