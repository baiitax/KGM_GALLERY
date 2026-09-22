'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ShieldCheck, Lock, Mail, ArrowRight, Sparkles, Building2, Eye, EyeOff, Film, KeyRound } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const quickCredentials = [
    {
      title: 'Executive Creative Director',
      name: 'Alexander Kurra',
      email: 'director@kgm-estates.com',
      pass: 'KGM@Director2026!',
      role: 'Super Admin',
      badge: 'Director Access',
    },
    {
      title: 'Senior Managing Partner',
      name: 'HRH Prince Faris Al Saud',
      email: 'faris.alsaud@kgm-estates.com',
      pass: 'RiyadhVIP#2026',
      role: 'Executive VIP',
      badge: 'Client & Board',
    },
    {
      title: 'Senior Film Producer',
      name: 'Marcus Vance',
      email: 'producer@kgm-estates.com',
      pass: 'StudioMaster$99',
      role: 'Producer',
      badge: 'Mastering & Queue',
    },
  ];

  const handleQuickFill = (cEmail: string, cPass: string) => {
    setEmail(cEmail);
    setPassword(cPass);
    setErrorMessage('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage('');
    setSuccessMessage('');

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, rememberMe }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Authentication failed. Please verify your credentials.');
      }

      setSuccessMessage('Credentials authorized. Entering KGM Studio OS...');
      setTimeout(() => {
        if (data.user && !data.user.onboardingCompleted) {
          router.push('/onboarding');
        } else {
          router.push('/studio');
        }
      }, 500);
    } catch (err: any) {
      setErrorMessage(err.message || 'An unexpected error occurred during authentication.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#07130E] text-stone-100 flex flex-col justify-between font-sans selection:bg-[#C5A869]/30">
      {/* Top Bar */}
      <header className="border-b border-stone-800/80 px-6 py-4 flex items-center justify-between backdrop-blur-md bg-[#07130E]/80 sticky top-0 z-50">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-[#C5A869] to-[#8C733E] flex items-center justify-center text-[#07130E] font-serif font-bold text-lg shadow-lg shadow-[#C5A869]/20 group-hover:scale-105 transition-transform">
            K
          </div>
          <div>
            <span className="font-serif tracking-[0.25em] text-stone-100 text-sm font-semibold block">KGM LIMITED</span>
            <span className="text-[10px] tracking-[0.2em] text-[#C5A869] uppercase font-medium">Cinematic Studio OS</span>
          </div>
        </Link>
        <div className="flex items-center gap-4 text-xs">
          <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950/60 border border-emerald-800/50 text-emerald-400 font-mono">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
            Private Edge Gateway Online
          </span>
          <Link
            href="/auth/invite"
            className="text-stone-400 hover:text-[#C5A869] transition-colors border-b border-transparent hover:border-[#C5A869] pb-0.5"
          >
            Request Access / Invite
          </Link>
        </div>
      </header>

      {/* Main Split-Screen Container */}
      <main className="flex-1 grid grid-cols-1 lg:grid-cols-12 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-10 gap-8 items-center">
        {/* Left Column: Cinematic Visual & Architectural Heritage */}
        <div className="lg:col-span-7 flex flex-col justify-center space-y-6">
          <div className="relative rounded-2xl overflow-hidden border border-stone-800/90 shadow-2xl bg-stone-900 group">
            {/* Visual Header / Cover Image */}
            <div className="relative h-64 sm:h-80 md:h-[420px] w-full overflow-hidden">
              <img
                src="/uploads/villa_01_hero_exterior.jpg"
                alt="KGM Sovereign Villa"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 brightness-90"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#07130E] via-transparent to-black/30"></div>
              <div className="absolute top-4 left-4">
                <span className="px-3 py-1 rounded bg-black/60 backdrop-blur-md border border-[#C5A869]/40 text-[#C5A869] text-xs font-mono font-medium tracking-wider flex items-center gap-2">
                  <Film className="w-3.5 h-3.5 text-[#C5A869]" />
                  10S ARCHITECTURAL CINEMA MASTER
                </span>
              </div>
              <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
                <div>
                  <p className="text-xs text-[#C5A869] font-mono tracking-widest uppercase">Proprietary Production Suite</p>
                  <h3 className="text-lg sm:text-2xl font-serif text-white font-medium">The Sovereign Villa — Al-Malqa</h3>
                  <p className="text-xs text-stone-300 font-light mt-0.5">Riyadh, Saudi Arabia • 4K ACES Master Pipeline</p>
                </div>
                <div className="hidden sm:block text-right text-xs font-mono text-stone-400">
                  <p>TRAJECTORY: Axial Push</p>
                  <p className="text-emerald-400">FPS: 24.000 DCI</p>
                </div>
              </div>
            </div>

            {/* Architectural Statement */}
            <div className="p-6 bg-[#0B2B20]/40 border-t border-stone-800/80 backdrop-blur-md">
              <div className="grid grid-cols-3 gap-4 text-center divide-x divide-stone-800/80">
                <div>
                  <p className="text-lg sm:text-xl font-serif text-[#C5A869]">10 Sec</p>
                  <p className="text-[11px] text-stone-400 uppercase tracking-wider mt-0.5">Cinema Standard</p>
                </div>
                <div>
                  <p className="text-lg sm:text-xl font-serif text-[#C5A869]">4-Format</p>
                  <p className="text-[11px] text-stone-400 uppercase tracking-wider mt-0.5">Synchronized Mastering</p>
                </div>
                <div>
                  <p className="text-lg sm:text-xl font-serif text-[#C5A869]">100%</p>
                  <p className="text-[11px] text-stone-400 uppercase tracking-wider mt-0.5">Geometric Fidelity</p>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Select Executive Credentials */}
          <div className="p-4 rounded-xl bg-stone-900/60 border border-stone-800/80">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-mono uppercase tracking-wider text-stone-400 flex items-center gap-1.5">
                <KeyRound className="w-3.5 h-3.5 text-[#C5A869]" />
                1-Click Executive Authentication
              </span>
              <span className="text-[10px] text-stone-500">Tap to load profile</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              {quickCredentials.map((cred) => (
                <button
                  key={cred.email}
                  type="button"
                  onClick={() => handleQuickFill(cred.email, cred.pass)}
                  className="p-2.5 rounded-lg bg-stone-950/80 hover:bg-[#0B2B20]/60 border border-stone-800 hover:border-[#C5A869]/50 text-left transition-all group"
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] font-mono text-[#C5A869] font-medium">{cred.badge}</span>
                  </div>
                  <p className="text-xs font-semibold text-stone-200 group-hover:text-white truncate">{cred.name}</p>
                  <p className="text-[10px] text-stone-400 truncate">{cred.email}</p>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Authentication Panel */}
        <div className="lg:col-span-5 w-full">
          <div className="bg-[#0C1E17]/80 border border-stone-800/90 rounded-2xl p-6 sm:p-8 backdrop-blur-xl shadow-2xl relative overflow-hidden">
            {/* Top gold accent line */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#C5A869] to-transparent"></div>

            <div className="mb-6">
              <span className="text-xs font-mono uppercase tracking-widest text-[#C5A869] font-medium flex items-center gap-1.5 mb-2">
                <ShieldCheck className="w-4 h-4 text-[#C5A869]" />
                KGM Private Network
              </span>
              <h1 className="text-2xl sm:text-3xl font-serif font-medium text-white tracking-tight">Welcome Back</h1>
              <p className="text-xs sm:text-sm text-stone-400 mt-1.5 leading-relaxed font-light">
                Enter the KGM Cinematic Studio to continue your production workflow.
              </p>
            </div>

            {errorMessage && (
              <div className="mb-5 p-3.5 rounded-lg bg-rose-950/60 border border-rose-800/70 text-rose-200 text-xs flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-rose-400 mt-1.5 flex-shrink-0"></span>
                <span>{errorMessage}</span>
              </div>
            )}

            {successMessage && (
              <div className="mb-5 p-3.5 rounded-lg bg-emerald-950/60 border border-emerald-800/70 text-emerald-200 text-xs flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5 flex-shrink-0 animate-ping"></span>
                <span>{successMessage}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-stone-300 uppercase tracking-wider mb-1.5">
                  Work Email
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-stone-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="director@kgm-estates.com"
                    className="w-full pl-10 pr-4 py-3 rounded-lg bg-stone-950/80 border border-stone-800 focus:border-[#C5A869] focus:ring-1 focus:ring-[#C5A869] text-stone-100 placeholder-stone-600 text-sm outline-none transition-all"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-xs font-medium text-stone-300 uppercase tracking-wider">
                    Password
                  </label>
                  <Link
                    href="/auth/forgot-password"
                    className="text-[11px] text-[#C5A869] hover:underline"
                  >
                    Forgot password?
                  </Link>
                </div>
                <div className="relative">
                  <Lock className="w-4 h-4 text-stone-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••••••"
                    className="w-full pl-10 pr-10 py-3 rounded-lg bg-stone-950/80 border border-stone-800 focus:border-[#C5A869] focus:ring-1 focus:ring-[#C5A869] text-stone-100 placeholder-stone-600 text-sm outline-none transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-stone-500 hover:text-stone-300 text-xs"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between pt-1">
                <label className="flex items-center gap-2 cursor-pointer text-xs text-stone-400 select-none">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-4 h-4 rounded bg-stone-950 border-stone-800 text-[#C5A869] focus:ring-0 focus:ring-offset-0 cursor-pointer"
                  />
                  Remember this device
                </label>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3.5 px-6 rounded-lg bg-gradient-to-r from-[#C5A869] to-[#9E8345] hover:from-[#D8BC7D] hover:to-[#B09351] text-[#07130E] font-semibold text-sm tracking-wider uppercase flex items-center justify-center gap-2 shadow-lg shadow-[#C5A869]/20 hover:shadow-[#C5A869]/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer font-sans mt-2"
              >
                {isLoading ? (
                  <>
                    <span className="w-4 h-4 border-2 border-[#07130E] border-t-transparent rounded-full animate-spin"></span>
                    <span>Authorizing Session...</span>
                  </>
                ) : (
                  <>
                    <span>SIGN IN</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>

            <div className="relative my-6 text-center">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-stone-800"></div>
              </div>
              <span className="relative bg-[#0C1E17] px-3 text-[11px] font-mono text-stone-500 uppercase tracking-widest">
                Enterprise Single Sign-On
              </span>
            </div>

            <button
              type="button"
              onClick={() => {
                handleQuickFill('faris.alsaud@kgm-estates.com', 'RiyadhVIP#2026');
              }}
              className="w-full py-2.5 px-4 rounded-lg bg-stone-900/90 hover:bg-stone-850 border border-stone-800 text-stone-300 text-xs font-medium flex items-center justify-center gap-2 transition-all hover:border-stone-700"
            >
              <Building2 className="w-4 h-4 text-stone-400" />
              <span>Continue with Organization SSO (KGM Okta / Azure AD)</span>
            </button>

            <div className="mt-6 pt-5 border-t border-stone-800/80 flex items-center justify-between text-xs text-stone-400">
              <span>Have an invitation token?</span>
              <Link href="/auth/register" className="text-[#C5A869] hover:underline font-medium">
                Activate Studio Account →
              </Link>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-stone-800/80 px-6 py-4 text-center text-xs text-stone-500 backdrop-blur-md bg-[#07130E]/80">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="font-mono text-[11px] tracking-wider text-stone-400">
            KGM CINEMATIC STUDIO OS • PRIVATE PRODUCTION ENVIRONMENT
          </p>
          <p className="text-[11px] text-stone-600">
            © 2026 Kurra Greenfield Merchants Limited. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
