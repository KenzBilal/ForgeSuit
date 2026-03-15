"use client";

import { useState } from "react";
import {
  CreditCard, TrendingUp, MessageCircle, Users, Bot,
  CheckCircle2, ArrowUpRight, Download, AlertTriangle,
  Zap, Star, Crown, ChevronRight, BarChart2,
} from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { cn } from "@/lib/utils";

// ── Mock Data ────────────────────────────────────────────────
const CURRENT_PLAN = {
  name: "Starter",
  price: "₹2,999",
  renewsOn: "Apr 16, 2026",
  usage: {
    messages:   { used: 3800,  limit: 5000  },
    tokens:     { used: 180000, limit: 250000 },
    contacts:   { used: 420,   limit: 500   },
  },
};

const PLANS = [
  {
    name: "Free", price: "₹0", period: "forever", icon: Zap, color: "text-slate-500",
    features: ["200 messages/mo", "100 contacts", "1 AI Agent", "Basic analytics"],
    cta: "Current Plan", disabled: true,
  },
  {
    name: "Starter", price: "₹2,999", period: "/month", icon: Star, color: "text-blue-500",
    features: ["5,000 messages/mo", "500 contacts", "3 AI Agents", "Campaign manager", "Knowledge Base"],
    cta: "Current Plan", disabled: true, current: true,
  },
  {
    name: "Pro", price: "₹4,999", period: "/month", icon: Crown, color: "text-amber-500",
    features: ["Unlimited messages", "Unlimited contacts", "10 AI Agents", "Advanced analytics", "API access", "Priority support"],
    cta: "Upgrade to Pro", disabled: false, recommended: true,
  },
];

const COST_DATA = [
  { day: "Mon", tokens: 0.08, templates: 0.03 },
  { day: "Tue", tokens: 0.11, templates: 0.05 },
  { day: "Wed", tokens: 0.07, templates: 0.02 },
  { day: "Thu", tokens: 0.14, templates: 0.06 },
  { day: "Fri", tokens: 0.18, templates: 0.08 },
  { day: "Sat", tokens: 0.09, templates: 0.04 },
  { day: "Sun", tokens: 0.05, templates: 0.02 },
];

const INVOICES = [
  { date: "Mar 1, 2026", amount: "₹2,999", status: "paid",   id: "INV-2026-003" },
  { date: "Feb 1, 2026", amount: "₹2,999", status: "paid",   id: "INV-2026-002" },
  { date: "Jan 1, 2026", amount: "₹2,999", status: "paid",   id: "INV-2026-001" },
  { date: "Dec 1, 2025", amount: "₹2,999", status: "paid",   id: "INV-2025-012" },
  { date: "Nov 1, 2025", amount: "₹0",     status: "free",   id: "INV-2025-011" },
];

const INVOICE_STATUS: Record<string, { color: string; label: string }> = {
  paid: { color: "bg-emerald-50 text-emerald-600 border-emerald-200", label: "Paid" },
  free: { color: "bg-slate-50 text-slate-500 border-slate-200",       label: "Free" },
  due:  { color: "bg-red-50 text-red-500 border-red-200",             label: "Due" },
};

function UsageBar({ used, limit, color }: { used: number; limit: number; color: string }) {
  const pct = Math.min((used / limit) * 100, 100);
  const warning = pct >= 80;
  return (
    <div>
      <div className="h-2 rounded-full bg-saas-border overflow-hidden">
        <div className="h-full rounded-full transition-all duration-500"
          style={{ width: `${pct}%`, background: warning ? "#f59e0b" : color }} />
      </div>
      <div className="flex items-center justify-between mt-1">
        <span className={cn("text-[11px] font-mono font-semibold", warning ? "text-amber-600" : "text-saas-subtext")}>
          {used.toLocaleString()} / {limit.toLocaleString()}
        </span>
        <span className={cn("text-[11px] font-mono font-bold", warning ? "text-amber-600" : "text-saas-primary")}>
          {Math.round(pct)}%
        </span>
      </div>
    </div>
  );
}

