'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ShieldCheck, MailCheck, RotateCcw, ArrowRight, ArrowLeft } from 'lucide-react';

export default function VerifyPage() {
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage('');
    setMessage('');

    try {
      const res = await fetch('/api/auth/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, code }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Verification failed.');
      }

      setIsSuccess(true);
      setMessage('Identity verified. Your account is active.');
    } catch (err: any) {
      setErrorMessage(err.message || 'Verification could not be completed.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleResend = async () => {
    if (!email) {
      setErrorMessage('Please enter your work email first.');
      return;
    }
    try {
      const res = await fetch('/api/auth/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, action: 'resend' }),
      });
      const data = await res.json();
      if (data.success) {
        setMessage(`New code generated: ${data.codePreview || 'sent to inbox'}`);
      }
    } catch (e: any) {
      setErrorMessage(e.message);
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
            <span className="text-[10px] tracking-[0.2em] text-[#C5A869] uppercase font-medium">Security Verification</span>
          </div>
        </Link>
        <Link href="/auth/login" className="text-xs text-stone-400 hover:text-[#C5A869] flex items-center gap-1">
          <ArrowLeft className="w-3.5 h-3.5" /> Return to Login
        </Link>
      </header>

      <main className="max-w-md w-full mx-auto p-4 sm:p-6 my-auto">
        <div className="bg-[#0C1E17]/80 border border-stone-800/90 rounded-2xl p-6 sm:p-8 backdrop-blur-xl shadow-2xl relative text-center">
          <div className="w-12 h-12 rounded-xl bg-[#0B2B20] border border-[#C5A869]/40 flex items-center justify-center mx-auto mb-4 text-[#C5A869]">
            <MailCheck className="w-6 h-6" />
          </div>

          <span className="text-xs font-mono uppercase tracking-widest text-[#C5A869] font-medium block mb-1">
            Studio Identity Check
          </span>
          <h1 className="text-2xl font-serif font-medium text-white tracking-tight mb-2">
            Verify Your Studio Account
          </h1>
          <p className="text-xs text-stone-400 font-light leading-relaxed mb-6">
            Check your email to verify your identity and activate your KGM Cinematic Studio access.
          </p>

          {errorMessage && (
            <div className="mb-5 p-3 rounded-lg bg-rose-950/60 border border-rose-800 text-rose-200 text-xs">
              {errorMessage}
            </div>
          )}

          {message && (
            <div className="mb-5 p-3 rounded-lg bg-emerald-950/60 border border-emerald-800 text-emerald-200 text-xs">
              {message}
            </div>
          )}

          {isSuccess ? (
            <div className="space-y-4">
              <Link
                href="/studio"
                className="w-full py-3 px-6 rounded-lg bg-[#C5A869] hover:bg-[#D8BC7D] text-[#07130E] font-semibold text-xs tracking-widest uppercase flex items-center justify-center gap-2"
              >
                ENTER STUDIO <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          ) : (
            <form onSubmit={handleVerify} className="space-y-4 text-left">
              <div>
                <label className="block text-xs font-medium text-stone-300 uppercase tracking-wider mb-1.5">
                  Work Email
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@kgm-estates.com"
                  className="w-full px-3.5 py-2.5 rounded-lg bg-stone-950/80 border border-stone-800 focus:border-[#C5A869] text-stone-100 text-sm outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-stone-300 uppercase tracking-wider mb-1.5">
                  6-Digit Verification Code
                </label>
                <input
                  type="text"
                  required
                  maxLength={6}
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  placeholder="e.g. 849201"
                  className="w-full px-3.5 py-2.5 rounded-lg bg-stone-950/80 border border-stone-800 focus:border-[#C5A869] text-stone-100 text-center font-mono text-lg tracking-widest outline-none"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3 px-6 rounded-lg bg-gradient-to-r from-[#C5A869] to-[#9E8345] hover:from-[#D8BC7D] text-[#07130E] font-semibold text-xs tracking-widest uppercase flex items-center justify-center gap-2"
                >
                  {isLoading ? 'Verifying...' : 'CONFIRM ACCESS'}
                </button>
              </div>

              <div className="flex items-center justify-between pt-3 text-xs">
                <button
                  type="button"
                  onClick={handleResend}
                  className="text-stone-400 hover:text-[#C5A869] flex items-center gap-1"
                >
                  <RotateCcw className="w-3 h-3" /> Resend Verification
                </button>
                <Link href="/auth/login" className="text-[#C5A869] hover:underline">
                  Return to Login
                </Link>
              </div>
            </form>
          )}
        </div>
      </main>

      <footer className="border-t border-stone-800/80 px-6 py-4 text-center text-xs text-stone-500">
        KGM CINEMATIC STUDIO OS • IDENTITY INTEGRITY
      </footer>
    </div>
  );
}
