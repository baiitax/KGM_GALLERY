'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Sparkles,
  Layers,
  Film,
  TrendingUp,
  Sliders,
  Clock,
  CheckCircle2,
  AlertTriangle,
  Play,
  Eye,
  Pause,
  RotateCcw,
  X,
  Download,
  Users,
  HardDrive,
  Cpu,
  Tv,
  Smartphone,
  Square,
  Maximize2,
  Calendar,
  Filter,
  DollarSign,
  ArrowRight,
  ChevronRight,
  ShieldAlert,
  BarChart3,
  Activity
} from 'lucide-react';
import { ADMIN_SEED_DATA, ExecutiveKPIs, BottleneckAlert, AIModelTelemetry } from '@/lib/admin/analytics';

export default function AdminOverviewPage() {
  const [selectedPeriod, setSelectedPeriod] = useState('30_days');
  const [activePropertyFilter, setActivePropertyFilter] = useState('all');
  const [kpis, setKpis] = useState<ExecutiveKPIs>(ADMIN_SEED_DATA.kpis);
  const [pipeline, setPipeline] = useState(ADMIN_SEED_DATA.productionPipeline);
  const [activeJobs, setActiveJobs] = useState(ADMIN_SEED_DATA.activeJobs);
  const [bottlenecks, setBottlenecks] = useState<BottleneckAlert[]>(ADMIN_SEED_DATA.bottlenecks);
  const [aiModels, setAiModels] = useState<AIModelTelemetry[]>(ADMIN_SEED_DATA.aiModels);
  const [costData, setCostData] = useState(ADMIN_SEED_DATA.costIntelligence);

  const periods = [
    { id: 'today', label: 'Today' },
    { id: 'yesterday', label: 'Yesterday' },
    { id: '7_days', label: '7 Days' },
    { id: '30_days', label: '30 Days' },
    { id: '90_days', label: '90 Days' },
    { id: 'ytd', label: 'Year to Date' },
  ];

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-8 max-w-[1600px] w-full mx-auto">
      {/* Executive Command Header & Period Control */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 border-b border-stone-800/80 pb-6">
        <div>
          <div className="flex items-center gap-2.5 text-xs font-mono text-[#C5A869] mb-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
            <span className="uppercase tracking-widest font-semibold">LIVE OPERATIONS CENTER</span>
            <span className="text-stone-600">•</span>
            <span className="text-stone-400">EXECUTIVE CONTROL & GOVERNANCE</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-serif font-medium text-white tracking-tight">
            Senior Admin Command Center
          </h1>
          <p className="text-xs sm:text-sm text-stone-400 font-light mt-1">
            Global operational intelligence, distributed GPU cluster telemetry, and asset mastering governance.
          </p>
        </div>

        {/* Global Period Selector */}
        <div className="flex flex-wrap items-center gap-2 bg-[#081812] p-1.5 rounded-xl border border-stone-800/80">
          <Calendar className="w-3.5 h-3.5 text-[#C5A869] ml-2" />
          {periods.map((p) => (
            <button
              key={p.id}
              onClick={() => setSelectedPeriod(p.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all cursor-pointer ${
                selectedPeriod === p.id
                  ? 'bg-[#C5A869] text-[#07130E] font-bold shadow-sm'
                  : 'text-stone-400 hover:text-stone-200'
              }`}
            >
              {p.label}
            </button>
          ))}
        </div>
      </div>

      {/* 05 — EXECUTIVE KPI STRIP (8 Key Metrics) */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
        {/* KPI 1: Active Projects */}
        <div className="p-3.5 rounded-2xl bg-[#081812]/90 border border-stone-800/90 flex flex-col justify-between hover:border-[#C5A869]/40 transition-all">
          <span className="text-[10px] font-mono text-stone-400 uppercase tracking-wider">Active Projects</span>
          <div className="my-2">
            <span className="text-2xl font-serif text-white font-medium">{kpis.activeProjects.value}</span>
          </div>
          <span className="text-[10px] font-mono text-emerald-400 flex items-center gap-1">
            <TrendingUp className="w-3 h-3" /> +{kpis.activeProjects.changePercent}% vs prev
          </span>
        </div>

        {/* KPI 2: Films Generated */}
        <div className="p-3.5 rounded-2xl bg-[#081812]/90 border border-stone-800/90 flex flex-col justify-between hover:border-[#C5A869]/40 transition-all">
          <span className="text-[10px] font-mono text-stone-400 uppercase tracking-wider">Films Generated</span>
          <div className="my-2">
            <span className="text-2xl font-serif text-[#C5A869] font-medium">{kpis.filmsGenerated.lifetime}</span>
          </div>
          <span className="text-[10px] font-mono text-stone-400">+{kpis.filmsGenerated.month} this month</span>
        </div>

        {/* KPI 3: Mastered Outputs */}
        <div className="p-3.5 rounded-2xl bg-[#081812]/90 border border-stone-800/90 flex flex-col justify-between hover:border-[#C5A869]/40 transition-all">
          <span className="text-[10px] font-mono text-stone-400 uppercase tracking-wider">Mastered Cuts</span>
          <div className="my-2">
            <span className="text-2xl font-serif text-white font-medium">{kpis.masteredOutputs.total}</span>
          </div>
          <span className="text-[10px] font-mono text-[#C5A869]">4 Synchronized Formats</span>
        </div>

        {/* KPI 4: Total Assets */}
        <div className="p-3.5 rounded-2xl bg-[#081812]/90 border border-stone-800/90 flex flex-col justify-between hover:border-[#C5A869]/40 transition-all">
          <span className="text-[10px] font-mono text-stone-400 uppercase tracking-wider">Assets Managed</span>
          <div className="my-2">
            <span className="text-2xl font-serif text-white font-medium">{kpis.totalAssets.count}</span>
          </div>
          <span className="text-[10px] font-mono text-emerald-400">{kpis.totalAssets.highResPercent}% 4K High-Res</span>
        </div>

        {/* KPI 5: Active Clients */}
        <div className="p-3.5 rounded-2xl bg-[#081812]/90 border border-stone-800/90 flex flex-col justify-between hover:border-[#C5A869]/40 transition-all">
          <span className="text-[10px] font-mono text-stone-400 uppercase tracking-wider">Active Clients</span>
          <div className="my-2">
            <span className="text-2xl font-serif text-white font-medium">{kpis.activeClients.count}</span>
          </div>
          <span className="text-[10px] font-mono text-[#C5A869]">{kpis.activeClients.hnwCount} Sovereign HNW</span>
        </div>

        {/* KPI 6: Production Success Rate */}
        <div className="p-3.5 rounded-2xl bg-[#081812]/90 border border-stone-800/90 flex flex-col justify-between hover:border-[#C5A869]/40 transition-all">
          <span className="text-[10px] font-mono text-stone-400 uppercase tracking-wider">Success Rate</span>
          <div className="my-2">
            <span className="text-2xl font-serif text-emerald-400 font-medium">{kpis.successRate.value}%</span>
          </div>
          <span className="text-[10px] font-mono text-stone-400">3 retries / 540 jobs</span>
        </div>

        {/* KPI 7: AI Utilization */}
        <div className="p-3.5 rounded-2xl bg-[#081812]/90 border border-stone-800/90 flex flex-col justify-between hover:border-[#C5A869]/40 transition-all">
          <span className="text-[10px] font-mono text-stone-400 uppercase tracking-wider">GPU Capacity</span>
          <div className="my-2">
            <span className="text-2xl font-serif text-white font-medium">{kpis.aiUtilization.capacityPercent}%</span>
          </div>
          <span className="text-[10px] font-mono text-[#C5A869]">{kpis.aiUtilization.avgLatencyMs}ms Latency</span>
        </div>

        {/* KPI 8: Storage Utilization */}
        <div className="p-3.5 rounded-2xl bg-[#081812]/90 border border-stone-800/90 flex flex-col justify-between hover:border-[#C5A869]/40 transition-all">
          <span className="text-[10px] font-mono text-stone-400 uppercase tracking-wider">Storage Vault</span>
          <div className="my-2">
            <span className="text-2xl font-serif text-white font-medium">{kpis.storageUtilization.usedGB} GB</span>
          </div>
          <span className="text-[10px] font-mono text-stone-400">of 500 GB Master</span>
        </div>
      </div>

      {/* 07 — EXECUTIVE PRODUCTION PIPELINE FUNNEL */}
      <div className="p-6 rounded-3xl bg-[#081812]/90 border border-stone-800/90 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <span className="text-xs font-mono text-[#C5A869] uppercase tracking-wider">Lifecycle Tracking</span>
            <h3 className="text-lg font-serif font-medium text-white">Executive Production Pipeline</h3>
          </div>
          <span className="text-xs font-mono text-stone-400">Total 32 Active Projects in Pipeline</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-7 gap-2.5 pt-2">
          {pipeline.map((st) => (
            <Link
              key={st.stage}
              href={`/admin/production/projects?stage=${st.stage.toLowerCase()}`}
              className="p-3.5 rounded-2xl bg-stone-950/80 border border-stone-800 hover:border-[#C5A869]/50 transition-all flex flex-col justify-between group"
            >
              <div className="flex items-center justify-between text-xs font-mono mb-2">
                <span className="text-stone-400 uppercase text-[10px]">{st.stage}</span>
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: st.color }}></span>
              </div>
              <span className="text-xl font-serif text-white font-semibold group-hover:text-[#C5A869] transition-colors">
                {st.count}
              </span>
              <span className="text-[10px] font-mono text-stone-500 mt-1">Projects</span>
            </Link>
          ))}
        </div>
      </div>

      {/* 08 — LIVE PRODUCTION MONITOR & 09 — BOTTLENECK INTELLIGENCE */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Live Operations Panel */}
        <div className="lg:col-span-8 p-6 rounded-3xl bg-[#081812]/90 border border-stone-800/90 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Activity className="w-4 h-4 text-[#C5A869]" />
              <h3 className="text-base font-serif font-medium text-white">Live Production Operations</h3>
            </div>
            <Link href="/admin/live" className="text-xs text-[#C5A869] hover:underline font-mono">
              Dedicated Monitor →
            </Link>
          </div>

          <div className="space-y-3">
            {activeJobs.map((job) => (
              <div
                key={job.id}
                className="p-4 rounded-2xl bg-stone-950/80 border border-stone-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs font-mono"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-white font-sans text-sm">{job.project}</span>
                    <span className="px-2 py-0.5 rounded bg-emerald-950 border border-emerald-800 text-emerald-300 text-[10px]">
                      {job.status}
                    </span>
                  </div>
                  <p className="text-stone-400 text-[11px] font-light">
                    {job.property} • Stage: <strong className="text-stone-200">{job.stage}</strong> ({job.progress}%)
                  </p>
                </div>

                <div className="flex items-center gap-3 self-end sm:self-center">
                  <span className="text-stone-400 text-[11px]">Runtime: {job.runtime}</span>
                  <Link
                    href="/studio/projects/proj_kgm_riyadh_01"
                    className="p-1.5 rounded bg-stone-900 hover:bg-stone-800 border border-stone-700 text-stone-300 hover:text-[#C5A869]"
                    title="Open Project"
                  >
                    <Eye className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottleneck Alerts Panel */}
        <div className="lg:col-span-4 p-6 rounded-3xl bg-[#081812]/90 border border-stone-800/90 space-y-4 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-400" />
                <h3 className="text-base font-serif font-medium text-white">Bottleneck Intelligence</h3>
              </div>
              <span className="px-2 py-0.5 rounded bg-amber-950/80 border border-amber-800 text-amber-300 text-[10px] font-mono">
                {bottlenecks.length} Warnings
              </span>
            </div>

            <div className="space-y-3">
              {bottlenecks.map((b) => (
                <div
                  key={b.id}
                  className="p-3.5 rounded-2xl bg-stone-950/90 border border-amber-800/50 space-y-2 text-xs"
                >
                  <div className="flex items-center justify-between font-mono text-[10px]">
                    <span className="text-amber-400 font-bold uppercase">{b.issue}</span>
                    <span className="text-stone-400">{b.duration}</span>
                  </div>
                  <p className="text-stone-300 text-[11px] font-light leading-relaxed">
                    <strong>Recommended Action:</strong> {b.recommendedAction}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <Link
            href="/admin/production/queue"
            className="w-full py-2.5 rounded-xl bg-stone-900 hover:bg-stone-850 border border-stone-800 text-stone-300 text-xs font-mono text-center block transition-colors"
          >
            Manage Production Queue & Worker Allocation →
          </Link>
        </div>
      </div>

      {/* 10 — AI MODEL PERFORMANCE MATRIX & 26 — COST INTELLIGENCE */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* AI Model Intelligence */}
        <div className="lg:col-span-8 p-6 rounded-3xl bg-[#081812]/90 border border-stone-800/90 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Cpu className="w-4 h-4 text-[#C5A869]" />
              <h3 className="text-base font-serif font-medium text-white">AI Model & Provider Telemetry</h3>
            </div>
            <Link href="/admin/intelligence/ai" className="text-xs text-[#C5A869] hover:underline font-mono">
              Deep AI Analytics →
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-mono">
              <thead className="bg-stone-950/80 border-b border-stone-800 text-stone-400 uppercase text-[10px]">
                <tr>
                  <th className="p-3">Provider & Model</th>
                  <th className="p-3">Success Rate</th>
                  <th className="p-3">Avg Latency</th>
                  <th className="p-3">Volume</th>
                  <th className="p-3">Cost / Shot</th>
                  <th className="p-3 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-800/80 text-stone-200">
                {aiModels.map((m) => (
                  <tr key={m.model} className="hover:bg-stone-900/40">
                    <td className="p-3">
                      <p className="font-semibold text-white">{m.model}</p>
                      <p className="text-[10px] text-stone-400">{m.provider}</p>
                    </td>
                    <td className="p-3 text-emerald-400 font-bold">{m.successRate}%</td>
                    <td className="p-3 text-stone-300">{m.avgProcessingTimeSec}s</td>
                    <td className="p-3 text-[#C5A869]">{m.usageVolume} scenes</td>
                    <td className="p-3 text-stone-300">${m.costPerOutputUSD.toFixed(2)}</td>
                    <td className="p-3 text-right">
                      <span className="px-2 py-0.5 rounded bg-emerald-950 border border-emerald-800 text-emerald-300 text-[10px]">
                        OPTIMAL
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Cost Intelligence Panel */}
        <div className="lg:col-span-4 p-6 rounded-3xl bg-[#081812]/90 border border-stone-800/90 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <DollarSign className="w-4 h-4 text-[#C5A869]" />
              <h3 className="text-base font-serif font-medium text-white">Cost & Budget Intelligence</h3>
            </div>
            <Link href="/admin/intelligence/costs" className="text-xs text-[#C5A869] hover:underline font-mono">
              Audit →
            </Link>
          </div>

          <div className="p-4 rounded-2xl bg-stone-950/80 border border-stone-800 space-y-2 text-xs font-mono">
            <div className="flex justify-between text-stone-400">
              <span>Monthly Budget:</span>
              <span className="text-white">${costData.monthlyBudgetUSD.toLocaleString()} USD</span>
            </div>
            <div className="flex justify-between text-stone-400">
              <span>Actual Incurred:</span>
              <span className="text-emerald-400">${costData.actualSpendUSD.toLocaleString()} USD</span>
            </div>
            <div className="flex justify-between text-stone-400 pt-1 border-t border-stone-800">
              <span>Budget Surplus:</span>
              <span className="text-[#C5A869] font-bold">+${costData.varianceUSD.toLocaleString()} USD</span>
            </div>
          </div>

          <div className="space-y-2">
            {costData.breakdown.map((b) => (
              <div key={b.category} className="flex items-center justify-between text-xs font-mono p-2 rounded bg-stone-950/40">
                <span className="text-stone-300 text-[11px]">{b.category}</span>
                <span className="text-stone-400">${b.spend} / ${b.budget}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
