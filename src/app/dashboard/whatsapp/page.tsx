"use client";

import { useState } from "react";
import {
  Phone, Wifi, Shield, AlertCircle, CheckCircle2, Clock,
  ExternalLink, Copy, RefreshCw, BarChart2, Zap,
  ArrowUpRight, ChevronRight, Globe, Info,
} from "lucide-react";
import { cn } from "@/lib/utils";

// ── Mock Data ────────────────────────────────────────────────
const CONNECTION_STATUS = {
  connected: true,
  wabaId: "1234567890123456",
  phoneNumber: "+91 98765 43210",
  displayName: "ForgeSuit Support",
  qualityRating: "HIGH",
  webhookStatus: "active",
  messagingLimit: "TIER_1K",
};

const PHONE_NUMBERS = [
  {
    number: "+91 98765 43210", display: "ForgeSuit Support",
    quality: "HIGH", tier: "1,000 / day", verified: true, connected: true,
  },
  {
    number: "+91 87654 32109", display: "ForgeSuit Sales",
    quality: "MEDIUM", tier: "250 / day", verified: true, connected: false,
  },
];

const WEBHOOK_LOGS = [
  { id: "wamid.abc001", type: "message.inbound",    status: "delivered", time: "11:45:23 AM", latency: "42ms" },
  { id: "wamid.abc002", type: "status.read",        status: "delivered", time: "11:44:18 AM", latency: "38ms" },
  { id: "wamid.abc003", type: "status.delivered",   status: "delivered", time: "11:43:55 AM", latency: "51ms" },
  { id: "wamid.abc004", type: "message.outbound",   status: "failed",    time: "11:42:10 AM", latency: "timeout" },
  { id: "wamid.abc005", type: "message.inbound",    status: "delivered", time: "11:41:32 AM", latency: "44ms" },
  { id: "wamid.abc006", type: "status.sent",        status: "delivered", time: "11:40:01 AM", latency: "29ms" },
  { id: "wamid.abc007", type: "template.sent",      status: "delivered", time: "11:38:44 AM", latency: "55ms" },
  { id: "wamid.abc008", type: "message.inbound",    status: "delivered", time: "11:37:12 AM", latency: "40ms" },
  { id: "wamid.abc009", type: "status.read",        status: "pending",   time: "11:36:20 AM", latency: "—" },
  { id: "wamid.abc010", type: "message.outbound",   status: "delivered", time: "11:35:08 AM", latency: "48ms" },
];

const SETUP_STEPS = [
  { label: "Create Meta Business Account", status: "done" },
  { label: "Verify Business on Meta",      status: "done" },
  { label: "Add WhatsApp Business Number", status: "done" },
  { label: "Configure Webhook & Token",    status: "active" },
];

const QUALITY_CONFIG: Record<string, { color: string; dot: string; label: string }> = {
  HIGH:   { color: "text-emerald-600 bg-emerald-50 border-emerald-200", dot: "bg-emerald-500", label: "HIGH" },
  MEDIUM: { color: "text-amber-600 bg-amber-50 border-amber-200",       dot: "bg-amber-500",   label: "MEDIUM" },
  LOW:    { color: "text-red-500 bg-red-50 border-red-200",             dot: "bg-red-500",     label: "LOW" },
};

const WEBHOOK_STATUS_CONFIG: Record<string, { color: string; icon: typeof CheckCircle2 }> = {
  delivered: { color: "text-emerald-600 bg-emerald-50 border-emerald-200", icon: CheckCircle2 },
  failed:    { color: "text-red-500 bg-red-50 border-red-200",             icon: AlertCircle },
  pending:   { color: "text-amber-600 bg-amber-50 border-amber-200",       icon: Clock },
};

const COMPLIANCE_STATS = [
  { label: "24h Conversations",  value: "36",   sub: "Active windows" },
  { label: "Templates Used",     value: "3 / 6",sub: "Your quota" },
  { label: "Opt-outs Today",     value: "1",    sub: "Last 24 hours" },
  { label: "Quality Score",      value: "4.8",  sub: "Out of 5.0" },
];

