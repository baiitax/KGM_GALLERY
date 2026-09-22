'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ShieldCheck, UserPlus, Mail, Building2, CheckCircle2, Copy, Send, Sparkles, ArrowLeft } from 'lucide-react';
import { UserRole } from '@/lib/auth/session';

export default function InvitePage() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState<UserRole>('producer');
  const [department, setDepartment] = useState('Production & Film Direction');
  const [accessPolicy, setAccessPolicy] = useState<'permanent' | '30_days' | '90_days' | 'project_only'>('permanent');
  const [isLoading, setIsLoading] = useState(false);
  const [successData, setSuccessData] = useState<{ invitation: any; activationUrl: string } | null>(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [copied, setCopied] = useState(false);
  const [existingInvitations, setExistingInvitations] = useState<any[]>([]);

  const rolesList: { value: UserRole; label: string; desc: string }[] = [
    { value: 'super_admin', label: 'Studio Administrator', desc: 'Full administrative sovereignty across compute, team, & brand.' },
    { value: 'creative_director', label: 'Creative Director', desc: 'Curates artistic visual grammar, color LUTs, and master approvals.' },
    { value: 'producer', label: 'Cinematic Producer', desc: 'Orchestrates 10-second pipeline, shot ordering, & render jobs.' },
    { value: 'editor', label: 'Video Editor', desc: 'Per-scene kinetics, pacing, and ACES mastering controls.' },
    { value: 'media_specialist', label: 'Property Media Specialist', desc: 'Manages architectural photography uploads and AI asset tagging.' },
    { value: 'marketing', label: 'Real Estate Marketing', desc: 'Produces multi-aspect social cuts & client campaigns.' },
    { value: 'client_relations', label: 'Client Relations', desc: 'Assembles private VIP pitch presentations and client links.' },
    { value: 'reviewer', label: 'Viewer / Reviewer', desc: 'Client review access with annotation and feedback privileges.' },
  ];

  const fetchInvitations = async () => {
    try {
      const res = await fetch('/api/auth/invite');
      const data = await res.json();
      if (data.success && data.invitations) {
        setExistingInvitations(data.invitations);
      }
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    fetchInvitations();
  }, []);

  const handleInvite = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage('');
    setSuccessData(null);

    try {
      const res = await fetch('/api/auth/invite', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName,
          email,
          role,
          department,
          accessPolicy,
          invitedBy: 'Alexander Kurra — Executive Creative Director',
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Failed to dispatch invitation.');
      }

      setSuccessData(data);
      fetchInvitations();
    } catch (err: any) {
      setErrorMessage(err.message || 'An error occurred while creating invitation.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopyLink = () => {
    if (!successData) return;
    const fullUrl = `${window.location.origin}${successData.activationUrl}`;
    navigator.clipboard.writeText(fullUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="min-h-screen bg-[#07130E] text-stone-100 font-sans selection:bg-[#C5A869]/30 flex flex-col justify-between">
      {/* Header */}
      <header className="border-b border-stone-800/80 px-6 py-4 flex items-center justify-between backdrop-blur-md bg-[#07130E]/80 sticky top-0 z-50">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-[#C5A869] to-[#8C733E] flex items-center justify-center text-[#07130E] font-serif font-bold text-lg shadow-lg shadow-[#C5A869]/20 group-hover:scale-105 transition-transform">
            K
          </div>
          <div>
            <span className="font-serif tracking-[0.25em] text-stone-100 text-sm font-semibold block">KGM LIMITED</span>
            <span className="text-[10px] tracking-[0.2em] text-[#C5A869] uppercase font-medium">Access Management</span>
          </div>
        </Link>
        <Link
          href="/auth/login"
          className="text-xs text-stone-400 hover:text-[#C5A869] flex items-center gap-1.5 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Login
        </Link>
      </header>

      {/* Main Container */}
      <main className="max-w-6xl w-full mx-auto p-4 sm:p-6 lg:p-10 my-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Form Column */}
          <div className="lg:col-span-7 bg-[#0C1E17]/80 border border-stone-800/90 rounded-2xl p-6 sm:p-8 backdrop-blur-xl shadow-2xl relative">
            <div className="mb-6">
              <span className="text-xs font-mono uppercase tracking-widest text-[#C5A869] font-medium flex items-center gap-1.5 mb-2">
                <UserPlus className="w-4 h-4 text-[#C5A869]" />
                Authorized Studio Invitation
              </span>
              <h1 className="text-2xl sm:text-3xl font-serif font-medium text-white tracking-tight">
                Invite Production Personnel
              </h1>
              <p className="text-xs sm:text-sm text-stone-400 mt-1.5 font-light">
                Issue cryptographic invitation tokens to onboard team members and executives into KGM Cinematic Studio OS.
              </p>
            </div>

            {errorMessage && (
              <div className="mb-5 p-3.5 rounded-lg bg-rose-950/60 border border-rose-800/70 text-rose-200 text-xs">
                {errorMessage}
              </div>
            )}

            {successData && (
              <div className="mb-6 p-4 rounded-xl bg-emerald-950/70 border border-emerald-800 text-emerald-100 space-y-3">
                <div className="flex items-center gap-2 text-sm font-medium text-emerald-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  Invitation Token Generated Successfully
                </div>
                <p className="text-xs text-emerald-200/90 font-light">
                  A private activation link has been prepared for <strong className="font-semibold">{successData.invitation.fullName}</strong> ({successData.invitation.email}).
                </p>
                <div className="flex items-center gap-2 p-2 bg-black/40 rounded-lg border border-emerald-800/50">
                  <input
                    type="text"
                    readOnly
                    value={`${typeof window !== 'undefined' ? window.location.origin : ''}${successData.activationUrl}`}
                    className="w-full bg-transparent text-xs font-mono text-stone-300 outline-none"
                  />
                  <button
                    onClick={handleCopyLink}
                    className="px-3 py-1 bg-[#C5A869] hover:bg-[#D8BC7D] text-[#07130E] text-xs font-semibold rounded flex items-center gap-1 transition-all cursor-pointer"
                  >
                    <Copy className="w-3.5 h-3.5" />
                    {copied ? 'Copied' : 'Copy'}
                  </button>
                </div>
              </div>
            )}

            <form onSubmit={handleInvite} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-stone-300 uppercase tracking-wider mb-1.5">
                    Full Name
                  </label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Zahra Khalid"
                    className="w-full px-3.5 py-2.5 rounded-lg bg-stone-950/80 border border-stone-800 focus:border-[#C5A869] focus:ring-1 focus:ring-[#C5A869] text-stone-100 text-sm outline-none"
                  />
                </div>
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
                    className="w-full px-3.5 py-2.5 rounded-lg bg-stone-950/80 border border-stone-800 focus:border-[#C5A869] focus:ring-1 focus:ring-[#C5A869] text-stone-100 text-sm outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-stone-300 uppercase tracking-wider mb-1.5">
                    Studio Role
                  </label>
                  <select
                    value={role}
                    onChange={(e) => setRole(e.target.value as UserRole)}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-stone-950 border border-stone-800 text-stone-100 text-sm outline-none focus:border-[#C5A869]"
                  >
                    {rolesList.map((r) => (
                      <option key={r.value} value={r.value}>
                        {r.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-stone-300 uppercase tracking-wider mb-1.5">
                    Department
                  </label>
                  <input
                    type="text"
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)}
                    placeholder="e.g. Architectural Curation"
                    className="w-full px-3.5 py-2.5 rounded-lg bg-stone-950/80 border border-stone-800 focus:border-[#C5A869] text-stone-100 text-sm outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-stone-300 uppercase tracking-wider mb-1.5">
                  Temporary Access Policy
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {[
                    { id: 'permanent', label: 'Permanent' },
                    { id: '90_days', label: '90 Days' },
                    { id: '30_days', label: '30 Days' },
                    { id: 'project_only', label: 'Project Scope' },
                  ].map((p) => (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => setAccessPolicy(p.id as any)}
                      className={`py-2 px-3 rounded-lg text-xs font-medium border transition-all ${
                        accessPolicy === p.id
                          ? 'bg-[#C5A869]/20 border-[#C5A869] text-[#C5A869]'
                          : 'bg-stone-950/60 border-stone-800 text-stone-400 hover:text-stone-200'
                      }`}
                    >
                      {p.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3 px-6 rounded-lg bg-gradient-to-r from-[#C5A869] to-[#9E8345] hover:from-[#D8BC7D] hover:to-[#B09351] text-[#07130E] font-semibold text-xs tracking-widest uppercase flex items-center justify-center gap-2 shadow-lg shadow-[#C5A869]/20 transition-all cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  {isLoading ? 'Issuing Token...' : 'DISPATCH STUDIO INVITATION'}
                </button>
              </div>
            </form>
          </div>

          {/* Right Column: Roles Glossary & Pending Invitations */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-6 rounded-2xl bg-stone-900/60 border border-stone-800/80 space-y-4">
              <h3 className="text-sm font-serif font-medium text-stone-200 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#C5A869]" />
                RBAC Security Governance
              </h3>
              <div className="space-y-2.5 max-h-60 overflow-y-auto pr-1 text-xs">
                {rolesList.map((r) => (
                  <div key={r.value} className="p-2.5 rounded-lg bg-stone-950/60 border border-stone-800/60">
                    <p className="font-semibold text-[#C5A869]">{r.label}</p>
                    <p className="text-stone-400 text-[11px] mt-0.5">{r.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Pending Invitations list */}
            <div className="p-6 rounded-2xl bg-stone-900/60 border border-stone-800/80">
              <h3 className="text-xs font-mono uppercase tracking-wider text-stone-400 mb-3">
                Active Invitation Registry ({existingInvitations.length})
              </h3>
              <div className="space-y-2 text-xs">
                {existingInvitations.map((inv) => (
                  <div
                    key={inv.id}
                    className="p-2.5 rounded-lg bg-stone-950/80 border border-stone-800 flex items-center justify-between"
                  >
                    <div>
                      <p className="font-medium text-stone-200">{inv.fullName}</p>
                      <p className="text-[10px] text-stone-400 font-mono">{inv.email} • {inv.role}</p>
                    </div>
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono uppercase bg-amber-950/80 text-amber-300 border border-amber-800/50">
                      {inv.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-stone-800/80 px-6 py-4 text-center text-xs text-stone-500">
        KGM CINEMATIC STUDIO OS • INVITATION & ACCESS CONTROL
      </footer>
    </div>
  );
}
