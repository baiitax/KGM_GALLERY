'use client';

import React, { useState, useEffect } from 'react';
import { 
  Palette, Sparkles, CheckCircle2, ShieldCheck, 
  Layers, Sliders, Type, Image as ImageIcon, Save
} from 'lucide-react';

export default function BrandPage() {
  const [brand, setBrand] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  useEffect(() => {
    fetch('/api/brand')
      .then(r => r.json())
      .then(data => {
        if (data.success) setBrand(data.brand);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await fetch('/api/brand', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(brand),
      });
      const data = await res.json();
      if (data.success) {
        setSavedSuccess(true);
        setTimeout(() => setSavedSuccess(false), 3000);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#07130E] text-white flex items-center justify-center">
        <div className="text-zinc-400 text-sm">Loading KGM Visual Identity...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#07130E] text-white p-6 md:p-10">
      <div className="max-w-5xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#1A3D2F]/60 pb-6">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[#C5A869] text-xs font-semibold tracking-wider uppercase">Identity Studio</span>
              <span className="text-[#1A3D2F]">•</span>
              <span className="text-zinc-400 text-xs">Visual Heritage & Motion Cards</span>
            </div>
            <h1 className="text-3xl font-serif text-[#F4EBD9]">Brand & Typography Studio</h1>
            <p className="text-zinc-400 text-sm mt-1">
              Configure corporate branding standards for Kurra Greenfield Merchants Limited across all cinematic film renders.
            </p>
          </div>

          <button
            onClick={handleSave}
            disabled={saving}
            className="flex items-center gap-2 bg-gradient-to-r from-[#C5A869] to-[#DFCA95] text-[#0B2B20] px-5 py-2.5 rounded-lg font-bold text-xs hover:brightness-110 transition shadow-lg shadow-[#C5A869]/20 disabled:opacity-50"
          >
            <Save className="w-4 h-4" />
            <span>{saving ? 'Saving Standards...' : 'Save Brand Settings'}</span>
          </button>
        </div>

        {savedSuccess && (
          <div className="p-4 bg-emerald-950/80 border border-emerald-500/50 rounded-2xl flex items-center gap-3 text-emerald-300 text-xs">
            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
            <span>Brand standards successfully updated. All subsequent film exports will reflect these parameters.</span>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Brand Identity */}
          <div className="bg-[#0B2319] p-6 rounded-3xl border border-[#1A3D2F] space-y-5">
            <h3 className="font-serif text-lg text-[#F4EBD9] flex items-center gap-2">
              <Palette className="w-4 h-4 text-[#C5A869]" />
              <span>Corporate Identity</span>
            </h3>

            <div className="space-y-4 text-xs">
              <div>
                <label className="block text-zinc-300 mb-1 font-medium">Company Legal Name</label>
                <input
                  type="text"
                  value={brand?.company_name || ''}
                  onChange={(e) => setBrand({ ...brand, company_name: e.target.value })}
                  className="w-full bg-[#071710] border border-[#1A3D2F] rounded-lg px-3 py-2 text-white"
                />
              </div>

              <div>
                <label className="block text-zinc-300 mb-1 font-medium">Brand Tagline</label>
                <input
                  type="text"
                  value={brand?.tagline || ''}
                  onChange={(e) => setBrand({ ...brand, tagline: e.target.value })}
                  className="w-full bg-[#071710] border border-[#1A3D2F] rounded-lg px-3 py-2 text-white"
                />
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-zinc-300 mb-1">Deep Green</label>
                  <div className="flex items-center gap-2 bg-[#071710] p-2 rounded-lg border border-[#1A3D2F]">
                    <div className="w-4 h-4 rounded bg-[#0B2B20] border border-white/20"></div>
                    <span className="font-mono text-[11px]">{brand?.primary_color || '#0B2B20'}</span>
                  </div>
                </div>

                <div>
                  <label className="block text-zinc-300 mb-1">KGM Gold</label>
                  <div className="flex items-center gap-2 bg-[#071710] p-2 rounded-lg border border-[#1A3D2F]">
                    <div className="w-4 h-4 rounded bg-[#C5A869] border border-white/20"></div>
                    <span className="font-mono text-[11px]">{brand?.secondary_color || '#C5A869'}</span>
                  </div>
                </div>

                <div>
                  <label className="block text-zinc-300 mb-1">Crisp Cream</label>
                  <div className="flex items-center gap-2 bg-[#071710] p-2 rounded-lg border border-[#1A3D2F]">
                    <div className="w-4 h-4 rounded bg-[#F4EBD9] border border-white/20"></div>
                    <span className="font-mono text-[11px]">{brand?.accent_color || '#F4EBD9'}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Intro / Outro Cards */}
          <div className="bg-[#0B2319] p-6 rounded-3xl border border-[#1A3D2F] space-y-5">
            <h3 className="font-serif text-lg text-[#F4EBD9] flex items-center gap-2">
              <Sliders className="w-4 h-4 text-[#C5A869]" />
              <span>Motion Cards & Overlays</span>
            </h3>

            <div className="space-y-4 text-xs">
              <div className="flex items-center justify-between p-3 bg-[#071710] rounded-xl border border-[#1A3D2F]">
                <div>
                  <div className="font-semibold text-white">Cinematic Intro Title Card</div>
                  <div className="text-[10px] text-zinc-400">Presents property title and KGM emblem at film start</div>
                </div>
                <input
                  type="checkbox"
                  checked={Boolean(brand?.show_intro_card)}
                  onChange={(e) => setBrand({ ...brand, show_intro_card: e.target.checked ? 1 : 0 })}
                  className="accent-[#C5A869] w-4 h-4"
                />
              </div>

              <div className="flex items-center justify-between p-3 bg-[#071710] rounded-xl border border-[#1A3D2F]">
                <div>
                  <div className="font-semibold text-white">VIP Contact Outro Card</div>
                  <div className="text-[10px] text-zinc-400">Renders agent details and QR code at film conclusion</div>
                </div>
                <input
                  type="checkbox"
                  checked={Boolean(brand?.show_outro_card)}
                  onChange={(e) => setBrand({ ...brand, show_outro_card: e.target.checked ? 1 : 0 })}
                  className="accent-[#C5A869] w-4 h-4"
                />
              </div>

              <div className="flex items-center justify-between p-3 bg-[#071710] rounded-xl border border-[#1A3D2F]">
                <div>
                  <div className="font-semibold text-white">Corner Watermark Emblem</div>
                  <div className="text-[10px] text-zinc-400">Subtle translucent luxury watermark in top-right corner</div>
                </div>
                <input
                  type="checkbox"
                  checked={Boolean(brand?.watermark_enabled)}
                  onChange={(e) => setBrand({ ...brand, watermark_enabled: e.target.checked ? 1 : 0 })}
                  className="accent-[#C5A869] w-4 h-4"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
