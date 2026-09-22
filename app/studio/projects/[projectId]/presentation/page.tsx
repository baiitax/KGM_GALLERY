'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Share2,
  Lock,
  Calendar,
  Eye,
  Copy,
  ExternalLink,
  ShieldCheck,
  CheckCircle2,
  Tv,
  FileCheck
} from 'lucide-react';

export default function PresentationBuilderPage({ params }: { params: { projectId: string } }) {
  const [passwordProtected, setPasswordProtected] = useState(true);
  const [accessPassword, setAccessPassword] = useState('SOVEREIGN2026');
  const [expiryDays, setExpiryDays] = useState('30');
  const [copied, setCopied] = useState(false);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(`${window.location.origin}/film/kgm-film-royal-villa-riyadh`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-8 max-w-5xl w-full mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-800 pb-6">
        <div>
          <span className="text-xs font-mono uppercase tracking-widest text-[#C5A869]">VIP Client Suite</span>
          <h1 className="text-2xl sm:text-3xl font-serif font-medium text-white tracking-tight">
            Client Presentation Builder
          </h1>
          <p className="text-xs sm:text-sm text-stone-400 font-light mt-1">
            Configure private client-facing digital pitch decks with synchronized 4K film playback.
          </p>
        </div>

        <Link
          href="/film/kgm-film-royal-villa-riyadh"
          target="_blank"
          className="py-2.5 px-5 rounded-lg bg-[#C5A869] text-[#07130E] font-semibold text-xs tracking-wider uppercase flex items-center gap-2"
        >
          <ExternalLink className="w-3.5 h-3.5" />
          <span>Launch Live Pitch Deck</span>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Settings Panel */}
        <div className="md:col-span-7 bg-[#0C1E17]/80 border border-stone-800/90 rounded-2xl p-6 space-y-6">
          <h3 className="text-sm font-serif font-medium text-white uppercase tracking-wider text-[#C5A869]">
            Access & Security Governance
          </h3>

          <div className="space-y-4">
            <div className="flex items-center justify-between p-3.5 rounded-xl bg-stone-950/80 border border-stone-800">
              <div>
                <p className="text-xs font-semibold text-stone-200">Password Protection</p>
                <p className="text-[11px] text-stone-400">Require VIP credentials before unlocking film</p>
              </div>
              <input
                type="checkbox"
                checked={passwordProtected}
                onChange={(e) => setPasswordProtected(e.target.checked)}
                className="rounded bg-stone-900 border-stone-700 text-[#C5A869] focus:ring-0 cursor-pointer"
              />
            </div>

            {passwordProtected && (
              <div>
                <label className="block text-xs font-medium text-stone-300 uppercase tracking-wider mb-1.5">
                  Private Access Password
                </label>
                <input
                  type="text"
                  value={accessPassword}
                  onChange={(e) => setAccessPassword(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-lg bg-stone-950/80 border border-stone-800 focus:border-[#C5A869] text-stone-100 text-xs font-mono outline-none"
                />
              </div>
            )}

            <div>
              <label className="block text-xs font-medium text-stone-300 uppercase tracking-wider mb-1.5">
                Link Expiration Window
              </label>
              <select
                value={expiryDays}
                onChange={(e) => setExpiryDays(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-lg bg-stone-950 border border-stone-800 text-stone-100 text-xs outline-none focus:border-[#C5A869]"
              >
                <option value="7">7 Days (Active Negotiation)</option>
                <option value="30">30 Days (Standard Client Review)</option>
                <option value="90">90 Days (Executive Retainer)</option>
                <option value="permanent">Permanent VIP Showcase</option>
              </select>
            </div>
          </div>

          <div className="pt-4 border-t border-stone-800 flex items-center gap-3">
            <button
              onClick={handleCopyLink}
              className="py-3 px-6 rounded-lg bg-[#C5A869] hover:bg-[#D8BC7D] text-[#07130E] font-semibold text-xs uppercase tracking-wider flex items-center gap-2"
            >
              <Copy className="w-3.5 h-3.5" />
              <span>{copied ? 'Link Copied!' : 'Copy Presentation URL'}</span>
            </button>
          </div>
        </div>

        {/* Live Presentation Preview Card */}
        <div className="md:col-span-5 bg-[#0C1E17]/80 border border-stone-800/90 rounded-2xl p-6 space-y-4">
          <h3 className="text-sm font-serif font-medium text-white uppercase tracking-wider text-[#C5A869]">
            Client Telemetry & Views
          </h3>
          <div className="p-4 rounded-xl bg-stone-950/80 border border-stone-800 space-y-3 font-mono text-xs">
            <div className="flex justify-between">
              <span className="text-stone-400">Total VIP Views</span>
              <span className="text-[#C5A869]">14 Screenings</span>
            </div>
            <div className="flex justify-between">
              <span className="text-stone-400">Average Watch Duration</span>
              <span className="text-emerald-400">98.4% (Full Master)</span>
            </div>
            <div className="flex justify-between">
              <span className="text-stone-400">Inquiry Leads</span>
              <span className="text-stone-200">2 Ultra-HNW Offers</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
