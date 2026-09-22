'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { 
  Play, Download, Share2, Calendar, Phone, Mail, MapPin, 
  BedDouble, Bath, Maximize2, ShieldCheck, Sparkles, CheckCircle2, 
  Volume2, VolumeX, Eye
} from 'lucide-react';

export default function PublicFilmPage() {
  const params = useParams();
  const publicId = params?.publicId as string;

  const [projectData, setProjectData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [selectedFormat, setSelectedFormat] = useState('master');
  const [inquiryName, setInquiryName] = useState('');
  const [inquiryEmail, setInquiryEmail] = useState('');
  const [inquiryPhone, setInquiryPhone] = useState('');
  const [inquiryMessage, setInquiryMessage] = useState('I would like to schedule a confidential private viewing of this architectural estate.');
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (publicId) {
      fetchProject();
    }
  }, [publicId]);

  const fetchProject = async () => {
    try {
      const res = await fetch(`/api/projects/${publicId}`);
      const data = await res.json();
      if (data.success) {
        setProjectData(data);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleInquiry = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          property_id: projectData?.project?.property_id,
          name: inquiryName,
          email: inquiryEmail,
          phone: inquiryPhone,
          message: inquiryMessage,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setSubmitted(true);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#07130E] text-white flex items-center justify-center">
        <div className="text-center space-y-3">
          <div className="inline-block animate-spin w-8 h-8 border-2 border-[#C5A869] border-t-transparent rounded-full"></div>
          <p className="text-zinc-400 text-sm">Presenting KGM Architectural Master Film...</p>
        </div>
      </div>
    );
  }

  const { project, shots, exports, brand } = projectData || {};
  const masterExport = exports?.find((e: any) => e.export_type === 'master_4k') || exports?.[0];
  const portraitExport = exports?.find((e: any) => e.export_type === 'social_portrait');
  const squareExport = exports?.find((e: any) => e.export_type === 'social_square');
  const waExport = exports?.find((e: any) => e.export_type === 'whatsapp_compressed');

  let currentVideoUrl = masterExport?.file_path || '/exports/film_proj_kgm_riyadh_01_master_16x9.mp4';
  if (selectedFormat === 'portrait' && portraitExport) currentVideoUrl = portraitExport.file_path;
  if (selectedFormat === 'square' && squareExport) currentVideoUrl = squareExport.file_path;
  if (selectedFormat === 'whatsapp' && waExport) currentVideoUrl = waExport.file_path;

  return (
    <div className="min-h-screen bg-[#05100B] text-white font-sans selection:bg-[#C5A869] selection:text-[#0B2B20]">
      {/* Luxury Brand Topbar */}
      <header className="border-b border-[#1A3D2F]/60 bg-[#071710]/90 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-[#C5A869] to-[#997F46] p-0.5 flex items-center justify-center shadow-lg shadow-[#C5A869]/20">
              <div className="w-full h-full bg-[#0B2B20] rounded-[7px] flex items-center justify-center">
                <span className="font-serif font-bold text-[#C5A869] text-base">K</span>
              </div>
            </div>
            <div>
              <h2 className="font-serif text-sm tracking-wider font-bold text-[#F4EBD9]">KGM LIMITED</h2>
              <p className="text-[9px] uppercase tracking-widest text-[#C5A869]">Private Real Estate Cinema</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <a
              href="#inquire"
              className="bg-[#C5A869] text-[#0B2B20] px-4 py-2 rounded-lg text-xs font-semibold hover:brightness-110 transition shadow-lg shadow-[#C5A869]/20"
            >
              Private Viewing
            </a>
          </div>
        </div>
      </header>

      {/* Hero Master Film Stage */}
      <section className="relative px-4 py-8 md:py-12 max-w-6xl mx-auto space-y-6">
        <div className="text-center space-y-2 max-w-3xl mx-auto">
          <span className="inline-block px-3 py-1 rounded-full text-[10px] font-mono tracking-widest uppercase bg-[#124232] text-[#C5A869] border border-[#C5A869]/30">
            Exclusive Architectural Presentation
          </span>
          <h1 className="text-3xl md:text-5xl font-serif text-[#F4EBD9] leading-tight">
            {project?.property_name || project?.title}
          </h1>
          <p className="text-zinc-400 text-sm flex items-center justify-center gap-2">
            <MapPin className="w-3.5 h-3.5 text-[#C5A869]" />
            <span>{project?.location || 'Riyadh, Saudi Arabia'}</span>
            {project?.price && (
              <>
                <span className="text-zinc-600">•</span>
                <span className="text-[#C5A869] font-semibold">{project.price.toLocaleString()} {project.currency || 'SAR'}</span>
              </>
            )}
          </p>
        </div>

        {/* Cinematic Video Player */}
        <div className="relative aspect-video max-h-[640px] w-full bg-black rounded-3xl overflow-hidden border border-[#C5A869]/30 shadow-2xl shadow-[#C5A869]/10">
          <video
            key={currentVideoUrl}
            src={currentVideoUrl}
            controls
            autoPlay
            loop
            className="w-full h-full object-contain"
          />

          <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full border border-[#C5A869]/30 text-[10px] font-mono text-[#C5A869] flex items-center gap-1.5">
            <Sparkles className="w-3 h-3 text-[#C5A869]" />
            <span>KGM MASTER CINEMATIC 4K / 1080P</span>
          </div>
        </div>

        {/* Format Selector & Downloads */}
        <div className="flex flex-wrap items-center justify-between gap-4 bg-[#0B2319] p-4 rounded-2xl border border-[#1A3D2F]">
          <div className="flex items-center gap-2">
            <span className="text-xs text-zinc-400 font-medium">Aspect Format:</span>
            {[
              { id: 'master', label: '16:9 Master (1080p Cine)' },
              { id: 'portrait', label: '9:16 Reels / TikTok' },
              { id: 'square', label: '1:1 Square' },
              { id: 'whatsapp', label: 'WhatsApp Fast' },
            ].map((f) => (
              <button
                key={f.id}
                onClick={() => setSelectedFormat(f.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition ${
                  selectedFormat === f.id
                    ? 'bg-[#C5A869] text-[#0B2B20] font-semibold'
                    : 'bg-[#071710] text-zinc-300 hover:text-white border border-[#1A3D2F]'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>

          <a
            href={currentVideoUrl}
            download
            className="flex items-center gap-2 bg-[#124232] hover:bg-[#1A5C46] text-[#C5A869] border border-[#C5A869]/40 px-4 py-2 rounded-lg text-xs font-semibold transition"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download Selected Format</span>
          </a>
        </div>
      </section>

      {/* Property Details & Private VIP Inquiry */}
      <section id="inquire" className="max-w-6xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Left 2 Cols: Architectural Specs */}
        <div className="md:col-span-2 space-y-6">
          <div className="bg-[#0B2319] p-6 md:p-8 rounded-3xl border border-[#1A3D2F] space-y-6">
            <h3 className="font-serif text-2xl text-[#F4EBD9]">Architectural Narrative</h3>
            <p className="text-zinc-300 text-sm leading-relaxed">
              {project?.description ||
                'This extraordinary architectural statement combines timeless travertine stone, soaring double-height pivot doors, book-matched Italian marble, and an infinity water terrace. Meticulously curated for the discerning collector seeking rare architectural craftsmanship in prime Riyadh.'}
            </p>

            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-[#1A3D2F]/60 text-center">
              <div className="p-4 bg-[#071710] rounded-2xl border border-[#1A3D2F]/80">
                <BedDouble className="w-5 h-5 text-[#C5A869] mx-auto mb-1" />
                <div className="text-base font-semibold text-white">{project?.bedrooms || 6}</div>
                <div className="text-[10px] uppercase tracking-wider text-zinc-400">Suites</div>
              </div>

              <div className="p-4 bg-[#071710] rounded-2xl border border-[#1A3D2F]/80">
                <Bath className="w-5 h-5 text-[#C5A869] mx-auto mb-1" />
                <div className="text-base font-semibold text-white">{project?.bathrooms || 7}</div>
                <div className="text-[10px] uppercase tracking-wider text-zinc-400">Bathrooms</div>
              </div>

              <div className="p-4 bg-[#071710] rounded-2xl border border-[#1A3D2F]/80">
                <Maximize2 className="w-5 h-5 text-[#C5A869] mx-auto mb-1" />
                <div className="text-base font-semibold text-white">{project?.property_size || '16,500 sq ft'}</div>
                <div className="text-[10px] uppercase tracking-wider text-zinc-400">Total Area</div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Col: Private Client Inquiry Form */}
        <div className="space-y-6">
          <div className="bg-[#0B2319] p-6 rounded-3xl border border-[#C5A869]/40 shadow-xl space-y-5">
            <div className="border-b border-[#1A3D2F] pb-4">
              <span className="text-[10px] uppercase tracking-widest text-[#C5A869] font-mono">Private Client Office</span>
              <h3 className="font-serif text-xl text-[#F4EBD9] mt-1">Schedule Consultation</h3>
            </div>

            {submitted ? (
              <div className="py-8 text-center space-y-3">
                <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto" />
                <h4 className="font-serif text-lg text-[#F4EBD9]">Inquiry Confirmed</h4>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  Thank you. A senior KGM private client advisor has received your request and will contact you confidentially within 2 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleInquiry} className="space-y-4">
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-zinc-300 font-semibold mb-1">
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g., Lord / Dr. / Sheikh..."
                    value={inquiryName}
                    onChange={(e) => setInquiryName(e.target.value)}
                    className="w-full bg-[#071710] border border-[#1A3D2F] rounded-lg px-3.5 py-2 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#C5A869]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-zinc-300 font-semibold mb-1">
                    Confidential Email
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="vip@example.com"
                    value={inquiryEmail}
                    onChange={(e) => setInquiryEmail(e.target.value)}
                    className="w-full bg-[#071710] border border-[#1A3D2F] rounded-lg px-3.5 py-2 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#C5A869]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-zinc-300 font-semibold mb-1">
                    Direct Phone / WhatsApp
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+966 50 000 0000"
                    value={inquiryPhone}
                    onChange={(e) => setInquiryPhone(e.target.value)}
                    className="w-full bg-[#071710] border border-[#1A3D2F] rounded-lg px-3.5 py-2 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#C5A869]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-zinc-300 font-semibold mb-1">
                    Inquiry Notes
                  </label>
                  <textarea
                    rows={3}
                    value={inquiryMessage}
                    onChange={(e) => setInquiryMessage(e.target.value)}
                    className="w-full bg-[#071710] border border-[#1A3D2F] rounded-lg px-3.5 py-2 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#C5A869]"
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full bg-gradient-to-r from-[#C5A869] to-[#DFCA95] text-[#0B2B20] py-2.5 rounded-lg text-xs font-bold hover:brightness-110 transition shadow-lg shadow-[#C5A869]/20 disabled:opacity-50"
                >
                  {submitting ? 'Transmitting Securely...' : 'Request Private Viewing'}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[#1A3D2F]/60 bg-[#071710] py-8 text-center text-xs text-zinc-400">
        <p className="text-zinc-500">
          Kurra Greenfield Merchants Limited (KGM Limited) • All Architectural Rights Reserved © 2026
        </p>
      </footer>
    </div>
  );
}
