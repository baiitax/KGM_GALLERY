'use client';

import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, Server, Key, Users, DollarSign, 
  Activity, CheckCircle2, Lock, Zap, RefreshCw, Sliders
} from 'lucide-react';

export default function AdminPage() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'providers' | 'users' | 'audit'>('providers');

  useEffect(() => {
    fetch('/api/admin')
      .then(r => r.json())
      .then(d => {
        if (d.success) setData(d);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const { providers = [], models = [], users = [], recentAudit = [] } = data || {};

  return (
    <div className="min-h-screen bg-[#07130E] text-white p-6 md:p-10">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="border-b border-[#1A3D2F]/60 pb-6">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[#C5A869] text-xs font-semibold tracking-wider uppercase">System Administration</span>
            <span className="text-[#1A3D2F]">•</span>
            <span className="text-zinc-400 text-xs">AI Providers, Multi-Tenancy & Audit</span>
          </div>
          <h1 className="text-3xl font-serif text-[#F4EBD9]">Studio Administration Panel</h1>
          <p className="text-zinc-400 text-sm mt-1">
            Configure multi-provider AI endpoints (Runway, Luma, Kling, Google Veo, Native Neural), budgets, role-based access control, and security audit logs.
          </p>
        </div>

        {/* Tab Selection */}
        <div className="flex items-center gap-4 border-b border-[#1A3D2F] text-xs font-medium text-zinc-400">
          <button
            onClick={() => setActiveTab('providers')}
            className={`pb-3 border-b-2 transition ${
              activeTab === 'providers' ? 'border-[#C5A869] text-[#C5A869]' : 'border-transparent hover:text-white'
            }`}
          >
            AI Video Providers & Models
          </button>
          <button
            onClick={() => setActiveTab('users')}
            className={`pb-3 border-b-2 transition ${
              activeTab === 'users' ? 'border-[#C5A869] text-[#C5A869]' : 'border-transparent hover:text-white'
            }`}
          >
            User Roles & RBAC ({users.length})
          </button>
          <button
            onClick={() => setActiveTab('audit')}
            className={`pb-3 border-b-2 transition ${
              activeTab === 'audit' ? 'border-[#C5A869] text-[#C5A869]' : 'border-transparent hover:text-white'
            }`}
          >
            Security & Audit Logs ({recentAudit.length})
          </button>
        </div>

        {/* Tab 1: AI Video Providers */}
        {activeTab === 'providers' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {providers.map((p: any) => (
                <div
                  key={p.id}
                  className="bg-[#0B2319] p-6 rounded-3xl border border-[#1A3D2F] space-y-4 shadow-xl flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-[10px] uppercase bg-[#124232] text-[#C5A869] px-2 py-0.5 rounded border border-[#C5A869]/30">
                        {p.provider_type}
                      </span>
                      <span className="flex items-center gap-1 text-[11px] text-emerald-400">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Active</span>
                      </span>
                    </div>

                    <div>
                      <h4 className="font-serif text-lg text-[#F4EBD9]">{p.name}</h4>
                      <p className="text-xs text-zinc-400 mt-1">
                        Secure Provider Endpoint: <code className="text-[#C5A869] font-mono">{p.api_base_url || 'Internal GPU Cluster'}</code>
                      </p>
                    </div>

                    <div className="pt-2 border-t border-[#1A3D2F]/60 text-xs text-zinc-300 space-y-1">
                      <div className="flex justify-between">
                        <span className="text-zinc-400">Monthly Budget:</span>
                        <span className="font-mono text-[#C5A869]">${p.monthly_budget_usd} USD</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-zinc-400">API Key Encryption:</span>
                        <span className="text-emerald-400 flex items-center gap-1 font-mono text-[10px]">
                          <Lock className="w-3 h-3" /> AES-256 GCM
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-[#1A3D2F]/60 flex items-center justify-between text-xs">
                    <span className="text-[10px] text-zinc-400">Rate Limit: 50 req/min</span>
                    <button className="text-xs text-[#C5A869] hover:underline font-medium">Configure</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 2: RBAC Users */}
        {activeTab === 'users' && (
          <div className="bg-[#0B2319] rounded-3xl border border-[#1A3D2F] overflow-hidden">
            <div className="p-5 border-b border-[#1A3D2F]/60 flex items-center justify-between">
              <h3 className="font-serif text-lg text-[#F4EBD9]">Studio Role-Based Access Control</h3>
            </div>

            <div className="divide-y divide-[#1A3D2F]/40 text-xs">
              {users.map((u: any) => (
                <div key={u.id} className="p-4 flex items-center justify-between">
                  <div>
                    <div className="font-semibold text-white">{u.full_name}</div>
                    <div className="text-zinc-400 text-[11px]">{u.email}</div>
                  </div>

                  <div className="flex items-center gap-4">
                    <span className="px-3 py-1 rounded-full font-mono text-[10px] uppercase font-semibold bg-[#124232] text-[#C5A869] border border-[#C5A869]/30">
                      {u.role}
                    </span>
                    <span className="text-emerald-400 text-[11px]">Active</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 3: Audit Logs */}
        {activeTab === 'audit' && (
          <div className="bg-[#0B2319] rounded-3xl border border-[#1A3D2F] overflow-hidden">
            <div className="p-5 border-b border-[#1A3D2F]/60">
              <h3 className="font-serif text-lg text-[#F4EBD9]">Security & Action Audit Log</h3>
            </div>

            <div className="divide-y divide-[#1A3D2F]/40 text-xs font-mono">
              {recentAudit.map((log: any) => (
                <div key={log.id} className="p-4 flex items-center justify-between text-zinc-300">
                  <div className="space-y-0.5">
                    <div className="text-white font-semibold">{log.action}</div>
                    <div className="text-[10px] text-zinc-400">Entity: {log.entity_type} ({log.entity_id})</div>
                  </div>

                  <div className="text-right text-[10px] text-zinc-400">
                    <div>User: {log.user_id}</div>
                    <div>{log.created_at}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
