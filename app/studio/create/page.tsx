'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  Building2,
  Layers,
  Film,
  Compass,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  Upload,
  Plus,
  Trash2,
  CheckCircle2,
  Eye,
  Sliders,
  Play,
  Share2,
  Tv,
  Smartphone,
  Square,
  Maximize2,
  Check
} from 'lucide-react';

export default function CreateFilmPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);

  // Step 1: Property State
  const [propertyName, setPropertyName] = useState('The Royal Sovereign Villa — Al-Malqa');
  const [propertyType, setPropertyType] = useState('luxury_villa');
  const [location, setLocation] = useState('Al-Malqa District, Northern Riyadh, Saudi Arabia');
  const [projectDescription, setProjectDescription] = useState(
    'An ultra-luxury architectural residence featuring monolithic travertine stone, double-height pivot entries, Italian marble, and an illuminated infinity water terrace.'
  );
  const [price, setPrice] = useState('$14,800,000');
  const [clientName, setClientName] = useState('Private Sovereign Family Office');

  // Step 2: Uploaded Assets & AI Intelligence State
  const [images, setImages] = useState<any[]>([
    {
      id: 'img_01',
      url: '/uploads/villa_01_hero_exterior.jpg',
      name: 'villa_01_hero_exterior.jpg',
      category: 'Exterior Façade',
      roomType: 'exterior',
      aiAnalysis: 'Dusk prestige lighting, monumental monolithic symmetry, optimal for axial dolly push.',
      isHero: true,
      motionPreset: 'preset_hero_exterior',
    },
    {
      id: 'img_02',
      url: '/uploads/villa_02_entrance_foyer.jpg',
      name: 'villa_02_entrance_foyer.jpg',
      category: 'Grand Entrance',
      roomType: 'entrance',
      aiAnalysis: 'Double-height volume with custom chandelier, suited for vertical crane ascent reveal.',
      isHero: false,
      motionPreset: 'preset_entrance_foyer',
    },
    {
      id: 'img_03',
      url: '/uploads/villa_03_living_salon.jpg',
      name: 'villa_03_living_salon.jpg',
      category: 'Living Salon',
      roomType: 'living_room',
      aiAnalysis: 'Linear travertine mullions and bespoke lounge, suited for lateral tracking glide.',
      isHero: false,
      motionPreset: 'preset_living_glide',
    },
    {
      id: 'img_04',
      url: '/uploads/villa_06_master_suite.jpg',
      name: 'villa_06_master_suite.jpg',
      category: 'Primary Master Suite',
      roomType: 'master_bedroom',
      aiAnalysis: 'Panoramic terrace glass with warm hardwood accents, optimal for slow horizon drift.',
      isHero: false,
      motionPreset: 'preset_bedroom_push',
    },
    {
      id: 'img_05',
      url: '/uploads/villa_07_spa_bathroom.jpg',
      name: 'villa_07_spa_bathroom.jpg',
      category: 'Spa Primary Bath',
      roomType: 'bathroom',
      aiAnalysis: 'Calacatta marble vanity and soaking tub, suited for ultra-slow lateral reflection pan.',
      isHero: false,
      motionPreset: 'preset_bathroom_pan',
    },
    {
      id: 'img_06',
      url: '/uploads/villa_08_infinity_pool.jpg',
      name: 'villa_08_infinity_pool.jpg',
      category: 'Infinity Pool & Oasis',
      roomType: 'pool',
      aiAnalysis: 'Waterline symmetry with integrated fire lounge, optimal for forward waterline glide.',
      isHero: false,
      motionPreset: 'preset_pool_reveal',
    },
  ]);

  // Step 3: Cinematic Story Sequence State
  const [scenes, setScenes] = useState<any[]>([
    {
      sceneNum: 1,
      title: 'Arrival',
      desc: 'Wide architectural establishing shot framing façade and dusk sky.',
      imageId: 'img_01',
      motion: 'Architectural Push (Axial Dolly In)',
      duration: 10,
    },
    {
      sceneNum: 2,
      title: 'Approach & Entry',
      desc: 'Vertical crane reveal through monolithic pivot entrance.',
      imageId: 'img_02',
      motion: 'Vertical Crane / Jib Ascent',
      duration: 10,
    },
    {
      sceneNum: 3,
      title: 'Grand Entertaining',
      desc: 'Fluid lateral tracking through double-height living salon.',
      imageId: 'img_03',
      motion: 'Lateral Tracking (Left to Right)',
      duration: 10,
    },
    {
      sceneNum: 4,
      title: 'Master Sanctuary',
      desc: 'Slow forward camera push towards floor-to-ceiling panoramic glass.',
      imageId: 'img_04',
      motion: 'Horizon Drift (Slow Push)',
      duration: 10,
    },
    {
      sceneNum: 5,
      title: 'Spa & Wellness',
      desc: 'Lateral glide past freestanding soaking tub and marble vanity.',
      imageId: 'img_05',
      motion: 'Lateral Reflection Pan',
      duration: 10,
    },
    {
      sceneNum: 6,
      title: 'Hero Climax & Oasis',
      desc: 'Waterline glide over infinity pool to desert horizon.',
      imageId: 'img_06',
      motion: 'Waterline Forward Glide',
      duration: 10,
    },
  ]);

  // Step 4: Motion & Style Controls
  const [visualCharacter, setVisualCharacter] = useState('Luxury Architectural');
  const [cameraCharacter, setCameraCharacter] = useState('Commercial Architectural Film');
  const [movementIntensity, setMovementIntensity] = useState<'low' | 'medium' | 'high'>('low');
  const [colorGrade, setColorGrade] = useState('KGM Emerald Gold Master');

  // Step 5: Generation State
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationStage, setGenerationStage] = useState(0);
  const [generationProgress, setGenerationProgress] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);

  const generationStages = [
    'Preparing High-Res Architectural Assets',
    'Analyzing Spatial Geometry & Light Vectors',
    'Compiling Physical Inertial Camera Trajectories',
    'Generating 6 Multi-Pass 10-Second Scenes',
    'Applying ACES 2065-1 Color Science (Emerald & Gold)',
    'Mastering 4K DCI Video & Spatial Soundscape',
    'Synchronizing 4-Format Multi-Aspect Exports (16:9, 9:16, 1:1, 4:5)',
  ];

  const handleStartGeneration = () => {
    setIsGenerating(true);
    setGenerationStage(0);
    setGenerationProgress(5);

    const interval = setInterval(() => {
      setGenerationProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsGenerating(false);
          setIsCompleted(true);
          return 100;
        }
        const next = prev + 15;
        const stageIdx = Math.min(Math.floor((next / 100) * generationStages.length), generationStages.length - 1);
        setGenerationStage(stageIdx);
        return next;
      });
    }, 900);
  };

  const stepsNav = [
    { num: 1, title: 'Property', desc: 'Specs & Location' },
    { num: 2, title: 'Upload & AI', desc: 'Asset Intelligence' },
    { num: 3, title: 'Story Builder', desc: 'Scene Sequencing' },
    { num: 4, title: 'Motion & Style', desc: 'Camera Kinetics' },
    { num: 5, title: 'Master 10s', desc: '4K Generation' },
  ];

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-8 max-w-7xl w-full mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-800 pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-[#C5A869] mb-1 uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Guided Architectural Film Pipeline</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-serif font-medium text-white tracking-tight">
            Create Cinematic Property Film
          </h1>
        </div>
        <Link
          href="/studio"
          className="text-xs text-stone-400 hover:text-stone-200 flex items-center gap-1.5 self-start sm:self-auto"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Return to Overview
        </Link>
      </div>

      {/* 5-Step Pipeline Breadcrumb Navigation */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
        {stepsNav.map((s) => (
          <button
            key={s.num}
            type="button"
            onClick={() => setCurrentStep(s.num)}
            className={`p-3 rounded-xl text-left border transition-all cursor-pointer ${
              currentStep === s.num
                ? 'bg-[#0B2B20] border-[#C5A869] shadow-lg shadow-[#C5A869]/10'
                : currentStep > s.num
                ? 'bg-stone-950/80 border-emerald-800/60 text-stone-300'
                : 'bg-stone-950/40 border-stone-800/60 text-stone-500'
            }`}
          >
            <div className="flex items-center justify-between mb-1">
              <span className="text-[10px] font-mono text-[#C5A869]">STEP 0{s.num}</span>
              {currentStep > s.num && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />}
            </div>
            <p className="text-xs font-semibold text-stone-200 truncate">{s.title}</p>
            <p className="text-[10px] text-stone-400 truncate">{s.desc}</p>
          </button>
        ))}
      </div>

      {/* STEP 1: Property Details */}
      {currentStep === 1 && (
        <div className="bg-[#0C1E17]/80 border border-stone-800/90 rounded-2xl p-6 sm:p-8 shadow-xl space-y-6">
          <div className="space-y-1">
            <span className="text-xs font-mono uppercase tracking-wider text-[#C5A869]">Step 01 • Architectural Identity</span>
            <h2 className="text-xl font-serif font-medium text-white">Select or Define Property Workspace</h2>
            <p className="text-xs text-stone-400 font-light">
              Enter key architectural parameters to ground the AI cinematic engine in authentic project specs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-stone-300 uppercase tracking-wider mb-1.5">
                Property / Film Title
              </label>
              <input
                type="text"
                value={propertyName}
                onChange={(e) => setPropertyName(e.target.value)}
                placeholder="e.g. The Royal Sovereign Villa — Al-Malqa"
                className="w-full px-3.5 py-2.5 rounded-lg bg-stone-950/80 border border-stone-800 focus:border-[#C5A869] text-stone-100 text-sm outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-stone-300 uppercase tracking-wider mb-1.5">
                Property Classification
              </label>
              <select
                value={propertyType}
                onChange={(e) => setPropertyType(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-lg bg-stone-950 border border-stone-800 text-stone-100 text-sm outline-none focus:border-[#C5A869]"
              >
                <option value="luxury_villa">Luxury Villa / Private Compound</option>
                <option value="estate">Palatial Sovereign Estate</option>
                <option value="penthouse">Sky Penthouse & High-Rise</option>
                <option value="resort">Boutique Luxury Resort</option>
                <option value="commercial">Prime Commercial Landmark</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-stone-300 uppercase tracking-wider mb-1.5">
                Geographic Location
              </label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="e.g. Al-Malqa District, Northern Riyadh, Saudi Arabia"
                className="w-full px-3.5 py-2.5 rounded-lg bg-stone-950/80 border border-stone-800 focus:border-[#C5A869] text-stone-100 text-sm outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-stone-300 uppercase tracking-wider mb-1.5">
                Asset Valuation / Listing Price
              </label>
              <input
                type="text"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="e.g. $14,800,000 USD (SAR 55,500,000)"
                className="w-full px-3.5 py-2.5 rounded-lg bg-stone-950/80 border border-stone-800 focus:border-[#C5A869] text-stone-100 text-sm outline-none"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-xs font-medium text-stone-300 uppercase tracking-wider mb-1.5">
                Architectural Statement & Materiality
              </label>
              <textarea
                rows={3}
                value={projectDescription}
                onChange={(e) => setProjectDescription(e.target.value)}
                placeholder="Describe key architectural features, monolithic travertine, double-height volumes..."
                className="w-full px-3.5 py-2.5 rounded-lg bg-stone-950/80 border border-stone-800 focus:border-[#C5A869] text-stone-100 text-xs outline-none leading-relaxed"
              />
            </div>
          </div>

          <div className="flex justify-end pt-4 border-t border-stone-800">
            <button
              type="button"
              onClick={() => setCurrentStep(2)}
              className="py-3 px-8 rounded-lg bg-gradient-to-r from-[#C5A869] to-[#9E8345] hover:from-[#D8BC7D] text-[#07130E] font-semibold text-xs tracking-widest uppercase flex items-center gap-2 cursor-pointer shadow-lg shadow-[#C5A869]/20"
            >
              <span>CONTINUE TO ASSET UPLOAD & AI ANALYSIS</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 2: Upload Images & AI Asset Intelligence */}
      {currentStep === 2 && (
        <div className="bg-[#0C1E17]/80 border border-stone-800/90 rounded-2xl p-6 sm:p-8 shadow-xl space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <span className="text-xs font-mono uppercase tracking-wider text-[#C5A869]">Step 02 • Asset Intelligence</span>
              <h2 className="text-xl font-serif font-medium text-white">Curate & Analyze Architectural Photography</h2>
              <p className="text-xs text-stone-400 font-light">
                High-resolution images are scanned for room type, lighting vectors, and camera movement suitability.
              </p>
            </div>
            <label className="py-2.5 px-4 rounded-lg bg-[#C5A869] hover:bg-[#D8BC7D] text-[#07130E] font-semibold text-xs uppercase tracking-wider flex items-center gap-2 cursor-pointer shrink-0">
              <Upload className="w-3.5 h-3.5" />
              <span>UPLOAD HIGH-RES IMAGES</span>
              <input type="file" multiple className="hidden" />
            </label>
          </div>

          {/* Grid of uploaded images with AI intelligence */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {images.map((img) => (
              <div
                key={img.id}
                className="rounded-xl bg-stone-950/80 border border-stone-800 overflow-hidden group hover:border-[#C5A869]/50 transition-all flex flex-col"
              >
                <div className="relative h-44 w-full overflow-hidden">
                  <img
                    src={img.url}
                    alt={img.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-2 left-2 flex items-center gap-1.5">
                    <span className="px-2 py-0.5 rounded bg-black/70 text-[#C5A869] text-[10px] font-mono border border-[#C5A869]/30">
                      {img.category}
                    </span>
                    {img.isHero && (
                      <span className="px-2 py-0.5 rounded bg-[#C5A869] text-[#07130E] text-[10px] font-bold uppercase">
                        HERO
                      </span>
                    )}
                  </div>
                </div>

                <div className="p-3.5 flex-1 flex flex-col justify-between space-y-2">
                  <div>
                    <p className="text-xs font-mono text-stone-300 truncate">{img.name}</p>
                    <div className="mt-1.5 p-2 rounded bg-stone-900/80 border border-stone-800 text-[11px] text-stone-400 font-light leading-relaxed">
                      <span className="text-[#C5A869] font-medium font-mono text-[10px] block mb-0.5">AI ANALYSIS:</span>
                      {img.aiAnalysis}
                    </div>
                  </div>
                  <div className="flex items-center justify-between pt-2 border-t border-stone-800 text-[11px]">
                    <span className="text-emerald-400 font-mono">100% Geometry Safe</span>
                    <button
                      type="button"
                      onClick={() => {
                        setImages(images.map((i) => ({ ...i, isHero: i.id === img.id })));
                      }}
                      className={`text-[10px] uppercase font-mono ${
                        img.isHero ? 'text-[#C5A869] font-bold' : 'text-stone-400 hover:text-white'
                      }`}
                    >
                      {img.isHero ? '✓ Hero Selected' : 'Set as Hero'}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-stone-800">
            <button
              onClick={() => setCurrentStep(1)}
              className="py-2.5 px-5 rounded-lg border border-stone-800 text-stone-400 hover:text-stone-200 text-xs font-medium flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" /> Back
            </button>
            <button
              type="button"
              onClick={() => setCurrentStep(3)}
              className="py-3 px-8 rounded-lg bg-gradient-to-r from-[#C5A869] to-[#9E8345] hover:from-[#D8BC7D] text-[#07130E] font-semibold text-xs tracking-widest uppercase flex items-center gap-2 cursor-pointer shadow-lg shadow-[#C5A869]/20"
            >
              <span>CONTINUE TO CINEMATIC STORY BUILDER</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 3: Cinematic Story Builder */}
      {currentStep === 3 && (
        <div className="bg-[#0C1E17]/80 border border-stone-800/90 rounded-2xl p-6 sm:p-8 shadow-xl space-y-6">
          <div className="space-y-1">
            <span className="text-xs font-mono uppercase tracking-wider text-[#C5A869]">Step 03 • Story Sequencing</span>
            <h2 className="text-xl font-serif font-medium text-white">Assemble 6-Scene Cinematic Progression</h2>
            <p className="text-xs text-stone-400 font-light">
              The AI sequences scenes into a standard luxury narrative: Arrival → Approach → Architecture → Sanctuary → Spa → Hero Climax.
            </p>
          </div>

          <div className="space-y-3">
            {scenes.map((sc, idx) => (
              <div
                key={sc.sceneNum}
                className="p-4 rounded-xl bg-stone-950/80 border border-stone-800 flex flex-col md:flex-row md:items-center justify-between gap-4"
              >
                <div className="flex items-center gap-3.5">
                  <div className="w-9 h-9 rounded-lg bg-[#0B2B20] text-[#C5A869] font-mono font-bold text-xs flex items-center justify-center border border-[#C5A869]/40">
                    0{sc.sceneNum}
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-stone-100">{sc.title}</h4>
                    <p className="text-xs text-stone-400 font-light">{sc.desc}</p>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-3 font-mono text-xs">
                  <span className="px-2.5 py-1 rounded bg-stone-900 border border-stone-800 text-stone-300">
                    {sc.motion}
                  </span>
                  <span className="px-2.5 py-1 rounded bg-stone-900 border border-stone-800 text-[#C5A869]">
                    {sc.duration}s Shot
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-stone-800">
            <button
              onClick={() => setCurrentStep(2)}
              className="py-2.5 px-5 rounded-lg border border-stone-800 text-stone-400 hover:text-stone-200 text-xs font-medium flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" /> Back
            </button>
            <button
              type="button"
              onClick={() => setCurrentStep(4)}
              className="py-3 px-8 rounded-lg bg-gradient-to-r from-[#C5A869] to-[#9E8345] hover:from-[#D8BC7D] text-[#07130E] font-semibold text-xs tracking-widest uppercase flex items-center gap-2 cursor-pointer shadow-lg shadow-[#C5A869]/20"
            >
              <span>CONFIGURE CAMERA MOTION & STYLE</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 4: Camera Motion & Cinematic Style */}
      {currentStep === 4 && (
        <div className="bg-[#0C1E17]/80 border border-stone-800/90 rounded-2xl p-6 sm:p-8 shadow-xl space-y-6">
          <div className="space-y-1">
            <span className="text-xs font-mono uppercase tracking-wider text-[#C5A869]">Step 04 • Motion & Color Science</span>
            <h2 className="text-xl font-serif font-medium text-white">Camera Kinetics & ACES Color Grading</h2>
            <p className="text-xs text-stone-400 font-light">
              Calibrate physical camera speed, movement dampening, and proprietary KGM color rendering.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-medium text-stone-300 uppercase tracking-wider mb-2">
                Visual Character
              </label>
              <select
                value={visualCharacter}
                onChange={(e) => setVisualCharacter(e.target.value)}
                className="w-full p-3 rounded-lg bg-stone-950 border border-stone-800 text-stone-100 text-xs outline-none focus:border-[#C5A869]"
              >
                <option>Luxury Architectural</option>
                <option>Editorial Travertine</option>
                <option>Twilight Minimalist</option>
                <option>Contemporary Sovereign</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-stone-300 uppercase tracking-wider mb-2">
                Camera Physics Model
              </label>
              <select
                value={cameraCharacter}
                onChange={(e) => setCameraCharacter(e.target.value)}
                className="w-full p-3 rounded-lg bg-stone-950 border border-stone-800 text-stone-100 text-xs outline-none focus:border-[#C5A869]"
              >
                <option>Commercial Architectural Film</option>
                <option>Documentary Precision</option>
                <option>High-Net-Worth Showcase</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-stone-300 uppercase tracking-wider mb-2">
                Movement Intensity
              </label>
              <div className="grid grid-cols-3 gap-2">
                {['low', 'medium', 'high'].map((lvl) => (
                  <button
                    key={lvl}
                    type="button"
                    onClick={() => setMovementIntensity(lvl as any)}
                    className={`py-2.5 rounded-lg text-xs font-mono uppercase border transition-all ${
                      movementIntensity === lvl
                        ? 'bg-[#0B2B20] border-[#C5A869] text-[#C5A869]'
                        : 'bg-stone-950/60 border-stone-800 text-stone-400'
                    }`}
                  >
                    {lvl}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-stone-950/60 border border-stone-800/80 space-y-2">
            <span className="text-xs font-mono text-[#C5A869] uppercase tracking-wider">
              ACES 2065-1 Color Science Profile
            </span>
            <p className="text-xs text-stone-300 font-light leading-relaxed">
              <strong>KGM Emerald & Gold Master</strong>: Retains stone texture contrast, highlights fluted bronze mullions, and elevates natural sky gradients.
            </p>
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-stone-800">
            <button
              onClick={() => setCurrentStep(3)}
              className="py-2.5 px-5 rounded-lg border border-stone-800 text-stone-400 hover:text-stone-200 text-xs font-medium flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" /> Back
            </button>
            <button
              type="button"
              onClick={() => setCurrentStep(5)}
              className="py-3 px-8 rounded-lg bg-gradient-to-r from-[#C5A869] to-[#9E8345] hover:from-[#D8BC7D] text-[#07130E] font-semibold text-xs tracking-widest uppercase flex items-center gap-2 cursor-pointer shadow-lg shadow-[#C5A869]/20"
            >
              <span>PROCEED TO 10-SECOND MASTER GENERATION</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 5: 10-Second Master Generation */}
      {currentStep === 5 && (
        <div className="bg-[#0C1E17]/90 border border-stone-800/90 rounded-2xl p-6 sm:p-10 shadow-2xl space-y-8">
          <div className="space-y-1 text-center max-w-xl mx-auto">
            <span className="text-xs font-mono uppercase tracking-widest text-[#C5A869] font-medium block">
              Step 05 • Master Film Rendering
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-medium text-white tracking-tight">
              Ready to Generate 10-Second Master
            </h2>
            <p className="text-xs sm:text-sm text-stone-400 font-light">
              Review production summary and dispatch multi-stage AI compilation to the KGM GPU cluster.
            </p>
          </div>

          {/* Pre-Flight Production Summary */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center p-5 rounded-xl bg-stone-950/80 border border-stone-800">
            <div>
              <p className="text-xs font-mono text-stone-400 uppercase">Property</p>
              <p className="text-sm font-serif text-white mt-1">Al-Malqa Villa</p>
            </div>
            <div>
              <p className="text-xs font-mono text-stone-400 uppercase">Scenes</p>
              <p className="text-sm font-serif text-white mt-1">6 Cinematic Cuts</p>
            </div>
            <div>
              <p className="text-xs font-mono text-stone-400 uppercase">Duration Standard</p>
              <p className="text-sm font-serif text-[#C5A869] mt-1">10 Seconds / Shot</p>
            </div>
            <div>
              <p className="text-xs font-mono text-stone-400 uppercase">Output Standard</p>
              <p className="text-sm font-serif text-[#C5A869] mt-1">4K ACES Master</p>
            </div>
          </div>

          {/* Active Generation State Visualizer */}
          {isGenerating && (
            <div className="p-6 rounded-2xl bg-[#091C14] border border-[#C5A869]/40 space-y-5">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-emerald-400 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                  STAGE 0{generationStage + 1} OF 07: {generationStages[generationStage]}
                </span>
                <span className="text-[#C5A869] font-bold">{generationProgress}%</span>
              </div>

              <div className="w-full h-2.5 rounded-full bg-stone-950 border border-stone-800 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-[#C5A869] to-[#E5CF98] transition-all duration-700"
                  style={{ width: `${generationProgress}%` }}
                ></div>
              </div>

              <div className="space-y-1.5 text-xs font-mono text-stone-400">
                {generationStages.map((st, idx) => (
                  <div
                    key={idx}
                    className={`flex items-center gap-2 ${
                      idx < generationStage
                        ? 'text-emerald-400'
                        : idx === generationStage
                        ? 'text-[#C5A869] font-semibold'
                        : 'text-stone-600'
                    }`}
                  >
                    {idx < generationStage ? (
                      <CheckCircle2 className="w-3.5 h-3.5" />
                    ) : (
                      <span className="w-3.5 h-3.5 rounded-full border border-current flex items-center justify-center text-[9px]">
                        {idx + 1}
                      </span>
                    )}
                    <span>{st}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Completed State */}
          {isCompleted && (
            <div className="p-6 rounded-2xl bg-emerald-950/50 border border-emerald-800 space-y-4 text-center">
              <div className="w-12 h-12 rounded-full bg-emerald-900 border border-emerald-500 flex items-center justify-center mx-auto text-emerald-300">
                <Check className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-serif text-white">10-Second Master Successfully Rendered</h3>
              <p className="text-xs text-stone-300 max-w-lg mx-auto font-light">
                All 6 architectural scenes have been composited, color-graded to ACES 2065-1, and mastered in 4 synchronized aspect ratios.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                <Link
                  href="/studio/projects/proj_kgm_riyadh_01/review"
                  className="py-3 px-6 rounded-lg bg-[#C5A869] hover:bg-[#D8BC7D] text-[#07130E] font-semibold text-xs tracking-wider uppercase flex items-center gap-2 shadow-lg shadow-[#C5A869]/20"
                >
                  <Eye className="w-4 h-4" />
                  <span>REVIEW MASTER SCENES</span>
                </Link>
                <Link
                  href="/studio/deliverables"
                  className="py-3 px-6 rounded-lg bg-stone-900 hover:bg-stone-800 border border-stone-700 text-stone-200 text-xs font-medium uppercase tracking-wider flex items-center gap-2"
                >
                  <Sliders className="w-4 h-4 text-[#C5A869]" />
                  <span>EXPORT 4-FORMAT DELIVERABLES</span>
                </Link>
              </div>
            </div>
          )}

          {!isGenerating && !isCompleted && (
            <div className="flex justify-center pt-2">
              <button
                type="button"
                onClick={handleStartGeneration}
                className="py-4 px-12 rounded-xl bg-gradient-to-r from-[#C5A869] to-[#9E8345] hover:from-[#D8BC7D] text-[#07130E] font-semibold text-xs sm:text-sm tracking-widest uppercase flex items-center gap-3 cursor-pointer shadow-xl shadow-[#C5A869]/25 hover:scale-[1.02] transition-all"
              >
                <Sparkles className="w-4 h-4" />
                <span>GENERATE CINEMATIC MASTER</span>
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
