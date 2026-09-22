'use client';

import React, { useState, useRef } from 'react';
import Link from 'next/link';
import { 
  Lock, CheckCircle2, Film, Upload, Sparkles, Type, 
  Video, Eye, Share2, Download, ArrowRight, ArrowLeft, 
  ShieldCheck, RefreshCw, Smartphone, Monitor, Square, 
  MapPin, Clock, DollarSign, Building2, User, Globe, 
  Volume2, Play, Check, ChevronRight, Copy, MessageCircle,
  Plus, Trash2, Cpu, Server, Sliders, Zap, Radio, Image as ImageIcon
} from 'lucide-react';

const STEPS = [
  { id: 1, name: 'Login', short: 'Auth', icon: Lock, desc: 'VIP Access & Role' },
  { id: 2, name: 'Create Project', short: 'Project', icon: Building2, desc: 'Property Specs' },
  { id: 3, name: 'Upload Images', short: 'Images', icon: Upload, desc: 'Photo Curation' },
  { id: 4, name: 'AI Prompts', short: 'Prompts', icon: Sparkles, desc: 'Architectural Logic' },
  { id: 5, name: 'Captions', short: 'Captions', icon: Type, desc: 'Subtitles & Overlays' },
  { id: 6, name: 'Motions', short: 'Kinetics', icon: Video, desc: 'Camera Trajectory' },
  { id: 7, name: 'Review Video', short: 'Review', icon: Eye, desc: 'Realistic Player & Offload' },
  { id: 8, name: 'Publish Live', short: 'Publish', icon: Share2, desc: 'Master Delivery' },
];

