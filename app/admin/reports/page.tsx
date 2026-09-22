'use client';

import React, { useState } from 'react';
import { Download, FileText, Calendar, CheckCircle2, Sparkles } from 'lucide-react';

export default function AdminReportsPage() {
  const [reportType, setReportType] = useState('Weekly Studio Operations Report');
  const [format, setFormat] = useState('PDF');
  const [period, setPeriod] = useState('Last 30 Days');
  const [generating, setGenerating] = useState(false);
  const [generatedReport, setGeneratedReport] = useState<any>(null);

  const handleGenerate = async () => {
    setGenerating(true);
    try {
      const res = await fetch('/api/admin/reports', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ reportType, format, period }),
      });
      const data = await res.json();
      setGeneratedReport(data.report);
    } catch (e) {
      console.error(e);
    } finally {
      setGenerating(false);
    }
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-8 max-w-5xl w-full mx-auto">
      <div className="border-b border-stone-800 pb-6">
        <span className="text-xs font-mono uppercase tracking-widest text-[#C5A869]">Executive Reporting</span>
        <h1 className="text-2xl sm:text-3xl font-serif font-medium text-white tracking-tight">
          Executive Reports & Operations Briefings
        </h1>
        <p className="text-xs sm:text-sm text-stone-400 font-light mt-1">
          Compile boardroom operations reports, AI cost telemetry, and client presentation engagement summaries.
        </p>
      </div>

      <div className="bg-[#081812]/90 border border-stone-800 rounded-3xl p-6 sm:p-8 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-medium text-stone-300 uppercase tracking-wider mb-2">
              Report Template
            </label>
            <select
              value={reportType}
              onChange={(e) => setReportType(e.target.value)}
              className="w-full p-3 rounded-xl bg-stone-950 border border-stone-800 text-stone-100 text-xs outline-none focus:border-[#C5A869]"
            >
              <option>Weekly Studio Operations Report</option>
              <option>Monthly AI Compute & Cost Telemetry</option>
              <option>Client Presentation Engagement Audit</option>
              <option>Vault Storage & Deliverables Archive</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-medium text-stone-300 uppercase tracking-wider mb-2">
              Reporting Period
            </label>
            <select
              value={period}
              onChange={(e) => setPeriod(e.target.value)}
              className="w-full p-3 rounded-xl bg-stone-950 border border-stone-800 text-stone-100 text-xs outline-none focus:border-[#C5A869]"
            >
              <option>Last 7 Days</option>
              <option>Last 30 Days</option>
              <option>Last 90 Days</option>
              <option>Year to Date (YTD 2026)</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-medium text-stone-300 uppercase tracking-wider mb-2">
              Export Format
            </label>
            <select
              value={format}
              onChange={(e) => setFormat(e.target.value)}
              className="w-full p-3 rounded-xl bg-stone-950 border border-stone-800 text-stone-100 text-xs outline-none focus:border-[#C5A869]"
            >
              <option>PDF (Executive Presentation Grade)</option>
              <option>XLSX (Full Telemetry Data Sheet)</option>
              <option>CSV (Raw Cryptographic Log)</option>
            </select>
          </div>
        </div>

        <div className="pt-2">
          <button
            onClick={handleGenerate}
            disabled={generating}
            className="py-3 px-8 rounded-xl bg-gradient-to-r from-[#C5A869] to-[#9E8345] hover:from-[#D8BC7D] text-[#07130E] font-semibold text-xs tracking-widest uppercase flex items-center gap-2 cursor-pointer shadow-lg shadow-[#C5A869]/20"
          >
            <FileText className="w-4 h-4" />
            <span>{generating ? 'Compiling Report...' : 'GENERATE EXECUTIVE REPORT'}</span>
          </button>
        </div>

        {generatedReport && (
          <div className="p-4 rounded-2xl bg-emerald-950/60 border border-emerald-800 text-xs font-mono text-emerald-200 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
              <div>
                <p className="font-bold text-white">{generatedReport.title}</p>
                <p className="text-[10px] text-emerald-300 mt-0.5">Compiled on {new Date(generatedReport.generatedAt).toLocaleString()}</p>
              </div>
            </div>
            <a
              href="/exports/film_proj_kgm_riyadh_01_master_16x9.mp4"
              download
              className="py-2 px-4 rounded-lg bg-[#C5A869] text-[#07130E] text-xs font-bold uppercase tracking-wider flex items-center gap-1.5"
            >
              <Download className="w-3.5 h-3.5" /> Download
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
