'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { CheckCircle2, XCircle, Sparkles, Eye, ArrowLeft, ShieldCheck } from 'lucide-react';
import { ADMIN_SEED_DATA } from '@/lib/admin/analytics';

export default function GalleryApprovalPage() {
  const [pendingItems, setPendingItems] = useState([
    {
      id: 'app_01',
      title: 'Primary Sanctuary & Terrace Horizon — 9:16 Reel',
      property: 'The Sovereign Villa — Al-Malqa',
      creator: 'Elena Vance',
      submitted: '2 hours ago',
      thumbnail: '/uploads/villa_06_master_suite.jpg',
      aspect: '9:16 VIP Reel',
      notes: 'ACES color grade validated, 24.000 fps.',
    },
    {
      id: 'app_02',
      title: 'Spa Wellness Primary Bath Reflection Pan',
      property: 'The Sovereign Villa — Al-Malqa',
      creator: 'Marcus Vance',
      submitted: '4 hours ago',
      thumbnail: '/uploads/villa_07_spa_bathroom.jpg',
      aspect: '16:9 4K Master',
      notes: 'Subtle lateral reflection on Calacatta marble.',
    },
  ]);

  const handleApprove = (id: string) => {
    setPendingItems(pendingItems.filter((i) => i.id !== id));
    alert('Asset approved and promoted to Gallery.');
  };

  const handleReject = (id: string) => {
    setPendingItems(pendingItems.filter((i) => i.id !== id));
    alert('Asset returned to editor with revision notes.');
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-8 max-w-[1600px] w-full mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-800 pb-6">
        <div>
          <span className="text-xs font-mono uppercase tracking-widest text-[#C5A869]">Quality Governance</span>
          <h1 className="text-2xl sm:text-3xl font-serif font-medium text-white tracking-tight">
            Gallery & Deliverable Approval Queue
          </h1>
          <p className="text-xs sm:text-sm text-stone-400 font-light mt-1">
            Review submitted cinematic scenes, master reels, and client cuts before promotion.
          </p>
        </div>

        <Link
          href="/admin/gallery"
          className="text-xs text-stone-400 hover:text-stone-200 flex items-center gap-1.5"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Master Gallery
        </Link>
      </div>

      <div className="space-y-4">
        {pendingItems.map((item) => (
          <div
            key={item.id}
            className="p-5 rounded-2xl bg-[#081812]/90 border border-stone-800 flex flex-col md:flex-row md:items-center justify-between gap-6"
          >
            <div className="flex items-center gap-4">
              <img src={item.thumbnail} alt={item.title} className="w-28 h-20 object-cover rounded-xl border border-stone-800" />
              <div>
                <span className="px-2 py-0.5 rounded bg-amber-950 text-amber-300 font-mono text-[10px] border border-amber-800">
                  Pending Executive Approval
                </span>
                <h3 className="text-base font-serif font-medium text-white mt-1">{item.title}</h3>
                <p className="text-xs text-stone-400 font-light">{item.property} • Submitted by {item.creator}</p>
                <p className="text-[11px] font-mono text-[#C5A869] mt-1">Format: {item.aspect} • {item.notes}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 self-end md:self-center">
              <button
                onClick={() => handleReject(item.id)}
                className="py-2 px-4 rounded-lg bg-rose-950/60 border border-rose-800 hover:bg-rose-900 text-rose-200 text-xs font-mono flex items-center gap-1.5 cursor-pointer"
              >
                <XCircle className="w-3.5 h-3.5" /> Reject
              </button>
              <button
                onClick={() => handleApprove(item.id)}
                className="py-2 px-5 rounded-lg bg-[#C5A869] hover:bg-[#D8BC7D] text-[#07130E] text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5 cursor-pointer"
              >
                <CheckCircle2 className="w-3.5 h-3.5" /> Approve & Promote
              </button>
            </div>
          </div>
        ))}

        {pendingItems.length === 0 && (
          <div className="p-12 rounded-2xl bg-[#081812]/40 border border-stone-800 text-center space-y-2">
            <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto" />
            <h3 className="text-base font-serif text-white">All Items Approved</h3>
            <p className="text-xs text-stone-400">The approval queue is currently clear.</p>
          </div>
        )}
      </div>
    </div>
  );
}
