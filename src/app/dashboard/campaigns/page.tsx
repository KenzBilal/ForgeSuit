"use client";

import { useState } from "react";
import {
  Plus, Send, Clock, CheckCircle2, XCircle, AlertCircle,
  BarChart2, Users, Megaphone, Eye, ChevronRight,
  ArrowUpRight, Filter, MoreHorizontal, Play, Pause,
  Copy, Trash2, Badge,
} from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { cn } from "@/lib/utils";

// ── Mock Data ────────────────────────────────────────────────
const CAMPAIGNS = [
  {
    id: 1, name: "March Flash Sale", template: "promo_march_2026", status: "running",
    date: "Mar 16, 2026", audience: 1240, sent: 1200, delivered: 1150, read: 890, failed: 50,
    scheduledAt: "09:00 AM",
  },
  {
    id: 2, name: "Welcome Series – New Users", template: "welcome_onboarding_v2", status: "completed",
    date: "Mar 10, 2026", audience: 500, sent: 500, delivered: 492, read: 380, failed: 8,
    scheduledAt: "10:00 AM",
  },
  {
    id: 3, name: "Product Update Q1", template: "product_update_q1", status: "scheduled",
    date: "Mar 18, 2026", audience: 2100, sent: 0, delivered: 0, read: 0, failed: 0,
    scheduledAt: "11:00 AM",
  },
  {
    id: 4, name: "Re-engagement Blast", template: "reengagement_cold", status: "draft",
    date: "—", audience: 340, sent: 0, delivered: 0, read: 0, failed: 0,
    scheduledAt: "—",
  },
  {
    id: 5, name: "Demo Follow-up", template: "demo_followup_v1", status: "completed",
    date: "Mar 5, 2026", audience: 88, sent: 88, delivered: 87, read: 72, failed: 1,
    scheduledAt: "02:00 PM",
  },
  {
    id: 6, name: "Black Friday Early Access", template: "blackfriday_early", status: "draft",
    date: "—", audience: 5000, sent: 0, delivered: 0, read: 0, failed: 0,
    scheduledAt: "—",
  },
];

const TEMPLATES = [
  { name: "promo_march_2026",   category: "MARKETING", status: "approved",  lastUsed: "Today" },
  { name: "welcome_onboarding_v2", category: "UTILITY",    status: "approved",  lastUsed: "Mar 10" },
  { name: "product_update_q1", category: "MARKETING", status: "approved",  lastUsed: "—" },
  { name: "reengagement_cold", category: "MARKETING", status: "pending",   lastUsed: "—" },
  { name: "demo_followup_v1",  category: "UTILITY",    status: "approved",  lastUsed: "Mar 5" },
  { name: "blackfriday_early", category: "MARKETING", status: "rejected",  lastUsed: "—" },
];

const SEND_DATA = [
  { day: "Mon", sent: 320, delivered: 310 },
  { day: "Tue", sent: 580, delivered: 560 },
  { day: "Wed", sent: 200, delivered: 192 },
  { day: "Thu", sent: 740, delivered: 710 },
  { day: "Fri", sent: 1200, delivered: 1150 },
  { day: "Sat", sent: 430, delivered: 415 },
  { day: "Sun", sent: 180, delivered: 178 },
];

const STATUS_CONFIG: Record<string, { label: string; color: string; icon: typeof Clock }> = {
  running:   { label: "Running",   color: "bg-emerald-50 text-emerald-600 border-emerald-200",  icon: Play },
  completed: { label: "Completed", color: "bg-slate-50 text-slate-600 border-slate-200",        icon: CheckCircle2 },
  scheduled: { label: "Scheduled", color: "bg-blue-50 text-blue-600 border-blue-200",           icon: Clock },
  draft:     { label: "Draft",     color: "bg-amber-50 text-amber-600 border-amber-200",        icon: AlertCircle },
};

const TEMPLATE_STATUS_CONFIG: Record<string, { color: string; dot: string }> = {
  approved: { color: "bg-emerald-50 text-emerald-600 border-emerald-200", dot: "bg-emerald-500" },
  pending:  { color: "bg-amber-50 text-amber-600 border-amber-200",       dot: "bg-amber-500" },
  rejected: { color: "bg-red-50 text-red-500 border-red-200",             dot: "bg-red-500" },
};