export default function BillingPage() {
  const [billingCycle, setBillingCycle] = useState<"monthly"|"annual">("monthly");

  const usageItems = [
    { label: "Messages", icon: MessageCircle, ...CURRENT_PLAN.usage.messages, color: "#4f46e5" },
    { label: "AI Tokens", icon: Bot,          ...CURRENT_PLAN.usage.tokens,   color: "#6366f1" },
    { label: "Contacts",  icon: Users,        ...CURRENT_PLAN.usage.contacts, color: "#10b981" },
  ];

  return (
    <div className="min-h-full p-8 max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="font-display text-3xl font-bold text-saas-text tracking-tight">Billing</h1>
          <p className="text-saas-subtext text-sm mt-1 font-medium">Manage your plan, usage, and invoices</p>
        </div>
        <div className="flex gap-1 p-1 rounded-xl bg-saas-card border border-saas-border">
          {(["monthly","annual"] as const).map((c) => (
            <button key={c} onClick={() => setBillingCycle(c)}
              className={cn("px-4 py-1.5 rounded-lg text-sm font-semibold transition-all capitalize", billingCycle===c ? "bg-saas-primary text-white shadow-saas-sm" : "text-saas-subtext hover:text-saas-text")}>
              {c} {c === "annual" && <span className="text-[10px] ml-1 opacity-70">-20%</span>}
            </button>
          ))}
        </div>
      </div>

      {/* Current Plan + Usage */}
      <div className="grid grid-cols-3 gap-6">
        {/* Current Plan Card */}
        <div className="skeu-card p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-[10px] font-mono uppercase tracking-wider text-saas-subtext font-semibold">Current Plan</p>
              <h2 className="font-display font-bold text-2xl text-saas-text mt-1">{CURRENT_PLAN.name}</h2>
            </div>
            <div className="text-right">
              <p className="font-display font-bold text-3xl text-saas-text">{CURRENT_PLAN.price}</p>
              <p className="text-xs text-saas-subtext">/month</p>
            </div>
          </div>
          <p className="text-xs text-saas-subtext mb-6 flex items-center gap-1.5">
            <CreditCard className="w-3.5 h-3.5" /> Renews on {CURRENT_PLAN.renewsOn}
          </p>
          <button className="w-full py-2.5 rounded-xl bg-saas-primary text-white text-sm font-semibold hover:shadow-saas-glow transition-all flex items-center justify-center gap-2">
            <Crown className="w-4 h-4 text-amber-300" /> Upgrade to Pro
          </button>
        </div>

        {/* Usage Bars */}
        <div className="col-span-2 skeu-card p-6">
          <h2 className="font-display font-bold text-lg text-saas-text mb-5">Usage This Month</h2>
          <div className="space-y-5">
            {usageItems.map((item) => {
              const warning = (item.used / item.limit) >= 0.8;
              return (
                <div key={item.label}>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <item.icon className="w-4 h-4" style={{ color: item.color }} />
                      <span className="text-sm font-semibold text-saas-text">{item.label}</span>
                      {warning && (
                        <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded-full bg-amber-50 text-amber-600 border border-amber-200 flex items-center gap-1">
                          <AlertTriangle className="w-2.5 h-2.5" /> 80%+ used
                        </span>
                      )}
                    </div>
                  </div>
                  <UsageBar used={item.used} limit={item.limit} color={item.color} />
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Plan Comparison */}
      <div>
        <h2 className="font-display font-bold text-xl text-saas-text mb-5">Available Plans</h2>
        <div className="grid grid-cols-3 gap-6">
          {PLANS.map((plan) => (
            <div key={plan.name} className={cn(
              "skeu-card p-6 relative transition-all duration-200",
              plan.recommended && "ring-2 ring-saas-primary shadow-saas-glow"
            )}>
              {plan.recommended && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-saas-primary text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                  Recommended
                </div>
              )}
              <div className="flex items-center gap-3 mb-4">
                <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center", plan.recommended ? "bg-saas-primary/10" : "bg-saas-bg border border-saas-border")}>
                  <plan.icon className={cn("w-5 h-5", plan.color)} />
                </div>
                <div>
                  <h3 className="font-display font-bold text-saas-text text-lg">{plan.name}</h3>
                  <div className="flex items-baseline gap-1">
                    <span className="text-xl font-bold text-saas-text">{plan.price}</span>
                    <span className="text-xs text-saas-subtext">{plan.period}</span>
                  </div>
                </div>
              </div>
              <ul className="space-y-2 mb-6">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-sm text-saas-subtext">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" />{f}
                  </li>
                ))}
              </ul>
              <button disabled={plan.disabled}
                className={cn(
                  "w-full py-2.5 rounded-xl text-sm font-semibold transition-all",
                  plan.recommended
                    ? "bg-saas-primary text-white hover:shadow-saas-glow hover:-translate-y-0.5"
                    : plan.disabled
                    ? "bg-saas-bg border border-saas-border text-saas-subtext cursor-default"
                    : "border border-saas-border text-saas-subtext hover:border-saas-primary/40 hover:text-saas-text"
                )}
              >
                {plan.cta}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Cost Chart + Invoice Table */}
      <div className="grid grid-cols-3 gap-6">
        {/* Daily Cost Chart */}
        <div className="skeu-card p-6">
          <h2 className="font-display font-bold text-lg text-saas-text mb-1">Daily Cost</h2>
          <p className="text-xs text-saas-subtext mb-4">AI tokens + Meta templates ($)</p>
          <ResponsiveContainer width="100%" height={160}>
            <AreaChart data={COST_DATA} margin={{top:5,right:5,bottom:0,left:-20}}>
              <defs>
                <linearGradient id="tokGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.3}/><stop offset="95%" stopColor="#4f46e5" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="tmplGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/><stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <XAxis dataKey="day" tick={{fontSize:11,fill:"#94a3b8"}} axisLine={false} tickLine={false}/>
              <YAxis tick={{fontSize:11,fill:"#94a3b8"}} axisLine={false} tickLine={false} dx={-10}/>
              <Tooltip contentStyle={{background:"#fff",border:"1px solid #e2e8f0",borderRadius:"12px",fontSize:"12px"}}/>
              <Area dataKey="tokens"    stroke="#4f46e5" strokeWidth={2} fill="url(#tokGrad)"  dot={{r:0}} activeDot={{r:4}}/>
              <Area dataKey="templates" stroke="#10b981" strokeWidth={2} fill="url(#tmplGrad)" dot={{r:0}} activeDot={{r:4}}/>
            </AreaChart>
          </ResponsiveContainer>
          <div className="flex gap-4 mt-2">
            {[{l:"Tokens",c:"#4f46e5"},{l:"Templates",c:"#10b981"}].map((x)=>(
              <div key={x.l} className="flex items-center gap-1.5 text-xs text-saas-subtext">
                <span className="w-2.5 h-2.5 rounded-full" style={{background:x.c}}/>{x.l}
              </div>
            ))}
          </div>
        </div>

        {/* Payment History */}
        <div className="col-span-2 skeu-card overflow-hidden">
          <div className="px-6 py-4 border-b border-saas-border flex items-center justify-between">
            <h2 className="font-display font-bold text-lg text-saas-text">Payment History</h2>
            <button className="text-xs font-semibold text-saas-subtext hover:text-saas-text flex items-center gap-1 transition-colors">
              <Download className="w-3.5 h-3.5" /> Export All
            </button>
          </div>
          <table className="w-full">
            <thead>
              <tr className="border-b border-saas-border bg-saas-bg/50">
                {["Invoice ID","Date","Amount","Status",""].map((h) => (
                  <th key={h} className="px-6 py-3 text-left text-[11px] font-mono uppercase tracking-wider text-saas-subtext font-semibold">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {INVOICES.map((inv) => (
                <tr key={inv.id} className="border-b border-saas-border/60 hover:bg-saas-bg/30 transition-colors">
                  <td className="px-6 py-4"><span className="text-xs font-mono font-semibold text-saas-text">{inv.id}</span></td>
                  <td className="px-6 py-4"><span className="text-sm text-saas-subtext">{inv.date}</span></td>
                  <td className="px-6 py-4"><span className="text-sm font-bold text-saas-text">{inv.amount}</span></td>
                  <td className="px-6 py-4">
                    <span className={cn("text-[10px] font-mono font-semibold px-2 py-0.5 rounded-full border", INVOICE_STATUS[inv.status].color)}>
                      {INVOICE_STATUS[inv.status].label}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <button className="flex items-center gap-1 text-xs font-semibold text-saas-primary hover:underline">
                      <Download className="w-3 h-3" /> PDF
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
