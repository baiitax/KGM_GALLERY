'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Sparkles, ArrowRight, ArrowLeft, CheckCircle2, Play, Sliders, Eye, Download } from 'lucide-react';

export default function MasterGenerationPage() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [stage, setStage] = useState(0);
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);

  const stages = [
    'Preparing High-Res Architectural Assets',
    'Analyzing Spatial Geometry & Light Vectors',
    'Compiling Physical Inertial Camera Trajectories',
    'Generating 6 Multi-Pass 10-Second Scenes',
    'Applying ACES 2065-1 Color Science (Emerald & Gold)',
    'Mastering 4K DCI Video & Spatial Soundscape',
    'Synchronizing 4-Format Multi-Aspect Exports (16:9, 9:16, 1:1, 4:5)',
  ];

  const handleRun = () => {
    setIsGenerating(true);
    setStage(0);
    setProgress(5);

    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(interval);
          setIsGenerating(false);
          setDone(true);
          return 100;
        }
        const next = p + 15;
        const sIdx = Math.min(Math.floor((next / 100) * stages.length), stages.length - 1);
        setStage(sIdx);
        return next;
      });
    }, 900);
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-8 max-w-5xl w-full mx-auto my-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-800 pb-6">
        <div>
          <span className="text-xs font-mono uppercase tracking-widest text-[#C5A869]">Pipeline Step 05</span>
          <h1 className="text-2xl sm:text-3xl font-serif font-medium text-white tracking-tight">
            10-Second Master Generation
          </h1>
          <p className="text-xs sm:text-sm text-stone-400 font-light mt-1">
            Dispatch render pipeline to the high-throughput GPU cluster.
          </p>
        </div>
        <Link
          href="/studio/create/motion"
          className="text-xs text-stone-400 hover:text-stone-200 flex items-center gap-1.5"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Motion
        </Link>
      </div>

      <div className="bg-[#0C1E17]/90 border border-stone-800/90 rounded-2xl p-6 sm:p-10 shadow-2xl space-y-8">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center p-5 rounded-xl bg-stone-950/80 border border-stone-800">
          <div>
            <p className="text-xs font-mono text-stone-400 uppercase">Property</p>
            <p className="text-sm font-serif text-white mt-1">Al-Malqa Villa</p>
          </div>
          <div>
            <p className="text-xs font-mono text-stone-400 uppercase">Scenes</p>
            <p className="text-sm font-serif text-white mt-1">6 Cinema Cuts</p>
          </div>
          <div>
            <p className="text-xs font-mono text-stone-400 uppercase">Duration Standard</p>
            <p className="text-sm font-serif text-[#C5A869] mt-1">10s / Shot</p>
          </div>
          <div>
            <p className="text-xs font-mono text-stone-400 uppercase">Output Standard</p>
            <p className="text-sm font-serif text-[#C5A869] mt-1">4K ACES Master</p>
          </div>
        </div>

        {isGenerating && (
          <div className="p-6 rounded-2xl bg-[#091C14] border border-[#C5A869]/40 space-y-5">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-emerald-400 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                STAGE 0{stage + 1} OF 07: {stages[stage]}
              </span>
              <span className="text-[#C5A869] font-bold">{progress}%</span>
            </div>

            <div className="w-full h-2.5 rounded-full bg-stone-950 border border-stone-800 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-[#C5A869] to-[#E5CF98] transition-all duration-700"
                style={{ width: `${progress}%` }}
              ></div>
            </div>

            <div className="space-y-1.5 text-xs font-mono text-stone-400">
              {stages.map((st, idx) => (
                <div
                  key={idx}
                  className={`flex items-center gap-2 ${
                    idx < stage
                      ? 'text-emerald-400'
                      : idx === stage
                      ? 'text-[#C5A869] font-semibold'
                      : 'text-stone-600'
                  }`}
                >
                  {idx < stage ? (
                    <CheckCircle2 className="w-3.5 h-3.5" />
                  ) : (
                    <span className="w-3.5 h-3.5 rounded-full border border-current flex items-center justify-center text-[9px]">
                      {idx + 1}
                    </span>
                  )}
                  <span>{st}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {done && (
          <div className="p-6 rounded-2xl bg-emerald-950/50 border border-emerald-800 space-y-4 text-center">
            <div className="w-12 h-12 rounded-full bg-emerald-900 border border-emerald-500 flex items-center justify-center mx-auto text-emerald-300">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-serif text-white">10-Second Master Successfully Generated</h3>
            <p className="text-xs text-stone-300 max-w-lg mx-auto font-light">
              All 6 architectural scenes have been composited, color-graded to ACES 2065-1, and mastered in 4 synchronized aspect ratios.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <Link
                href="/studio/projects/proj_kgm_riyadh_01/review"
                className="py-3 px-6 rounded-lg bg-[#C5A869] hover:bg-[#D8BC7D] text-[#07130E] font-semibold text-xs tracking-wider uppercase flex items-center gap-2"
              >
                <Eye className="w-4 h-4" />
                <span>REVIEW MASTER SCENES</span>
              </Link>
              <Link
                href="/studio/deliverables"
                className="py-3 px-6 rounded-lg bg-stone-900 hover:bg-stone-800 border border-stone-700 text-stone-200 text-xs font-medium uppercase tracking-wider flex items-center gap-2"
              >
                <Sliders className="w-4 h-4 text-[#C5A869]" />
                <span>EXPORT 4-FORMAT DELIVERABLES</span>
              </Link>
            </div>
          </div>
        )}

        {!isGenerating && !done && (
          <div className="flex justify-center pt-2">
            <button
              type="button"
              onClick={handleRun}
              className="py-4 px-12 rounded-xl bg-gradient-to-r from-[#C5A869] to-[#9E8345] hover:from-[#D8BC7D] text-[#07130E] font-semibold text-xs sm:text-sm tracking-widest uppercase flex items-center gap-3 cursor-pointer shadow-xl shadow-[#C5A869]/25 hover:scale-[1.02] transition-all"
            >
              <Sparkles className="w-4 h-4" />
              <span>GENERATE 10-SECOND CINEMATIC MASTER</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