const FILTER_TABS = ["All", "Draft", "Scheduled", "Running", "Completed"];

const STAT_CARDS = [
  { label: "Total Sent",       value: "1,788", delta: "+24%",  up: true,  icon: Send,        color: "#4f46e5" },
  { label: "Delivered Rate",   value: "95.8%", delta: "+1.2%", up: true,  icon: CheckCircle2,color: "#10b981" },
  { label: "Read Rate",        value: "68.4%", delta: "+3.8%", up: true,  icon: Eye,         color: "#4f46e5" },
  { label: "Failed",           value: "59",    delta: "-12",   up: false, icon: XCircle,     color: "#ef4444" },
];

export default function CampaignsPage() {
  const [tab, setTab] = useState("All");

  const filtered = CAMPAIGNS.filter((c) =>
    tab === "All" || c.status === tab.toLowerCase()
  );

  const pct = (n: number, total: number) => total > 0 ? Math.round((n / total) * 100) : 0;

  return (
    <div className="min-h-full p-8 max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="font-display text-3xl font-bold text-saas-text tracking-tight">Campaigns</h1>
          <p className="text-saas-subtext text-sm mt-1 font-medium">Broadcast messages to your WhatsApp audience</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-saas-primary text-white text-sm font-semibold shadow-saas-md hover:shadow-saas-glow hover:-translate-y-0.5 transition-all duration-200">
          <Plus className="w-4 h-4" /> New Campaign
        </button>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-4 gap-6">
        {STAT_CARDS.map((card) => (
          <div key={card.label} className="skeu-card p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: `${card.color}18`, color: card.color }}>
                <card.icon className="w-5 h-5" />
              </div>
              <span className={cn("text-xs font-mono font-semibold px-2 py-1 rounded-full flex items-center gap-1", card.up ? "text-emerald-600 bg-emerald-50" : "text-rose-600 bg-rose-50")}>
                <ArrowUpRight className={cn("w-3.5 h-3.5", card.up ? "" : "rotate-180")} />{card.delta}
              </span>
            </div>
            <p className="font-display text-3xl font-bold text-saas-text leading-none mb-1">{card.value}</p>
            <p className="text-saas-subtext text-sm font-medium">{card.label}</p>
          </div>
        ))}
      </div>

      {/* Chart + Templates Row */}
      <div className="grid grid-cols-3 gap-6">
        {/* Send Volume Chart */}
        <div className="col-span-2 skeu-card p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="font-display font-bold text-lg text-saas-text">Send Volume</h2>
              <p className="text-saas-subtext text-xs mt-0.5">Last 7 days — Sent vs Delivered</p>
            </div>
            <div className="flex items-center gap-4 text-xs font-medium">
              {[{label:"Sent",color:"#4f46e5"},{label:"Delivered",color:"#10b981"}].map((l)=>(
                <div key={l.label} className="flex items-center gap-2 text-saas-subtext">
                  <span className="w-2.5 h-2.5 rounded-full" style={{background:l.color}} />{l.label}
                </div>
              ))}
            </div>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={SEND_DATA} margin={{top:10,right:10,bottom:0,left:-20}}>
              <defs>
                <linearGradient id="sentGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.2}/>
                  <stop offset="95%" stopColor="#4f46e5" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="deliveredGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.2}/>
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <XAxis dataKey="day" tick={{fontSize:12,fill:"#94a3b8"}} axisLine={false} tickLine={false} dy={10}/>
              <YAxis tick={{fontSize:12,fill:"#94a3b8"}} axisLine={false} tickLine={false} dx={-10}/>
              <Tooltip contentStyle={{background:"#fff",border:"1px solid #e2e8f0",borderRadius:"12px",fontSize:"12px"}}/>
              <Area type="monotone" dataKey="sent" stroke="#4f46e5" strokeWidth={2} fill="url(#sentGrad)" dot={{r:0}} activeDot={{r:4}}/>
              <Area type="monotone" dataKey="delivered" stroke="#10b981" strokeWidth={2} fill="url(#deliveredGrad)" dot={{r:0}} activeDot={{r:4}}/>
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Template Status */}
        <div className="skeu-card p-6 flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-display font-bold text-lg text-saas-text">Templates</h2>
            <button className="text-xs font-semibold text-saas-primary hover:underline">+ Submit New</button>
          </div>
          <div className="space-y-2 flex-1">
            {TEMPLATES.map((tmpl) => (
              <div key={tmpl.name} className="flex items-center justify-between py-2 border-b border-saas-border/60 last:border-0">
                <div className="min-w-0 pr-2">
                  <p className="text-xs font-mono font-medium text-saas-text truncate">{tmpl.name}</p>
                  <p className="text-[10px] text-saas-subtext">{tmpl.category}</p>
                </div>
                <span className={cn("text-[10px] font-mono font-semibold px-2 py-0.5 rounded-full border flex items-center gap-1 flex-shrink-0", TEMPLATE_STATUS_CONFIG[tmpl.status].color)}>
                  <span className={cn("w-1.5 h-1.5 rounded-full", TEMPLATE_STATUS_CONFIG[tmpl.status].dot)} />
                  {tmpl.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Campaigns List */}
      <div className="skeu-card overflow-hidden">
        <div className="px-6 py-4 border-b border-saas-border flex items-center gap-4">
          <div className="flex gap-1">
            {FILTER_TABS.map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={cn(
                  "text-[13px] px-3 py-1.5 rounded-lg font-semibold transition-all",
                  tab === t ? "bg-saas-primary text-white" : "text-saas-subtext hover:text-saas-text hover:bg-saas-bg"
                )}
              >
                {t}
              </button>
            ))}
          </div>
          <span className="ml-auto text-xs text-saas-subtext">{filtered.length} campaigns</span>
        </div>

        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <Megaphone className="w-12 h-12 text-saas-border mb-4" />
            <p className="font-semibold text-saas-text mb-1">No campaigns here</p>
            <p className="text-sm text-saas-subtext">Create your first broadcast campaign</p>
          </div>
        ) : (
          <div className="divide-y divide-saas-border/60">
            {filtered.map((campaign) => {
              const Ic = STATUS_CONFIG[campaign.status].icon;
              return (
                <div key={campaign.id} className="px-6 py-5 hover:bg-saas-bg/40 transition-colors group">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <div className="flex items-center gap-3 mb-1">
                        <h3 className="font-display font-semibold text-saas-text">{campaign.name}</h3>
                        <span className={cn("text-[10px] font-mono font-medium px-2 py-0.5 rounded-full border flex items-center gap-1", STATUS_CONFIG[campaign.status].color)}>
                          <Ic className="w-3 h-3" />{STATUS_CONFIG[campaign.status].label}
                        </span>
                      </div>
                      <div className="flex items-center gap-4 text-[11px] text-saas-subtext font-mono">
                        <span>Template: <span className="text-saas-text font-semibold">{campaign.template}</span></span>
                        <span>{campaign.date}</span>
                        <span className="flex items-center gap-1"><Users className="w-3 h-3" />{campaign.audience.toLocaleString()} recipients</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      {campaign.status === "running" && <button className="p-1.5 rounded-lg text-amber-500 hover:bg-amber-50 transition-all"><Pause className="w-4 h-4" /></button>}
                      <button className="p-1.5 rounded-lg text-saas-subtext hover:bg-saas-bg transition-all"><Copy className="w-4 h-4" /></button>
                      <button className="p-1.5 rounded-lg text-red-400 hover:bg-red-50 transition-all"><Trash2 className="w-4 h-4" /></button>
                    </div>
                  </div>

                  {campaign.sent > 0 && (
                    <div className="grid grid-cols-3 gap-4">
                      {[
                        { label: "Sent",      value: campaign.sent,      pctOf: campaign.audience, color: "#4f46e5" },
                        { label: "Delivered", value: campaign.delivered, pctOf: campaign.sent,      color: "#10b981" },
                        { label: "Read",      value: campaign.read,      pctOf: campaign.delivered, color: "#6366f1" },
                      ].map((s) => (
                        <div key={s.label}>
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-[11px] font-medium text-saas-subtext">{s.label}</span>
                            <span className="text-[11px] font-mono font-semibold text-saas-text">{s.value.toLocaleString()} <span className="text-saas-subtext">({pct(s.value,s.pctOf)}%)</span></span>
                          </div>
                          <div className="h-1.5 rounded-full bg-saas-border overflow-hidden">
                            <div className="h-full rounded-full transition-all duration-500" style={{width:`${pct(s.value,s.pctOf)}%`,background:s.color}} />
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
