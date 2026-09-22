'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Building2, 
  MapPin, 
  Bed, 
  Bath, 
  Maximize2, 
  Phone, 
  MessageSquare, 
  Calendar, 
  Share2, 
  Check, 
  Sparkles, 
  ChevronRight, 
  X,
  Play,
  Film
} from 'lucide-react';

export default function PublicFilmPage({ params }: { params: { publicId: string } }) {
  const publicId = params.publicId;
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);
  const [scheduleSent, setScheduleSent] = useState(false);
  const [copied, setCopied] = useState(false);

  // VIP Booking Form State
  const [vipName, setVipName] = useState('');
  const [vipPhone, setVipPhone] = useState('');
  const [vipDate, setVipDate] = useState('');

  useEffect(() => {
    fetch(`/api/film/${publicId}`)
      .then(res => res.json())
      .then(d => {
        if (d.project) setData(d);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [publicId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-kgm-darkest flex items-center justify-center text-white">
        <div className="text-center space-y-3">
          <div className="w-10 h-10 border-2 border-kgm-gold border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="font-serif text-sm tracking-widest text-kgm-gold">KURRA GREENFIELD MERCHANTS</p>
        </div>
      </div>
    );
  }

  if (!data?.project) {
    return (
      <div className="min-h-screen bg-kgm-darkest flex items-center justify-center text-white p-6 text-center">
        <div className="glass-panel p-8 rounded-2xl max-w-md border border-kgm-border/40 space-y-4">
          <h2 className="font-serif text-xl font-bold text-white">Property Film Not Available</h2>
          <p className="text-xs text-gray-400">The requested property film could not be found or is currently in private production.</p>
          <Link href="/" className="inline-block px-5 py-2 rounded-lg bg-kgm-gold text-kgm-darkest text-xs font-bold uppercase">
            Return to Studio
          </Link>
        </div>
      </div>
    );
  }

  const { project, property, brandProfile, exports, images } = data;
  const masterExport = exports?.find((e: any) => e.export_type === 'master_4k') || exports?.[0];
  const videoSrc = masterExport?.file_path || (images?.[0]?.storage_path);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  const handleScheduleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setScheduleSent(true);
  };

  const waNumber = (property?.agent_whatsapp || brandProfile?.whatsapp || '+966501234567').replace(/[^0-9]/g, '');
  const waText = encodeURIComponent(`Hello KGM, I am inquiring about a private viewing for ${property?.property_name || 'The Luxury Villa'} (Ref: ${property?.property_ref || 'KGM-REF'}).`);
  const waLink = `https://wa.me/${waNumber}?text=${waText}`;

  return (
    <div className="min-h-screen bg-kgm-darkest text-white">
      
      {/* Luxury Top Brand Header */}
      <header className="border-b border-kgm-border/50 bg-kgm-darkest/95 backdrop-blur-xl sticky top-0 z-40 px-4 sm:px-8 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-lg bg-kgm-emerald border border-kgm-gold flex items-center justify-center font-serif text-kgm-gold font-bold text-sm shadow-gold-glow">
              KGM
            </div>
            <div>
              <span className="font-serif text-base font-bold text-kgm-goldLight tracking-widest block">
                KURRA GREENFIELD MERCHANTS
              </span>
              <span className="text-[10px] text-kgm-goldMuted font-mono tracking-wider">
                PRIVATE CLIENT REAL ESTATE ADVISORY
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyLink}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg glass-panel border border-kgm-border text-xs text-gray-200 hover:border-kgm-gold/50 transition-all"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Share2 className="w-3.5 h-3.5" />}
              <span>{copied ? 'Link Copied' : 'Share'}</span>
            </button>

            <a
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-emerald-600/80 hover:bg-emerald-600 text-white text-xs font-semibold shadow-md transition-colors"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>WhatsApp Advisor</span>
            </a>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
        
        {/* Cinema Video Player Showcase */}
        <div className="rounded-3xl glass-panel border border-kgm-gold/50 overflow-hidden shadow-2xl bg-black">
          <div className="aspect-video w-full relative bg-black flex items-center justify-center">
            {masterExport ? (
              <video
                src={masterExport.file_path}
                controls
                autoPlay
                className="w-full h-full object-contain"
                poster={images?.[0]?.storage_path}
              />
            ) : (
              <img
                src={images?.[0]?.storage_path || '/uploads/villa_01_hero_exterior.jpg'}
                alt={property?.property_name}
                className="w-full h-full object-cover"
              />
            )}
          </div>

          {/* Player Info Bar */}
          <div className="p-6 bg-kgm-darkest/95 border-t border-kgm-border/40 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded text-[10px] font-bold tracking-wider uppercase bg-kgm-emerald text-kgm-gold border border-kgm-gold/30">
                  {property?.marketing_objective || 'FOR SALE'}
                </span>
                <span className="text-xs text-gray-400 font-mono">REF: {property?.property_ref}</span>
              </div>
              <h1 className="font-serif text-2xl sm:text-3xl font-bold text-white tracking-wide">
                {property?.property_name || 'Exclusive Luxury Residence'}
              </h1>
              <p className="text-xs text-gray-300 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-kgm-gold" />
                <span>{property?.location}</span>
              </p>
            </div>

            <div className="flex flex-col md:items-end gap-2">
              <span className="font-serif text-2xl sm:text-3xl font-bold text-kgm-goldLight">
                {property?.price || (property?.rental_price ? `${property.rental_price}/yr` : 'Price on Application')}
              </span>
              <button
                onClick={() => setIsScheduleModalOpen(true)}
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-kgm-goldDark via-kgm-gold to-kgm-goldLight text-kgm-darkest text-xs font-bold uppercase tracking-wider shadow-gold-glow hover:brightness-110 active:scale-95 transition-all"
              >
                Schedule VIP Private Viewing
              </button>
            </div>
          </div>
        </div>

        {/* Specifications Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="p-4 rounded-2xl glass-panel border border-kgm-border/40 flex items-center gap-3.5">
            <div className="p-3 rounded-xl bg-kgm-emerald text-kgm-gold border border-kgm-gold/30">
              <Bed className="w-5 h-5" />
            </div>
            <div>
              <p className="text-[10px] text-gray-400 uppercase font-medium">Bedrooms</p>
              <p className="text-base font-bold text-white">{property?.bedrooms || 6} Luxury Suites</p>
            </div>
          </div>

          <div className="p-4 rounded-2xl glass-panel border border-kgm-border/40 flex items-center gap-3.5">
            <div className="p-3 rounded-xl bg-kgm-emerald text-kgm-gold border border-kgm-gold/30">
              <Bath className="w-5 h-5" />
            </div>
            <div>
              <p className="text-[10px] text-gray-400 uppercase font-medium">Bathrooms</p>
              <p className="text-base font-bold text-white">{property?.bathrooms || 7} Spa Baths</p>
            </div>
          </div>

          <div className="p-4 rounded-2xl glass-panel border border-kgm-border/40 flex items-center gap-3.5">
            <div className="p-3 rounded-xl bg-kgm-emerald text-kgm-gold border border-kgm-gold/30">
              <Maximize2 className="w-5 h-5" />
            </div>
            <div>
              <p className="text-[10px] text-gray-400 uppercase font-medium">Total Area</p>
              <p className="text-base font-bold text-white">{property?.property_size || '16,500 sq ft'}</p>
            </div>
          </div>

          <div className="p-4 rounded-2xl glass-panel border border-kgm-border/40 flex items-center gap-3.5">
            <div className="p-3 rounded-xl bg-kgm-emerald text-kgm-gold border border-kgm-gold/30">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <p className="text-[10px] text-gray-400 uppercase font-medium">Property Type</p>
              <p className="text-base font-bold text-white">{property?.property_type || 'Villa'}</p>
            </div>
          </div>
        </div>

        {/* Narrative & Agent Representation */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Narrative (8 cols) */}
          <div className="lg:col-span-8 space-y-6">
            <div className="p-6 rounded-2xl glass-panel border border-kgm-border/40 space-y-4">
              <h2 className="font-serif text-lg font-bold text-white tracking-wide">
                Architectural Overview & Highlights
              </h2>
              <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
                {property?.description}
              </p>
            </div>

            {/* Gallery Grid */}
            <div className="space-y-3">
              <h3 className="font-serif text-base font-bold text-white">Cinematic Source Photography</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {images?.map((img: any) => (
                  <div key={img.id} className="aspect-video rounded-xl overflow-hidden glass-panel border border-kgm-border/30 group relative">
                    <img src={img.storage_path} alt={img.original_filename} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-2 text-center text-[10px] font-medium text-white">
                      {img.category?.replace('_', ' ').toUpperCase()}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Exclusive Agent Card (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="p-6 rounded-2xl glass-panel border border-kgm-gold/40 space-y-5 sticky top-28">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-kgm-gold bg-kgm-emerald">
                  <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150" alt="Agent" className="w-full h-full object-cover" />
                </div>
                <div>
                  <h4 className="font-serif font-bold text-sm text-white">{property?.agent_name || 'Nora Al-Othman'}</h4>
                  <p className="text-[11px] text-kgm-gold font-medium">KGM Private Client Advisor</p>
                </div>
              </div>

              <div className="space-y-2 text-xs">
                <a
                  href={`tel:${property?.agent_contact || '+966114508899'}`}
                  className="w-full flex items-center gap-2 p-3 rounded-xl bg-kgm-card border border-kgm-border/40 text-gray-200 hover:border-kgm-gold/50 transition-colors"
                >
                  <Phone className="w-4 h-4 text-kgm-gold" />
                  <span>{property?.agent_contact || '+966 11 450 8899'}</span>
                </a>

                <a
                  href={waLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center gap-2 p-3 rounded-xl bg-emerald-600/80 hover:bg-emerald-600 text-white font-semibold transition-colors"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>WhatsApp VIP Direct</span>
                </a>

                <button
                  onClick={() => setIsScheduleModalOpen(true)}
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-kgm-goldDark via-kgm-gold to-kgm-goldLight text-kgm-darkest font-bold tracking-wider uppercase shadow-gold-glow hover:brightness-110 active:scale-95 transition-all"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Request Private Viewing</span>
                </button>
              </div>

              <div className="border-t border-kgm-border/40 pt-4 text-center">
                <p className="text-[10px] text-gray-400">
                  Kurra Greenfield Merchants Limited (KGM Limited)
                </p>
              </div>
            </div>
          </div>

        </div>

      </main>

      {/* Schedule VIP Viewing Modal */}
      {isScheduleModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4">
          <div className="relative w-full max-w-md rounded-2xl glass-panel border border-kgm-gold shadow-2xl p-6 bg-kgm-darkest/95 space-y-4">
            <div className="flex justify-between items-center border-b border-kgm-border/40 pb-3">
              <h3 className="font-serif text-base font-bold text-white">Schedule Private VIP Viewing</h3>
              <button onClick={() => { setIsScheduleModalOpen(false); setScheduleSent(false); }} className="text-gray-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            {scheduleSent ? (
              <div className="py-6 text-center space-y-3">
                <Check className="w-10 h-10 text-emerald-400 mx-auto p-2 rounded-full bg-emerald-500/20 border border-emerald-500" />
                <h4 className="font-serif text-base font-bold text-white">Viewing Request Received</h4>
                <p className="text-xs text-gray-300">
                  Your dedicated KGM Private Client Advisor will contact you within 2 business hours to confirm your private viewing itinerary.
                </p>
              </div>
            ) : (
              <form onSubmit={handleScheduleSubmit} className="space-y-3 text-xs">
                <div>
                  <label className="text-[11px] text-gray-300">Full Name *</label>
                  <input
                    type="text"
                    required
                    value={vipName}
                    onChange={e => setVipName(e.target.value)}
                    className="w-full rounded-lg border border-kgm-border bg-kgm-card p-2 text-white mt-1"
                    placeholder="Your Name / Representative"
                  />
                </div>
                <div>
                  <label className="text-[11px] text-gray-300">Phone / WhatsApp Number *</label>
                  <input
                    type="text"
                    required
                    value={vipPhone}
                    onChange={e => setVipPhone(e.target.value)}
                    className="w-full rounded-lg border border-kgm-border bg-kgm-card p-2 text-white mt-1"
                    placeholder="+966 50 000 0000"
                  />
                </div>
                <div>
                  <label className="text-[11px] text-gray-300">Preferred Date & Time</label>
                  <input
                    type="datetime-local"
                    value={vipDate}
                    onChange={e => setVipDate(e.target.value)}
                    className="w-full rounded-lg border border-kgm-border bg-kgm-card p-2 text-white mt-1"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-2.5 rounded-xl bg-gradient-to-r from-kgm-goldDark to-kgm-gold text-kgm-darkest font-bold tracking-wider uppercase mt-2 hover:brightness-110"
                >
                  Submit Private Viewing Request
                </button>
              </form>
            )}
          </div>
        </div>
      )}

    </div>
  );
}