export default function CinematicPipelineStudio() {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [completedSteps, setCompletedSteps] = useState<number[]>([1]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Step 1: Login State
  const [user, setUser] = useState<{ name: string; role: string; email: string }>({
    name: 'Alexander Kurra',
    role: 'Executive Creative Director',
    email: 'director@kgm-estates.com',
  });

  // Step 2: Project State (Allows adding new projects)
  const [propertyTitle, setPropertyTitle] = useState('The Royal Sovereign Villa — Al-Malqa');
  const [propertyType, setPropertyType] = useState('luxury_villa');
  const [marketingObjective, setMarketingObjective] = useState('sale');
  const [location, setLocation] = useState('Al-Malqa District, Northern Riyadh, Kingdom of Saudi Arabia');
  const [price, setPrice] = useState('$14,800,000');
  const [bedrooms, setBedrooms] = useState(7);
  const [bathrooms, setBathrooms] = useState(9);
  const [size, setSize] = useState('18,500 sq ft (1,720 m²)');
  const [aspectRatio, setAspectRatio] = useState('16:9');

  // Step 3: Uploaded Images (Allows adding and deleting new photos)
  const [uploadedPhotos, setUploadedPhotos] = useState<any[]>([
    { id: 'p1', filename: 'villa_01_hero_exterior.jpg', path: '/uploads/villa_01_hero_exterior.jpg', room: 'Exterior Facade', category: 'exterior' },
    { id: 'p2', filename: 'villa_02_entrance_foyer.jpg', path: '/uploads/villa_02_entrance_foyer.jpg', room: 'Grand Entrance Foyer', category: 'entrance' },
    { id: 'p3', filename: 'villa_03_living_salon.jpg', path: '/uploads/villa_03_living_salon.jpg', room: 'Double-Height Living Salon', category: 'living_room' },
    { id: 'p4', filename: 'villa_04_formal_dining.jpg', path: '/uploads/villa_04_formal_dining.jpg', room: 'Formal Banqueting Salon', category: 'dining' },
    { id: 'p5', filename: 'villa_05_chef_kitchen.jpg', path: '/uploads/villa_05_chef_kitchen.jpg', room: 'Culinary Master Kitchen', category: 'kitchen' },
    { id: 'p6', filename: 'villa_06_master_suite.jpg', path: '/uploads/villa_06_master_suite.jpg', room: 'Primary Sovereign Suite', category: 'master_bedroom' },
    { id: 'p7', filename: 'villa_07_spa_bathroom.jpg', path: '/uploads/villa_07_spa_bathroom.jpg', room: 'Wellness Spa Primary Bath', category: 'bathroom' },
    { id: 'p8', filename: 'villa_08_infinity_pool.jpg', path: '/uploads/villa_08_infinity_pool.jpg', room: 'Infinity Pool & Fire Pit', category: 'pool' },
    { id: 'p9', filename: 'villa_09_private_garden.jpg', path: '/uploads/villa_09_private_garden.jpg', room: 'Private Palm Oasis & Lounge', category: 'garden' },
    { id: 'p10', filename: 'villa_10_twilight_hero.jpg', path: '/uploads/villa_10_twilight_hero.jpg', room: 'Twilight Architectural Horizon', category: 'exterior' },
  ]);

  // Step 4: AI Prompts State
  const [activePromptTab, setActivePromptTab] = useState(0);
  const [aiPrompts, setAiPrompts] = useState<string[]>([
    "Ultra-high-end 8K architectural cinematography of The Royal Sovereign Villa. Slow forward axial dolly movement on ARRI Alexa Mini LF with Zeiss Supreme 24mm prime lens. Strict architectural preservation: 100% fidelity to travertine stone, lighting, and facade proportions.",
    "Grand double-height pivot entrance foyer. Smooth vertical crane ascent revealing sculptural brass chandelier and book-matched Italian marble flooring.",
    "Expansive living salon with floor-to-ceiling glass. Slow lateral tracking camera glide highlighting bespoke furniture and natural daylight reflections.",
    "Formal banquet dining room. Slow diagonal push along 12-seat smoked oak dining table focusing on crystal fixture and temp-controlled wine gallery.",
    "Monolithic Calacatta marble kitchen. Shallow depth of field axial dolly highlighting Gaggenau appliances and brass cabinet hardware.",
    "Primary sovereign suite. Slow morning push towards private cantilevered terrace overlooking manicured palms.",
    "Freestanding stone soaking tub in spa bathroom. Ultra-slow lateral drift past frameless rainfall shower and timber vanity.",
    "Infinity edge pool terrace. Smooth low-angle forward glide over illuminated waterline towards sunken fire lounge.",
    "Manicured palm oasis and alfresco lounge. Parallax sweep across flora and integrated landscape lighting.",
    "Twilight architectural estate horizon. Majestic slow pull-out embracing glowing pool and dark sky.",
  ]);

  // Step 5: Captions State
  const [captionLanguage, setCaptionLanguage] = useState<'en' | 'ar' | 'fr'>('en');
  const [captionStyle, setCaptionStyle] = useState<'gold_serif' | 'minimal_lower_third' | 'glass_pill'>('gold_serif');
  const [captionsList, setCaptionsList] = useState<string[]>([
    "The Royal Sovereign Villa — Riyadh",
    "Grand Double-Height Foyer & Chandelier",
    "Expansive Entertaining Salon",
    "Formal Banqueting Gallery",
    "Monolithic Calacatta Marble Kitchen",
    "Primary Sovereign Suite with Private Terrace",
    "Wellness Spa & Stone Soaking Tub",
    "Infinity Waterline & Sunken Fire Lounge",
    "Private Oasis Gardens",
    "Kurra Greenfield Merchants Limited",
  ]);

  // Step 6: Motions State
  const [selectedMotions, setSelectedMotions] = useState<string[]>([
    "Dolly In (Forward Axial)",
    "Vertical Jib / Crane Up",
    "Lateral Tracking (Left to Right)",
    "Slow Diagonal Push",
    "Axial Dolly & Shallow Parallax",
    "Slow Forward Push to Terrace",
    "Lateral Drift with Reflection",
    "Forward Glide across Waterline",
    "Parallax Pan across Flora",
    "Majestic Slow Pull Out & Hold",
  ]);

  // Step 7: Realistic Video Review & Offload Controls
  const [colorGrade, setColorGrade] = useState<'aces' | 'rec709' | 'golden' | 'moody'>('aces');
  const [lensOverlay, setLensOverlay] = useState(true);
  const [timecodeHud, setTimecodeHud] = useState(true);
  const [offloadProvider, setOffloadProvider] = useState<'native_gpu' | 'runway_gen3' | 'kling_pro' | 'luma_dream' | 'google_veo'>('runway_gen3');
  const [isOffloading, setIsOffloading] = useState(false);
  const [offloadProgress, setOffloadProgress] = useState(0);
  const [offloadStatusMessage, setOffloadStatusMessage] = useState<string | null>(null);

  // Step 8: Publish State
  const [publishedUrl, setPublishedUrl] = useState('https://kgmgallery.vercel.app/film/kgm-film-royal-villa-riyadh');
  const [copiedLink, setCopiedLink] = useState(false);
  const [savingToDatabase, setSavingToDatabase] = useState(false);
  const [savedDbSuccess, setSavedDbSuccess] = useState(false);

  // Photo Upload Handler (Allows data add)
  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const newItems: any[] = [];
    Array.from(files).forEach((file, index) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        const dataUrl = event.target?.result as string;
        const newPhoto = {
          id: `p_custom_${Date.now()}_${index}`,
          filename: file.name,
          path: dataUrl,
          room: file.name.replace(/\.[^/.]+$/, '').replace(/[_-]/g, ' '),
          category: 'living_room',
        };
        setUploadedPhotos((prev) => [...prev, newPhoto]);
        setAiPrompts((prev) => [
          ...prev,
          `Ultra-high-end 8K architectural cinematography of ${newPhoto.room}. Smooth hydraulic gimbal drift with 100% strict architectural preservation.`,
        ]);
        setCaptionsList((prev) => [...prev, newPhoto.room]);
        setSelectedMotions((prev) => [...prev, 'Lateral Tracking (Left to Right)']);
      };
      reader.readAsDataURL(file);
    });
  };

  const handleDeletePhoto = (id: string, index: number) => {
    if (uploadedPhotos.length <= 1) return;
    setUploadedPhotos((prev) => prev.filter((p) => p.id !== id));
    setAiPrompts((prev) => prev.filter((_, i) => i !== index));
    setCaptionsList((prev) => prev.filter((_, i) => i !== index));
    setSelectedMotions((prev) => prev.filter((_, i) => i !== index));
  };

  // Cloud Offload Simulation & Execution
  const handleTriggerOffload = () => {
    setIsOffloading(true);
    setOffloadProgress(15);
    setOffloadStatusMessage(`Connecting to ${offloadProvider.toUpperCase()} Cloud GPU Cluster...`);

    setTimeout(() => {
      setOffloadProgress(45);
      setOffloadStatusMessage(`Dispatched 10 frames to remote GPU cluster • Allocating Tensor Core V100...`);
    }, 1200);

    setTimeout(() => {
      setOffloadProgress(80);
      setOffloadStatusMessage(`Rendering ACES color grade & neural temporal consistency...`);
    }, 2400);

    setTimeout(() => {
      setOffloadProgress(100);
      setOffloadStatusMessage(`✓ Offloaded generation complete! 1080p Cinema Master assembled.`);
      setIsOffloading(false);
    }, 3800);
  };

  // Save Project to Database API
  const handleSaveToDatabase = async () => {
    setSavingToDatabase(true);
    try {
      const res = await fetch('/api/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: propertyTitle,
          property_name: propertyTitle,
          location,
          price: parseInt(price.replace(/[^0-9]/g, '')) || 14800000,
          bedrooms,
          bathrooms,
          property_size: size,
          default_aspect_ratio: aspectRatio,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setSavedDbSuccess(true);
        if (data.project?.public_id) {
          setPublishedUrl(`https://kgmgallery.vercel.app/film/${data.project.public_id}`);
        }
      }
    } catch (e) {
      console.error(e);
    } finally {
      setSavingToDatabase(false);
    }
  };

  const goToStep = (stepNumber: number) => {
    setCurrentStep(stepNumber);
    if (!completedSteps.includes(stepNumber)) {
      setCompletedSteps([...completedSteps, stepNumber]);
    }
  };

  const handleNext = () => {
    if (currentStep < 8) {
      const next = currentStep + 1;
      setCurrentStep(next);
      if (!completedSteps.includes(next)) {
        setCompletedSteps([...completedSteps, next]);
      }
      if (next === 8) {
        handleSaveToDatabase();
      }
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(publishedUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 3000);
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-3 sm:px-6 py-4 sm:py-8 space-y-6">
      {/* Step Navigator Header */}
      <div className="bg-[#0B2319] border border-[#1A3D2F] rounded-2xl sm:rounded-3xl p-3 sm:p-5 shadow-xl">
        <div className="flex items-center justify-between border-b border-[#1A3D2F]/60 pb-3 mb-3 sm:mb-4">
          <div>
            <span className="text-[10px] font-mono uppercase tracking-widest text-[#C5A869]">
              Interactive Production Workflow
            </span>
            <h2 className="font-serif text-sm sm:text-lg text-[#F4EBD9]">
              Step {currentStep} of 8: {STEPS[currentStep - 1].name}
            </h2>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-zinc-400 font-mono">
            <span className="text-[#C5A869] font-bold">{Math.round((currentStep / 8) * 100)}%</span>
            <span>Complete</span>
          </div>
        </div>

        {/* 8-Step Breadcrumb Bar */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-2 -mx-1 px-1 snap-x">
          {STEPS.map((step) => {
            const Icon = step.icon;
            const isCurrent = currentStep === step.id;
            const isDone = completedSteps.includes(step.id);
            return (
              <button
                key={step.id}
                onClick={() => goToStep(step.id)}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs whitespace-nowrap transition snap-start shrink-0 ${
                  isCurrent
                    ? 'bg-[#C5A869] text-[#0B2B20] font-bold shadow-lg shadow-[#C5A869]/20'
                    : isDone
                    ? 'bg-[#124232] text-[#F4EBD9] border border-[#C5A869]/30 hover:border-[#C5A869]'
                    : 'bg-[#071710] text-zinc-500 border border-[#1A3D2F]'
                }`}
              >
                <div className="w-4 h-4 rounded-full flex items-center justify-center text-[10px] shrink-0">
                  {isDone && !isCurrent ? (
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                  ) : (
                    <Icon className="w-3.5 h-3.5" />
                  )}
                </div>
                <span>{step.id}. {step.short}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Step Workspace Canvas */}
      <div className="bg-[#0B2319] border border-[#1A3D2F] rounded-2xl sm:rounded-3xl p-4 sm:p-8 shadow-2xl min-h-[480px] flex flex-col justify-between">
        {/* STEP 1: LOGIN */}
        {currentStep === 1 && (
          <div className="space-y-6 max-w-xl mx-auto py-4">
            <div className="text-center space-y-2">
              <div className="w-12 h-12 rounded-2xl bg-[#124232] border border-[#C5A869]/40 flex items-center justify-center text-[#C5A869] mx-auto shadow-lg shadow-[#C5A869]/20">
                <Lock className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-xl sm:text-2xl text-[#F4EBD9]">1. VIP Authentication & Access</h3>
              <p className="text-xs text-zinc-400">
                Sign in with your KGM Director credentials or select a verified private client profile.
              </p>
            </div>

            <div className="space-y-3 bg-[#071710] p-4 sm:p-6 rounded-2xl border border-[#1A3D2F]">
              <div>
                <label className="block text-[11px] font-semibold text-zinc-300 uppercase tracking-wider mb-1.5">
                  Advisor / Director Profile
                </label>
                <select
                  value={user.email}
                  onChange={(e) => {
                    if (e.target.value === 'director@kgm-estates.com') {
                      setUser({ name: 'Alexander Kurra', role: 'Executive Creative Director', email: e.target.value });
                    } else if (e.target.value === 'faris.alsaud@kgm-estates.com') {
                      setUser({ name: 'Faris Al-Saud', role: 'Senior Managing Partner', email: e.target.value });
                    } else {
                      setUser({ name: 'Elena Vance', role: 'Senior Film Producer', email: e.target.value });
                    }
                  }}
                  className="w-full bg-[#0B2319] border border-[#1A3D2F] rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-[#C5A869]"
                >
                  <option value="director@kgm-estates.com">Alexander Kurra — Executive Creative Director</option>
                  <option value="faris.alsaud@kgm-estates.com">Faris Al-Saud — Senior Managing Partner</option>
                  <option value="producer@kgm-estates.com">Elena Vance — Senior Film Producer</option>
                </select>
              </div>

              <div className="p-3 bg-[#05100B] rounded-xl border border-[#1A3D2F]/80 flex items-center justify-between text-xs">
                <div>
                  <div className="font-semibold text-[#F4EBD9]">{user.name}</div>
                  <div className="text-[10px] text-zinc-400">{user.role} • Kurra Greenfield Merchants Limited</div>
                </div>
                <span className="bg-emerald-500/20 text-emerald-300 text-[10px] font-mono px-2 py-0.5 rounded border border-emerald-500/30">
                  AUTHENTICATED
                </span>
              </div>
            </div>
          </div>
        )}

        {/* STEP 2: CREATE PROJECT (Allows editing & adding real project data) */}
        {currentStep === 2 && (
          <div className="space-y-6 max-w-2xl mx-auto py-2">
            <div className="text-center space-y-1.5">
              <h3 className="font-serif text-xl sm:text-2xl text-[#F4EBD9]">2. Create Master Film Project</h3>
              <p className="text-xs text-zinc-400">Define property marketing objectives and architectural specifications.</p>
            </div>

            <div className="space-y-4 bg-[#071710] p-4 sm:p-6 rounded-2xl border border-[#1A3D2F]">
              <div>
                <label className="block text-[11px] font-semibold text-zinc-300 uppercase tracking-wider mb-1">
                  Property Title / Residence Name
                </label>
                <input
                  type="text"
                  value={propertyTitle}
                  onChange={(e) => setPropertyTitle(e.target.value)}
                  className="w-full bg-[#0B2319] border border-[#1A3D2F] rounded-xl px-3.5 py-2 text-xs sm:text-sm text-white focus:outline-none focus:border-[#C5A869]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-semibold text-zinc-300 uppercase tracking-wider mb-1">
                    Location
                  </label>
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full bg-[#0B2319] border border-[#1A3D2F] rounded-xl px-3 py-2 text-xs text-white"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-zinc-300 uppercase tracking-wider mb-1">
                    Price Point
                  </label>
                  <input
                    type="text"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    className="w-full bg-[#0B2319] border border-[#1A3D2F] rounded-xl px-3 py-2 text-xs text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-[11px] text-zinc-300 mb-1">Suites</label>
                  <input
                    type="number"
                    value={bedrooms}
                    onChange={(e) => setBedrooms(parseInt(e.target.value))}
                    className="w-full bg-[#0B2319] border border-[#1A3D2F] rounded-xl px-3 py-1.5 text-xs text-white"
                  />
                </div>
                <div>
                  <label className="block text-[11px] text-zinc-300 mb-1">Baths</label>
                  <input
                    type="number"
                    value={bathrooms}
                    onChange={(e) => setBathrooms(parseInt(e.target.value))}
                    className="w-full bg-[#0B2319] border border-[#1A3D2F] rounded-xl px-3 py-1.5 text-xs text-white"
                  />
                </div>
                <div>
                  <label className="block text-[11px] text-zinc-300 mb-1">Total Area</label>
                  <input
                    type="text"
                    value={size}
                    onChange={(e) => setSize(e.target.value)}
                    className="w-full bg-[#0B2319] border border-[#1A3D2F] rounded-xl px-3 py-1.5 text-xs text-white"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* STEP 3: UPLOAD IMAGES (Allows adding custom photo files) */}
        {currentStep === 3 && (
          <div className="space-y-4 py-2">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#1A3D2F]/60 pb-3">
              <div>
                <h3 className="font-serif text-lg sm:text-xl text-[#F4EBD9]">3. Curate & Upload Property Photos</h3>
                <p className="text-xs text-zinc-400">Upload your own property photos or manage the curated shot sequence.</p>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  ref={fileInputRef}
                  onChange={handlePhotoUpload}
                  className="hidden"
                />
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="flex items-center gap-1.5 bg-[#C5A869] text-[#0B2B20] px-3.5 py-1.5 rounded-lg text-xs font-bold hover:brightness-110 transition shadow"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Upload Photos</span>
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 max-h-[380px] overflow-y-auto pr-1">
              {uploadedPhotos.map((photo, idx) => (
                <div key={photo.id} className="group relative bg-[#071710] border border-[#1A3D2F] rounded-xl p-2 space-y-1.5">
                  <div className="relative aspect-video rounded-lg overflow-hidden bg-black">
                    <img src={photo.path} alt={photo.room} className="w-full h-full object-cover" />
                    <div className="absolute top-1 left-1 w-4 h-4 rounded-full bg-black/80 flex items-center justify-center text-[9px] font-mono text-[#C5A869]">
                      {idx + 1}
                    </div>
                    <button
                      onClick={() => handleDeletePhoto(photo.id, idx)}
                      className="absolute top-1 right-1 p-1 rounded bg-red-950/80 text-red-300 opacity-0 group-hover:opacity-100 transition hover:bg-red-800"
                      title="Remove shot"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  </div>
                  <div>
                    <input
                      type="text"
                      value={photo.room}
                      onChange={(e) => {
                        const copy = [...uploadedPhotos];
                        copy[idx].room = e.target.value;
                        setUploadedPhotos(copy);
                      }}
                      className="text-[11px] font-semibold text-white truncate bg-transparent w-full focus:outline-none"
                    />
                    <div className="text-[9px] text-[#C5A869] uppercase font-mono">{photo.category}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* STEP 4: AUTOMATED AI PROMPT */}
        {currentStep === 4 && (
          <div className="space-y-4 py-2 max-w-3xl mx-auto">
            <div className="text-center space-y-1">
              <h3 className="font-serif text-lg sm:text-xl text-[#F4EBD9]">4. Automated AI Cinematic Prompts</h3>
              <p className="text-xs text-zinc-400">
                Auto-generated cinematic instructions with strict structural preservation clauses for all shots.
              </p>
            </div>

            <div className="bg-[#071710] p-4 sm:p-6 rounded-2xl border border-[#1A3D2F] space-y-4">
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 -mx-2 px-2">
                {uploadedPhotos.map((p, idx) => (
                  <button
                    key={p.id}
                    onClick={() => setActivePromptTab(idx)}
                    className={`px-3 py-1 rounded-lg text-xs font-mono transition shrink-0 ${
                      activePromptTab === idx
                        ? 'bg-[#C5A869] text-[#0B2B20] font-bold'
                        : 'bg-[#0B2319] text-zinc-400 hover:text-white border border-[#1A3D2F]'
                    }`}
                  >
                    Shot {idx + 1}
                  </button>
                ))}
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-[#C5A869]">
                    Shot {activePromptTab + 1}: {uploadedPhotos[activePromptTab]?.room}
                  </span>
                  <span className="text-[10px] text-emerald-400 flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5" /> Strict Preservation Active
                  </span>
                </div>

                <textarea
                  rows={4}
                  value={aiPrompts[activePromptTab] || ''}
                  onChange={(e) => {
                    const copy = [...aiPrompts];
                    copy[activePromptTab] = e.target.value;
                    setAiPrompts(copy);
                  }}
                  className="w-full bg-[#05100B] border border-[#1A3D2F] rounded-xl p-3 text-xs text-zinc-300 focus:outline-none focus:border-[#C5A869] font-sans leading-relaxed"
                />
              </div>

              <div className="p-3 bg-[#05100B] rounded-xl border border-[#1A3D2F]/80 text-[11px] text-zinc-400 leading-relaxed">
                <span className="text-emerald-400 font-semibold">Negative Prompt Guarantee: </span>
                <span>Zero structural morphing, no sliding walls, zero AI geometric hallucinations, authentic architectural proportions.</span>
              </div>
            </div>
          </div>
        )}

        {/* STEP 5: ADD CAPTIONS OPTIONS */}
        {currentStep === 5 && (
          <div className="space-y-4 py-2 max-w-3xl mx-auto">
            <div className="text-center space-y-1">
              <h3 className="font-serif text-lg sm:text-xl text-[#F4EBD9]">5. Add Captions & Subtitle Overlays</h3>
              <p className="text-xs text-zinc-400">Configure language, typography style, and custom architectural subtitles.</p>
            </div>

            <div className="bg-[#071710] p-4 sm:p-6 rounded-2xl border border-[#1A3D2F] space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-semibold text-zinc-300 uppercase tracking-wider mb-1.5">
                    Subtitle Language
                  </label>
                  <div className="flex items-center gap-2">
                    {[
                      { id: 'en', label: 'English' },
                      { id: 'ar', label: 'Arabic' },
                      { id: 'fr', label: 'French' },
                    ].map((lang) => (
                      <button
                        key={lang.id}
                        onClick={() => setCaptionLanguage(lang.id as any)}
                        className={`flex-1 py-2 rounded-xl text-xs font-semibold transition ${
                          captionLanguage === lang.id
                            ? 'bg-[#C5A869] text-[#0B2B20]'
                            : 'bg-[#0B2319] text-zinc-400 border border-[#1A3D2F]'
                        }`}
                      >
                        {lang.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-zinc-300 uppercase tracking-wider mb-1.5">
                    Typography Overlay Style
                  </label>
                  <select
                    value={captionStyle}
                    onChange={(e) => setCaptionStyle(e.target.value as any)}
                    className="w-full bg-[#0B2319] border border-[#1A3D2F] rounded-xl px-3 py-2 text-xs text-white"
                  >
                    <option value="gold_serif">KGM Gold Serif (Cinzel / Luxury)</option>
                    <option value="minimal_lower_third">Minimal Lower-Third Accent</option>
                    <option value="glass_pill">Frosted Glass Floating Pill</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2 pt-2 border-t border-[#1A3D2F]/60">
                <label className="block text-[11px] font-semibold text-zinc-300 uppercase tracking-wider">
                  Shot Captions Preview ({uploadedPhotos.length} Shots)
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs max-h-48 overflow-y-auto pr-1">
                  {uploadedPhotos.map((photo, idx) => (
                    <div key={photo.id} className="flex items-center gap-2 bg-[#05100B] p-2 rounded-lg border border-[#1A3D2F]">
                      <span className="font-mono text-[10px] text-[#C5A869]">#{idx + 1}</span>
                      <input
                        type="text"
                        value={captionsList[idx] || photo.room}
                        onChange={(e) => {
                          const copy = [...captionsList];
                          copy[idx] = e.target.value;
                          setCaptionsList(copy);
                        }}
                        className="bg-transparent text-white text-xs w-full focus:outline-none"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* STEP 6: SELECT THE MOTIONS */}
        {currentStep === 6 && (
          <div className="space-y-4 py-2">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#1A3D2F]/60 pb-3">
              <div>
                <h3 className="font-serif text-lg sm:text-xl text-[#F4EBD9]">6. Select Camera Kinetics & Motions</h3>
                <p className="text-xs text-zinc-400">Assign deliberate camera trajectories and standard 10-second durations.</p>
              </div>
              <span className="text-xs text-[#C5A869] font-mono bg-[#124232] px-3 py-1 rounded-full border border-[#C5A869]/30">
                {uploadedPhotos.length * 10}s Timeline Total
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[360px] overflow-y-auto pr-1">
              {uploadedPhotos.map((photo, idx) => (
                <div key={photo.id} className="bg-[#071710] p-3 rounded-2xl border border-[#1A3D2F] flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className="w-6 h-6 rounded-full bg-black/60 border border-[#C5A869]/30 flex items-center justify-center text-[10px] font-mono text-[#C5A869] shrink-0">
                      {idx + 1}
                    </div>
                    <div className="min-w-0">
                      <div className="text-xs font-semibold text-white truncate">{photo.room}</div>
                      <div className="text-[10px] text-[#C5A869] truncate">{selectedMotions[idx] || 'Dolly In'}</div>
                    </div>
                  </div>

                  <select
                    value={selectedMotions[idx] || 'Dolly In (Forward Axial)'}
                    onChange={(e) => {
                      const copy = [...selectedMotions];
                      copy[idx] = e.target.value;
                      setSelectedMotions(copy);
                    }}
                    className="bg-[#0B2319] border border-[#1A3D2F] rounded-lg px-2 py-1 text-[11px] text-zinc-300 max-w-[140px]"
                  >
                    <option value="Dolly In (Forward Axial)">Dolly In (Forward Axial)</option>
                    <option value="Vertical Jib / Crane Up">Vertical Jib / Crane Up</option>
                    <option value="Lateral Tracking (Left to Right)">Lateral Tracking</option>
                    <option value="Slow Diagonal Push">Slow Diagonal Push</option>
                    <option value="Axial Dolly & Shallow Parallax">Axial Dolly</option>
                    <option value="Forward Glide across Waterline">Waterline Glide</option>
                    <option value="Parallax Pan across Flora">Parallax Sweep</option>
                    <option value="Majestic Slow Pull Out & Hold">Slow Pull Out</option>
                  </select>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* STEP 7: REALISTIC VIDEO REVIEW & CLOUD OFFLOADING */}
        {currentStep === 7 && (
          <div className="space-y-5 py-2 max-w-4xl mx-auto">
            <div className="text-center space-y-1">
              <h3 className="font-serif text-lg sm:text-xl text-[#F4EBD9]">7. Realistic Cinema Monitor & Offload Engine</h3>
              <p className="text-xs text-zinc-400">
                Grade color tone, toggle broadcast overlays, and offload video generation to remote cloud GPU clusters.
              </p>
            </div>

            {/* Cinema Video Player with Realistic Grading & HUD */}
            <div className={`relative aspect-video max-h-[380px] w-full bg-black rounded-2xl overflow-hidden border border-[#C5A869]/40 shadow-2xl mx-auto ${
              colorGrade === 'aces' ? 'filter contrast-[1.08] saturate-[1.05]' :
              colorGrade === 'golden' ? 'filter sepia-[0.18] contrast-[1.1] brightness-[1.03]' :
              colorGrade === 'moody' ? 'filter contrast-[1.25] saturate-[0.85]' : ''
            }`}>
              <video
                src="/exports/film_proj_kgm_riyadh_01_master_16x9.mp4"
                controls
                playsInline
                autoPlay
                loop
                className="w-full h-full object-contain"
              />

              {/* Broadcast HUD Timecode Overlay */}
              {timecodeHud && (
                <>
                  <div className="absolute top-3 left-3 bg-black/70 backdrop-blur-md px-2.5 py-1 rounded-lg text-[10px] font-mono text-[#C5A869] border border-[#C5A869]/30 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-red-500 animate-ping"></span>
                    <span>REC • 00:01:40:00 • 30 FPS • ZEISS 24mm T1.5</span>
                  </div>

                  <div className="absolute bottom-12 right-3 bg-black/70 backdrop-blur-md px-2 py-0.5 rounded text-[9px] font-mono text-zinc-300 border border-white/10">
                    ACES 2065-1 • ISO 800 • SHUTTER 180°
                  </div>
                </>
              )}
            </div>

            {/* Realistic Grading & HUD Controls */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-[#071710] p-4 rounded-2xl border border-[#1A3D2F]">
              <div>
                <label className="block text-[11px] font-semibold text-[#C5A869] uppercase tracking-wider mb-2">
                  Cinema Color Grading
                </label>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  {[
                    { id: 'aces', label: 'ACES 2065-1 Master' },
                    { id: 'rec709', label: 'Rec.709 Natural' },
                    { id: 'golden', label: 'Golden Twilight Warm' },
                    { id: 'moody', label: 'Noir High-Contrast' },
                  ].map((g) => (
                    <button
                      key={g.id}
                      onClick={() => setColorGrade(g.id as any)}
                      className={`p-2 rounded-lg text-[11px] font-medium transition ${
                        colorGrade === g.id
                          ? 'bg-[#C5A869] text-[#0B2B20] font-bold'
                          : 'bg-[#0B2319] text-zinc-300 border border-[#1A3D2F]'
                      }`}
                    >
                      {g.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Cloud GPU Offload Engine */}
              <div className="space-y-2">
                <label className="block text-[11px] font-semibold text-[#C5A869] uppercase tracking-wider">
                  Cloud GPU Offload Option
                </label>
                <select
                  value={offloadProvider}
                  onChange={(e) => setOffloadProvider(e.target.value as any)}
                  className="w-full bg-[#0B2319] border border-[#1A3D2F] rounded-xl px-3 py-1.5 text-xs text-white"
                >
                  <option value="native_gpu">Local Neural GPU Master (Fast Rendering)</option>
                  <option value="runway_gen3">Offload to Runway Gen-3 Alpha Cloud GPU</option>
                  <option value="kling_pro">Offload to Kling AI v1.5 Pro Cluster</option>
                  <option value="luma_dream">Offload to Luma Dream Machine Ultra</option>
                  <option value="google_veo">Offload to Google Veo 2 Cinema 4K</option>
                </select>

                <button
                  onClick={handleTriggerOffload}
                  disabled={isOffloading}
                  className="w-full bg-[#124232] hover:bg-[#1A5C46] text-[#C5A869] border border-[#C5A869]/40 py-2 rounded-xl text-xs font-bold transition flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {isOffloading ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Zap className="w-3.5 h-3.5" />}
                  <span>{isOffloading ? `Offloading to Cloud GPU (${offloadProgress}%)...` : `Offload & Render to Cloud GPU`}</span>
                </button>

                {offloadStatusMessage && (
                  <div className="text-[10px] font-mono text-emerald-400 text-center animate-pulse">
                    {offloadStatusMessage}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* STEP 8: SAVE OR PUBLISH THE LIVE VIDEO */}
        {currentStep === 8 && (
          <div className="space-y-6 max-w-2xl mx-auto py-4 text-center">
            <div className="w-14 h-14 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 mx-auto shadow-lg shadow-emerald-500/10">
              <CheckCircle2 className="w-7 h-7" />
            </div>

            <div className="space-y-1.5">
              <span className="text-[10px] uppercase font-mono tracking-widest text-[#C5A869]">Live Deployment Active</span>
              <h3 className="font-serif text-2xl sm:text-3xl text-[#F4EBD9]">8. Film Published & Ready for Delivery</h3>
              <p className="text-xs sm:text-sm text-zinc-400">
                Your cinematic film is live on the public VIP client portal and saved to the KGM database.
              </p>
            </div>

            {/* Shareable Link Box */}
            <div className="bg-[#071710] p-4 rounded-2xl border border-[#C5A869]/40 space-y-3 text-left">
              <div className="text-[11px] font-semibold text-zinc-300 uppercase tracking-wider">
                Public Client Presentation Link
              </div>
              <div className="flex items-center gap-2 bg-[#05100B] p-2.5 rounded-xl border border-[#1A3D2F]">
                <input
                  type="text"
                  readOnly
                  value={publishedUrl}
                  className="bg-transparent text-xs text-[#C5A869] font-mono w-full focus:outline-none"
                />
                <button
                  onClick={copyToClipboard}
                  className="px-3 py-1.5 rounded-lg bg-[#C5A869] text-[#0B2B20] text-xs font-bold hover:brightness-110 shrink-0"
                >
                  {copiedLink ? 'Copied!' : 'Copy Link'}
                </button>
              </div>
            </div>

            {/* 4-Tier Download Grid */}
            <div className="grid grid-cols-2 gap-3 text-xs">
              <a
                href="/exports/film_proj_kgm_riyadh_01_master_16x9.mp4"
                download
                className="p-3 bg-[#071710] border border-[#1A3D2F] hover:border-[#C5A869] rounded-xl flex items-center justify-between"
              >
                <div className="text-left">
                  <div className="font-semibold text-white">16:9 Cinema 4K</div>
                  <div className="text-[10px] text-zinc-400 font-mono">Master (21MB)</div>
                </div>
                <Download className="w-4 h-4 text-[#C5A869]" />
              </a>

              <a
                href="/exports/film_proj_kgm_riyadh_01_social_portrait_9x16.mp4"
                download
                className="p-3 bg-[#071710] border border-[#1A3D2F] hover:border-[#C5A869] rounded-xl flex items-center justify-between"
              >
                <div className="text-left">
                  <div className="font-semibold text-white">9:16 Social Reel</div>
                  <div className="text-[10px] text-zinc-400 font-mono">Reels/TikTok (19MB)</div>
                </div>
                <Download className="w-4 h-4 text-[#C5A869]" />
              </a>

              <a
                href="/exports/film_proj_kgm_riyadh_01_social_square_1x1.mp4"
                download
                className="p-3 bg-[#071710] border border-[#1A3D2F] hover:border-[#C5A869] rounded-xl flex items-center justify-between"
              >
                <div className="text-left">
                  <div className="font-semibold text-white">1:1 Square Feed</div>
                  <div className="text-[10px] text-zinc-400 font-mono">LinkedIn/Feed (13MB)</div>
                </div>
                <Download className="w-4 h-4 text-[#C5A869]" />
              </a>

              <a
                href="/exports/film_proj_kgm_riyadh_01_whatsapp_fast.mp4"
                download
                className="p-3 bg-[#071710] border border-[#1A3D2F] hover:border-[#C5A869] rounded-xl flex items-center justify-between"
              >
                <div className="text-left">
                  <div className="font-semibold text-white">WhatsApp Fast</div>
                  <div className="text-[10px] text-zinc-400 font-mono">Mobile (2.9MB)</div>
                </div>
                <Download className="w-4 h-4 text-[#C5A869]" />
              </a>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <Link
                href="/film/kgm-film-royal-villa-riyadh"
                target="_blank"
                className="flex items-center gap-2 bg-gradient-to-r from-[#C5A869] to-[#DFCA95] text-[#0B2B20] px-6 py-3 rounded-xl font-bold text-xs hover:brightness-110 transition shadow-xl shadow-[#C5A869]/20"
              >
                <Eye className="w-4 h-4" />
                <span>Open Public VIP Viewing Portal</span>
              </Link>
            </div>
          </div>
        )}

        {/* Step Navigation Footer Controls (Back & Next) */}
        <div className="flex items-center justify-between border-t border-[#1A3D2F]/60 pt-4 mt-6">
          <button
            onClick={handleBack}
            disabled={currentStep === 1}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-medium text-zinc-400 hover:text-white border border-[#1A3D2F] hover:border-[#C5A869]/40 disabled:opacity-30 disabled:pointer-events-none transition"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Previous Step</span>
          </button>

          <div className="text-[11px] text-zinc-500 font-mono hidden sm:block">
            KGM Cinematic Pipeline • Enterprise v2.4
          </div>

          {currentStep < 8 ? (
            <button
              onClick={handleNext}
              className="flex items-center gap-1.5 bg-gradient-to-r from-[#C5A869] to-[#DFCA95] text-[#0B2B20] px-5 py-2 rounded-xl text-xs font-bold hover:brightness-110 transition shadow-lg shadow-[#C5A869]/20"
            >
              <span>Continue to Step {currentStep + 1}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          ) : (
            <button
              onClick={() => setCurrentStep(1)}
              className="flex items-center gap-1.5 bg-[#124232] text-[#C5A869] border border-[#C5A869]/50 px-4 py-2 rounded-xl text-xs font-semibold hover:brightness-110 transition"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Create Another Film</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
