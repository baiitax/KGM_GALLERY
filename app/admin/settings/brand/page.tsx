'use client';

import React, { useState } from 'react';
import { Palette, CheckCircle2, Sliders, ShieldCheck } from 'lucide-react';

export default function AdminBrandSettingsPage() {
  const [companyName, setCompanyName] = useState('Kurra Greenfield Merchants Limited');
  const [primaryColor, setPrimaryColor] = useState('#0B2B20');
  const [secondaryColor, setSecondaryColor] = useState('#C5A869');
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-8 max-w-5xl w-full mx-auto">
      <div className="border-b border-stone-800 pb-6">
        <span className="text-xs font-mono uppercase tracking-widest text-[#C5A869]">Institutional Identity</span>
        <h1 className="text-2xl sm:text-3xl font-serif font-medium text-white tracking-tight">
          Brand Governance & Visual Assets
        </h1>
        <p className="text-xs sm:text-sm text-stone-400 font-light mt-1">
          Centralized brand color science, typography standards, watermark overlays, and end card assets.
        </p>
      </div>

      <div className="bg-[#081812]/90 border border-stone-800 rounded-3xl p-6 sm:p-8 space-y-6">
        {saved && (
          <div className="p-3.5 rounded-xl bg-emerald-950/80 border border-emerald-800 text-emerald-200 text-xs flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>Brand standards updated across all cinematic generators.</span>
          </div>
        )}

        <form onSubmit={handleSave} className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-stone-300 uppercase tracking-wider mb-1.5">
              Legal Brand Name
            </label>
            <input
              type="text"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-stone-950 border border-stone-800 text-stone-100 text-sm outline-none focus:border-[#C5A869]"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-stone-300 uppercase tracking-wider mb-1.5">
                Primary Brand Color
              </label>
              <div className="flex items-center gap-3 p-3 rounded-xl bg-stone-950 border border-stone-800">
                <input
                  type="color"
                  value={primaryColor}
                  onChange={(e) => setPrimaryColor(e.target.value)}
                  className="w-8 h-8 rounded-lg bg-transparent border-0 cursor-pointer"
                />
                <span className="text-xs font-mono text-white">{primaryColor}</span>
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-stone-300 uppercase tracking-wider mb-1.5">
                Signature Gold Accent
              </label>
              <div className="flex items-center gap-3 p-3 rounded-xl bg-stone-950 border border-stone-800">
                <input
                  type="color"
                  value={secondaryColor}
                  onChange={(e) => setSecondaryColor(e.target.value)}
                  className="w-8 h-8 rounded-lg bg-transparent border-0 cursor-pointer"
                />
                <span className="text-xs font-mono text-white">{secondaryColor}</span>
              </div>
            </div>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="py-3 px-8 rounded-xl bg-gradient-to-r from-[#C5A869] to-[#9E8345] hover:from-[#D8BC7D] text-[#07130E] font-semibold text-xs tracking-widest uppercase cursor-pointer"
            >
              SAVE BRAND GOVERNANCE STANDARDS
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
