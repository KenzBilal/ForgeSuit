"use client";

import { useState } from "react";
import {
  MessageCircle,
  Users,
  Bot,
  TrendingUp,
  Clock,
  CheckCircle2,
  AlertCircle,
  Send,
  Inbox,
  Zap,
  BarChart2,
  ArrowUpRight,
  ArrowDownRight,
  RefreshCw,
  Phone,
} from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell,
} from "recharts";

// ── Mock data ──────────────────────────────────────────────
const messageData = [
  { day: "Mon", inbound: 42, outbound: 38, ai: 30 },
  { day: "Tue", inbound: 58, outbound: 52, ai: 44 },
  { day: "Wed", inbound: 35, outbound: 30, ai: 22 },
  { day: "Thu", inbound: 71, outbound: 65, ai: 58 },
  { day: "Fri", inbound: 89, outbound: 80, ai: 70 },
  { day: "Sat", inbound: 44, outbound: 38, ai: 32 },
  { day: "Sun", inbound: 27, outbound: 22, ai: 18 },
];

const resolutionData = [
  { name: "AI", value: 68, color: "#3b82f6" },     // Primary Blue
  { name: "Human", value: 22, color: "#94a3b8" },  // Neutral Gray
  { name: "Pending", value: 10, color: "#e2e8f0" },// Light Gray
];

const recentConversations = [
  { name: "Arjun Mehta",    phone: "+91 98765 43210", msg: "I need help with my order status", time: "2m", status: "ai",    open: true  },
  { name: "Priya Sharma",   phone: "+91 87654 32109", msg: "What are your business hours?",    time: "8m", status: "human", open: true  },
  { name: "Rahul Gupta",    phone: "+91 76543 21098", msg: "Can I reschedule my appointment?", time: "15m",status: "ai",    open: true  },
  { name: "Sneha Patel",    phone: "+91 65432 10987", msg: "Thank you for the quick reply!",   time: "1h", status: "done",  open: false },
  { name: "Vikram Nair",    phone: "+91 54321 09876", msg: "Price list for premium plans?",    time: "2h", status: "ai",    open: true  },
];

const statCards = [
  {
    label:   "Total Conversations",
    value:   "1,284",
    delta:   "+12.4%",
    up:      true,
    icon:    MessageCircle,
    sub:     "This month",
    accent:  "#3b82f6", // Primary
  },
  {
    label:   "Active Contacts",
    value:   "847",
    delta:   "+8.1%",
    up:      true,
    icon:    Users,
    sub:     "Total contacts",
    accent:  "#6366f1", // Indigo
  },
  {
    label:   "AI Resolution Rate",
    value:   "68%",
    delta:   "+3.2%",
    up:      true,
    icon:    Bot,
    sub:     "vs last week",
    accent:  "#3b82f6", // Primary
  },
  {
    label:   "Avg. Response Time",
    value:   "1m 24s",
    delta:   "-18s",
    up:      true,
    icon:    Clock,
    sub:     "AI-assisted",
    accent:  "#6366f1", // Indigo
  },
];

// ── Custom Tooltip ─────────────────────────────────────────
const CustomTooltip = ({ active, payload, label }: {
  active?: boolean;
  payload?: Array<{ name: string; value: number; color: string }>;
  label?: string;
}) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-saas-card border border-saas-border shadow-saas-sm px-4 py-3 rounded-lg text-xs">
      <p className="font-display font-semibold text-saas-text mb-2">{label}</p>
      {payload.map((p) => (
        <div key={p.name} className="flex items-center gap-2 mb-1 last:mb-0">
          <span className="w-2 h-2 rounded-full inline-block" style={{ background: p.color }} />
          <span className="text-saas-subtext capitalize">{p.name}:</span>
          <span className="font-semibold text-saas-text">{p.value}</span>
        </div>
      ))}
    </div>
  );
};

// ── Status Badge ───────────────────────────────────────────
function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    ai:    "bg-primary-50 text-primary-600 border-primary-200",
    human: "bg-slate-50 text-slate-600 border-slate-200",
    done:  "bg-emerald-50 text-emerald-600 border-emerald-200",
  };
  const labels: Record<string, string> = {
    ai: "AI Active", human: "Human", done: "Resolved",
  };
  return (
    <span className={`text-[10px] font-mono font-medium px-2 py-0.5 rounded-full border ${styles[status]}`}>
      {labels[status]}
    </span>
  );
}

