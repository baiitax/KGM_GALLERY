'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { ShieldCheck, Lock, Mail, User, Building, ArrowRight, CheckCircle2, Sparkles, Key } from 'lucide-react';
import { UserRole } from '@/lib/auth/session';

function RegisterForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const tokenParam = searchParams.get('token') || '';

  const [invitationToken, setInvitationToken] = useState(tokenParam);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [organization, setOrganization] = useState('Kurra Greenfield Merchants Limited');
  const [role, setRole] = useState<UserRole>('producer');
  const [department, setDepartment] = useState('Production Operations');
  const [isLoading, setIsLoading] = useState(false);
  const [tokenVerified, setTokenVerified] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    if (tokenParam) {
      fetchInvitation(tokenParam);
    }
  }, [tokenParam]);

  const fetchInvitation = async (tok: string) => {
    try {
      const res = await fetch(`/api/auth/invite?token=${tok}`);
      const data = await res.json();
      if (data.success && data.invitation) {
        setFullName(data.invitation.fullName);
        setEmail(data.invitation.email);
        setRole(data.invitation.role);
        setDepartment(data.invitation.department);
        setTokenVerified(true);
      } else {
        setErrorMessage(data.error || 'Invalid or expired invitation token.');
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage('');
    setSuccessMessage('');

    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match. Please verify your input.');
      setIsLoading(false);
      return;
    }

    if (password.length < 8) {
      setErrorMessage('Password must be at least 8 characters long.');
      setIsLoading(false);
      return;
    }

    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName,
          email,
          password,
          role,
          department,
          organization,
          invitationToken,
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Failed to create studio account.');
      }

      setSuccessMessage('Account activated. Directing to onboarding sequence...');
      setTimeout(() => {
        router.push('/onboarding');
      }, 700);
    } catch (err: any) {
      setErrorMessage(err.message || 'An error occurred during account registration.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-[#0C1E17]/80 border border-stone-800/90 rounded-2xl p-6 sm:p-8 backdrop-blur-xl shadow-2xl relative">
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#C5A869] to-transparent"></div>

      <div className="mb-6">
        <span className="text-xs font-mono uppercase tracking-widest text-[#C5A869] font-medium flex items-center gap-1.5 mb-2">
          <ShieldCheck className="w-4 h-4 text-[#C5A869]" />
          Studio Registration
        </span>
        <h1 className="text-2xl sm:text-3xl font-serif font-medium text-white tracking-tight">
          Activate Studio Account
        </h1>
        <p className="text-xs sm:text-sm text-stone-400 mt-1.5 font-light">
          Complete your cryptographic identity verification to join KGM’s private cinematic production environment.
        </p>
      </div>

      {tokenVerified && (
        <div className="mb-5 p-3 rounded-lg bg-emerald-950/60 border border-emerald-800/70 text-emerald-200 text-xs flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
          <span>Invitation token validated for <strong>{fullName}</strong>.</span>
        </div>
      )}

      {errorMessage && (
        <div className="mb-5 p-3.5 rounded-lg bg-rose-950/60 border border-rose-800/70 text-rose-200 text-xs">
          {errorMessage}
        </div>
      )}

      {successMessage && (
        <div className="mb-5 p-3.5 rounded-lg bg-emerald-950/60 border border-emerald-800/70 text-emerald-200 text-xs flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-emerald-400 animate-spin" />
          <span>{successMessage}</span>
        </div>
      )}

      <form onSubmit={handleRegister} className="space-y-4">
        {!tokenVerified && (
          <div>
            <label className="block text-xs font-medium text-stone-300 uppercase tracking-wider mb-1.5">
              Invitation Token (Optional / Demo Enabled)
            </label>
            <div className="relative">
              <Key className="w-4 h-4 text-stone-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={invitationToken}
                onChange={(e) => setInvitationToken(e.target.value)}
                placeholder="inv_tok_vip_riyadh_2026 (or leave blank to create custom account)"
                className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-stone-950/80 border border-stone-800 focus:border-[#C5A869] text-stone-100 text-xs outline-none font-mono"
              />
            </div>
          </div>
        )}

        <div>
          <label className="block text-xs font-medium text-stone-300 uppercase tracking-wider mb-1.5">
            Full Name
          </label>
          <div className="relative">
            <User className="w-4 h-4 text-stone-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              required
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="e.g. Tariq Mansoor"
              className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-stone-950/80 border border-stone-800 focus:border-[#C5A869] text-stone-100 text-sm outline-none"
            />
          </div>
        </div>

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
              placeholder="name@kgm-estates.com"
              className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-stone-950/80 border border-stone-800 focus:border-[#C5A869] text-stone-100 text-sm outline-none"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-medium text-stone-300 uppercase tracking-wider mb-1.5">
              Production Role
            </label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value as UserRole)}
              className="w-full px-3.5 py-2.5 rounded-lg bg-stone-950 border border-stone-800 text-stone-100 text-sm outline-none focus:border-[#C5A869]"
            >
              <option value="producer">Cinematic Producer</option>
              <option value="creative_director">Creative Director</option>
              <option value="editor">Video Editor</option>
              <option value="media_specialist">Property Media Specialist</option>
              <option value="marketing">Real Estate Marketing</option>
              <option value="client_relations">Client Relations</option>
              <option value="reviewer">Reviewer / Client</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-medium text-stone-300 uppercase tracking-wider mb-1.5">
              Organization
            </label>
            <div className="relative">
              <Building className="w-4 h-4 text-stone-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={organization}
                onChange={(e) => setOrganization(e.target.value)}
                placeholder="Kurra Greenfield Merchants Limited"
                className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-stone-950/80 border border-stone-800 focus:border-[#C5A869] text-stone-100 text-sm outline-none"
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-medium text-stone-300 uppercase tracking-wider mb-1.5">
              Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-stone-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Min. 8 characters"
                className="w-full px-3.5 py-2.5 rounded-lg bg-stone-950/80 border border-stone-800 focus:border-[#C5A869] text-stone-100 text-sm outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-stone-300 uppercase tracking-wider mb-1.5">
              Confirm Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-stone-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Repeat password"
                className="w-full px-3.5 py-2.5 rounded-lg bg-stone-950/80 border border-stone-800 focus:border-[#C5A869] text-stone-100 text-sm outline-none"
              />
            </div>
          </div>
        </div>

        <div className="pt-3">
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3.5 px-6 rounded-lg bg-gradient-to-r from-[#C5A869] to-[#9E8345] hover:from-[#D8BC7D] hover:to-[#B09351] text-[#07130E] font-semibold text-xs tracking-widest uppercase flex items-center justify-center gap-2 shadow-lg shadow-[#C5A869]/20 transition-all cursor-pointer"
          >
            {isLoading ? (
              <span>Registering Identity...</span>
            ) : (
              <>
                <span>ACTIVATE STUDIO ACCOUNT</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </div>
      </form>

      <div className="mt-6 pt-5 border-t border-stone-800/80 text-center text-xs text-stone-400">
        <span>Already have an account? </span>
        <Link href="/auth/login" className="text-[#C5A869] hover:underline font-medium">
          Sign In to Studio OS →
        </Link>
      </div>
    </div>
  );
}

export default function RegisterPage() {
  return (
    <div className="min-h-screen bg-[#07130E] text-stone-100 flex flex-col justify-between font-sans selection:bg-[#C5A869]/30">
      <header className="border-b border-stone-800/80 px-6 py-4 flex items-center justify-between backdrop-blur-md bg-[#07130E]/80 sticky top-0 z-50">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-[#C5A869] to-[#8C733E] flex items-center justify-center text-[#07130E] font-serif font-bold text-lg shadow-lg shadow-[#C5A869]/20 group-hover:scale-105 transition-transform">
            K
          </div>
          <div>
            <span className="font-serif tracking-[0.25em] text-stone-100 text-sm font-semibold block">KGM LIMITED</span>
            <span className="text-[10px] tracking-[0.2em] text-[#C5A869] uppercase font-medium">Account Activation</span>
          </div>
        </Link>
        <Link href="/auth/login" className="text-xs text-stone-400 hover:text-[#C5A869] transition-colors">
          Already have an account? Sign In →
        </Link>
      </header>

      <main className="max-w-xl w-full mx-auto p-4 sm:p-6 lg:p-8 my-auto">
        <Suspense fallback={<div className="text-center text-stone-400 font-mono text-xs">Loading Studio Portal...</div>}>
          <RegisterForm />
        </Suspense>
      </main>

      <footer className="border-t border-stone-800/80 px-6 py-4 text-center text-xs text-stone-500">
        KGM CINEMATIC STUDIO OS • SECURE IDENTITY & ACCESS
      </footer>
    </div>
  );
}
