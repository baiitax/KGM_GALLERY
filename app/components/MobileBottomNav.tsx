'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Film, Layers, Activity, Building2, Sparkles, 
  Menu, X, Music, Sliders, ShieldCheck, Eye, Compass
} from 'lucide-react';

export default function MobileBottomNav() {
  const pathname = usePathname();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const mainNavItems = [
    { label: 'Studio', href: '/', icon: Film },
    { label: 'Projects', href: '/projects', icon: Layers },
    { label: 'VIP Film', href: '/film/kgm-film-royal-villa-riyadh', icon: Eye, highlight: true },
    { label: 'Queue', href: '/queue', icon: Activity },
    { label: 'More', href: '#more', icon: Menu, isDrawer: true },
  ];

  const moreNavItems = [
    { label: 'Properties CRM', href: '/properties', icon: Building2, desc: 'Property listings & specs' },
    { label: 'Narrative Templates', href: '/templates', icon: Compass, desc: 'Storyboard blueprints' },
    { label: 'Audio Soundstage', href: '/media', icon: Music, desc: 'Soundtracks & AI voiceover' },
    { label: 'Brand & Identity', href: '/brand', icon: Sliders, desc: 'Logos, colors & motion cards' },
    { label: 'Admin & AI Keys', href: '/admin', icon: ShieldCheck, desc: 'Provider keys & RBAC' },
  ];

  return (
    <>
      {/* Mobile Bottom Navigation Bar */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-[#071710]/95 backdrop-blur-xl border-t border-[#1A3D2F]/80 pb-[env(safe-area-inset-bottom)] shadow-[0_-10px_25px_rgba(0,0,0,0.5)]">
        <div className="flex items-center justify-around px-2 py-2">
          {mainNavItems.map((item) => {
            const Icon = item.icon;
            const isActive = item.href === '/' ? pathname === '/' : pathname.startsWith(item.href);

            if (item.isDrawer) {
              return (
                <button
                  key={item.label}
                  onClick={() => setDrawerOpen(true)}
                  className={`flex flex-col items-center justify-center py-1 px-2.5 rounded-xl transition ${
                    drawerOpen ? 'text-[#C5A869]' : 'text-zinc-400 hover:text-[#C5A869]'
                  }`}
                >
                  <Icon className="w-5 h-5 mb-0.5" />
                  <span className="text-[10px] font-medium tracking-tight">{item.label}</span>
                </button>
              );
            }

            if (item.highlight) {
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className="flex flex-col items-center justify-center -mt-4 group"
                >
                  <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-[#C5A869] via-[#E6D5AC] to-[#997F46] p-0.5 shadow-lg shadow-[#C5A869]/30 group-hover:scale-105 transition">
                    <div className="w-full h-full bg-[#0B2B20] rounded-full flex items-center justify-center">
                      <Icon className="w-5 h-5 text-[#C5A869]" />
                    </div>
                  </div>
                  <span className="text-[10px] font-semibold text-[#C5A869] mt-0.5 tracking-tight">VIP Portal</span>
                </Link>
              );
            }

            return (
              <Link
                key={item.label}
                href={item.href}
                className={`flex flex-col items-center justify-center py-1 px-2.5 rounded-xl transition ${
                  isActive
                    ? 'text-[#C5A869] font-semibold'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                <div className="relative">
                  <Icon className="w-5 h-5 mb-0.5" />
                  {isActive && (
                    <span className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 bg-[#C5A869] rounded-full"></span>
                  )}
                </div>
                <span className="text-[10px] tracking-tight">{item.label}</span>
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Mobile Drawer (More Menu) */}
      {drawerOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex flex-col justify-end animate-fadeIn">
          <div 
            className="flex-1"
            onClick={() => setDrawerOpen(false)}
          />

          <div className="bg-[#0B2319] border-t border-[#C5A869]/40 rounded-t-3xl p-6 space-y-5 max-h-[80vh] overflow-y-auto pb-[calc(1.5rem+env(safe-area-inset-bottom))] shadow-2xl">
            <div className="flex items-center justify-between border-b border-[#1A3D2F] pb-4">
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-[#C5A869] to-[#997F46] p-0.5 flex items-center justify-center">
                  <div className="w-full h-full bg-[#0B2B20] rounded-[5px] flex items-center justify-center">
                    <span className="font-serif font-bold text-[#C5A869] text-xs">K</span>
                  </div>
                </div>
                <div>
                  <h3 className="font-serif text-base text-[#F4EBD9]">KGM Studio Navigation</h3>
                  <p className="text-[10px] text-[#C5A869] uppercase tracking-wider">Kurra Greenfield Merchants</p>
                </div>
              </div>

              <button
                onClick={() => setDrawerOpen(false)}
                className="p-1.5 rounded-full bg-[#071710] text-zinc-400 hover:text-white border border-[#1A3D2F]"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-1 gap-2.5">
              {moreNavItems.map((item) => {
                const Icon = item.icon;
                const isActive = pathname.startsWith(item.href);
                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    onClick={() => setDrawerOpen(false)}
                    className={`p-3.5 rounded-2xl border flex items-center gap-3.5 transition ${
                      isActive
                        ? 'bg-[#124232] border-[#C5A869] text-[#C5A869]'
                        : 'bg-[#071710] border-[#1A3D2F] text-zinc-200 hover:border-[#C5A869]/40'
                    }`}
                  >
                    <div className="w-9 h-9 rounded-xl bg-[#0B2319] border border-[#1A3D2F] flex items-center justify-center text-[#C5A869] shrink-0">
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-white">{item.label}</div>
                      <div className="text-[10px] text-zinc-400">{item.desc}</div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
