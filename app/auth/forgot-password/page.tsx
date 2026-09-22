'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { KeyRound, Mail, ArrowRight, ArrowLeft } from 'lucide-react';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [tokenPreview, setTokenPreview] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage('');

    try {
      const res = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();
      setSubmitted(true);
      if (data.tokenPreview) {
        setTokenPreview(data.tokenPreview);
      }
    } catch (err: any) {
      setErrorMessage(err.message || 'An error occurred.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#07130E] text-stone-100 flex flex-col justify-between font-sans selection:bg-[#C5A869]/30">
      <header className="border-b border-stone-800/80 px-6 py-4 flex items-center justify-between backdrop-blur-md bg-[#07130E]/80">
        <Link href="/" className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-[#C5A869] to-[#8C733E] flex items-center justify-center text-[#07130E] font-serif font-bold text-lg">
            K
          </div>
          <div>
            <span className="font-serif tracking-[0.25em] text-stone-100 text-sm font-semibold block">KGM LIMITED</span>
            <span className="text-[10px] tracking-[0.2em] text-[#C5A869] uppercase font-medium">Access Recovery</span>
          </div>
        </Link>
        <Link href="/auth/login" className="text-xs text-stone-400 hover:text-[#C5A869] flex items-center gap-1">
          <ArrowLeft className="w-3.5 h-3.5" /> Return to Login
        </Link>
      </header>

      <main className="max-w-md w-full mx-auto p-4 sm:p-6 my-auto">
        <div className="bg-[#0C1E17]/80 border border-stone-800/90 rounded-2xl p-6 sm:p-8 backdrop-blur-xl shadow-2xl relative">
          <div className="w-12 h-12 rounded-xl bg-[#0B2B20] border border-[#C5A869]/40 flex items-center justify-center mx-auto mb-4 text-[#C5A869]">
            <KeyRound className="w-6 h-6" />
          </div>

          <span className="text-xs font-mono uppercase tracking-widest text-[#C5A869] font-medium block text-center mb-1">
            Access Recovery
          </span>
          <h1 className="text-2xl font-serif font-medium text-white tracking-tight text-center mb-2">
            Reset Studio Access
          </h1>
          <p className="text-xs text-stone-400 font-light leading-relaxed text-center mb-6">
            Enter your authorized studio email to receive an identity recovery link.
          </p>

          {errorMessage && (
            <div className="mb-5 p-3 rounded-lg bg-rose-950/60 border border-rose-800 text-rose-200 text-xs">
              {errorMessage}
            </div>
          )}

          {submitted ? (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-emerald-950/70 border border-emerald-800 text-emerald-100 text-xs leading-relaxed">
                If an authorized studio account matches <strong className="text-white">{email}</strong>, recovery instructions have been dispatched.
              </div>

              {tokenPreview && (
                <div className="p-3 bg-stone-950 border border-stone-800 rounded-lg">
                  <p className="text-[10px] font-mono text-stone-400 mb-1">DEMO DIRECT RESET LINK:</p>
                  <Link
                    href={`/auth/reset-password?token=${tokenPreview}`}
                    className="text-xs text-[#C5A869] hover:underline font-mono break-all"
                  >
                    /auth/reset-password?token={tokenPreview}
                  </Link>
                </div>
              )}

              <Link
                href="/auth/login"
                className="w-full py-3 px-6 rounded-lg bg-stone-900 border border-stone-800 text-stone-300 text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-stone-800"
              >
                <ArrowLeft className="w-4 h-4" /> Return to Login
              </Link>
            </div>
          ) : (
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
                    className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-stone-950/80 border border-stone-800 focus:border-[#C5A869] text-stone-100 text-sm outline-none"
                  />
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3.5 px-6 rounded-lg bg-gradient-to-r from-[#C5A869] to-[#9E8345] hover:from-[#D8BC7D] text-[#07130E] font-semibold text-xs tracking-widest uppercase flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-[#C5A869]/20"
                >
                  {isLoading ? 'Dispatching...' : 'SEND RESET LINK'}
                </button>
              </div>
            </form>
          )}
        </div>
      </main>

      <footer className="border-t border-stone-800/80 px-6 py-4 text-center text-xs text-stone-500">
        KGM CINEMATIC STUDIO OS • SECURITY ACCESS
      </footer>
    </div>
  );
}
