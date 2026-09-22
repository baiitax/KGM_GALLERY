'use client';

import React, { useState, useEffect, useRef } from 'react';
import { 
  Music, 
  Play, 
  Pause, 
  ShieldCheck, 
  Volume2, 
  Mic, 
  Radio, 
  Sparkles,
  Upload,
  Check
} from 'lucide-react';
import { MusicTrack } from '@/lib/types';

export default function MediaPage() {
  const [tracks, setTracks] = useState<MusicTrack[]>([]);
  const [loading, setLoading] = useState(true);
  const [playingId, setPlayingId] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Seed or fetch tracks
    const sampleTracks: MusicTrack[] = [
      { id: 'mus_lux_01', category: 'luxury', title: 'Aura of Prestige', artist: 'KGM Sound Studio', duration_seconds: 120, file_path: '/audio/luxury_prestige.mp3', is_royalty_verified: true, license_type: 'Commercial Master', is_custom: false, created_at: '' },
      { id: 'mus_mod_01', category: 'modern', title: 'Contemporary Haven', artist: 'KGM Sound Studio', duration_seconds: 110, file_path: '/audio/modern_haven.mp3', is_royalty_verified: true, license_type: 'Commercial Master', is_custom: false, created_at: '' },
      { id: 'mus_ele_01', category: 'elegant', title: 'Chamber of Gold', artist: 'KGM Sound Studio', duration_seconds: 125, file_path: '/audio/chamber_gold.mp3', is_royalty_verified: true, license_type: 'Commercial Master', is_custom: false, created_at: '' },
      { id: 'mus_cin_01', category: 'cinematic', title: 'Sovereign Horizons', artist: 'KGM Sound Studio', duration_seconds: 135, file_path: '/audio/sovereign_horizons.mp3', is_royalty_verified: true, license_type: 'Commercial Master', is_custom: false, created_at: '' },
      { id: 'mus_corp_01', category: 'corporate', title: 'Institutional Trust', artist: 'KGM Sound Studio', duration_seconds: 105, file_path: '/audio/institutional_trust.mp3', is_royalty_verified: true, license_type: 'Commercial Master', is_custom: false, created_at: '' },
      { id: 'mus_calm_01', category: 'calm', title: 'Serenade of Silence', artist: 'KGM Sound Studio', duration_seconds: 115, file_path: '/audio/serenade_silence.mp3', is_royalty_verified: true, license_type: 'Commercial Master', is_custom: false, created_at: '' },
      { id: 'mus_prem_01', category: 'premium', title: 'The Royal Estate', artist: 'KGM Sound Studio', duration_seconds: 130, file_path: '/audio/royal_estate.mp3', is_royalty_verified: true, license_type: 'Commercial Master', is_custom: false, created_at: '' },
      { id: 'mus_afr_01', category: 'african_contemporary', title: 'Emerald Oasis', artist: 'KGM Sound Studio', duration_seconds: 120, file_path: '/audio/emerald_oasis.mp3', is_royalty_verified: true, license_type: 'Commercial Master', is_custom: false, created_at: '' },
      { id: 'mus_pia_01', category: 'minimal_piano', title: 'Reflections on Marble', artist: 'KGM Sound Studio', duration_seconds: 110, file_path: '/audio/reflections_marble.mp3', is_royalty_verified: true, license_type: 'Commercial Master', is_custom: false, created_at: '' },
      { id: 'mus_amb_01', category: 'ambient', title: 'Architectural Resonance', artist: 'KGM Sound Studio', duration_seconds: 140, file_path: '/audio/architectural_resonance.mp3', is_royalty_verified: true, license_type: 'Commercial Master', is_custom: false, created_at: '' },
    ];
    setTracks(sampleTracks);
    setLoading(false);
  }, []);

  const handleTogglePlay = (track: MusicTrack) => {
    if (playingId === track.id) {
      audioRef.current?.pause();
      setPlayingId(null);
    } else {
      if (audioRef.current) {
        audioRef.current.src = track.file_path;
        audioRef.current.play();
        setPlayingId(track.id);
      }
    }
  };

  return (
    <div className="min-h-screen pb-20">
      <audio ref={audioRef} onEnded={() => setPlayingId(null)} />

      <div className="border-b border-kgm-border/40 bg-kgm-darkest/90 py-8 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-white tracking-wide">
            Royalty-Safe Music & Voiceover Library
          </h1>
          <p className="text-xs text-gray-400 mt-1">
            Curated cinematic soundscapes with verified commercial synchronization licenses and multi-lingual voiceover engine
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-8 space-y-8">
        
        {/* Category Grid */}
        <div className="p-6 rounded-2xl glass-panel border border-kgm-border/50 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-serif text-base font-bold text-white">Commercial Soundtrack Catalog</h2>
              <p className="text-xs text-gray-400">All tracks verified for worldwide digital property marketing broadcasts</p>
            </div>
            <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-xs font-semibold">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>100% Commercial Sync License</span>
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {tracks.map(t => {
              const isPlaying = playingId === t.id;
              return (
                <div
                  key={t.id}
                  className={`p-4 rounded-xl border flex items-center justify-between transition-all ${
                    isPlaying ? 'bg-kgm-emerald/80 border-kgm-gold shadow-gold-glow' : 'bg-kgm-card border-kgm-border/40 hover:border-kgm-gold/40'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => handleTogglePlay(t)}
                      className="p-3 rounded-full bg-kgm-emerald text-kgm-gold border border-kgm-gold/40 hover:scale-105 transition-transform"
                    >
                      {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                    </button>
                    <div>
                      <h4 className="font-serif font-bold text-sm text-white">{t.title}</h4>
                      <div className="flex items-center gap-2 text-[10px] text-gray-400 mt-0.5">
                        <span className="text-kgm-gold uppercase capitalize">{t.category.replace('_', ' ')}</span>
                        <span>•</span>
                        <span>{t.artist}</span>
                        <span>•</span>
                        <span>{t.duration_seconds}s</span>
                      </div>
                    </div>
                  </div>

                  <span className="text-[10px] text-emerald-400 font-mono">VERIFIED</span>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
}
