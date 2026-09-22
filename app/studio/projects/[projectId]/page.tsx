'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Film,
  Layers,
  Sliders,
  Play,
  Eye,
  Download,
  Share2,
  Tv,
  CheckCircle2,
  Clock,
  ArrowLeft,
  Building2,
  User,
  Activity,
  FileCheck
} from 'lucide-react';

export default function ProjectDetailPage({ params }: { params: { projectId: string } }) {
  const [activeTab, setActiveTab] = useState<
    'overview' | 'assets' | 'scenes' | 'timeline' | 'generation' | 'review' | 'deliverables' | 'presentation' | 'activity'
  >('overview');

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'assets', label: 'Assets (10)' },
    { id: 'scenes', label: 'Scenes (10)' },
    { id: 'timeline', label: 'Timeline' },
    { id: 'generation', label: 'Generation' },
    { id: 'review', label: 'Review & Approvals' },
    { id: 'deliverables', label: 'Deliverables (4)' },
    { id: 'presentation', label: 'Presentation' },
    { id: 'activity', label: 'Activity' },
  ];

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-8 max-w-7xl w-full mx-auto">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-800 pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-[#C5A869] mb-1">
            <Link href="/studio/projects" className="hover:underline">Projects</Link>
            <span>/</span>
            <span>#KGM-RUH-001</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-serif font-medium text-white tracking-tight">
            The Royal Sovereign Villa — Al-Malqa
          </h1>
          <p className="text-xs text-stone-400 font-light mt-0.5">
            Northern Riyadh • 18,500 sq ft • 10 Scenes Master • Client: Private Sovereign Family Office
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href={`/studio/projects/${params.projectId}/review`}
            className="py-2.5 px-4 rounded-lg bg-stone-900 border border-stone-700 text-stone-200 text-xs font-medium uppercase tracking-wider flex items-center gap-2 hover:border-[#C5A869]"
          >
            <Eye className="w-3.5 h-3.5 text-[#C5A869]" />
            <span>Review Player</span>
          </Link>
          <Link
            href="/film/kgm-film-royal-villa-riyadh"
            className="py-2.5 px-4 rounded-lg bg-[#C5A869] hover:bg-[#D8BC7D] text-[#07130E] text-xs font-semibold uppercase tracking-wider flex items-center gap-2"
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            <span>Play 4K Film</span>
          </Link>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex items-center gap-1.5 border-b border-stone-800/80 overflow-x-auto pb-1">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-3.5 py-2 text-xs font-medium whitespace-nowrap transition-all border-b-2 ${
              activeTab === tab.id
                ? 'border-[#C5A869] text-[#C5A869]'
                : 'border-transparent text-stone-400 hover:text-stone-200'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-7 relative rounded-2xl overflow-hidden border border-stone-800">
              <img
                src="/uploads/villa_01_hero_exterior.jpg"
                alt="Master Preview"
                className="w-full h-80 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-between p-4">
                <span className="self-start px-2.5 py-1 rounded bg-black/70 text-[#C5A869] text-xs font-mono border border-[#C5A869]/30">
                  16:9 4K DCI MASTER
                </span>
                <div>
                  <h3 className="text-xl font-serif text-white">The Sovereign Villa — Al-Malqa</h3>
                  <p className="text-xs text-stone-300 font-light">10 Scenes • ACES 2065-1 Grade • 24.000 FPS</p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 p-6 rounded-2xl bg-[#0C1E17]/80 border border-stone-800 space-y-4">
              <h3 className="text-sm font-serif font-medium text-white uppercase tracking-wider text-[#C5A869]">
                Architectural Specifications
              </h3>
              <div className="space-y-2 text-xs font-mono">
                <div className="flex justify-between p-2 rounded bg-stone-950/60 border border-stone-800">
                  <span className="text-stone-400">Valuation</span>
                  <span className="text-[#C5A869]">$14,800,000 USD</span>
                </div>
                <div className="flex justify-between p-2 rounded bg-stone-950/60 border border-stone-800">
                  <span className="text-stone-400">Area</span>
                  <span className="text-stone-200">18,500 sq ft (1,720 m²)</span>
                </div>
                <div className="flex justify-between p-2 rounded bg-stone-950/60 border border-stone-800">
                  <span className="text-stone-400">Accommodations</span>
                  <span className="text-stone-200">7 Suites • 9 Baths</span>
                </div>
                <div className="flex justify-between p-2 rounded bg-stone-950/60 border border-stone-800">
                  <span className="text-stone-400">Production Status</span>
                  <span className="text-emerald-400">Master Approved (10/10)</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'deliverables' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { title: '16:9 4K Master', desc: 'Boardroom Presentation', size: '21.6 MB', file: 'film_proj_kgm_riyadh_01_master_16x9.mp4' },
            { title: '9:16 VIP Reel', desc: 'Mobile Social Stories', size: '19.5 MB', file: 'film_proj_kgm_riyadh_01_social_portrait_9x16.mp4' },
            { title: '1:1 Lookbook', desc: 'Curated Square Grid', size: '13.0 MB', file: 'film_proj_kgm_riyadh_01_social_square_1x1.mp4' },
            { title: '4:5 Briefing', desc: 'WhatsApp / Mobile Fast', size: '2.9 MB', file: 'film_proj_kgm_riyadh_01_whatsapp_fast.mp4' },
          ].map((d, idx) => (
            <div key={idx} className="p-4 rounded-xl bg-[#0C1E17]/80 border border-stone-800 space-y-3">
              <p className="text-sm font-semibold text-white">{d.title}</p>
              <p className="text-xs text-stone-400">{d.desc}</p>
              <p className="text-[10px] font-mono text-[#C5A869]">{d.size}</p>
              <a
                href={`/exports/${d.file}`}
                download
                className="w-full py-2 px-3 rounded bg-stone-900 hover:bg-stone-800 border border-stone-700 text-stone-200 text-xs font-mono flex items-center justify-center gap-2"
              >
                <Download className="w-3.5 h-3.5 text-[#C5A869]" /> Download MP4
              </a>
            </div>
          ))}
        </div>
      )}

      {activeTab !== 'overview' && activeTab !== 'deliverables' && (
        <div className="p-8 rounded-2xl bg-[#0C1E17]/80 border border-stone-800 text-center space-y-4">
          <p className="text-sm text-stone-300">Viewing active data for tab: <strong className="text-[#C5A869] font-mono">{activeTab.toUpperCase()}</strong></p>
          <div className="flex justify-center gap-3">
            <Link
              href={`/studio/projects/${params.projectId}/review`}
              className="py-2 px-4 rounded bg-[#C5A869] text-[#07130E] text-xs font-semibold uppercase tracking-wider"
            >
              Open Dedicated Review Player →
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
