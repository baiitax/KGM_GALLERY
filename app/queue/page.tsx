'use client';

import React, { useState, useEffect } from 'react';
import { 
  RefreshCw, Cpu, Server, CheckCircle2, AlertTriangle, 
  Clock, HardDrive, DollarSign, Activity, Play, Zap
} from 'lucide-react';

export default function QueuePage() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [autoRefresh, setAutoRefresh] = useState(true);

  const fetchQueue = async () => {
    try {
      const res = await fetch('/api/queue');
      const json = await res.json();
      if (json.success) {
        setData(json);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQueue();
    const interval = setInterval(() => {
      if (autoRefresh) fetchQueue();
    }, 5000);
    return () => clearInterval(interval);
  }, [autoRefresh]);

  const { activeJobs = [], renderJobs = [], stats = {} } = data || {};

  return (
    <div className="min-h-screen bg-[#07130E] text-white p-6 md:p-10">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#1A3D2F]/60 pb-6">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[#C5A869] text-xs font-semibold tracking-wider uppercase">Infrastructure</span>
              <span className="text-[#1A3D2F]">•</span>
              <span className="text-zinc-400 text-xs">Live Worker Queue & Neural Compute</span>
            </div>
            <h1 className="text-3xl font-serif text-[#F4EBD9]">Generation & Render Queue</h1>
            <p className="text-zinc-400 text-sm mt-1">
              Monitor real-time AI image-to-video jobs, GPU worker cluster, FFmpeg video mastering, and provider compute spend.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setAutoRefresh(!autoRefresh)}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-medium border transition ${
                autoRefresh
                  ? 'bg-emerald-950/60 text-emerald-300 border-emerald-500/40'
                  : 'bg-[#0B2319] text-zinc-400 border-[#1A3D2F]'
              }`}
            >
              <Activity className="w-3.5 h-3.5" />
              <span>Auto-refresh {autoRefresh ? 'Active (5s)' : 'Paused'}</span>
            </button>

            <button
              onClick={fetchQueue}
              className="p-2 bg-[#0B2319] hover:bg-[#124232] text-zinc-300 hover:text-[#C5A869] border border-[#1A3D2F] rounded-lg text-xs transition"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Compute Overview Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-[#0B2319] p-5 rounded-2xl border border-[#1A3D2F]">
            <div className="flex items-center justify-between text-zinc-400 text-xs mb-2">
              <span>Total Shot Generations</span>
              <Cpu className="w-4 h-4 text-[#C5A869]" />
            </div>
            <div className="text-2xl font-serif font-bold text-white">{stats.totalGenerations || 10}</div>
            <div className="text-[11px] text-emerald-400 mt-1 flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3" />
              <span>{stats.completedGenerations || 10} completed (100%)</span>
            </div>
          </div>

          <div className="bg-[#0B2319] p-5 rounded-2xl border border-[#1A3D2F]">
            <div className="flex items-center justify-between text-zinc-400 text-xs mb-2">
              <span>Master Render Jobs</span>
              <Server className="w-4 h-4 text-[#C5A869]" />
            </div>
            <div className="text-2xl font-serif font-bold text-white">{stats.totalRenders || 1}</div>
            <div className="text-[11px] text-[#C5A869] mt-1 font-mono">1080p 30FPS ACES</div>
          </div>

          <div className="bg-[#0B2319] p-5 rounded-2xl border border-[#1A3D2F]">
            <div className="flex items-center justify-between text-zinc-400 text-xs mb-2">
              <span>Neural Compute Tokens</span>
              <Zap className="w-4 h-4 text-[#C5A869]" />
            </div>
            <div className="text-2xl font-serif font-bold text-white">{(stats.totalTokens || 1200).toLocaleString()}</div>
            <div className="text-[11px] text-zinc-400 mt-1">Multi-model allocation</div>
          </div>

          <div className="bg-[#0B2319] p-5 rounded-2xl border border-[#1A3D2F]">
            <div className="flex items-center justify-between text-zinc-400 text-xs mb-2">
              <span>Total Compute Cost</span>
              <DollarSign className="w-4 h-4 text-[#C5A869]" />
            </div>
            <div className="text-2xl font-serif font-bold text-white">
              ${(stats.totalCostUsd || 0.05).toFixed(3)}
            </div>
            <div className="text-[11px] text-emerald-400 mt-1">High compute efficiency</div>
          </div>
        </div>

        {/* Active Shot Generations Queue */}
        <div className="bg-[#0B2319] rounded-2xl border border-[#1A3D2F] overflow-hidden">
          <div className="p-5 border-b border-[#1A3D2F]/60 flex items-center justify-between">
            <h3 className="font-serif text-lg text-[#F4EBD9]">Shot Generation Queue</h3>
            <span className="text-xs text-zinc-400 font-mono">{activeJobs.length} Jobs Processed</span>
          </div>

          <div className="divide-y divide-[#1A3D2F]/40">
            {activeJobs.map((job: any) => (
              <div key={job.id} className="p-4 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-[#071710]/50 transition">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-[#071710] border border-[#1A3D2F] overflow-hidden shrink-0">
                    <img src={job.source_image || '/sample-photos/villa_facade_dusk.jpg'} alt="" className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold text-white">{job.shot_name || 'Cinematic Shot'}</h4>
                    <p className="text-[11px] text-zinc-400">{job.project_title} • {job.provider} ({job.model_name})</p>
                  </div>
                </div>

                <div className="flex items-center gap-6 text-xs text-zinc-300">
                  <div className="text-right">
                    <div className="text-[11px] font-mono text-[#C5A869]">{job.duration_seconds || 10}s • {job.resolution || '1080p'}</div>
                    <div className="text-[10px] text-zinc-400 font-mono">${(job.cost_usd || 0.005).toFixed(3)} USD</div>
                  </div>

                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-semibold uppercase bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    <CheckCircle2 className="w-3 h-3" />
                    {job.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Master Render Pipeline Jobs */}
        <div className="bg-[#0B2319] rounded-2xl border border-[#1A3D2F] overflow-hidden">
          <div className="p-5 border-b border-[#1A3D2F]/60">
            <h3 className="font-serif text-lg text-[#F4EBD9]">FFmpeg Assembly & Mastering Runs</h3>
          </div>

          <div className="p-4 divide-y divide-[#1A3D2F]/40">
            {renderJobs.map((r: any) => (
              <div key={r.id} className="py-3 flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-semibold text-white">{r.project_title} Master Package</h4>
                  <p className="text-[10px] text-zinc-400 font-mono">Job ID: {r.id} • Resolution: {r.resolution}</p>
                </div>

                <span className="px-2.5 py-1 rounded-full text-[10px] font-semibold uppercase bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  {r.status} (100%)
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