// ── Main Page ──────────────────────────────────────────────
export default function DashboardPage() {
  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1200);
  };

  return (
    <div className="min-h-full p-8 max-w-7xl mx-auto space-y-8">

      {/* ── Header ── */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="font-display text-3xl font-bold text-saas-text tracking-tight">
            Command Centre
          </h1>
          <p className="text-saas-subtext text-sm mt-1 font-medium">
            Saturday, 14 March 2026 &nbsp;·&nbsp; <span className="text-emerald-500">All systems operational</span>
          </p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-100">
            <div className="led-green" />
            <span className="text-xs font-mono font-medium text-emerald-700">WhatsApp Connected</span>
          </div>
          <button
            onClick={handleRefresh}
            className="skeu-btn px-4 py-2 rounded-xl text-sm flex items-center gap-2 shadow-saas-sm"
          >
            <RefreshCw className={`w-4 h-4 ${refreshing ? "animate-spin" : ""}`} />
            Refresh
          </button>
        </div>
      </div>

      {/* ── Stat Cards ── */}
      <div className="grid grid-cols-4 gap-6">
        {statCards.map((card) => (
          <div key={card.label} className="skeu-card p-6">
            <div className="flex items-start justify-between mb-4">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center"
                style={{
                  background: `${card.accent}15`,
                  color: card.accent
                }}
              >
                <card.icon className="w-5 h-5" />
              </div>
              <div className={`flex items-center gap-1 text-xs font-mono font-semibold px-2 py-1 rounded-full ${
                card.up ? "text-emerald-600 bg-emerald-50" : "text-rose-600 bg-rose-50"
              }`}>
                {card.up
                  ? <ArrowUpRight className="w-3.5 h-3.5" />
                  : <ArrowDownRight className="w-3.5 h-3.5" />}
                {card.delta}
              </div>
            </div>
            <p className="font-display text-3xl font-bold text-saas-text leading-none mb-1">
              {card.value}
            </p>
            <p className="text-saas-subtext text-sm font-medium">{card.label}</p>
            <p className="text-slate-400 text-[10px] font-mono mt-1 uppercase tracking-wider">{card.sub}</p>
          </div>
        ))}
      </div>

      {/* ── Charts Row ── */}
      <div className="grid grid-cols-3 gap-6">
        {/* Message Volume Chart */}
        <div className="col-span-2 skeu-card p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="font-display font-bold text-lg text-saas-text">Message Volume</h2>
              <p className="text-saas-subtext text-xs mt-0.5">Last 7 days</p>
            </div>
            <div className="flex items-center gap-4 text-xs font-medium">
              {[
                { label: "Inbound",  color: "#94a3b8" },
                { label: "Outbound", color: "#cbd5e1" },
                { label: "AI",       color: "#3b82f6" },
              ].map((l) => (
                <div key={l.label} className="flex items-center gap-2 text-saas-subtext">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ background: l.color }} />
                  {l.label}
                </div>
              ))}
            </div>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={messageData} margin={{ top: 10, right: 10, bottom: 0, left: -20 }}>
              <defs>
                <linearGradient id="inboundGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%"  stopColor="#94a3b8" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#94a3b8" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="outboundGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%"  stopColor="#cbd5e1" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#cbd5e1" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="aiGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%"  stopColor="#3b82f6" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="day" tick={{ fontSize: 12, fill: "#94a3b8", fontFamily: "Inter" }} axisLine={false} tickLine={false} dy={10} />
              <YAxis tick={{ fontSize: 12, fill: "#94a3b8", fontFamily: "Inter" }} axisLine={false} tickLine={false} dx={-10} />
              <Tooltip content={<CustomTooltip />} cursor={{ stroke: '#e2e8f0', strokeWidth: 1, strokeDasharray: '4 4' }} />
              <Area type="monotone" dataKey="inbound"  stroke="#94a3b8" strokeWidth={2} fill="url(#inboundGrad)"  dot={{ r: 0, fill: '#94a3b8' }} activeDot={{ r: 4 }} />
              <Area type="monotone" dataKey="outbound" stroke="#cbd5e1" strokeWidth={2} fill="url(#outboundGrad)" dot={{ r: 0, fill: '#cbd5e1' }} activeDot={{ r: 4 }} />
              <Area type="monotone" dataKey="ai"       stroke="#3b82f6" strokeWidth={2} fill="url(#aiGrad)"       dot={{ r: 0, fill: '#3b82f6' }} activeDot={{ r: 4 }} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Resolution Breakdown */}
        <div className="skeu-card p-6 flex flex-col">
          <h2 className="font-display font-bold text-lg text-saas-text mb-1">Resolution Split</h2>
          <p className="text-saas-subtext text-xs mb-8">This week</p>

          {/* Gauge-style display */}
          <div className="skeu-gauge rounded-full w-32 h-32 mx-auto mb-6 flex flex-col items-center justify-center relative">
            <p className="font-display text-3xl font-bold text-primary-600">68%</p>
            <p className="text-[10px] font-semibold text-saas-subtext uppercase tracking-widest mt-0.5">AI rate</p>
          </div>

          <div className="flex-1 flex items-end">
            <ResponsiveContainer width="100%" height={100}>
              <BarChart data={resolutionData} layout="vertical" margin={{ top: 0, right: 0, bottom: 0, left: 10 }}>
                <XAxis type="number" hide />
                <YAxis type="category" dataKey="name" tick={{ fontSize: 12, fill: "#64748b", fontFamily: "Inter" }} axisLine={false} tickLine={false} width={60} />
                <Tooltip content={<CustomTooltip />} cursor={{fill: 'transparent'}} />
                <Bar dataKey="value" radius={[0, 6, 6, 0]} barSize={16}>
                  {resolutionData.map((entry) => (
                    <Cell key={entry.name} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* ── Bottom Row ── */}
      <div className="grid grid-cols-3 gap-6">
        {/* Recent Conversations */}
        <div className="col-span-2 skeu-card p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="font-display font-bold text-lg text-saas-text">Recent Conversations</h2>
              <p className="text-saas-subtext text-xs mt-0.5">Live activity</p>
            </div>
            <button className="text-xs font-semibold text-primary-600 hover:text-primary-700 flex items-center gap-1 transition-colors px-3 py-1.5 rounded-md hover:bg-primary-50">
              View all <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-3">
            {recentConversations.map((conv, i) => (
              <div
                key={i}
                className="flex items-center gap-4 px-4 py-3 rounded-xl cursor-pointer transition-all duration-200 hover:bg-saas-bg/50 border border-transparent hover:border-saas-border group"
              >
                {/* Avatar */}
                <div
                  className="w-10 h-10 rounded-full flex-shrink-0 flex items-center justify-center text-sm font-bold text-primary-700 bg-primary-100"
                >
                  {conv.name.charAt(0)}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="text-sm font-semibold text-saas-text truncate group-hover:text-primary-600 transition-colors">{conv.name}</p>
                    <span className="text-[10px] font-mono text-saas-subtext flex-shrink-0 flex items-center gap-1 bg-slate-100 px-1.5 py-0.5 rounded">
                      <Phone className="w-3 h-3" /> {conv.phone}
                    </span>
                  </div>
                  <p className="text-xs text-saas-subtext truncate">{conv.msg}</p>
                </div>

                <div className="flex flex-col items-end gap-1.5 flex-shrink-0">
                  <StatusBadge status={conv.status} />
                  <span className="text-[10px] font-medium text-slate-400">{conv.time} ago</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Stats Panel */}
        <div className="space-y-6">
          {/* 24h Window Status */}
          <div className="skeu-card p-6">
            <h3 className="font-display font-semibold text-saas-text text-base mb-4 flex items-center gap-2">
              <Clock className="w-4 h-4 text-primary-500" />
              24h Window Status
            </h3>
            <div className="space-y-3">
              {[
                { label: "Windows Open",    value: "23",  icon: CheckCircle2, color: "text-emerald-500", bg: "bg-emerald-50" },
                { label: "Expiring Soon",   value: "5",   icon: AlertCircle,  color: "text-amber-500", bg: "bg-amber-50" },
                { label: "Closed",          value: "8",   icon: Inbox,        color: "text-slate-400", bg: "bg-slate-50" },
              ].map((item) => (
                <div key={item.label} className="flex items-center justify-between p-2 rounded-lg hover:bg-slate-50 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className={`p-1.5 rounded-md ${item.bg}`}>
                      <item.icon className={`w-4 h-4 ${item.color}`} />
                    </div>
                    <span className="text-sm font-medium text-saas-subtext">{item.label}</span>
                  </div>
                  <span className="font-semibold text-saas-text">{item.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Today's Summary */}
          <div className="skeu-card-dark p-6">
            <h3 className="font-display font-semibold text-saas-text text-base mb-4 flex items-center gap-2">
              <BarChart2 className="w-4 h-4 text-primary-500" />
              Today's Summary
            </h3>
            <div className="space-y-2">
              {[
                { label: "Messages In",  value: "89",  icon: Inbox, color: "text-primary-500" },
                { label: "Messages Out", value: "80",  icon: Send,  color: "text-indigo-500" },
                { label: "AI Replies",   value: "70",  icon: Bot,   color: "text-emerald-500" },
                { label: "Automations",  value: "12",  icon: Zap,   color: "text-amber-500" },
                { label: "AI Cost",      value: "$0.14",icon: BarChart2,color:"text-slate-400"},
              ].map((item) => (
                <div key={item.label} className="flex items-center justify-between py-2 border-b border-saas-border last:border-0">
                  <div className="flex items-center gap-2.5">
                    <item.icon className={`w-4 h-4 ${item.color}`} />
                    <span className="text-sm font-medium text-saas-subtext">{item.label}</span>
                  </div>
                  <span className="font-semibold text-saas-text">{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