export default function WhatsAppPage() {
  const [copied, setCopied] = useState("");
  const [refreshing, setRefreshing] = useState(false);

  const handleCopy = (val: string, key: string) => {
    navigator.clipboard.writeText(val);
    setCopied(key);
    setTimeout(() => setCopied(""), 2000);
  };

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1200);
  };

  return (
    <div className="min-h-full p-8 max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="font-display text-3xl font-bold text-saas-text tracking-tight">WhatsApp Integration</h1>
          <p className="text-saas-subtext text-sm mt-1 font-medium">Manage your Meta WABA connection and webhooks</p>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={handleRefresh} className="flex items-center gap-2 px-3 py-2 rounded-xl border border-saas-border text-sm font-medium text-saas-subtext hover:text-saas-text hover:border-saas-primary/40 transition-all">
            <RefreshCw className={cn("w-4 h-4", refreshing && "animate-spin")} /> Refresh
          </button>
          <a href="https://business.facebook.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-2 rounded-xl bg-saas-primary text-white text-sm font-semibold hover:shadow-saas-glow hover:-translate-y-0.5 transition-all">
            <ExternalLink className="w-4 h-4" /> Meta Business Suite
          </a>
        </div>
      </div>

      {/* Connection Status Card */}
      <div className="skeu-card p-6">
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-5">
            <div className={cn(
              "w-14 h-14 rounded-2xl flex items-center justify-center",
              CONNECTION_STATUS.connected ? "bg-emerald-50 border border-emerald-200" : "bg-red-50 border border-red-200"
            )}>
              <Phone className={cn("w-7 h-7", CONNECTION_STATUS.connected ? "text-emerald-500" : "text-red-500")} />
            </div>
            <div>
              <div className="flex items-center gap-3 mb-1">
                <h2 className="font-display font-bold text-xl text-saas-text">{CONNECTION_STATUS.displayName}</h2>
                <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-100">
                  <div className="led-green" />
                  <span className="text-xs font-mono font-semibold text-emerald-700">Connected</span>
                </div>
              </div>
              <p className="text-sm text-saas-subtext flex items-center gap-2">
                <Phone className="w-3.5 h-3.5" />{CONNECTION_STATUS.phoneNumber}
              </p>
            </div>
          </div>

          {/* Quality Rating */}
          <div className="text-right">
            <p className="text-[11px] font-mono uppercase tracking-wider text-saas-subtext mb-2">Quality Rating</p>
            <span className={cn("text-sm font-mono font-bold px-3 py-1.5 rounded-xl border flex items-center gap-2 w-fit ml-auto", QUALITY_CONFIG[CONNECTION_STATUS.qualityRating].color)}>
              <span className={cn("w-2 h-2 rounded-full", QUALITY_CONFIG[CONNECTION_STATUS.qualityRating].dot)} />
              {QUALITY_CONFIG[CONNECTION_STATUS.qualityRating].label}
            </span>
          </div>
        </div>

        {/* Details Grid */}
        <div className="mt-6 grid grid-cols-4 gap-4 pt-6 border-t border-saas-border">
          {[
            { label: "WABA ID",            value: CONNECTION_STATUS.wabaId,         key: "waba" },
            { label: "Messaging Limit",    value: CONNECTION_STATUS.messagingLimit,  key: "" },
            { label: "Webhook Status",     value: CONNECTION_STATUS.webhookStatus,   key: "" },
            { label: "Phone",              value: CONNECTION_STATUS.phoneNumber,     key: "phone" },
          ].map((item) => (
            <div key={item.label} className="bg-saas-bg rounded-xl border border-saas-border p-3">
              <p className="text-[10px] font-mono uppercase tracking-wider text-saas-subtext mb-2">{item.label}</p>
              <div className="flex items-center justify-between">
                <p className="text-sm font-mono font-bold text-saas-text truncate pr-2">{item.value}</p>
                {item.key && (
                  <button onClick={() => handleCopy(item.value, item.key)} className="flex-shrink-0 p-1 rounded text-saas-subtext hover:text-primary-600 transition-colors">
                    {copied === item.key ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Phone Numbers + Compliance */}
      <div className="grid grid-cols-3 gap-6">
        {/* Phone Numbers Table */}
        <div className="col-span-2 skeu-card overflow-hidden">
          <div className="px-6 py-4 border-b border-saas-border flex items-center justify-between">
            <h2 className="font-display font-bold text-lg text-saas-text">Phone Numbers</h2>
            <button className="text-xs font-semibold text-saas-primary hover:underline flex items-center gap-1">
              <Plus className="w-3.5 h-3.5" /> Add Number
            </button>
          </div>
          <table className="w-full">
            <thead>
              <tr className="border-b border-saas-border bg-saas-bg/50">
                {["Number","Display Name","Quality","Daily Limit","Verified","Status"].map((h) => (
                  <th key={h} className="px-5 py-3 text-left text-[11px] font-mono uppercase tracking-wider text-saas-subtext font-semibold">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {PHONE_NUMBERS.map((p) => (
                <tr key={p.number} className="border-b border-saas-border/60 hover:bg-saas-bg/30 transition-colors">
                  <td className="px-5 py-4"><span className="text-sm font-mono font-semibold text-saas-text">{p.number}</span></td>
                  <td className="px-5 py-4"><span className="text-sm text-saas-text">{p.display}</span></td>
                  <td className="px-5 py-4">
                    <span className={cn("text-[10px] font-mono font-semibold px-2 py-0.5 rounded-full border flex items-center gap-1 w-fit", QUALITY_CONFIG[p.quality].color)}>
                      <span className={cn("w-1.5 h-1.5 rounded-full", QUALITY_CONFIG[p.quality].dot)}/>{p.quality}
                    </span>
                  </td>
                  <td className="px-5 py-4"><span className="text-xs font-mono text-saas-subtext">{p.tier}</span></td>
                  <td className="px-5 py-4">
                    {p.verified
                      ? <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                      : <AlertCircle className="w-4 h-4 text-amber-500" />}
                  </td>
                  <td className="px-5 py-4">
                    <span className={cn("text-[10px] font-mono font-semibold px-2 py-0.5 rounded-full border flex items-center gap-1 w-fit",
                      p.connected ? "bg-emerald-50 text-emerald-600 border-emerald-200" : "bg-slate-50 text-slate-500 border-slate-200"
                    )}>
                      <div className={cn("w-1.5 h-1.5 rounded-full", p.connected ? "bg-emerald-500" : "bg-slate-400")} />
                      {p.connected ? "Active" : "Inactive"}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Meta Compliance Panel */}
        <div className="skeu-card p-6">
          <div className="flex items-center gap-2 mb-5">
            <Shield className="w-5 h-5 text-saas-primary" />
            <h2 className="font-display font-bold text-lg text-saas-text">Compliance</h2>
          </div>
          <div className="space-y-4">
            {COMPLIANCE_STATS.map((s) => (
              <div key={s.label} className="flex items-center justify-between py-2 border-b border-saas-border/60 last:border-0">
                <div>
                  <p className="text-xs font-semibold text-saas-text">{s.label}</p>
                  <p className="text-[10px] text-saas-subtext">{s.sub}</p>
                </div>
                <p className="font-display font-bold text-xl text-saas-text">{s.value}</p>
              </div>
            ))}
          </div>
          <div className="mt-4 p-3 rounded-xl bg-blue-50 border border-blue-100">
            <div className="flex items-start gap-2">
              <Info className="w-4 h-4 text-blue-500 flex-shrink-0 mt-0.5" />
              <p className="text-xs text-blue-700 leading-relaxed">Your account is in good standing. Keep quality rating HIGH to unlock Tier 10k messaging.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Webhook Logs */}
      <div className="skeu-card overflow-hidden">
        <div className="px-6 py-4 border-b border-saas-border flex items-center justify-between">
          <div>
            <h2 className="font-display font-bold text-lg text-saas-text">Webhook Event Log</h2>
            <p className="text-xs text-saas-subtext mt-0.5">Last 10 webhook events</p>
          </div>
          <button className="text-xs font-semibold text-saas-primary hover:underline">View All</button>
        </div>
        <table className="w-full">
          <thead>
            <tr className="border-b border-saas-border bg-saas-bg/50">
              {["Message ID","Event Type","Status","Time","Latency"].map((h) => (
                <th key={h} className="px-6 py-3 text-left text-[11px] font-mono uppercase tracking-wider text-saas-subtext font-semibold">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {WEBHOOK_LOGS.map((log) => {
              const StatusIcon = WEBHOOK_STATUS_CONFIG[log.status].icon;
              return (
                <tr key={log.id} className="border-b border-saas-border/60 hover:bg-saas-bg/30 transition-colors">
                  <td className="px-6 py-3"><span className="text-xs font-mono text-saas-subtext">{log.id}</span></td>
                  <td className="px-6 py-3"><span className="text-xs font-mono font-medium text-saas-text">{log.type}</span></td>
                  <td className="px-6 py-3">
                    <span className={cn("text-[10px] font-mono font-semibold px-2 py-0.5 rounded-full border flex items-center gap-1 w-fit", WEBHOOK_STATUS_CONFIG[log.status].color)}>
                      <StatusIcon className="w-3 h-3" />{log.status}
                    </span>
                  </td>
                  <td className="px-6 py-3"><span className="text-xs font-mono text-saas-subtext">{log.time}</span></td>
                  <td className="px-6 py-3"><span className={cn("text-xs font-mono font-semibold", log.status === "failed" ? "text-red-500" : "text-emerald-600")}>{log.latency}</span></td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function Plus({ className }: { className?: string }) {
  return (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
    </svg>
  );
}
