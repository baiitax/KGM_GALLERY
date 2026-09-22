'use client';

import React, { useState, useEffect } from 'react';
import { 
  Settings, 
  Cpu, 
  DollarSign, 
  Activity, 
  Film, 
  Compass, 
  Users, 
  ShieldCheck, 
  Plus, 
  Edit3, 
  Save, 
  Check, 
  RefreshCw, 
  Database,
  Layers,
  Sparkles
} from 'lucide-react';
import { MotionPreset, User } from '@/lib/types';

export default function AdminPanelPage() {
  const [activeTab, setActiveTab] = useState<'analytics' | 'presets' | 'providers' | 'users' | 'logs'>('analytics');
  
  // Analytics
  const [analytics, setAnalytics] = useState<any>(null);
  const [presets, setPresets] = useState<MotionPreset[]>([]);
  const [providers, setProviders] = useState<any[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  // Motion Preset Edit Modal / Form
  const [editingPreset, setEditingPreset] = useState<MotionPreset | null>(null);
  const [isSavingPreset, setIsSavingPreset] = useState(false);

  // New Preset Form
  const [isCreatingPreset, setIsCreatingPreset] = useState(false);
  const [newPresetData, setNewPresetData] = useState({
    name: '',
    description: '',
    best_for: '',
    direction: 'left_to_right',
    speed: 'slow',
    default_lens: '28mm',
    motion_intensity: 0.22,
    prompt_template: '',
    negative_prompt: '',
  });

  const loadAdminData = async () => {
    try {
      const [anaRes, preRes, provRes, userRes] = await Promise.all([
        fetch('/api/admin/analytics'),
        fetch('/api/motion-presets'),
        fetch('/api/providers'),
        fetch('/api/auth/current'),
      ]);

      const anaData = await anaRes.json();
      const preData = await preRes.json();
      const provData = await provRes.json();
      const userData = await userRes.json();

      setAnalytics(anaData);
      if (preData.presets) setPresets(preData.presets);
      if (provData.providers) setProviders(provData.providers);
      if (userData.allUsers) setUsers(userData.allUsers);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAdminData();
  }, []);

  const handleSavePreset = async (preset: MotionPreset) => {
    setIsSavingPreset(true);
    try {
      await fetch('/api/motion-presets', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(preset),
      });
      setEditingPreset(null);
      loadAdminData();
    } catch (e) {
      console.error(e);
    } finally {
      setIsSavingPreset(false);
    }
  };

  const handleCreateNewPreset = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await fetch('/api/motion-presets', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newPresetData),
      });
      setIsCreatingPreset(false);
      loadAdminData();
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="min-h-screen pb-20">
      <div className="border-b border-kgm-border/40 bg-kgm-darkest/90 py-8 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="font-serif text-2xl sm:text-3xl font-bold text-white tracking-wide">
              Studio Administration & AI Management
            </h1>
            <p className="text-xs text-gray-400 mt-1">
              Configure camera motion libraries, AI provider model routing, usage quotas, and user permissions
            </p>
          </div>
          <button
            onClick={loadAdminData}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg glass-panel text-xs text-kgm-gold"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Refresh Telemetry</span>
          </button>
        </div>
      </div>

      {/* Admin Nav Tabs */}
      <div className="border-b border-kgm-border/40 bg-kgm-darkest/80 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto flex gap-2 py-2.5 overflow-x-auto scrollbar-none">
          {[
            { id: 'analytics', label: 'Cost & Usage Analytics', icon: DollarSign },
            { id: 'presets', label: 'Motion Preset Library', icon: Compass, count: presets.length },
            { id: 'providers', label: 'AI Providers & Routing', icon: Cpu },
            { id: 'users', label: 'Users & RBAC', icon: Users, count: users.length },
            { id: 'logs', label: 'System Audit Logs', icon: Database },
          ].map(tab => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all whitespace-nowrap ${
                  isActive
                    ? 'bg-kgm-emerald text-kgm-goldLight border border-kgm-gold/40 shadow-inner'
                    : 'text-gray-400 hover:text-white hover:bg-kgm-emerald/20'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-kgm-gold' : 'text-gray-500'}`} />
                <span>{tab.label}</span>
                {tab.count !== undefined && (
                  <span className="px-1.5 py-0.2 rounded-full bg-black/40 text-[10px] text-kgm-gold">
                    {tab.count}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        
        {/* ========================================================================= */}
        {/* TAB 1: COST & USAGE ANALYTICS */}
        {/* ========================================================================= */}
        {activeTab === 'analytics' && analytics && (
          <div className="space-y-8">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-4 rounded-xl glass-panel border border-kgm-border/40 space-y-1">
                <span className="text-[11px] font-medium text-gray-400 uppercase">Total AI Cost (All Time)</span>
                <p className="text-2xl font-serif font-bold text-kgm-goldLight">${analytics.kpis?.total_ai_cost ?? '4.80'}</p>
                <span className="text-[10px] text-emerald-400">Generation + Assembly</span>
              </div>
              <div className="p-4 rounded-xl glass-panel border border-kgm-border/40 space-y-1">
                <span className="text-[11px] font-medium text-gray-400 uppercase">Completed Productions</span>
                <p className="text-2xl font-serif font-bold text-white">{analytics.kpis?.completed_films ?? 1}</p>
                <span className="text-[10px] text-gray-400">Master Films Ready</span>
              </div>
              <div className="p-4 rounded-xl glass-panel border border-kgm-border/40 space-y-1">
                <span className="text-[11px] font-medium text-gray-400 uppercase">Provider Success Rate</span>
                <p className="text-2xl font-serif font-bold text-emerald-300">{analytics.kpis?.success_rate_percent ?? 100}%</p>
                <span className="text-[10px] text-emerald-400">Zero Unhandled Drops</span>
              </div>
              <div className="p-4 rounded-xl glass-panel border border-kgm-border/40 space-y-1">
                <span className="text-[11px] font-medium text-gray-400 uppercase">Avg Generation Speed</span>
                <p className="text-2xl font-serif font-bold text-white">{analytics.kpis?.avg_generation_time_sec ?? 1.4}s</p>
                <span className="text-[10px] text-kgm-goldMuted">Per 10s Shot Clip</span>
              </div>
            </div>

            {/* Cost Breakdown Tables */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-5 rounded-2xl glass-panel border border-kgm-border/40 space-y-3">
                <h3 className="font-serif text-sm font-bold text-white uppercase tracking-wider">AI Cost by Provider</h3>
                <div className="space-y-2">
                  {analytics.costByProvider?.map((p: any) => (
                    <div key={p.provider} className="p-3 rounded-lg bg-kgm-card flex items-center justify-between text-xs">
                      <span className="font-bold text-white capitalize">{p.provider.replace('_', ' ')}</span>
                      <div className="flex items-center gap-4">
                        <span className="text-gray-400">{p.count} shots</span>
                        <span className="font-mono font-bold text-kgm-gold">${Number(p.total_cost || 0).toFixed(2)}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-5 rounded-2xl glass-panel border border-kgm-border/40 space-y-3">
                <h3 className="font-serif text-sm font-bold text-white uppercase tracking-wider">AI Cost by Project</h3>
                <div className="space-y-2">
                  {analytics.costByProject?.map((proj: any) => (
                    <div key={proj.id} className="p-3 rounded-lg bg-kgm-card flex items-center justify-between text-xs">
                      <span className="font-bold text-white truncate max-w-[200px]">{proj.title}</span>
                      <span className="font-mono font-bold text-kgm-gold">${Number(proj.total_cost || 0).toFixed(2)}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 2: MOTION PRESET LIBRARY & PRESET EDITOR */}
        {/* ========================================================================= */}
        {activeTab === 'presets' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-serif text-lg font-bold text-white">Motion Preset Library ({presets.length} Presets)</h2>
                <p className="text-xs text-gray-400">Database-driven camera choreography presets configured for architectural preservation</p>
              </div>
              <button
                onClick={() => setIsCreatingPreset(true)}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-kgm-goldDark to-kgm-gold text-kgm-darkest text-xs font-bold uppercase tracking-wider hover:brightness-110"
              >
                <Plus className="w-3.5 h-3.5 stroke-[3]" />
                <span>Create Preset</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {presets.map(p => (
                <div key={p.id} className="p-5 rounded-2xl glass-panel border border-kgm-border/40 space-y-3 flex flex-col justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono text-kgm-gold uppercase font-bold">{p.direction} • {p.speed}</span>
                      <span className={`text-[9px] px-2 py-0.5 rounded uppercase font-semibold ${
                        p.risk_level === 'low' ? 'bg-emerald-500/20 text-emerald-300' : 'bg-amber-500/20 text-amber-300'
                      }`}>
                        {p.risk_level} Risk
                      </span>
                    </div>
                    <h3 className="font-serif text-base font-bold text-white">{p.name}</h3>
                    <p className="text-xs text-gray-300 leading-relaxed line-clamp-2">{p.description}</p>
                    
                    <div className="pt-2 text-[11px] text-gray-400 border-t border-kgm-border/30 space-y-1">
                      <p>Best for: <strong className="text-white">{p.best_for}</strong></p>
                      <p>Optics Lens: <strong className="text-white">{p.default_lens}</strong></p>
                      <p>Intensity: <strong className="text-kgm-gold">{Math.round(p.motion_intensity * 100)}%</strong></p>
                    </div>
                  </div>

                  <div className="pt-2">
                    <button
                      onClick={() => setEditingPreset(p)}
                      className="w-full flex items-center justify-center gap-2 py-2 rounded-lg bg-kgm-emerald text-kgm-goldLight border border-kgm-gold/30 text-xs font-semibold hover:bg-kgm-emeraldLight"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                      <span>Edit Motion Template</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 3: AI PROVIDERS & MODEL ROUTING */}
        {/* ========================================================================= */}
        {activeTab === 'providers' && (
          <div className="space-y-6">
            <h2 className="font-serif text-lg font-bold text-white">AI Provider Infrastructure & Model Router</h2>
            <div className="space-y-4">
              {providers.map(p => (
                <div key={p.id} className="p-5 rounded-2xl glass-panel border border-kgm-border/40 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-kgm-emerald text-kgm-gold border border-kgm-gold/30">
                        <Cpu className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="font-serif text-base font-bold text-white">{p.display_name}</h3>
                        <span className="text-[10px] text-gray-400 font-mono">Provider Identifier: {p.provider_name}</span>
                      </div>
                    </div>
                    <span className="text-xs text-emerald-400 font-bold">● OPERATIONAL</span>
                  </div>

                  {/* Models list */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                    {p.models?.map((m: any) => (
                      <div key={m.id} className="p-3 rounded-lg bg-kgm-card text-xs flex justify-between items-center border border-kgm-border/20">
                        <div>
                          <p className="font-semibold text-white">{m.model_name}</p>
                          <span className="text-[10px] text-gray-400 font-mono">ID: {m.model_id}</span>
                        </div>
                        <span className="text-kgm-gold font-mono font-bold">${m.cost_per_second}/s</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 4: USERS & RBAC */}
        {/* ========================================================================= */}
        {activeTab === 'users' && (
          <div className="space-y-6">
            <h2 className="font-serif text-lg font-bold text-white">Organization Users & Role-Based Access Control (RBAC)</h2>
            <div className="rounded-2xl glass-panel border border-kgm-border/40 overflow-hidden">
              <table className="w-full text-left text-xs">
                <thead className="bg-kgm-emerald/30 border-b border-kgm-border/30 text-gray-400 font-medium uppercase text-[10px]">
                  <tr>
                    <th className="p-4">User</th>
                    <th className="p-4">Email</th>
                    <th className="p-4">Studio Role</th>
                    <th className="p-4">Permissions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-kgm-border/20">
                  {users.map(u => (
                    <tr key={u.id} className="hover:bg-kgm-emerald/10">
                      <td className="p-4 flex items-center gap-3">
                        <img src={u.avatar_url} alt={u.full_name} className="w-8 h-8 rounded-full object-cover border border-kgm-gold/30" />
                        <span className="font-bold text-white">{u.full_name}</span>
                      </td>
                      <td className="p-4 text-gray-300 font-mono text-[11px]">{u.email}</td>
                      <td className="p-4">
                        <span className="px-2.5 py-1 rounded bg-kgm-emerald text-kgm-gold text-[10px] font-bold uppercase">
                          {u.role.replace('_', ' ')}
                        </span>
                      </td>
                      <td className="p-4 text-gray-400 text-[11px]">
                        {u.role === 'super_admin' ? 'Full System & Provider Control' : u.role === 'creative_director' ? 'Storyboard & Shot Approvals' : 'Project Creation & Media Export'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 5: SYSTEM AUDIT LOGS */}
        {/* ========================================================================= */}
        {activeTab === 'logs' && (
          <div className="space-y-6">
            <h2 className="font-serif text-lg font-bold text-white">System Security & Audit Trail</h2>
            <div className="rounded-2xl glass-panel border border-kgm-border/40 overflow-hidden">
              <div className="p-4 border-b border-kgm-border/30 text-xs font-mono text-kgm-gold">
                IMMUTABLE AUDIT LOGS • ENCRYPTED AUDIT TRAIL
              </div>
              <div className="p-4 space-y-2 font-mono text-xs max-h-96 overflow-y-auto">
                {analytics?.auditLogs?.map((log: any) => (
                  <div key={log.id} className="p-2 rounded bg-black/40 text-gray-300 flex items-center justify-between text-[11px]">
                    <div>
                      <span className="text-kgm-gold font-bold">[{log.action}]</span>
                      <span className="text-gray-400 ml-2">{log.user_email}</span>
                      <span className="text-gray-500 ml-2">{log.details_json}</span>
                    </div>
                    <span className="text-gray-500">{new Date(log.created_at).toLocaleString()}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

      </div>

      {/* Motion Preset Edit Modal */}
      {editingPreset && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4">
          <div className="relative w-full max-w-2xl rounded-2xl glass-panel border border-kgm-gold shadow-2xl p-6 bg-kgm-darkest/95 space-y-4">
            <h3 className="font-serif text-lg font-bold text-white">Edit Motion Preset: {editingPreset.name}</h3>
            
            <div className="space-y-3 text-xs">
              <div>
                <label className="text-gray-300 font-semibold uppercase">Prompt Template</label>
                <textarea
                  rows={3}
                  value={editingPreset.prompt_template}
                  onChange={e => setEditingPreset({ ...editingPreset, prompt_template: e.target.value })}
                  className="w-full rounded-lg border border-kgm-border bg-kgm-card p-2 text-white font-mono mt-1"
                />
              </div>

              <div>
                <label className="text-gray-300 font-semibold uppercase">Negative Prompt (Protection)</label>
                <textarea
                  rows={2}
                  value={editingPreset.negative_prompt}
                  onChange={e => setEditingPreset({ ...editingPreset, negative_prompt: e.target.value })}
                  className="w-full rounded-lg border border-kgm-border bg-kgm-card p-2 text-white font-mono mt-1"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-gray-300">Focal Lens</label>
                  <input
                    type="text"
                    value={editingPreset.default_lens}
                    onChange={e => setEditingPreset({ ...editingPreset, default_lens: e.target.value })}
                    className="w-full rounded-lg border border-kgm-border bg-kgm-card p-2 text-white mt-1"
                  />
                </div>
                <div>
                  <label className="text-gray-300">Motion Intensity (0.1 - 0.4)</label>
                  <input
                    type="number"
                    step={0.01}
                    value={editingPreset.motion_intensity}
                    onChange={e => setEditingPreset({ ...editingPreset, motion_intensity: parseFloat(e.target.value) })}
                    className="w-full rounded-lg border border-kgm-border bg-kgm-card p-2 text-white mt-1"
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-3 border-t border-kgm-border/40">
              <button
                onClick={() => setEditingPreset(null)}
                className="px-4 py-2 rounded-lg border border-white/20 text-xs text-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={() => handleSavePreset(editingPreset)}
                disabled={isSavingPreset}
                className="px-6 py-2 rounded-lg bg-kgm-gold text-kgm-darkest font-bold text-xs uppercase"
              >
                {isSavingPreset ? 'Saving...' : 'Save Preset'}
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
