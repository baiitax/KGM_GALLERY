import type { Metadata } from 'next';
import Link from 'next/link';
import localFont from 'next/font/local';
import { Film, Sparkles, Layers, Activity, Building2, Music, Sliders, ShieldCheck, Share2 } from 'lucide-react';
import MobileBottomNav from './components/MobileBottomNav';
import './globals.css';

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
});
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
});

export const metadata: Metadata = {
  title: 'KGM Studio — Cinematic Property Marketing Studio',
  description: 'Ultra-luxury real estate cinema engine for Kurra Greenfield Merchants Limited (KGM Limited)',
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: 'cover',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#07130E] text-white min-h-screen flex flex-col`}>
        {/* Global Luxury Top Navigation Bar (Desktop & Tablet) */}
        <header className="bg-[#0B2319] border-b border-[#1A3D2F] px-4 md:px-8 py-3 sticky top-0 z-40 backdrop-blur-md bg-opacity-95">
          <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#C5A869] to-[#997F46] p-0.5 flex items-center justify-center shadow-lg shadow-[#C5A869]/20 group-hover:scale-105 transition shrink-0">
                <div className="w-full h-full bg-[#0B2B20] rounded-[6px] flex items-center justify-center">
                  <span className="font-serif font-bold text-[#C5A869] text-sm">K</span>
                </div>
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="font-serif font-bold text-sm tracking-wide text-[#F4EBD9] group-hover:text-[#C5A869] transition">
                    KGM STUDIO
                  </span>
                  <span className="text-[10px] font-mono text-[#C5A869] px-1.5 py-0.2 bg-[#124232] rounded border border-[#C5A869]/30">
                    CINEMA
                  </span>
                </div>
                <div className="text-[9px] uppercase tracking-widest text-zinc-400">Kurra Greenfield Merchants</div>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-1 text-xs font-medium text-zinc-300">
              <Link
                href="/"
                className="px-3 py-1.5 rounded-lg hover:bg-[#124232] hover:text-[#C5A869] transition flex items-center gap-1.5"
              >
                <Film className="w-3.5 h-3.5 text-[#C5A869]" />
                <span>Studio</span>
              </Link>
              <Link
                href="/projects"
                className="px-3 py-1.5 rounded-lg hover:bg-[#124232] hover:text-[#C5A869] transition flex items-center gap-1.5"
              >
                <span>Projects</span>
              </Link>
              <Link
                href="/queue"
                className="px-3 py-1.5 rounded-lg hover:bg-[#124232] hover:text-[#C5A869] transition flex items-center gap-1.5"
              >
                <Activity className="w-3.5 h-3.5 text-[#C5A869]" />
                <span>GPU Queue</span>
              </Link>
              <Link
                href="/properties"
                className="px-3 py-1.5 rounded-lg hover:bg-[#124232] hover:text-[#C5A869] transition flex items-center gap-1.5"
              >
                <Building2 className="w-3.5 h-3.5 text-[#C5A869]" />
                <span>Properties</span>
              </Link>
              <Link
                href="/templates"
                className="px-3 py-1.5 rounded-lg hover:bg-[#124232] hover:text-[#C5A869] transition flex items-center gap-1.5"
              >
                <Layers className="w-3.5 h-3.5 text-[#C5A869]" />
                <span>Templates</span>
              </Link>
              <Link
                href="/media"
                className="px-3 py-1.5 rounded-lg hover:bg-[#124232] hover:text-[#C5A869] transition flex items-center gap-1.5"
              >
                <Music className="w-3.5 h-3.5 text-[#C5A869]" />
                <span>Audio</span>
              </Link>
              <Link
                href="/brand"
                className="px-3 py-1.5 rounded-lg hover:bg-[#124232] hover:text-[#C5A869] transition flex items-center gap-1.5"
              >
                <Sliders className="w-3.5 h-3.5 text-[#C5A869]" />
                <span>Brand</span>
              </Link>
              <Link
                href="/admin"
                className="px-3 py-1.5 rounded-lg hover:bg-[#124232] hover:text-[#C5A869] transition flex items-center gap-1.5"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-[#C5A869]" />
                <span>Admin</span>
              </Link>
            </nav>

            {/* Public Portal Shortcut */}
            <div className="flex items-center gap-2">
              <Link
                href="/film/kgm-film-royal-villa-riyadh"
                target="_blank"
                className="flex items-center gap-1.5 bg-[#124232] hover:bg-[#1A5C46] text-[#C5A869] border border-[#C5A869]/40 px-3 py-1.5 rounded-lg text-xs font-semibold transition"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>VIP Client View</span>
              </Link>
            </div>
          </div>
        </header>

        {/* Page Content with safe padding for Mobile Bottom Bar */}
        <main className="flex-1 pb-24 lg:pb-0">{children}</main>

        {/* Dedicated Mobile Phone Bottom Navigation Bar */}
        <MobileBottomNav />
      </body>
    </html>
  );
}
