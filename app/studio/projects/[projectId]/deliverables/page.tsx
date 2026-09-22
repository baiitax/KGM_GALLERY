'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Download,
  Share2,
  Tv,
  Smartphone,
  Square,
  Maximize2,
  CheckCircle2,
  Copy,
  ExternalLink,
  Eye,
  Film
} from 'lucide-react';

export default function DeliverablesPage() {
  const [copiedLink, setCopiedLink] = useState(false);

  const deliverables = [
    {
      id: 'del_16x9',
      title: '16:9 Ultra HD 4K Cinema Master',
      sub: 'Boardroom Displays, Private Theater Screenings',
      aspect: '16:9',
      icon: Tv,
      resolution: '3840x2160 DCI',
      fps: '24.000 FPS',
      size: '21.6 MB',
      file: 'film_proj_kgm_riyadh_01_master_16x9.mp4',
    },
    {
      id: 'del_9x16',
      title: '9:16 VIP Vertical Reel',
      sub: 'Instagram Reels, TikTok, WhatsApp Status',
      aspect: '9:16',
      icon: Smartphone,
      resolution: '1080x1920 HD',
      fps: '60.000 FPS',
      size: '19.5 MB',
      file: 'film_proj_kgm_riyadh_01_social_portrait_9x16.mp4',
    },
    {
      id: 'del_1x1',
      title: '1:1 Curated Feed Showcase',
      sub: 'Square Lookbook, LinkedIn, Portfolio Grid',
      aspect: '1:1',
      icon: Square,
      resolution: '1080x1080 Square',
      fps: '30.000 FPS',
      size: '13.0 MB',
      file: 'film_proj_kgm_riyadh_01_social_square_1x1.mp4',
    },
    {
      id: 'del_4x5',
      title: '4:5 Collector Briefing',
      sub: 'Executive Briefings & WhatsApp Compressed Share',
      aspect: '4:5',
      icon: Maximize2,
      resolution: '1080x1350 Portrait',
      fps: '30.000 FPS',
      size: '2.9 MB',
      file: 'film_proj_kgm_riyadh_01_whatsapp_fast.mp4',
    },
  ];

  const handleCopy = () => {
    navigator.clipboard.writeText(`${window.location.origin}/film/kgm-film-royal-villa-riyadh`);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-8 max-w-7xl w-full mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-800 pb-6">
        <div>
          <span className="text-xs font-mono uppercase tracking-widest text-[#C5A869]">Mastering Output Studio</span>
          <h1 className="text-2xl sm:text-3xl font-serif font-medium text-white tracking-tight">
            Project Deliverables & Multi-Aspect Cuts
          </h1>
          <p className="text-xs sm:text-sm text-stone-400 font-light mt-1">
            Download master video assets calibrated with safe-zone composition and ACES 2065-1 color science.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/film/kgm-film-royal-villa-riyadh"
            className="py-2.5 px-4 rounded-lg bg-stone-900 border border-stone-700 text-stone-200 text-xs font-mono flex items-center gap-2 hover:border-[#C5A869]"
          >
            <Eye className="w-3.5 h-3.5 text-[#C5A869]" />
            <span>VIP Client View</span>
          </Link>
          <button
            onClick={handleCopy}
            className="py-2.5 px-4 rounded-lg bg-[#C5A869] hover:bg-[#D8BC7D] text-[#07130E] text-xs font-semibold uppercase tracking-wider flex items-center gap-2"
          >
            <Copy className="w-3.5 h-3.5" />
            <span>{copiedLink ? 'Link Copied!' : 'Copy Client Link'}</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {deliverables.map((del) => {
          const Icon = del.icon;
          return (
            <div
              key={del.id}
              className="p-6 rounded-2xl bg-[#0C1E17]/80 border border-stone-800/90 shadow-xl space-y-4 hover:border-[#C5A869]/40 transition-all flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-[#0B2B20] text-[#C5A869] flex items-center justify-center border border-[#C5A869]/30">
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="text-base font-serif font-medium text-white">{del.title}</h3>
                      <p className="text-xs text-stone-400 font-light">{del.sub}</p>
                    </div>
                  </div>
                  <span className="px-2.5 py-1 rounded bg-stone-950 border border-stone-800 text-[10px] font-mono text-[#C5A869]">
                    {del.aspect}
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-2 text-center p-3 rounded-xl bg-stone-950/80 border border-stone-800 text-xs font-mono">
                  <div>
                    <p className="text-[10px] text-stone-500">RES</p>
                    <p className="text-stone-300">{del.resolution}</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-stone-500">FPS</p>
                    <p className="text-stone-300">{del.fps}</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-stone-500">SIZE</p>
                    <p className="text-[#C5A869]">{del.size}</p>
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-stone-800/80 flex items-center justify-between gap-3">
                <a
                  href={`/exports/${del.file}`}
                  download
                  className="w-full py-2.5 px-4 rounded-lg bg-stone-900 hover:bg-stone-850 border border-stone-700 hover:border-[#C5A869] text-stone-100 text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5 text-[#C5A869]" />
                  <span>Download MP4 Asset</span>
                </a>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
