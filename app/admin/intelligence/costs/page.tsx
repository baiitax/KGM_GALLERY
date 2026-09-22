'use client';

import React from 'react';
import { DollarSign, TrendingDown, CheckCircle2 } from 'lucide-react';
import { ADMIN_SEED_DATA } from '@/lib/admin/analytics';

export default function AdminCostIntelligencePage() {
  const cost = ADMIN_SEED_DATA.costIntelligence;

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-8 max-w-[1600px] w-full mx-auto">
      <div className="border-b border-stone-800 pb-6">
        <span className="text-xs font-mono uppercase tracking-widest text-[#C5A869]">Financial Governance</span>
        <h1 className="text-2xl sm:text-3xl font-serif font-medium text-white tracking-tight">
          Cost Intelligence & Resource Expenditure
        </h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 rounded-3xl bg-[#081812]/90 border border-stone-800 space-y-2">
          <p className="text-xs font-mono text-stone-400">Monthly Budget</p>
          <p className="text-3xl font-serif text-white">${cost.monthlyBudgetUSD.toLocaleString()} USD</p>
          <p className="text-xs text-stone-400 font-mono">Configured compute cap</p>
        </div>
        <div className="p-6 rounded-3xl bg-[#081812]/90 border border-stone-800 space-y-2">
          <p className="text-xs font-mono text-stone-400">Actual Spend (MTD)</p>
          <p className="text-3xl font-serif text-emerald-400">${cost.actualSpendUSD.toLocaleString()} USD</p>
          <p className="text-xs text-emerald-400 font-mono">46.2% of allocation</p>
        </div>
        <div className="p-6 rounded-3xl bg-[#081812]/90 border border-stone-800 space-y-2">
          <p className="text-xs font-mono text-stone-400">Budget Variance</p>
          <p className="text-3xl font-serif text-[#C5A869]">+${cost.varianceUSD.toLocaleString()} USD</p>
          <p className="text-xs text-[#C5A869] font-mono">Surplus remaining</p>
        </div>
      </div>
    </div>
  );
}
