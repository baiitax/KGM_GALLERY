'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Activity, 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  RefreshCw, 
  Film, 
  DollarSign, 
  Cpu, 
  Layers, 
  RotateCcw,
  X
} from 'lucide-react';

export default function GenerationQueuePage() {
  const [queueData, setQueueData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const loadQueue = async () => {
    try {
      const res = await fetch('/api/queue');
      const data = await res.json();
      setQueueData(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadQueue();
    const interval = setInterval(loadQueue, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleCancelJob = async (id: string) => {
    try {
      await fetch(`/api/generations/${id}`, { method: 'POST' });
      loadQueue();
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="min-h-screen pb-20">
      <div className="border-b border-kgm-border/40 bg-kgm-darkest/90 py-8 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl flex items-center justify-between">
          <div>
            <h1 className="font-serif text-2xl sm:text-3xl font-bold text-white tracking-wide">
              AI Generation Center & Queue
            </h1>
            <p className="text-xs text-gray-400 mt-1">
              Live status of asynchronous image-to-video jobs, model telemetry, and cost tracking
            </p>
          </div>
          <button
            onClick={loadQueue}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg glass-panel text-xs text-kgm-gold hover:border-kgm-gold/50"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Refresh</span>
          </button>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-6 space-y-6">
        
        {/* KPI Counter Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl glass-panel border border-kgm-border/40 flex items-center justify-between">
            <div>
              <p className="text-[11px] font-medium text-gray-400 uppercase">Active Background Jobs</p>
              <p className="text-2xl font-bold text-amber-300 mt-0.5">{queueData?.activeCount ?? 0}</p>
            </div>
            <Activity className="w-8 h-8 text-amber-400 animate-pulse" />
          </div>

          <div className="p-4 rounded-xl glass-panel border border-kgm-border/40 flex items-center justify-between">
            <div>
              <p className="text-[11px] font-medium text-gray-400 uppercase">Completed Generations</p>
              <p className="text-2xl font-bold text-emerald-300 mt-0.5">{queueData?.completedCount ?? 0}</p>
            </div>
            <CheckCircle2 className="w-8 h-8 text-emerald-400" />
          </div>

          <div className="p-4 rounded-xl glass-panel border border-kgm-border/40 flex items-center justify-between">
            <div>
              <p className="text-[11px] font-medium text-gray-400 uppercase">Failed / Recovered</p>
              <p className="text-2xl font-bold text-gray-300 mt-0.5">{queueData?.failedCount ?? 0}</p>
            </div>
            <AlertCircle className="w-8 h-8 text-gray-400" />
          </div>
        </div>

        {/* Jobs Table */}
        <div className="rounded-2xl glass-panel border border-kgm-border/40 overflow-hidden">
          <div className="p-4 border-b border-kgm-border/40 bg-kgm-darkest/80 flex items-center justify-between">
            <h3 className="font-serif text-sm font-bold text-white uppercase tracking-wider">
              Recent Generation Jobs ({queueData?.queueJobs?.length || 0})
            </h3>
            <span className="text-xs text-kgm-goldMuted font-mono">Real-Time Polling: Active (5s)</span>
          </div>

          {loading ? (
            <div className="p-12 text-center text-xs text-gray-400">Loading generation jobs...</div>
          ) : queueData?.queueJobs?.length === 0 ? (
            <div className="p-12 text-center text-xs text-gray-400">No generation jobs found in queue.</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-kgm-emerald/30 border-b border-kgm-border/30 text-gray-400 font-medium uppercase text-[10px]">
                  <tr>
                    <th className="p-3">Job ID</th>
                    <th className="p-3">Project & Shot</th>
                    <th className="p-3">Provider & Model</th>
                    <th className="p-3">Duration</th>
                    <th className="p-3">Status</th>
                    <th className="p-3">Cost</th>
                    <th className="p-3">Time</th>
                    <th className="p-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-kgm-border/20">
                  {queueData.queueJobs.map((job: any) => (
                    <tr key={job.id} className="hover:bg-kgm-emerald/10 transition-colors">
                      <td className="p-3 font-mono text-kgm-goldLight text-[11px]">{job.id.substring(0, 14)}...</td>
                      <td className="p-3">
                        <p className="font-semibold text-white">{job.project_title || 'Property Film'}</p>
                        <span className="text-[10px] text-gray-400">Shot #{job.shot_number} ({job.category})</span>
                      </td>
                      <td className="p-3">
                        <span className="px-2 py-0.5 rounded bg-black/40 text-kgm-gold text-[10px] font-mono">
                          {job.provider} / {job.model}
                        </span>
                      </td>
                      <td className="p-3 font-mono text-white">{job.duration || 10}s</td>
                      <td className="p-3">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-semibold uppercase ${
                          job.status === 'completed'
                            ? 'bg-emerald-500/20 text-emerald-300'
                            : job.status === 'processing'
                            ? 'bg-amber-500/20 text-amber-300 animate-pulse'
                            : 'bg-red-500/20 text-red-300'
                        }`}>
                          {job.status}
                        </span>
                      </td>
                      <td className="p-3 font-mono text-kgm-goldLight">${(job.actual_cost || job.cost_estimate || 0.10).toFixed(2)}</td>
                      <td className="p-3 text-gray-400 text-[11px]">
                        {new Date(job.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                      </td>
                      <td className="p-3 text-right">
                        <Link
                          href={`/studio/${job.project_id}`}
                          className="px-2.5 py-1 rounded bg-kgm-emerald text-kgm-goldLight text-[11px] font-medium hover:bg-kgm-emeraldLight"
                        >
                          Open Shot
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
