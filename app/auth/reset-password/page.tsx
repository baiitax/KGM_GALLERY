'use client';

import React, { useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Lock, ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react';

function ResetPasswordForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get('token') || '';

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage('');

    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match.');
      setIsLoading(false);
      return;
    }

    if (password.length < 8) {
      setErrorMessage('Password must be at least 8 characters long.');
      setIsLoading(false);
      return;
    }

    try {
      const res = await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token: token || 'manual_reset', password }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Failed to update password.');
      }

      setIsSuccess(true);
    } catch (err: any) {
      setErrorMessage(err.message || 'An error occurred.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-[#0C1E17]/80 border border-stone-800/90 rounded-2xl p-6 sm:p-8 backdrop-blur-xl shadow-2xl relative">
      <div className="w-12 h-12 rounded-xl bg-[#0B2B20] border border-[#C5A869]/40 flex items-center justify-center mx-auto mb-4 text-[#C5A869]">
        <Lock className="w-6 h-6" />
      </div>

      <span className="text-xs font-mono uppercase tracking-widest text-[#C5A869] font-medium block text-center mb-1">
        Access Security
      </span>
      <h1 className="text-2xl font-serif font-medium text-white tracking-tight text-center mb-2">
        Update Studio Password
      </h1>
      <p className="text-xs text-stone-400 font-light leading-relaxed text-center mb-6">
        Enter your new private master password to restore access to KGM Studio OS.
      </p>

      {errorMessage && (
        <div className="mb-5 p-3 rounded-lg bg-rose-950/60 border border-rose-800 text-rose-200 text-xs">
          {errorMessage}
        </div>
      )}

      {isSuccess ? (
        <div className="space-y-4 text-center">
          <div className="p-4 rounded-xl bg-emerald-950/70 border border-emerald-800 text-emerald-100 text-xs flex items-center gap-2 text-left">
            <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
            <span>Password updated successfully. You can now authenticate with your new credentials.</span>
          </div>
          <Link
            href="/auth/login"
            className="w-full py-3.5 px-6 rounded-lg bg-[#C5A869] hover:bg-[#D8BC7D] text-[#07130E] font-semibold text-xs tracking-widest uppercase flex items-center justify-center gap-2"
          >
            RETURN TO STUDIO LOGIN <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      ) : (
        <form onSubmit={handleReset} className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-stone-300 uppercase tracking-wider mb-1.5">
              New Password
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Min. 8 characters"
              className="w-full px-3.5 py-2.5 rounded-lg bg-stone-950/80 border border-stone-800 focus:border-[#C5A869] text-stone-100 text-sm outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-stone-300 uppercase tracking-wider mb-1.5">
              Confirm New Password
            </label>
            <input
              type="password"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm new password"
              className="w-full px-3.5 py-2.5 rounded-lg bg-stone-950/80 border border-stone-800 focus:border-[#C5A869] text-stone-100 text-sm outline-none"
            />
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3.5 px-6 rounded-lg bg-gradient-to-r from-[#C5A869] to-[#9E8345] hover:from-[#D8BC7D] text-[#07130E] font-semibold text-xs tracking-widest uppercase flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-[#C5A869]/20"
            >
              {isLoading ? 'Updating...' : 'UPDATE PASSWORD'}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}

export default function ResetPasswordPage() {
  return (
    <div className="min-h-screen bg-[#07130E] text-stone-100 flex flex-col justify-between font-sans selection:bg-[#C5A869]/30">
      <header className="border-b border-stone-800/80 px-6 py-4 flex items-center justify-between backdrop-blur-md bg-[#07130E]/80">
        <Link href="/" className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-[#C5A869] to-[#8C733E] flex items-center justify-center text-[#07130E] font-serif font-bold text-lg">
            K
          </div>
          <div>
            <span className="font-serif tracking-[0.25em] text-stone-100 text-sm font-semibold block">KGM LIMITED</span>
            <span className="text-[10px] tracking-[0.2em] text-[#C5A869] uppercase font-medium">Security Credential Update</span>
          </div>
        </Link>
      </header>

      <main className="max-w-md w-full mx-auto p-4 sm:p-6 my-auto">
        <Suspense fallback={<div className="text-center text-stone-400 font-mono text-xs">Verifying Reset Token...</div>}>
          <ResetPasswordForm />
        </Suspense>
      </main>

      <footer className="border-t border-stone-800/80 px-6 py-4 text-center text-xs text-stone-500">
        KGM CINEMATIC STUDIO OS • SECURITY ACCESS
      </footer>
    </div>
  );
}
