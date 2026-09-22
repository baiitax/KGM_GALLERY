'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Plus, Film, Video, Clock, CheckCircle2, AlertCircle, 
  Layers, ArrowUpRight, Search, Filter, Play, Download, Sparkles
} from 'lucide-react';

export default function ProjectsPage() {
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [showNewModal, setShowNewModal] = useState(false);
  const [newProjectName, setNewProjectName] = useState('');
  const [newPropertyLocation, setNewPropertyLocation] = useState('Riyadh, Saudi Arabia');
  const [newPrice, setNewPrice] = useState('45,000,000 SAR');
  const [creating, setCreating] = useState(false);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const res = await fetch('/api/projects');
      const data = await res.json();
      if (data.success) {
        setProjects(data.projects);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateProject = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProjectName.trim()) return;
    setCreating(true);
    try {
      const res = await fetch('/api/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: newProjectName,
          property_name: newProjectName,
          location: newPropertyLocation,
          price: parseInt(newPrice.replace(/[^0-9]/g, '')) || 35000000,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setShowNewModal(false);
        setNewProjectName('');
        fetchProjects();
      }
    } catch (e) {
      console.error(e);
    } finally {
      setCreating(false);
    }
  };

  const filteredProjects = projects.filter(p => {
    const matchesSearch = p.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          p.location?.toLowerCase().includes(searchQuery.toLowerCase());
    if (filterType === 'all') return matchesSearch;
    return matchesSearch && p.status === filterType;
  });

  return (
    <div className="min-h-screen bg-[#07130E] text-white p-6 md:p-10">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#1A3D2F]/60 pb-6">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[#C5A869] text-xs font-semibold tracking-wider uppercase">Production Hub</span>
              <span className="text-[#1A3D2F]">•</span>
              <span className="text-zinc-400 text-xs">Cinematic Real Estate Films</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-serif text-[#F4EBD9]">Master Film Projects</h1>
            <p className="text-zinc-400 text-sm mt-1">
              Create, curate, and master ultra-luxury real estate films powered by AI camera kinetics and FFmpeg mastering.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowNewModal(true)}
              className="flex items-center gap-2 bg-gradient-to-r from-[#C5A869] to-[#DFCA95] text-[#0B2B20] px-5 py-2.5 rounded-lg font-medium text-sm hover:brightness-110 transition shadow-lg shadow-[#C5A869]/20"
            >
              <Plus className="w-4 h-4" />
              <span>New Film Project</span>
            </button>
          </div>
        </div>

        {/* Filters & Search */}
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="relative w-full md:w-96">
            <Search className="w-4 h-4 absolute left-3 top-3 text-zinc-400" />
            <input
              type="text"
              placeholder="Search properties or locations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#0B2319] border border-[#1A3D2F] rounded-lg pl-9 pr-4 py-2 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-[#C5A869]"
            />
          </div>

          <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto pb-2 md:pb-0">
            {['all', 'completed', 'rendering', 'draft'].map((type) => (
              <button
                key={type}
                onClick={() => setFilterType(type)}
                className={`px-4 py-1.5 rounded-full text-xs font-medium capitalize transition ${
                  filterType === type
                    ? 'bg-[#C5A869] text-[#0B2B20]'
                    : 'bg-[#0B2319] text-zinc-300 border border-[#1A3D2F] hover:border-[#C5A869]/50'
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        {loading ? (
          <div className="py-20 text-center">
            <div className="inline-block animate-spin w-8 h-8 border-2 border-[#C5A869] border-t-transparent rounded-full mb-3"></div>
            <p className="text-zinc-400 text-sm">Loading KGM Master Catalog...</p>
          </div>
        ) : filteredProjects.length === 0 ? (
          <div className="py-20 text-center border border-dashed border-[#1A3D2F] rounded-2xl bg-[#0B2319]/40">
            <Film className="w-12 h-12 text-[#C5A869]/50 mx-auto mb-3" />
            <h3 className="text-lg font-serif text-[#F4EBD9]">No Projects Found</h3>
            <p className="text-zinc-400 text-xs mt-1">Create your first film or try a different filter.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((proj) => (
              <div
                key={proj.id}
                className="group relative bg-gradient-to-b from-[#0D261C] to-[#081711] border border-[#1A3D2F] hover:border-[#C5A869]/60 rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-[#C5A869]/10 flex flex-col"
              >
                {/* Visual Header */}
                <div className="relative aspect-video bg-[#05100B] overflow-hidden">
                  <img
                    src={proj.thumbnail_path || '/sample-photos/villa_facade_dusk.jpg'}
                    alt={proj.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#081711] via-transparent to-black/40" />

                  <div className="absolute top-3 left-3 flex items-center gap-2">
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wider ${
                      proj.status === 'completed'
                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                        : proj.status === 'rendering'
                        ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                        : 'bg-zinc-700/50 text-zinc-300 border border-zinc-600'
                    }`}>
                      {proj.status}
                    </span>
                    <span className="bg-black/60 backdrop-blur-md px-2 py-0.5 rounded text-[10px] text-[#C5A869] border border-[#C5A869]/30 font-mono">
                      {proj.default_aspect_ratio || '16:9'}
                    </span>
                  </div>

                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-zinc-300">
                    <span className="flex items-center gap-1 bg-black/60 backdrop-blur px-2 py-1 rounded">
                      <Layers className="w-3.5 h-3.5 text-[#C5A869]" />
                      {proj.shot_count || 10} Cinematic Shots
                    </span>
                    <span className="flex items-center gap-1 bg-black/60 backdrop-blur px-2 py-1 rounded">
                      <Clock className="w-3.5 h-3.5 text-[#C5A869]" />
                      {proj.target_duration_seconds || 100}s Cut
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <h3 className="font-serif text-lg text-[#F4EBD9] group-hover:text-[#C5A869] transition line-clamp-1">
                      {proj.title}
                    </h3>
                    <p className="text-zinc-400 text-xs mt-1 flex items-center gap-1">
                      <span>{proj.location || 'Riyadh, Saudi Arabia'}</span>
                      {proj.price && (
                        <>
                          <span className="text-zinc-600">•</span>
                          <span className="text-[#C5A869] font-medium">{proj.price.toLocaleString()} {proj.currency || 'SAR'}</span>
                        </>
                      )}
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="pt-3 border-t border-[#1A3D2F]/60 flex items-center justify-between gap-2">
                    <Link
                      href={`/film/${proj.public_id || proj.id}`}
                      className="text-xs text-zinc-400 hover:text-[#C5A869] flex items-center gap-1 transition"
                    >
                      <span>Public Client View</span>
                      <ArrowUpRight className="w-3 h-3" />
                    </Link>

                    <Link
                      href={`/projects/${proj.id}`}
                      className="flex items-center gap-1.5 bg-[#0B2B20] hover:bg-[#124232] text-[#C5A869] border border-[#C5A869]/40 px-3.5 py-1.5 rounded-lg text-xs font-medium transition"
                    >
                      <Film className="w-3.5 h-3.5" />
                      <span>Open Studio</span>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Create Modal */}
        {showNewModal && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-[#0B2319] border border-[#C5A869]/40 rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-5">
              <div className="flex items-center justify-between border-b border-[#1A3D2F] pb-4">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-[#C5A869]" />
                  <h3 className="font-serif text-lg text-[#F4EBD9]">New Film Project</h3>
                </div>
                <button
                  onClick={() => setShowNewModal(false)}
                  className="text-zinc-400 hover:text-white text-sm"
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handleCreateProject} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-1.5">
                    Property / Film Title
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g., The Obsidian Penthouse — Dubai Marina"
                    value={newProjectName}
                    onChange={(e) => setNewProjectName(e.target.value)}
                    className="w-full bg-[#071710] border border-[#1A3D2F] rounded-lg px-3.5 py-2.5 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-[#C5A869]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-1.5">
                    Location
                  </label>
                  <input
                    type="text"
                    value={newPropertyLocation}
                    onChange={(e) => setNewPropertyLocation(e.target.value)}
                    className="w-full bg-[#071710] border border-[#1A3D2F] rounded-lg px-3.5 py-2.5 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-[#C5A869]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-1.5">
                    Estimated Price
                  </label>
                  <input
                    type="text"
                    value={newPrice}
                    onChange={(e) => setNewPrice(e.target.value)}
                    className="w-full bg-[#071710] border border-[#1A3D2F] rounded-lg px-3.5 py-2.5 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-[#C5A869]"
                  />
                </div>

                <div className="pt-2 flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setShowNewModal(false)}
                    className="px-4 py-2 rounded-lg text-xs font-medium text-zinc-400 hover:text-white transition"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={creating}
                    className="bg-gradient-to-r from-[#C5A869] to-[#DFCA95] text-[#0B2B20] px-5 py-2 rounded-lg text-xs font-medium hover:brightness-110 transition disabled:opacity-50"
                  >
                    {creating ? 'Creating...' : 'Initialize Project'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
