'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Film, Sparkles, Monitor, Smartphone, Square, Share2, 
  Download, RefreshCw, Volume2, Globe, ArrowRight, ShieldCheck, 
  Building2, Activity, Music, Layers, Sliders, Eye, Plus, 
  User, CheckCircle2, Zap, Server, Clock, LogOut, Cpu
} from 'lucide-react';
import CinematicPipelineStudio from './components/CinematicPipelineStudio';

export default function HomePage() {
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [activeTab, setActiveTab] = useState<'pipeline' | 'catalog' | 'master_showcase'>('pipeline');
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Load User & Projects from API/local state
  useEffect(() => {
    // Check localStorage or API for user
    const localUser = localStorage.getItem('kgm_active_user');
    if (localUser) {
      try {
        setCurrentUser(JSON.parse(localUser));
      } catch (e) {
        // Fallback
      }
    }

    fetch('/api/auth/me')
      .then((r) => r.json())
      .then((data) => {
        if (data.success && data.user && !currentUser) {
          setCurrentUser(data.user);
        }
      })
      .catch(console.error);

    fetch('/api/projects')
      .then((r) => r.json())
      .then((data) => {
        if (data.success) {
          setProjects(data.projects);
        }
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    localStorage.removeItem('kgm_active_user');
    window.location.href = '/login';
  };

  return (
    <div className="min-h-screen bg-[#07130E] text-white selection:bg-[#C5A869] selection:text-[#0B2B20]">
      {/* Top Studio Dashboard Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-5 pb-4 border-b border-[#1A3D2F]/60">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#C5A869] to-[#997F46] p-0.5 flex items-center justify-center shadow-lg shadow-[#C5A869]/20 shrink-0">
              <div className="w-full h-full bg-[#0B2B20] rounded-[10px] flex items-center justify-center">
                <span className="font-serif font-bold text-[#C5A869] text-base">K</span>
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-serif text-lg sm:text-xl font-bold text-[#F4EBD9]">
                  KGM Studio OS
                </h1>
                <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-500/30 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                  GPU CLUSTER ONLINE
                </span>
              </div>
              <p className="text-[11px] text-zinc-400">
                Kurra Greenfield Merchants Limited • AI Architectural Cinematography
              </p>
            </div>
          </div>

          {/* User Profile & Quick Actions */}
          <div className="flex items-center gap-2.5">
            {currentUser ? (
              <div className="flex items-center gap-2 bg-[#0B2319] border border-[#1A3D2F] rounded-xl px-3 py-1.5 text-xs">
                <div className="w-6 h-6 rounded-full bg-[#124232] border border-[#C5A869]/40 flex items-center justify-center text-[11px] font-mono text-[#C5A869]">
                  {currentUser.fullName?.charAt(0) || 'A'}
                </div>
                <div className="hidden sm:block text-left">
                  <div className="font-semibold text-white truncate max-w-[140px]">{currentUser.fullName}</div>
                  <div className="text-[9px] text-[#C5A869] uppercase font-mono">{currentUser.role || 'Executive Director'}</div>
                </div>
                <button
                  onClick={handleLogout}
                  className="p-1 text-zinc-400 hover:text-red-400 transition"
                  title="Sign out"
                >
                  <LogOut className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <Link
                href="/login"
                className="flex items-center gap-1.5 bg-[#0B2319] hover:bg-[#124232] border border-[#C5A869]/40 text-[#C5A869] px-3 py-1.5 rounded-xl text-xs font-semibold transition"
              >
                <User className="w-3.5 h-3.5" />
                <span>Sign In</span>
              </Link>
            )}

            <button
              onClick={() => setActiveTab('pipeline')}
              className="flex items-center gap-1.5 bg-gradient-to-r from-[#C5A869] to-[#DFCA95] text-[#0B2B20] px-4 py-1.5 rounded-xl text-xs font-bold hover:brightness-110 transition shadow-lg shadow-[#C5A869]/20"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Create Film</span>
            </button>
          </div>
        </div>

        {/* Metric Overview Counters */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-4">
          <div className="bg-[#0B2319] p-3 sm:p-4 rounded-xl border border-[#1A3D2F]">
            <div className="flex items-center justify-between text-zinc-400 text-[10px] mb-0.5">
              <span>Master Productions</span>
              <Film className="w-3.5 h-3.5 text-[#C5A869]" />
            </div>
            <div className="text-lg sm:text-xl font-serif font-bold text-white">{projects.length || 1} Active</div>
            <div className="text-[9px] text-emerald-400">100% 4K Cinema Ready</div>
          </div>

          <div className="bg-[#0B2319] p-3 sm:p-4 rounded-xl border border-[#1A3D2F]">
            <div className="flex items-center justify-between text-zinc-400 text-[10px] mb-0.5">
              <span>GPU Compute Node</span>
              <Cpu className="w-3.5 h-3.5 text-[#C5A869]" />
            </div>
            <div className="text-lg sm:text-xl font-serif font-bold text-white">Tensor V100</div>
            <div className="text-[9px] text-[#C5A869]">Multi-Provider Offload</div>
          </div>

          <div className="bg-[#0B2319] p-3 sm:p-4 rounded-xl border border-[#1A3D2F]">
            <div className="flex items-center justify-between text-zinc-400 text-[10px] mb-0.5">
              <span>Color Pipeline</span>
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            </div>
            <div className="text-lg sm:text-xl font-serif font-bold text-white">ACES 2065-1</div>
            <div className="text-[9px] text-emerald-400">Photorealistic Rendering</div>
          </div>

          <div className="bg-[#0B2319] p-3 sm:p-4 rounded-xl border border-[#1A3D2F]">
            <div className="flex items-center justify-between text-zinc-400 text-[10px] mb-0.5">
              <span>Distribution Tiers</span>
              <Monitor className="w-3.5 h-3.5 text-[#C5A869]" />
            </div>
            <div className="text-lg sm:text-xl font-serif font-bold text-white">4 Formats</div>
            <div className="text-[9px] text-zinc-400">16:9 • 9:16 • 1:1 • WhatsApp</div>
          </div>
        </div>
      </div>

      {/* Main View Switcher */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-4 flex items-center justify-between">
        <div className="flex items-center gap-1.5 bg-[#0B2319] p-1 rounded-xl border border-[#1A3D2F]">
          <button
            onClick={() => setActiveTab('pipeline')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition ${
              activeTab === 'pipeline'
                ? 'bg-[#C5A869] text-[#0B2B20] shadow'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            ⚡ Live 8-Step Studio Pipeline
          </button>
          <button
            onClick={() => setActiveTab('catalog')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition ${
              activeTab === 'catalog'
                ? 'bg-[#C5A869] text-[#0B2B20] shadow'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            🗂 Master Film Catalog ({projects.length})
          </button>
        </div>

        <Link
          href="/film/kgm-film-royal-villa-riyadh"
          target="_blank"
          className="hidden sm:flex items-center gap-1.5 text-xs text-[#C5A869] hover:underline font-medium"
        >
          <span>Launch Public VIP Portal</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* View 1: 8-Step Pipeline */}
      {activeTab === 'pipeline' && (
        <div className="py-2">
          <CinematicPipelineStudio />
        </div>
      )}

      {/* View 2: Projects Catalog & Master Downloads */}
      {activeTab === 'catalog' && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((proj) => (
              <div
                key={proj.id}
                className="group bg-[#0B2319] border border-[#1A3D2F] hover:border-[#C5A869]/60 rounded-3xl overflow-hidden shadow-xl flex flex-col justify-between transition-all duration-300"
              >
                <div className="relative aspect-video bg-black overflow-hidden">
                  <img
                    src={proj.cover_image_url || '/uploads/villa_01_hero_exterior.jpg'}
                    alt={proj.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                  />
                  <div className="absolute top-3 left-3 flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded-full text-[9px] font-semibold uppercase bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                      {proj.status || 'Completed'}
                    </span>
                    <span className="bg-black/70 backdrop-blur-md px-2 py-0.5 rounded text-[9px] font-mono text-[#C5A869] border border-[#C5A869]/30">
                      1080p Master
                    </span>
                  </div>
                </div>

                <div className="p-5 space-y-4">
                  <div>
                    <h3 className="font-serif text-base sm:text-lg text-[#F4EBD9] line-clamp-1 group-hover:text-[#C5A869] transition">
                      {proj.title}
                    </h3>
                    <p className="text-xs text-zinc-400 mt-0.5">{proj.location || 'Riyadh, Saudi Arabia'}</p>
                  </div>

                  {/* 4-Tier Downloads Bar */}
                  <div className="grid grid-cols-2 gap-2 text-[10px] font-mono">
                    <a
                      href="/exports/film_proj_kgm_riyadh_01_master_16x9.mp4"
                      download
                      className="p-2 bg-[#071710] hover:bg-[#124232] rounded-lg border border-[#1A3D2F] flex items-center justify-between text-zinc-300 hover:text-[#C5A869] transition"
                    >
                      <span>16:9 Cinema</span>
                      <Download className="w-3 h-3" />
                    </a>
                    <a
                      href="/exports/film_proj_kgm_riyadh_01_social_portrait_9x16.mp4"
                      download
                      className="p-2 bg-[#071710] hover:bg-[#124232] rounded-lg border border-[#1A3D2F] flex items-center justify-between text-zinc-300 hover:text-[#C5A869] transition"
                    >
                      <span>9:16 Reels</span>
                      <Download className="w-3 h-3" />
                    </a>
                    <a
                      href="/exports/film_proj_kgm_riyadh_01_social_square_1x1.mp4"
                      download
                      className="p-2 bg-[#071710] hover:bg-[#124232] rounded-lg border border-[#1A3D2F] flex items-center justify-between text-zinc-300 hover:text-[#C5A869] transition"
                    >
                      <span>1:1 Square</span>
                      <Download className="w-3 h-3" />
                    </a>
                    <a
                      href="/exports/film_proj_kgm_riyadh_01_whatsapp_fast.mp4"
                      download
                      className="p-2 bg-[#071710] hover:bg-[#124232] rounded-lg border border-[#1A3D2F] flex items-center justify-between text-zinc-300 hover:text-[#C5A869] transition"
                    >
                      <span>WhatsApp</span>
                      <Download className="w-3 h-3" />
                    </a>
                  </div>

                  <div className="pt-3 border-t border-[#1A3D2F]/60 flex items-center justify-between">
                    <Link
                      href={`/film/${proj.public_id || 'kgm-film-royal-villa-riyadh'}`}
                      target="_blank"
                      className="text-xs text-zinc-400 hover:text-[#C5A869] flex items-center gap-1"
                    >
                      <span>VIP Client View</span>
                      <Eye className="w-3 h-3" />
                    </Link>

                    <button
                      onClick={() => setActiveTab('pipeline')}
                      className="flex items-center gap-1 bg-[#124232] text-[#C5A869] border border-[#C5A869]/40 px-3 py-1.5 rounded-lg text-xs font-semibold hover:brightness-110 transition"
                    >
                      <Film className="w-3.5 h-3.5" />
                      <span>Open Editor</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
