'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { 
  Lock, Mail, Key, ShieldCheck, ArrowRight, UserCheck, 
  Sparkles, CheckCircle2, AlertCircle, Building2
} from 'lucide-react';

const TEST_CREDENTIALS = [
  {
    title: 'Executive Creative Director',
    email: 'director@kgm-estates.com',
    pass: 'KGM@Director2026!',
    name: 'Alexander Kurra',
    role: 'Super Admin',
  },
  {
    title: 'Senior Managing Partner',
    email: 'faris.alsaud@kgm-estates.com',
    pass: 'RiyadhVIP#2026',
    name: 'Faris Al-Saud',
    role: 'Agency Admin',
  },
  {
    title: 'Senior Film Producer',
    email: 'producer@kgm-estates.com',
    pass: 'StudioMaster$99',
    name: 'Elena Vance',
    role: 'Producer',
  },
];

export default function LoginPage() {
  const router = useRouter();
  const [mode, setMode] = useState<'login' | 'signup'>('login');
  const [email, setEmail] = useState('director@kgm-estates.com');
  const [password, setPassword] = useState('KGM@Director2026!');
  const [fullName, setFullName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const endpoint = mode === 'login' ? '/api/auth/login' : '/api/auth/signup';
      const body = mode === 'login' 
        ? { email, password }
        : { email, password, fullName, role: 'producer' };

      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      const data = await res.json();
      if (!data.success) {
        setError(data.error || 'Authentication failed. Please verify your credentials.');
      } else {
        setSuccess(`Welcome back, ${data.user.fullName}. Entering KGM Studio...`);
        localStorage.setItem('kgm_active_user', JSON.stringify(data.user));
        setTimeout(() => {
          router.push('/');
        }, 800);
      }
    } catch (err: any) {
      setError(err.message || 'Network error occurred.');
    } finally {
      setLoading(false);
    }
  };

  const handleQuickSelect = (cred: typeof TEST_CREDENTIALS[0]) => {
    setEmail(cred.email);
    setPassword(cred.pass);
    setError(null);
  };

  return (
    <div className="min-h-screen bg-[#07130E] text-white flex flex-col items-center justify-center p-4 sm:p-6 selection:bg-[#C5A869] selection:text-[#0B2B20]">
      <div className="w-full max-w-md space-y-6">
        {/* Brand Header */}
        <div className="text-center space-y-3">
          <Link href="/" className="inline-flex items-center gap-3 group">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#C5A869] to-[#997F46] p-0.5 flex items-center justify-center shadow-xl shadow-[#C5A869]/20 group-hover:scale-105 transition">
              <div className="w-full h-full bg-[#0B2B20] rounded-[14px] flex items-center justify-center">
                <span className="font-serif font-bold text-[#C5A869] text-xl">K</span>
              </div>
            </div>
          </Link>

          <div>
            <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#F4EBD9]">
              KGM Studio Login
            </h1>
            <p className="text-xs text-zinc-400 mt-1">
              Kurra Greenfield Merchants Limited • Private Client Real Estate Cinema
            </p>
          </div>
        </div>

        {/* Auth Card */}
        <div className="bg-[#0B2319] border border-[#C5A869]/30 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-5">
          {/* Mode Switcher */}
          <div className="flex items-center gap-1 bg-[#071710] p-1 rounded-xl border border-[#1A3D2F]">
            <button
              onClick={() => { setMode('login'); setError(null); }}
              className={`flex-1 py-2 rounded-lg text-xs font-semibold transition ${
                mode === 'login' ? 'bg-[#C5A869] text-[#0B2B20] shadow' : 'text-zinc-400 hover:text-white'
              }`}
            >
              Sign In
            </button>
            <button
              onClick={() => { setMode('signup'); setError(null); }}
              className={`flex-1 py-2 rounded-lg text-xs font-semibold transition ${
                mode === 'signup' ? 'bg-[#C5A869] text-[#0B2B20] shadow' : 'text-zinc-400 hover:text-white'
              }`}
            >
              New Account
            </button>
          </div>

          {error && (
            <div className="p-3 bg-red-950/80 border border-red-500/50 rounded-xl flex items-center gap-2 text-red-300 text-xs">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {success && (
            <div className="p-3 bg-emerald-950/80 border border-emerald-500/50 rounded-xl flex items-center gap-2 text-emerald-300 text-xs">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>{success}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === 'signup' && (
              <div>
                <label className="block text-[11px] font-semibold text-zinc-300 uppercase tracking-wider mb-1">
                  Full Name & Title
                </label>
                <div className="relative">
                  <UserCheck className="w-4 h-4 absolute left-3 top-3 text-zinc-500" />
                  <input
                    type="text"
                    required
                    placeholder="e.g. Tariq Mansoor"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full bg-[#071710] border border-[#1A3D2F] rounded-xl pl-9 pr-3 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-[#C5A869]"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-[11px] font-semibold text-zinc-300 uppercase tracking-wider mb-1">
                KGM Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 absolute left-3 top-3 text-zinc-500" />
                <input
                  type="email"
                  required
                  placeholder="director@kgm-estates.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-[#071710] border border-[#1A3D2F] rounded-xl pl-9 pr-3 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-[#C5A869]"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-zinc-300 uppercase tracking-wider mb-1">
                Password
              </label>
              <div className="relative">
                <Key className="w-4 h-4 absolute left-3 top-3 text-zinc-500" />
                <input
                  type="password"
                  required
                  placeholder="••••••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-[#071710] border border-[#1A3D2F] rounded-xl pl-9 pr-3 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-[#C5A869]"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-[#C5A869] to-[#DFCA95] text-[#0B2B20] py-3 rounded-xl text-xs sm:text-sm font-bold hover:brightness-110 transition shadow-lg shadow-[#C5A869]/20 flex items-center justify-center gap-2 disabled:opacity-50"
            >
              <span>{loading ? 'Authenticating...' : mode === 'login' ? 'Sign In to Studio' : 'Create Account'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Quick Select Preset Credentials */}
          <div className="pt-3 border-t border-[#1A3D2F]/60 space-y-2">
            <div className="text-[10px] uppercase tracking-wider text-zinc-400 font-mono text-center">
              Verified Executive Profiles (1-Click Fill)
            </div>

            <div className="space-y-1.5">
              {TEST_CREDENTIALS.map((cred) => (
                <button
                  key={cred.email}
                  type="button"
                  onClick={() => handleQuickSelect(cred)}
                  className="w-full p-2.5 bg-[#071710] hover:bg-[#124232] border border-[#1A3D2F] hover:border-[#C5A869]/50 rounded-xl text-left text-xs transition flex items-center justify-between"
                >
                  <div>
                    <div className="font-semibold text-[#F4EBD9]">{cred.name}</div>
                    <div className="text-[10px] text-zinc-400">{cred.title} • <code className="text-[#C5A869]">{cred.email}</code></div>
                  </div>
                  <span className="text-[9px] font-mono text-[#C5A869] bg-[#0B2319] px-2 py-0.5 rounded border border-[#C5A869]/30">
                    Use
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="text-center text-[11px] text-zinc-500">
          AES-256 GCM Encrypted Session • Kurra Greenfield Merchants Limited © 2026
        </div>
      </div>
    </div>
  );
}
