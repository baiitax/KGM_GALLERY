'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  Film,
  LayoutDashboard,
  FolderKanban,
  PlusCircle,
  Clock,
  Layers,
  FileCheck,
  Video,
  Compass,
  Sliders,
  Shield,
  Users,
  Building2,
  Briefcase,
  Activity,
  Settings,
  Bell,
  Search,
  User,
  LogOut,
  ChevronRight,
  ExternalLink,
  Sparkles,
  ShieldCheck,
  Menu,
  X,
  Smartphone,
  Tv
} from 'lucide-react';

export default function StudioLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [currentUser, setCurrentUser] = useState<any>({
    id: 'usr_director_01',
    fullName: 'Alexander Kurra',
    email: 'director@kgm-estates.com',
    role: 'super_admin',
    department: 'Executive Creative Direction',
    organization: 'Kurra Greenfield Merchants Limited',
  });
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    fetch('/api/auth/me')
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.user) {
          setCurrentUser(data.user);
        }
      })
      .catch(() => {});
  }, []);

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      router.push('/auth/login');
    } catch (e) {
      router.push('/auth/login');
    }
  };

  const navGroups = [
    {
      group: 'STUDIO',
      items: [
        { label: 'Overview', href: '/studio', icon: LayoutDashboard },
        { label: 'Projects', href: '/studio/projects', icon: FolderKanban },
        { label: 'Create Film', href: '/studio/create', icon: PlusCircle, badge: 'Pipeline' },
        { label: 'Production Queue', href: '/studio/queue', icon: Clock, badge: 'Live' },
        { label: 'Asset Library', href: '/studio/assets', icon: Layers },
        { label: 'Deliverables', href: '/studio/deliverables', icon: FileCheck },
      ],
    },
    {
      group: 'CREATIVE',
      items: [
        { label: 'Cinematic Generator', href: '/studio/generator', icon: Video },
        { label: 'Motion Presets', href: '/studio/motion', icon: Compass },
        { label: 'Scene Builder', href: '/studio/create/story', icon: Film },
        { label: 'Brand Profiles', href: '/studio/brand', icon: Shield },
      ],
    },
    {
      group: 'MASTERING',
      items: [
        { label: '4-Aspect Mastering', href: '/studio/deliverables', icon: Sliders },
        { label: 'Presentation Builder', href: '/studio/projects/proj_kgm_riyadh_01/presentation', icon: Tv },
      ],
    },
    {
      group: 'MANAGEMENT',
      items: [
        { label: 'Clients', href: '/studio/clients', icon: Briefcase },
        { label: 'Properties', href: '/studio/properties', icon: Building2 },
        { label: 'Team & RBAC', href: '/studio/team', icon: Users },
        { label: 'Activity Logs', href: '/studio/activity', icon: Activity },
        { label: 'Studio Settings', href: '/studio/settings', icon: Settings },
      ],
    },
  ];

  const notifications = [
    { id: 1, title: 'Master Film 4K Render Completed', time: '5m ago', type: 'success' },
    { id: 2, title: '9:16 VIP Vertical Reel Exported', time: '14m ago', type: 'info' },
    { id: 3, title: 'Scene 04 Architectural Push Approved', time: '1h ago', type: 'review' },
  ];

  return (
    <div className="min-h-screen bg-[#07130E] text-stone-100 font-sans flex flex-col md:flex-row selection:bg-[#C5A869]/30">
      {/* Desktop Left Sidebar */}
      <aside className="hidden md:flex flex-col w-72 bg-[#091C14] border-r border-stone-800/90 shrink-0 sticky top-0 h-screen z-40 overflow-y-auto">
        {/* Top Logo */}
        <div className="p-5 border-b border-stone-800/80">
          <Link href="/studio" className="flex items-center gap-3 group">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#C5A869] to-[#8C733E] flex items-center justify-center text-[#07130E] font-serif font-bold text-lg shadow-lg shadow-[#C5A869]/20 group-hover:scale-105 transition-transform">
              K
            </div>
            <div>
              <span className="font-serif tracking-[0.25em] text-stone-100 text-xs font-semibold block">
                KGM LIMITED
              </span>
              <span className="text-[10px] tracking-[0.2em] text-[#C5A869] uppercase font-mono font-medium">
                Studio OS v2.4
              </span>
            </div>
          </Link>

          {/* Studio Cluster Telemetry Badge */}
          <div className="mt-4 p-2.5 rounded-lg bg-stone-950/80 border border-stone-800/80 flex items-center justify-between text-[11px] font-mono">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span className="text-stone-300">GPU Cluster Active</span>
            </div>
            <span className="text-[#C5A869]">24 FPS DCI</span>
          </div>
        </div>

        {/* Global Search & Notifications Trigger */}
        <div className="p-3 border-b border-stone-800/80 flex items-center gap-2">
          <button
            onClick={() => setSearchOpen(!searchOpen)}
            className="flex-1 py-1.5 px-3 rounded-lg bg-stone-950/70 hover:bg-stone-950 border border-stone-800 text-stone-400 text-xs flex items-center justify-between transition-colors"
          >
            <span className="flex items-center gap-2">
              <Search className="w-3.5 h-3.5" />
              <span>Search Studio...</span>
            </span>
            <kbd className="text-[10px] font-mono bg-stone-900 px-1.5 py-0.5 rounded text-stone-500">⌘K</kbd>
          </button>
          <button
            onClick={() => setNotificationsOpen(!notificationsOpen)}
            className="p-2 rounded-lg bg-stone-950/70 hover:bg-stone-950 border border-stone-800 text-stone-400 hover:text-[#C5A869] relative transition-colors"
          >
            <Bell className="w-4 h-4" />
            <span className="w-2 h-2 rounded-full bg-[#C5A869] absolute top-1.5 right-1.5"></span>
          </button>
        </div>

        {/* Search Modal */}
        {searchOpen && (
          <div className="p-3 bg-stone-950 border-b border-stone-800">
            <input
              type="text"
              autoFocus
              placeholder="Search projects, scenes, properties..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-3 py-1.5 rounded bg-stone-900 border border-stone-700 text-xs text-stone-100 outline-none"
            />
            {searchQuery && (
              <div className="mt-2 text-[11px] space-y-1">
                <Link
                  href="/studio/projects/proj_kgm_riyadh_01"
                  onClick={() => setSearchOpen(false)}
                  className="block p-1.5 rounded hover:bg-stone-900 text-stone-300 hover:text-[#C5A869]"
                >
                  Villa Project #KGM-RUH-001 — Al-Malqa
                </Link>
                <Link
                  href="/studio/create"
                  onClick={() => setSearchOpen(false)}
                  className="block p-1.5 rounded hover:bg-stone-900 text-stone-300 hover:text-[#C5A869]"
                >
                  + Create New Film Project
                </Link>
              </div>
            )}
          </div>
        )}

        {/* Notification Drawer */}
        {notificationsOpen && (
          <div className="p-3 bg-stone-950 border-b border-stone-800 space-y-2">
            <div className="flex items-center justify-between text-xs text-stone-400 font-mono">
              <span>STUDIO NOTIFICATIONS</span>
              <button onClick={() => setNotificationsOpen(false)} className="text-stone-500 hover:text-white">✕</button>
            </div>
            {notifications.map((n) => (
              <div key={n.id} className="p-2 rounded bg-stone-900 border border-stone-800 text-xs">
                <p className="font-medium text-stone-200">{n.title}</p>
                <p className="text-[10px] text-stone-400 font-mono mt-0.5">{n.time}</p>
              </div>
            ))}
          </div>
        )}

        {/* Sidebar Nav Items */}
        <nav className="flex-1 p-3 space-y-5 overflow-y-auto">
          {navGroups.map((grp) => (
            <div key={grp.group} className="space-y-1">
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#C5A869]/70 px-3 block">
                {grp.group}
              </span>
              {grp.items.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-all group ${
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
                      <span>{item.label}</span>
                    </div>
                    {item.badge && (
                      <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-[#C5A869]/20 text-[#C5A869] font-semibold uppercase">
                        {item.badge}
                      </span>
                    )}
                  </Link>
                );
              })}
            </div>
          ))}
        </nav>

        {/* User Profile Bar & Switcher */}
        <div className="p-3 border-t border-stone-800/80 bg-stone-950/60">
          <div className="flex items-center justify-between p-2 rounded-lg bg-stone-900/70 border border-stone-800">
            <Link href="/studio/profile" className="flex items-center gap-2.5 min-w-0">
              <div className="w-8 h-8 rounded-full bg-[#0B2B20] border border-[#C5A869]/50 flex items-center justify-center text-xs font-serif text-[#C5A869] font-bold">
                {currentUser?.fullName?.charAt(0) || 'K'}
              </div>
              <div className="min-w-0">
                <p className="text-xs font-semibold text-stone-200 truncate">{currentUser?.fullName || 'Alexander Kurra'}</p>
                <p className="text-[10px] text-stone-400 font-mono truncate">{currentUser?.role || 'Executive'}</p>
              </div>
            </Link>
            <button
              onClick={handleLogout}
              title="Sign Out"
              className="p-1.5 text-stone-500 hover:text-rose-400 transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </aside>

      {/* Mobile Top Header */}
      <div className="md:hidden border-b border-stone-800 px-4 py-3 bg-[#091C14] flex items-center justify-between sticky top-0 z-50">
        <Link href="/studio" className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-[#C5A869] text-[#07130E] font-serif font-bold text-sm flex items-center justify-center">
            K
          </div>
          <span className="font-serif tracking-[0.2em] text-xs font-semibold text-stone-100">KGM STUDIO OS</span>
        </Link>
        <div className="flex items-center gap-2">
          <Link
            href="/studio/create"
            className="px-2.5 py-1 rounded bg-[#C5A869] text-[#07130E] text-xs font-semibold"
          >
            + Create
          </Link>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-stone-300"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#07130E] border-b border-stone-800 p-4 space-y-4 fixed top-12 left-0 right-0 z-50 max-h-[85vh] overflow-y-auto">
          {navGroups.map((grp) => (
            <div key={grp.group} className="space-y-1">
              <p className="text-[10px] font-mono text-[#C5A869] uppercase tracking-wider">{grp.group}</p>
              {grp.items.map((it) => (
                <Link
                  key={it.href}
                  href={it.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-3 py-2 rounded-lg text-xs text-stone-300 hover:bg-stone-900"
                >
                  {it.label}
                </Link>
              ))}
            </div>
          ))}
          <div className="pt-3 border-t border-stone-800 flex items-center justify-between">
            <Link href="/studio/profile" className="text-xs text-stone-300">
              Profile: {currentUser?.fullName}
            </Link>
            <button onClick={handleLogout} className="text-xs text-rose-400">
              Sign Out
            </button>
          </div>
        </div>
      )}

      {/* Main Production Workspace Content */}
      <main className="flex-1 flex flex-col min-w-0 bg-[#07130E] overflow-y-auto pb-16 md:pb-0">
        {children}
      </main>
    </div>
  );
}
