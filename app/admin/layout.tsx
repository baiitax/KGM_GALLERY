'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  ShieldAlert,
  SlidersHorizontal,
  LayoutDashboard,
  Activity,
  LineChart,
  FolderKanban,
  Clock,
  Layers,
  Sparkles,
  CheckCircle2,
  Users,
  Building2,
  Briefcase,
  Share2,
  Tv,
  HardDrive,
  Lock,
  FileCheck,
  Download,
  Search,
  Bell,
  LogOut,
  ChevronRight,
  ExternalLink,
  DollarSign,
  Palette,
  Film,
  Menu,
  X,
  Compass,
  Cpu,
  Smartphone,
  Eye,
  Sliders,
  AlertTriangle
} from 'lucide-react';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [currentUser, setCurrentUser] = useState<any>({
    fullName: 'Alexander Kurra',
    role: 'Executive Creative Director (Super Admin)',
    email: 'director@kgm-estates.com',
  });
  const [period, setPeriod] = useState('30_days');
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [alertDrawerOpen, setAlertDrawerOpen] = useState(false);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  useEffect(() => {
    fetch('/api/auth/me')
      .then((res) => res.json())
      .then((d) => {
        if (d.success && d.user) setCurrentUser(d.user);
      })
      .catch(() => {});
  }, []);

  const navSections = [
    {
      title: 'COMMAND CENTER',
      items: [
        { label: 'Executive Overview', href: '/admin', icon: LayoutDashboard },
        { label: 'Live Operations', href: '/admin/live', icon: Activity, badge: 'Live' },
        { label: 'Strategic Analytics', href: '/admin/analytics', icon: LineChart },
      ],
    },
    {
      title: 'PRODUCTION',
      items: [
        { label: 'All Projects', href: '/admin/production/projects', icon: FolderKanban },
        { label: 'Production Queue', href: '/admin/production/queue', icon: Clock, badge: 'GPU' },
      ],
    },
    {
      title: 'GALLERY',
      items: [
        { label: 'Master Gallery', href: '/admin/gallery', icon: Film },
        { label: 'Approval Queue', href: '/admin/gallery/approval', icon: CheckCircle2, badge: 'Review' },
        { label: 'Featured Works', href: '/admin/gallery/featured', icon: Sparkles },
        { label: 'Collections', href: '/admin/gallery/collections', icon: Layers },
      ],
    },
    {
      title: 'BUSINESS',
      items: [
        { label: 'Clients', href: '/admin/business/clients', icon: Briefcase },
        { label: 'Properties', href: '/admin/business/properties', icon: Building2 },
        { label: 'Presentations', href: '/admin/business/presentations', icon: Share2 },
        { label: 'Deliverables', href: '/admin/business/deliverables', icon: Tv },
      ],
    },
    {
      title: 'INTELLIGENCE',
      items: [
        { label: 'AI Intelligence', href: '/admin/intelligence/ai', icon: Cpu },
        { label: 'Asset Intelligence', href: '/admin/intelligence/assets', icon: Layers },
        { label: 'Project Analytics', href: '/admin/intelligence/projects', icon: FolderKanban },
        { label: 'Team Workload', href: '/admin/intelligence/team', icon: Users },
        { label: 'Cost Intelligence', href: '/admin/intelligence/costs', icon: DollarSign },
      ],
    },
    {
      title: 'GOVERNANCE & SYSTEM',
      items: [
        { label: 'System Health', href: '/admin/system', icon: HardDrive },
        { label: 'Storage Control', href: '/admin/system/storage', icon: HardDrive },
        { label: 'Security Center', href: '/admin/security', icon: Lock },
        { label: 'Users & RBAC', href: '/admin/users/permissions', icon: Users },
        { label: 'Audit Logs', href: '/admin/audit', icon: FileCheck },
        { label: 'Executive Reports', href: '/admin/reports', icon: Download },
      ],
    },
    {
      title: 'SETTINGS',
      items: [
        { label: 'UI & Dashboard Layout', href: '/admin/settings/ui', icon: SlidersHorizontal },
        { label: 'Brand Governance', href: '/admin/settings/brand', icon: Palette },
        { label: 'Cinematic Defaults', href: '/admin/settings/cinematic', icon: Film },
        { label: 'AI Gateway Limits', href: '/admin/settings/ai', icon: Cpu },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-[#050E0A] text-stone-100 font-sans flex flex-col lg:flex-row selection:bg-[#C5A869]/30">
      {/* Desktop Left Command Sidebar */}
      <aside className="hidden lg:flex flex-col w-80 bg-[#081812] border-r border-stone-800/90 shrink-0 sticky top-0 h-screen z-40 overflow-y-auto">
        {/* Top Header */}
        <div className="p-5 border-b border-stone-800/80">
          <Link href="/admin" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#C5A869] to-[#8C733E] flex items-center justify-center text-[#07130E] font-serif font-bold text-xl shadow-lg shadow-[#C5A869]/20 group-hover:scale-105 transition-transform">
              K
            </div>
            <div>
              <span className="font-serif tracking-[0.25em] text-stone-100 text-xs font-semibold block">
                KGM LIMITED
              </span>
              <span className="text-[10px] tracking-[0.2em] text-[#C5A869] uppercase font-mono font-medium">
                Senior Admin OS
              </span>
            </div>
          </Link>

          {/* Live Status Pill */}
          <div className="mt-4 p-2.5 rounded-xl bg-stone-950/80 border border-stone-800 flex items-center justify-between text-xs font-mono">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
              <span className="text-emerald-400 font-bold">LIVE OPERATIONS</span>
            </div>
            <span className="text-stone-400 text-[10px]">99.98% UPTIME</span>
          </div>
        </div>

        {/* Global Search & Command Palette Trigger */}
        <div className="p-3 border-b border-stone-800/80 flex items-center gap-2">
          <button
            onClick={() => setSearchOpen(!searchOpen)}
            className="flex-1 py-2 px-3 rounded-xl bg-stone-950/70 hover:bg-stone-950 border border-stone-800 text-stone-400 text-xs flex items-center justify-between transition-colors cursor-pointer"
          >
            <span className="flex items-center gap-2">
              <Search className="w-3.5 h-3.5" />
              <span>Command Palette...</span>
            </span>
            <kbd className="text-[10px] font-mono bg-stone-900 px-1.5 py-0.5 rounded text-[#C5A869]">⌘/</kbd>
          </button>
          <button
            onClick={() => setAlertDrawerOpen(!alertDrawerOpen)}
            className="p-2 rounded-xl bg-stone-950/70 hover:bg-stone-950 border border-stone-800 text-stone-400 hover:text-[#C5A869] relative transition-colors cursor-pointer"
          >
            <Bell className="w-4 h-4" />
            <span className="w-2 h-2 rounded-full bg-amber-400 absolute top-1.5 right-1.5"></span>
          </button>
        </div>

        {/* Command Search Bar Drawer */}
        {searchOpen && (
          <div className="p-3 bg-stone-950 border-b border-stone-800 space-y-2">
            <input
              type="text"
              autoFocus
              placeholder="Search anything (Projects, Clients, Assets, Renders)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-3 py-1.5 rounded-lg bg-stone-900 border border-stone-700 text-xs text-stone-100 outline-none"
            />
            <div className="text-[11px] font-mono text-stone-400 space-y-1">
              <Link href="/admin" onClick={() => setSearchOpen(false)} className="block p-1 hover:text-[#C5A869]">
                → Executive Overview
              </Link>
              <Link href="/admin/gallery" onClick={() => setSearchOpen(false)} className="block p-1 hover:text-[#C5A869]">
                → Master Gallery & Approvals
              </Link>
              <Link href="/admin/system" onClick={() => setSearchOpen(false)} className="block p-1 hover:text-[#C5A869]">
                → System Health & Compute
              </Link>
            </div>
          </div>
        )}

        {/* Alert Drawer */}
        {alertDrawerOpen && (
          <div className="p-3 bg-stone-950 border-b border-stone-800 space-y-2 text-xs">
            <div className="flex items-center justify-between text-stone-400 font-mono text-[10px]">
              <span>ACTIVE EXECUTIVE ALERTS (2)</span>
              <button onClick={() => setAlertDrawerOpen(false)}>✕</button>
            </div>
            <div className="p-2 rounded bg-amber-950/40 border border-amber-800/60 text-amber-200">
              <p className="font-semibold text-[11px]">Review Backlog: 2 Projects Pending</p>
              <p className="text-[10px] text-amber-300/80 mt-0.5">Palm Jumeirah Penthouse requires VIP sign-off.</p>
            </div>
          </div>
        )}

        {/* Sidebar Nav Items */}
        <nav className="flex-1 p-3 space-y-5 overflow-y-auto">
          {navSections.map((sec) => (
            <div key={sec.title} className="space-y-1">
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#C5A869]/70 px-3 block">
                {sec.title}
              </span>
              {sec.items.map((it) => {
                const Icon = it.icon;
                const isActive = pathname === it.href;
                return (
                  <Link
                    key={it.href}
                    href={it.href}
                    className={`flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-all group ${
                      isActive
                        ? 'bg-[#0B2B20] text-[#C5A869] border border-[#C5A869]/40 shadow-sm'
                        : 'text-stone-300 hover:text-white hover:bg-stone-900/60'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <Icon
                        className={`w-4 h-4 transition-colors ${
                          isActive ? 'text-[#C5A869]' : 'text-stone-400 group-hover:text-stone-200'
                        }`}
                      />
                      <span>{it.label}</span>
                    </div>
                    {it.badge && (
                      <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-[#C5A869]/20 text-[#C5A869] font-semibold uppercase">
                        {it.badge}
                      </span>
                    )}
                  </Link>
                );
              })}
            </div>
          ))}
        </nav>

        {/* Bottom Switcher & Profile */}
        <div className="p-3 border-t border-stone-800/80 bg-stone-950/80 space-y-2">
          <Link
            href="/studio"
            className="w-full py-2 px-3 rounded-lg bg-stone-900 hover:bg-[#0B2B20] border border-stone-800 text-stone-300 hover:text-[#C5A869] text-xs font-mono flex items-center justify-between transition-colors"
          >
            <span>← Studio Workspace</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>
          <div className="p-2 rounded-lg bg-stone-900/60 border border-stone-800 flex items-center justify-between">
            <div className="min-w-0">
              <p className="text-xs font-semibold text-white truncate">{currentUser.fullName}</p>
              <p className="text-[10px] text-stone-400 font-mono truncate">Senior Admin</p>
            </div>
            <button
              onClick={() => router.push('/auth/login')}
              className="p-1.5 text-stone-500 hover:text-rose-400"
            >
              <LogOut className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </aside>

      {/* Mobile Top Header */}
      <div className="lg:hidden border-b border-stone-800 px-4 py-3 bg-[#081812] flex items-center justify-between sticky top-0 z-50">
        <Link href="/admin" className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-[#C5A869] text-[#07130E] font-serif font-bold text-sm flex items-center justify-center">
            K
          </div>
          <span className="font-serif tracking-[0.2em] text-xs font-semibold text-stone-100">COMMAND CENTER</span>
        </Link>
        <div className="flex items-center gap-2">
          <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 text-[10px] font-mono border border-emerald-800">
            LIVE
          </span>
          <button onClick={() => setMobileNavOpen(!mobileNavOpen)} className="p-2 text-stone-300">
            {mobileNavOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileNavOpen && (
        <div className="lg:hidden bg-[#050E0A] border-b border-stone-800 p-4 space-y-4 fixed top-12 left-0 right-0 z-50 max-h-[85vh] overflow-y-auto">
          {navSections.map((sec) => (
            <div key={sec.title} className="space-y-1">
              <p className="text-[10px] font-mono text-[#C5A869] uppercase tracking-wider">{sec.title}</p>
              {sec.items.map((it) => (
                <Link
                  key={it.href}
                  href={it.href}
                  onClick={() => setMobileNavOpen(false)}
                  className="block px-3 py-2 rounded-lg text-xs text-stone-300 hover:bg-stone-900"
                >
                  {it.label}
                </Link>
              ))}
            </div>
          ))}
        </div>
      )}

      {/* Main Command Workspace */}
      <main className="flex-1 flex flex-col min-w-0 bg-[#050E0A] overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
