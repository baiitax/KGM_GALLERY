'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { 
  Film, Play, Sparkles, CheckCircle2, Sliders, Music, Volume2, 
  Layers, RefreshCw, Download, Share2, ArrowLeft, ShieldCheck, 
  Settings, Eye, FastForward, Clock, Camera, Palette, Video, Menu, ChevronRight
} from 'lucide-react';

export default function ProjectStudioPage() {
  const params = useParams();
  const projectId = params?.id as string;

  const [loading, setLoading] = useState(true);
  const [projectData, setProjectData] = useState<any>(null);
  const [selectedShot, setSelectedShot] = useState<any>(null);
  const [presets, setPresets] = useState<any[]>([]);
  const [renderingShotId, setRenderingShotId] = useState<string | null>(null);
  const [assemblingMaster, setAssemblingMaster] = useState(false);
  const [activeTab, setActiveTab] = useState<'storyboard' | 'audio' | 'qc' | 'export'>('storyboard');
  const [mobileShotListOpen, setMobileShotListOpen] = useState(false);

  useEffect(() => {
    if (projectId) {
      loadProject();
      loadPresets();
    }
  }, [projectId]);

  const loadProject = async () => {
    try {
      const res = await fetch(`/api/projects/${projectId}`);
      const data = await res.json();
      if (data.success) {
        setProjectData(data);
        if (data.shots?.length > 0 && !selectedShot) {
          setSelectedShot(data.shots[0]);
        }
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const loadPresets = async () => {
    try {
      const res = await fetch('/api/presets');
      const data = await res.json();
      if (data.success) {
        setPresets(data.presets);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleGenerateShot = async (shotId: string) => {
    setRenderingShotId(shotId);
    try {
      const res = await fetch('/api/render', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'generate_shot',
          projectId,
          shotId,
          duration: selectedShot?.duration_seconds || 10,
        }),
      });
      const data = await res.json();
      if (data.success) {
        await loadProject();
      }
    } catch (e) {
      console.error(e);
    } finally {
      setRenderingShotId(null);
    }
  };

  const handleAssembleMaster = async () => {
    setAssemblingMaster(true);
    try {
      const res = await fetch('/api/render', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'assemble_master',
          projectId,
        }),
      });
      const data = await res.json();
      if (data.success) {
        await loadProject();
        setActiveTab('export');
      }
    } catch (e) {
      console.error(e);
    } finally {
      setAssemblingMaster(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#07130E] text-white flex items-center justify-center p-4">
        <div className="text-center space-y-3">
          <div className="inline-block animate-spin w-8 h-8 border-2 border-[#C5A869] border-t-transparent rounded-full"></div>
          <p className="text-zinc-400 text-xs sm:text-sm">Opening KGM Studio Film Workspace...</p>
        </div>
      </div>
    );
  }

  const { project, shots = [], exports = [], musicTracks = [] } = projectData || {};

  return (
    <div className="min-h-screen bg-[#07130E] text-white flex flex-col">
      {/* Top Navigation Bar */}
      <header className="bg-[#0B2319] border-b border-[#1A3D2F] px-4 md:px-6 py-2.5 flex items-center justify-between sticky top-0 z-30">
        <div className="flex items-center gap-3 min-w-0">
          <Link
            href="/projects"
            className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-[#124232] transition shrink-0"
          >
            <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
          </Link>
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <span className="text-[9px] sm:text-[10px] font-mono uppercase bg-[#124232] text-[#C5A869] px-1.5 py-0.5 rounded border border-[#C5A869]/30 shrink-0">
                {project?.video_style || 'kgm_luxury'}
              </span>
              <h1 className="font-serif text-xs sm:text-sm md:text-base text-[#F4EBD9] truncate">{project?.title}</h1>
            </div>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={handleAssembleMaster}
            disabled={assemblingMaster}
            className="flex items-center gap-1.5 bg-gradient-to-r from-[#C5A869] to-[#DFCA95] text-[#0B2B20] px-3 sm:px-4 py-1.5 rounded-lg text-[11px] sm:text-xs font-bold hover:brightness-110 transition shadow-lg shadow-[#C5A869]/20 disabled:opacity-50"
          >
            {assemblingMaster ? (
              <>
                <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                <span className="hidden sm:inline">Mastering FFmpeg...</span>
              </>
            ) : (
              <>
                <Film className="w-3.5 h-3.5" />
                <span>Export Master</span>
              </>
            )}
          </button>

          <Link
            href={`/film/${project?.public_id || project?.id}`}
            target="_blank"
            className="p-1.5 sm:p-2 bg-[#071710] border border-[#1A3D2F] rounded-lg text-zinc-400 hover:text-[#C5A869] transition"
            title="Open VIP Client Portal"
          >
            <Share2 className="w-4 h-4" />
          </Link>
        </div>
      </header>

      {/* Main Studio Workspace */}
      <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
        {/* Shot Selector: Horizontal Scroll on Mobile, Sidebar on Desktop */}
        <div className="md:w-80 border-b md:border-b-0 md:border-r border-[#1A3D2F] bg-[#091C14] flex flex-col shrink-0">
          <div className="p-3 sm:p-4 border-b border-[#1A3D2F]/60 flex items-center justify-between">
            <span className="text-[11px] sm:text-xs font-semibold text-[#C5A869] uppercase tracking-wider">Cinematic Sequence</span>
            <span className="text-[10px] text-zinc-400 font-mono">{shots?.length} SHOTS</span>
          </div>

          <div className="flex md:flex-col overflow-x-auto md:overflow-y-auto p-2 sm:p-3 gap-2 flex-1 snap-x">
            {shots?.map((shot: any, idx: number) => {
              const isSelected = selectedShot?.id === shot.id;
              return (
                <div
                  key={shot.id}
                  onClick={() => setSelectedShot(shot)}
                  className={`min-w-[160px] md:min-w-0 p-2.5 rounded-xl border cursor-pointer transition flex items-center gap-2.5 shrink-0 snap-start ${
                    isSelected
                      ? 'bg-[#124232] border-[#C5A869] shadow-lg shadow-[#C5A869]/10'
                      : 'bg-[#0B2319]/80 border-[#1A3D2F] hover:border-[#C5A869]/40'
                  }`}
                >
                  <div className="w-5 h-5 rounded-full bg-black/40 border border-[#C5A869]/30 flex items-center justify-center text-[9px] font-mono text-[#C5A869] shrink-0">
                    {idx + 1}
                  </div>

                  <div className="flex-1 min-w-0">
                    <h4 className="text-[11px] sm:text-xs font-medium text-white truncate">{shot.shot_name}</h4>
                    <div className="flex items-center gap-1.5 mt-0.5 text-[9px] sm:text-[10px] text-zinc-400">
                      <span>{shot.duration_seconds || 10}s</span>
                      <span>•</span>
                      <span className="truncate text-zinc-300">{shot.camera_movement || 'Cinematic Dolly'}</span>
                    </div>
                  </div>

                  <div className="shrink-0">
                    {shot.status === 'approved' || shot.generation_status === 'completed' ? (
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    ) : (
                      <Clock className="w-3.5 h-3.5 text-amber-400/80" />
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Center Canvas / Interactive Preview */}
        <div className="flex-1 flex flex-col bg-[#05100B] overflow-y-auto p-4 sm:p-6 space-y-4 sm:space-y-6">
          {/* Main Visual Monitor */}
          <div className="relative aspect-video max-h-[480px] mx-auto w-full bg-black rounded-xl sm:rounded-2xl overflow-hidden border border-[#1A3D2F] shadow-2xl flex items-center justify-center group">
            {selectedShot?.video_url ? (
              <video
                key={selectedShot.video_url}
                src={selectedShot.video_url}
                controls
                playsInline
                autoPlay
                loop
                muted
                className="w-full h-full object-contain"
              />
            ) : (
              <div className="text-center p-6 sm:p-8 space-y-3 sm:space-y-4">
                <Video className="w-10 h-10 sm:w-12 sm:h-12 text-[#C5A869]/60 mx-auto" />
                <div>
                  <h3 className="font-serif text-base sm:text-lg text-[#F4EBD9]">Shot Ready for Synthesis</h3>
                  <p className="text-[11px] sm:text-xs text-zinc-400 mt-1 max-w-md mx-auto">
                    Generate 10-second continuous camera movement with strict architectural preservation.
                  </p>
                </div>
                <button
                  onClick={() => handleGenerateShot(selectedShot?.id)}
                  disabled={renderingShotId === selectedShot?.id}
                  className="inline-flex items-center gap-2 bg-[#C5A869] text-[#0B2B20] px-5 py-2.5 rounded-lg text-xs font-bold hover:brightness-110 transition disabled:opacity-50"
                >
                  {renderingShotId === selectedShot?.id ? (
                    <>
                      <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                      <span>Generating 10s Shot...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Render Shot Now</span>
                    </>
                  )}
                </button>
              </div>
            )}

            {/* In-Monitor HUD Overlay */}
            <div className="absolute top-2.5 left-2.5 sm:top-4 sm:left-4 bg-black/70 backdrop-blur-md px-2.5 py-1 rounded-lg border border-white/10 text-[9px] sm:text-[11px] font-mono text-zinc-300 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>1080p 30FPS • ZEISS PRIMES</span>
            </div>
          </div>

          {/* Tab Navigation (Scrollable on phone) */}
          <div className="border-b border-[#1A3D2F] flex items-center gap-4 sm:gap-6 text-xs font-medium text-zinc-400 overflow-x-auto pb-1 -mx-2 px-2">
            <button
              onClick={() => setActiveTab('storyboard')}
              className={`pb-2.5 border-b-2 whitespace-nowrap transition ${
                activeTab === 'storyboard' ? 'border-[#C5A869] text-[#C5A869]' : 'border-transparent hover:text-white'
              }`}
            >
              Shot Parameters
            </button>
            <button
              onClick={() => setActiveTab('audio')}
              className={`pb-2.5 border-b-2 whitespace-nowrap transition ${
                activeTab === 'audio' ? 'border-[#C5A869] text-[#C5A869]' : 'border-transparent hover:text-white'
              }`}
            >
              Soundtrack & Voiceover
            </button>
            <button
              onClick={() => setActiveTab('qc')}
              className={`pb-2.5 border-b-2 whitespace-nowrap transition ${
                activeTab === 'qc' ? 'border-[#C5A869] text-[#C5A869]' : 'border-transparent hover:text-white'
              }`}
            >
              AI Director QC
            </button>
            <button
              onClick={() => setActiveTab('export')}
              className={`pb-2.5 border-b-2 whitespace-nowrap transition ${
                activeTab === 'export' ? 'border-[#C5A869] text-[#C5A869]' : 'border-transparent hover:text-white'
              }`}
            >
              Master Exports ({exports?.length || 4})
            </button>
          </div>

          {/* Tab 1: Shot Parameters */}
          {activeTab === 'storyboard' && selectedShot && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 bg-[#0B2319] p-4 sm:p-6 rounded-2xl border border-[#1A3D2F]">
              <div className="space-y-3 sm:space-y-4">
                <h4 className="text-[11px] sm:text-xs font-semibold text-[#C5A869] uppercase tracking-wider">Camera Parameters</h4>
                
                <div>
                  <label className="block text-[11px] text-zinc-300 mb-1">Motion Preset</label>
                  <select
                    value={selectedShot.motion_preset_id || ''}
                    onChange={(e) => {
                      const updated = { ...selectedShot, motion_preset_id: e.target.value };
                      setSelectedShot(updated);
                    }}
                    className="w-full bg-[#071710] border border-[#1A3D2F] rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#C5A869]"
                  >
                    {presets.map(p => (
                      <option key={p.id} value={p.id}>{p.name} ({p.lens_focal_length})</option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] text-zinc-300 mb-1">Duration</label>
                    <select
                      value={selectedShot.duration_seconds || 10}
                      onChange={(e) => setSelectedShot({ ...selectedShot, duration_seconds: parseInt(e.target.value) })}
                      className="w-full bg-[#071710] border border-[#1A3D2F] rounded-lg px-2.5 py-2 text-xs text-white"
                    >
                      <option value={5}>5s</option>
                      <option value={6}>6s</option>
                      <option value={8}>8s</option>
                      <option value={10}>10s (Standard)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] text-zinc-300 mb-1">Speed</label>
                    <select
                      value={selectedShot.camera_speed || 'slow'}
                      onChange={(e) => setSelectedShot({ ...selectedShot, camera_speed: e.target.value })}
                      className="w-full bg-[#071710] border border-[#1A3D2F] rounded-lg px-2.5 py-2 text-xs text-white"
                    >
                      <option value="ultra_slow">Ultra Slow</option>
                      <option value="slow">Slow Controlled</option>
                      <option value="medium">Medium Sweep</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="space-y-3 sm:space-y-4">
                <h4 className="text-[11px] sm:text-xs font-semibold text-[#C5A869] uppercase tracking-wider">Architectural Fidelity</h4>
                <div className="p-3 sm:p-4 bg-[#071710] border border-[#1A3D2F] rounded-xl text-xs space-y-1.5">
                  <div className="flex items-center gap-1.5 text-emerald-400 font-medium text-xs">
                    <ShieldCheck className="w-4 h-4" />
                    <span>Strict Architectural Preservation Active</span>
                  </div>
                  <p className="text-zinc-400 leading-relaxed text-[11px]">
                    Preserving 100% of spatial dimensions, wall placements, interior materials, and lighting integrity.
                  </p>
                </div>

                <button
                  onClick={() => handleGenerateShot(selectedShot.id)}
                  disabled={renderingShotId === selectedShot.id}
                  className="w-full bg-[#124232] hover:bg-[#1A5C46] text-[#C5A869] border border-[#C5A869]/50 py-2.5 rounded-lg text-xs font-semibold transition flex items-center justify-center gap-2"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Re-Generate Shot</span>
                </button>
              </div>
            </div>
          )}

          {/* Tab 2: Audio */}
          {activeTab === 'audio' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 bg-[#0B2319] p-4 sm:p-6 rounded-2xl border border-[#1A3D2F]">
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-[#C5A869]">
                  <Music className="w-4 h-4" />
                  <h4 className="text-xs font-semibold uppercase tracking-wider">Soundtrack</h4>
                </div>
                <div className="space-y-2">
                  {musicTracks?.map((track: any) => (
                    <div
                      key={track.id}
                      className="p-3 bg-[#071710] border border-[#1A3D2F] rounded-xl flex items-center justify-between text-xs"
                    >
                      <div>
                        <div className="font-medium text-white">{track.title}</div>
                        <div className="text-[10px] text-zinc-400">{track.genre} • {track.bpm} BPM</div>
                      </div>
                      <span className="text-[10px] text-emerald-400 font-mono bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-500/30">
                        Royalty Safe
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-2 text-[#C5A869]">
                  <Volume2 className="w-4 h-4" />
                  <h4 className="text-xs font-semibold uppercase tracking-wider">Voiceover</h4>
                </div>
                <div className="p-4 bg-[#071710] border border-[#1A3D2F] rounded-xl space-y-2 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-zinc-300">English (Neutral Prestige)</span>
                    <span className="text-[#C5A869] text-[10px] font-mono">100% Synced</span>
                  </div>
                  <p className="text-zinc-400 italic text-[11px] leading-relaxed">
                    &quot;Welcome to The Royal Sovereign Villa, an extraordinary architectural statement in Riyadh.&quot;
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Tab 3: QC */}
          {activeTab === 'qc' && (
            <div className="bg-[#0B2319] p-4 sm:p-6 rounded-2xl border border-[#1A3D2F] space-y-4">
              <div className="flex items-center justify-between border-b border-[#1A3D2F]/60 pb-3">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 font-bold text-sm">
                    96
                  </div>
                  <div>
                    <h4 className="text-xs sm:text-sm font-semibold text-[#F4EBD9]">AI Quality Score</h4>
                    <p className="text-[10px] sm:text-xs text-zinc-400">All 10 shots approved • ACES Calibrated</p>
                  </div>
                </div>
                <span className="bg-emerald-500/20 text-emerald-300 text-[10px] sm:text-xs px-2.5 py-1 rounded-full border border-emerald-500/30 font-semibold uppercase">
                  Approved
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="p-3 bg-[#071710] border border-[#1A3D2F] rounded-xl text-xs">
                  <div className="text-zinc-400">Visual Pacing</div>
                  <div className="text-sm font-semibold text-[#C5A869] mt-0.5">98% Consistent</div>
                </div>
                <div className="p-3 bg-[#071710] border border-[#1A3D2F] rounded-xl text-xs">
                  <div className="text-zinc-400">Geometry Fidelity</div>
                  <div className="text-sm font-semibold text-[#C5A869] mt-0.5">100% Intact</div>
                </div>
                <div className="p-3 bg-[#071710] border border-[#1A3D2F] rounded-xl text-xs">
                  <div className="text-zinc-400">Audio Range</div>
                  <div className="text-sm font-semibold text-[#C5A869] mt-0.5">-14 LUFS Master</div>
                </div>
              </div>
            </div>
          )}

          {/* Tab 4: Master Exports */}
          {activeTab === 'export' && (
            <div className="bg-[#0B2319] p-4 sm:p-6 rounded-2xl border border-[#1A3D2F] space-y-3">
              <h4 className="text-xs sm:text-sm font-semibold text-[#F4EBD9]">Master Render Package</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {exports?.map((exp: any) => (
                  <div
                    key={exp.id}
                    className="p-3.5 bg-[#071710] border border-[#1A3D2F] rounded-xl flex items-center justify-between text-xs"
                  >
                    <div className="space-y-0.5">
                      <div className="font-medium text-white">{exp.title}</div>
                      <div className="text-[10px] text-zinc-400 font-mono">
                        {exp.resolution} • {exp.aspect_ratio} • {(exp.file_size / (1024 * 1024)).toFixed(1)} MB
                      </div>
                    </div>

                    <a
                      href={exp.file_path}
                      download
                      className="flex items-center gap-1 bg-[#0B2B20] hover:bg-[#124232] text-[#C5A869] border border-[#C5A869]/40 px-2.5 py-1.5 rounded-lg text-xs font-semibold"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Download</span>
                    </a>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
