'use client';

import React, { useState, useEffect } from 'react';
import { 
  Music, Volume2, Play, Pause, Download, Sparkles, 
  CheckCircle2, Disc, Sliders, Mic, Globe
} from 'lucide-react';

export default function MediaPage() {
  const [tracks, setTracks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [playingTrack, setPlayingTrack] = useState<string | null>(null);
  const [audioElement, setAudioElement] = useState<HTMLAudioElement | null>(null);
  const [selectedLanguage, setSelectedLanguage] = useState<'en' | 'ar' | 'fr'>('en');

  useEffect(() => {
    fetch('/api/music')
      .then(r => r.json())
      .then(data => {
        if (data.success) setTracks(data.tracks);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const handleTogglePlay = (track: any) => {
    if (playingTrack === track.id) {
      if (audioElement) {
        audioElement.pause();
        setPlayingTrack(null);
      }
    } else {
      if (audioElement) {
        audioElement.pause();
      }
      const audio = new Audio(track.file_path);
      audio.play();
      audio.onended = () => setPlayingTrack(null);
      setAudioElement(audio);
      setPlayingTrack(track.id);
    }
  };

  return (
    <div className="min-h-screen bg-[#07130E] text-white p-6 md:p-10">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="border-b border-[#1A3D2F]/60 pb-6">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[#C5A869] text-xs font-semibold tracking-wider uppercase">Soundstage & Voiceover</span>
            <span className="text-[#1A3D2F]">•</span>
            <span className="text-zinc-400 text-xs">Acoustic Atmosphere & Narration</span>
          </div>
          <h1 className="text-3xl font-serif text-[#F4EBD9]">Master Audio Library</h1>
          <p className="text-zinc-400 text-sm mt-1">
            Royalty-cleared cinematic scores, ambient textures, and multi-lingual AI voiceover narration engines for KGM films.
          </p>
        </div>

        {/* Content Split */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left: Music Tracks */}
          <div className="bg-[#0B2319] p-6 rounded-3xl border border-[#1A3D2F] space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-[#C5A869]">
                <Music className="w-5 h-5" />
                <h3 className="font-serif text-lg text-[#F4EBD9]">Curated Soundtracks</h3>
              </div>
              <span className="text-xs text-emerald-400 font-mono bg-emerald-950/60 px-2.5 py-1 rounded-full border border-emerald-500/30">
                100% Commercial Cleared
              </span>
            </div>

            <div className="space-y-3">
              {tracks.map((track) => {
                const isCurrent = playingTrack === track.id;
                return (
                  <div
                    key={track.id}
                    className={`p-4 rounded-2xl border transition flex items-center justify-between ${
                      isCurrent
                        ? 'bg-[#124232] border-[#C5A869] shadow-lg shadow-[#C5A869]/10'
                        : 'bg-[#071710] border-[#1A3D2F] hover:border-[#C5A869]/40'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => handleTogglePlay(track)}
                        className={`w-10 h-10 rounded-full flex items-center justify-center transition ${
                          isCurrent
                            ? 'bg-[#C5A869] text-[#0B2B20]'
                            : 'bg-[#0B2319] text-[#C5A869] border border-[#1A3D2F] hover:border-[#C5A869]'
                        }`}
                      >
                        {isCurrent ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
                      </button>

                      <div>
                        <h4 className="text-sm font-semibold text-white">{track.title}</h4>
                        <p className="text-xs text-zinc-400">{track.artist} • {track.genre} • {track.bpm} BPM</p>
                      </div>
                    </div>

                    <div className="text-right">
                      <span className="text-xs text-[#C5A869] font-mono">{track.duration_seconds}s</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right: Voiceover Preview */}
          <div className="bg-[#0B2319] p-6 rounded-3xl border border-[#1A3D2F] space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-[#C5A869]">
                <Mic className="w-5 h-5" />
                <h3 className="font-serif text-lg text-[#F4EBD9]">AI Voiceover Synthesis</h3>
              </div>
              <div className="flex items-center gap-1 bg-[#071710] p-1 rounded-lg border border-[#1A3D2F]">
                {(['en', 'ar', 'fr'] as const).map((lang) => (
                  <button
                    key={lang}
                    onClick={() => setSelectedLanguage(lang)}
                    className={`px-3 py-1 rounded text-xs uppercase font-mono transition ${
                      selectedLanguage === lang
                        ? 'bg-[#C5A869] text-[#0B2B20] font-bold'
                        : 'text-zinc-400 hover:text-white'
                    }`}
                  >
                    {lang}
                  </button>
                ))}
              </div>
            </div>

            <div className="p-5 bg-[#071710] rounded-2xl border border-[#1A3D2F] space-y-4">
              <div className="flex items-center justify-between text-xs">
                <span className="text-zinc-400">Speaker Profile:</span>
                <span className="text-[#C5A869] font-semibold">
                  {selectedLanguage === 'en' ? 'British / Neutral Luxury Male' : selectedLanguage === 'ar' ? 'Classical Arabic Eloquent' : 'Parisian French Prestige'}
                </span>
              </div>

              <div className="p-4 bg-[#05100B] rounded-xl border border-[#1A3D2F]/80 text-xs text-zinc-300 leading-relaxed font-serif italic">
                {selectedLanguage === 'en' && (
                  `"Welcome to this extraordinary architectural statement in Riyadh. Crafted with uncompromising precision, expansive entertaining spaces, and bespoke artisanal finishes throughout. Presented exclusively by Kurra Greenfield Merchants Limited."`
                )}
                {selectedLanguage === 'ar' && (
                  `"مرحباً بكم في هذه التحفة المعمارية الفريدة في الرياض. صُمم هذا العقار الاستثنائي بعناية فائقة وتجهيزات راقية ليعكس أرقى معايير الحياة الفاخرة. تم التطوير والتسويق بواسطة كورا جرينفيلد ميرشانتس ليمتد."`
                )}
                {selectedLanguage === 'fr' && (
                  `"Bienvenue dans ce chef-d'œuvre d'exception à Riyad. Une propriété prestigieuse alliant finitions sur mesure et design contemporain. Présenté par Kurra Greenfield Merchants Limited."`
                )}
              </div>

              <div className="flex items-center justify-between pt-2">
                <span className="text-[11px] text-zinc-400 flex items-center gap-1">
                  <Globe className="w-3.5 h-3.5 text-[#C5A869]" />
                  <span>Subtitles Auto-Generated</span>
                </span>

                <button className="flex items-center gap-1.5 bg-[#124232] text-[#C5A869] border border-[#C5A869]/40 px-3 py-1.5 rounded-lg text-xs font-semibold hover:brightness-110 transition">
                  <Volume2 className="w-3.5 h-3.5" />
                  <span>Audition Voice</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
